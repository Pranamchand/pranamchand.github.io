import test from 'node:test';
import assert from 'node:assert/strict';
import { PORTFOLIO_CONTENT } from '../data/content';
import {
  clampWindowPosition,
  filterProjects,
  formatMacMenuBarDate,
  getProjectInitials,
  isPlaceholderLink,
  searchSpotlight,
} from './portfolioLogic';
import {
  retrieveKnowledgeChunks,
  synthesizeLocalRagResponse,
} from './ragEngine';

test('Featured filter returns exact 5 real projects with banners in specified order', () => {
  const featured = filterProjects(PORTFOLIO_CONTENT.projects, {
    category: 'Featured',
  });
  assert.equal(featured.length, 5);
  assert.deepEqual(
    featured.map((p) => p.title),
    [
      'Apple Global Retail Analytics',
      'Heart Disease Risk Assessment',
      'Book Recommendation System',
      'Basic Sentiment Analysis',
      'Movie Recommendation System',
    ]
  );
});

test('Folder navigation returns exact projects inside Featured Dashboard Projects and Featured EDA Projects', () => {
  const dashboardProjects = filterProjects(PORTFOLIO_CONTENT.projects, {
    category: 'Data Analysis',
    folderId: 'dashboard-folder',
  });
  assert.equal(dashboardProjects.length, 4);
  assert.equal(dashboardProjects[0].id, 'apple-global-retail-analytics');

  const edaProjects = filterProjects(PORTFOLIO_CONTENT.projects, {
    category: 'Data Analysis',
    folderId: 'eda-folder',
  });
  assert.equal(edaProjects.length, 4);
  assert.equal(edaProjects[0].id, 'customer-churn-eda');
});

test('Search query filters by project name or tech stack tag', () => {
  const sentiment = filterProjects(PORTFOLIO_CONTENT.projects, {
    category: 'NLP',
    searchQuery: 'Sentiment',
  });
  assert.equal(sentiment.length, 1);
  assert.equal(sentiment[0].id, 'basic-sentiment-analysis');

  const lstm = filterProjects(PORTFOLIO_CONTENT.projects, {
    category: 'Deep Learning',
    searchQuery: 'lstm',
  });
  assert.equal(lstm.length, 1);
  assert.equal(lstm[0].id, 'next-text-prediction-model');
});

test('clampWindowPosition prevents title bar from going above menu bar or off-screen', () => {
  const clampedTop = clampWindowPosition(-900, -50, 1440, 900, 800);
  assert.equal(clampedTop.y, 32);
  assert.ok(clampedTop.x >= -640);

  const clampedBottom = clampWindowPosition(2000, 1500, 1440, 900, 800);
  assert.equal(clampedBottom.y, 800);
  assert.equal(clampedBottom.x, 1280);
});

test('isPlaceholderLink detects [ADD] markers accurately', () => {
  assert.equal(isPlaceholderLink('[ADD]'), true);
  assert.equal(isPlaceholderLink('[ADD LINK]'), true);
  assert.equal(isPlaceholderLink(''), true);
  assert.equal(isPlaceholderLink('https://github.com/Pranamchand'), false);
});

test('getProjectInitials and formatMacMenuBarDate format strings properly', () => {
  assert.equal(getProjectInitials('Apple Global Retail Analytics'), 'AG');
  assert.equal(getProjectInitials('Starbucks'), 'ST');
  const d = new Date(2026, 10, 8, 20, 39);
  assert.equal(formatMacMenuBarDate(d), 'Sun, 8 Nov 8:39 PM');
});

test('searchSpotlight searches across Applications, Files & Projects, and Skills & Tools', () => {
  const defaultResults = searchSpotlight('');
  assert.ok(defaultResults.length >= 10);

  const certResults = searchSpotlight('Certifications');
  assert.ok(certResults.some((r) => r.id === 'app-certifications'));

  const powerBiResults = searchSpotlight('Power BI');
  assert.ok(
    powerBiResults.some(
      (r) =>
        r.group === 'Files & Projects' &&
        r.title === 'Apple Global Retail Analytics'
    )
  );
  assert.ok(
    powerBiResults.some(
      (r) => r.group === 'Skills & Tools' && r.title === 'Power BI'
    )
  );
});

