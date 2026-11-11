import { PORTFOLIO_CONTENT } from '../data/content';

export interface KnowledgeChunk {
  id: string;
  section: string;
  title: string;
  keywords: string[];
  content: string;
}

export const ME_KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'identity-overview',
    section: 'Personal Identity',
    title: 'Personal Identity & Background',
    keywords: [
      'who',
      'name',
      'pranam',
      'kumar',
      'chand',
      'location',
      'cuttack',
      'odisha',
      'india',
      'languages',
      'english',
      'hindi',
      'odia',
      'about',
      'bio',
      'introduce',
      'yourself',
      'student',
      'arther',
    ],
    content: `Full Name: Pranam Kumar Chand (Preferred Name: Pranam Chand).
Location: Cuttack, Odisha, India.
Languages Spoken: English (Professional Proficiency), Hindi (Fluent), Odia (Native Speaker).
Current Role: Undergraduate Student at Ravenshaw University, Odisha.
Degree: Bachelor of Science (B.Sc.) in Data Science (Academic Timeline: 2025–2029).
Email: pranamchand@gmail.com | GitHub: https://github.com/Pranamchand | LinkedIn: https://www.linkedin.com/in/pranamchand | Kaggle: https://www.kaggle.com/pranamkumarchand.
Pranam is an undergraduate Data Science student interested in artificial intelligence, technology, data analytics, programming, and creative digital projects. He enjoys exploring emerging technologies, experimenting with AI tools, developing software projects, and combining analytical thinking with practical technology to build useful applications.`,
  },
  {
    id: 'education-academic',
    section: 'Education',
    title: 'Education & Academic Performance',
    keywords: [
      'education',
      'university',
      'college',
      'school',
      'ravenshaw',
      'degree',
      'bsc',
      'data science',
      'sgpa',
      'gpa',
      'cgpa',
      'marks',
      'percentage',
      'score',
      'grade',
      'semester',
      '1st',
      'nist',
      'sacie',
      'subjects',
      'studying',
      '2025',
      '2029',
    ],
    content: `Current Education:
- B.Sc. in Data Science (Honours), Ravenshaw University, Cuttack, Odisha (Academic Period: 2025–2029).
- 1st Semester Performance: 7.76 SGPA.
Previous Academic Performance:
- Higher Secondary Education (Science): 89% at Nilamani Institute of Science and Technology (NIST), Balasore.
- Secondary Education (Schooling): 91% at Sri Aurobindo Center of Integral Education (SACIE), Rairangpur, Mayurbhanj.
Academic Interests & Subjects Studied:
Data Science, Statistics, Operations Research, Economics and Commerce, Psychology, Programming, Database Management Systems, Foundation to Data Science using R, Principles of Management, Quantitative Analysis and Logical Reasoning, and English.`,
  },
  {
    id: 'career-objectives',
    section: 'Career Objectives',
    title: 'Career Goals & Internship Objectives',
    keywords: [
      'career',
      'goal',
      'objective',
      'future',
      'ambition',
      'job',
      'internship',
      'hire',
      'work',
      'role',
      'aspiring',
      'data analyst',
      'ai engineer',
      'd2c',
      'product',
      'looking for',
    ],
    content: `Pranam's primary career interests are:
1. Data Analytics
2. Data Science
3. Artificial Intelligence Engineering
4. Machine Learning
5. Generative AI
Career Goals:
- Become a skilled Data Analyst and develop strong foundations in Data Science and Machine Learning.
- Eventually work as an AI Engineer building real-world AI applications rather than limiting learning to theoretical concepts.
- Gain internship experience, particularly in D2C and product-based companies.
- Build practical, industry-relevant projects and a strong technical portfolio.`,
  },
  {
    id: 'technical-skills',
    section: 'Technical Skills',
    title: 'Programming Languages, Data Analytics, AI & Tools',
    keywords: [
      'skill',
      'skills',
      'tech',
      'stack',
      'language',
      'python',
      'java',
      'sql',
      'r',
      'excel',
      'power bi',
      'tableau',
      'pandas',
      'numpy',
      'matplotlib',
      'seaborn',
      'scikit-learn',
      'statsmodels',
      'scipy',
      'machine learning',
      'rag',
      'hugging face',
      'langchain',
      'gemini',
      'groq',
      'mistral',
      'fastapi',
      'streamlit',
      'oracle',
      'mysql',
      'postgresql',
      'opencode',
      'codex',
      'zapier',
      'youtube automation',
      'canva',
      'gimp',
      'filmora',
      'capcut',
      'css',
      'javascript',
      'linux',
      'deep learning',
    ],
    content: `Technical Skills & Tools:
- Programming Languages: Python (primary language for Data Science, EDA, automation & ML), SQL (MySQL, PostgreSQL, Oracle SQL), R (statistical analysis in RStudio), Java (learning OOP, arrays, DSA).
- Data Analytics & BI: Microsoft Excel (Advanced Excel), Power BI, Tableau, Statistics, Exploratory Data Analysis (EDA), Data Cleaning, Data Visualization, Feature Engineering.
- Python Libraries: Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, Statsmodels, SciPy, NLTK.
- Machine Learning: Linear Regression, Random Forest Regression, Classification, Model Evaluation (MAE, MSE, R², ROC-AUC, F1), Hyperparameter Tuning (GridSearchCV), NLP, TF-IDF, Recommendation Systems.
- AI & Generative AI: Retrieval-Augmented Generation (RAG), Hugging Face, LangChain, Google Gemini API, Groq API, Mistral AI API, Sentence Transformers, Prompt Engineering, LLM-powered applications.
- Development & Automation Tools: VS Code, Jupyter Notebook, Google Colab, Git, GitHub, Streamlit, FastAPI, OpenCode, Codex, Zapier, YouTube Automation, RStudio, Kaggle.
- Creative Tools: Canva, GIMP, Filmora, CapCut.
Important Skill Accuracy Note: Pranam has explicitly clarified that he does not currently claim established expertise in CSS, JavaScript, Linux, or Deep Learning.`,
  },
  {
    id: 'projects-analytics-ml',
    section: 'Projects',
    title: 'Data Analytics, Machine Learning & Software/API Projects',
    keywords: [
      'project',
      'projects',
      'portfolio',
      'built',
      'experience',
      'churn',
      'accident',
      'ecommerce',
      'spotify',
      'labor',
      'job postings',
      'heart disease',
      'diabetes',
      'temperature',
      'weather',
      'movie',
      'book',
      'recommendation',
      'disaster',
      'tweets',
      'kaggle',
      'f1',
      'house price',
      'fastapi',
      'rag',
      'pranam ai',
      'apple',
      'starbucks',
      'monday coffee',
      'baby names',
      'anime',
      'sentiment',
      'gender',
    ],
    content: `Pranam's Key Projects:
1. Data Analytics & BI Projects:
- Apple Global Retail Analytics (SQL, Power BI, DAX — 1M+ retail rows analyzed): https://github.com/Pranamchand/APPLE-GLOBAL-RETAIL-ANALYTICS
- Telco Customer Churn Analysis (EDA & retention patterns): https://github.com/Pranamchand/Costomer-churn-EDA
- US Accidents EDA (Geospatial & temporal accident analysis): https://github.com/Pranamchand/US-Accident-EDA
- Spotify Power BI Dashboard (Listener behavior & streaming metrics): https://github.com/Pranamchand/Spotify-User-Behavior-EDA-and-DASHBOARD
- Starbucks Dashboard (Power BI retail analytics): https://github.com/Pranamchand/Starbucks-Dashboard
- Monday Coffee Market Analysis (SQL city-tier expansion study): https://github.com/Pranamchand/Monday-Coffee-Market-Analysis
- Labor Market Pulse: Job Postings Index Analytics (2020–2026 employment indicators, baseline changes, recovery & volatility)
- E-Commerce Data Analysis (SQL & Python seasonal business insights)
- UK Baby Names Analysis Report & Anime Data Analysis

2. Machine Learning & NLP Projects:
- Heart Disease Risk Assessment (Clinical ML classifier deployed on Streamlit): https://pranamchand-heart-disease-risk-assessment.streamlit.app/
- Book Recommendation System (Collaborative filtering & cosine similarity on Streamlit): https://books-recommendation-pranamchand.streamlit.app/
- Basic Sentiment Analysis (NLP emotion/sentiment classifier on Streamlit): https://sentiment-analysis-pranamchand.streamlit.app/
- Movie Recommendation System (NLP TF-IDF & cosine similarity): https://github.com/Pranamchand/Movie-Recommendation-System-using-NLP-TF-IDF
- Disaster Tweets Classification (Kaggle NLP competition achieving ~76% F1 score, #628 leaderboard rank): https://disaster-tweets-pranamchand.streamlit.app/
- Temperature Forecasting (2000–2017 dataset, Random Forest & Linear Regression evaluated with MAE, MSE, R² and GridSearchCV): https://github.com/Pranamchand/Weather-Temperature-Prediction-Model
- Gender Classification Model & Next-Text Prediction Model
- Diabetes Assessment (ML prediction application)

3. Software, API & AI Projects:
- House Price Prediction API (Machine learning prediction service built using FastAPI)
- RAG Application (Document Q&A with Retrieval-Augmented Generation, embeddings, Mistral AI & Gemini APIs)
- Pranam AI / Arther (Personal RAG-based AI assistant integrated into this portfolio with a minimal Apple-inspired dark interface)`,
  },
  {
    id: 'certifications-programs',
    section: 'Certifications & Internships',
    title: 'Certifications, IBM SkillsBuild Internship & Hackathons',
    keywords: [
      'certificate',
      'certificates',
      'certification',
      'certifications',
      'credentials',
      'badge',
      'ibm',
      'skillsbuild',
      'edunet',
      'internship',
      'microsoft',
      'fabric',
      'copilot',
      'google',
      'simplilearn',
      'flipkart',
      'grid',
      'unstop',
      'matiks',
      'hackathon',
      'unihack',
      'granite',
    ],
    content: `Certifications, Programs & Achievements (18 Verified Credentials):
- IBM SkillsBuild & Edunet Foundation: Data Analytics with AI Internship Program (2026).
- IBM SkillsBuild Badges & Learning Plans: Artificial Intelligence Fundamentals, Data Fundamentals (53 Hours), Supercharge Your Data Analytics with Generative AI, Classifying Data Using IBM Granite, Summarizing Data Using IBM Granite, Introduction to Large Language Models, Introduction to RAG, The Rise of Multiagent Systems, Unleashing the Power of AI Agents.
- Microsoft Learn & Google Cloud: Get Started with Microsoft Fabric, Introduction to Copilot for Microsoft Power BI, Build Generative AI Apps and Solutions with No-Code Tools (Google Cloud & Simplilearn), Introduction to Prompt Engineering.
- Competitions & Recognition: Flipkart GRiD 8.0 (National Coding Round Qualification), Crucible Leaderboard Appreciation (Matiks & Unstop · Ravenshaw University), Unihack 2026, and 4 Kaggle Competitions (#628 Disaster Tweets, #667 MNIST, #1022 Store Sales, #1733 Spaceship Titanic).`,
  },
  {
    id: 'hobbies-branding',
    section: 'Hobbies & Personal Branding',
    title: 'Hobbies, Interests & Design Preferences',
    keywords: [
      'hobby',
      'hobbies',
      'interest',
      'interests',
      'free time',
      'fun',
      'anime',
      'manga',
      'manhwa',
      'omniscient reader',
      'boxer',
      'greatest estate developer',
      'beginning after the end',
      'books',
      'photography',
      'editing',
      'design',
      'style',
      'aesthetic',
      'apple',
      'minimalist',
      'branding',
    ],
    content: `Hobbies & Personal Interests:
- Watching anime and reading manga/manhwa (his 24 Top Picks include Omniscient Reader's Viewpoint, The Beginning After the End, Surviving the Game as a Barbarian, The Novel's Extra, Jungle Juice, Revenge of the Iron-Blooded Sword Hound, The Extra's Academy Survival Guide, Swordmaster's Youngest Son, Pick Me Up Infinite Gacha, Villain to Kill, Star-Embracing Swordmaster, Nano Machine, Magic Emperor, The Fragrant Flower Blooms with Dignity, Eternally Regressing Knight, The Boxer, I Became the Tyrant of a Defense Game, Return of the 8th Class Magician, The Greatest Estate Developer, The Legend of the Northern Blade, Webtoon Character Na Kang Lim, A Returner's Magic Should Be Special, Teenage Mercenary, and My Husband Who Hates Me Has lost his memories).
- Photography, photo editing, and video editing (using Canva, GIMP, Filmora, CapCut).
- Exploring artificial intelligence, experimenting with new technology, and building cool digital products.
Design & Personal Branding Preferences:
- Minimalist, Apple-inspired interfaces, dark themes, clean typography, and VS Code-inspired aesthetics.
- Active on GitHub (@Pranamchand), LinkedIn (Data and AI/ML Enthusiast), and Kaggle (@pranamkumarchand).`,
  },
];

