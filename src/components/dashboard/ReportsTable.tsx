import { useEffect, useState } from "react";
import { listRecentReports } from "@/lib/api";
import { SectionHeader } from "./IntelligenceOverview";

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
    <section>
      <SectionHeader
        eyebrow="08 · Archive"
        title="Recent reports"
        sub={`${rows.length} cached analyses · ranked by recency`}
      />
      <div className="panel rounded-lg overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border bg-white/[0.015]">
                <th className="py-2.5 px-4 font-medium">Company</th>
                <th className="py-2.5 px-4 font-medium">Score</th>
                <th className="py-2.5 px-4 font-medium">Generated</th>
                <th className="py-2.5 px-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="py-3 px-4"><div className="h-3.5 w-32 rounded bg-white/5 animate-pulse" /></td>
                    <td className="py-3 px-4"><div className="h-3.5 w-10 rounded bg-white/5 animate-pulse" /></td>
                    <td className="py-3 px-4"><div className="h-3.5 w-24 rounded bg-white/5 animate-pulse" /></td>
                    <td className="py-3 px-4"><div className="h-3.5 w-20 rounded bg-white/5 animate-pulse ml-auto" /></td>
                  </tr>
                ))
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-[12px] text-muted-foreground">
                    No reports yet — run an analysis to populate the archive.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-white/[0.015] transition">
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded border border-border bg-white/[0.04] flex items-center justify-center text-[11px] font-medium">
                          {r.company[0]?.toUpperCase()}
                        </div>
                        {r.company}
                      </div>
                    </td>
                    <td className="py-2.5 px-4 tabular-nums font-medium">{r.score ?? "—"}</td>
                    <td className="py-2.5 px-4 text-muted-foreground tabular-nums">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-success">
                        <span className="w-1.5 h-1.5 rounded-full bg-success" />
                        Complete
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