test('all 16 projects and social links map to exact URLs from user specification', () => {
  const expectedProjectLinks: Record<string, string | null> = {
    'Heart Disease Risk Assessment':
      'https://pranamchand-heart-disease-risk-assessment.streamlit.app/',
    'Movie Recommendation System':
      'https://github.com/Pranamchand/Movie-Recommendation-System-using-NLP-TF-IDF',
    'Book Recommendation System':
      'https://books-recommendation-pranamchand.streamlit.app/',
    'Basic Sentiment Analysis':
      'https://sentiment-analysis-pranamchand.streamlit.app/',
    'Weather Temperature Prediction Model':
      'https://github.com/Pranamchand/Weather-Temperature-Prediction-Model',
    'Disaster Tweets Prediction Model':
      'https://disaster-tweets-pranamchand.streamlit.app/',
    'Gender Classification Model':
      'https://pranamchand-gender-classification-model.streamlit.app/',
    'Next-Text Prediction Model':
      'https://pranamchand-next-text-prediction-model.streamlit.app/',
    'Apple Global Retail Analytics':
      'https://github.com/Pranamchand/APPLE-GLOBAL-RETAIL-ANALYTICS',
    'UK Baby Names Analysis Report':
      'https://github.com/Pranamchand/UK-Babies-Name-Annalysis-Report',
    'Customer Churn EDA': 'https://github.com/Pranamchand/Costomer-churn-EDA',
    'Anime Data Analysis': 'https://github.com/Pranamchand/Anime-Data-Analysis',
    'US Accidents EDA': 'https://github.com/Pranamchand/US-Accident-EDA',
    'Spotify User Behavior Dashboard':
      'https://github.com/Pranamchand/Spotify-User-Behavior-EDA-and-DASHBOARD',
    'Starbucks Dashboard': 'https://github.com/Pranamchand/Starbucks-Dashboard',
    'Monday Coffee Market Analysis':
      'https://github.com/Pranamchand/Monday-Coffee-Market-Analysis',
  };

  for (const [title, expectedUrl] of Object.entries(expectedProjectLinks)) {
    const project = PORTFOLIO_CONTENT.projects.find((p) => p.title === title);
    assert.ok(project, `Project "${title}" must exist`);
    const actualUrl = project.links.live || project.links.github || null;
    assert.equal(
      actualUrl,
      expectedUrl,
      `Project "${title}" URL mismatch`
    );
  }
  assert.equal(
    PORTFOLIO_CONTENT.projects.some(
      (p) => p.id === 'personal-expense-dashboard'
    ),
    false
  );

  assert.equal(
    PORTFOLIO_CONTENT.identity.github,
    'https://github.com/Pranamchand'
  );
  assert.equal(
    PORTFOLIO_CONTENT.identity.linkedin,
    'https://www.linkedin.com/in/pranamchand'
  );
  assert.equal(
    PORTFOLIO_CONTENT.identity.kaggle,
    'https://www.kaggle.com/pranamkumarchand'
  );
});

test('certifications collection includes all 18 uploaded PDFs and badges across 3 categories', () => {
  assert.equal(PORTFOLIO_CONTENT.certifications.length, 18);
  const categories = new Set(
    PORTFOLIO_CONTENT.certifications.map((c) => c.category)
  );
  assert.deepEqual(
    Array.from(categories).sort(),
    [
      'IBM SkillsBuild',
      'Internships & Recognition',
      'Microsoft & Google',
    ].sort()
  );

  const fabricSearch = searchSpotlight('Microsoft Fabric');
  assert.ok(
    fabricSearch.some((item) =>
      item.title.includes('Microsoft Fabric')
    )
  );
});

