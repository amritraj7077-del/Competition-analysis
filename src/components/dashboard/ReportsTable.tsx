import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { listRecentReports } from "@/lib/api";

const statusStyle = "bg-success/15 text-success border-success/30";

export function ReportsTable({ refreshKey = 0 }: { refreshKey?: number }) {
  const [rows, setRows] = useState<
    { id: string; company: string; score: number | null; created_at: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listRecentReports(8).then((data) => {
      if (!cancelled) {
        setRows(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-gradient-aurora" /> Recent Reports
        </h3>
        <span className="text-xs text-muted-foreground">{rows.length} stored</span>
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
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-t border-border/40">
                  <td className="py-3"><div className="h-4 w-32 rounded bg-white/5 animate-pulse" /></td>
                  <td className="py-3"><div className="h-4 w-10 rounded bg-white/5 animate-pulse" /></td>
                  <td className="py-3"><div className="h-4 w-24 rounded bg-white/5 animate-pulse" /></td>
                  <td className="py-3"><div className="h-4 w-20 rounded bg-white/5 animate-pulse" /></td>
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                  No reports yet — analyze a company to get started.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-t border-border/40 hover:bg-white/[0.02] transition">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gradient-aurora flex items-center justify-center text-xs font-semibold text-white">
                        {r.company[0]?.toUpperCase()}
                      </div>
                      {r.company}
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-gradient font-semibold">{r.score ?? "—"}</span>
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyle}`}>Complete</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
