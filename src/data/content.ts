export type ProjectCategory =
  | 'Featured'
  | 'Data Analysis'
  | 'Machine Learning'
  | 'NLP'
  | 'Deep Learning'
  | 'Folders';

export type WindowId =
  | 'about'
  | 'projects'
  | 'project-detail'
  | 'resume'
  | 'skills'
  | 'gallery'
  | 'reel'
  | 'contact'
  | 'music'
  | 'movies'
  | 'manga'
  | 'certifications'
  | 'resources'
  | 'ai-agent';

export interface ProjectCaseStudy {
  subtitle: string;
  overview: string;
  highlights: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  demoVideoUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  category: Exclude<ProjectCategory, 'Featured' | 'Folders'>;
  secondaryCategories?: Exclude<ProjectCategory, 'Featured' | 'Folders'>[];
  featuredOrder?: number;
  tags: string[];
  image: string;
  remoteImage?: string;
  links: {
    live?: string;
    github?: string;
    caseStudyId?: string;
  };
  desktopSlot?: {
    zone: 'left' | 'right';
    col: number;
    row: number;
  };
  caseStudy?: ProjectCaseStudy;
}

export interface ProjectFolder {
  id: 'dashboard-folder' | 'eda-folder';
  title: string;
  description: string;
  coverImage: string;
  remoteCoverImage?: string;
  tags: string[];
  projectIds: string[];
}

export interface SkillItem {
  name: string;
  category: 'Languages & Libraries' | 'Tools' | 'Currently Learning';
  iconUrl: string;
  note?: string;
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  scoreOrStatus: string;
  period: string;
}

export interface ExperienceProgramItem {
  title: string;
  organization: string;
  period: string;
  summary: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  location: string;
  imageUrl: string;
  fallbackGradient: string;
}

export interface ResourceLink {
  id: string;
  title: string;
  category: 'Roadmaps' | 'Datasets' | 'Tools & Notebooks';
  description: string;
  url: string;
  domain: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  category:
    | 'IBM SkillsBuild'
    | 'Microsoft & Google'
    | 'Internships & Recognition';
  date: string;
  format: 'PDF Certificate' | 'Digital Credential';
  imageUrl: string;
  pdfUrl?: string;
  verifyUrl?: string;
  credentialId?: string;
}

export interface MangaItem {
  id: string;
  title: string;
  coverImage: string;
  searchUrl: string;
}

export interface CinemaItem {
  id: string;
  title: string;
  coverImage: string;
  searchUrl: string;
}

