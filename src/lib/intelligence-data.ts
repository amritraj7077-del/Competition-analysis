// Core intelligence data types and realistic structured data
// Modeled after defense-tech analyst reports and market intelligence platforms

export type SentimentLabel = "bullish" | "bearish" | "neutral" | "mixed";
export type RiskLevel = "low" | "moderate" | "elevated" | "high" | "critical";
export type StatusLabel = "complete" | "processing" | "scheduled" | "failed";

// ─── KPI Cards ───────────────────────────────────────────────────────────────
export type KPICard = {
  id: string;
  label: string;
  value: string;
  subtext: string;
  delta: string;
  trend: "up" | "down" | "flat";
  unit?: string;
  source?: string;
};

export const marketKPIs: KPICard[] = [
  {
    id: "market-leader",
    label: "Market Leader",
    value: "DJI",
    subtext: "58.3% global UAS share",
    delta: "−2.1pp YoY",
    trend: "down",
    source: "Drone Industry Insights Q1 2026",
  },
  {
    id: "autonomy-leader",
    label: "Autonomy Score",
    value: "Skydio",
    subtext: "90 / 100 onboard AI stack",
    delta: "+6 vs DJI (84)",
    trend: "up",
    source: "DoD Blue UAS Evaluation 2025",
  },
  {
    id: "enterprise-adoption",
    label: "Enterprise Adoption",
    value: "74%",
    subtext: "Matrice + Dock 2 deployments",
    delta: "+8pp YoY",
    trend: "up",
    source: "DJI Enterprise Report 2025",
  },
  {
    id: "regulatory-risk",
    label: "Regulatory Risk",
    value: "Elevated",
    subtext: "FY25 NDAA · Entity List exposure",
    delta: "DJI restricted",
    trend: "down",
    source: "CISA Advisory 2026-03",
  },
  {
    id: "defense-contracts",
    label: "Defense Readiness",
    value: "Skydio · Anduril",
    subtext: "Blue UAS List approved",
    delta: "+12 contracts Q1",
    trend: "up",
    source: "DoD DPCAP Database",
  },
];

// ─── Head-to-Head Comparison ─────────────────────────────────────────────────
export type ComparisonRow = {
  metric: string;
  leftValue: string;
  rightValue: string;
  leftScore: number;
  rightScore: number;
  note?: string;
};

export type CompanyProfile = {
  name: string;
  ticker?: string;
  domain: string;
  hq: string;
  founded: number;
  employees: string;
  stage: string;
  tagline: string;
};

export const companyLeft: CompanyProfile = {
  name: "DJI",
  domain: "dji.com",
  hq: "Shenzhen, China",
  founded: 2006,
  employees: "~14,000",
  stage: "Private",
  tagline: "Global incumbent · manufacturing scale",
};

export const companyRight: CompanyProfile = {
  name: "Skydio",
  ticker: undefined,
  domain: "skydio.com",
  hq: "Redwood City, CA",
  founded: 2014,
  employees: "~600",
  stage: "Series E ($230M raised)",
  tagline: "US autonomy challenger · defense focus",
};

export const comparisonRows: ComparisonRow[] = [
  {
    metric: "Global market share",
    leftValue: "58.3%",
    rightValue: "6.8%",
    leftScore: 58,
    rightScore: 7,
    note: "Source: Drone Industry Insights 2026",
  },
  {
    metric: "Onboard AI autonomy",
    leftValue: "GPS-assisted (84/100)",
    rightValue: "Full visual AI (90/100)",
    leftScore: 68,
    rightScore: 90,
    note: "DoD Blue UAS autonomy benchmark",
  },
  {
    metric: "Enterprise fleet deployments",
    leftValue: "30,000+ fleets",
    rightValue: "3,200+ fleets",
    leftScore: 82,
    rightScore: 56,
    note: "As of Q4 2025",
  },
  {
    metric: "US defense contracts",
    leftValue: "Restricted (NDAA)",
    rightValue: "$74M+ awarded",
    leftScore: 12,
    rightScore: 88,
    note: "FY24–25 DoD contract database",
  },
  {
    metric: "Hardware pricing tier",
    leftValue: "$500 – $15,000",
    rightValue: "$11,000 – $25,000",
    leftScore: 72,
    rightScore: 45,
    note: "Lower DJI score = higher accessibility",
  },
  {
    metric: "Manufacturing scale",
    leftValue: "Vertically integrated",
    rightValue: "Contract assembly",
    leftScore: 96,
    rightScore: 48,
    note: "Unit output capacity",
  },
  {
    metric: "Regulatory compliance (US)",
    leftValue: "Entity List exposure",
    rightValue: "Blue UAS certified",
    leftScore: 22,
    rightScore: 92,
    note: "NDAA Section 848 / 1045",
  },
  {
    metric: "Software / SDK ecosystem",
    leftValue: "MSDK 5 · DJI Cloud",
    rightValue: "Skydio API · Skills SDK",
    leftScore: 78,
    rightScore: 74,
    note: "Developer platform depth",
  },
];

