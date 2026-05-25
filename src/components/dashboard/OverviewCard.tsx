import { motion } from "framer-motion";
import type { AnalysisResult } from "@/lib/mock-data";
import { Globe, TrendingUp } from "lucide-react";

function ScoreRing({ label, value, color }: { label: string; value: number; color: string }) {
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" stroke="oklch(1 0 0 / 0.06)" strokeWidth="5" fill="none" />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ strokeDasharray: circumference, filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">{value}</div>
      </div>
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
}

export function OverviewCard({ data }: { data: AnalysisResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="relative flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-aurora flex items-center justify-center text-2xl font-bold text-white shadow-neon animate-pulse-glow">
            {data.company.logo}
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Globe className="w-3 h-3" /> {data.company.domain} · {data.company.industry}
            </div>
            <h2 className="text-2xl font-semibold mt-1">{data.company.name}</h2>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-xl flex items-start gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 mt-0.5 text-success shrink-0" />
              {data.summary}
            </p>
          </div>
        </div>

        <div className="flex gap-5 flex-wrap">
          <ScoreRing label="Overall" value={data.scores.overall} color="oklch(0.65 0.27 300)" />
          <ScoreRing label="Innovation" value={data.scores.innovation} color="oklch(0.65 0.22 255)" />
          <ScoreRing label="Market" value={data.scores.market} color="oklch(0.82 0.16 200)" />
          <ScoreRing label="AI Maturity" value={data.scores.aiMaturity} color="oklch(0.72 0.25 340)" />
        </div>
      </div>
    </motion.div>
  );
}
