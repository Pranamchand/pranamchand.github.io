import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { useWindowManager } from '../hooks/useWindowManager';

function formatReferenceBarDate(date: Date, compact = false): string {
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
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;

  if (compact) {
    return `${hours}:${minutes} ${ampm}`;
  }

  return `${dayName}, ${dayNum} ${monthName} ${year}   ${hours}:${minutes} ${ampm}`;
}

interface MenuBarProps {
  bootFinished?: boolean;
}

export const MenuBar: React.FC<MenuBarProps> = ({ bootFinished = true }) => {
  const {
    setIsAboutMacOpen,
    isDark,
    toggleTheme,
    isSoundEnabled,
    toggleSound,
    activeNotification,
    dismissNotification,
  } = useWindowManager();

  const [nowDate, setNowDate] = useState<Date>(() => new Date());

  useEffect(() => {
    const updateClock = () => setNowDate(new Date());
    const interval = window.setInterval(updateClock, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const fullText = formatReferenceBarDate(nowDate, false);
  const compactText = formatReferenceBarDate(nowDate, true);

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={bootFinished ? { y: 0, opacity: 1 } : { y: -8, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] h-9 px-3.5 sm:px-5 flex items-center justify-between gap-2 sm:gap-4 bg-black/18 backdrop-blur-md border-b border-white/10 text-white select-none"
        role="banner"
      >
        {/* Left zone: Clean macOS Name */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => setIsAboutMacOpen(true)}
            aria-label="About This Portfolio"
            className="text-[14px] sm:text-[15px] font-semibold tracking-[-0.015em] text-white hover:opacity-85 transition-opacity whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-white rounded px-1"
          >
            {PORTFOLIO_CONTENT.identity.displayName}
          </button>
        </div>

        {/* Right zone: Minimal macOS Sound Toggle + Appearance Toggle + Date & Time */}
        <div className="flex items-center gap-2.5 shrink-0 text-[12px] sm:text-[13px] font-medium text-white">
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              role="switch"
              aria-checked={isSoundEnabled}
              aria-label={
                isSoundEnabled
                  ? 'Mute system sound effects'
                  : 'Unmute system sound effects'
              }
              title={
                isSoundEnabled ? 'Sound Effects: On' : 'Sound Effects: Muted'
              }
              onClick={toggleSound}
              className="inline-flex items-center justify-center w-6 h-6 rounded-md text-white/85 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              {isSoundEnabled ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="opacity-60"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="22" y1="9" x2="16" y2="15" />
                  <line x1="16" y1="9" x2="22" y2="15" />
                </svg>
              )}
            </button>

            <button
              type="button"
              role="switch"
              aria-checked={isDark}
              aria-label={
                isDark
                  ? 'Switch app interface to White mode'
                  : 'Switch app interface to Dark mode'
              }
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              onClick={toggleTheme}
              className="inline-flex items-center justify-center w-6 h-6 rounded-md text-white/85 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              {isDark ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              )}
            </button>
          </div>

          <span className="text-white/25" aria-hidden="true">
            |
          </span>

          {/* Full date + time on desktop, compact time on mobile so nothing overflows */}
          <time
            className="hidden sm:inline font-medium tabular-nums whitespace-nowrap tracking-[-0.01em]"
            aria-label={`Current date and time: ${fullText}`}
          >
            {fullText}
          </time>
          <time
            className="sm:hidden font-medium tabular-nums whitespace-nowrap tracking-[-0.01em]"
            aria-label={`Current time: ${compactText}`}
          >
            {compactText}
          </time>
        </div>
      </motion.header>

      {/* Subtle macOS Notification Banner */}
      {activeNotification && (
        <motion.div
          key={activeNotification.id}
          role="status"
          aria-live="polite"
          onClick={dismissNotification}
          initial={{ opacity: 0, y: -12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-12 right-4 z-[180] max-w-xs w-76 px-3.5 py-2.5 rounded-2xl bg-white/88 dark:bg-[#242426]/90 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-[0_14px_34px_rgba(0,0,0,0.28)] flex items-center gap-3 cursor-pointer select-none"
        >
          {activeNotification.iconUrl && (
            <img
              src={activeNotification.iconUrl}
              alt=""
              aria-hidden="true"
              className="w-8 h-8 rounded-lg object-cover shrink-0 border border-black/10 dark:border-white/15"
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12.5px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
                {activeNotification.title}
              </span>
              <span className="text-[10.5px] text-[#86868b] dark:text-[#98989d] shrink-0">
                now
              </span>
            </div>
            <p className="text-[11.5px] text-[#6e6e73] dark:text-[#a1a1a6] truncate">
              {activeNotification.subtitle}
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};
