import { motion } from "framer-motion";
import { MessageSquare, Twitter, Linkedin, Newspaper, ArrowUpRight } from "lucide-react";
import type { AnalysisResult } from "@/lib/mock-data";

export function SocialPanel({ data }: { data: AnalysisResult }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
      <h3 className="text-sm font-semibold mb-5 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-gradient-aurora" /> Social Intelligence
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Block icon={MessageSquare} title="Reddit Sentiment" color="text-orange-400">
          {data.social.reddit.map((r, i) => (
            <Row key={i} primary={r.topic} meta={`${r.score.toLocaleString()} upvotes · ${r.comments} comments`} />
          ))}
        </Block>

        <Block icon={Twitter} title="Twitter / X Discussions" color="text-neon-cyan">
          {data.social.twitter.map((t, i) => (
            <Row key={i} primary={t.content} meta={`${t.handle} · ${t.engagement.toLocaleString()} engagement`} />
          ))}
        </Block>

        <Block icon={Linkedin} title="LinkedIn Hiring Trends" color="text-neon-blue">
          {data.social.linkedin.map((l, i) => (
            <Row
              key={i}
              primary={l.role}
              meta={`${l.openings} openings`}
              trailing={
                <span className="text-xs text-success flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  {l.trend}%
                </span>
              }
            />
          ))}
        </Block>

        <Block icon={Newspaper} title="Latest News" color="text-neon-pink">
          {data.social.news.map((n, i) => (
            <Row key={i} primary={n.title} meta={`${n.source} · ${n.time}`} />
          ))}
        </Block>
      </div>
    </motion.div>
  );
}

function Block({
  icon: Icon, title, color, children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white/[0.02] border border-border/40 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</span>
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function Row({ primary, meta, trailing }: { primary: string; meta: string; trailing?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 group">
      <div className="min-w-0">
        <div className="text-sm truncate">{primary}</div>
        <div className="text-[11px] text-muted-foreground mt-0.5">{meta}</div>
      </div>
      {trailing}
    </div>
  );
}
