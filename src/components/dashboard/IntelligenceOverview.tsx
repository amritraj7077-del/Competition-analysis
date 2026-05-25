import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { marketKPIs } from "@/lib/intelligence-data";
import { SectionHeader } from "./SectionHeader";

export function IntelligenceOverview() {
  return (
    <section>
      <SectionHeader
        eyebrow="01 · Market Intelligence"
        title="Drone market signal"
        sub="Aggregate of 186 sources across filings, contracts, news and social · updated 4 min ago"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border border-border rounded-lg overflow-hidden">
        {marketKPIs.map((k, i) => {
          let borderClasses = "";
          if (i > 0) borderClasses += " border-l border-border";
          if (i === 2) borderClasses += " border-t lg:border-t-0";
          if (i === 3) borderClasses += " border-t md:border-t-0";
          if (i === 4) borderClasses += " border-t md:border-t-0";
          return (
            <div
              key={k.id}
              className={`p-4 bg-card/30 hover:bg-card/50 transition-colors${borderClasses}`}
            >
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                {k.label}
              </div>
              <div className="mt-2 text-[16px] font-semibold tracking-tight text-foreground leading-tight">
                {k.value}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1 leading-snug">{k.subtext}</div>
              <div
                className={`mt-2.5 inline-flex items-center gap-0.5 text-[11px] font-medium ${
                  k.trend === "up"
                    ? "text-success"
                    : k.trend === "down"
                      ? "text-warning"
                      : "text-muted-foreground"
                }`}
              >
                {k.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : k.trend === "down" ? (
                  <ArrowDownRight className="w-3 h-3" />
                ) : (
                  <Minus className="w-3 h-3" />
                )}
                {k.delta}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Re-export SectionHeader so existing imports still resolve
export { SectionHeader };