// ─── SWOT Analysis ───────────────────────────────────────────────────────────
export type SwotItem = {
  text: string;
  evidence?: string;
};

export type SwotAnalysis = {
  company: string;
  strengths: SwotItem[];
  weaknesses: SwotItem[];
  opportunities: SwotItem[];
  threats: SwotItem[];
};

export const djiSwot: SwotAnalysis = {
  company: "DJI",
  strengths: [
    { text: "Vertically integrated supply chain in Shenzhen with 85%+ component self-sufficiency", evidence: "DJI Annual Report 2024" },
    { text: "Consumer and prosumer market dominance: Mavic, Air, Mini series hold 3 of top 5 SKUs globally", evidence: "NPD Group 2025" },
    { text: "Industry-leading gimbal and camera imaging stack used in broadcast, film, and mapping", evidence: "B&H/Adorama market data" },
    { text: "Extensive enterprise ecosystem: Matrice 30T, Dock 2, FlightHub 2 for scaled deployment", evidence: "DJI Enterprise whitepaper" },
    { text: "Agras agricultural drone line holds 70%+ APAC precision-ag market share", evidence: "AUVSI Report Q3 2025" },
  ],
  weaknesses: [
    { text: "Listed on US Department of Commerce Entity List since 2020; procurement restrictions escalating", evidence: "Federal Register 2020-24532" },
    { text: "NDAA Section 848/1045 prohibits DoD procurement; 23 states have enacted or pending bans", evidence: "GAO Report 2025" },
    { text: "Data sovereignty concerns: FlightHub telemetry routes through Chinese-jurisdiction servers", evidence: "CISA Advisory AA22-011A" },
    { text: "R&D pivot toward autonomy slower than Skydio; obstacle avoidance still GPS-dependent in complex environments", evidence: "DoD Blue UAS benchmarks 2025" },
    { text: "Revenue concentration in consumer segment (48%) creates volatility with platform regulation", evidence: "Bloomberg Intelligence 2025" },
  ],
  opportunities: [
    { text: "FAA Part 108 BVLOS rulemaking (expected final rule H2 2026) unlocks $4.2B utility inspection TAM", evidence: "FAA NPRM 2024-18921" },
    { text: "Agras T50 expansion across South America and Africa where no regulatory restrictions apply", evidence: "Drone Industry Insights 2026" },
    { text: "Dock 2 autonomous inspection deployments with energy and telecom infrastructure operators", evidence: "DJI Enterprise case studies" },
    { text: "Creator economy growth: DJI Osmo and Inspire line for film and broadcast professionals", evidence: "PTC Market Analysis 2025" },
  ],
  threats: [
    { text: "Countering CCP Drones Act (H.R. 2864) passed House; Senate vote expected Q3 2026", evidence: "Congress.gov 118th Congress" },
    { text: "Skydio, Anduril, Parrot ANAFI USA and Teal 2 capturing US public-sector procurement rapidly", evidence: "DoD DPCAP Q1 2026 data" },
    { text: "Tariff escalation under USTR Section 301 review adds 25–45% import duty pressure", evidence: "USTR Docket 2025-01242" },
    { text: "Domestic Chinese rivals (Autel, XAG) competing on price in core consumer and ag segments", evidence: "IDC China Drone Market 2025" },
  ],
};

