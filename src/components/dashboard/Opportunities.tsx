import { marketOpportunities } from "@/lib/intelligence-data";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

const readinessBadge: Record<string, string> = {
  early: "text-muted-foreground bg-white/[0.03] border-border",
  developing: "text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20",
  maturing: "text-success bg-success/10 border-success/20",
  mature: "text-foreground bg-white/[0.06] border-border",
};

export function Opportunities() {
  return (
    <section>
      <SectionHeader
        eyebrow="05 · Market Opportunity"
        title="Where the spend is moving"
        sub="TAM and CAGR across five UAS verticals · 2025–2030 forecast"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
        {marketOpportunities.map((o) => (
          <div
            key={o.vertical}
            className="bg-background p-5 hover:bg-white/[0.012] transition-colors group flex flex-col"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span
                  className={cn(
                    "inline-block text-[9.5px] uppercase tracking-wider px-1.5 py-0.5 rounded border font-medium mb-2",
                    readinessBadge[o.readinessLevel] ?? "text-muted-foreground bg-white/[0.04] border-border",
                  )}
                >
                  {o.readinessLevel}
                </span>
                <div className="text-[14px] font-semibold tracking-tight text-foreground">
                  {o.vertical}
                </div>
                <div className="flex items-baseline gap-2.5 mt-1.5">
                  <span className="text-[22px] font-bold tabular-nums tracking-tight text-foreground">
                    {o.tam}
                  </span>
                  <span className="text-[12px] text-success font-medium">{o.cagr} CAGR</span>
                </div>
                <div className="text-[10.5px] text-muted-foreground mt-0.5">{o.timeline}</div>
              </div>
            </div>

            <p className="text-[12px] text-muted-foreground mt-3 leading-relaxed flex-1">
              {o.description}
            </p>

            <div className="mt-3 pt-3 border-t border-border">
              <div className="text-[9.5px] uppercase tracking-wider text-muted-foreground mb-1.5">
                Key driver
              </div>
              <div className="text-[11.5px] text-foreground/80 mb-3">{o.keyDriver}</div>
              <div className="flex flex-wrap gap-1">
                {o.keyPlayers.map((p) => (
                  <span
                    key={p}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] border border-border text-muted-foreground"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