test('skills collection includes OpenCode, Codex, Zapier, YouTube Automation, Generative AI, FastAPI, RAG, LangChain, Oracle, Hugging Face and moves ML/DL out of Learning', () => {
  const skillNames = PORTFOLIO_CONTENT.skills.map((s) => s.name);
  const requiredSkills = [
    'OpenCode',
    'Codex',
    'Zapier',
    'YouTube Automation',
    'Generative AI',
    'FastAPI',
    'RAG',
    'LangChain',
    'Oracle',
    'Hugging Face',
    'Machine Learning',
    'Deep Learning',
  ];

  for (const name of requiredSkills) {
    assert.ok(skillNames.includes(name), `Skill "${name}" must exist`);
  }

  const learningSkills = PORTFOLIO_CONTENT.skills.filter(
    (s) => s.category === 'Currently Learning'
  );
  assert.equal(learningSkills.length, 0);

  const mlSkill = PORTFOLIO_CONTENT.skills.find(
    (s) => s.name === 'Machine Learning'
  );
  const dlSkill = PORTFOLIO_CONTENT.skills.find(
    (s) => s.name === 'Deep Learning'
  );
  assert.equal(mlSkill?.category, 'Languages & Libraries');
  assert.equal(dlSkill?.category, 'Languages & Libraries');
});

test('Arther RAG engine retrieves relevant chunks and synthesizes distinct answers for diverse queries', () => {
  const eduChunks = retrieveKnowledgeChunks(
    'What is Pranam studying at Ravenshaw University and what is his SGPA?'
  );
  assert.ok(eduChunks.some((c) => c.id === 'education-academic'));
  const eduAnswer = synthesizeLocalRagResponse(
    'What is Pranam studying at Ravenshaw University and what is his SGPA?',
    eduChunks
  );
  assert.ok(eduAnswer.includes('7.76 SGPA'));

  const queries = [
    'Hello',
    'Who are you?',
    'Tell me about Apple Global Retail Analytics',
    'Where is Pranam from?',
    'What manhwa does he read?',
    'What are his favorite movies and shows?',
    'Does he know Python?',
    'What are his career goals?',
    'what is he currently doing',
    'ok what is 2+2',
  ];

  const answers = queries.map((q) =>
    synthesizeLocalRagResponse(q, retrieveKnowledgeChunks(q, 3))
  );
  const uniqueAnswers = new Set(answers);
  assert.equal(
    uniqueAnswers.size,
    queries.length,
    'Every distinct query category must produce a unique answer on static GitHub Pages'
  );
  assert.ok(answers[2].includes('Apple Global Retail Analytics'));
  assert.ok(answers[3].includes('Cuttack, Odisha'));
  assert.ok(answers[4].includes("Omniscient Reader's Viewpoint"));
  assert.ok(answers[8].includes('Ravenshaw University'));
  assert.ok(!answers[8].includes('Important Skill Accuracy Note'));
  assert.ok(answers[9].includes('2 + 2 = 4'));

  const artherSpotlight = searchSpotlight('Arther');
  assert.ok(artherSpotlight.some((r) => r.id === 'app-ai-agent' && r.title === 'Arther'));
});

test('Manga collection includes all 24 top picks with cover images and Google Search links', () => {
  assert.equal(PORTFOLIO_CONTENT.manga.length, 24);
  const boxer = PORTFOLIO_CONTENT.manga.find((m) => m.title === 'The Boxer');
  assert.ok(boxer);
  assert.equal(boxer.coverImage, '/assets/manga/the-boxer.jpg');
  assert.equal(
    boxer.searchUrl,
    'https://www.google.com/search?q=The+Boxer+manhwa'
  );
});

test('Cinema collection includes all 8 top picks with cover images and Google Search links', () => {
  assert.equal(PORTFOLIO_CONTENT.cinema.length, 8);
  const breakingBad = PORTFOLIO_CONTENT.cinema.find(
    (c) => c.title === 'Breaking Bad'
  );
  assert.ok(breakingBad);
  assert.equal(breakingBad.coverImage, '/assets/cinema/breaking-bad.jpg');
  assert.equal(
    breakingBad.searchUrl,
    'https://www.google.com/search?q=Breaking+Bad+series'
  );
});

test('Gallery collection is kept empty when no photos are added', () => {
  assert.equal(PORTFOLIO_CONTENT.gallery.length, 0);
});

