import { Search, Loader as Loader2, Bell, RefreshCw, ChevronDown } from "lucide-react";
import { useState, type FormEvent, useEffect, useRef } from "react";

const QUICK_SEARCHES = ["DJI", "Skydio", "Anduril", "Autel", "Shield AI", "Parrot", "Teal Drones", "BRINC"];

export function Topbar({
  onAnalyze,
  loading,
}: {
  onAnalyze: (q: string) => void;
  loading: boolean;
}) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = QUICK_SEARCHES.filter((s) =>
    query ? s.toLowerCase().includes(query.toLowerCase()) : true,
  );

  const submit = (q?: string) => {
    const val = (q ?? query).trim();
    if (!val) return;
    setQuery(val);
    setShowSuggestions(false);
    onAnalyze(val);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="sticky top-0 z-30 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 h-14 border-b border-border bg-background/80 backdrop-blur-xl flex items-center gap-3">
      {/* Search */}
      <div ref={containerRef} className="flex-1 max-w-lg relative">
        <form onSubmit={handleSubmit}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search company, ticker, or domain…"
            className="w-full h-9 pl-9 pr-4 rounded-md bg-white/[0.04] border border-border text-[13px] placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/20 focus:bg-white/[0.06] transition text-foreground"
          />
        </form>

        {/* Suggestions dropdown */}
        {showSuggestions && filtered.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-xl overflow-hidden z-50">
            <div className="px-3 py-2 border-b border-border">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Quick analysis
              </span>
            </div>
            {filtered.map((s) => (
              <button
                key={s}
                onMouseDown={() => submit(s)}
                className="w-full text-left px-3 py-2 text-[13px] hover:bg-white/[0.04] text-foreground/90 transition-colors flex items-center gap-2"
              >
                <Search className="w-3 h-3 text-muted-foreground" />
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick selects */}
      <div className="hidden lg:flex items-center gap-1 text-[11px]">
        {QUICK_SEARCHES.slice(0, 4).map((s) => (
          <button
            key={s}
            onClick={() => submit(s)}
            className="px-2.5 py-1 rounded border border-border/60 text-muted-foreground hover:text-foreground hover:bg-white/[0.04] hover:border-border transition-colors"
          >
            {s}
          </button>
        ))}
        <span className="text-muted-foreground text-[10px] px-1">+{QUICK_SEARCHES.length - 4} more</span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Run analysis button */}
        <button
          type="button"
          onClick={() => submit()}
          disabled={loading}
          className="h-8 px-3.5 rounded-md bg-foreground text-background text-[12px] font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 flex items-center gap-1.5"
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <RefreshCw className="w-3 h-3" />
          )}
          {loading ? "Analyzing…" : "Run analysis"}
        </button>

        <div className="h-5 w-px bg-border" />

        {/* Notifications */}
        <button className="relative p-1.5 rounded-md hover:bg-white/[0.04] text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-destructive" />
        </button>

        {/* User */}
        <button className="flex items-center gap-1.5 h-8 px-2 rounded-md hover:bg-white/[0.04] transition-colors">
          <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-border flex items-center justify-center text-[10px] font-semibold text-foreground">
            AT
          </div>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