export const PORTFOLIO_CONTENT = {
  identity: {
    displayName: 'Pranam Chand',
    officialFullName: 'Pranam Kumar Chand',
    roleTitle: 'Aspiring Data Analyst & Data Science Student',
    roleLine: 'Data Science Student | Aspiring Data Analyst',
    university: 'Ravenshaw University',
    location: 'Odisha, India',
    email: 'pranamchand@gmail.com',
    avatar: '/assets/aistudio/my_photo_e82ab7e7.jpeg',
    remoteAvatar: 'https://pranamchand.github.io/assets/images/my-photo.jpeg',
    resumePdf: '/assets/aistudio/Resume_Pranam_chand_6b4bd9d9.pdf',
    remoteResumePdf:
      'https://pranamchand.github.io/assets/Resume%20Pranam%20chand.pdf',
    github: 'https://github.com/Pranamchand',
    linkedin: 'https://www.linkedin.com/in/pranamchand',
    kaggle: 'https://www.kaggle.com/pranamkumarchand',
    emailjsServiceId: 'service_93ir2tr',
    emailjsTemplateId: 'template_portfolio',
    emailjsPublicKey: 'user_portfolio',
    formspreeId: '[ADD FORMSPREE ID]',
    copyrightYear: 2026,
    copyrightLine: '© 2026 Pranam Chand. Built with React & Tailwind.',
  },

  about: {
    greeting: "Hello, I'm Pranam Chand",
    headline:
      'Turning raw datasets into clear, decision-ready business insights.',
    bio: "I'm a Data Science undergraduate at Ravenshaw University, passionate about uncovering patterns in complex datasets and building clean, decision-ready analytics products. From interactive Power BI and Excel dashboards to end-to-end Machine Learning and NLP applications deployed on Streamlit, I love bridging statistical rigor with intuitive visual storytelling.",
    lookingFor:
      'Actively seeking Data Analyst and Data Science internship opportunities where I can contribute to SQL/Python data pipelines, exploratory data analysis, and executive BI reporting.',
    quickStats: [
      { label: 'Projects Built', value: '17+' },
      { label: 'BI Dashboards', value: '5' },
      { label: 'Deployed ML Apps', value: '6' },
      { label: 'B.Sc. Data Science', value: 'Ravenshaw Univ.' },
    ],
    whatIDo: [
      {
        title: 'Data Analysis & EDA',
        description:
          'Cleaning, transforming, and profiling large-scale real-world datasets using Python (Pandas, NumPy) and SQL to uncover actionable drivers.',
      },
      {
        title: 'BI Dashboards & Storytelling',
        description:
          'Designing interactive KPI dashboards in Power BI, Tableau, and Microsoft Excel with dynamic slicers, DAX measures, and executive summaries.',
      },
      {
        title: 'Machine Learning & NLP',
        description:
          'Training and deploying predictive models, recommendation engines, and text classifiers using Scikit-learn, NLTK, TensorFlow, and Streamlit.',
      },
    ],
    education: [
      {
        institution: 'Ravenshaw University',
        location: 'Cuttack, Odisha',
        degree: 'B.Sc. in Data Science (Honours)',
        scoreOrStatus: 'Continuing',
        period: 'Present',
      },
      {
        institution: 'Nilamani Institute of Science and Technology (NIST)',
        location: 'Balasore, Odisha',
        degree: 'Higher Secondary Education (Science)',
        scoreOrStatus: '89%',
        period: 'Completed',
      },
      {
        institution:
          'Sri Aurobindo Center of Integral Education (SACIE), Rairangpur',
        location: 'Mayurbhanj, Odisha',
        degree: 'Secondary Schooling',
        scoreOrStatus: '91%',
        period: 'Completed',
      },
    ] as EducationItem[],
    programs: [
      {
        title: 'Data Analytics with AI Internship Program',
        organization: 'IBM SkillsBuild · Edunet Foundation',
        period: '2026',
        summary:
          'Completed intensive hands-on training in AI-driven data analytics, exploratory data modeling, and business intelligence workflows.',
      },
      {
        title: 'Flipkart GRiD 8.0 — Software Development Track',
        organization: 'Flipkart (Unstop)',
        period: '2026',
        summary:
          'Participated in national-level engineering and problem-solving challenge focused on scalable algorithms and data structures.',
      },
      {
        title: 'Unihack 2026',
        organization: 'University Hackathon',
        period: '2026',
        summary:
          'Collaborated on rapid prototyping of data-backed web and machine learning solutions under tight hackathon constraints.',
      },
    ] as ExperienceProgramItem[],
  },

  folders: [
    {
      id: 'dashboard-folder',
      title: 'Featured Dashboard Projects',
      description:
        'Collection of interactive Power BI, Tableau, and Excel dashboards analyzing retail, streaming, and coffee market KPIs.',
      coverImage: '/assets/aistudio/Dashboard_Folder__a68590d7.png',
      remoteCoverImage:
        'https://raw.githubusercontent.com/Pranamchand/pranamchand.github.io/main/Dashboard%20Folder%20.png',
      tags: ['Power BI', 'Excel', 'Tableau', 'SQL'],
      projectIds: [
        'apple-global-retail-analytics',
        'spotify-user-behavior-dashboard',
        'starbucks-dashboard',
        'monday-coffee-market-analysis',
      ],
    },
    {
      id: 'eda-folder',
      title: 'Featured EDA Projects',
      description:
        'Deep-dive Exploratory Data Analysis notebooks uncovering statistical trends in customer churn, US traffic accidents, anime ratings, and UK demographics.',
      coverImage: '/assets/aistudio/EDA.png',
      remoteCoverImage:
        'https://raw.githubusercontent.com/Pranamchand/pranamchand.github.io/main/EDA.png',
      tags: ['Python', 'Pandas', 'Seaborn', 'Matplotlib'],
      projectIds: [
        'customer-churn-eda',
        'anime-data-analysis',
        'us-accidents-eda',
        'uk-baby-names-analysis',
      ],
    },
  ] as ProjectFolder[],

  projects: [
    {
      id: 'apple-global-retail-analytics',
      title: 'Apple Global Retail Analytics',
      shortTitle: 'Apple Retail BI',
      description:
        'End-to-end global retail performance analysis & executive Power BI dashboard tracking store sales, product mix, and regional growth across 1M+ rows.',
      category: 'Data Analysis',
      featuredOrder: 1,
      tags: ['SQL', 'Power BI', 'DAX', 'Data Modeling'],
      image: '/assets/aistudio/Apple_Global_Analysis_Dashboard-1_f46a00e6.png',
      remoteImage:
        'https://raw.githubusercontent.com/Pranamchand/pranamchand.github.io/main/Apple%20Global%20Analysis%20Dashboard-1.png',
      links: {
        github: 'https://github.com/Pranamchand/APPLE-GLOBAL-RETAIL-ANALYTICS',
      },
      desktopSlot: { zone: 'left', col: 0, row: 1 },
      caseStudy: {
        subtitle:
          'Global Retail Sales, Warranty Claims & Store Performance BI Suite',
        overview:
          'Engineered a relational SQL warehouse and interactive Power BI dashboard analyzing Apple retail transactions across stores, product categories, and regions to identify top-performing markets and warranty claim patterns.',
        highlights: [
          'Modeled 1M+ retail transaction records across stores, products, sales, and warranty tables using complex SQL joins and window functions.',
          'Built dynamic DAX KPI cards for YoY Revenue Growth, Average Order Value (AOV), and Regional Store Efficiency.',
          'Uncovered seasonal demand spikes and high-margin accessory attach rates across flagship locations.',
        ],
        techStack: ['PostgreSQL', 'Power BI', 'DAX', 'Power Query'],
        metrics: [
          { label: 'Records Analyzed', value: '1M+' },
          { label: 'Global Stores', value: '75+' },
          { label: 'SQL Queries', value: '20+' },
        ],
      },
    },
    {
      id: 'heart-disease-risk-assessment',
      title: 'Heart Disease Risk Assessment',
      shortTitle: 'Heart Risk ML',
      description:
        'Clinical machine learning web app predicting cardiovascular risk from patient vitals and ECG biomarkers with real-time Streamlit inference.',
      category: 'Machine Learning',
      featuredOrder: 2,
      tags: ['Python', 'Scikit-learn', 'Streamlit', 'Healthcare ML'],
      image: '/assets/aistudio/heart_disease_app.png',
      remoteImage:
        'https://raw.githubusercontent.com/Pranamchand/pranamchand.github.io/main/heart_disease_app.png',
      links: {
        live: 'https://pranamchand-heart-disease-risk-assessment.streamlit.app/',
      },
      desktopSlot: { zone: 'right', col: 1, row: 1 },
      caseStudy: {
        subtitle: 'Clinical Biomarker Classification & Real-Time Risk Scoring',
        overview:
          'Built and deployed a supervised classification pipeline that evaluates clinical parameters—including age, cholesterol, resting blood pressure, and maximum heart rate—to provide instant cardiovascular risk stratification.',
        highlights: [
          'Performed feature scaling, outlier handling, and hyperparameter tuning across Logistic Regression, Random Forest, and XGBoost classifiers.',
          'Deployed an interactive Streamlit interface allowing users to adjust clinical sliders and inspect probability scores in real time.',
        ],
        techStack: [
          'Python',
          'Scikit-learn',
          'Pandas',
          'Streamlit',
          'Joblib',
        ],
        metrics: [
          { label: 'ROC-AUC', value: '0.91' },
          { label: 'Clinical Features', value: '13' },
          { label: 'Inference Latency', value: '<50ms' },
        ],
      },
    },
    {
      id: 'book-recommendation-system',
      title: 'Book Recommendation System',
      shortTitle: 'Book RecSys',
      description:
        'Collaborative & popularity-based book recommender engine trained on user ratings and metadata, deployed as an interactive Streamlit app.',
      category: 'Machine Learning',
      featuredOrder: 3,
      tags: ['Python', 'Cosine Similarity', 'Collaborative Filtering', 'Streamlit'],
      image: '/assets/aistudio/book_recomendation_system_0999b41e.png',
      remoteImage:
        'https://raw.githubusercontent.com/Pranamchand/pranamchand.github.io/main/book%20recomendation%20system.png',
      links: {
        live: 'https://books-recommendation-pranamchand.streamlit.app/',
      },
      desktopSlot: { zone: 'right', col: 1, row: 2 },
      caseStudy: {
        subtitle: 'Vector Similarity & Collaborative Filtering Book Discovery',
        overview:
          'Engineered a hybrid recommendation system combining Top-50 popularity rankings with item-item collaborative filtering using cosine similarity over sparse user-book rating matrices.',
        highlights: [
          'Filtered high-signal readers and books to construct a dense pivot matrix and compute pairwise cosine similarity vectors.',
          'Delivered instant cover-art recommendations via an interactive Streamlit web application.',
        ],
        techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit'],
        metrics: [
          { label: 'Books Indexed', value: '10K+' },
          { label: 'Ratings Processed', value: '1.1M' },
          { label: 'Top-K Results', value: 'Top 5' },
        ],
      },
    },
    {
      id: 'basic-sentiment-analysis',
      title: 'Basic Sentiment Analysis',
      shortTitle: 'Sentiment NLP',
      description:
        'NLP web application that classifies customer reviews and social text into Positive, Negative, or Neutral sentiment with polarity scoring.',
      category: 'NLP',
      secondaryCategories: ['Machine Learning'],
      featuredOrder: 4,
      tags: ['Python', 'NLP', 'TF-IDF', 'Streamlit'],
      image: '/assets/aistudio/centimental_Analysis.png',
      remoteImage:
        'https://raw.githubusercontent.com/Pranamchand/pranamchand.github.io/main/centimental%20Analysis.png',
      links: {
        live: 'https://sentiment-analysis-pranamchand.streamlit.app/',
      },
      desktopSlot: { zone: 'right', col: 0, row: 0 },
    },
    {
      id: 'movie-recommendation-system',
      title: 'Movie Recommendation System',
      shortTitle: 'Movie RecSys',
      description:
        'Content-based movie recommendation engine using NLP TF-IDF vectorization and cosine similarity over TMDB genres, cast, crew, and plot keywords.',
      category: 'Machine Learning',
      secondaryCategories: ['NLP'],
      featuredOrder: 5,
      tags: ['Python', 'NLP', 'TF-IDF', 'Cosine Similarity'],
      image: '/assets/aistudio/movie_recomendation.png',
      remoteImage:
        'https://raw.githubusercontent.com/Pranamchand/pranamchand.github.io/main/movie%20recomendation.png',
      links: {
        github:
          'https://github.com/Pranamchand/Movie-Recommendation-System-using-NLP-TF-IDF',
      },
      desktopSlot: { zone: 'right', col: 0, row: 1 },
    },
    {
      id: 'weather-temperature-prediction-model',
      title: 'Weather Temperature Prediction Model',
      shortTitle: 'Weather ML',
      description:
        'Supervised regression pipeline forecasting ambient temperature from humidity, wind speed, atmospheric pressure, and historical weather patterns.',
      category: 'Machine Learning',
      tags: ['Python', 'Regression', 'Scikit-learn', 'Feature Engineering'],
      image: '/assets/aistudio/Weather-Temperature-Prediction_5a04b8c7.png',
      remoteImage:
        'https://pranamchand.github.io/assets/images/Weather-Temperature-Prediction.png',
      links: {
        github:
          'https://github.com/Pranamchand/Weather-Temperature-Prediction-Model',
      },
    },
    {
      id: 'disaster-tweets-prediction-model',
      title: 'Disaster Tweets Prediction Model',
      shortTitle: 'Disaster Tweets',
      description:
        'Kaggle NLP classifier detecting real-time emergency & disaster tweets versus figurative language using text preprocessing and vectorization.',
      category: 'NLP',
      secondaryCategories: ['Machine Learning'],
      tags: ['Python', 'NLP', 'NLTK', 'Streamlit'],
      image: '/assets/aistudio/disaster_tweet_model_f6a69a3f.png',
      remoteImage:
        'https://pranamchand.github.io/assets/images/disaster_tweet_model.png',
      links: {
        live: 'https://disaster-tweets-pranamchand.streamlit.app/',
      },
      desktopSlot: { zone: 'right', col: 0, row: 2 },
    },
    {
      id: 'gender-classification-model',
      title: 'Gender Classification Model',
      shortTitle: 'Gender Classifier',
      description:
        'Interactive machine learning classifier predicting gender from biometric and facial feature measurements with live Streamlit deployment.',
      category: 'Machine Learning',
      tags: ['Python', 'Classification', 'Scikit-learn', 'Streamlit'],
      image: '/assets/aistudio/gender_classification_banner_a90c9fca.png',
      remoteImage:
        'https://pranamchand.github.io/assets/images/gender_classification_banner.png',
      links: {
        live: 'https://pranamchand-gender-classification-model.streamlit.app/',
      },
    },
    {
      id: 'next-text-prediction-model',
      title: 'Next-Text Prediction Model',
      shortTitle: 'Next-Word LSTM',
      description:
        'Deep learning sequence model built with LSTM neural networks to predict subsequent words in a phrase with real-time Streamlit generation.',
      category: 'Deep Learning',
      secondaryCategories: ['NLP'],
      tags: ['Python', 'TensorFlow', 'LSTM', 'Deep Learning', 'Streamlit'],
      image: '/assets/aistudio/text_prediction_banner_660aaed8.png',
      remoteImage:
        'https://pranamchand.github.io/assets/images/text_prediction_banner.png',
      links: {
        live: 'https://pranamchand-next-text-prediction-model.streamlit.app/',
      },
      desktopSlot: { zone: 'right', col: 0, row: 3 },
    },
    {
      id: 'uk-baby-names-analysis',
      title: 'UK Baby Names Analysis Report',
      shortTitle: 'UK Baby Names',
      description:
        'Longitudinal demographic analysis of UK baby naming trends, multi-decade popularity shifts, and regional naming diversity.',
      category: 'Data Analysis',
      tags: ['Python', 'Pandas', 'EDA', 'Data Visualization'],
      image: '/assets/aistudio/uk_baby_name_analysis_2f1fc0d6.png',
      remoteImage:
        'https://pranamchand.github.io/assets/images/uk%20baby%20name%20analysis.png',
      links: {
        github:
          'https://github.com/Pranamchand/UK-Babies-Name-Annalysis-Report',
      },
    },
    {
      id: 'customer-churn-eda',
      title: 'Customer Churn EDA',
      shortTitle: 'Churn EDA',
      description:
        'Comprehensive exploratory data analysis identifying key contract, tenure, and billing factors driving telecom customer attrition.',
      category: 'Data Analysis',
      tags: ['Python', 'Pandas', 'Seaborn', 'Retention Analytics'],
      image: '/assets/aistudio/customer_churn_eda_20b1c550.png',
      remoteImage:
        'https://pranamchand.github.io/assets/images/customer%20churn%20eda.png',
      links: {
        github: 'https://github.com/Pranamchand/Costomer-churn-EDA',
      },
    },
    {
      id: 'anime-data-analysis',
      title: 'Anime Data Analysis',
      shortTitle: 'Anime EDA',
      description:
        'Statistical exploration of anime studios, genre popularity, episode counts, and audience rating distributions across thousands of titles.',
      category: 'Data Analysis',
      tags: ['Python', 'Pandas', 'Matplotlib', 'EDA'],
      image: '/assets/aistudio/anime_analysis_39e104fd.png',
      remoteImage:
        'https://pranamchand.github.io/assets/images/anime%20analysis.png',
      links: {
        github: 'https://github.com/Pranamchand/Anime-Data-Analysis',
      },
    },
    {
      id: 'us-accidents-eda',
      title: 'US Accidents EDA',
      shortTitle: 'US Accidents EDA',
      description:
        'Large-scale geospatial and temporal exploratory analysis of US traffic accidents examining weather impact, rush-hour peaks, and state hotspots.',
      category: 'Data Analysis',
      tags: ['Python', 'Geospatial EDA', 'Pandas', 'Seaborn'],
      image: '/assets/aistudio/us_accident_eda_f044dfce.png',
      remoteImage:
        'https://pranamchand.github.io/assets/images/us%20accident%20eda.png',
      links: {
        github: 'https://github.com/Pranamchand/US-Accident-EDA',
      },
    },
    {
      id: 'spotify-user-behavior-dashboard',
      title: 'Spotify User Behavior Dashboard',
      shortTitle: 'Spotify BI',
      description:
        'EDA and interactive dashboard examining listener demographics, subscription conversion drivers, podcast preferences, and listening sessions.',
      category: 'Data Analysis',
      tags: ['Power BI', 'Python', 'EDA', 'User Analytics'],
      image: '/assets/aistudio/spotify_dashboard_5d23e680.png',
      remoteImage:
        'https://pranamchand.github.io/assets/images/spotify_dashboard.png',
      links: {
        github:
          'https://github.com/Pranamchand/Spotify-User-Behavior-EDA-and-DASHBOARD',
      },
    },
    {
      id: 'starbucks-dashboard',
      title: 'Starbucks Dashboard',
      shortTitle: 'Starbucks BI',
      description:
        'Retail beverage analytics dashboard visualizing store revenue, nutritional product breakdowns, customer loyalty, and regional sales performance.',
      category: 'Data Analysis',
      tags: ['Power BI', 'Retail Analytics', 'Data Visualization'],
      image: '/assets/aistudio/starbucks_390e9d32.png',
      remoteImage:
        'https://pranamchand.github.io/assets/images/starbucks.png',
      links: {
        github: 'https://github.com/Pranamchand/Starbucks-Dashboard',
      },
    },
    {
      id: 'monday-coffee-market-analysis',
      title: 'Monday Coffee Market Analysis',
      shortTitle: 'Monday Coffee SQL',
      description:
        'Market expansion & city-level demand analysis helping a specialty coffee brand select top tier cities for new store openings.',
      category: 'Data Analysis',
      tags: ['SQL', 'Market Research', 'Business Analytics', 'BI'],
      image: '/assets/aistudio/monday_cofee_bd35f8e9.png',
      remoteImage:
        'https://pranamchand.github.io/assets/images/monday_cofee.png',
      links: {
        github: 'https://github.com/Pranamchand/Monday-Coffee-Market-Analysis',
      },
    },
  ] as ProjectItem[],

  skills: [
    // Languages & Libraries (including ML, DL, GenAI, RAG, LangChain, FastAPI, Hugging Face)
    {
      name: 'Python',
      category: 'Languages & Libraries',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
    {
      name: 'SQL',
      category: 'Languages & Libraries',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg',
    },
    {
      name: 'R',
      category: 'Languages & Libraries',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg',
    },
    {
      name: 'Machine Learning',
      category: 'Languages & Libraries',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
      note: 'Supervised & Unsupervised Modeling',
    },
    {
      name: 'Deep Learning',
      category: 'Languages & Libraries',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
      note: 'Neural Networks, LSTMs & Sequence Models',
    },
    {
      name: 'Generative AI',
      category: 'Languages & Libraries',
      iconUrl: 'https://cdn.simpleicons.org/googlegemini/8E75B2',
      note: 'LLMs, Prompt Engineering & Multimodal Workflows',
    },
    {
      name: 'RAG',
      category: 'Languages & Libraries',
      iconUrl: 'https://cdn.simpleicons.org/databricks/FF3621',
      note: 'Retrieval-Augmented Generation & Vector Search',
    },
    {
      name: 'LangChain',
      category: 'Languages & Libraries',
      iconUrl: 'https://cdn.simpleicons.org/langchain/1C3C3C',
      note: 'LLM Chains, Agents & Document Pipelines',
    },
    {
      name: 'Hugging Face',
      category: 'Languages & Libraries',
      iconUrl: 'https://cdn.simpleicons.org/huggingface/FFD21E',
      note: 'Transformers, Open-Weights Models & Datasets',
    },
    {
      name: 'FastAPI',
      category: 'Languages & Libraries',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
      note: 'High-Performance Python REST APIs for ML Inference',
    },
    {
      name: 'NumPy',
      category: 'Languages & Libraries',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
    },
    {
      name: 'Pandas',
      category: 'Languages & Libraries',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    },
    {
      name: 'Matplotlib',
      category: 'Languages & Libraries',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg',
    },
    {
      name: 'Seaborn',
      category: 'Languages & Libraries',
      iconUrl: 'https://seaborn.pydata.org/_images/logo-mark-lightbg.svg',
    },
    {
      name: 'Scikit-learn',
      category: 'Languages & Libraries',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    },
    {
      name: 'NLTK',
      category: 'Languages & Libraries',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      note: 'Natural Language Toolkit',
    },
    {
      name: 'Streamlit',
      category: 'Languages & Libraries',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg',
    },

    // Tools & Platforms (including Oracle, OpenCode, Codex, Zapier, YouTube Automation)
    {
      name: 'Power BI',
      category: 'Tools',
      iconUrl:
        'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',
    },
    {
      name: 'Excel',
      category: 'Tools',
      iconUrl:
        'https://img.icons8.com/color/96/microsoft-excel-2019--v1.png',
    },
    {
      name: 'Tableau',
      category: 'Tools',
      iconUrl:
        'https://cdn.worldvectorlogo.com/logos/tableau-software.svg',
    },
    {
      name: 'MySQL',
      category: 'Tools',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    },
    {
      name: 'PostgreSQL',
      category: 'Tools',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    },
    {
      name: 'Oracle',
      category: 'Tools',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
      note: 'Oracle Database & Enterprise Cloud SQL',
    },
    {
      name: 'OpenCode',
      category: 'Tools',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
      note: 'AI Coding Agent & Terminal Engineering Workflow',
    },
    {
      name: 'Codex',
      category: 'Tools',
      iconUrl: '/assets/skills/codex.svg',
      note: 'Autonomous AI Software Engineering & Code Generation',
    },
    {
      name: 'Zapier',
      category: 'Tools',
      iconUrl: 'https://cdn.simpleicons.org/zapier/FF4A00',
      note: 'No-Code & AI Workflow Automation',
    },
    {
      name: 'YouTube Automation',
      category: 'Tools',
      iconUrl: 'https://cdn.simpleicons.org/youtube/FF0000',
      note: 'Automated Content Pipelines, Analytics & Scripting',
    },
    {
      name: 'Jupyter',
      category: 'Tools',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg',
    },
    {
      name: 'VS Code',
      category: 'Tools',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    },
    {
      name: 'PyCharm',
      category: 'Tools',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg',
    },
    {
      name: 'Git',
      category: 'Tools',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    },
    {
      name: 'GitHub',
      category: 'Tools',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    },
    {
      name: 'Kaggle',
      category: 'Tools',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original.svg',
    },
  ] as SkillItem[],

  gallery: [] as GalleryItem[],

  reel: {
    title: 'Video — Project Walkthroughs',
    subtitle: 'Interactive demos and data storytelling clips',
    videoUrl: '[ADD YOUTUBE / LOOM EMBED URL]',
    channelName: 'Pranam Chand Analytics',
  },

  music: {
    playlistTitle: 'Deep Focus — Coding & Data Exploration',
    tracks: [] as {
      id: string;
      title: string;
      artist: string;
      duration: string;
    }[],
  },

  certifications: [
    // Internships & Recognition
    {
      id: 'ibm-edunet-internship',
      title: 'Data Analytics with AI Internship Program',
      issuer: 'IBM SkillsBuild & Edunet Foundation',
      category: 'Internships & Recognition',
      date: 'Mar 2026',
      format: 'PDF Certificate',
      imageUrl: '/assets/aistudio/Pranam_kumar_chand_1_-1_5f062c8f.png',
      credentialId: 'STU68905eb55537c1754291893',
    },
    {
      id: 'unstop-matiks-appreciation',
      title: 'Certificate of Appreciation — Crucible Leaderboard',
      issuer: 'Matiks & Unstop · Ravenshaw University',
      category: 'Internships & Recognition',
      date: '2026',
      format: 'PDF Certificate',
      imageUrl: '/assets/aistudio/cert_unstop_matiks.png',
      pdfUrl: '/assets/aistudio/matrics_164d786e.pdf',
    },

    // IBM SkillsBuild Credentials & PDFs
    {
      id: 'ibm-ai-fundamentals-badge',
      title: 'Artificial Intelligence Fundamentals',
      issuer: 'IBM SkillsBuild',
      category: 'IBM SkillsBuild',
      date: 'Jul 2026',
      format: 'Digital Credential',
      imageUrl: '/assets/aistudio/cert_ibm_ai_fundamentals_doc.png',
      pdfUrl: '/assets/aistudio/IBMDesign20260731-8-asep65_cd90c78d.pdf',
    },
    {
      id: 'ibm-data-fundamentals-badge',
      title: 'Data Fundamentals',
      issuer: 'IBM SkillsBuild',
      category: 'IBM SkillsBuild',
      date: '2026',
      format: 'Digital Credential',
      imageUrl: '/assets/aistudio/data-fundamentals_2c55bb32.png',
      pdfUrl: '/assets/aistudio/hdhf_e0f41065.pdf',
    },
    {
      id: 'ibm-supercharge-data-analytics-genai',
      title: 'Supercharge Your Data Analytics with Generative AI',
      issuer: 'IBM SkillsBuild',
      category: 'IBM SkillsBuild',
      date: '2026',
      format: 'Digital Credential',
      imageUrl: '/assets/aistudio/data-fundamentals_2c55bb32.png',
    },
    {
      id: 'ibm-granite-classifying-data',
      title: 'Classifying Data Using IBM Granite',
      issuer: 'IBM SkillsBuild',
      category: 'IBM SkillsBuild',
      date: '2026',
      format: 'Digital Credential',
      imageUrl:
        '/assets/aistudio/Digital_Sticker_Unleashing_the_Power_of_AI_Agents_dff4c72f.png',
    },
    {
      id: 'ibm-granite-summarizing-data',
      title: 'Summarizing Data Using IBM Granite',
      issuer: 'IBM SkillsBuild',
      category: 'IBM SkillsBuild',
      date: '2026',
      format: 'Digital Credential',
      imageUrl:
        '/assets/aistudio/Digital_Sticker_Unleashing_the_Power_of_AI_Agents_dff4c72f.png',
    },
    {
      id: 'ibm-intro-llms',
      title: 'Introduction to Large Language Models',
      issuer: 'IBM SkillsBuild',
      category: 'IBM SkillsBuild',
      date: '2026',
      format: 'Digital Credential',
      imageUrl:
        '/assets/aistudio/Digital_Sticker_Unleashing_the_Power_of_AI_Agents_dff4c72f.png',
    },
    {
      id: 'ibm-intro-rag',
      title: 'Introduction to Retrieval-Augmented Generation (RAG)',
      issuer: 'IBM SkillsBuild',
      category: 'IBM SkillsBuild',
      date: '2026',
      format: 'Digital Credential',
      imageUrl:
        '/assets/aistudio/Digital_Sticker_Unleashing_the_Power_of_AI_Agents_dff4c72f.png',
    },
    {
      id: 'ibm-multiagent-systems',
      title: 'The Rise of Multiagent Systems',
      issuer: 'IBM SkillsBuild',
      category: 'IBM SkillsBuild',
      date: '2026',
      format: 'Digital Credential',
      imageUrl:
        '/assets/aistudio/Digital_Sticker_Unleashing_the_Power_of_AI_Agents_dff4c72f.png',
    },
    {
      id: 'ibm-unleashing-ai-agents',
      title: 'Unleashing the Power of AI Agents',
      issuer: 'IBM SkillsBuild',
      category: 'IBM SkillsBuild',
      date: '2026',
      format: 'Digital Credential',
      imageUrl:
        '/assets/aistudio/Digital_Sticker_Unleashing_the_Power_of_AI_Agents_dff4c72f.png',
    },
    {
      id: 'ibm-ai-fundamentals-plan',
      title: 'Artificial Intelligence Fundamentals Learning Plan',
      issuer: 'IBM SkillsBuild',
      category: 'IBM SkillsBuild',
      date: 'Jul 2026',
      format: 'PDF Certificate',
      imageUrl: '/assets/aistudio/cert_ibm_ai_fundamentals_doc.png',
      pdfUrl: '/assets/aistudio/IBMDesign20260731-8-asep65_cd90c78d.pdf',
    },
    {
      id: 'ibm-data-fundamentals-plan',
      title: 'Data Fundamentals Learning Plan (53 Hours)',
      issuer: 'IBM SkillsBuild',
      category: 'IBM SkillsBuild',
      date: '2026',
      format: 'PDF Certificate',
      imageUrl: '/assets/aistudio/cert_ibm_data_fundamentals_doc.png',
      pdfUrl: '/assets/aistudio/hdhf_e0f41065.pdf',
    },

    // Microsoft & Google Certifications
    {
      id: 'google-simplilearn-genai-apps',
      title: 'Build Generative AI Apps and Solutions with No-Code Tools',
      issuer: 'Google Cloud & Simplilearn SkillUp',
      category: 'Microsoft & Google',
      date: 'Jul 2026',
      format: 'PDF Certificate',
      imageUrl: '/assets/aistudio/cert_genai_google_simplilearn.png',
      pdfUrl: '/assets/aistudio/10519557_10851366_1785160287151_cd8bc7c7.pdf',
      credentialId: '10851366',
    },
    {
      id: 'simplilearn-prompt-engineering',
      title: 'Introduction to Prompt Engineering',
      issuer: 'Simplilearn SkillUp',
      category: 'Microsoft & Google',
      date: 'Jul 2026',
      format: 'PDF Certificate',
      imageUrl: '/assets/aistudio/cert_genai_google_simplilearn.png',
      pdfUrl: '/assets/aistudio/10519557_10851366_1785160287151_cd8bc7c7.pdf',
      credentialId: '8712224',
    },
    {
      id: 'ms-learn-copilot-powerbi',
      title: 'Introduction to Copilot for Microsoft Power BI',
      issuer: 'Microsoft Learn',
      category: 'Microsoft & Google',
      date: 'Jul 2026',
      format: 'PDF Certificate',
      imageUrl: '/assets/aistudio/cert_ms_copilot_powerbi.png',
      pdfUrl: '/assets/aistudio/copilot_a5e92a7b.pdf',
    },
    {
      id: 'ms-learn-fabric',
      title: 'Get Started with Microsoft Fabric',
      issuer: 'Microsoft Learn',
      category: 'Microsoft & Google',
      date: 'Jul 2026',
      format: 'PDF Certificate',
      imageUrl: '/assets/aistudio/cert_ms_copilot_powerbi.png',
      pdfUrl: '/assets/aistudio/copilot_a5e92a7b.pdf',
    },
    {
      id: 'my-bharat-recognition',
      title: 'Certificate of Recognition — Viksit Bharat',
      issuer: 'MY Bharat · Ministry of Youth Affairs and Sports',
      category: 'Internships & Recognition',
      date: '2026',
      format: 'PDF Certificate',
      imageUrl: '/assets/aistudio/Registration_Certificate_ed9f73b2.png',
    },
  ] as CertificationItem[],

  resources: {
    note: 'Curated datasets, roadmaps, and notebooks I use for Data Analytics & Machine Learning.',
    items: [
      {
        id: 'res-kaggle-profile',
        title: 'Pranam Kumar Chand — Kaggle Notebooks & Datasets',
        category: 'Tools & Notebooks',
        description:
          'Explore my public Exploratory Data Analysis notebooks, competition submissions, and reproducible Python scripts.',
        url: 'https://www.kaggle.com/pranamkumarchand',
        domain: 'kaggle.com',
      },
      {
        id: 'res-github-repos',
        title: 'All 17+ Data Science & BI Repositories',
        category: 'Tools & Notebooks',
        description:
          'Complete source code, SQL scripts, Power BI .pbix files, and Streamlit deployment configs.',
        url: 'https://github.com/Pranamchand',
        domain: 'github.com',
      },
      {
        id: 'res-roadmap-da',
        title: 'Data Analyst & BI Engineering Learning Path',
        category: 'Roadmaps',
        description:
          'Structured progression across SQL window functions, Python Pandas, Power BI DAX modeling, and executive storytelling.',
        url: 'https://roadmap.sh/data-analyst',
        domain: 'roadmap.sh',
      },
      {
        id: 'res-uci-ml',
        title: 'UCI Machine Learning & Kaggle Open Datasets',
        category: 'Datasets',
        description:
          'Benchmark datasets used across my Heart Disease, Customer Churn, and Retail Analytics projects.',
        url: 'https://www.kaggle.com/datasets',
        domain: 'kaggle.com',
      },
    ] as ResourceLink[],
  },

  manga: [
    {
      id: 'omniscient-readers-viewpoint',
      title: "Omniscient Reader's Viewpoint",
      coverImage: '/assets/manga/omniscient-readers-viewpoint.jpg',
      searchUrl:
        "https://www.google.com/search?q=Omniscient+Reader's+Viewpoint+manhwa",
    },
    {
      id: 'the-beginning-after-the-end',
      title: 'The Beginning After the End',
      coverImage: '/assets/manga/the-beginning-after-the-end.jpg',
      searchUrl:
        'https://www.google.com/search?q=The+Beginning+After+the+End+manhwa',
    },
    {
      id: 'surviving-the-game-as-a-barbarian',
      title: 'Surviving the Game as a Barbarian',
      coverImage: '/assets/manga/surviving-the-game-as-a-barbarian.jpg',
      searchUrl:
        'https://www.google.com/search?q=Surviving+the+Game+as+a+Barbarian+manhwa',
    },
    {
      id: 'the-novels-extra-remake',
      title: "The Novel's Extra (Remake)",
      coverImage: '/assets/manga/the-novels-extra-remake.jpg',
      searchUrl:
        "https://www.google.com/search?q=The+Novel's+Extra+(Remake)+manhwa",
    },
    {
      id: 'jungle-juice',
      title: 'Jungle Juice',
      coverImage: '/assets/manga/jungle-juice.jpg',
      searchUrl: 'https://www.google.com/search?q=Jungle+Juice+manhwa',
    },
    {
      id: 'revenge-of-the-iron-blooded-sword-hound',
      title: 'Revenge of the Iron-Blooded Sword Hound',
      coverImage: '/assets/manga/revenge-of-the-iron-blooded-sword-hound.jpg',
      searchUrl:
        'https://www.google.com/search?q=Revenge+of+the+Iron-Blooded+Sword+Hound+manhwa',
    },
    {
      id: 'the-extras-academy-survival-guide',
      title: "The Extra's Academy Survival Guide",
      coverImage: '/assets/manga/the-extras-academy-survival-guide.jpg',
      searchUrl:
        "https://www.google.com/search?q=The+Extra's+Academy+Survival+Guide+manhwa",
    },
    {
      id: 'swordmasters-youngest-son',
      title: "Swordmaster's Youngest Son",
      coverImage: '/assets/manga/swordmasters-youngest-son.jpg',
      searchUrl:
        "https://www.google.com/search?q=Swordmaster's+Youngest+Son+manhwa",
    },
    {
      id: 'pick-me-up-infinite-gacha',
      title: 'Pick Me Up, Infinite Gacha',
      coverImage: '/assets/manga/pick-me-up-infinite-gacha.jpg',
      searchUrl:
        'https://www.google.com/search?q=Pick+Me+Up+Infinite+Gacha+manhwa',
    },
    {
      id: 'villain-to-kill',
      title: 'Villain to Kill',
      coverImage: '/assets/manga/villain-to-kill.jpg',
      searchUrl: 'https://www.google.com/search?q=Villain+to+Kill+manhwa',
    },
    {
      id: 'star-embracing-swordmaster',
      title: 'Star-Embracing Swordmaster',
      coverImage: '/assets/manga/star-embracing-swordmaster.jpg',
      searchUrl:
        'https://www.google.com/search?q=Star-Embracing+Swordmaster+manhwa',
    },
    {
      id: 'nano-machine',
      title: 'Nano Machine',
      coverImage: '/assets/manga/nano-machine.jpg',
      searchUrl: 'https://www.google.com/search?q=Nano+Machine+manhwa',
    },
    {
      id: 'magic-emperor',
      title: 'Magic Emperor',
      coverImage: '/assets/manga/magic-emperor.jpg',
      searchUrl: 'https://www.google.com/search?q=Magic+Emperor+manhwa',
    },
    {
      id: 'the-fragrant-flower-blooms-with-dignity',
      title: 'The Fragrant Flower Blooms with Dignity',
      coverImage: '/assets/manga/the-fragrant-flower-blooms-with-dignity.jpg',
      searchUrl:
        'https://www.google.com/search?q=The+Fragrant+Flower+Blooms+with+Dignity+manga',
    },
    {
      id: 'eternally-regressing-knight',
      title: 'Eternally Regressing Knight',
      coverImage: '/assets/manga/eternally-regressing-knight.jpg',
      searchUrl:
        'https://www.google.com/search?q=Eternally+Regressing+Knight+manhwa',
    },
    {
      id: 'the-boxer',
      title: 'The Boxer',
      coverImage: '/assets/manga/the-boxer.jpg',
      searchUrl: 'https://www.google.com/search?q=The+Boxer+manhwa',
    },
    {
      id: 'i-became-the-tyrant-of-a-defense-game',
      title: 'I Became the Tyrant of a Defense Game',
      coverImage: '/assets/manga/i-became-the-tyrant-of-a-defense-game.jpg',
      searchUrl:
        'https://www.google.com/search?q=I+Became+the+Tyrant+of+a+Defense+Game+manhwa',
    },
    {
      id: 'return-of-the-8th-class-magician',
      title: 'Return of the 8th Class Magician',
      coverImage: '/assets/manga/return-of-the-8th-class-magician.jpg',
      searchUrl:
        'https://www.google.com/search?q=Return+of+the+8th+Class+Magician+manhwa',
    },
    {
      id: 'the-greatest-estate-developer',
      title: 'The Greatest Estate Developer',
      coverImage: '/assets/manga/the-greatest-estate-developer.jpg',
      searchUrl:
        'https://www.google.com/search?q=The+Greatest+Estate+Developer+manhwa',
    },
    {
      id: 'the-legend-of-the-northern-blade',
      title: 'The Legend of the Northern Blade',
      coverImage: '/assets/manga/the-legend-of-the-northern-blade.jpg',
      searchUrl:
        'https://www.google.com/search?q=The+Legend+of+the+Northern+Blade+manhwa',
    },
    {
      id: 'webtoon-character-na-kang-lim',
      title: 'Webtoon Character Na Kang Lim',
      coverImage: '/assets/manga/webtoon-character-na-kang-lim.jpg',
      searchUrl:
        'https://www.google.com/search?q=Webtoon+Character+Na+Kang+Lim+manhwa',
    },
    {
      id: 'a-returners-magic-should-be-special',
      title: "A Returner's Magic Should Be Special",
      coverImage: '/assets/manga/a-returners-magic-should-be-special.jpg',
      searchUrl:
        "https://www.google.com/search?q=A+Returner's+Magic+Should+Be+Special+manhwa",
    },
    {
      id: 'teenage-mercenary',
      title: 'Teenage Mercenary',
      coverImage: '/assets/manga/teenage-mercenary.jpg',
      searchUrl: 'https://www.google.com/search?q=Teenage+Mercenary+manhwa',
    },
    {
      id: 'my-husband-who-hates-me-has-lost-his-memories',
      title: 'My Husband Who Hates Me Has lost his memories',
      coverImage:
        '/assets/manga/my-husband-who-hates-me-has-lost-his-memories.jpg',
      searchUrl:
        'https://www.google.com/search?q=My+Husband+Who+Hates+Me+Has+lost+his+memories+manhwa',
    },
  ] as MangaItem[],

  cinema: [
    {
      id: 'the-8-shows',
      title: 'The 8 Shows',
      coverImage: '/assets/cinema/the-8-shows.jpg',
      searchUrl: 'https://www.google.com/search?q=The+8+Show+series',
    },
    {
      id: 'breaking-bad',
      title: 'Breaking Bad',
      coverImage: '/assets/cinema/breaking-bad.jpg',
      searchUrl: 'https://www.google.com/search?q=Breaking+Bad+series',
    },
    {
      id: 'interstellar',
      title: 'Interstellar',
      coverImage: '/assets/cinema/interstellar.jpg',
      searchUrl: 'https://www.google.com/search?q=Interstellar+movie',
    },
    {
      id: 'alice-in-the-borderland',
      title: 'Alice In the Borderland',
      coverImage: '/assets/cinema/alice-in-the-borderland.jpg',
      searchUrl: 'https://www.google.com/search?q=Alice+In+the+Borderland+series',
    },
    {
      id: 'game-of-thrones',
      title: 'Game Of Thrones',
      coverImage: '/assets/cinema/game-of-thrones.jpg',
      searchUrl: 'https://www.google.com/search?q=Game+Of+Thrones+series',
    },
    {
      id: 'aot',
      title: 'AOT',
      coverImage: '/assets/cinema/aot.jpg',
      searchUrl: 'https://www.google.com/search?q=Attack+on+Titan+AOT+anime',
    },
    {
      id: 'harry-potter',
      title: 'Harry Potter',
      coverImage: '/assets/cinema/harry-potter.jpg',
      searchUrl: 'https://www.google.com/search?q=Harry+Potter+movies',
    },
    {
      id: 'your-name',
      title: 'Your Name',
      coverImage: '/assets/cinema/your-name.jpg',
      searchUrl: 'https://www.google.com/search?q=Your+Name+Kimi+no+Na+wa+movie',
    },
  ] as CinemaItem[],
};
