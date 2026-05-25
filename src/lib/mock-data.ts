export type AnalysisResult = {
  summary: string;
  company: {
    name: string;
    domain: string;
    logo: string;
    industry: string;
  };
  scores: {
    overall: number;
    innovation: number;
    market: number;
    aiMaturity: number;
  };
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  insights: {
    trends: string[];
    growth: string[];
    competitors: { name: string; share: number }[];
  };
  radar: { metric: string; value: number; benchmark: number }[];
  trend: { month: string; mentions: number; sentiment: number }[];
  sentiment: { platform: string; positive: number; neutral: number; negative: number }[];
  social: {
    reddit: { topic: string; score: number; comments: number }[];
    twitter: { handle: string; content: string; engagement: number }[];
    linkedin: { role: string; openings: number; trend: number }[];
    news: { title: string; source: string; time: string }[];
  };
  workflow: { id: string; label: string; status: "done" | "running" | "queued"; progress: number }[];
};

// Primary benchmark: DJI (incumbent) vs Skydio (US autonomy challenger)
export const mockAnalysis: AnalysisResult = {
  summary:
    "DJI retains dominant global share of commercial and prosumer drones through manufacturing scale and price leadership, while Skydio is capturing US defense, public safety, and enterprise inspection contracts on the strength of its onboard autonomy stack. Geopolitical pressure on Chinese-made UAS continues to reshape procurement in North America.",
  company: {
    name: "DJI",
    domain: "dji.com",
    logo: "D",
    industry: "Autonomous Drones / UAS",
  },
  scores: { overall: 84, innovation: 81, market: 92, aiMaturity: 72 },
  strengths: [
    "Global manufacturing scale and supply-chain depth in Shenzhen",
    "Affordable, vertically integrated hardware ecosystem",
    "Industry-leading gimbal and camera imaging stack",
    "Dominant consumer and prosumer mindshare (Mavic, Air, Mini)",
  ],
  weaknesses: [
    "Geopolitical scrutiny and NDAA/Blue UAS exclusion in US programs",
    "US regulatory pressure (Commerce Entity List, state procurement bans)",
    "Enterprise data-sovereignty and trust concerns",
    "Slower onboard AI autonomy roadmap vs US challengers",
  ],
  opportunities: [
    "Expansion of Agras agricultural drones in APAC and LATAM",
    "Enterprise mapping / inspection via Matrice + Dock 2 deployments",
    "BVLOS rule expansion unlocking utility and infrastructure SLAs",
    "Cinematic and creator market with Osmo / Inspire ecosystem",
  ],
  threats: [
    "Skydio, Anduril, Parrot and Autel taking US public-sector share",
    "Tariff escalation and additional US/EU import restrictions",
    "Domestic Chinese competitors (Autel, XAG) compressing margins",
    "Counter-UAS and component sanctions on advanced sensors",
  ],
  insights: {
    trends: [
      "US public-sector procurement shifting to NDAA-compliant (Blue UAS) platforms",
      "Onboard AI autonomy replacing GPS-only navigation as table stakes",
      "FAA Part 108 BVLOS framework expanding enterprise TAM in 2025–26",
      "Drone-in-a-box (autonomous docking) deployments scaling in utilities",
    ],
    growth: [
      "Infrastructure & utility inspection (power, rail, pipelines)",
      "Public safety: first-responder drone-as-first-responder programs",
      "Defense ISR and short-range reconnaissance post-Ukraine doctrine shift",
      "Precision agriculture spraying and mapping in APAC",
    ],
    competitors: [
      { name: "DJI", share: 58 },
      { name: "Autel Robotics", share: 9 },
      { name: "Skydio", share: 7 },
      { name: "Parrot / Anafi", share: 4 },
      { name: "Others (Anduril, Teal, BRINC)", share: 22 },
    ],
  },
  radar: [
    { metric: "AI Autonomy", value: 68, benchmark: 90 },
    { metric: "Hardware Ecosystem", value: 95, benchmark: 70 },
    { metric: "Defense Adoption", value: 35, benchmark: 88 },
    { metric: "Enterprise Penetration", value: 74, benchmark: 82 },
    { metric: "Developer Ecosystem", value: 70, benchmark: 78 },
    { metric: "Global Reach", value: 96, benchmark: 55 },
  ],
  trend: [
    { month: "Jan", mentions: 4200, sentiment: 58 },
    { month: "Feb", mentions: 4600, sentiment: 55 },
    { month: "Mar", mentions: 5100, sentiment: 53 },
    { month: "Apr", mentions: 4800, sentiment: 56 },
    { month: "May", mentions: 5400, sentiment: 60 },
    { month: "Jun", mentions: 6100, sentiment: 62 },
    { month: "Jul", mentions: 5800, sentiment: 59 },
  ],
  sentiment: [
    { platform: "Reddit r/drones", positive: 54, neutral: 31, negative: 15 },
    { platform: "X / Twitter", positive: 48, neutral: 34, negative: 18 },
    { platform: "LinkedIn", positive: 66, neutral: 27, negative: 7 },
    { platform: "Defense News", positive: 39, neutral: 38, negative: 23 },
  ],
  social: {
    reddit: [
      { topic: "Mavic 4 Pro hands-on — still the prosumer benchmark", score: 3800, comments: 412 },
      { topic: "Will US enterprises drop DJI after the FY25 NDAA?", score: 2650, comments: 587 },
      { topic: "Skydio X10 vs DJI Matrice 30T for utility inspection", score: 2100, comments: 318 },
    ],
    twitter: [
      { handle: "@DroneDJ", content: "DJI still ships more units in a week than most rivals do in a year", engagement: 9800 },
      { handle: "@skydio", content: "X10 deployed with US Army for short-range reconnaissance trials", engagement: 14200 },
      { handle: "@FAANews", content: "Part 108 NPRM moves BVLOS one step closer to routine ops", engagement: 7600 },
    ],
    linkedin: [
      { role: "Computer Vision Engineer (UAS)", openings: 38, trend: 22 },
      { role: "UAV Autonomy Engineer", openings: 29, trend: 31 },
      { role: "Edge AI / Embedded ML Engineer", openings: 24, trend: 18 },
      { role: "Drone Navigation Researcher", openings: 12, trend: 14 },
    ],
    news: [
      { title: "House passes Countering CCP Drones Act, targeting DJI imports", source: "Reuters", time: "3h ago" },
      { title: "Skydio secures multi-year contract with US Army for short-range recon", source: "Defense News", time: "9h ago" },
      { title: "FAA advances Part 108 BVLOS rulemaking for commercial operators", source: "AVweb", time: "1d ago" },
      { title: "DJI Agras T50 expands precision-agriculture footprint in Brazil", source: "sUAS News", time: "2d ago" },
    ],
  },
  workflow: [
    { id: "1", label: "Company & filings research", status: "done", progress: 100 },
    { id: "2", label: "Competitive positioning analysis", status: "done", progress: 100 },
    { id: "3", label: "Social & community sentiment scrape", status: "running", progress: 72 },
    { id: "4", label: "Investor-grade report generation", status: "queued", progress: 0 },
  ],
};

// Realistic comparison set — autonomous drone landscape
export const recentReports = [
  { company: "DJI", score: 84, date: "2026-05-24", status: "Complete" },
  { company: "Skydio", score: 79, date: "2026-05-24", status: "Complete" },
  { company: "Anduril", score: 81, date: "2026-05-23", status: "Complete" },
  { company: "Autel Robotics", score: 67, date: "2026-05-22", status: "Complete" },
  { company: "Parrot", score: 61, date: "2026-05-21", status: "Complete" },
  { company: "Teal Drones (Red Cat)", score: 64, date: "2026-05-20", status: "Processing" },
];

export const recentSearches = ["DJI", "Skydio", "Anduril", "Autel Robotics", "Parrot"];
