import { headToHead } from "@/lib/mock-data";
import { SectionHeader } from "./IntelligenceOverview";
import { motion } from "framer-motion";

export function CompanyComparison() {
  const { left, right, rows } = headToHead;
  return (
    <section>
      <SectionHeader
        eyebrow="02 · Head-to-head"
        title="DJI vs Skydio"
        sub="Direct comparison across seven competitive vectors"
        action={
          <div className="hidden md:flex items-center gap-2 text-[11px]">
            <Legend color="oklch(0.78 0.1 210)" label={left.name} />
            <Legend color="oklch(0.72 0.14 295)" label={right.name} />
          </div>
        }
      />

      <div className="panel rounded-lg overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr] border-b border-border">
          <CompanyHeader name={left.name} domain={left.domain} tag={left.tag} side="left" />
          <CompanyHeader name={right.name} domain={right.domain} tag={right.tag} side="right" />
        </div>

        <div className="divide-y divide-border">
          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-[1fr_180px_1fr] items-center px-4 py-3 hover:bg-white/[0.015] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Bar value={r.leftBar} color="oklch(0.78 0.1 210)" align="right" />
                <span className="text-[13px] tabular-nums w-24 text-right text-foreground">{r.left}</span>
              </div>
              <div className="text-[11px] text-center text-muted-foreground uppercase tracking-wider">
                {r.label}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] tabular-nums w-24 text-left text-foreground">{r.right}</span>
                <Bar value={r.rightBar} color="oklch(0.72 0.14 295)" align="left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanyHeader({ name, domain, tag, side }: { name: string; domain: string; tag: string; side: "left" | "right" }) {
  return (
    <div className={`p-4 ${side === "right" ? "border-l border-border" : ""}`}>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-white/[0.06] border border-border flex items-center justify-center text-[13px] font-semibold">
          {name[0]}
        </div>
        <div>
          <div className="text-[13px] font-semibold">{name}</div>
          <div className="text-[11px] text-muted-foreground">{domain} · {tag}</div>
        </div>
      </div>
    </div>
  );
}

function Bar({ value, color, align }: { value: number; color: string; align: "left" | "right" }) {
  return (
    <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: color, marginLeft: align === "right" ? "auto" : 0 }}
      />
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span className="w-2 h-2 rounded-sm" style={{ background: color }} /> {label}
    </span>
  );
}
