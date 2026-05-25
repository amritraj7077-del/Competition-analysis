import { LayoutDashboard, Search, FileText, Users, TrendingUp, Bell, Settings, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const items = [
  { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
  { icon: Search, label: "Search Company", key: "search" },
  { icon: FileText, label: "Reports", key: "reports" },
  { icon: Users, label: "Competitors", key: "competitors" },
  { icon: TrendingUp, label: "Market Trends", key: "trends" },
  { icon: Bell, label: "Alerts", key: "alerts" },
  { icon: Settings, label: "Settings", key: "settings" },
];

export function Sidebar({ active = "dashboard" }: { active?: string }) {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 glass-strong border-r border-border/40 p-5">
      <div className="flex items-center gap-2.5 mb-10">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-aurora flex items-center justify-center shadow-neon">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="leading-tight">
          <div className="font-semibold text-sm">Kolino</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Intelligence</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {items.map((item, i) => {
          const isActive = item.key === active;
          return (
            <motion.button
              key={item.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                isActive
                  ? "bg-gradient-to-r from-primary/20 to-accent/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-r-full bg-gradient-aurora" />
              )}
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className="mt-auto glass rounded-xl p-4">
        <div className="text-xs text-muted-foreground mb-1">Workflow credits</div>
        <div className="text-lg font-semibold text-gradient">2,480 / 5,000</div>
        <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full w-[49%] bg-gradient-aurora" />
        </div>
      </div>
    </aside>
  );
}