test('SEO metadata, OpenGraph/Twitter cards, and Schema.org JSON-LD are valid and synced with metadata.json', async () => {
  const fs = await import('node:fs');
  const html = fs.readFileSync('index.html', 'utf8');
  const metadata = JSON.parse(fs.readFileSync('metadata.json', 'utf8'));

  // Title is 'Pranam chand'
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  assert.ok(titleMatch, 'index.html must contain a <title> tag');
  const pageTitle = titleMatch[1];
  assert.equal(pageTitle, 'Pranam chand');

  // Meta description length (120-160 chars) & sync with metadata.json
  const descMatch = html.match(
    /<meta\s+name="description"\s+content="([^"]+)"/
  );
  assert.ok(descMatch, 'index.html must contain a meta description');
  const metaDesc = descMatch[1];
  assert.equal(metaDesc, metadata.description);
  assert.ok(
    metaDesc.length >= 120 && metaDesc.length <= 160,
    `Description length (${metaDesc.length}) must be between 120 and 160 chars`
  );

  // OpenGraph & Twitter card sync
  assert.ok(html.includes('property="og:title" content="Pranam chand"'));
  assert.ok(
    html.includes(`property="og:description"\n      content="${metadata.description}"`)
  );
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
  assert.ok(html.includes('name="twitter:title" content="Pranam chand"'));

  // Valid JSON-LD structured data with WebApplication, Person, ProfilePage, ItemList
  const jsonLdMatch = html.match(
    /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/
  );
  assert.ok(jsonLdMatch, 'index.html must contain application/ld+json script');
  const parsedJsonLd = JSON.parse(jsonLdMatch[1]);
  assert.equal(parsedJsonLd['@context'], 'https://schema.org');
  assert.ok(Array.isArray(parsedJsonLd['@graph']));
  const graphTypes = parsedJsonLd['@graph'].map((item: { '@type': string }) => item['@type']);
  assert.ok(graphTypes.includes('WebSite'));
  assert.ok(graphTypes.includes('WebApplication'));
  assert.ok(graphTypes.includes('ProfilePage'));
  assert.ok(graphTypes.includes('Person'));
  assert.ok(graphTypes.includes('ItemList'));

  // Crawler files exist
  assert.ok(fs.existsSync('public/robots.txt'));
  assert.ok(fs.existsSync('public/sitemap.xml'));
  assert.ok(fs.existsSync('public/site.webmanifest'));
});

test('macOS sound effects descriptors and mute state toggle work deterministically', async () => {
  const {
    getMacSoundDescriptor,
    isMacSoundEnabled,
    setMacSoundEnabled,
    playMacSound,
  } = await import('./macSoundEffects');

  const clickDesc = getMacSoundDescriptor('click');
  assert.equal(clickDesc.type, 'click');
  assert.ok(clickDesc.frequencies.length === 2);
  assert.ok(clickDesc.maxGain > 0 && clickDesc.maxGain <= 0.1);

  const notifDesc = getMacSoundDescriptor('notification');
  assert.equal(notifDesc.type, 'notification');
  assert.equal(notifDesc.frequencies.length, 3);

  assert.equal(isMacSoundEnabled(), true);
  setMacSoundEnabled(false);
  assert.equal(isMacSoundEnabled(), false);
  playMacSound('click');
  setMacSoundEnabled(true);
  assert.equal(isMacSoundEnabled(), true);
});

test('GitHub Pages deployment bundle, workflow, and .nojekyll files are valid', async () => {
  const fs = await import('node:fs');
  assert.ok(fs.existsSync('.nojekyll'));
  assert.ok(fs.existsSync('public/.nojekyll'));
  assert.ok(fs.existsSync('.github/workflows/deploy.yml'));
  assert.ok(fs.existsSync('gh-pages-bundle/app.js'));
  assert.ok(fs.existsSync('gh-pages-bundle/app.css'));

  const bundleJs = fs.readFileSync('gh-pages-bundle/app.js', 'utf8');
  assert.ok(bundleJs.length > 100000);
  assert.ok(bundleJs.includes('./public/assets/aistudio/'));
  assert.ok(!bundleJs.includes('"/assets/aistudio/'));
});

