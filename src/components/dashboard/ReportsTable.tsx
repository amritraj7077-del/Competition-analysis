import { motion } from "framer-motion";
import { recentReports } from "@/lib/mock-data";

const statusStyle: Record<string, string> = {
  Complete: "bg-success/15 text-success border-success/30",
  Processing: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30",
  Failed: "bg-destructive/15 text-destructive border-destructive/30",
};

export function ReportsTable() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-gradient-aurora" /> Recent Reports
        </h3>
        <button className="text-xs text-muted-foreground hover:text-foreground transition">View all</button>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="py-2 font-medium">Company</th>
              <th className="py-2 font-medium">Score</th>
              <th className="py-2 font-medium">Date</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((r) => (
              <tr key={r.company} className="border-t border-border/40 hover:bg-white/[0.02] transition">
                <td className="py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-aurora flex items-center justify-center text-xs font-semibold text-white">
                      {r.company[0]}
                    </div>
                    {r.company}
                  </div>
                </td>
                <td className="py-3">
                  <span className="text-gradient font-semibold">{r.score}</span>
                </td>
                <td className="py-3 text-muted-foreground">{r.date}</td>
                <td className="py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyle[r.status]}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
