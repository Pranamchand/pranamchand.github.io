import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  X,
} from 'lucide-react';
import {
  PORTFOLIO_CONTENT,
  ProjectCategory,
  ProjectItem,
} from '../data/content';
import { useWindowManager } from '../hooks/useWindowManager';
import { filterProjects, isPlaceholderLink } from '../utils/portfolioLogic';
import { ResilientImage } from '../components/ResilientImage';
import { Window } from '../components/Window';

const SIDEBAR_CATEGORIES: {
  id: ProjectCategory;
  label: string;
}[] = [
  {
    id: 'Featured',
    label: 'Featured',
  },
  {
    id: 'Data Analysis',
    label: 'Data Analysis',
  },
  {
    id: 'Machine Learning',
    label: 'Machine Learning',
  },
  {
    id: 'NLP',
    label: 'NLP',
  },
  {
    id: 'Deep Learning',
    label: 'Deep Learning',
  },
  {
    id: 'Folders',
    label: 'Folders',
  },
];

export const ProjectsWindow: React.FC = () => {
  const {
    openProjectDetail,
    projectsInitialCategory,
    projectsInitialFolderId,
  } = useWindowManager();

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(
    projectsInitialCategory
  );
  const [activeFolderId, setActiveFolderId] = useState<
    'dashboard-folder' | 'eda-folder' | null
  >(projectsInitialFolderId);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setSelectedCategory(projectsInitialCategory);
    setActiveFolderId(projectsInitialFolderId);
  }, [projectsInitialCategory, projectsInitialFolderId]);

  const activeFolder = useMemo(
    () =>
      PORTFOLIO_CONTENT.folders.find((f) => f.id === activeFolderId) || null,
    [activeFolderId]
  );

  const visibleProjects = useMemo(
    () =>
      filterProjects(PORTFOLIO_CONTENT.projects, {
        category: selectedCategory,
        folderId: activeFolderId,
        searchQuery,
      }),
    [selectedCategory, activeFolderId, searchQuery]
  );

  const visibleFolders = useMemo(() => {
    if (activeFolderId) return [];
    const q = searchQuery.trim().toLowerCase();
    return PORTFOLIO_CONTENT.folders.filter((folder) => {
      if (
        q &&
        !folder.title.toLowerCase().includes(q) &&
        !folder.description.toLowerCase().includes(q)
      ) {
        return false;
      }
      if (selectedCategory === 'Folders' || selectedCategory === 'Featured') {
        return true;
      }
      if (selectedCategory === 'Data Analysis') {
        return true;
      }
      return false;
    });
  }, [activeFolderId, selectedCategory, searchQuery]);

  const openExternalUrl = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleProjectClick = (project: ProjectItem) => {
    if (project.caseStudy) {
      openProjectDetail(project.id);
      return;
    }
    const primaryUrl = project.links.live || project.links.github;
    if (primaryUrl && !isPlaceholderLink(primaryUrl)) {
      openExternalUrl(primaryUrl);
      return;
    }
    openProjectDetail(project.id);
  };

  return (
    <Window id="projects">
      <div className="flex flex-col h-full bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7]">
        {/* Minimalist Apple Finder Toolbar */}
        <div className="px-4 py-2 border-b border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#1c1c1e] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              disabled={!activeFolderId}
              onClick={() => setActiveFolderId(null)}
              aria-label="Back to all projects"
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                activeFolderId
                  ? 'bg-black/[0.05] dark:bg-white/10 text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.09] dark:hover:bg-white/15 cursor-pointer'
                  : 'opacity-30 cursor-not-allowed text-[#86868b] dark:text-[#98989d]'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <nav
              aria-label="Finder path"
              className="flex items-center gap-1 text-[12.5px] text-[#86868b] dark:text-[#98989d] truncate"
            >
              <button
                type="button"
                onClick={() => setActiveFolderId(null)}
                className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors"
              >
                Projects
              </button>
              <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
              <button
                type="button"
                onClick={() => setActiveFolderId(null)}
                className={`transition-colors ${
                  activeFolder
                    ? 'hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]'
                    : 'font-medium text-[#1d1d1f] dark:text-[#f5f5f7]'
                }`}
              >
                {selectedCategory}
              </button>
              {activeFolder && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                  <span className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
                    {activeFolder.title}
                  </span>
                </>
              )}
            </nav>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-[#86868b] dark:text-[#98989d] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search projects"
              className="w-full pl-7 pr-6 py-1 rounded-lg text-[12.5px] bg-white dark:bg-[#2c2c2e] border border-black/[0.08] dark:border-white/12 text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] dark:placeholder:text-[#98989d] focus:ring-2 focus:ring-[#0a84ff]/30 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Main Finder Body: Sidebar + Content Grid */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-white dark:bg-[#1c1c1e]">
          {/* Apple Finder Sidebar */}
          <aside
            aria-label="Project categories"
            className="w-full md:w-48 shrink-0 border-b md:border-b-0 md:border-r border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-2.5 flex md:flex-col gap-0.5 overflow-x-auto md:overflow-y-auto"
          >
            <div className="hidden md:block px-2.5 py-1 text-[11px] font-semibold text-[#86868b] dark:text-[#98989d]">
              Favourites
            </div>
            {SIDEBAR_CATEGORIES.map((item) => {
              const isActive =
                selectedCategory === item.id && activeFolderId === null;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(item.id);
                    setActiveFolderId(null);
                  }}
                  className={`flex items-center px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#0a84ff]/12 text-[#0a84ff]'
                      : 'text-[#3a3a3c] dark:text-[#d1d1d6] hover:bg-black/[0.04] dark:hover:bg-white/6'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="hidden md:block mt-4 px-2.5 py-1 text-[11px] font-semibold text-[#86868b] dark:text-[#98989d]">
              Collections
            </div>
            {PORTFOLIO_CONTENT.folders.map((folder) => {
              const isFolderActive = activeFolderId === folder.id;
              return (
                <button
                  key={folder.id}
                  type="button"
                  onClick={() => setActiveFolderId(folder.id)}
                  className={`hidden md:flex items-center px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors text-left cursor-pointer ${
                    isFolderActive
                      ? 'bg-[#0a84ff]/12 text-[#0a84ff]'
                      : 'text-[#3a3a3c] dark:text-[#d1d1d6] hover:bg-black/[0.04] dark:hover:bg-white/6'
                  }`}
                >
                  <span className="truncate">
                    {folder.title.replace('Featured ', '')}
                  </span>
                </button>
              );
            })}
          </aside>

          {/* Main Project & Folder Grid */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto mac-scroll space-y-6 bg-white dark:bg-[#1c1c1e]">
            {/* Folder Cards Section */}
            {visibleFolders.length > 0 && (
              <div>
                <h3 className="text-[12px] font-semibold text-[#86868b] dark:text-[#98989d] mb-3">
                  Folders
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {visibleFolders.map((folder) => (
                    <div
                      key={folder.id}
                      onClick={() => setActiveFolderId(folder.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveFolderId(folder.id);
                        }
                      }}
                      className="group rounded-2xl overflow-hidden border border-black/[0.07] dark:border-white/10 bg-white dark:bg-[#2c2c2e] hover:border-black/15 dark:hover:border-white/20 transition-all duration-150 cursor-pointer flex flex-col"
                    >
                      <div className="h-36 w-full relative overflow-hidden bg-white dark:bg-[#2c2c2e] border-b border-black/[0.05] dark:border-white/8">
                        <ResilientImage
                          src={folder.coverImage}
                          fallbackSrc={folder.remoteCoverImage}
                          alt={folder.title}
                          titleForInitials={folder.title}
                          className="w-full h-full"
                          imgClassName="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex items-center justify-between gap-3 bg-white dark:bg-[#2c2c2e]">
                        <div className="min-w-0">
                          <h4 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
                            {folder.title}
                          </h4>
                          <p className="text-[12px] text-[#86868b] dark:text-[#98989d] truncate mt-0.5">
                            {folder.projectIds.length} items · {folder.tags.join(' · ')}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#86868b] dark:text-[#98989d] shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Cards Grid */}
            {visibleProjects.length > 0 ? (
              <div>
                {!activeFolder && visibleFolders.length > 0 && (
                  <h3 className="text-[12px] font-semibold text-[#86868b] dark:text-[#98989d] mb-3">
                    {selectedCategory === 'Featured'
                      ? 'Featured Projects'
                      : `${selectedCategory} Projects`}
                  </h3>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleProjects.map((project) => (
                    <article
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className="group rounded-2xl overflow-hidden border border-black/[0.07] dark:border-white/10 bg-white dark:bg-[#2c2c2e] hover:border-black/15 dark:hover:border-white/20 transition-all duration-150 flex flex-col cursor-pointer"
                    >
                      {/* Thumbnail */}
                      <div className="h-38 w-full relative overflow-hidden bg-white dark:bg-[#2c2c2e] border-b border-black/[0.05] dark:border-white/8">
                        <ResilientImage
                          src={project.image}
                          fallbackSrc={project.remoteImage}
                          alt={project.title}
                          titleForInitials={project.title}
                          className="w-full h-full"
                          imgClassName="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>

                      {/* Card Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                        <div>
                          <div className="text-[11px] font-medium text-[#86868b] dark:text-[#98989d] mb-0.5">
                            {project.category}
                          </div>
                          <h4 className="text-[14px] font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] group-hover:text-[#0a84ff] transition-colors">
                            {project.title}
                          </h4>
                          <p className="text-[12.5px] text-[#6e6e73] dark:text-[#a1a1a6] mt-1 line-clamp-2 leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <div className="pt-2.5 border-t border-black/[0.05] dark:border-white/8 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-[#86868b] dark:text-[#98989d] truncate">
                            {project.tags.join(' · ')}
                          </span>

                          <div
                            className="flex items-center gap-2 shrink-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.caseStudy && (
                              <button
                                type="button"
                                onClick={() => openProjectDetail(project.id)}
                                className="text-[12px] font-medium text-[#0a84ff] hover:underline cursor-pointer"
                              >
                                Details
                              </button>
                            )}
                            {project.links.live &&
                              !isPlaceholderLink(project.links.live) && (
                                <a
                                  href={project.links.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-0.5 text-[12px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:text-[#0a84ff] transition-colors"
                                >
                                  <span>Live App</span>
                                  <ArrowUpRight className="w-3 h-3" />
                                </a>
                              )}
                            {project.links.github &&
                              !isPlaceholderLink(project.links.github) && (
                                <a
                                  href={project.links.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-0.5 text-[12px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:text-[#0a84ff] transition-colors"
                                >
                                  <span>GitHub</span>
                                  <ArrowUpRight className="w-3 h-3" />
                                </a>
                              )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              visibleFolders.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-[14px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
                    No projects found
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Featured');
                      setActiveFolderId(null);
                    }}
                    className="mt-2 text-[12.5px] font-medium text-[#0a84ff] hover:underline cursor-pointer"
                  >
                    Reset filter
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Window>
  );
};
