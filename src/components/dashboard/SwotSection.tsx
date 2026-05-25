import { useState } from "react";
import { Shield, TriangleAlert as AlertTriangle, Target, Zap } from "lucide-react";
import { djiSwot, skydioSwot } from "@/lib/intelligence-data";
import type { SwotAnalysis, SwotItem } from "@/lib/intelligence-data";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

const quadrants = [
  {
    key: "strengths" as const,
    label: "Strengths",
    icon: Shield,
    accent: "oklch(0.7 0.14 155)",
    accentBg: "bg-success/10",
    accentBorder: "border-success/20",
  },
  {
    key: "weaknesses" as const,
    label: "Weaknesses",
    icon: AlertTriangle,
    accent: "oklch(0.75 0.14 75)",
    accentBg: "bg-warning/10",
    accentBorder: "border-warning/20",
  },
  {
    key: "opportunities" as const,
    label: "Opportunities",
    icon: Target,
    accent: "oklch(0.78 0.1 210)",
    accentBg: "bg-neon-cyan/10",
    accentBorder: "border-neon-cyan/20",
  },
  {
    key: "threats" as const,
    label: "Threats",
    icon: Zap,
    accent: "oklch(0.62 0.2 25)",
    accentBg: "bg-destructive/10",
    accentBorder: "border-destructive/20",
  },
] as const;

export function SwotSection() {
  const [active, setActive] = useState<"dji" | "skydio">("dji");
  const swot: SwotAnalysis = active === "dji" ? djiSwot : skydioSwot;

  return (
    <section>
      <SectionHeader
        eyebrow="03 · Strategic SWOT"
        title="Competitive position analysis"
        sub="Internal capabilities and external forces · sourced from filings, contracts, and analyst reports"
        action={
          <div className="flex items-center border border-border rounded-md overflow-hidden text-[11px]">
            <button
              onClick={() => setActive("dji")}
              className={cn(
                "px-3 py-1.5 transition-colors",
                active === "dji"
                  ? "bg-white/[0.08] text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]",
              )}
            >
              DJI
            </button>
            <div className="w-px h-full bg-border" />
            <button
              onClick={() => setActive("skydio")}
              className={cn(
                "px-3 py-1.5 transition-colors",
                active === "skydio"
                  ? "bg-white/[0.08] text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]",
              )}
            >
              Skydio
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden border border-border">
        {quadrants.map((q) => {
          const items: SwotItem[] = swot[q.key];
          const Icon = q.icon;
          return (
            <div key={q.key} className="bg-background p-5 hover:bg-white/[0.008] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-0.5 h-4 rounded-full" style={{ background: q.accent }} />
                  <div className={cn("p-1 rounded", q.accentBg, "border", q.accentBorder)}>
                    <Icon className="w-3 h-3" style={{ color: q.accent }} />
                  </div>
                  <span className="text-[11.5px] font-semibold uppercase tracking-wider text-foreground/90">
                    {q.label}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {items.length} findings
                </span>
              </div>
              <ul className="space-y-3">
                {items.map((item, idx) => (
                  <li key={idx} className="flex gap-3 group">
                    <span className="text-[10px] text-muted-foreground tabular-nums shrink-0 mt-1.5 font-mono">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12.5px] text-foreground/85 leading-relaxed">{item.text}</p>
                      {item.evidence && (
                        <span className="inline-block mt-1 text-[10px] text-muted-foreground/70 italic">
                          {item.evidence}
                        </span>
                      )}
                    </div>
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
