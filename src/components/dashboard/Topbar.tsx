import { Search, Loader2, Bell, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, type FormEvent } from "react";
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
    <div className="sticky top-0 z-20 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 h-14 border-b border-border bg-background/75 backdrop-blur-xl flex items-center gap-3">
      <form onSubmit={submit} className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search company, ticker, or domain…"
          className="w-full h-9 pl-9 pr-16 rounded-md bg-white/[0.04] border border-border text-[13px] placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] transition"
        />
        <kbd className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-1 text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
          <Command className="w-2.5 h-2.5" /> K
        </kbd>
      </form>

      <div className="hidden md:flex items-center gap-1 text-[11px] text-muted-foreground">
        {recentSearches.slice(0, 3).map((s) => (
          <button
            key={s}
            onClick={() => {
              setQuery(s);
              onAnalyze(s);
            }}
            className="px-2 py-1 rounded hover:bg-white/[0.04] hover:text-foreground transition"
          >
            {s}
          </button>
        ))}
      </div>

      <Button
        type="button"
        onClick={submit}
        disabled={loading}
        size="sm"
        className="h-8 px-3 rounded-md bg-foreground text-background hover:bg-foreground/90 text-[12px] font-medium"
      >
        {loading ? <Loader2 className="w-3 h-3 mr-1.5 animate-spin" /> : null}
        {loading ? "Analyzing" : "Run analysis"}
      </Button>

      <div className="h-5 w-px bg-border" />
      <button className="relative p-1.5 rounded-md hover:bg-white/[0.04] text-muted-foreground hover:text-foreground transition">
        <Bell className="w-4 h-4" />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-destructive" />
      </button>
      <div className="w-7 h-7 rounded-full bg-gradient-subtle border border-border flex items-center justify-center text-[11px] font-medium">
        AT
      </div>
    </div>
  );
}
