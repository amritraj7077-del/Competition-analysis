import { Globe, Database, ArrowUpRight, FileText } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const companyBriefs = [
  {
    id: "dji",
    name: "DJI",
    logo: "D",
    domain: "dji.com",
    industry: "Consumer / Enterprise UAS",
    hq: "Shenzhen, China",
    stage: "Private (est. >$15B valuation)",
    summary:
      "DJI retains dominant global share of commercial and prosumer drones through manufacturing scale and price leadership across consumer, enterprise and agricultural segments. Geopolitical pressure from the US Entity List and escalating NDAA restrictions are reshaping procurement in North America, pushing enterprise operators toward NDAA-compliant alternatives.",
    scores: [
      { label: "Overall", value: 84 },
      { label: "Innovation", value: 81 },
      { label: "Market", value: 92 },
      { label: "AI Maturity", value: 68 },
    ],
  },
  {
    id: "skydio",
    name: "Skydio",
    logo: "S",
    domain: "skydio.com",
    industry: "Defense Tech / Autonomy",
    hq: "Redwood City, CA, USA",
    stage: "Series E · $230M raised",
    summary:
      "Skydio is capturing US defense, public safety and enterprise inspection contracts on the strength of its onboard autonomy stack — the most capable visual AI navigation system in the civilian UAS market. Blue UAS certification unlocks unrestricted federal procurement and positions Skydio as the primary NDAA-compliant alternative at scale.",
    scores: [
      { label: "Overall", value: 79 },
      { label: "Autonomy", value: 90 },
      { label: "Defense", value: 88 },
      { label: "Enterprise", value: 74 },
    ],
  },
];

const dataSources = [
  "SEC EDGAR", "FAA Registry", "DoD DPCAP", "Crunchbase", "LinkedIn", "Reddit", "X/Twitter", "Patent filings",
];

export function OverviewCard() {
  return (
    <section>
      <SectionHeader
        eyebrow="00 · Intelligence Brief"
        title="Subjects under analysis"
        sub="Aggregated from filings, news, hiring data, social signals and contract databases"
        action={
          <button className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition border border-border rounded px-2.5 py-1.5">
            <FileText className="w-3 h-3" />
            Export PDF
            <ArrowUpRight className="w-3 h-3" />
          </button>
        }
      />

      <div className="panel rounded-lg border border-border overflow-hidden">
        {/* Company cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-border">
          {companyBriefs.map((c) => (
            <div key={c.id} className="p-5">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-md border border-border bg-white/[0.05] flex items-center justify-center text-[16px] font-bold text-foreground shrink-0">
                  {c.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 text-[11px] text-muted-foreground">
                    <Globe className="w-2.5 h-2.5" />
                    <span>{c.domain}</span>
                    <span className="w-px h-2.5 bg-border" />
                    <span>{c.hq}</span>
                    <span className="w-px h-2.5 bg-border" />
                    <span>{c.stage}</span>
                  </div>
                  <h3 className="text-[17px] font-semibold mt-1 tracking-tight text-foreground">
                    {c.name}
                    <span className="text-[11px] text-muted-foreground font-normal ml-2">{c.industry}</span>
                  </h3>
                  <p className="text-[12.5px] text-muted-foreground mt-2 leading-relaxed">{c.summary}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-px bg-border border border-border rounded-md overflow-hidden mt-4">
                {c.scores.map((s) => (
                  <div key={s.label} className="bg-background px-3 py-2.5">
                    <div className="text-[9.5px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                    <div className="text-[17px] font-bold tabular-nums mt-0.5 text-foreground">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Data sources bar */}
        <div className="border-t border-border px-5 py-3 bg-white/[0.01] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Database className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Data sources</span>
            {dataSources.map((s) => (
              <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.03] border border-border text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">Last refreshed: 4 min ago</span>
        </div>
      </div>
    </section>
  );
}
