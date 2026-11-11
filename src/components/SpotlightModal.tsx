import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, CornerDownLeft, X, SlidersHorizontal } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { useWindowManager } from '../hooks/useWindowManager';
import {
  isPlaceholderLink,
  searchSpotlight,
  SpotlightResultItem,
} from '../utils/portfolioLogic';
import { MacAppIconGraphic } from './DesktopIcon';

function renderResultLeadingIcon(item: SpotlightResultItem) {
  if (
    item.iconVariant &&
    (item.iconVariant === 'notes-resume' ||
      item.iconVariant === 'appstore-about' ||
      item.iconVariant === 'clapper-movies' ||
      item.iconVariant === 'apple-music' ||
      item.iconVariant === 'manga-orv' ||
      item.iconVariant === 'mac-certifications' ||
      item.iconVariant === 'folder-resources' ||
      item.iconVariant === 'ai-agent')
  ) {
    return (
      <div className="w-8 h-8 shrink-0">
        <MacAppIconGraphic variant={item.iconVariant} label={item.title} />
      </div>
    );
  }

  if (item.iconVariant === 'finder-app') {
    return (
      <div className="w-8 h-8 rounded-[9px] overflow-hidden shadow-xs border border-black/10 relative flex shrink-0">
        <div className="w-1/2 h-full bg-gradient-to-b from-[#2ca8ff] to-[#006be6]" />
        <div className="w-1/2 h-full bg-gradient-to-b from-[#e9f4ff] to-[#bdd8f7]" />
      </div>
    );
  }

  if (item.iconVariant === 'photos-app') {
    return (
      <div className="w-8 h-8 rounded-[9px] bg-[#e5534b] shadow-xs border border-black/10 overflow-hidden shrink-0">
        <img
          src="/assets/aistudio/icon_photos_clean.png"
          alt={item.title}
          className="w-full h-full object-cover scale-[1.04]"
        />
      </div>
    );
  }

  if (item.iconVariant === 'video-app') {
    return (
      <div className="w-8 h-8 rounded-[9px] bg-[#252527] shadow-xs border border-black/10 overflow-hidden shrink-0">
        <img
          src="/assets/aistudio/icon_video_clean.png"
          alt={item.title}
          className="w-full h-full object-cover scale-[1.04]"
        />
      </div>
    );
  }

  if (item.iconVariant === 'mail-app') {
    return (
      <div className="w-8 h-8 rounded-[9px] bg-[#0b84ff] shadow-xs border border-black/10 overflow-hidden shrink-0">
        <img
          src="/assets/aistudio/icon_mail_clean.png"
          alt={item.title}
          className="w-full h-full object-cover scale-[1.04]"
        />
      </div>
    );
  }

  if (item.iconVariant === 'skills-app') {
    return (
      <div className="w-8 h-8 rounded-[9px] bg-gradient-to-b from-[#8e8e93] to-[#636366] shadow-xs flex items-center justify-center text-white shrink-0">
        <SlidersHorizontal className="w-4 h-4" />
      </div>
    );
  }

  if (item.imageUrl) {
    return (
      <div className="w-8 h-8 rounded-[8px] bg-[#f5f5f7] border border-black/[0.08] overflow-hidden flex items-center justify-center shrink-0 p-0.5">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-contain rounded-[6px]"
        />
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-[8px] bg-[#f5f5f7] border border-black/[0.08] flex items-center justify-center text-[#0a84ff] text-xs font-semibold shrink-0">
      {item.title.slice(0, 2).toUpperCase()}
    </div>
  );
}

export const SpotlightModal: React.FC = () => {
  const {
    isSpotlightOpen,
    setIsSpotlightOpen,
    openWindow,
    openProjectDetail,
    openProjectsFolder,
  } = useWindowManager();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const results = useMemo(() => searchSpotlight(query), [query]);

  // Reset and autofocus when opened
  useEffect(() => {
    if (isSpotlightOpen) {
      setQuery('');
      setSelectedIndex(0);
      const id = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 20);
      return () => window.clearTimeout(id);
    }
  }, [isSpotlightOpen]);

  // Keep selectedIndex in bounds when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: SpotlightResultItem) => {
    setIsSpotlightOpen(false);

    if (item.actionType === 'window' && item.windowId) {
      openWindow(item.windowId);
      return;
    }

    if (item.actionType === 'folder' && item.folderId) {
      openProjectsFolder(item.folderId, 'Featured');
      return;
    }

    if (item.actionType === 'project' && item.projectId) {
      const proj = PORTFOLIO_CONTENT.projects.find(
        (p) => p.id === item.projectId
      );
      if (proj?.caseStudy) {
        openProjectDetail(proj.id);
      } else {
        const primaryUrl = proj?.links.live || proj?.links.github;
        if (primaryUrl && !isPlaceholderLink(primaryUrl)) {
          const a = document.createElement('a');
          a.href = primaryUrl;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          openProjectDetail(item.projectId);
        }
      }
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % results.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = results[selectedIndex];
      if (current) {
        handleSelect(current);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsSpotlightOpen(false);
    }
  };

  // Group results while preserving flat index for keyboard navigation
  const groupedSections = useMemo(() => {
    const groups: ('Applications' | 'Files & Projects' | 'Skills & Tools')[] = [
      'Applications',
      'Files & Projects',
      'Skills & Tools',
    ];
    let runningIndex = 0;
    return groups
      .map((groupName) => {
        const items = results
          .filter((r) => r.group === groupName)
          .map((item) => {
            const flatIdx = runningIndex;
            runningIndex += 1;
            return { item, flatIdx };
          });
        return { groupName, items };
      })
      .filter((section) => section.items.length > 0);
  }, [results]);

  return (
    <AnimatePresence>
      {isSpotlightOpen && (
        <div
          className="fixed inset-0 z-[180] flex items-start justify-center pt-[13vh] px-4 bg-black/20 backdrop-blur-[2px]"
          onClick={() => setIsSpotlightOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Spotlight Search"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[640px] rounded-[20px] bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-[0_28px_75px_rgba(0,0,0,0.45)] overflow-hidden text-[#1d1d1f] dark:text-[#f5f5f7]"
          >
            {/* Top Spotlight Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/[0.07] dark:border-white/10 bg-white dark:bg-[#1c1c1e]">
              <Search className="w-5 h-5 text-[#86868b] dark:text-[#98989d] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Spotlight Search — apps, projects, files, or skills..."
                aria-label="Spotlight Search"
                className="w-full bg-transparent text-[17px] font-normal text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] dark:placeholder:text-[#98989d] focus:outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear Spotlight query"
                  className="p-1 rounded-full hover:bg-black/[0.06] dark:hover:bg-white/10 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-black/[0.05] dark:bg-white/10 text-[11px] font-medium text-[#86868b] dark:text-[#98989d]">
                  ESC
                </kbd>
              )}
            </div>

            {/* Results List */}
            <div className="max-h-[390px] overflow-y-auto mac-scroll p-2 bg-white dark:bg-[#1c1c1e]">
              {groupedSections.length === 0 ? (
                <div className="py-12 text-center text-[13.5px] text-[#86868b] dark:text-[#98989d]">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="space-y-2">
                  {groupedSections.map((section) => (
                    <div key={section.groupName}>
                      <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#86868b] dark:text-[#98989d]">
                        {section.groupName}
                      </div>
                      <div className="space-y-0.5">
                        {section.items.map(({ item, flatIdx }) => {
                          const isSelected = flatIdx === selectedIndex;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onMouseEnter={() => setSelectedIndex(flatIdx)}
                              onClick={() => handleSelect(item)}
                              className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#0a84ff] text-white'
                                  : 'text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/[0.04] dark:hover:bg-white/8'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {renderResultLeadingIcon(item)}
                                <div className="min-w-0">
                                  <div
                                    className={`text-[13.5px] font-medium truncate ${
                                      isSelected
                                        ? 'text-white'
                                        : 'text-[#1d1d1f] dark:text-[#f5f5f7]'
                                    }`}
                                  >
                                    {item.title}
                                  </div>
                                  <div
                                    className={`text-[11.5px] truncate ${
                                      isSelected
                                        ? 'text-white/80'
                                        : 'text-[#86868b] dark:text-[#98989d]'
                                    }`}
                                  >
                                    {item.subtitle}
                                  </div>
                                </div>
                              </div>

                              <div
                                className={`flex items-center gap-1 text-[11px] shrink-0 ${
                                  isSelected
                                    ? 'text-white/90'
                                    : 'text-[#86868b] dark:text-[#98989d]'
                                }`}
                              >
                                <span className="hidden sm:inline">Open</span>
                                <CornerDownLeft className="w-3.5 h-3.5" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Footer Bar */}
            <div className="px-4 py-2 border-t border-black/[0.06] dark:border-white/10 bg-[#fbfbfd] dark:bg-[#242426] flex items-center justify-between text-[11px] text-[#86868b] dark:text-[#98989d]">
              <span>Use ↑↓ arrows to navigate · Enter to open</span>
              <span>⌘ + Space</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
