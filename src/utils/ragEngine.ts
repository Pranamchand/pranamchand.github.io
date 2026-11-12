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
  'currently',
  'doing',
  'now',
  'right',
  'ok',
  'okay',
  'please',
  'explicitly',
  'important',
  'note',
]);

export function tokenizeQuery(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .split(/\s+/)
    .filter(
      (t) =>
        t.length > 1 &&
        !STOP_WORDS.has(t) &&
        !/^\d{1,3}$/.test(t)
    );
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

  return `You are Arther, the official personal AI assistant on Pranam Kumar Chand's portfolio website.
Your job is to answer visitor questions about Pranam Chand clearly, accurately, and concisely using the knowledge base below.

IMPORTANT RULES:
1. Keep responses SHORT and conversational: 1 to 3 sentences maximum (under 60 words) unless the user specifically asks for a full list.
2. Never fabricate personal information. Pranam is a 1st-year B.Sc. Data Science student at Ravenshaw University, Cuttack, Odisha (2025–2029, 7.76 SGPA in 1st semester) and completed the IBM SkillsBuild & Edunet Data Analytics with AI Internship Program.
3. Pranam does NOT claim expertise in CSS, JavaScript, Linux, or Deep Learning (only mention this if the user asks about those specific skills).
4. If the user asks a simple general, greeting, or math question (e.g., "what is 2+2"), answer it directly in 1 short sentence.

RETRIEVED KNOWLEDGE BASE CONTEXT:
${contextText}`;
}

/**
 * Evaluates simple arithmetic queries like "what is 2+2" or "12 * 5"
 */
function tryEvaluateMathQuery(q: string): string | null {
  const mathMatch = q.match(
    /(?:what\s+is|calculate|compute|solve|=|^)\s*(-?\d+(?:\.\d+)?)\s*([+\-*/x×÷])\s*(-?\d+(?:\.\d+)?)\s*\??$/i
  );
  if (!mathMatch) return null;
  const a = Number(mathMatch[1]);
  const op = mathMatch[2];
  const b = Number(mathMatch[3]);
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  let result: number;
  if (op === '+') result = a + b;
  else if (op === '-') result = a - b;
  else if (op === '*' || op === 'x' || op === '×') result = a * b;
  else if (op === '/' || op === '÷') {
    if (b === 0) return 'Division by zero is undefined.';
    result = Number((a / b).toFixed(4));
  } else return null;

  return `${a} ${op} ${b} = ${result}. Feel free to ask me anything about Pranam's Data Science projects, skills, or education!`;
}

/**
 * Synthesizes a clean, accurate, concise response directly from retrieved RAG
 * chunks and PORTFOLIO_CONTENT so static deployments (such as GitHub Pages
 * where no Node backend is running) answer every question accurately.
 */