export const skydioSwot: SwotAnalysis = {
  company: "Skydio",
  strengths: [
    { text: "Proprietary obstacle avoidance via 6-camera 360° visual AI runs fully onboard without GPS dependency", evidence: "Skydio technical whitepaper 2024" },
    { text: "Blue UAS program certification enables unrestricted DoD and federal procurement", evidence: "Defense Innovation Unit 2024" },
    { text: "Multi-year Army contract ($71M, 2024) for short-range reconnaissance; further bids in pipeline", evidence: "DoD USASpending.gov 2024" },
    { text: "X2D and X10 platforms designed for infrastructure inspection with thermal and LiDAR payloads", evidence: "Skydio product brief Q4 2025" },
    { text: "Skydio 3D Scan and Site Scan integrations with Autodesk and Bentley enterprise workflows", evidence: "Autodesk partnership announcement" },
  ],
  weaknesses: [
    { text: "Global market share under 7%; limited distribution outside North America and select EU markets", evidence: "Drone Industry Insights 2026" },
    { text: "Premium pricing ($11K–$25K) limits total addressable market versus DJI's consumer price points", evidence: "Competitive pricing analysis 2025" },
    { text: "Consumer and prosumer market largely absent; unable to compete with DJI Mavic/Mini ecosystems", evidence: "NPD Group 2025" },
    { text: "Manufacturing outsourced; capacity scale-up constrained relative to vertically integrated competitors", evidence: "Supply chain analysis 2025" },
    { text: "Series E burn rate under investor scrutiny; path to profitability dependent on defense contract wins", evidence: "PitchBook data 2025" },
  ],
  opportunities: [
    { text: "DFR (Drone as First Responder) programs scaling in 400+ US municipalities; Skydio strong incumbent", evidence: "DRONERESPONDERS 2025 Survey" },
    { text: "Expanding DoD ISR contracts post-Ukraine doctrine shift toward short-range autonomous reconnaissance", evidence: "CNAS Defense Innovation brief 2025" },
    { text: "Enterprise inspection market growing at 19% CAGR; utility, telecom and rail sectors prime targets", evidence: "Grand View Research 2025" },
    { text: "International expansion into Five Eyes partner nations (UK, Australia, Canada) with Blue UAS equivalent approval", evidence: "Skydio international roadmap 2025" },
  ],
  threats: [
    { text: "DJI developing US-compliant hardware subsidiaries (DJI US subsidiary filings 2024) to circumvent NDAA restrictions", evidence: "Corporate registry filings 2024" },
    { text: "Anduril Ghost and Shield AI have deeper DoD relationships for high-value ISR contracts above Skydio's tier", evidence: "Breaking Defense analysis 2025" },
    { text: "Autel Robotics EVO Max 4T competing directly on enterprise specs at 30% lower price point", evidence: "Autel product launch Q2 2025" },
    { text: "Regulatory landscape could shift post-2026 election; executive action could alter Blue UAS restrictions on Chinese manufacturers", evidence: "FAS Policy Brief 2025" },
  ],
};

// ─── Industry Trends ─────────────────────────────────────────────────────────
export type IndustryTrend = {
  id: string;
  title: string;
  summary: string;
  category: "regulatory" | "technical" | "market" | "defense" | "geopolitical";
  signal: "accelerating" | "emerging" | "established" | "decelerating";
  timeframe: string;
  sources: string[];
};

