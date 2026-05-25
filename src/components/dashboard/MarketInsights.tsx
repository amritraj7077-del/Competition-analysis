import { motion } from "framer-motion";
import { TrendingUp, Rocket, Crosshair } from "lucide-react";
import type { AnalysisResult } from "@/lib/mock-data";

export function MarketInsights({ data }: { data: AnalysisResult }) {
  const blocks = [
    { icon: TrendingUp, title: "Industry Trends", items: data.insights.trends, color: "text-neon-purple" },
    { icon: Rocket, title: "Growth Opportunities", items: data.insights.growth, color: "text-neon-cyan" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-sm font-semibold mb-5 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-gradient-aurora" /> Market Insights
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {blocks.map((b) => (
          <div key={b.title}>
            <div className="flex items-center gap-2 mb-3">
              <b.icon className={`w-4 h-4 ${b.color}`} />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{b.title}</span>
            </div>
            <ul className="space-y-2">
              {b.items.map((it, i) => (
                <li key={i} className="text-sm leading-relaxed glass rounded-lg px-3 py-2">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Crosshair className="w-4 h-4 text-neon-pink" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Competitor Positioning
            </span>
          </div>
          <div className="space-y-2.5">
            {data.insights.competitors.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{c.name}</span>
                  <span className="text-muted-foreground">{c.share}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.share * 2}%` }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="h-full bg-gradient-aurora"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
