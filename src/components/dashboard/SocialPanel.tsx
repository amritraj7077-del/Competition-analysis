import { MessageSquare, Twitter, Linkedin, Newspaper, ArrowUpRight } from "lucide-react";
import type { AnalysisResult } from "@/lib/mock-data";
import { SectionHeader } from "./IntelligenceOverview";

export function SocialPanel({ data }: { data: AnalysisResult }) {
  return (
    <section>
      <SectionHeader eyebrow="07 · Social intelligence" title="Community signal" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
        <Block icon={MessageSquare} title="Reddit r/drones">
          {data.social.reddit.map((r, i) => (
            <Row key={i} primary={r.topic} meta={`${r.score.toLocaleString()} upvotes · ${r.comments} comments`} />
          ))}
        </Block>
        <Block icon={Twitter} title="X / Twitter">
          {data.social.twitter.map((t, i) => (
            <Row key={i} primary={t.content} meta={`${t.handle} · ${t.engagement.toLocaleString()} eng`} />
          ))}
        </Block>
        <Block icon={Linkedin} title="LinkedIn hiring">
          {data.social.linkedin.map((l, i) => (
            <Row
              key={i}
              primary={l.role}
              meta={`${l.openings} openings`}
              trailing={
                <span className="text-[11px] text-success flex items-center gap-0.5 tabular-nums">
                  <ArrowUpRight className="w-3 h-3" />
                  {l.trend}%
                </span>
              }
            />
          ))}
        </Block>
        <Block icon={Newspaper} title="Latest news">
          {data.social.news.map((n, i) => (
            <Row key={i} primary={n.title} meta={`${n.source} · ${n.time}`} />
          ))}
        </Block>
      </div>
    </section>
  );
}

function Block({
  icon: Icon, title, children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background p-4">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{title}</span>
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function Row({ primary, meta, trailing }: { primary: string; meta: string; trailing?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 group">
      <div className="min-w-0">
        <div className="text-[13px] leading-snug truncate">{primary}</div>
        <div className="text-[10.5px] text-muted-foreground mt-0.5">{meta}</div>
      </div>
      {trailing}
    </div>
  );
}
