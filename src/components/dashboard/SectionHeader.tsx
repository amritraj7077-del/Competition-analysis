import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-4 gap-3">
      <div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
          {eyebrow}
        </div>
        <h2 className="text-[15px] font-semibold tracking-tight mt-1 text-foreground">{title}</h2>
        {sub && (
          <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">{sub}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
