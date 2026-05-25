import { useEffect, useState } from "react";
import { listRecentReports } from "@/lib/api";
import { mockReportArchive } from "@/lib/intelligence-data";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

type DbRow = { id: string; company: string; score: number | null; created_at: string };

const statusConfig = {
  complete: { dot: "bg-success", text: "text-success", label: "Complete" },
  processing: { dot: "bg-warning animate-pulse", text: "text-warning", label: "Processing" },
  scheduled: { dot: "bg-muted-foreground", text: "text-muted-foreground", label: "Scheduled" },
  failed: { dot: "bg-destructive", text: "text-destructive", label: "Failed" },
} as const;

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? "text-success" : score >= 65 ? "text-warning" : "text-muted-foreground";
  return <span className={cn("tabular-nums font-semibold", color)}>{score}</span>;
}

export function ReportsTable({ refreshKey = 0 }: { refreshKey?: number }) {
  const [dbRows, setDbRows] = useState<DbRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listRecentReports(8).then((data) => {
      if (!cancelled) {
        setDbRows(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  // Show DB rows when available, otherwise fall back to mock archive
  const hasDbData = !loading && dbRows.length > 0;

  return (
    <section>
      <SectionHeader
        eyebrow="08 · Report Archive"
        title="Recent intelligence reports"
        sub={
          hasDbData
            ? `${dbRows.length} cached analyses from Supabase · ranked by recency`
            : `${mockReportArchive.length} reports in archive · multi-analyst coverage`
        }
      />
      <div className="panel rounded-lg overflow-hidden border border-border">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[9.5px] uppercase tracking-wider text-muted-foreground border-b border-border bg-white/[0.015]">
                <th className="py-3 px-4 font-semibold">Company</th>
                <th className="py-3 px-4 font-semibold">Sector</th>
                <th className="py-3 px-4 font-semibold">Score</th>
                <th className="py-3 px-4 font-semibold hidden md:table-cell">Confidence</th>
                <th className="py-3 px-4 font-semibold hidden md:table-cell">Analyst</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t border-border">
                    {Array.from({ length: 7 }).map((__, j) => (
                      <td key={j} className="py-3 px-4">
                        <div className="h-3 rounded bg-white/[0.04] animate-pulse" style={{ width: `${40 + (j % 3) * 20}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : hasDbData ? (
                dbRows.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-white/[0.012] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded border border-border bg-white/[0.04] flex items-center justify-center text-[11px] font-semibold">
                          {r.company[0]?.toUpperCase()}
                        </div>
                        <span className="font-medium">{r.company}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-[12px]">—</td>
                    <td className="py-3 px-4">
                      {r.score != null ? <ScoreBadge score={r.score} /> : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">—</td>
                    <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">—</td>
                    <td className="py-3 px-4 text-muted-foreground tabular-nums text-[12px]">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-success">
                        <span className="w-1.5 h-1.5 rounded-full bg-success" />
                        Complete
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                mockReportArchive.map((r, i) => {
                  const cfg = statusConfig[r.status] ?? statusConfig.complete;
                  return (
                    <tr key={i} className="border-t border-border hover:bg-white/[0.012] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded border border-border bg-white/[0.04] flex items-center justify-center text-[11px] font-semibold">
                            {r.company[0]?.toUpperCase()}
                          </div>
                          <span className="font-medium text-foreground">{r.company}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-[12px] max-w-[160px] truncate">
                        {r.sector}
                      </td>
                      <td className="py-3 px-4">
                        <ScoreBadge score={r.score} />
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 max-w-[64px] bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-foreground/40 rounded-full"
                              style={{ width: `${r.analystConfidence}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-muted-foreground tabular-nums">{r.analystConfidence}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-[12px] hidden md:table-cell">
                        {r.analyst}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground tabular-nums text-[12px]">
                        {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={cn("inline-flex items-center gap-1.5 text-[11px]", cfg.text)}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
                          {cfg.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