export const industryTrends: IndustryTrend[] = [
  {
    id: "bvlos-faa",
    title: "FAA Part 108 BVLOS Framework Advancing",
    summary: "The FAA's Notice of Proposed Rulemaking for BVLOS operations (RIN 2120-AL37) is moving toward a final rule expected H2 2026. BVLOS unlocks commercial delivery, pipeline inspection and corridor monitoring at scale. Industry consensus estimates $4.2B incremental TAM within 24 months of final rule publication.",
    category: "regulatory",
    signal: "accelerating",
    timeframe: "H2 2026",
    sources: ["FAA NPRM 2024-18921", "AIA Industry Comment Docket", "AUVSI Policy Tracker"],
  },
  {
    id: "drone-in-box",
    title: "Drone-in-a-Box Deployments Scaling in Utilities",
    summary: "Autonomous docking stations enabling continuous inspection cycles are moving from pilot to production at US energy and telecom operators. Matrice Dock 2 and Percepto Arc deployments have expanded 3x YoY. Duke Energy, National Grid and Verizon filed recurring BVLOS waivers for corridor operations in Q4 2025.",
    category: "market",
    signal: "accelerating",
    timeframe: "Present",
    sources: ["Utility Dive 2025", "DJI Enterprise deployment data", "BVLOS waiver registry"],
  },
  {
    id: "edge-ai-inference",
    title: "Edge AI Moving from Companion Compute to Embedded SoC",
    summary: "Qualcomm Flight RB5 5G and NVIDIA Orin NX are enabling full computer-vision inference at the edge without ground station dependency. Skydio's onboard stack already runs at 110fps for obstacle avoidance; next-generation platforms target semantic scene understanding. Battery impact remains the primary engineering tradeoff.",
    category: "technical",
    signal: "accelerating",
    timeframe: "2025–2027",
    sources: ["NVIDIA Jetson roadmap", "Qualcomm Flight whitepaper", "IEEE Robotics 2025"],
  },
  {
    id: "defense-isr-shift",
    title: "Post-Ukraine ISR Doctrine Shifting to Autonomous Quadrotors",
    summary: "Short-range reconnaissance by squad-level autonomous drones has become a NATO and Five Eyes procurement priority after lessons from Ukraine's Bayraktar and FPV drone doctrine. SOCOM and Army RCO have both issued RFIs for NDAA-compliant platforms with >45 min endurance and visual AI nav. Skydio, Teal (Red Cat) and Shield AI are primary beneficiaries.",
    category: "defense",
    signal: "accelerating",
    timeframe: "2025–2028",
    sources: ["CNAS Defense brief", "Breaking Defense 2025", "DoD DPCAP data"],
  },
  {
    id: "precision-ag-expansion",
    title: "Precision Agriculture Drone Adoption Accelerating in APAC/LATAM",
    summary: "DJI Agras T50 and XAG P100 spraying drones are reducing per-hectare treatment costs by 35–55% vs tractor sprayers in rice, soybean and sugarcane verticals. Brazil's MAPA approved commercial UAS spraying at scale in 2024; Argentina and Indonesia following. Market expected to reach $6.2B by 2028.",
    category: "market",
    signal: "established",
    timeframe: "Present",
    sources: ["MAPA Brazil regulatory docket", "AGROANALYTICS 2025", "IDC Agri-Drone report"],
  },
  {
    id: "counter-uas",
    title: "Counter-UAS Market Expanding as Threat Surface Grows",
    summary: "Commercial off-the-shelf drones repurposed for reconnaissance and payload delivery by non-state actors has driven $2.1B in C-UAS procurement from DHS, DoD and allied forces. RF detection, optical tracking and kinetic defeat systems from D-Fend, Dedrone and Anduril have active DOD contracts. This dynamic pressures civil airspace operators and creates regulatory fragmentation.",
    category: "geopolitical",
    signal: "accelerating",
    timeframe: "Present",
    sources: ["DHS C-UAS Roadmap 2025", "GAO-25-106512", "Breaking Defense 2025"],
  },
];

// ─── Market Opportunities ────────────────────────────────────────────────────
export type MarketOpportunity = {
  vertical: string;
  tam: string;
  tamValue: number;
  cagr: string;
  cagrValue: number;
  timeline: string;
  description: string;
  keyPlayers: string[];
  keyDriver: string;
  readinessLevel: "early" | "developing" | "maturing" | "mature";
};

