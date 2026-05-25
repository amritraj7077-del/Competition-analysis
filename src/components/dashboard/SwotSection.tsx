import { motion } from "framer-motion";
import { Shield, AlertTriangle, Target, Zap } from "lucide-react";
import type { AnalysisResult } from "@/lib/mock-data";

const meta = [
  { key: "strengths", label: "Strengths", icon: Shield, color: "text-success", glow: "oklch(0.72 0.18 155 / 0.3)" },
  { key: "weaknesses", label: "Weaknesses", icon: AlertTriangle, color: "text-warning", glow: "oklch(0.78 0.17 75 / 0.3)" },
  { key: "opportunities", label: "Opportunities", icon: Target, color: "text-neon-cyan", glow: "oklch(0.82 0.16 200 / 0.3)" },
  { key: "threats", label: "Threats", icon: Zap, color: "text-destructive", glow: "oklch(0.65 0.24 25 / 0.3)" },
] as const;

export function SwotSection({ data }: { data: AnalysisResult }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {meta.map((m, i) => {
        const items = data[m.key] as string[];
        const Icon = m.icon;
        return (
          <motion.div
            key={m.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-5 relative overflow-hidden"
            style={{ boxShadow: `inset 0 1px 0 oklch(1 0 0 / 0.05), 0 0 40px ${m.glow}` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${m.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{m.label}</span>
              </div>
              <span className="text-xs text-muted-foreground">{items.length}</span>
            </div>
            <ul className="space-y-2.5">
              {items.map((it, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex gap-2">
                  <span className={`mt-1 w-1 h-1 rounded-full ${m.color.replace("text-", "bg-")} shrink-0`} />
                  <span className="leading-relaxed">{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}
