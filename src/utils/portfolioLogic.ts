import {
  PORTFOLIO_CONTENT,
  ProjectCategory,
  ProjectFolder,
  ProjectItem,
} from '../data/content';

/**
 * Checks whether a project link or config value is a placeholder (e.g. "[ADD]", "[ADD LINK]").
 */
export function isPlaceholderLink(url?: string): boolean {
  if (!url || !url.trim()) return true;
  return url.trim().startsWith('[ADD');
}

/**
 * Generates 2-letter uppercase initials for a project title when rendering image fallback tiles.
 */
export function getProjectInitials(title: string): string {
  const words = title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'PC';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Filters and sorts projects based on active category, active folderId, and search query.
 * - When folderId is set, returns only projects inside that folder matching searchQuery.
 * - When category === 'Featured', returns projects with featuredOrder sorted ascending (1..5),
 *   plus any search filter applied.
 * - Otherwise filters by primary or secondary category + search query.
 */
export function filterProjects(
  projects: ProjectItem[],
  options: {
    category: ProjectCategory;
    folderId?: string | null;
    searchQuery?: string;
    folders?: ProjectFolder[];
  }
): ProjectItem[] {
  const {
    category,
    folderId = null,
    searchQuery = '',
    folders = PORTFOLIO_CONTENT.folders,
  } = options;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchesSearch = (project: ProjectItem): boolean => {
    if (!normalizedQuery) return true;
    const inTitle = project.title.toLowerCase().includes(normalizedQuery);
    const inDesc = project.description.toLowerCase().includes(normalizedQuery);
    const inCategory = project.category.toLowerCase().includes(normalizedQuery);
    const inTags = project.tags.some((t) =>
      t.toLowerCase().includes(normalizedQuery)
    );
    return inTitle || inDesc || inCategory || inTags;
  };

  if (folderId) {
    const folder = folders.find((f) => f.id === folderId);
    if (!folder) return [];
    const byId = new Map(projects.map((p) => [p.id, p]));
    return folder.projectIds
      .map((id) => byId.get(id))
      .filter((p): p is ProjectItem => Boolean(p) && matchesSearch(p!));
  }

  if (category === 'Folders') {
    // When viewing the Folders tab at root without a search query, projects grid can show folder items if searched
    if (!normalizedQuery) return [];
    return projects.filter(matchesSearch);
  }

  if (category === 'Featured') {
    return projects
      .filter((p) => typeof p.featuredOrder === 'number' && matchesSearch(p))
      .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999));
  }

  return projects.filter((p) => {
    const inPrimary = p.category === category;
    const inSecondary = p.secondaryCategories?.includes(category) ?? false;
    return (inPrimary || inSecondary) && matchesSearch(p);
  });
}

/**
 * Clamps a window's (x, y) coordinates so the title bar is never lost off-screen.
 */
export function clampWindowPosition(
  x: number,
  y: number,
  viewportWidth: number,
  viewportHeight: number,
  windowWidth = 760
): { x: number; y: number } {
  const minY = 32; // Below 32px top menu bar
  const maxY = Math.max(minY, viewportHeight - 100); // Keep title bar above dock
  const minX = Math.min(0, -(windowWidth - 160));
  const maxX = Math.max(0, viewportWidth - 160);

  return {
    x: Math.min(maxX, Math.max(minX, Math.round(x))),
    y: Math.min(maxY, Math.max(minY, Math.round(y))),
  };
}

/**
 * Formats a Date into macOS menu bar style, e.g. "Mon, 9 Nov 6:15 AM"
 */
