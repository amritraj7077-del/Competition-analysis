import { CircleCheck as CheckCircle2, Loader as Loader2, Clock, CircleAlert as AlertCircle } from "lucide-react";
import { defaultPipeline } from "@/lib/intelligence-data";
import type { PipelineStage } from "@/lib/intelligence-data";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  PipelineStage["status"],
  { icon: React.ComponentType<{ className?: string }>; color: string; barColor: string }
> = {
  done: { icon: CheckCircle2, color: "text-success", barColor: "bg-success/70" },
  running: { icon: Loader2, color: "text-foreground", barColor: "bg-foreground/70" },
  queued: { icon: Clock, color: "text-muted-foreground", barColor: "bg-white/[0.15]" },
  failed: { icon: AlertCircle, color: "text-destructive", barColor: "bg-destructive/60" },
};

export function WorkflowPanel() {
  const doneCount = defaultPipeline.filter((s) => s.status === "done").length;

  return (
    <div className="panel rounded-lg p-4 h-full border border-border flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Pipeline Status
        </span>
        <span className="text-[10px] text-muted-foreground tabular-nums">
          {doneCount}/{defaultPipeline.length} complete
        </span>
      </div>

      <div className="mb-4 mt-2">
        <div className="h-0.5 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full bg-success/60 transition-all duration-1000"
            style={{ width: `${(doneCount / defaultPipeline.length) * 100}%` }}
          />
        </div>
        <div className="text-[10px] text-muted-foreground mt-1">
          {Math.round((doneCount / defaultPipeline.length) * 100)}% pipeline complete
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {defaultPipeline.map((stage) => {
          const cfg = statusConfig[stage.status];
          const Icon = cfg.icon;
          return (
            <div key={stage.id}>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon
                    className={cn(
                      "w-3 h-3 shrink-0",
                      cfg.color,
                      stage.status === "running" && "animate-spin",
                    )}
                  />
                  <div className="min-w-0">
                    <div className="text-[12.5px] text-foreground/90 leading-tight truncate">
                      {stage.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 truncate">
                      {stage.description}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                    {stage.progress}%
                  </span>
                  {stage.completedAt && (
                    <div className="text-[9px] text-muted-foreground/70">{stage.completedAt}</div>
                  )}
                </div>
              </div>
              <div className="h-0.5 rounded-full bg-white/[0.04] overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-700", cfg.barColor)}
                  style={{ width: `${stage.progress}%` }}
                />
              </div>
              {stage.agent && (
                <div className="text-[9.5px] text-muted-foreground/60 mt-1">{stage.agent}</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-border mt-4 pt-3">
        <div className="text-[10px] text-muted-foreground">
          Next: Investor-grade PDF generation · estimated 3 min
        </div>
      </div>
    </div>
  );
}
