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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UAS Intelligence — DJI vs Skydio" },
      {
        name: "description",
        content:
          "Investor-grade competitive intelligence for the autonomous drone industry. Benchmark DJI, Skydio, Anduril, Autel and Shield AI.",
      },
      { property: "og:title", content: "Autonomous Drone Market Intelligence" },
      {
        property: "og:description",
        content: "Real-time competitive intelligence on DJI, Skydio and the global UAS market.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"cache" | "webhook" | "mock" | null>(null);
  const [reportsRefresh, setReportsRefresh] = useState(0);
  const [activeSearch, setActiveSearch] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleAnalyze = async (q: string) => {
    setLoading(true);
    setError(null);
    setActiveSearch(q);
    try {
      const result = await analyzeCompany(q);
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
          {/* Page header — breadcrumb + compact title + live feed */}
          <header className="border-b border-border pb-4 flex items-end justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-1.5 min-w-0">
              <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                <span>Markets</span>
                <span className="text-border">/</span>
                <span>UAS Ecosystem</span>
                <span className="text-border">/</span>
                <span className="text-neon-cyan/90">Intelligence Brief</span>
              </nav>
              <h1 className="text-[22px] md:text-[26px] font-semibold text-foreground tracking-tight">
                DJI <span className="text-muted-foreground/60 font-light mx-1">vs</span> Skydio
                <span className="text-muted-foreground font-light text-[13px] ml-3 hidden md:inline">
                  Anduril · Autel · Shield AI · Parrot
                </span>
              </h1>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <div className="flex items-center gap-2 bg-success/5 border border-success/25 px-2 py-0.5 rounded-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" />
                <span className="text-[10px] font-bold text-success uppercase tracking-tighter">Live Feed</span>
              </div>
              <div className="text-[9.5px] font-mono-data text-muted-foreground uppercase">
                Updated <span className="text-foreground/80">4m 12s</span> ago
                <span className="ml-1.5 px-1 border border-border text-[8.5px]">Q2·26</span>
              </div>
            </div>
          </header>

          {/* Source indicator */}
          {source && !loading && activeSearch && (
            <div className="text-[11px] text-muted-foreground -mt-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              {source === "cache" && `Analysis loaded from cache · "${activeSearch}"`}
              {source === "webhook" && `Fresh analysis from workflow · "${activeSearch}"`}
              {source === "mock" && `Showing demo intelligence for "${activeSearch}" (workflow offline)`}
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div className="panel rounded-md px-4 py-3 border border-destructive/30 text-[12.5px] text-destructive flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
              {error}
            </div>
          )}

          {loading ? (
            <DashboardSkeleton />
          ) : (
            <>
              <OverviewCard />
              <IntelligenceOverview />
              <CompanyComparison />
              <SwotSection />
              <MarketInsights />
              <Opportunities />
              <ChartsGrid />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                  <SocialPanel />
                </div>
                <div>
                  <WorkflowPanel />
                </div>
              </div>
              <ReportsTable refreshKey={reportsRefresh} />

              <footer className="mt-4 pt-3 border-t border-border flex items-center justify-between flex-wrap gap-2">
                <div className="flex gap-3 flex-wrap">
                  {["SEC EDGAR", "FAA", "DoD DPCAP", "Crunchbase", "LinkedIn", "X/Twitter"].map((s) => (
                    <span key={s} className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="text-[9px] font-mono-data text-muted-foreground/60 uppercase">
                  v1.2.4·pro · build 7f3a · © 2026 UAS Intelligence
                </span>
              </footer>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