export function synthesizeLocalRagResponse(
  query: string,
  chunks: KnowledgeChunk[]
): string {
  const q = query.trim().toLowerCase();

  if (!q) {
    return `Hey! I'm Arther, Pranam Chand's portfolio assistant. Ask me about his Data Science studies at Ravenshaw University, his projects, skills, or certifications!`;
  }

  // 0. Check for simple arithmetic / math questions (e.g. "what is 2+2")
  const mathReply = tryEvaluateMathQuery(q);
  if (mathReply) {
    return mathReply;
  }

  // 1. Conversational greetings / meta questions about Arther
  if (
    /^(hi|hello|hey|yo|hola|greetings|good\s*(morning|afternoon|evening)|sup|how\s+are\s+you)\b/.test(
      q
    ) &&
    q.split(/\s+/).length <= 6
  ) {
    return `Hey there! I'm Arther, Pranam Chand's AI assistant. Ask me anything about his Data Science degree at Ravenshaw University, Power BI & ML projects, skills, or hobbies!`;
  }

  if (
    q.includes('who are you') ||
    q.includes('what are you') ||
    q.includes('your name') ||
    (q.includes('arther') && !q.includes('pranam'))
  ) {
    return `I'm Arther, a custom RAG assistant built into Pranam Chand's portfolio to answer questions about his projects, skills, education, and achievements.`;
  }

  if (q.includes('thank') || q.includes('thx') || q.includes('awesome') || q.includes('cool')) {
    return `You're welcome! Let me know if you'd like to explore any of Pranam's projects, skills, or contact details.`;
  }

  // 2. "What is he currently doing" / current status / current role
  if (
    q.includes('currently doing') ||
    q.includes('doing now') ||
    q.includes('doing right now') ||
    q.includes('what does he do') ||
    q.includes('what is he doing') ||
    q.includes('current role') ||
    q.includes('current status') ||
    q.includes('up to')
  ) {
    return `Pranam is currently a 1st-year B.Sc. Data Science (Honours) student at Ravenshaw University, Cuttack (2025–2029, 7.76 SGPA). He is actively building Data Analytics, Power BI, and Machine Learning projects while looking for Data Analyst and Data Science internships.`;
  }

  // 3. Check if the user is asking about a specific project from PORTFOLIO_CONTENT.projects
  const matchedProjects = PORTFOLIO_CONTENT.projects.filter((proj) => {
    const titleWords = proj.title
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 3 && !['data', 'analysis', 'model', 'system', 'project', 'basic'].includes(w));
    return (
      q.includes(proj.title.toLowerCase()) ||
      titleWords.some((w) => q.includes(w))
    );
  });

  if (matchedProjects.length === 1) {
    const p = matchedProjects[0];
    const linkPart =
      p.links.live && !p.links.live.includes('[ADD')
        ? `Live: ${p.links.live}`
        : `GitHub: ${p.links.github || ''}`;
    return `${p.title} (${p.category}): ${p.description} Built with ${p.tags.slice(0, 5).join(', ')}. (${linkPart})`;
  }

  if (matchedProjects.length > 1 && matchedProjects.length <= 3 && !q.includes('all project')) {
    return matchedProjects
      .map(
        (p) =>
          `• ${p.title} (${p.tags.slice(0, 3).join(', ')}): ${p.description}`
      )
      .join('\n');
  }

  // 4. Specific category project questions (NLP, EDA, Power BI / Dashboards, ML, RAG / FastAPI)
  if (q.includes('dashboard') || q.includes('power bi') || q.includes('bi project')) {
    return `Pranam's Power BI & Dashboard projects include Apple Global Retail Analytics (1M+ rows in SQL & Power BI), Spotify User Behavior Dashboard, Starbucks Retail Dashboard, and Monday Coffee Market Analysis.`;
  }

  if (q.includes('nlp') || q.includes('natural language') || q.includes('sentiment') || q.includes('recommendation')) {
    return `Pranam's NLP & Recommendation projects include Basic Sentiment Analysis (Streamlit), Movie Recommendation System (TF-IDF), Book Recommendation System (Streamlit), and Disaster Tweets Classification (#628 on Kaggle, ~76% F1).`;
  }

  if (q.includes('eda') || q.includes('exploratory')) {
    return `Pranam's EDA projects include Telco Customer Churn Analysis, US Accidents Geospatial EDA, UK Baby Names Analysis, and Anime Data Analysis using Python, Pandas, Matplotlib, and Seaborn.`;
  }

  if (q.includes('rag') || q.includes('fastapi') || q.includes('api project') || q.includes('llm')) {
    return `In AI & Backend APIs, Pranam built a Document Q&A RAG Application (LangChain, embeddings, Mistral & Gemini APIs), a FastAPI House Price Prediction API, and Arther (this portfolio's RAG assistant).`;
  }

  // 5. Specific skill / tool inquiries (including negative skill accuracy checks)
  if (
    q.includes('css') ||
    q.includes('javascript') ||
    q.includes('linux') ||
    q.includes('deep learning')
  ) {
    return `Pranam does not claim established expertise in CSS, JavaScript, Linux, or Deep Learning. His core strengths are Python, SQL, R, Power BI, Tableau, Advanced Excel, Machine Learning, EDA, and RAG/GenAI.`;
  }

  if (q.includes('python') || q.includes('pandas') || q.includes('scikit')) {
    return `Python is Pranam's primary language for Data Science, EDA, and Machine Learning—working with Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, Statsmodels, SciPy, NLTK, FastAPI, and Streamlit.`;
  }

  if (q.includes('sql') || q.includes('database') || q.includes('mysql') || q.includes('postgres') || q.includes('oracle')) {
    return `Pranam works with SQL across MySQL, PostgreSQL, and Oracle SQL—using joins, CTEs, and window functions for analytics projects like his 1M+ row Apple Global Retail study.`;
  }

  // 6. Location / Hometown / Languages / Identity
  if (
    q.includes('where') ||
    q.includes('location') ||
    q.includes('live') ||
    q.includes('from') ||
    q.includes('city') ||
    q.includes('state') ||
    q.includes('cuttack') ||
    q.includes('odisha') ||
    q.includes('country')
  ) {
    return `Pranam is based in Cuttack, Odisha, India, where he studies B.Sc. Data Science at Ravenshaw University. He speaks Odia (native), Hindi (fluent), and English (professional).`;
  }

  if (q.includes('language') && (q.includes('speak') || q.includes('know') || q.includes('odia') || q.includes('hindi') || q.includes('english'))) {
    return `Pranam speaks Odia (Native), Hindi (Fluent), and English (Professional). For programming, he uses Python, SQL, R, and Java.`;
  }

  if (
    q.includes('who is pranam') ||
    q.includes('about pranam') ||
    q.includes('introduce') ||
    q.includes('bio') ||
    q.includes('tell me about him') ||
    q.includes('summary') ||
    q.includes('who is he')
  ) {
    return `Pranam Kumar Chand is a B.Sc. Data Science undergraduate at Ravenshaw University, Cuttack, Odisha (2025–2029, 7.76 SGPA). He specializes in Data Analytics, Power BI dashboards, Python EDA, Machine Learning, and RAG applications.`;
  }

  // 7. Education / SGPA / Marks / University / Schooling
  if (
    q.includes('education') ||
    q.includes('university') ||
    q.includes('college') ||
    q.includes('study') ||
    q.includes('studying') ||
    q.includes('sgpa') ||
    q.includes('gpa') ||
    q.includes('cgpa') ||
    q.includes('mark') ||
    q.includes('score') ||
    q.includes('percentage') ||
    q.includes('school') ||
    q.includes('ravenshaw') ||
    q.includes('degree') ||
    q.includes('semester')
  ) {
    return `Pranam is pursuing a B.Sc. in Data Science (Honours) at Ravenshaw University, Cuttack (2025–2029) with a 7.76 SGPA in his 1st semester. Earlier, he scored 89% in Higher Secondary at NIST, Balasore, and 91% in Secondary schooling at SACIE, Rairangpur.`;
  }

  // 8. General Technical Skills
  if (
    q.includes('skill') ||
    q.includes('tech') ||
    q.includes('stack') ||
    q.includes('tool')
  ) {
    return `Pranam's core stack includes Python (Pandas, NumPy, Scikit-learn, Seaborn), SQL (MySQL, PostgreSQL, Oracle), R, Power BI, Tableau, and Advanced Excel, along with RAG, LangChain, FastAPI, and Streamlit.`;
  }

  // 9. General Projects overview
  if (
    q.includes('project') ||
    q.includes('built') ||
    q.includes('portfolio') ||
    q.includes('ml') ||
    q.includes('machine learning')
  ) {
    return `Pranam has built 16+ projects across Data Analytics and ML—including Apple Global Retail Analytics (Power BI & SQL), Heart Disease Risk Assessment (Streamlit), Book & Movie Recommendation Systems, Sentiment Analysis, and a FastAPI House Price API.`;
  }

  // 10. Certifications, Internships & Competitions
  if (
    q.includes('certificat') ||
    q.includes('credential') ||
    q.includes('internship') ||
    q.includes('ibm') ||
    q.includes('microsoft') ||
    q.includes('google') ||
    q.includes('achievement') ||
    q.includes('kaggle') ||
    q.includes('hackathon') ||
    q.includes('experience') ||
    q.includes('work')
  ) {
    return `Pranam completed the Data Analytics with AI Internship Program with IBM SkillsBuild & Edunet Foundation (Mar 2026) and holds 18 credentials across IBM SkillsBuild, Microsoft Learn (Fabric & Copilot for Power BI), and Google Cloud, plus 4 Kaggle competitions (#628 in Disaster Tweets).`;
  }

  // 11. Career Goals & Hiring
  if (
    q.includes('career') ||
    q.includes('goal') ||
    q.includes('objective') ||
    q.includes('hire') ||
    q.includes('looking for') ||
    q.includes('future') ||
    q.includes('ambition') ||
    q.includes('role') ||
    q.includes('job')
  ) {
    return `Pranam is looking for Data Analyst and Data Science internships—especially in D2C and product companies—while building toward a career in AI Engineering.`;
  }

  // 12. Manga / Manhwa / Anime / Cinema / Movies / Hobbies
  if (
    q.includes('manga') ||
    q.includes('manhwa') ||
    q.includes('webtoon') ||
    q.includes('read')
  ) {
    return `Pranam's favorite manhwa and manga include Omniscient Reader's Viewpoint, The Greatest Estate Developer, The Beginning After the End, The Boxer, and Pick Me Up Infinite Gacha. You can see all 24 picks in the Manwha & Manga app!`;
  }

  if (
    q.includes('movie') ||
    q.includes('cinema') ||
    q.includes('show') ||
    q.includes('series') ||
    q.includes('watch') ||
    q.includes('film')
  ) {
    return `Pranam's top picks in the Cinema app include Breaking Bad, Interstellar, Attack on Titan, Alice in Borderland, Game of Thrones, The 8 Show, Harry Potter, and Your Name.`;
  }

  if (
    q.includes('hobby') ||
    q.includes('hobbies') ||
    q.includes('interest') ||
    q.includes('free time') ||
    q.includes('fun') ||
    q.includes('anime')
  ) {
    return `In his free time, Pranam enjoys reading manhwa/manga, watching anime and sci-fi series, photography, photo/video editing (Canva, GIMP, Filmora, CapCut), and experimenting with new AI tools.`;
  }

  // 13. Contact / Links / Resume
  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('mail') ||
    q.includes('reach') ||
    q.includes('linkedin') ||
    q.includes('github') ||
    q.includes('resume') ||
    q.includes('cv')
  ) {
    return `You can email Pranam at ${PORTFOLIO_CONTENT.identity.email}, check his Resume app on the desktop, or connect on GitHub (${PORTFOLIO_CONTENT.identity.github}), LinkedIn (${PORTFOLIO_CONTENT.identity.linkedin}), and Kaggle (${PORTFOLIO_CONTENT.identity.kaggle}).`;
  }

  // 14. Dynamic line-level extraction (excluding negative skill disclaimers unless asked)
  const queryTokens = tokenizeQuery(query);
  const candidateLines: { line: string; score: number }[] = [];

  for (const chunk of chunks) {
    const lines = chunk.content
      .split('\n')
      .map((l) => l.trim())
      .filter(
        (l) =>
          l.length > 15 &&
          !l.endsWith(':') &&
          !l.startsWith('Important Skill Accuracy Note')
      );

    for (const line of lines) {
      const lower = line.toLowerCase();
      let lineScore = 0;
      for (const token of queryTokens) {
        if (lower.includes(token)) {
          lineScore += 3;
        }
      }
      if (lineScore > 0) {
        candidateLines.push({ line: line.replace(/^-\s*/, ''), score: lineScore });
      }
    }
  }

  candidateLines.sort((a, b) => b.score - a.score);
  if (candidateLines.length > 0) {
    const uniqueLines = Array.from(new Set(candidateLines.map((c) => c.line))).slice(0, 2);
    return uniqueLines.join(' ');
  }

  return `Pranam Kumar Chand is a B.Sc. Data Science student at Ravenshaw University, Cuttack (2025–2029, 7.76 SGPA), specializing in Python, SQL, Power BI, Machine Learning, and RAG applications. Ask me about his projects, skills, education, or hobbies!`;
}