export function formatMacMenuBarDate(date: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const dayName = days[date.getDay()];
  const dayNum = date.getDate();
  const monthName = months[date.getMonth()];
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${dayName}, ${dayNum} ${monthName} ${hours}:${minutes} ${ampm}`;
}

export interface SpotlightResultItem {
  id: string;
  title: string;
  subtitle: string;
  group: 'Applications' | 'Files & Projects' | 'Skills & Tools';
  keywords: string[];
  actionType: 'window' | 'project' | 'folder' | 'external';
  windowId?:
    | 'about'
    | 'projects'
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
  projectId?: string;
  folderId?: 'dashboard-folder' | 'eda-folder';
  iconVariant?:
    | 'notes-resume'
    | 'appstore-about'
    | 'clapper-movies'
    | 'apple-music'
    | 'manga-orv'
    | 'mac-certifications'
    | 'folder-resources'
    | 'ai-agent'
    | 'finder-app'
    | 'photos-app'
    | 'video-app'
    | 'mail-app'
    | 'skills-app';
  imageUrl?: string;
}

const SPOTLIGHT_APP_ITEMS: SpotlightResultItem[] = [
  {
    id: 'app-ai-agent',
    title: 'Arther',
    subtitle: 'Application — Ask AI anything about Pranam Chand',
    group: 'Applications',
    keywords: ['arther', 'ai', 'agent', 'rag', 'chat', 'ask', 'assistant'],
    actionType: 'window',
    windowId: 'ai-agent',
    iconVariant: 'ai-agent',
  },
  {
    id: 'app-about',
    title: 'About Me',
    subtitle: 'Application — Bio, Education & Overview',
    group: 'Applications',
    keywords: ['about', 'bio', 'pranam', 'education', 'ravenshaw', 'profile'],
    actionType: 'window',
    windowId: 'about',
    iconVariant: 'appstore-about',
  },
  {
    id: 'app-projects',
    title: 'Projects (Finder)',
    subtitle: 'Application — Data Analysis, ML, NLP & Dashboards',
    group: 'Applications',
    keywords: ['projects', 'finder', 'portfolio', 'work', 'case studies'],
    actionType: 'window',
    windowId: 'projects',
    iconVariant: 'finder-app',
  },
  {
    id: 'app-resume',
    title: 'Resume — Pranam_Chand_Resume.pdf',
    subtitle: 'PDF Document — Preview & Download',
    group: 'Applications',
    keywords: ['resume', 'cv', 'pdf', 'download', 'experience'],
    actionType: 'window',
    windowId: 'resume',
    iconVariant: 'notes-resume',
  },
  {
    id: 'app-skills',
    title: 'Skills & Tools',
    subtitle: 'System Settings — Python, SQL, Power BI, ML & Tools',
    group: 'Applications',
    keywords: ['skills', 'tools', 'tech stack', 'languages', 'settings'],
    actionType: 'window',
    windowId: 'skills',
    iconVariant: 'skills-app',
  },
  {
    id: 'app-certifications',
    title: 'Certifications',
    subtitle: 'Application — Credentials & Certificate PDFs',
    group: 'Applications',
    keywords: ['certifications', 'certificates', 'credentials', 'ibm', 'badges'],
    actionType: 'window',
    windowId: 'certifications',
    iconVariant: 'mac-certifications',
  },
  {
    id: 'app-contact',
    title: 'Mail — Contact Pranam',
    subtitle: 'Application — Send Message via EmailJS',
    group: 'Applications',
    keywords: ['mail', 'contact', 'email', 'message', 'hire', 'internship'],
    actionType: 'window',
    windowId: 'contact',
    iconVariant: 'mail-app',
  },
  {
    id: 'app-gallery',
    title: 'Photos',
    subtitle: 'Application — Photography & Gallery',
    group: 'Applications',
    keywords: ['photos', 'gallery', 'pictures', 'images'],
    actionType: 'window',
    windowId: 'gallery',
    iconVariant: 'photos-app',
  },
  {
    id: 'app-reel',
    title: 'Video',
    subtitle: 'Application — Video Clips & Demos',
    group: 'Applications',
    keywords: ['video', 'reel', 'player', 'clips'],
    actionType: 'window',
    windowId: 'reel',
    iconVariant: 'video-app',
  },
  {
    id: 'app-movies',
    title: 'Cinema',
    subtitle: 'Application — My Top Picks',
    group: 'Applications',
    keywords: ['cinema', 'movies', 'films', 'series', 'shows', 'watchlist', 'top picks'],
    actionType: 'window',
    windowId: 'movies',
    iconVariant: 'clapper-movies',
  },
  {
    id: 'app-music',
    title: 'Music',
    subtitle: 'Application — Playlists & Tracks',
    group: 'Applications',
    keywords: ['music', 'songs', 'audio', 'apple music'],
    actionType: 'window',
    windowId: 'music',
    iconVariant: 'apple-music',
  },
  {
    id: 'app-manga',
    title: 'Manwha & Manga',
    subtitle: 'Application — My Top Picks',
    group: 'Applications',
    keywords: ['manwha', 'manhwa', 'manga', 'omniscient reader', 'reading', 'top picks'],
    actionType: 'window',
    windowId: 'manga',
    iconVariant: 'manga-orv',
  },
];

/**
 * Searches across macOS Applications, Files/Projects/Folders, and Skills/Tools.
 */
export function searchSpotlight(query: string): SpotlightResultItem[] {
  const q = query.trim().toLowerCase();

  const folderItems: SpotlightResultItem[] = PORTFOLIO_CONTENT.folders.map(
    (folder) => ({
      id: `folder-${folder.id}`,
      title: folder.title,
      subtitle: `Folder · ${folder.projectIds.length} items · ${folder.tags.join(', ')}`,
      group: 'Files & Projects',
      keywords: [folder.title, folder.description, ...folder.tags],
      actionType: 'folder',
      folderId: folder.id,
      iconVariant: 'folder-resources',
    })
  );

  const projectItems: SpotlightResultItem[] = PORTFOLIO_CONTENT.projects.map(
    (project) => ({
      id: `project-${project.id}`,
      title: project.title,
      subtitle: `${project.category} · ${project.tags.join(' · ')}`,
      group: 'Files & Projects',
      keywords: [
        project.title,
        project.shortTitle || '',
        project.description,
        project.category,
        ...project.tags,
      ],
      actionType: 'project',
      projectId: project.id,
      imageUrl: project.image,
    })
  );

  const certificationItems: SpotlightResultItem[] =
    PORTFOLIO_CONTENT.certifications.map((cert) => ({
      id: `cert-${cert.id}`,
      title: cert.title,
      subtitle: `${cert.issuer} · ${cert.format}`,
      group: 'Files & Projects',
      keywords: [cert.title, cert.issuer, cert.category, cert.format],
      actionType: 'window',
      windowId: 'certifications',
      imageUrl: cert.imageUrl,
    }));

  const skillItems: SpotlightResultItem[] = PORTFOLIO_CONTENT.skills.map(
    (skill) => ({
      id: `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      title: skill.name,
      subtitle: `${skill.category}${skill.note ? ` — ${skill.note}` : ''}`,
      group: 'Skills & Tools',
      keywords: [skill.name, skill.category, skill.note || ''],
      actionType: 'window',
      windowId: 'skills',
      imageUrl: skill.iconUrl,
    })
  );

  if (!q) {
    // Default suggestions when Spotlight opens with empty query
    return [
      ...SPOTLIGHT_APP_ITEMS.slice(0, 7),
      ...folderItems,
      ...projectItems.slice(0, 5),
    ];
  }

  const allItems = [
    ...SPOTLIGHT_APP_ITEMS,
    ...folderItems,
    ...projectItems,
    ...certificationItems,
    ...skillItems,
  ];

  return allItems.filter((item) => {
    if (item.title.toLowerCase().includes(q)) return true;
    if (item.subtitle.toLowerCase().includes(q)) return true;
    return item.keywords.some((kw) => kw.toLowerCase().includes(q));
  });
}

