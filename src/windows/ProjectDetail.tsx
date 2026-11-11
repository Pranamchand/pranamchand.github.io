import React from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  CheckCircle2,
  Layers,
  BarChart3,
} from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { useWindowManager } from '../hooks/useWindowManager';
import { isPlaceholderLink } from '../utils/portfolioLogic';
import { ResilientImage } from '../components/ResilientImage';
import { Window } from '../components/Window';

export const ProjectDetailWindow: React.FC = () => {
  const { selectedProjectId, openWindow } = useWindowManager();

  const project =
    PORTFOLIO_CONTENT.projects.find((p) => p.id === selectedProjectId) ||
    PORTFOLIO_CONTENT.projects[0];

  const caseStudy = project.caseStudy;
  const hasLiveLink =
    project.links.live && !isPlaceholderLink(project.links.live);
  const hasGithubLink =
    project.links.github && !isPlaceholderLink(project.links.github);

  return (
    <Window
      id="project-detail"
      headerRight={
        <button
          type="button"
          onClick={() => openWindow('projects')}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/[0.05] dark:bg-white/10 hover:bg-black/[0.09] dark:hover:bg-white/15 text-[11.5px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>All Projects</span>
        </button>
      }
    >
      <div className="p-6 sm:p-8 space-y-6 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7]">
        {/* Hero Banner */}
        <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/10 bg-[#f5f5f7] dark:bg-[#2c2c2e] h-56 sm:h-72 relative">
          <ResilientImage
            src={project.image}
            fallbackSrc={project.remoteImage}
            alt={project.title}
            titleForInitials={project.title}
            className="w-full h-full"
            imgClassName="w-full h-full object-cover"
          />
        </div>

        {/* Title + Action Links */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-black/[0.06] dark:border-white/10">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#0a84ff]">
              {project.category}
            </div>
            <h1 className="text-[22px] sm:text-[26px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mt-0.5">
              {project.title}
            </h1>
            <p className="text-[14px] text-[#6e6e73] dark:text-[#98989d] mt-1">
              {caseStudy?.subtitle || project.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {hasLiveLink && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0a84ff] hover:bg-[#0070e0] text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <span>Open Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {hasGithubLink && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/[0.06] dark:bg-white/10 hover:bg-black/[0.1] dark:hover:bg-white/15 text-[#1d1d1f] dark:text-[#f5f5f7] text-xs font-semibold transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>View Source on GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* KPI Metrics Strip */}
        {caseStudy?.metrics && caseStudy.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-3.5">
            {caseStudy.metrics.map((m) => (
              <div
                key={m.label}
                className="p-4 rounded-2xl bg-[#f5f5f7] dark:bg-[#2c2c2e] border border-black/[0.05] dark:border-white/8"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#86868b] dark:text-[#98989d]">
                  <BarChart3 className="w-3.5 h-3.5 text-[#0a84ff]" />
                  <span>{m.label}</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mt-1 font-mono">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Executive Overview */}
        <section className="space-y-2">
          <h2 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
            Project Overview
          </h2>
          <p className="text-[14px] leading-relaxed text-[#3a3a3c] dark:text-[#d1d1d6]">
            {caseStudy?.overview || project.description}
          </p>
        </section>

        {/* Key Analytical Highlights */}
        {caseStudy?.highlights && caseStudy.highlights.length > 0 && (
          <section className="space-y-2.5">
            <h2 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
              Key Highlights & Methodology
            </h2>
            <ul className="space-y-2">
              {caseStudy.highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-[13.5px] text-[#3a3a3c] dark:text-[#d1d1d6] leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#34c759] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tech Stack */}
        <section className="pt-2 space-y-2.5">
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#86868b] dark:text-[#98989d]">
            <Layers className="w-3.5 h-3.5 text-[#0a84ff]" />
            <span>Tools & Technologies</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(caseStudy?.techStack || project.tags).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-[#f5f5f7] dark:bg-[#2c2c2e] border border-black/[0.06] dark:border-white/10 text-[12px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </Window>
  );
};
