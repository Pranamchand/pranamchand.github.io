import React, { useState } from 'react';
import {
  Bookmark,
  ExternalLink,
  Compass,
  Database,
  Wrench,
} from 'lucide-react';
import { PORTFOLIO_CONTENT, ResourceLink } from '../data/content';
import { isPlaceholderLink } from '../utils/portfolioLogic';
import { Window } from '../components/Window';

export const ResourcesWindow: React.FC = () => {
  const { items, note } = PORTFOLIO_CONTENT.resources;
  const [selectedCategory, setSelectedCategory] = useState<
    ResourceLink['category'] | 'All'
  >('All');

  const filtered =
    selectedCategory === 'All'
      ? items
      : items.filter((r) => r.category === selectedCategory);

  const getCategoryIcon = (cat: ResourceLink['category']) => {
    switch (cat) {
      case 'Roadmaps':
        return <Compass className="w-4 h-4 text-[#0a84ff]" />;
      case 'Datasets':
        return <Database className="w-4 h-4 text-emerald-500" />;
      case 'Tools & Notebooks':
        return <Wrench className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <Window id="resources">
      <div className="p-5 sm:p-7 space-y-5 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/8 dark:border-white/10">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
              Curated Data Science Resources
            </h1>
            <p className="text-xs text-[#6e6e73] dark:text-[#98989d] mt-0.5">
              {note}
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-[#2c2c2e] self-start">
            {(
              ['All', 'Roadmaps', 'Datasets', 'Tools & Notebooks'] as const
            ).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-[#3a3a3c] text-[#1d1d1f] dark:text-[#f5f5f7] shadow-2xs'
                    : 'text-[#6e6e73] dark:text-[#98989d]'
                }`}
              >
                {cat === 'Tools & Notebooks' ? 'Tools' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Link Rows */}
        <div className="space-y-3">
          {filtered.map((res) => {
            const isPending = isPlaceholderLink(res.url);
            return (
              <div
                key={res.id}
                className="p-4 rounded-xl bg-white dark:bg-[#2c2c2e] border border-black/8 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-black/[0.04] dark:bg-white/8 flex items-center justify-center shrink-0 mt-0.5">
                    {getCategoryIcon(res.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#6e6e73] dark:text-[#98989d]">
                      <span>{res.category}</span>
                      <span>·</span>
                      <span>{res.domain}</span>
                    </div>
                    <h2 className="text-sm font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                      {res.title}
                    </h2>
                    <p className="text-xs text-[#6e6e73] dark:text-[#a1a1a6] mt-0.5 leading-relaxed">
                      {res.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  {!isPending ? (
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a84ff] hover:bg-[#0070e0] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      title="Coming soon — edit url in src/data/content.ts"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 text-[#6e6e73] dark:text-[#98989d] text-xs font-mono opacity-70 cursor-not-allowed whitespace-nowrap"
                    >
                      <Bookmark className="w-3 h-3" />
                      <span>[ADD LINK]</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Window>
  );
};
