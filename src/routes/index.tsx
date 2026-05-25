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
          {/* Page header */}
          <header className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
                Drone Market Intelligence
              </div>
              <h1 className="text-[26px] md:text-[30px] font-bold tracking-tight mt-1.5 text-foreground">
                DJI{" "}
                <span className="text-muted-foreground font-light">vs</span>{" "}
                Skydio
                <span className="text-muted-foreground font-light text-lg ml-2">
                  · Anduril · Autel · Shield AI · Parrot
                </span>
              </h1>
              <p className="text-[12px] text-muted-foreground mt-1 max-w-xl">
                Investor-grade competitive intelligence platform · 186 sources · defense, enterprise, and consumer UAS
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" />
                Live · Q2 2026 data window
              </div>
              <div className="text-[10px] text-muted-foreground/60">
                Last refreshed 4 min ago · Next refresh in 56 min
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
              <div className="divider-h" />
              <IntelligenceOverview />
              <div className="divider-h" />
              <CompanyComparison />
              <div className="divider-h" />
              <SwotSection />
              <div className="divider-h" />
              <MarketInsights />
              <div className="divider-h" />
              <Opportunities />
              <div className="divider-h" />
              <ChartsGrid />
              <div className="divider-h" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                  <SocialPanel />
                </div>
                <div>
                  <WorkflowPanel />
                </div>
              </div>
              <div className="divider-h" />
              <ReportsTable refreshKey={reportsRefresh} />

              <footer className="pt-6 pb-4 text-[10.5px] text-muted-foreground flex items-center justify-between border-t border-border flex-wrap gap-2">
                <span>
                  © 2026 UAS Intelligence Platform · Sources: SEC EDGAR, FAA, DoD DPCAP, Defense
                  News, Crunchbase, LinkedIn, Reddit, X/Twitter
                </span>
                <span className="text-muted-foreground/60">
                  Built with TanStack Start · Recharts · Supabase
                </span>
              </footer>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
