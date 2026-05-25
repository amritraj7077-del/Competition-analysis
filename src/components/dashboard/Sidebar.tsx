import {
  LayoutDashboard,
  Search,
  FileText,
  Users,
  TrendingUp,
  Bell,
  Settings,
  Plane,
  Shield,
  Globe,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Intelligence",
    items: [
      { icon: LayoutDashboard, label: "Overview", key: "dashboard" },
      { icon: Search, label: "Company Search", key: "search" },
      { icon: Users, label: "Competitors", key: "competitors" },
      { icon: TrendingUp, label: "Market Trends", key: "trends" },
    ],
  },
  {
    label: "Reports & Data",
    items: [
      { icon: FileText, label: "Reports", key: "reports" },
      { icon: Database, label: "Data Sources", key: "sources" },
      { icon: Globe, label: "Watchlist", key: "watchlist" },
    ],
  },
  {
    label: "System",
    items: [
      { icon: Bell, label: "Alerts", key: "alerts", badge: "3" },
      { icon: Shield, label: "Compliance", key: "compliance" },
      { icon: Settings, label: "Settings", key: "settings" },
    ],
  },
];

export function Sidebar({ active = "dashboard" }: { active?: string }) {
  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 h-screen sticky top-0 border-r border-border bg-sidebar/60 backdrop-blur-xl">
      {/* Logo */}
      <div className="px-4 h-14 flex items-center gap-2.5 border-b border-border">
        <div className="w-7 h-7 rounded-md bg-foreground/95 flex items-center justify-center shrink-0">
          <Plane className="w-3.5 h-3.5 text-background" strokeWidth={2.5} />
        </div>
        <div className="leading-tight min-w-0">
          <div className="font-semibold text-[13px] tracking-tight text-foreground">UAS Intelligence</div>
          <div className="text-[10px] text-muted-foreground">v1.0 · enterprise preview</div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-3 pt-4 pb-2 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground/70 px-2 mb-1 font-medium">
              {group.label}
            </div>
            <nav className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = item.key === active;
                return (
                  <button
                    key={item.key}
                    className={cn(
                      "group relative flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[12.5px] transition-colors w-full text-left",
                      isActive
                        ? "bg-white/[0.07] text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]",
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r bg-foreground/60" />
                    )}
                    <item.icon
                      className="w-3.5 h-3.5 shrink-0"
                      strokeWidth={isActive ? 2.25 : 1.75}
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {"badge" in item && item.badge && (
                      <span className="text-[9.5px] px-1 py-0.5 rounded bg-destructive/20 text-destructive border border-destructive/25 font-medium">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className="panel-flat rounded-md p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10.5px] text-muted-foreground">Analysis credits</span>
            <span className="text-[10.5px] text-foreground font-semibold">2,480</span>
          </div>
          <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full w-[49%] rounded-full bg-foreground/50" />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[9.5px] text-muted-foreground">of 5,000 monthly</span>
            <span className="text-[9.5px] text-muted-foreground">49% used</span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2.5 px-1">
          <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-border flex items-center justify-center text-[10px] font-semibold">
            AT
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-medium text-foreground truncate">A. Torres</div>
            <div className="text-[9.5px] text-muted-foreground">Senior Analyst</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
