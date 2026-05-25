import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import { SwotSection } from "@/components/dashboard/SwotSection";
import { MarketInsights } from "@/components/dashboard/MarketInsights";
import { ChartsGrid } from "@/components/dashboard/Charts";
import { SocialPanel } from "@/components/dashboard/SocialPanel";
import { WorkflowPanel } from "@/components/dashboard/WorkflowPanel";
import { ReportsTable } from "@/components/dashboard/ReportsTable";
import { DashboardSkeleton } from "@/components/dashboard/Skeletons";
import { analyzeCompany } from "@/lib/api";
import { mockAnalysis, type AnalysisResult } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Market Intelligence Dashboard" },
      { name: "description", content: "AI-powered competitive and market intelligence dashboard for startups and enterprises." },
      { property: "og:title", content: "AI Market Intelligence" },
      { property: "og:description", content: "AI-powered market intelligence dashboard." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [data, setData] = useState<AnalysisResult | null>(mockAnalysis);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"cache" | "webhook" | "mock" | null>(null);
  const [reportsRefresh, setReportsRefresh] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleAnalyze = async (q: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await analyzeCompany(q);
      setData(result.data);
      setSource(result.source);
      setReportsRefresh((n) => n + 1);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to analyze company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar active="dashboard" />
      <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 space-y-5">
        <header>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            <span className="text-gradient">Market</span> Intelligence
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI-powered market & competitor intelligence in real time
          </p>
        </header>

        <Topbar onAnalyze={handleAnalyze} loading={loading} />

        {source && !loading && (
          <div className="text-xs text-muted-foreground -mt-2">
            {source === "cache" && "✓ Loaded from cache"}
            {source === "webhook" && "✓ Fresh analysis from n8n workflow"}
            {source === "mock" && "ⓘ n8n unreachable — showing demo data (saved to cache)"}
          </div>
        )}

        {error && (
          <div className="glass rounded-xl p-4 border border-destructive/30 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading || !data ? (
          <DashboardSkeleton />
        ) : (
          <>
            <OverviewCard data={data} />
            <SwotSection data={data} />
            <MarketInsights data={data} />
            <ChartsGrid data={data} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <SocialPanel data={data} />
              </div>
              <WorkflowPanel data={data} />
            </div>
            <ReportsTable refreshKey={reportsRefresh} />
          </>
        )}
      </main>
    </div>
  );
}
