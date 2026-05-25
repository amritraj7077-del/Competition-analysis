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
      { title: "Kolino Intelligence — AI Market Intelligence Dashboard" },
      { name: "description", content: "AI-powered competitive and market intelligence dashboard for startups and enterprises." },
      { property: "og:title", content: "Kolino Intelligence" },
      { property: "og:description", content: "AI-powered market intelligence dashboard." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [data, setData] = useState<AnalysisResult | null>(mockAnalysis);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleAnalyze = async (q: string) => {
    setLoading(true);
    setData(null);
    try {
      const result = await analyzeCompany(q);
      setData(result);
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
            <span className="text-gradient">Kolino</span> Intelligence
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI-powered market & competitor intelligence in real time
          </p>
        </header>

        <Topbar onAnalyze={handleAnalyze} loading={loading} />

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
            <ReportsTable />
          </>
        )}
      </main>
    </div>
  );
}
