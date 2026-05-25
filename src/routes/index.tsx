import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import { IntelligenceOverview } from "@/components/dashboard/IntelligenceOverview";
import { CompanyComparison } from "@/components/dashboard/CompanyComparison";
import { SwotSection } from "@/components/dashboard/SwotSection";
import { MarketInsights } from "@/components/dashboard/MarketInsights";
import { Opportunities } from "@/components/dashboard/Opportunities";
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
      { title: "UAS Intelligence — DJI vs Skydio" },
      { name: "description", content: "Investor-grade competitive intelligence for the autonomous drone industry. Benchmark DJI, Skydio, Anduril, Autel and Shield AI." },
      { property: "og:title", content: "Autonomous Drone Market Intelligence" },
      { property: "og:description", content: "Real-time competitive intelligence on DJI, Skydio and the global UAS market." },
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
      <main className="flex-1 min-w-0 px-4 md:px-6 lg:px-8">
        <Topbar onAnalyze={handleAnalyze} loading={loading} />

        <div className="py-6 md:py-8 space-y-8 max-w-[1400px] mx-auto">
          <header className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Drone Market Intelligence</div>
              <h1 className="text-2xl md:text-[28px] font-semibold tracking-tight mt-1.5">
                DJI <span className="text-muted-foreground font-normal">vs</span> Skydio
                <span className="text-muted-foreground font-normal text-base ml-2">· Anduril · Autel · Shield AI</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Live · Q3 2026 data window
            </div>
          </header>

          {source && !loading && (
            <div className="text-[11px] text-muted-foreground -mt-4">
              {source === "cache" && "✓ Loaded from cache"}
              {source === "webhook" && "✓ Fresh analysis from n8n workflow"}
              {source === "mock" && "ⓘ n8n unreachable — showing demo data (cached)"}
            </div>
          )}

          {error && (
            <div className="panel rounded-md p-3.5 border-destructive/30 text-[12px] text-destructive">
              {error}
            </div>
          )}

          {loading || !data ? (
            <DashboardSkeleton />
          ) : (
            <>
              <OverviewCard data={data} />
              <div className="divider-h" />
              <IntelligenceOverview />
              <div className="divider-h" />
              <CompanyComparison />
              <div className="divider-h" />
              <SwotSection data={data} />
              <div className="divider-h" />
              <MarketInsights data={data} />
              <div className="divider-h" />
              <Opportunities />
              <div className="divider-h" />
              <ChartsGrid data={data} />
              <div className="divider-h" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <SocialPanel data={data} />
                </div>
                <div className="pt-7">
                  <WorkflowPanel data={data} />
                </div>
              </div>
              <div className="divider-h" />
              <ReportsTable refreshKey={reportsRefresh} />
              <footer className="pt-6 pb-2 text-[11px] text-muted-foreground flex items-center justify-between border-t border-border">
                <span>© 2026 UAS Intelligence · sources: SEC, FAA, Defense News, Crunchbase, GitHub, LinkedIn</span>
                <span>Built with TanStack · Recharts</span>
              </footer>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
