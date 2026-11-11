import React from 'react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { useWindowManager } from '../hooks/useWindowManager';
import { Window } from '../components/Window';

export const AboutWindow: React.FC = () => {
  const { openWindow } = useWindowManager();
  const { identity, about, skills } = PORTFOLIO_CONTENT;

  return (
    <Window id="about" hideTitleText>
      <div className="bg-white dark:bg-[#1c1c1e] px-7 sm:px-9 pb-7 pt-1 space-y-5 text-[#1d1d1f] dark:text-[#f5f5f7]">
        {/* Row 1: Name + Role */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div>
            <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-tight leading-tight text-[#111111] dark:text-[#f5f5f7]">
              {identity.displayName}
            </h1>
            <p className="text-[15.5px] text-[#66666b] dark:text-[#98989d] mt-0.5">
              {identity.roleLine}
            </p>
          </div>
        </div>

        {/* Row 2: Stats row */}
        <div className="relative flex flex-wrap items-center gap-y-2 gap-x-5 text-[13px] text-[#66666b] dark:text-[#98989d]">
          <div>
            <strong className="text-[15px] font-semibold text-[#111111] dark:text-[#f5f5f7] mr-1.5">
              15+
            </strong>
            <span>Projects Completed</span>
          </div>
          <span className="text-black/15 dark:text-white/20">|</span>
          <div>
            <strong className="text-[15px] font-semibold text-[#111111] dark:text-[#f5f5f7] mr-1.5">
              4
            </strong>
            <span>Kaggle Competitions</span>
          </div>
          <span className="text-black/15 dark:text-white/20">|</span>
          <div>
            <strong className="text-[15px] font-semibold text-[#111111] dark:text-[#f5f5f7] mr-1.5">
              5+
            </strong>
            <span>BI Dashboards</span>
          </div>
        </div>

        {/* Row 3: Bio paragraph */}
        <p className="text-[15px] text-[#3a3a3c] dark:text-[#d1d1d6] leading-[1.6] max-w-3xl">
          {about.bio}
        </p>

        {/* Row 4: Contact bar below divider (email, location, 2026) */}
        <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-[14px] text-[#3a3a3c] dark:text-[#d1d1d6]">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${identity.email}`}
              className="hover:text-[#0a84ff] transition-colors"
            >
              {identity.email}
            </a>
            <span>{identity.location}</span>
          </div>
          <span className="text-[#86868b] dark:text-[#98989d] font-mono text-[13px]">
            {identity.copyrightYear}
          </span>
        </div>

        {/* Row 5: Education Section */}
        <div className="pt-2 space-y-2.5">
          <h3 className="text-[16px] font-medium text-[#86868b] dark:text-[#98989d]">
            Education
          </h3>
          <div className="space-y-1.5 text-[14px] text-[#3a3a3c] dark:text-[#d1d1d6]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium text-[#111111] dark:text-[#f5f5f7]">
                Ravenshaw University, Cuttack
              </span>
              <span className="text-black/20 dark:text-white/20">|</span>
              <span>B.Sc. in Data Science (Honours · Continuing)</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#66666b] dark:text-[#98989d]">
              <span>NIST, Balasore (Higher Secondary · 89%)</span>
              <span className="text-black/20 dark:text-white/20">|</span>
              <span>SACIE, Mayurbhanj (Schooling · 91%)</span>
            </div>
          </div>
        </div>

        {/* Row 6: Core Skills Section */}
        <div className="pt-2 space-y-3">
          <h3 className="text-[16px] font-medium text-[#86868b] dark:text-[#98989d]">
            Core Skills
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-6 text-[14px] text-[#3a3a3c] dark:text-[#d1d1d6]">
            <div className="flex items-center gap-2">
              <span className="text-[#86868b] dark:text-[#98989d]">•</span>
              <span>Data Analysis & EDA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#86868b] dark:text-[#98989d]">•</span>
              <span>Python, SQL & R</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#86868b] dark:text-[#98989d]">•</span>
              <span>Power BI, Tableau & Excel</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#86868b] dark:text-[#98989d]">•</span>
              <span>Machine Learning & NLP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#86868b] dark:text-[#98989d]">•</span>
              <span>Pandas, NumPy & Scikit-learn</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#86868b] dark:text-[#98989d]">•</span>
              <span>Streamlit & FastAPI</span>
            </div>
          </div>
        </div>

        {/* Row 7: Experience / Programs & Quick Actions */}
        <div className="pt-3 border-t border-black/8 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[12.5px] text-[#66666b] dark:text-[#98989d]">
            <strong className="text-[#111111] dark:text-[#f5f5f7]">
              Programs:
            </strong>{' '}
            IBM SkillsBuild Data Analytics with AI Internship · Flipkart GRiD
            8.0 · Unihack 2026
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openWindow('projects')}
              className="px-3.5 py-1.5 rounded-lg bg-[#111111] dark:bg-[#0a84ff] text-white text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
            >
              View Projects ({PORTFOLIO_CONTENT.projects.length})
            </button>
            <button
              type="button"
              onClick={() => openWindow('skills')}
              className="px-3.5 py-1.5 rounded-lg bg-black/[0.05] dark:bg-white/10 text-[#111111] dark:text-[#f5f5f7] text-xs font-medium hover:bg-black/10 dark:hover:bg-white/15 transition-colors cursor-pointer"
            >
              All {skills.length} Skills
            </button>
            <button
              type="button"
              onClick={() => openWindow('contact')}
              className="px-3.5 py-1.5 rounded-lg bg-black/[0.05] dark:bg-white/10 text-[#111111] dark:text-[#f5f5f7] text-xs font-medium hover:bg-black/10 dark:hover:bg-white/15 transition-colors cursor-pointer"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </Window>
  );
};
