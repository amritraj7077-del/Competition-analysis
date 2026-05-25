import { opportunities } from "@/lib/mock-data";
import { SectionHeader } from "./IntelligenceOverview";
import { ArrowUpRight } from "lucide-react";

export function Opportunities() {
  return (
    <section>
      <SectionHeader
        eyebrow="05 · Market opportunity"
        title="Where the spend is moving"
        sub="TAM and growth across five UAS verticals"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
        {opportunities.map((o) => (
          <div key={o.title} className="bg-background p-4 hover:bg-white/[0.015] transition group">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[13px] font-semibold tracking-tight">{o.title}</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-semibold tabular-nums">{o.tam}</span>
                  <span className="text-[11px] text-success">{o.cagr} CAGR</span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition" />
            </div>
            <p className="text-[12px] text-muted-foreground mt-3 leading-relaxed">{o.desc}</p>
            <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-1">
              {o.leaders.map((l) => (
                <span key={l} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] border border-border text-muted-foreground">
                  {l}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