export const marketOpportunities: MarketOpportunity[] = [
  {
    vertical: "Defense ISR",
    tam: "$12.1B",
    tamValue: 12.1,
    cagr: "+27%",
    cagrValue: 27,
    timeline: "2025–2030",
    description: "Short-range reconnaissance, loitering munitions and squad-level autonomous ISR platforms following NATO doctrine updates post-Ukraine. FY26 defense budget includes $1.4B in UAS line items.",
    keyPlayers: ["Anduril", "Skydio", "Shield AI", "Teal (Red Cat)", "Joby (military contract)"],
    keyDriver: "NDAA compliance + DoD Blue UAS mandate",
    readinessLevel: "maturing",
  },
  {
    vertical: "Infrastructure Inspection",
    tam: "$8.4B",
    tamValue: 8.4,
    cagr: "+19%",
    cagrValue: 19,
    timeline: "2025–2028",
    description: "Power transmission lines, oil & gas pipelines, rail networks and telecom towers shifting from manual rope-access to drone-in-a-box autonomous inspection. Reduces per-inspection cost by 60–75%.",
    keyPlayers: ["DJI Matrice + Dock 2", "Skydio X10", "Percepto", "Censys Technologies"],
    keyDriver: "FAA BVLOS rulemaking + infrastructure bill funding",
    readinessLevel: "maturing",
  },
  {
    vertical: "Precision Agriculture",
    tam: "$6.2B",
    tamValue: 6.2,
    cagr: "+14%",
    cagrValue: 14,
    timeline: "2024–2028",
    description: "Spraying, variable-rate seeding, crop scouting and yield mapping. DJI Agras dominates APAC and LATAM. North American market constrained by EPA pesticide-UAS labeling requirements but growing at 22% CAGR.",
    keyPlayers: ["DJI Agras", "XAG", "Parrot", "AgEagle"],
    keyDriver: "Operational cost reduction vs conventional equipment",
    readinessLevel: "maturing",
  },
  {
    vertical: "Emergency Response (DFR)",
    tam: "$2.8B",
    tamValue: 2.8,
    cagr: "+22%",
    cagrValue: 22,
    timeline: "2024–2027",
    description: "Drone-as-first-responder programs deployed by 400+ US law enforcement and fire departments. Mean response time improvement of 4.1 minutes vs ground units. Skydio, BRINC and Axon Air dominating contract awards.",
    keyPlayers: ["Skydio", "BRINC", "Axon Air", "Dedrone"],
    keyDriver: "911 response time mandates + public safety budgets",
    readinessLevel: "developing",
  },
  {
    vertical: "Logistics & Last-Mile Delivery",
    tam: "$4.6B",
    tamValue: 4.6,
    cagr: "+31%",
    cagrValue: 31,
    timeline: "2026–2030",
    description: "Middle-mile and last-mile delivery gated on FAA Part 108 BVLOS final rule. Zipline, Wing and Matternet have active COAs. Amazon Prime Air received Part 135 certification; commercial scaling dependent on corridor management infrastructure.",
    keyPlayers: ["Zipline", "Wing (Alphabet)", "Amazon Prime Air", "Matternet"],
    keyDriver: "FAA Part 108 final rule (expected H2 2026)",
    readinessLevel: "early",
  },
];

// ─── Competitive Positioning ─────────────────────────────────────────────────
export type CompetitorPosition = {
  name: string;
  marketShare: number;
  autonomyScore: number;
  defenseReadiness: number;
  enterpriseScore: number;
  regulatoryRisk: number;
  color: string;
  focus: string;
};

export const competitorMatrix: CompetitorPosition[] = [
  { name: "DJI", marketShare: 58, autonomyScore: 68, defenseReadiness: 18, enterpriseScore: 82, regulatoryRisk: 78, color: "oklch(0.78 0.1 210)", focus: "Consumer / Enterprise / Ag" },
  { name: "Skydio", marketShare: 7, autonomyScore: 90, defenseReadiness: 88, enterpriseScore: 74, regulatoryRisk: 12, color: "oklch(0.72 0.14 295)", focus: "Autonomy / Defense / Inspection" },
  { name: "Anduril", marketShare: 3, autonomyScore: 85, defenseReadiness: 96, enterpriseScore: 58, regulatoryRisk: 8, color: "oklch(0.7 0.14 155)", focus: "Defense / C-UAS / Autonomy" },
  { name: "Autel", marketShare: 9, autonomyScore: 70, defenseReadiness: 22, enterpriseScore: 64, regulatoryRisk: 55, color: "oklch(0.75 0.14 75)", focus: "Enterprise / Consumer" },
  { name: "Parrot", marketShare: 4, autonomyScore: 74, defenseReadiness: 62, enterpriseScore: 68, regulatoryRisk: 14, color: "oklch(0.62 0.2 25)", focus: "Defense / Mapping / ANAFI USA" },
  { name: "Shield AI", marketShare: 2, autonomyScore: 88, defenseReadiness: 94, enterpriseScore: 42, regulatoryRisk: 6, color: "oklch(0.7 0.12 30)", focus: "Defense / Pilot AI / F-16 ISR" },
  { name: "Teal / Red Cat", marketShare: 2, autonomyScore: 76, defenseReadiness: 82, enterpriseScore: 38, regulatoryRisk: 10, color: "oklch(0.65 0.1 180)", focus: "Defense / Squad ISR" },
];

// ─── Social Intelligence ─────────────────────────────────────────────────────
export type RedditThread = {
  subreddit: string;
  title: string;
  summary: string;
  score: number;
  comments: number;
  sentiment: SentimentLabel;
  timeAgo: string;
};

export type Tweet = {
  handle: string;
  name: string;
  content: string;
  engagement: number;
  likes: number;
  reposts: number;
  timeAgo: string;
  verified: boolean;
};

export type LinkedInRole = {
  title: string;
  company: string;
  openings: number;
  yoyChange: number;
  avgSalary: string;
  seniorityMix: string;
};

