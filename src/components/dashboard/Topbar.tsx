import { Search, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { recentSearches } from "@/lib/mock-data";

export function Topbar({
  onAnalyze,
  loading,
}: {
  onAnalyze: (q: string) => void;
  loading: boolean;
}) {
  const [query, setQuery] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onAnalyze(query.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-5"
    >
      <form onSubmit={submit} className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search company, startup, or domain…"
            className="w-full pl-11 pr-4 h-12 rounded-xl bg-white/5 border border-border/60 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="h-12 px-6 rounded-xl bg-gradient-aurora text-white hover:opacity-90 shadow-neon border-0"
        >
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
          {loading ? "Analyzing" : "Analyze"}
        </Button>
      </form>

      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground">Recent:</span>
        {recentSearches.map((s) => (
          <button
            key={s}
            onClick={() => {
              setQuery(s);
              onAnalyze(s);
            }}
            className="text-xs px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-border/40 text-muted-foreground hover:text-foreground transition"
          >
            {s}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
