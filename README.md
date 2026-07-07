# 🚀 AI Competitive Intelligence Platform

An AI-powered **Competitive Intelligence & Market Research Platform** built with **n8n**, **Lovable AI**, **Google Gemini**, **Tavily Search**, and **Apify**. This workflow automatically compares two companies by collecting data from websites, news articles, LinkedIn, Reddit, X (Twitter), and other public sources, then generates a comprehensive competitive analysis report.

> **Built using n8n • Lovable AI • Google Gemini • Apify • Tavily Search**

---

## 📸 Workflow


<img width="1920" height="969" alt="Screenshot_2026-05-26_at_6 08 01_PM-2" src="https://github.com/user-attachments/assets/50525c7f-5d3a-4087-a110-81cc810a5212" />

---

# ✨ Features

* 🤖 AI-powered competitive analysis
* 🌐 Website research & summarization
* 📰 Latest news aggregation
* 💼 LinkedIn company research
* 🐦 X (Twitter) trend analysis
* 💬 Reddit sentiment analysis
* 📊 Competitor comparison
* 🧠 AI-generated insights & recommendations
* ⚡ Fully automated n8n workflow
* 🔄 Modular architecture for easy extension

---

# 🛠 Tech Stack

| Category            | Technology              |
| ------------------- | ----------------------- |
| Workflow Automation | n8n                     |
| AI Model            | Google Gemini 2.5 Flash |
| Frontend            | Lovable AI              |
| Web Search          | Tavily Search API       |
| Web Scraping        | Apify                   |
| News Research       | News Scraper API        |
| Programming         | JavaScript              |
| Data Processing     | n8n Aggregate Node      |
| AI Prompting        | Basic LLM Chain         |

---

# 🏗 Workflow Architecture

```
User Input
     │
     ▼
Search Company Details
     │
     ▼
AI Research Agent
     │
 ┌──────────────┬──────────────┐
 │              │              │
 ▼              ▼              ▼
Website      News         Screenshot
Research     Scraper      Capture
 │
 ▼
Social Media Research Agent
 │
 ├── LinkedIn
 ├── Reddit
 ├── X (Twitter)
 └── Apify Actors
 │
 ▼
Google Gemini
 │
 ▼
Final Competitive Analysis
```

---

# 🔥 Workflow Components

### 1️⃣ AI Research Agent

Responsible for:

* Understanding company information
* Calling website research workflow
* Summarizing website content
* Finding latest news
* Generating structured research

---

### 2️⃣ Website Research Workflow

* Tavily Search API
* HTTP Request
* JavaScript Processing
* Aggregate Results
* Google Gemini Summary

---

### 3️⃣ Social Media Research Agent

Collects information from

* LinkedIn
* Reddit
* X (Twitter)
* Apify Actors

and generates

* Customer sentiment
* Market perception
* Trending discussions
* Community feedback

---

### 4️⃣ Final AI Analysis

Google Gemini generates

* Company Overview
* SWOT Analysis
* Product Comparison
* Market Position
* Customer Sentiment
* Competitive Advantages
* Weaknesses
* Opportunities
* Actionable Recommendations

---

# 📂 Project Structure

```
Competitive-Analysis-AI/
│
├── workflows/
│   ├── main-workflow.json
│   └── website-research.json
│
├── assets/
│   └── workflow.png
│
├── prompts/
│   ├── research-agent.txt
│   └── social-agent.txt
│
├── README.md
└── .env.example
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
# Google Gemini
GOOGLE_API_KEY=your_google_api_key

# Tavily Search
TAVILY_API_KEY=your_tavily_api_key

# Apify
APIFY_API_TOKEN=your_apify_api_token

 #Screenshot API (if used)
SCREENSHOTONE_API_KEY=your_screenshotone_api_key

# News API (optional)
NEWS_API_KEY=your_news_api_key

# n8n
N8N_ENCRYPTION_KEY=your_encryption_key
```

---

# 📦 Required API Keys

| Service               | Purpose                          |
| --------------------- | -------------------------------- |
| Google Gemini API     | AI reasoning & report generation |
| Tavily API            | Website search and research      |
| Apify API             | LinkedIn, Reddit, X scraping     |
| ScreenshotOne API     | Website screenshots              |
| News API *(Optional)* | Latest news collection           |
| n8n Credentials       | Workflow authentication          |

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/competitive-analysis-ai.git
```

Go to project

```bash
cd competitive-analysis-ai
```

Install Docker

```bash
docker compose up
```

or run n8n

```bash
npx n8n
```

Import

* Main Workflow
* Website Research Workflow

Add API credentials.

Run the workflow.

---

# 📊 Example Analysis

Input

```
Company A:
Tesla

Company B:
BYD
```

Output

* Executive Summary
* Product Comparison
* Pricing Analysis
* Market Share
* Customer Sentiment
* Recent News
* Social Media Trends
* SWOT Analysis
* Strategic Recommendations

---

# 🚀 Future Improvements

* PDF report generation
* Competitor tracking dashboard
* Email notifications
* Slack integration
* Multi-language support
* Historical trend analysis
* RAG-based knowledge base
* Vector database integration

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to GitHub
5. Open a Pull Request

---

# ⭐ Support

If you found this project helpful, please consider giving it a **⭐ Star** on GitHub.

---

# 👨‍💻 Author

**Amrit Raj**


* 🤖 AI • Machine Learning • Automation
* 🚀 Passionate about AI Agents, n8n Workflows, and Competitive Intelligence

---



---
💡 Notes

* If you're using **Firefox** to access the app locally, no Firefox API key is required. Only include API keys for services you actually use (such as Google Gemini, Tavily, Apify, ScreenshotOne, or a News API).
