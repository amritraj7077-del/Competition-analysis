import { MessageSquare, Twitter, Linkedin, Newspaper, ArrowUpRight, TrendingUp } from "lucide-react";
import {
  redditThreads,
  tweetSignals,
  linkedInRoles,
  latestNews,
} from "@/lib/intelligence-data";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const categoryColors: Record<string, string> = {
  regulatory: "text-neon-blue",
  contract: "text-success",
  product: "text-neon-cyan",
  market: "text-warning",
  geopolitical: "text-destructive",
};

const sentimentColors: Record<string, string> = {
  bullish: "text-success",
  bearish: "text-destructive",
  neutral: "text-muted-foreground",
  mixed: "text-warning",
};

export function SocialPanel() {
  return (
    <section>
      <SectionHeader
        eyebrow="07 · Social Intelligence"
        title="Community signal"
        sub="Reddit, X/Twitter, LinkedIn hiring, news — aggregated and scored"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
        {/* Reddit */}
        <Block icon={MessageSquare} title="Reddit Discussions" count={redditThreads.length}>
          <div className="space-y-3">
            {redditThreads.map((r, i) => (
              <div key={i} className="group">
                <div className="flex items-start gap-2">
                  <div
                    className={cn(
                      "text-[9.5px] uppercase tracking-wider px-1.5 py-0.5 rounded border shrink-0 mt-0.5",
                      sentimentColors[r.sentiment] ?? "text-muted-foreground",
                      "bg-white/[0.03] border-border",
                    )}
                  >
                    {r.sentiment}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12.5px] leading-snug text-foreground/90 line-clamp-2">
                      {r.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                      {r.summary}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                      <span>{r.subreddit}</span>
                      <span className="tabular-nums">{r.score.toLocaleString()} pts</span>
                      <span className="tabular-nums">{r.comments} comments</span>
                      <span>{r.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* Twitter */}
        <Block icon={Twitter} title="X / Twitter Signals" count={tweetSignals.length}>
          <div className="space-y-3">
            {tweetSignals.map((t, i) => (
              <div key={i} className="group">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-border flex items-center justify-center text-[10px] font-semibold shrink-0">
                    {t.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-medium text-foreground">{t.name}</span>
                      {t.verified && (
                        <span className="w-3 h-3 rounded-full bg-neon-blue/60 flex items-center justify-center">
                          <span className="text-[7px] text-background font-bold">✓</span>
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground">{t.handle}</span>
                    </div>
                    <p className="text-[12px] text-foreground/85 mt-1 leading-relaxed">{t.content}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                      <span className="tabular-nums">{t.engagement.toLocaleString()} engagements</span>
                      <span>{t.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* LinkedIn */}
        <Block icon={Linkedin} title="LinkedIn Hiring Signals" count={linkedInRoles.length}>
          <div className="space-y-2.5">
            {linkedInRoles.map((l, i) => (
              <div key={i} className="flex items-start justify-between gap-3 group">
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] text-foreground/90 leading-snug">{l.title}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{l.company}</div>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                    <span className="tabular-nums">{l.openings} open roles</span>
                    <span>·</span>
                    <span>{l.avgSalary}</span>
                    <span>·</span>
                    <span>{l.seniorityMix}</span>
                  </div>
                </div>
                <span className="text-[11px] text-success flex items-center gap-0.5 tabular-nums shrink-0 mt-0.5 font-medium">
                  <ArrowUpRight className="w-3 h-3" />
                  +{l.yoyChange}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <TrendingUp className="w-3 h-3 text-success" />
            Hiring signals suggest accelerating headcount in autonomy and defense roles
          </div>
        </Block>

        {/* News */}
        <Block icon={Newspaper} title="Latest Intelligence" count={latestNews.length}>
          <div className="space-y-3">
            {latestNews.map((n, i) => (
              <div key={i} className="group">
                <div className="flex items-start gap-2">
                  <span
                    className={cn(
                      "text-[9px] uppercase tracking-wider px-1 py-0.5 rounded border shrink-0 mt-0.5",
                      categoryColors[n.category] ?? "text-muted-foreground",
                      "bg-white/[0.03] border-border",
                    )}
                  >
                    {n.category}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12.5px] leading-snug text-foreground/90 line-clamp-2">
                      {n.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {n.summary}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
                      <span className="font-medium">{n.source}</span>
                      <span>·</span>
                      <span>{n.timeAgo}</span>
                      {n.relevance === "high" && (
                        <>
                          <span>·</span>
                          <span className="text-warning uppercase tracking-wider font-medium">High relevance</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Block>
      </div>
    </section>
  );
}

function Block({
  icon: Icon,
  title,
  count,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <div className="bg-background p-4">
      <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground tabular-nums">
          {count} signals
        </span>
      </div>
      {children}
    </div>
  );
}
