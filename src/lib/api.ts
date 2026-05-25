import { supabase } from "@/integrations/supabase/client";
import { mockAnalysis, type AnalysisResult } from "./mock-data";

const N8N_WEBHOOK = "http://localhost:5678/webhook-test/ai summerizer";

const normalizeKey = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "-");

function reportRowToResult(row: any, fallback: AnalysisResult): AnalysisResult {
  const payload = (row.payload ?? {}) as Partial<AnalysisResult>;
  return {
    ...fallback,
    ...payload,
    company: {
      ...fallback.company,
      ...(payload.company ?? {}),
      name: row.company,
      domain: row.website ?? payload.company?.domain ?? fallback.company.domain,
    },
    summary: row.summary ?? payload.summary ?? fallback.summary,
    strengths: (row.strengths as string[]) ?? fallback.strengths,
    weaknesses: (row.weaknesses as string[]) ?? fallback.weaknesses,
    opportunities: (row.opportunities as string[]) ?? fallback.opportunities,
    threats: (row.threats as string[]) ?? fallback.threats,
    sentiment: (row.sentiment as AnalysisResult["sentiment"]) ?? fallback.sentiment,
    scores: {
      ...fallback.scores,
      ...(payload.scores ?? {}),
      overall: row.score ?? payload.scores?.overall ?? fallback.scores.overall,
    },
  };
}

export async function findCachedReport(query: string): Promise<AnalysisResult | null> {
  const key = normalizeKey(query);
  const { data, error } = await supabase
    .from("company_reports")
    .select("*")
    .eq("company_key", key)
    .maybeSingle();

  if (error) {
    console.error("[supabase] findCachedReport", error);
    return null;
  }
  if (!data) return null;
  return reportRowToResult(data, mockAnalysis);
}

async function callWebhook(query: string): Promise<Partial<AnalysisResult> | null> {
  try {
    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company: query }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return (await res.json()) as Partial<AnalysisResult>;
  } catch (err) {
    console.warn("[n8n] webhook unreachable, using mock data", err);
    return null;
  }
}

async function saveReport(query: string, result: AnalysisResult) {
  const { error } = await supabase.from("company_reports").insert({
    company: result.company.name,
    company_key: normalizeKey(query),
    website: result.company.domain,
    summary: result.summary,
    strengths: result.strengths,
    weaknesses: result.weaknesses,
    opportunities: result.opportunities,
    threats: result.threats,
    sentiment: result.sentiment,
    score: result.scores.overall,
    payload: result as unknown as Record<string, unknown>,
  });
  if (error) console.error("[supabase] saveReport", error);
}

export async function analyzeCompany(query: string): Promise<{
  data: AnalysisResult;
  source: "cache" | "webhook" | "mock";
}> {
  // 1. Check cache
  const cached = await findCachedReport(query);
  if (cached) return { data: cached, source: "cache" };

  // 2. Call n8n webhook
  const webhookData = await callWebhook(query);

  // 3. Build result (merge webhook over mock skeleton so charts always render)
  const result: AnalysisResult = {
    ...mockAnalysis,
    ...(webhookData ?? {}),
    company: {
      ...mockAnalysis.company,
      name: query.charAt(0).toUpperCase() + query.slice(1),
      ...(webhookData?.company ?? {}),
    },
  };

  // 4. Save to Supabase
  await saveReport(query, result);

  return { data: result, source: webhookData ? "webhook" : "mock" };
}

export async function listRecentReports(limit = 8) {
  const { data, error } = await supabase
    .from("company_reports")
    .select("id, company, score, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[supabase] listRecentReports", error);
    return [];
  }
  return data ?? [];
}
