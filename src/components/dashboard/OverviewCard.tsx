import type { AnalysisResult } from "@/lib/mock-data";
import { Globe, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./IntelligenceOverview";

export function OverviewCard({ data }: { data: AnalysisResult }) {
  const scores = [
    { label: "Overall", value: data.scores.overall },
    { label: "Innovation", value: data.scores.innovation },
    { label: "Market", value: data.scores.market },
    { label: "AI Maturity", value: data.scores.aiMaturity },
  ];

  return (
    <section>
      <SectionHeader
        eyebrow="00 · Subject"
        title="Company brief"
        sub="Aggregated from filings, news, hiring data and social signals"
        action={
          <button className="hidden md:inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition">
            Open full report <ArrowUpRight className="w-3 h-3" />
          </button>
        }
      />
      <div className="panel rounded-lg p-5">
        <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-md border border-border bg-white/[0.04] flex items-center justify-center text-base font-semibold">
              {data.company.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <Globe className="w-2.5 h-2.5" /> {data.company.domain}
                <span className="w-px h-2.5 bg-border" />
                {data.company.industry}
              </div>
              <h3 className="text-lg font-semibold mt-0.5 tracking-tight">{data.company.name}</h3>
              <p className="text-[12.5px] text-muted-foreground mt-1.5 max-w-2xl leading-relaxed">
                {data.summary}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-px bg-border border border-border rounded-md overflow-hidden w-full lg:w-auto">
            {scores.map((s) => (
              <div key={s.label} className="bg-background px-4 py-2.5 min-w-[80px]">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="text-base font-semibold tabular-nums mt-0.5">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
