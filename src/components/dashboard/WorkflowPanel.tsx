import { CheckCircle2, Loader2, Clock } from "lucide-react";
import type { AnalysisResult } from "@/lib/mock-data";

export function WorkflowPanel({ data }: { data: AnalysisResult }) {
  return (
    <div className="panel rounded-lg p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Pipeline status</span>
        <span className="text-[10px] text-muted-foreground tabular-nums">
          {data.workflow.filter((w) => w.status === "done").length}/{data.workflow.length} done
        </span>
      </div>
      <div className="space-y-3">
        {data.workflow.map((w) => {
          const Icon = w.status === "done" ? CheckCircle2 : w.status === "running" ? Loader2 : Clock;
          const color =
            w.status === "done" ? "text-success" : w.status === "running" ? "text-foreground" : "text-muted-foreground";
          return (
            <div key={w.id}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className={`w-3 h-3 shrink-0 ${color} ${w.status === "running" ? "animate-spin" : ""}`} />
                  <span className="text-[12.5px] truncate">{w.label}</span>
                </div>
                <span className="text-[10px] text-muted-foreground capitalize tabular-nums">{w.progress}%</span>
              </div>
              <div className="h-0.5 rounded-full bg-white/[0.04] overflow-hidden">
                <div className="h-full bg-foreground/70 transition-all duration-700" style={{ width: `${w.progress}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