const STOP_WORDS = new Set([
  'a',
  'an',
  'the',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'with',
  'by',
  'about',
  'as',
  'into',
  'like',
  'through',
  'after',
  'over',
  'between',
  'out',
  'against',
  'during',
  'without',
  'before',
  'under',
  'around',
  'among',
  'what',
  'which',
  'who',
  'whom',
  'this',
  'that',
  'these',
  'those',
  'am',
  'have',
  'has',
  'had',
  'do',
  'does',
  'did',
  'can',
  'could',
  'will',
  'would',
  'should',
  'may',
  'might',
  'must',
  'tell',
  'me',
  'his',
  'him',
  'he',
  'you',
  'your',
  'how',
  'where',
  'when',
  'why',
]);

export function tokenizeQuery(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

/**
 * Retrieves the top-K most relevant knowledge chunks for a user query using
 * weighted keyword + content BM25-style scoring.
 */
export function retrieveKnowledgeChunks(
  query: string,
  topK = 4
): KnowledgeChunk[] {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) {
    return ME_KNOWLEDGE_CHUNKS.slice(0, topK);
  }

  const scored = ME_KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;
    const lowerContent = chunk.content.toLowerCase();
    const lowerTitle = chunk.title.toLowerCase();
    const lowerSection = chunk.section.toLowerCase();

    for (const token of tokens) {
      if (chunk.keywords.some((kw) => kw.includes(token) || token.includes(kw))) {
        score += 5;
      }
      if (lowerTitle.includes(token) || lowerSection.includes(token)) {
        score += 4;
      }
      if (lowerContent.includes(token)) {
        score += 2;
      }
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const positive = scored.filter((s) => s.score > 0).map((s) => s.chunk);
  if (positive.length === 0) {
    return [ME_KNOWLEDGE_CHUNKS[0], ME_KNOWLEDGE_CHUNKS[1], ME_KNOWLEDGE_CHUNKS[3]];
  }

  // Always include identity chunk if not already in top results for general context
  const selected = positive.slice(0, topK);
  if (!selected.some((c) => c.id === 'identity-overview') && selected.length < topK) {
    selected.push(ME_KNOWLEDGE_CHUNKS[0]);
  }
  return selected;
}

/**
 * Builds the grounded RAG system instruction with retrieved context and accuracy rules.
 */
export function buildRagSystemInstruction(chunks: KnowledgeChunk[]): string {
  const contextText = chunks
    .map((c) => `### [${c.section}] ${c.title}\n${c.content}`)
    .join('\n\n');

  return `You are Arther, the official personal RAG AI assistant on Pranam Kumar Chand's portfolio website.
Your job is to answer visitor questions about Pranam Chand clearly, concisely, and professionally using the retrieved knowledge base below.

IMPORTANT ACCURACY RULES:
1. Never fabricate personal information.
2. Never claim that Pranam has full-time professional work experience unless verified (he completed the IBM SkillsBuild & Edunet Data Analytics with AI Internship Program and is a B.Sc. Data Science student at Ravenshaw University, 2025–2029, with a 7.76 SGPA in 1st semester).
3. Distinguish completed projects from projects in development, and distinguish learning exposure from established expertise.
4. Pranam does NOT claim expertise in CSS, JavaScript, Linux, or Deep Learning.
5. Never reveal private credentials, API keys, or secrets.
6. Keep answers concise (2–5 short sentences or a clean bullet list), warm, minimal, and directly helpful.

RETRIEVED KNOWLEDGE BASE CONTEXT:
${contextText}`;
}

/**
 * Synthesizes a clean, accurate response directly from retrieved RAG chunks
 * as a zero-downtime fallback if all external LLM API keys hit rate limits.
 */
export function synthesizeLocalRagResponse(
  query: string,
  chunks: KnowledgeChunk[]
): string {
  const q = query.toLowerCase();

  if (
    q.includes('education') ||
    q.includes('university') ||
    q.includes('college') ||
    q.includes('study') ||
    q.includes('studying') ||
    q.includes('sgpa') ||
    q.includes('gpa') ||
    q.includes('school') ||
    q.includes('ravenshaw')
  ) {
    return `Pranam Kumar Chand is currently pursuing a B.Sc. in Data Science (Honours) at Ravenshaw University, Cuttack, Odisha (2025–2029), where he achieved a 7.76 SGPA in his 1st semester. Previously, he scored 89% in Higher Secondary (NIST, Balasore) and 91% in Secondary schooling (SACIE, Mayurbhanj).`;
  }

  if (
    q.includes('skill') ||
    q.includes('tech') ||
    q.includes('stack') ||
    q.includes('tool') ||
    q.includes('language')
  ) {
    return `Pranam's core technical stack includes Python (Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn), SQL (MySQL, PostgreSQL, Oracle), R, Power BI, Tableau, and Advanced Excel. In AI & engineering, he works with RAG, LangChain, Hugging Face, FastAPI, Streamlit, OpenCode, Codex, and Zapier.`;
  }

  if (
    q.includes('project') ||
    q.includes('built') ||
    q.includes('work') ||
    q.includes('dashboard') ||
    q.includes('ml')
  ) {
    return `Pranam has built 16+ Data Analytics, Machine Learning, and AI projects—including Apple Global Retail Analytics (1M+ rows in SQL & Power BI), Heart Disease Risk Assessment (Streamlit ML app), Book & Movie Recommendation Systems, Basic Sentiment Analysis, a FastAPI House Price Prediction API, and this RAG-powered Pranam AI assistant.`;
  }

  if (
    q.includes('certificat') ||
    q.includes('internship') ||
    q.includes('ibm') ||
    q.includes('achievement') ||
    q.includes('kaggle')
  ) {
    return `Pranam completed the Data Analytics with AI Internship Program with IBM SkillsBuild & Edunet Foundation and holds 18 credentials across IBM SkillsBuild (AI & Data Fundamentals, IBM Granite, RAG, Multiagent Systems), Microsoft Learn (Fabric & Copilot for Power BI), Google Cloud, and Flipkart GRiD 8.0. He has also competed in 4 Kaggle competitions (ranking #628 in Disaster Tweets with a ~76% F1 score).`;
  }

  if (
    q.includes('career') ||
    q.includes('goal') ||
    q.includes('hire') ||
    q.includes('looking for') ||
    q.includes('future')
  ) {
    return `Pranam is actively seeking Data Analyst and Data Science internship opportunities—especially in D2C and product-based companies—with the long-term goal of growing into an AI Engineer building practical, production-ready AI and analytics applications.`;
  }

  if (
    q.includes('hobby') ||
    q.includes('hobbies') ||
    q.includes('interest') ||
    q.includes('anime') ||
    q.includes('manga')
  ) {
    return `Outside of data science and coding, Pranam enjoys watching anime, reading manga (like Omniscient Reader's Viewpoint) and books, photography, photo/video editing, and experimenting with emerging AI tools.`;
  }

  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('reach') ||
    q.includes('linkedin') ||
    q.includes('github')
  ) {
    return `You can reach Pranam at ${PORTFOLIO_CONTENT.identity.email}, or connect with him on GitHub (${PORTFOLIO_CONTENT.identity.github}), LinkedIn (${PORTFOLIO_CONTENT.identity.linkedin}), and Kaggle (${PORTFOLIO_CONTENT.identity.kaggle}). You can also use the Mail app right here in the Dock!`;
  }

  const top = chunks[0] || ME_KNOWLEDGE_CHUNKS[0];
  return `Pranam Kumar Chand is a B.Sc. Data Science student at Ravenshaw University, Odisha (2025–2029, 7.76 SGPA in 1st semester), specializing in Python, SQL, Power BI, Machine Learning, and RAG applications. ${top.content.split('\n')[0]}`;
}