export type NewsItem = {
  title: string;
  source: string;
  summary: string;
  timeAgo: string;
  category: "regulatory" | "contract" | "product" | "market" | "geopolitical";
  relevance: "high" | "medium";
};

export const redditThreads: RedditThread[] = [
  {
    subreddit: "r/drones",
    title: "Mavic 4 Pro hands-on — DJI still sets the prosumer benchmark at $2,499",
    summary: "Professional aerial photographers and surveyors praising the upgraded Hasselblad partnership sensor stack. Side-by-side with Autel EVO II Pro shows DJI retains ~15% image quality lead despite price parity.",
    score: 4820,
    comments: 512,
    sentiment: "bullish",
    timeAgo: "6h ago",
  },
  {
    subreddit: "r/drones",
    title: "Will enterprise operators drop DJI after the FY25 NDAA ban expands to state contracts?",
    summary: "Mixed reaction from fleet operators. 14 replies from public safety and utility managers weighing Skydio/Autel migration costs. Consensus: transition painful but inevitable for federally-funded programs. Private operators staying with DJI.",
    score: 3104,
    comments: 687,
    sentiment: "mixed",
    timeAgo: "14h ago",
  },
  {
    subreddit: "r/Skydio",
    title: "Skydio X10 vs DJI Matrice 30T for substration inspection — real-world comparison",
    summary: "Transmission engineer reports X10 outperforming M30T in GPS-denied environments under high-voltage lines. Matrice wins on flight time (41 min vs 35 min) and payload flexibility. Skydio wins on autonomous data capture workflow.",
    score: 2260,
    comments: 334,
    sentiment: "neutral",
    timeAgo: "1d ago",
  },
  {
    subreddit: "r/uas",
    title: "FAA published the BVLOS NPRM supplemental data — the numbers actually support optimism",
    summary: "Detailed analysis of FAA risk modeling showing BVLOS operations in sparsely populated corridors have equivalent or lower risk than existing Part 107 waivers. Community reaction mostly positive; lawyers flagging insurance framework gaps.",
    score: 1890,
    comments: 218,
    sentiment: "bullish",
    timeAgo: "2d ago",
  },
];

export const tweetSignals: Tweet[] = [
  {
    handle: "@DroneDJ",
    name: "DroneDJ",
    content: "DJI's Matrice 4E Enterprise has landed in 28 countries simultaneously — fastest global launch in UAS history. Fleet management API now supports 500+ concurrent drones per operator.",
    engagement: 11400,
    likes: 8200,
    reposts: 1840,
    timeAgo: "4h ago",
    verified: true,
  },
  {
    handle: "@skydio",
    name: "Skydio",
    content: "Proud to announce a multi-year contract expansion with the US Army for short-range autonomous reconnaissance. Skydio X2D is now the standard-issue ISR platform for 18 Army combat brigades.",
    engagement: 18600,
    likes: 14200,
    reposts: 3200,
    timeAgo: "9h ago",
    verified: true,
  },
  {
    handle: "@FAANews",
    name: "FAA Newsroom",
    content: "FAA releases supplemental notice for BVLOS operations rulemaking. Public comment period extended 60 days. Final rule now expected Q3 2026. Full text: faa.gov/uas/bvlos",
    engagement: 7800,
    likes: 5400,
    reposts: 1620,
    timeAgo: "1d ago",
    verified: true,
  },
  {
    handle: "@AndurilInd",
    name: "Anduril Industries",
    content: "Ghost 4 autonomous ISR drone completes 200-hour field evaluation with SOCOM. Extended range, reduced acoustic signature, onboard mission replanning. Full program details to follow.",
    engagement: 9200,
    likes: 6800,
    reposts: 1760,
    timeAgo: "2d ago",
    verified: true,
  },
];

export const linkedInRoles: LinkedInRole[] = [
  { title: "Computer Vision Engineer — UAV Systems", company: "Skydio", openings: 38, yoyChange: 22, avgSalary: "$165K–$215K", seniorityMix: "70% senior" },
  { title: "Autonomy / Flight Controls Engineer", company: "Various UAS OEMs", openings: 29, yoyChange: 31, avgSalary: "$148K–$195K", seniorityMix: "55% senior" },
  { title: "Edge AI / Embedded ML Engineer", company: "Anduril, Shield AI", openings: 24, yoyChange: 18, avgSalary: "$172K–$225K", seniorityMix: "60% senior" },
  { title: "UAS Program Manager (DoD cleared)", company: "Defense primes", openings: 41, yoyChange: 44, avgSalary: "$130K–$175K", seniorityMix: "40% senior" },
  { title: "FAA Regulatory Affairs Specialist", company: "UAS operators", openings: 16, yoyChange: 62, avgSalary: "$95K–$135K", seniorityMix: "30% senior" },
];

