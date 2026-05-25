import { industryTrends } from "@/lib/intelligence-data";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

const signalColors: Record<string, string> = {
  accelerating: "text-success bg-success/10 border-success/20",
  emerging: "text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20",
  established: "text-muted-foreground bg-white/[0.04] border-border",
  decelerating: "text-warning bg-warning/10 border-warning/20",
};

const categoryColors: Record<string, string> = {
  regulatory: "text-neon-blue",
  technical: "text-neon-cyan",
  market: "text-success",
  defense: "text-warning",
  geopolitical: "text-destructive",
};

export function MarketInsights() {
  return (
    <section>
      <SectionHeader
        eyebrow="04 · Industry Trends"
        title="Forces shaping autonomous UAS"
        sub="Regulatory, technical and procurement shifts · 90-day signal window"
      />
      <div className="panel rounded-lg overflow-hidden border border-border">
        <div className="divide-y divide-border">
          {industryTrends.map((trend, i) => (
            <div key={trend.id} className="p-4 hover:bg-white/[0.012] transition-colors group">
              <div className="flex items-start gap-4">
                <span className="text-[10px] text-muted-foreground font-mono tabular-nums mt-1 shrink-0 w-10">
                  T-{String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={cn(
                          "text-[9.5px] uppercase tracking-wider px-1.5 py-0.5 rounded border font-medium",
                          categoryColors[trend.category] ?? "text-muted-foreground",
                          "bg-white/[0.04] border-border",
                        )}
                      >
                        {trend.category}
                      </span>
                      <span
                        className={cn(
                          "text-[9.5px] uppercase tracking-wider px-1.5 py-0.5 rounded border font-medium",
                          signalColors[trend.signal] ?? "text-muted-foreground bg-white/[0.04] border-border",
                        )}
                      >
                        {trend.signal}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{trend.timeframe}</span>
                    </div>
                  </div>
                  <h3 className="text-[13px] font-semibold tracking-tight mt-2 text-foreground leading-tight">
                    {trend.title}
                  </h3>
                  <p className="text-[12px] text-muted-foreground mt-1.5 leading-relaxed">
                    {trend.summary}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {trend.sources.map((s) => (
                      <span
                        key={s}
                        className="text-[9.5px] px-1.5 py-0.5 rounded bg-white/[0.03] border border-border text-muted-foreground/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
