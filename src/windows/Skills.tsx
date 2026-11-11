import React, { useState } from 'react';
import { PORTFOLIO_CONTENT, SkillItem } from '../data/content';
import { Window } from '../components/Window';

const SKILL_GROUPS: {
  id: SkillItem['category'];
  label: string;
}[] = [
  { id: 'Languages & Libraries', label: 'Languages, AI & Libraries' },
  { id: 'Tools', label: 'Tools & Platforms' },
];

export const SkillsWindow: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    SkillItem['category'] | 'All'
  >('All');

  const visibleGroups =
    activeCategory === 'All'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.id === activeCategory);

  return (
    <Window id="skills">
      <div className="p-6 sm:p-8 space-y-6 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7]">
        {/* Apple Segmented Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/[0.06] dark:border-white/10">
          <div>
            <h1 className="text-[20px] font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
              Skills & Tools
            </h1>
            <p className="text-[13px] text-[#86868b] dark:text-[#98989d] mt-0.5">
              Core languages, AI & ML frameworks, analytics libraries, and automation tools
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter skills by category"
            className="flex items-center gap-1 p-1 rounded-lg bg-[#f5f5f7] dark:bg-[#2c2c2e] self-start"
          >
            {(['All', 'Languages & Libraries', 'Tools'] as const).map((tab) => {
              const isSelected = activeCategory === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(tab)}
                  className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-[#3a3a3c] text-[#1d1d1f] dark:text-[#f5f5f7] shadow-2xs'
                      : 'text-[#6e6e73] dark:text-[#98989d] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]'
                  }`}
                >
                  {tab === 'Languages & Libraries' ? 'Languages & AI' : tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grouped Skill Grids */}
        <div className="space-y-6">
          {visibleGroups.map((group) => {
            const items = PORTFOLIO_CONTENT.skills.filter(
              (s) => s.category === group.id
            );
            return (
              <section key={group.id} className="space-y-3">
                <h2 className="text-[13px] font-semibold text-[#86868b] dark:text-[#98989d]">
                  {group.label}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {items.map((skill) => (
                    <div
                      key={skill.name}
                      title={skill.note || skill.name}
                      className="p-3.5 rounded-2xl bg-white dark:bg-[#2c2c2e] border border-black/[0.07] dark:border-white/10 hover:border-black/15 dark:hover:border-white/20 transition-colors flex flex-col items-center text-center gap-2"
                    >
                      <div className="w-9 h-9 flex items-center justify-center">
                        <img
                          src={skill.iconUrl}
                          alt={skill.name}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display =
                              'none';
                          }}
                        />
                      </div>
                      <div className="text-[12.5px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
                        {skill.name}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </Window>
  );
};
