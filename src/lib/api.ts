import { supabase } from "@/integrations/supabase/client";

const N8N_WEBHOOK = "http://localhost:5678/webhook-test/ai summerizer";

const normalizeKey = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "-");

type AnalysisPayload = {
  company: { name: string; domain: string };
  summary: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  scores: { overall: number };
  sentiment?: { platform: string; positive: number; neutral: number; negative: number }[];
};

function reportRowToPayload(row: any): AnalysisPayload {
  const payload = (row.payload ?? {}) as Partial<AnalysisPayload>;
  return {
    company: {
      name: row.company ?? "Unknown",
      domain: row.website ?? payload.company?.domain ?? "",
    },
    summary: row.summary ?? payload.summary ?? "No summary available.",
    strengths: (row.strengths as string[]) ?? payload.strengths ?? [],
    weaknesses: (row.weaknesses as string[]) ?? payload.weaknesses ?? [],
    opportunities: (row.opportunities as string[]) ?? payload.opportunities ?? [],
    threats: (row.threats as string[]) ?? payload.threats ?? [],
    scores: {
      overall: row.score ?? payload.scores?.overall ?? 0,
    },
    sentiment: row.sentiment ?? payload.sentiment,
  };
}

export async function findCachedReport(query: string): Promise<AnalysisPayload | null> {
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
  return reportRowToPayload(data);
}

async function callWebhook(query: string): Promise<Partial<AnalysisPayload> | null> {
  try {
    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company: query }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return (await res.json()) as Partial<AnalysisPayload>;
  } catch (err) {
    console.warn("[n8n] webhook unreachable", err);
    return null;
  }
}

async function saveReport(query: string, result: AnalysisPayload) {
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
    payload: result as any,
  });
  if (error) console.error("[supabase] saveReport", error);
}

export async function analyzeCompany(query: string): Promise<{
  source: "cache" | "webhook" | "mock";
}> {
  // 1. Check cache
  const cached = await findCachedReport(query);
  if (cached) return { source: "cache" };

  // 2. Call n8n webhook
  const webhookData = await callWebhook(query);

  if (webhookData) {
    // 3. Build and save result
    const result: AnalysisPayload = {
      company: {
        name: query.charAt(0).toUpperCase() + query.slice(1),
        domain: webhookData.company?.domain ?? "",
      },
      summary: webhookData.summary ?? "Analysis complete.",
      strengths: webhookData.strengths ?? [],
      weaknesses: webhookData.weaknesses ?? [],
      opportunities: webhookData.opportunities ?? [],
      threats: webhookData.threats ?? [],
      scores: { overall: webhookData.scores?.overall ?? 0 },
      sentiment: webhookData.sentiment,
    };
    await saveReport(query, result);
    return { source: "webhook" };
  }

  // 3. Mock fallback — just save a stub
  const result: AnalysisPayload = {
    company: { name: query.charAt(0).toUpperCase() + query.slice(1), domain: "" },
    summary: "Demo analysis — workflow offline.",
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: [],
    scores: { overall: 0 },
  };
  await saveReport(query, result);
  return { source: "mock" };
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
