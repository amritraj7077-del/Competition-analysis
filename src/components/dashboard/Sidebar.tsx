import { LayoutDashboard, Search, FileText, Users, TrendingUp, Bell, Settings, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: LayoutDashboard, label: "Overview", key: "dashboard" },
  { icon: Search, label: "Companies", key: "search" },
  { icon: Users, label: "Competitors", key: "competitors" },
  { icon: TrendingUp, label: "Market Trends", key: "trends" },
  { icon: FileText, label: "Reports", key: "reports" },
  { icon: Bell, label: "Alerts", key: "alerts" },
  { icon: Settings, label: "Settings", key: "settings" },
];

export function Sidebar({ active = "dashboard" }: { active?: string }) {
  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 h-screen sticky top-0 border-r border-border bg-sidebar/60 backdrop-blur-xl">
      <div className="px-5 h-14 flex items-center gap-2.5 border-b border-border">
        <div className="w-7 h-7 rounded-md bg-foreground/95 flex items-center justify-center">
          <Plane className="w-3.5 h-3.5 text-background" strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <div className="font-semibold text-[13px] tracking-tight">UAS Intelligence</div>
          <div className="text-[10px] text-muted-foreground">v0.4 · preview</div>
        </div>
      </div>

      <div className="px-3 pt-4 pb-2">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 mb-1.5">Workspace</div>
        <nav className="flex flex-col gap-0.5">
          {items.map((item) => {
            const isActive = item.key === active;
            return (
              <button
                key={item.key}
                className={cn(
                  "group relative flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] transition-colors",
                  isActive
                    ? "bg-white/[0.05] text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]",
                )}
              >
                <item.icon className="w-3.5 h-3.5" strokeWidth={isActive ? 2.25 : 1.75} />
                <span>{item.label}</span>
                {item.key === "alerts" && (
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-destructive/15 text-destructive border border-destructive/20">3</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-3 border-t border-border">
        <div className="panel-flat rounded-md p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-muted-foreground">Workflow credits</span>
            <span className="text-[11px] text-foreground font-medium">2,480</span>
          </div>
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-[49%] bg-foreground/60" />
          </div>
          <div className="text-[10px] text-muted-foreground mt-1.5">of 5,000 monthly</div>
        </div>
      </div>
    </aside>
  );
}
