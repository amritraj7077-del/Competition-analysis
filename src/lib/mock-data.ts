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

export const mockAnalysis: AnalysisResult = {
  summary:
    "Anthropic shows strong AI maturity with rapid enterprise adoption. Sentiment is overwhelmingly positive across developer communities.",
  company: {
    name: "Anthropic",
    domain: "anthropic.com",
    logo: "A",
    industry: "Artificial Intelligence",
  },
  scores: { overall: 88, innovation: 94, market: 81, aiMaturity: 96 },
  strengths: [
    "Industry-leading model safety research",
    "Strong enterprise partnerships (AWS, Google)",
    "Deep technical talent density",
    "Constitutional AI methodology moat",
  ],
  weaknesses: [
    "Smaller consumer brand vs OpenAI",
    "Limited multimodal capabilities (catching up)",
    "Heavy compute cost structure",
  ],
  opportunities: [
    "Enterprise compliance market expansion",
    "Government & regulated industries",
    "Agentic workflow tooling",
    "International expansion (EU, APAC)",
  ],
  threats: [
    "Aggressive pricing from competitors",
    "Open-source model commoditization",
    "Regulatory uncertainty",
  ],
  insights: {
    trends: [
      "Agentic AI adoption up 240% YoY",
      "Enterprise LLM spend growing 3.2x",
      "On-prem deployments rising in finance",
    ],
    growth: [
      "Coding assistants TAM expanding",
      "Vertical AI agents in legal & healthcare",
      "Long-context retrieval workflows",
    ],
    competitors: [
      { name: "OpenAI", share: 42 },
      { name: "Anthropic", share: 21 },
      { name: "Google", share: 18 },
      { name: "Mistral", share: 9 },
      { name: "Others", share: 10 },
    ],
  },
  radar: [
    { metric: "Innovation", value: 94, benchmark: 70 },
    { metric: "Market", value: 81, benchmark: 65 },
    { metric: "AI Maturity", value: 96, benchmark: 60 },
    { metric: "Talent", value: 89, benchmark: 68 },
    { metric: "Brand", value: 74, benchmark: 72 },
    { metric: "Financials", value: 83, benchmark: 70 },
  ],
  trend: [
    { month: "Jan", mentions: 1200, sentiment: 62 },
    { month: "Feb", mentions: 1800, sentiment: 68 },
    { month: "Mar", mentions: 2400, sentiment: 71 },
    { month: "Apr", mentions: 3100, sentiment: 74 },
    { month: "May", mentions: 4200, sentiment: 78 },
    { month: "Jun", mentions: 5400, sentiment: 82 },
    { month: "Jul", mentions: 6800, sentiment: 85 },
  ],
  sentiment: [
    { platform: "Reddit", positive: 68, neutral: 22, negative: 10 },
    { platform: "Twitter/X", positive: 61, neutral: 28, negative: 11 },
    { platform: "LinkedIn", positive: 82, neutral: 15, negative: 3 },
    { platform: "HackerNews", positive: 58, neutral: 30, negative: 12 },
  ],
  social: {
    reddit: [
      { topic: "Claude 3.5 Sonnet coding capabilities", score: 4200, comments: 312 },
      { topic: "Constitutional AI deep dive", score: 2800, comments: 198 },
      { topic: "Anthropic vs OpenAI for enterprise", score: 1900, comments: 421 },
    ],
    twitter: [
      { handle: "@swyx", content: "Claude artifacts are the future of AI UX", engagement: 12400 },
      { handle: "@simonw", content: "New Claude release benchmarks are wild", engagement: 8900 },
      { handle: "@karpathy", content: "Impressed by Anthropic's interpretability work", engagement: 32100 },
    ],
    linkedin: [
      { role: "ML Research Engineer", openings: 42, trend: 18 },
      { role: "Enterprise Solutions Architect", openings: 28, trend: 24 },
      { role: "Policy & Trust", openings: 14, trend: 9 },
    ],
    news: [
      { title: "Anthropic raises $4B in fresh funding round", source: "Bloomberg", time: "2h ago" },
      { title: "Claude wins enterprise security audit", source: "TechCrunch", time: "6h ago" },
      { title: "New constitutional AI paper released", source: "ArXiv", time: "1d ago" },
    ],
  },
  workflow: [
    { id: "1", label: "Website research", status: "done", progress: 100 },
    { id: "2", label: "AI analysis", status: "done", progress: 100 },
    { id: "3", label: "Social scraping", status: "running", progress: 64 },
    { id: "4", label: "Report generation", status: "queued", progress: 0 },
  ],
};

export const recentReports = [
  { company: "Anthropic", score: 88, date: "2026-05-24", status: "Complete" },
  { company: "Perplexity", score: 82, date: "2026-05-23", status: "Complete" },
  { company: "Mistral AI", score: 76, date: "2026-05-22", status: "Complete" },
  { company: "Cohere", score: 74, date: "2026-05-21", status: "Processing" },
  { company: "Hugging Face", score: 81, date: "2026-05-20", status: "Complete" },
  { company: "Stability AI", score: 68, date: "2026-05-19", status: "Failed" },
];

export const recentSearches = ["Anthropic", "Perplexity", "Mistral AI", "Cohere"];
