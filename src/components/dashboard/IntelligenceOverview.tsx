import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { intelligenceKPIs } from "@/lib/mock-data";

export function IntelligenceOverview() {
  return (
    <section>
      <SectionHeader
        eyebrow="01 · Intelligence Overview"
        title="Drone market signal"
        sub="Aggregate of 142 sources · updated 4 min ago"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border border-border rounded-lg overflow-hidden bg-card/40">
        {intelligenceKPIs.map((k, i) => (
          <div
            key={k.label}
            className={`p-4 ${i !== 0 ? "border-l border-border" : ""} ${i >= 2 ? "border-t md:border-t-0 lg:border-t-0" : ""} ${i >= 3 ? "md:border-t" : ""} ${i === 3 ? "md:border-l-0 lg:border-l" : ""}`}
          >
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k.label}</div>
            <div className="mt-2 text-lg font-semibold tracking-tight">{k.value}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{k.sub}</div>
            <div
              className={`mt-2 inline-flex items-center gap-0.5 text-[11px] ${
                k.trend === "up" ? "text-success" : "text-warning"
              }`}
            >
              {k.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {k.delta}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-3 gap-3">
      <div>
        <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{eyebrow}</div>
        <h2 className="text-[15px] font-semibold tracking-tight mt-1">{title}</h2>
        {sub && <p className="text-[12px] text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  );
}
