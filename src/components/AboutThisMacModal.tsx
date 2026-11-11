import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { useWindowManager } from '../hooks/useWindowManager';

export const AboutThisMacModal: React.FC = () => {
  const { isAboutMacOpen, setIsAboutMacOpen, openWindow } = useWindowManager();
  const { identity } = PORTFOLIO_CONTENT;

  return (
    <AnimatePresence>
      {isAboutMacOpen && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/30 p-4"
          onClick={() => setIsAboutMacOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-mac-title"
            className="w-[292px] rounded-[20px] bg-[#f5f5f7]/95 dark:bg-[#242426]/95 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.42)] px-6 pt-3.5 pb-5 text-center relative text-[#1d1d1f] dark:text-[#f5f5f7] select-none"
          >
            {/* Native macOS About Window Traffic Lights (Close active, Minimize/Zoom inactive) */}
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => setIsAboutMacOpen(false)}
                aria-label="Close About This Portfolio dialog"
                className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/10 flex items-center justify-center group focus-visible:outline-2 focus-visible:outline-[#0a84ff] cursor-pointer"
              >
                <X className="w-2 h-2 text-black/75 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <span
                aria-hidden="true"
                className="w-3 h-3 rounded-full bg-black/10 dark:bg-white/12 border border-black/5 dark:border-white/5"
              />
              <span
                aria-hidden="true"
                className="w-3 h-3 rounded-full bg-black/10 dark:bg-white/12 border border-black/5 dark:border-white/5"
              />
            </div>

            {/* Minimalist MacBook Pro Hardware Graphic */}
            <div className="mx-auto w-24 h-16 mb-3 flex items-center justify-center">
              <svg
                viewBox="0 0 120 76"
                className="w-full h-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.16)]"
                fill="none"
                aria-hidden="true"
              >
                {/* Display Lid */}
                <rect
                  x="18"
                  y="6"
                  width="84"
                  height="54"
                  rx="5"
                  className="fill-[#1d1d1f] stroke-[#86868b]/50"
                  strokeWidth="1.2"
                />
                {/* Screen Inner Wallpaper Accent */}
                <rect
                  x="21.5"
                  y="9.5"
                  width="77"
                  height="47"
                  rx="2.5"
                  fill="url(#macScreenGrad)"
                />
                {/* Notch */}
                <rect
                  x="53"
                  y="9.5"
                  width="14"
                  height="2.5"
                  rx="1"
                  fill="#0b0b0d"
                />
                {/* Base Chassis */}
                <path
                  d="M8 60.5H112C113.1 60.5 114 61.4 114 62.5C114 64.7 112.2 66.5 110 66.5H10C7.8 66.5 6 64.7 6 62.5C6 61.4 6.9 60.5 8 60.5Z"
                  className="fill-[#d2d2d7] dark:fill-[#636366]"
                />
                {/* Thumb lip */}
                <rect
                  x="50"
                  y="60.5"
                  width="20"
                  height="2"
                  rx="1"
                  className="fill-[#86868b] dark:fill-[#3a3a3c]"
                />
                <defs>
                  <linearGradient
                    id="macScreenGrad"
                    x1="21.5"
                    y1="9.5"
                    x2="98.5"
                    y2="56.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#1e293b" />
                    <stop offset="0.5" stopColor="#0f172a" />
                    <stop offset="1" stopColor="#09090b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Identity Header */}
            <h2
              id="about-mac-title"
              className="text-[20px] font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight"
            >
              {identity.displayName}
            </h2>
            <p className="text-[11.5px] font-medium text-[#86868b] dark:text-[#98989d] mt-0.5">
              B.Sc. Data Science · Data Analyst
            </p>

            {/* Native macOS Right/Left Aligned Specification Rows */}
            <div className="mt-4 pt-3.5 border-t border-black/[0.07] dark:border-white/10 grid grid-cols-[78px_1fr] gap-x-3 gap-y-1.5 text-[11.5px] items-baseline">
              <span className="text-right text-[#86868b] dark:text-[#98989d]">
                Full Name
              </span>
              <span className="text-left font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
                {identity.officialFullName}
              </span>

              <span className="text-right text-[#86868b] dark:text-[#98989d]">
                University
              </span>
              <span className="text-left font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
                Ravenshaw University
              </span>

              <span className="text-right text-[#86868b] dark:text-[#98989d]">
                Location
              </span>
              <span className="text-left font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
                {identity.location}
              </span>

              <span className="text-right text-[#86868b] dark:text-[#98989d]">
                macOS
              </span>
              <span className="text-left font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
                Sequoia 15.2
              </span>
            </div>

            {/* Native macOS 'More Info...' Pill Action */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsAboutMacOpen(false);
                  openWindow('about');
                }}
                className="px-3.5 py-1 rounded-md text-[12px] font-medium bg-white dark:bg-white/12 hover:bg-black/[0.04] dark:hover:bg-white/18 text-[#1d1d1f] dark:text-[#f5f5f7] border border-black/12 dark:border-white/12 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-colors cursor-pointer"
              >
                More Info...
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAboutMacOpen(false);
                  openWindow('resume');
                }}
                className="px-3.5 py-1 rounded-md text-[12px] font-medium bg-white dark:bg-white/12 hover:bg-black/[0.04] dark:hover:bg-white/18 text-[#1d1d1f] dark:text-[#f5f5f7] border border-black/12 dark:border-white/12 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-colors cursor-pointer"
              >
                Resume...
              </button>
            </div>

            <p className="mt-4 text-[10px] leading-relaxed text-[#86868b] dark:text-[#98989d]/80">
              ™ and © {identity.copyrightYear} {identity.displayName}. All Rights Reserved.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