export const latestNews: NewsItem[] = [
  {
    title: "House passes Countering CCP Drones Act in 366–64 vote; Senate floor vote expected September",
    source: "Reuters",
    summary: "Legislation would add DJI and five Chinese UAS manufacturers to FCC Covered List, effectively banning future FCC approvals for new DJI models and restricting existing fleet operation on US networks.",
    timeAgo: "3h ago",
    category: "regulatory",
    relevance: "high",
  },
  {
    title: "Skydio secures $38M SOCOM contract expansion for Ghost Squad ISR capabilities",
    source: "Defense News",
    summary: "Contract includes 400+ X2D platforms plus multi-year software and training services. Award follows successful 6-month operational evaluation. Delivery begins Q4 2026.",
    timeAgo: "8h ago",
    category: "contract",
    relevance: "high",
  },
  {
    title: "FAA advances Part 108 BVLOS supplemental rulemaking; comment period open through August 1",
    source: "AVweb",
    summary: "Revised economic impact analysis projects 11,200 new commercial drone jobs and $8.7B GDP impact within five years of final rule. Industry groups broadly supportive; privacy advocates filing formal objections.",
    timeAgo: "1d ago",
    category: "regulatory",
    relevance: "high",
  },
  {
    title: "Anduril Ghost 4 completes 200-hour SOCOM field evaluation in austere environments",
    source: "Breaking Defense",
    summary: "Extended endurance (55 min vs 38 min for Ghost 3), lower RCS, and onboard mission replanning without datalink demonstrated. Program of record decision expected FY26.",
    timeAgo: "1d ago",
    category: "contract",
    relevance: "medium",
  },
  {
    title: "DJI Agras T50 expands Brazil footprint; 4,200 new units registered in Q1 2026",
    source: "sUAS News",
    summary: "Brazil's MAPA-approved fleet now exceeds 18,000 registered agricultural UAS. DJI holds 71% market share in the segment. Competitor XAG gaining share in soybean-belt states.",
    timeAgo: "2d ago",
    category: "market",
    relevance: "medium",
  },
  {
    title: "Autel Robotics EVO Max 4T pricing cut 15%; direct challenge to DJI Matrice 30T fleet programs",
    source: "Commercial UAV News",
    summary: "Autel's aggressive pricing in the $8,500 enterprise segment pressures both DJI and mid-market operators. Thermal + RGB dual-sensor configuration now competitive on specs. US-manufactured alternative narrative gaining traction.",
    timeAgo: "3d ago",
    category: "market",
    relevance: "medium",
  },
];

// ─── Radar Chart Data ─────────────────────────────────────────────────────────
export type RadarMetric = {
  metric: string;
  dji: number;
  skydio: number;
  industry: number;
};

export const radarData: RadarMetric[] = [
  { metric: "Autonomy", dji: 68, skydio: 90, industry: 62 },
  { metric: "Hardware", dji: 96, skydio: 70, industry: 74 },
  { metric: "Defense", dji: 22, skydio: 88, industry: 55 },
  { metric: "Enterprise", dji: 82, skydio: 74, industry: 66 },
  { metric: "Developer", dji: 76, skydio: 72, industry: 58 },
  { metric: "Geo Reach", dji: 96, skydio: 48, industry: 60 },
  { metric: "Regulatory", dji: 28, skydio: 88, industry: 65 },
];

// ─── Trend Data ───────────────────────────────────────────────────────────────
export type TrendPoint = {
  month: string;
  djiMentions: number;
  skydioMentions: number;
  djiSentiment: number;
  skydioSentiment: number;
};

