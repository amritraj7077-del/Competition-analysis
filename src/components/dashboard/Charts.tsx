import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, Legend,
} from "recharts";
import type { AnalysisResult } from "@/lib/mock-data";

const tooltipStyle = {
  background: "oklch(0.16 0.04 275 / 0.95)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 12,
  fontSize: 12,
  backdropFilter: "blur(20px)",
} as const;

export function ChartsGrid({ data }: { data: AnalysisResult }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5">
        <h4 className="text-sm font-semibold mb-1">Capability Radar</h4>
        <p className="text-xs text-muted-foreground mb-3">vs industry benchmark</p>
        <ResponsiveContainer width="100%" height={240}>
          <RadarChart data={data.radar}>
            <PolarGrid stroke="oklch(1 0 0 / 0.1)" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "oklch(0.68 0.04 270)", fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} stroke="transparent" />
            <Radar name="Company" dataKey="value" stroke="oklch(0.65 0.27 300)" fill="oklch(0.65 0.27 300)" fillOpacity={0.4} />
            <Radar name="Benchmark" dataKey="benchmark" stroke="oklch(0.65 0.22 255)" fill="oklch(0.65 0.22 255)" fillOpacity={0.15} />
            <Tooltip contentStyle={tooltipStyle} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass rounded-2xl p-5">
        <h4 className="text-sm font-semibold mb-1">Mentions & Sentiment Trend</h4>
        <p className="text-xs text-muted-foreground mb-3">Last 7 months</p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data.trend}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.65 0.27 300)" stopOpacity={0.7} />
                <stop offset="95%" stopColor="oklch(0.65 0.27 300)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.82 0.16 200)" stopOpacity={0.7} />
                <stop offset="95%" stopColor="oklch(0.82 0.16 200)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
            <XAxis dataKey="month" tick={{ fill: "oklch(0.68 0.04 270)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "oklch(0.68 0.04 270)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="mentions" stroke="oklch(0.65 0.27 300)" fill="url(#g1)" strokeWidth={2} />
            <Area type="monotone" dataKey="sentiment" stroke="oklch(0.82 0.16 200)" fill="url(#g2)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-5">
        <h4 className="text-sm font-semibold mb-1">Sentiment by Platform</h4>
        <p className="text-xs text-muted-foreground mb-3">Positive · Neutral · Negative</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data.sentiment} stackOffset="expand">
            <CartesianGrid stroke="oklch(1 0 0 / 0.05)" />
            <XAxis dataKey="platform" tick={{ fill: "oklch(0.68 0.04 270)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={{ fill: "oklch(0.68 0.04 270)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="positive" stackId="a" fill="oklch(0.72 0.18 155)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="neutral" stackId="a" fill="oklch(0.65 0.22 255)" />
            <Bar dataKey="negative" stackId="a" fill="oklch(0.65 0.24 25)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
