import type { AnalysisResult } from "@/lib/mock-data";
import { SectionHeader } from "./IntelligenceOverview";

export function MarketInsights({ data }: { data: AnalysisResult }) {
  return (
    <section>
      <SectionHeader
        eyebrow="04 · Industry trends"
        title="Forces shaping autonomous UAS"
        sub="Regulatory, technical and procurement shifts tracked over the last 90 days"
      />
      <div className="panel rounded-lg p-5">
        <ol className="space-y-3">
          {data.insights.trends.map((t, i) => (
            <li key={i} className="flex gap-4 items-start group">
              <span className="text-[11px] tabular-nums text-muted-foreground mt-1 w-6">T-{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[13px] leading-relaxed flex-1">{t}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider opacity-0 group-hover:opacity-100 transition">
                {["Regulatory", "Technical", "Regulatory", "Operational", "Technical"][i] ?? "Signal"}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
