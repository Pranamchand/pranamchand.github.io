import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { getProjectInitials } from '../utils/portfolioLogic';

export type MacIconVariant =
  | 'notes-resume'
  | 'appstore-about'
  | 'clapper-movies'
  | 'apple-music'
  | 'manga-orv'
  | 'mac-certifications'
  | 'folder-resources'
  | 'ai-agent'
  | 'github-profile'
  | 'linkedin-profile'
  | 'kaggle-profile'
  | 'project-tile';

interface DesktopIconProps {
  id: string;
  label: string;
  variant: MacIconVariant;
  imageUrl?: string;
  fallbackImageUrl?: string;
  initialX: number;
  initialY: number;
  index?: number;
  bootFinished?: boolean;
  onActivate?: () => void;
  href?: string;
}

export const MacAppIconGraphic: React.FC<{
  variant: MacIconVariant;
  label: string;
  imageUrl?: string;
  fallbackImageUrl?: string;
}> = ({ variant, label, imageUrl, fallbackImageUrl }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl || '');
  const [imgFailed, setImgFailed] = useState(!imageUrl);

  switch (variant) {
    case 'ai-agent':
      return (
        <div className="w-full h-full rounded-[15px] bg-[#141416] shadow-[0_10px_24px_rgba(0,0,0,0.36)] border border-white/25 overflow-hidden relative select-none">
          <img
            src="/assets/aistudio/icon_ai_agent_clean.png"
            alt="Arther"
            className="w-full h-full object-cover scale-[1.03] pointer-events-none"
          />
        </div>
      );

    case 'notes-resume':
      return (
        <div className="w-full h-full rounded-[15px] bg-[#efeee9] shadow-[0_10px_24px_rgba(0,0,0,0.28)] border border-white/50 overflow-hidden relative select-none">
          <img
            src="/assets/aistudio/icon_resume_3d_clean.png"
            alt="Resume"
            className="w-full h-full object-cover scale-[1.03] pointer-events-none"
          />
        </div>
      );

    case 'appstore-about':
      return (
        <div className="w-full h-full rounded-[15px] bg-[#f5f3ef] shadow-[0_10px_24px_rgba(0,0,0,0.28)] border border-white/40 overflow-hidden relative select-none">
          <img
            src="/assets/aistudio/icon_about_clean.png"
            alt="About Me"
            className="w-full h-full object-cover scale-[1.03] pointer-events-none"
          />
        </div>
      );

    case 'clapper-movies':
      return (
        <div className="w-full h-full rounded-[15px] bg-[#141416] shadow-[0_10px_24px_rgba(0,0,0,0.34)] border border-white/25 overflow-hidden relative select-none">
          <img
            src="/assets/aistudio/icon_movies_clean.png"
            alt="Cinema"
            className="w-full h-full object-cover scale-[1.04] pointer-events-none"
          />
        </div>
      );

    case 'apple-music':
      return (
        <div className="w-full h-full rounded-[15px] bg-[#18181a] shadow-[0_10px_24px_rgba(0,0,0,0.34)] border border-white/25 overflow-hidden relative select-none">
          <img
            src="/assets/aistudio/icon_music_clean.png"
            alt="Music"
            className="w-full h-full object-cover scale-[1.03] pointer-events-none"
          />
        </div>
      );

    case 'manga-orv':
      return (
        <div className="w-full h-full rounded-[15px] bg-[#161314] shadow-[0_10px_24px_rgba(0,0,0,0.36)] border border-white/25 overflow-hidden relative select-none">
          <img
            src="/assets/aistudio/746865383cfdbc6c94c498766f4ab6d0_752bde81.jpg"
            alt="Manwha & Manga"
            className="w-full h-full object-cover object-center pointer-events-none"
          />
        </div>
      );

    case 'mac-certifications':
      return (
        <div className="w-full h-full rounded-[15px] bg-[#f5f3ef] shadow-[0_10px_24px_rgba(0,0,0,0.28)] border border-white/50 overflow-hidden relative select-none">
          <img
            src="/assets/aistudio/icon_cert_clean.png"
            alt="Certifications"
            className="w-full h-full object-cover scale-[1.04] pointer-events-none"
          />
        </div>
      );

    case 'folder-resources':
      return (
        <div className="w-full h-full rounded-[15px] bg-[#1c1c1e] shadow-[0_10px_24px_rgba(0,0,0,0.32)] border border-white/25 overflow-hidden relative select-none">
          <img
            src="/assets/aistudio/icon_projects_clean.png"
            alt="Projects"
            className="w-full h-full object-cover scale-[1.04] pointer-events-none"
          />
        </div>
      );

    case 'github-profile':
      return (
        <div className="w-full h-full rounded-[15px] bg-[#1b1f23] shadow-[0_10px_24px_rgba(0,0,0,0.35)] border border-white/20 flex items-center justify-center relative overflow-hidden">
          <svg
            className="w-9 h-9 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.92.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
        </div>
      );

    case 'linkedin-profile':
      return (
        <div className="w-full h-full rounded-[15px] bg-[#0A66C2] shadow-[0_10px_24px_rgba(0,0,0,0.3)] border border-white/30 flex items-center justify-center relative overflow-hidden">
          <span className="text-white font-bold text-[31px] leading-none tracking-tighter font-sans select-none">
            in
          </span>
        </div>
      );

    case 'kaggle-profile':
      return (
        <div className="w-full h-full rounded-[15px] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.28)] border border-white/60 flex items-center justify-center relative overflow-hidden p-3.5 select-none">
          <svg
            viewBox="0 0 128 128"
            className="w-full h-full"
            aria-hidden="true"
          >
            <path
              fill="#20BEFF"
              d="M100.402 127.243c-.126.501-.627.752-1.502.752H82.168c-1.007 0-1.876-.438-2.632-1.317L51.91 91.531l-7.706 7.33v27.258c0 1.255-.628 1.881-1.88 1.881h-12.97c-1.254 0-1.88-.626-1.88-1.88V1.876c0-1.25.625-1.877 1.88-1.877h12.97c1.253 0 1.882.628 1.882 1.876v76.501l33.08-33.457c.878-.875 1.755-1.315 2.631-1.315h17.295c.75 0 1.25.315 1.504.937.252.753.19 1.316-.19 1.693L63.561 80.062l36.465 45.3c.499.502.625 1.128.38 1.881"
            />
          </svg>
        </div>
      );

    case 'project-tile':
    default:
      if (!imgFailed && imgSrc) {
        return (
          <div className="w-full h-full rounded-[15px] bg-slate-900 shadow-[0_10px_24px_rgba(0,0,0,0.32)] border border-white/40 overflow-hidden relative">
            <img
              src={imgSrc}
              alt={label}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => {
                if (fallbackImageUrl && imgSrc !== fallbackImageUrl) {
                  setImgSrc(fallbackImageUrl);
                } else {
                  setImgFailed(true);
                }
              }}
              className="w-full h-full object-cover"
            />
          </div>
        );
      }
      return (
        <div className="w-full h-full rounded-[15px] bg-gradient-to-br from-[#0a84ff] to-indigo-700 shadow-[0_10px_24px_rgba(0,0,0,0.32)] border border-white/40 flex items-center justify-center text-white font-mono font-bold text-base">
          {getProjectInitials(label)}
        </div>
      );
  }
};

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  label,
  variant,
  imageUrl,
  fallbackImageUrl,
  initialX,
  initialY,
  index = 0,
  bootFinished = true,
  onActivate,
  href,
}) => {
  const isDraggingRef = useRef(false);

  const handleClick = () => {
    if (isDraggingRef.current) return;
    if (href) {
      const a = document.createElement('a');
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    onActivate?.();
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: initialX, y: initialY, opacity: 0, scale: 0.96 }}
      animate={{
        x: initialX,
        y: initialY,
        opacity: bootFinished ? 1 : 0,
        scale: bootFinished ? 1 : 0.96,
      }}
      transition={{
        opacity: {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
          delay: bootFinished ? 0.04 + index * 0.045 : 0,
        },
        scale: {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
          delay: bootFinished ? 0.04 + index * 0.045 : 0,
        },
      }}
      onDragStart={() => {
        isDraggingRef.current = true;
      }}
      onDragEnd={() => {
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 80);
      }}
      style={{ position: 'absolute', left: 0, top: 0 }}
      className="z-10 select-none"
    >
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Open ${label}`}
        className="group flex flex-col items-center w-[84px] p-1 rounded-xl focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
      >
        <div className="w-[68px] h-[68px] transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
          <MacAppIconGraphic
            variant={variant}
            label={label}
            imageUrl={imageUrl}
            fallbackImageUrl={fallbackImageUrl}
          />
        </div>

        <span className="mt-1.5 px-2 py-0.5 rounded-md text-[11.5px] font-medium leading-tight text-center tracking-[-0.01em] text-white bg-black/55 backdrop-blur-md shadow-xs whitespace-nowrap pointer-events-none opacity-0 translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 transition-all duration-150">
          {label}
        </span>
      </button>
    </motion.div>
  );
};
