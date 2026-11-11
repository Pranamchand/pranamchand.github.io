import React, { useState } from 'react';
import {
  Download,
  ArrowUpRight,
  Minus,
  Plus,
} from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { Window } from '../components/Window';

export const ResumeWindow: React.FC = () => {
  const { identity } = PORTFOLIO_CONTENT;
  const [zoom, setZoom] = useState<number>(100);

  const zoomIn = () => setZoom((z) => Math.min(150, z + 10));
  const zoomOut = () => setZoom((z) => Math.max(70, z - 10));
  const resetZoom = () => setZoom(100);

  return (
    <Window
      id="resume"
      headerRight={
        <div className="flex items-center gap-1.5">
          {/* Minimal iOS-style Zoom Stepper Pill */}
          <div className="hidden sm:inline-flex items-center h-7 px-1 rounded-full bg-[#f2f2f7] dark:bg-white/[0.08] text-[#1d1d1f] dark:text-[#f5f5f7]">
            <button
              type="button"
              onClick={zoomOut}
              aria-label="Zoom out resume"
              className="w-5 h-5 rounded-full flex items-center justify-center text-[#6e6e73] dark:text-[#98989d] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Minus className="w-3 h-3 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={resetZoom}
              title="Click to reset zoom to 100%"
              aria-label="Reset zoom"
              className="px-1.5 text-[11px] font-medium tabular-nums text-[#3a3a3c] dark:text-[#ebebf5] hover:text-[#007aff] dark:hover:text-[#0a84ff] transition-colors cursor-pointer"
            >
              {zoom}%
            </button>
            <button
              type="button"
              onClick={zoomIn}
              aria-label="Zoom in resume"
              className="w-5 h-5 rounded-full flex items-center justify-center text-[#6e6e73] dark:text-[#98989d] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3 stroke-[2.2]" />
            </button>
          </div>

          {/* Minimal iOS-style Action Capsule (Download + Open PDF) */}
          <div className="inline-flex items-center h-7 p-0.5 rounded-full bg-[#f2f2f7] dark:bg-white/[0.08]">
            <a
              href={identity.resumePdf}
              download="Resume_Pranam_Chand.pdf"
              aria-label="Download PDF"
              title="Download Resume PDF"
              className="inline-flex items-center gap-1 h-6 px-2.5 rounded-full text-[11.5px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-white dark:hover:bg-white/15 hover:shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-all whitespace-nowrap"
            >
              <Download className="w-3 h-3 text-[#007aff] dark:text-[#0a84ff] stroke-[2.2]" />
              <span>Download</span>
            </a>

            <div className="w-px h-3 bg-black/[0.08] dark:bg-white/12" />

            <a
              href={identity.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open PDF in new tab"
              title="Open PDF in new tab"
              className="inline-flex items-center gap-0.5 h-6 px-2.5 rounded-full text-[11.5px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-white dark:hover:bg-white/15 hover:shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-all whitespace-nowrap"
            >
              <span>Open</span>
              <ArrowUpRight className="w-3 h-3 text-[#6e6e73] dark:text-[#98989d] stroke-[2.2]" />
            </a>
          </div>
        </div>
      }
    >
      <div className="p-3 sm:p-5 bg-[#f2f2f7] dark:bg-[#141416] min-h-full flex flex-col items-center overflow-auto">
        <div
          style={{
            width: `${Math.round((760 * zoom) / 100)}px`,
            maxWidth: zoom === 100 ? '100%' : 'none',
          }}
          className="rounded-lg overflow-hidden bg-white shadow-[0_10px_32px_rgba(0,0,0,0.14)] border border-black/10 dark:border-white/10 transition-all duration-150"
        >
          <img
            src="/assets/resume/resume_page_1.png"
            alt="Pranam Chand Uploaded Resume PDF"
            className="w-full h-auto block select-none"
          />
        </div>
      </div>
    </Window>
  );
};
