import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WindowId } from '../data/content';
import { useWindowManager } from '../hooks/useWindowManager';

interface DockItemConfig {
  id: WindowId;
  label: string;
  renderIcon: () => React.ReactNode;
}

const DOCK_ITEMS: DockItemConfig[] = [
  {
    id: 'resume',
    label: 'Bio',
    renderIcon: () => (
      <div className="w-full h-full rounded-[14px] bg-black shadow-md overflow-hidden border border-white/25">
        <img
          src="/assets/aistudio/8cf86e7289c96902418d8ad5c87f747d_1092171f.jpg"
          alt="Bio"
          className="w-full h-full object-cover scale-[1.03] pointer-events-none"
        />
      </div>
    ),
  },
  {
    id: 'projects',
    label: 'Finder (Projects)',
    renderIcon: () => (
      <div className="w-full h-full rounded-[14px] overflow-hidden shadow-md border border-white/40 relative flex">
        <div className="w-1/2 h-full bg-gradient-to-b from-[#2ca8ff] to-[#006be6]" />
        <div className="w-1/2 h-full bg-gradient-to-b from-[#e9f4ff] to-[#bdd8f7]" />
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 60 60"
          fill="none"
        >
          <path
            d="M30 8 C27 22, 26 28, 32 32 C30 40, 30 46, 30 54"
            stroke="#0d3c78"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <ellipse cx="19" cy="22" rx="2.2" ry="3.6" fill="#0d254c" />
          <ellipse cx="41" cy="22" rx="2.2" ry="3.6" fill="#0d254c" />
          <path
            d="M16 38 C23 45, 37 45, 44 38"
            stroke="#0d254c"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
  },
  {
    id: 'gallery',
    label: 'Photos',
    renderIcon: () => (
      <div className="w-full h-full rounded-[14px] bg-[#e5534b] shadow-md overflow-hidden border border-white/30">
        <img
          src="/assets/aistudio/icon_photos_clean.png"
          alt="Photos"
          className="w-full h-full object-cover scale-[1.04] pointer-events-none"
        />
      </div>
    ),
  },
  {
    id: 'reel',
    label: 'Video',
    renderIcon: () => (
      <div className="w-full h-full rounded-[14px] bg-[#252527] shadow-md overflow-hidden border border-white/25">
        <img
          src="/assets/aistudio/icon_video_clean.png"
          alt="Video"
          className="w-full h-full object-cover scale-[1.04] pointer-events-none"
        />
      </div>
    ),
  },
  {
    id: 'contact',
    label: 'Mail',
    renderIcon: () => (
      <div className="w-full h-full rounded-[14px] bg-[#0b84ff] shadow-md overflow-hidden border border-white/30">
        <img
          src="/assets/aistudio/icon_mail_clean.png"
          alt="Mail"
          className="w-full h-full object-cover scale-[1.04] pointer-events-none"
        />
      </div>
    ),
  },
];

interface DockProps {
  bootFinished?: boolean;
}

export const Dock: React.FC<DockProps> = ({ bootFinished = true }) => {
  const { windows, bouncingAppId, openWindow, focusWindow } =
    useWindowManager();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleDockClick = (id: WindowId) => {
    const targetId = id === 'resume' ? 'about' : id;
    const win = windows[targetId];
    if (win.isOpen && !win.isMinimized) {
      focusWindow(targetId);
    } else {
      openWindow(targetId);
    }
  };

  return (
    <motion.nav
      aria-label="Application Dock"
      initial={{ y: 12, opacity: 0 }}
      animate={bootFinished ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay: bootFinished ? 0.08 : 0,
      }}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[90] select-none"
    >
      <div className="flex items-end gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-[20px] sm:rounded-[22px] bg-white/15 backdrop-blur-2xl border border-white/25 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
        {DOCK_ITEMS.map((item, idx) => {
          const targetId = item.id === 'resume' ? 'about' : item.id;
          const isBouncing = bouncingAppId === targetId;

          let scale = 1;
          if (hoveredIndex !== null) {
            const dist = Math.abs(hoveredIndex - idx);
            if (dist === 0) scale = 1.22;
            else if (dist === 1) scale = 1.08;
          }

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="hidden sm:block pointer-events-none absolute -top-9 px-2.5 py-1 rounded-md bg-black/80 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                {item.label}
              </span>

              <motion.button
                type="button"
                onClick={() => handleDockClick(item.id)}
                aria-label={`Open ${item.label}`}
                animate={{
                  scale,
                  y: isBouncing ? [0, -14, 0, -6, 0] : scale > 1 ? -5 : 0,
                }}
                transition={{
                  scale: {
                    type: 'spring',
                    stiffness: 380,
                    damping: 22,
                  },
                  y: isBouncing
                    ? {
                        type: 'tween',
                        duration: 0.58,
                        ease: 'easeInOut',
                      }
                    : {
                        type: 'spring',
                        stiffness: 380,
                        damping: 22,
                      },
                }}
                className="w-12 h-12 sm:w-[54px] sm:h-[54px] cursor-pointer focus-visible:outline-2 focus-visible:outline-white rounded-[14px]"
              >
                {item.renderIcon()}
              </motion.button>
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
};
