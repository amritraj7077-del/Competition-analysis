import { Shield, AlertTriangle, Target, Zap } from "lucide-react";
import type { AnalysisResult } from "@/lib/mock-data";
import { SectionHeader } from "./IntelligenceOverview";

const meta = [
  { key: "strengths", label: "Strengths", icon: Shield, accent: "oklch(0.7 0.14 155)" },
  { key: "weaknesses", label: "Weaknesses", icon: AlertTriangle, accent: "oklch(0.75 0.14 75)" },
  { key: "opportunities", label: "Opportunities", icon: Target, accent: "oklch(0.78 0.1 210)" },
  { key: "threats", label: "Threats", icon: Zap, accent: "oklch(0.62 0.2 25)" },
] as const;

export function SwotSection({ data }: { data: AnalysisResult }) {
  return (
    <section>
      <SectionHeader
        eyebrow="03 · Strategic SWOT"
        title="DJI position analysis"
        sub="Internal capabilities and external forces"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden border border-border">
        {meta.map((m) => {
          const items = data[m.key] as string[];
          const Icon = m.icon;
          return (
            <div key={m.key} className="bg-background p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-3.5 rounded-sm" style={{ background: m.accent }} />
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-[12px] font-medium uppercase tracking-wider">{m.label}</span>
                </div>
                <span className="text-[10px] text-muted-foreground tabular-nums">{items.length} items</span>
              </div>
              <ul className="space-y-2">
                {items.map((it, idx) => (
                  <li key={idx} className="text-[12.5px] text-foreground/85 flex gap-2.5 leading-relaxed">
                    <span className="text-muted-foreground tabular-nums shrink-0 mt-px">{String(idx + 1).padStart(2, "0")}</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
