import { companyLeft, companyRight, comparisonRows } from "@/lib/intelligence-data";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";
import type { CompanyProfile } from "@/lib/intelligence-data";

const DJI_COLOR = "oklch(0.78 0.1 210)";
const SKYDIO_COLOR = "oklch(0.72 0.14 295)";

export function CompanyComparison() {
  return (
    <section>
      <SectionHeader
        eyebrow="02 · Head-to-head"
        title="DJI vs Skydio"
        sub="Direct comparison across 8 competitive vectors · scored 0–100"
        action={
          <div className="hidden md:flex items-center gap-4 text-[11px]">
            <Legend color={DJI_COLOR} label="DJI" />
            <Legend color={SKYDIO_COLOR} label="Skydio" />
          </div>
        }
      />

      <div className="panel rounded-lg overflow-hidden border border-border">
        <div className="grid grid-cols-2 border-b border-border">
          <CompanyHeader company={companyLeft} side="left" />
          <CompanyHeader company={companyRight} side="right" />
        </div>

        <div className="divide-y divide-border">
          {comparisonRows.map((r, i) => (
            <motion.div
              key={r.metric}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[1fr_160px_1fr] items-center px-5 py-3.5 hover:bg-white/[0.012] transition-colors group"
            >
              {/* Left (DJI) */}
              <div className="flex items-center gap-3 min-w-0">
                <Bar value={r.leftScore} color={DJI_COLOR} align="right" />
                <span className="text-[12.5px] tabular-nums text-right shrink-0 text-foreground/90 min-w-[110px]">
                  {r.leftValue}
                </span>
              </div>

              {/* Center label */}
              <div className="px-3 text-center">
                <div className="text-[10.5px] text-muted-foreground uppercase tracking-wider leading-tight">
                  {r.metric}
                </div>
                {r.note && (
                  <div className="text-[9px] text-muted-foreground/60 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {r.note}
                  </div>
                )}
              </div>

              {/* Right (Skydio) */}
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[12.5px] tabular-nums text-left shrink-0 text-foreground/90 min-w-[110px]">
                  {r.rightValue}
                </span>
                <Bar value={r.rightScore} color={SKYDIO_COLOR} align="left" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-border px-5 py-3 bg-white/[0.01] flex items-center justify-between">
          <span className="text-[10.5px] text-muted-foreground">
            Sources: Drone Industry Insights 2026 · DoD DPCAP · CISA · GAO · Pitchbook
          </span>
          <span className="text-[10.5px] text-muted-foreground">Last updated May 2026</span>
        </div>
      </div>
    </section>
  );
}

function CompanyHeader({ company, side }: { company: CompanyProfile; side: "left" | "right" }) {
  return (
    <div className={`p-4 ${side === "right" ? "border-l border-border" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md bg-white/[0.05] border border-border flex items-center justify-center text-[14px] font-bold text-foreground">
          {company.name[0]}
        </div>
        <div>
          <div className="text-[13px] font-semibold text-foreground">{company.name}</div>
          <div className="text-[11px] text-muted-foreground">{company.hq} · {company.stage}</div>
        </div>
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-2">
        <Chip label="Founded" value={String(company.founded)} />
        <Chip label="Staff" value={company.employees} />
        <Chip label="Domain" value={company.domain} />
      </div>
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/[0.03] rounded px-2 py-1 border border-border">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-[11px] font-medium text-foreground/90 truncate mt-0.5">{value}</div>
    </div>
  );
}

function Bar({ value, color, align }: { value: number; color: string; align: "left" | "right" }) {
  return (
    <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{
          background: color,
          marginLeft: align === "right" ? "auto" : 0,
        }}
      />
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
      {label}
    </span>
  );
}
