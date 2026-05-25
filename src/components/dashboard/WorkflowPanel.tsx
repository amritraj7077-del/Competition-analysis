import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Clock } from "lucide-react";
import type { AnalysisResult } from "@/lib/mock-data";

export function WorkflowPanel({ data }: { data: AnalysisResult }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
      <h3 className="text-sm font-semibold mb-5 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-gradient-aurora" /> Workflow Status
      </h3>
      <div className="space-y-4">
        {data.workflow.map((w, i) => {
          const Icon = w.status === "done" ? CheckCircle2 : w.status === "running" ? Loader2 : Clock;
          const color =
            w.status === "done" ? "text-success" : w.status === "running" ? "text-neon-cyan" : "text-muted-foreground";
          return (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${color} ${w.status === "running" ? "animate-spin" : ""}`} />
                  <span className="text-sm">{w.label}</span>
                </div>
                <span className="text-xs text-muted-foreground capitalize">{w.status}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${w.progress}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gradient-aurora"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
