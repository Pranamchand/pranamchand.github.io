import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppleWallpaper } from './AppleWallpaper';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (!visible) {
      onComplete();
      return;
    }
    // 4.8 seconds total (~3 seconds slower than the original 1.8s intro)
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 4800);
    return () => clearTimeout(timer);
  }, [visible, onComplete]);

  const handleSkip = () => {
    setVisible(false);
    onComplete();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleSkip}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden select-none cursor-pointer"
          role="dialog"
          aria-label="Hello — Pranam Chand Portfolio Intro"
        >
          {/* Official Apple iMac Blue 3D Capsule & Sphere Wallpaper */}
          <AppleWallpaper />

          {/* Slow Apple MacBook cursive "hello" calligraphy stroke (~3.5s draw) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center px-6"
          >
            <svg
              width="320"
              height="140"
              viewBox="0 0 360 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[240px] sm:w-[320px] h-auto drop-shadow-[0_6px_24px_rgba(0,0,0,0.32)]"
            >
              <motion.path
                d="M42 108 C56 92, 78 52, 74 28 C70 12, 58 24, 56 48 C54 74, 54 108, 56 112 C58 100, 72 74, 88 74 C100 74, 100 94, 102 104 C104 112, 116 112, 128 98 C142 84, 152 72, 144 64 C136 58, 122 72, 124 94 C126 112, 146 114, 164 96 C182 78, 200 42, 196 22 C192 10, 180 24, 178 56 C176 88, 182 112, 198 108 C214 104, 236 62, 238 30 C240 12, 226 18, 222 52 C218 86, 224 112, 244 108 C260 104, 266 84, 276 76 C288 66, 308 72, 306 92 C304 110, 280 114, 272 96 C266 82, 282 68, 304 74 C318 78, 328 74, 336 68"
                stroke="#FFFFFF"
                strokeWidth="7.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 3.5, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.4 },
                }}
              />
            </svg>
          </motion.div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="fixed bottom-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-medium border border-white/25 transition-colors cursor-pointer"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