export const mentionTrendData: TrendPoint[] = [
  { month: "Nov", djiMentions: 38400, skydioMentions: 8200, djiSentiment: 54, skydioSentiment: 72 },
  { month: "Dec", djiMentions: 41200, skydioMentions: 9600, djiSentiment: 52, skydioSentiment: 74 },
  { month: "Jan", djiMentions: 44800, skydioMentions: 11200, djiSentiment: 49, skydioSentiment: 76 },
  { month: "Feb", djiMentions: 42600, skydioMentions: 12400, djiSentiment: 51, skydioSentiment: 75 },
  { month: "Mar", djiMentions: 47200, skydioMentions: 14800, djiSentiment: 48, skydioSentiment: 78 },
  { month: "Apr", djiMentions: 45800, skydioMentions: 16200, djiSentiment: 50, skydioSentiment: 79 },
  { month: "May", djiMentions: 49400, skydioMentions: 18600, djiSentiment: 46, skydioSentiment: 81 },
];

// ─── Platform Sentiment ───────────────────────────────────────────────────────
export type PlatformSentiment = {
  platform: string;
  positive: number;
  neutral: number;
  negative: number;
  totalSignals: number;
};

export const platformSentiment: PlatformSentiment[] = [
  { platform: "Reddit", positive: 54, neutral: 31, negative: 15, totalSignals: 28400 },
  { platform: "X/Twitter", positive: 48, neutral: 34, negative: 18, totalSignals: 142600 },
  { platform: "LinkedIn", positive: 68, neutral: 26, negative: 6, totalSignals: 9800 },
  { platform: "Defense News", positive: 38, neutral: 39, negative: 23, totalSignals: 1240 },
  { platform: "YouTube", positive: 62, neutral: 28, negative: 10, totalSignals: 47200 },
];

// ─── Workflow / Pipeline ──────────────────────────────────────────────────────
export type PipelineStage = {
  id: string;
  label: string;
  description: string;
  status: "done" | "running" | "queued" | "failed";
  progress: number;
  duration?: string;
  completedAt?: string;
  agent?: string;
};

export const defaultPipeline: PipelineStage[] = [
  {
    id: "company-research",
    label: "Company & filings research",
    description: "SEC EDGAR, Companies House, Crunchbase, patent filings",
    status: "done",
    progress: 100,
    duration: "2m 14s",
    completedAt: "4 min ago",
    agent: "Research Agent v2",
  },
  {
    id: "competitive-positioning",
    label: "Competitive positioning analysis",
    description: "Head-to-head scoring across 8 vectors",
    status: "done",
    progress: 100,
    duration: "1m 48s",
    completedAt: "2 min ago",
    agent: "Analysis Agent v3",
  },
  {
    id: "social-intelligence",
    label: "Social & community sentiment scrape",
    description: "Reddit, X, LinkedIn, news aggregation",
    status: "running",
    progress: 68,
    agent: "Social Intel Agent v2",
  },
  {
    id: "report-generation",
    label: "Investor-grade report generation",
    description: "Structured PDF with executive summary, data appendix",
    status: "queued",
    progress: 0,
    agent: "Report Agent v1",
  },
];

// ─── Report Archive ───────────────────────────────────────────────────────────
export type ReportEntry = {
  company: string;
  score: number;
  analystConfidence: number;
  date: string;
  status: StatusLabel;
  sector: string;
  analyst: string;
};

export const mockReportArchive: ReportEntry[] = [
  { company: "DJI", score: 84, analystConfidence: 91, date: "2026-05-24", status: "complete", sector: "Consumer UAS / Enterprise", analyst: "A. Torres" },
  { company: "Skydio", score: 79, analystConfidence: 87, date: "2026-05-24", status: "complete", sector: "Defense Tech / Autonomy", analyst: "A. Torres" },
  { company: "Anduril", score: 81, analystConfidence: 84, date: "2026-05-23", status: "complete", sector: "Defense / C-UAS", analyst: "M. Chen" },
  { company: "Autel Robotics", score: 67, analystConfidence: 78, date: "2026-05-22", status: "complete", sector: "Consumer / Enterprise UAS", analyst: "A. Torres" },
  { company: "Parrot SA", score: 61, analystConfidence: 74, date: "2026-05-21", status: "complete", sector: "Defense / Mapping UAS", analyst: "R. Okafor" },
  { company: "Shield AI", score: 77, analystConfidence: 82, date: "2026-05-20", status: "complete", sector: "Defense / Autonomous Platforms", analyst: "M. Chen" },
  { company: "Teal Drones (Red Cat)", score: 64, analystConfidence: 69, date: "2026-05-19", status: "processing", sector: "Defense / Squad ISR", analyst: "R. Okafor" },
  { company: "BRINC Drones", score: 58, analystConfidence: 71, date: "2026-05-18", status: "complete", sector: "Public Safety / DFR", analyst: "A. Torres" },
];
