import { mockAnalysis, type AnalysisResult } from "./mock-data";

const N8N_WEBHOOK = "http://localhost:5678/webhook-test/ai summerizer";

export async function analyzeCompany(query: string): Promise<AnalysisResult> {
  // Try n8n webhook, fall back to mock data
  try {
    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company: query }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error("webhook error");
    const data = await res.json();
    // Merge webhook fields onto mock skeleton so missing fields keep working
    return {
      ...mockAnalysis,
      ...data,
      company: { ...mockAnalysis.company, name: query, ...(data.company ?? {}) },
    };
  } catch {
    await new Promise((r) => setTimeout(r, 1400));
    return {
      ...mockAnalysis,
      company: { ...mockAnalysis.company, name: query.charAt(0).toUpperCase() + query.slice(1) },
    };
  }
}
