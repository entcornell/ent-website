// src/components/NewsletterData.js

// Helper that makes an absolute path from the site root
const PUB = process.env.PUBLIC_URL || ""; // CRA / Vite compatible
const abs = (p) => `${PUB}${p.startsWith("/") ? p : "/" + p}`;

export const issues = [
  {
    id: 6,
    title: "Issue #6",
    date: "08/10/25",
    author: "Mac Dorward",
    excerpt:
      "Welcome back to another edition of ENT weekly - your easy to read and favorite source of entrepreneurship, business, and market news!",
    image: abs("/newsletters/issue6/Newsletter6-HeadlineImage.jpg"),
    pages: [
      abs("/newsletters/issue6/1.png"),
      abs("/newsletters/issue6/2.png"),
      abs("/newsletters/issue6/3.png"),
      abs("/newsletters/issue6/4.png"),
    ],
    sources: [
      { label: "Collegiate Cash", url: "https://www.cnbc.com/2025/07/31/2-year-old-ceo-turned-hobby-into-50-million-business-backed-by-ryan-reynolds.html" },
      { label: "Know Your Stuff", url: "https://timesofindia.indiatimes.com/technology/tech-news/y-combinator-ceo-garry-tan-warns-engineering-and-business-college-students-this-mindset-may-land-you-in-jail/articleshow/122387679.cms#:~:text=Garry%20Tan%2C%20CEO%20of%20startup,legal%20repercussions%2C%20including%20jail%20time." },
      { label: "Artisan Advice", url: "https://www.businessinsider.com/artisan-ceo-jaspar-carmichael-jack-advice-gen-z-startup-founders-2025-8" },
      { label: "Quantum in The Near Future", url: "https://www.wsj.com/articles/heres-how-quantum-computing-could-change-the-world-c7a995b1?mod=entrepreneurship_news_article_pos1" },
      { label: "Student Teachers", url: "https://www.newswise.com/articles/wanted-entrepreneurs-to-launch-startups-based-on-university-innovations" },
      { label: "Figma's Massive IPO", url: "https://www.businessinsider.com/figma-wall-street-forgot-how-much-investors-want-tech-ipo-2025-8?utm_source=chatgpt.com" },
      { label: "Pay to Play", url: "https://www.marketwatch.com/story/nvidia-and-amd-reportedly-strike-deals-with-trump-but-analysts-see-a-slippery-slope-13d8012c?utm_source=chatgpt.com" },
    ],
  },
  {
    id: 5,
    title: "Issue #5",
    date: "07/27/25",
    author: "Mac Dorward",
    excerpt:
      "Welcome back to another edition of ENT weekly - your easy to read and favorite source of entrepreneurship, business, and market news!",
    image: abs("/newsletters/issue5/Newsletter5-HeadlineImage.jpg"),
    pages: [
      abs("/newsletters/issue5/1.png"),
      abs("/newsletters/issue5/2.png"),
      abs("/newsletters/issue5/3.png"),
      abs("/newsletters/issue5/4.png"),
    ],
    sources: [
      { label: "Next Generation", url: "https://timesofindia.indiatimes.com/city/delhi/govt-schools-to-teach-entrepreneurship-across-classesvii-xii/articleshow/122797473.cms?utm_source=chatgpt.com" },
      { label: "AI Accounting", url: "https://www.aprio.com/the-pulse-on-the-economy-and-capital-markets-july-2025-ins-video-wm/?utm_source=chatgpt.com" },
      { label: "IPO Revival", url: "https://www.businessinsider.com/blackstone-ipo-activity-pipeline-second-quarter-earnings-steve-schwarzman-2025-7?utm_source=chatgpt.com" },
      { label: "Listen and Learn", url: "https://www.gamesradar.com/games/valve-billionaire-gabe-newell-says-businesses-should-listen-to-your-customers-and-focus-on-them-putting-employees-partners-and-customers-before-capital/?utm_source=chatgpt.com" },
      { label: "Mental Tools for Entrepreneurs", url: "https://www.investopedia.com/books-wont-teach-you-about-building-business-11755056?utm_source=chatgpt.com" },
      { label: "A Summer of Igloos: Our Nation's Frozen Housing Market", url: "https://www.reuters.com/world/us/us-existing-home-sales-hit-nine-month-low-june-2025-07-23/?utm_source=chatgpt.com" },
      { label: "Earnings Standouts", url: "https://www.reuters.com/business/autos-transportation/earnings-season-its-ai-good-everything-else-not-so-much-2025-07-24/?utm_source=chatgpt.com" },
      { label: "The UK's Slow Summer", url: "https://www.theguardian.com/business/live/2025/jul/25/keir-starmer-donald-trump-steel-tariffs-retail-sales-economy-trade-news-business-live-latest-updates?utm_source=chatgpt.com" },
    ],
  },
  {
    id: 4,
    title: "Issue #4",
    date: "07/20/25",
    author: "Mac Dorward",
    excerpt:
      "Welcome back to another edition of ENT weekly - your easy to read and favorite source of entrepreneurship, business, and market news!",
    image: abs("/newsletters/issue4/Newsletter4-HeadlineImage.jpg"),
    pages: [
      abs("/newsletters/issue4/1 6.png"),
      abs("/newsletters/issue4/2 6.png"),
      abs("/newsletters/issue4/3 6.png"),
      abs("/newsletters/issue4/4 3.png"),
    ],
    sources: [
      { label: "Startups Cash In", url: "https://news.crunchbase.com/ma/ai-enterprise-startup-ma-higher-h1-2025-data/#:~:text=Acquirers%20made%20just%20over%20%24100,after%20companies" },
      { label: "Crypto Rules", url: "https://www.engine.is/news/startup-news-digest-071825#:~:text=House%20passes%20crypto%20legislation,asset%20regulation%20could%20lower%20compliance" },
      { label: "AI Licensing", url: "https://www.engine.is/news/startup-news-digest-071825#:~:text=conversation%20is%20missing%20how%20proposals%E2%80%94including,startups%20to%20build%20models%20and" },
      { label: "BioTech Botched", url: "https://www.biopharmadive.com/news/biotech-venture-capital-funding-h1-2025-hsbc/753283/#:~:text=,drug%20candidates%20from%20China%20continued" },
      { label: "Major AI Investments", url: "https://www.pymnts.com/news/artificial-intelligence/2025/this-week-in-ai-ai-startups-hit-fundraising-gold/#:~:text=Leading%20AI%20Startups%20Net%20Billions,in%20Fundraising" },
      { label: "Chevron and Guyana", url: "https://virginiabusiness.com/chevron-hess-acquisition-paris-ruling-guyana-oil/" },
      { label: "Economic Slowdown", url: "https://www.reuters.com/world/china/chinas-q2-gdp-grows-52-yy-above-market-forecast-2025-07-15/#:~:text=Data%20on%20Tuesday%20showed%20China%27s,1" },
      { label: "Inflation Ticks Up: Are Tariffs to Blame?", url: "https://apnews.com/article/inflation-trump-fed-powell-prices-8842d6ebca9d1870983e678e578d2091#:~:text=Consumer%20prices%20rose%202.7,the%20previous%20month" },
    ],
  },
  {
    id: 3,
    title: "Issue #3",
    date: "07/13/25",
    author: "Mac Dorward",
    excerpt:
      "Welcome back to another edition of ENT weekly - your easy to read and favorite source of entrepreneurship, business, and market news!",
    image: abs("/newsletters/issue3/Newsletter3-HeadlineImage.jpg"),
    pages: [
      abs("/newsletters/issue3/1.png"),
      abs("/newsletters/issue3/2.png"),
      abs("/newsletters/issue3/3.png"),
      abs("/newsletters/issue3/4.png"),
    ],
    sources: [
      { label: "Sweet Deal", url: "https://www.investopedia.com/wk-kellogg-stock-pops-as-ferrero-buys-cereal-giant-for-usd3-1b-11769561?utm_source=chatgpt.com" },
      { label: "OpenAI's Open Season", url: "https://www.reuters.com/business/media-telecom/openai-release-web-browser-challenge-google-chrome-2025-07-09/?utm_source=chatgpt.com" },
      { label: "Compliance AI", url: "https://economictimes.indiatimes.com/tech/technology/unleash-leads-usd-1-6mn-investment-in-genai-powered-fintech-infra-startup-neurofin/articleshow/122363518.cms?utm_source=chatgpt.com" },
      { label: "Cuteness is Killing", url: "https://news.crunchbase.com/venture/interesting-startup-deals-ai-defense-biotech-june-2025/?utm_source=chatgpt.com" },
      { label: "Making it Rain", url: "https://www.axios.com/newsletters/axios-pro-rata-91d188a7-f0cb-4880-a82f-0af0c3ee7dd6?utm_source=chatgpt.com" },
      { label: "Startup Advice", url: "https://www.cnbc.com/2025/04/11/entrepreneur-tiffany-dufu-use-this-problem-solving-tactic-in-uncertain-times.html" },
      { label: "Price Integrity around Tariffs", url: "https://www.cnbc.com/2025/06/11/outlines-ceo-how-trump-tariffs-made-me-raise-then-lower-startups-prices.html" },
    ],
  },
  {
    id: 2,
    title: "Issue #2",
    date: "06/29/25",
    author: "Mac Dorward",
    excerpt:
      "Welcome back to another edition of ENT weekly - your easy to read and favorite source of entrepreneurship, business, and market news!",
    image: abs("/newsletters/issue2/Newsletter2-HeadlineImage.jpg"),
    pages: [
      abs("/newsletters/issue2/1.png"),
      abs("/newsletters/issue2/2.png"),
      abs("/newsletters/issue2/3.png"),
      abs("/newsletters/issue2/4.png"),
    ],
    sources: [
      { label: "Lime in the Green", url: "https://www.reuters.com/business/uber-backed-electric-bike-startup-lime-hires-banks-us-ipo-sources-say-2025-06-24/?utm_source=chatgpt.com" },
      { label: "Big Boom for Boom", url: "https://www.wsj.com/business/supersonic-jet-travel-plans-02db2c33?utm_source=chatgpt.com" },
      { label: "Fire AI Funding", url: "https://www.wsj.com/articles/ai-wildfire-detection-startup-raises-44-million-2d662b00?gaa_at=eafs&gaa_n=ASWzDAiknG5HOIR0F5lee-VG_lzcLQ_56AdyVWbfykzPfylO-hNeR62WgavW&gaa_sig=zMT2nX3W4UfkrLO6BBw18JNFWGuzptrip9wiinSu3cb9sUAJe_tvAKVPGLlCo50BkvUGCNbGY3S5b-OuI8PnhA%3D%3D&gaa_ts=686056a5&utm_source=chatgpt.com" },
      { label: "Shocking AI Stats", url: "https://www.linkedin.com/pulse/entrepreneur-intel-report-june-2025-jim-latour-dba-ms-ma-qeoac/" },
      { label: "Outset is Set", url: "https://techstartups.com/2025/06/16/top-startup-and-tech-funding-news-june-16-2025/?utm_source=chatgpt.com" },
      { label: "Grit to Gold", url: "https://www.cnbc.com/2025/03/25/farmboxrx-founder-how-i-built-grocery-delivery-company-in-nyc.html" },
      { label: "Trash into Treasure", url: "https://www.cnbc.com/2025/05/01/plastic-recycling-this-startup-makes-designer-objects-from-trash.html" },
    ],
  },
  {
    id: 1,
    title: "Issue #1",
    date: "06/22/25",
    author: "Mac Dorward",
    excerpt:
      "Happy summer, ENT! Welcome to the first edition of ENT Weekly - your essential briefing on entrepreneurship, business, and market news in the U.S.!",
    image: abs("/newsletters/issue1/Newsletter1-HeadlineImage.jpg"),
    pages: [
      abs("/newsletters/issue1/1.png"),
      abs("/newsletters/issue1/2.png"),
      abs("/newsletters/issue1/3.png"),
      abs("/newsletters/issue1/4.png"),
      abs("/newsletters/issue1/5.png"),
    ],
    sources: [
      { label: "Cirkul Caste Study", url: "https://www.cnbc.com/2025/06/03/cirkul-ceo-top-advice-for-entrepreneurs-helped-me-build-1b-company.html?&qsearchterm=entrepreneur" },
      { label: "Championship Habits", url: "https://www.cnbc.com/2025/03/20/billionaire-mike-repole-i-owe-success-to-st-johns-coach-rick-pitino-book.html?&qsearchterm=entrepreneur" },
      { label: "Sneaky Money", url: "https://www.forbes.com/sites/abdoriani/2025/06/17/7-undercover-startup-opportunities/?ss=entrepreneurs" },
      { label: "Be Bold, Be Rich", url: "https://www.forbes.com/sites/deloitte/2025/05/15/taking-the-practical-steps-to-ai-deployment/" },
      { label: "FED Talk", url: "https://finance.yahoo.com/news/3-data-points-define-the-feds-one-big-economic-risk-100011528.html" },
      { label: "Way-More Waymo", url: "https://www.wsj.com/business/autos/waymo-wants-to-bring-its-robotaxis-to-new-york-city-b5a6ad3a?gaa_at=eafs&gaa_n=ASWzDAiasnA5A4bm-iXhe0Cghfqlv3LX-kc9ooT0GdbwegSxllHEvRUC-9i_Chz0kkM%3D&gaa_ts=68576332&gaa_sig=ZPK9aEEDIMCuW96YiGHO1BlSUfTgKYALsr47IXZytrzATUzfBTD6oS1dcMyAumjuUY7ok9NQPHc4PQdCGkEiZQ%3D%3D" },
      { label: "Solar - Not So Bright?", url: "https://seekingalpha.com/news/4460415-sa-asks-what-lies-ahead-for-the-solar-industry" },
    ],
  },
];

export const issuesById = Object.fromEntries(issues.map((i) => [String(i.id), i]));
