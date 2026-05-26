import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { radarData, mentionTrendData, platformSentiment } from "@/lib/intelligence-data";
import { SectionHeader } from "./SectionHeader";
import type { ReactNode } from "react";

const tooltipStyle = {
  background: "oklch(0.1 0.018 275 / 0.97)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 6,
  fontSize: 11,
  padding: "8px 12px",
  color: "oklch(0.9 0.005 270)",
} as const;

const axisTick = { fill: "oklch(0.55 0.02 270)", fontSize: 10 };

const formatMentions = (v: number) => {
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return String(v);
};

export function ChartsGrid() {
  return (
    <section>
      <SectionHeader
        eyebrow="06 · Quantitative signals"
        title="Capability, momentum and sentiment"
        sub="Scored 0–100 · trailing 7 months · 5 platforms tracked"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
        {/* Radar */}
        <ChartCard
          title="Capability radar"
          sub="DJI vs Skydio vs industry avg"
          legend={[
            { color: "oklch(0.78 0.1 210)", label: "DJI" },
            { color: "oklch(0.72 0.14 295)", label: "Skydio" },
            { color: "oklch(0.55 0.02 270)", label: "Industry avg" },
          ]}
        >
          <ResponsiveContainer width="100%" height={230}>
            <RadarChart data={radarData} margin={{ top: 12, right: 20, bottom: 12, left: 20 }}>
              <PolarGrid stroke="oklch(1 0 0 / 0.06)" />
              <PolarAngleAxis dataKey="metric" tick={{ ...axisTick, fontSize: 9.5 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} stroke="transparent" />
              <Radar
                name="DJI"
                dataKey="dji"
                stroke="oklch(0.78 0.1 210)"
                fill="oklch(0.78 0.1 210)"
                fillOpacity={0.15}
                strokeWidth={1.75}
              />
              <Radar
                name="Skydio"
                dataKey="skydio"
                stroke="oklch(0.72 0.14 295)"
                fill="oklch(0.72 0.14 295)"
                fillOpacity={0.12}
                strokeWidth={1.75}
              />
              <Radar
                name="Industry"
                dataKey="industry"
                stroke="oklch(0.55 0.02 270)"
                fill="transparent"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Mention trend */}
        <ChartCard
          title="Mention volume trend"
          sub="DJI vs Skydio · monthly media & social"
          legend={[
            { color: "oklch(0.78 0.1 210)", label: "DJI" },
            { color: "oklch(0.72 0.14 295)", label: "Skydio" },
          ]}
        >
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={mentionTrendData} margin={{ top: 10, right: 10, bottom: 0, left: -8 }}>
              <defs>
                <linearGradient id="gDji" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.1 210)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="oklch(0.78 0.1 210)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gSkydio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.14 295)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="oklch(0.72 0.14 295)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.04)" vertical={false} />
              <XAxis dataKey="month" tick={axisTick} axisLine={false} tickLine={false} />
              <YAxis
                tickFormatter={formatMentions}
                tick={axisTick}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v, name) => [
                  `${formatMentions(Number(v))} mentions`,
                  String(name) === "djiMentions" ? "DJI" : "Skydio",
                ]}
              />
              <Area
                type="monotone"
                dataKey="djiMentions"
                name="DJI"
                stroke="oklch(0.78 0.1 210)"
                fill="url(#gDji)"
                strokeWidth={1.75}
              />
              <Area
                type="monotone"
                dataKey="skydioMentions"
                name="Skydio"
                stroke="oklch(0.72 0.14 295)"
                fill="url(#gSkydio)"
                strokeWidth={1.75}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Sentiment mix */}
        <ChartCard
          title="Platform sentiment mix"
          sub="Positive · Neutral · Negative · by channel"
          legend={[
            { color: "oklch(0.7 0.14 155)", label: "Positive" },
            { color: "oklch(0.38 0.02 270)", label: "Neutral" },
            { color: "oklch(0.62 0.2 25)", label: "Negative" },
          ]}
        >
          <ResponsiveContainer width="100%" height={230}>
            <BarChart
              data={platformSentiment}
              stackOffset="expand"
              margin={{ top: 10, right: 10, bottom: 0, left: -8 }}
            >
              <CartesianGrid stroke="oklch(1 0 0 / 0.04)" vertical={false} />
              <XAxis dataKey="platform" tick={{ ...axisTick, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis
                tickFormatter={(v) => `${Math.round(v * 100)}%`}
                tick={axisTick}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number, name: string) => [
                  `${Math.round(v * 100)}%`,
                  name.charAt(0).toUpperCase() + name.slice(1),
                ]}
              />
              <Bar dataKey="positive" stackId="a" fill="oklch(0.7 0.14 155)" />
              <Bar dataKey="neutral" stackId="a" fill="oklch(0.38 0.02 270)" />
              <Bar dataKey="negative" stackId="a" fill="oklch(0.62 0.2 25)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </section>
  );
}

function ChartCard({
  title,
  sub,
  children,
  legend,
}: {
  title: string;
  sub: string;
  children: ReactNode;
  legend?: { color: string; label: string }[];
}) {
  return (
    <div className="bg-background p-4 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[12px] font-semibold text-foreground/90">{title}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>
        </div>
      </div>
      {children}
      {legend && (
        <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-border">
          {legend.map((l) => (
            <span key={l.label} className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
