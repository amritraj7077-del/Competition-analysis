import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar,
} from "recharts";
import type { AnalysisResult } from "@/lib/mock-data";
import { SectionHeader } from "./IntelligenceOverview";

const tooltipStyle = {
  background: "oklch(0.1 0.018 275 / 0.96)",
  border: "1px solid oklch(1 0 0 / 0.08)",
  borderRadius: 6,
  fontSize: 11,
  padding: "6px 10px",
} as const;

const axisTick = { fill: "oklch(0.6 0.02 270)", fontSize: 10 };

export function ChartsGrid({ data }: { data: AnalysisResult }) {
  return (
    <section>
      <SectionHeader
        eyebrow="06 · Quantitative signals"
        title="Capability, momentum and sentiment"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
        <ChartCard title="Capability vs benchmark" sub="DJI · Skydio">
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={data.radar} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
              <PolarGrid stroke="oklch(1 0 0 / 0.08)" />
              <PolarAngleAxis dataKey="metric" tick={axisTick} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} stroke="transparent" />
              <Radar name="DJI" dataKey="value" stroke="oklch(0.78 0.1 210)" fill="oklch(0.78 0.1 210)" fillOpacity={0.18} strokeWidth={1.5} />
              <Radar name="Skydio" dataKey="benchmark" stroke="oklch(0.72 0.14 295)" fill="oklch(0.72 0.14 295)" fillOpacity={0.15} strokeWidth={1.5} />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Mentions & sentiment" sub="Trailing 7 months">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data.trend} margin={{ top: 10, right: 12, bottom: 0, left: -12 }}>
              <defs>
                <linearGradient id="gm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.14 295)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.72 0.14 295)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.04)" vertical={false} />
              <XAxis dataKey="month" tick={axisTick} axisLine={false} tickLine={false} />
              <YAxis tick={axisTick} axisLine={false} tickLine={false} width={40} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="mentions" stroke="oklch(0.72 0.14 295)" fill="url(#gm)" strokeWidth={1.75} />
              <Area type="monotone" dataKey="sentiment" stroke="oklch(0.78 0.1 210)" fill="transparent" strokeWidth={1.5} strokeDasharray="3 3" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sentiment mix" sub="Positive · Neutral · Negative">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.sentiment} stackOffset="expand" margin={{ top: 10, right: 12, bottom: 0, left: -12 }}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.04)" vertical={false} />
              <XAxis dataKey="platform" tick={axisTick} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={axisTick} axisLine={false} tickLine={false} width={40} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="positive" stackId="a" fill="oklch(0.7 0.14 155)" />
              <Bar dataKey="neutral" stackId="a" fill="oklch(0.4 0.02 270)" />
              <Bar dataKey="negative" stackId="a" fill="oklch(0.62 0.2 25)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </section>
  );
}

function ChartCard({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="bg-background p-4">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <div className="text-[12px] font-medium">{title}</div>
          <div className="text-[10px] text-muted-foreground">{sub}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
