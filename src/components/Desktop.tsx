import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { useWindowManager } from '../hooks/useWindowManager';
import {
  DesktopIcon,
  MacAppIconGraphic,
  MacIconVariant,
} from './DesktopIcon';
import { AppleWallpaper } from './AppleWallpaper';
import { Dock } from './Dock';
import { PixelCat } from './PixelCat';
import { AboutThisMacModal } from './AboutThisMacModal';
import { SpotlightModal } from './SpotlightModal';
import { AboutWindow } from '../windows/About';
import { ProjectsWindow } from '../windows/Projects';
import { ProjectDetailWindow } from '../windows/ProjectDetail';
import { ResumeWindow } from '../windows/Resume';
import { SkillsWindow } from '../windows/Skills';
import { GalleryWindow } from '../windows/Gallery';
import { ReelWindow } from '../windows/Reel';
import { ContactWindow } from '../windows/Contact';
import { MusicWindow } from '../windows/Music';
import { ResourcesWindow } from '../windows/Resources';
import {
  MoviesWindow,
  MangaWindow,
  CertificationsWindow,
} from '../windows/MediaPlaceholders';
import { AiAgentWindow } from '../windows/AiAgent';

interface ScatteredItem {
  id: string;
  label: string;
  variant: MacIconVariant;
  dx: number;
  dy: number;
  onActivate?: () => void;
  href?: string;
}

interface DesktopProps {
  bootFinished: boolean;
}

export const Desktop: React.FC<DesktopProps> = ({ bootFinished }) => {
  const { openWindow, openProjectsFolder } = useWindowManager();
  const { identity } = PORTFOLIO_CONTENT;

  const [viewport, setViewport] = useState<{ vw: number; vh: number }>(() => ({
    vw: typeof window !== 'undefined' ? window.innerWidth : 1440,
    vh: typeof window !== 'undefined' ? window.innerHeight : 900,
  }));

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        vw: window.innerWidth,
        vh: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Center anchor of the desktop canvas (accounting for 84px icon button width & 68px icon height)
  const centerX = Math.round(viewport.vw / 2 - 42);
  const centerY = Math.round(viewport.vh / 2 - 46);

  // Generate a wider, genuinely random scatter around the center of the desktop on startup
  const [randomCoords] = useState<Record<string, { dx: number; dy: number }>>(
    () => {
      const iconIds = [
        'icon-ai-agent',
        'icon-resume',
        'icon-certifications',
        'icon-projects',
        'icon-about',
        'icon-movies',
        'icon-manga',
        'icon-github',
        'icon-music',
        'icon-linkedin',
        'icon-kaggle',
      ];

      // 14 wide-spread organic candidate zones distributed farther from the center
      const candidateZones = [
        { dx: -440, dy: -220 },
        { dx: -230, dy: -250 },
        { dx: 30, dy: -245 },
        { dx: 275, dy: -230 },
        { dx: 455, dy: -175 },
        { dx: -465, dy: -25 },
        { dx: -255, dy: -75 },
        { dx: -35, dy: -85 },
        { dx: 195, dy: -65 },
        { dx: 420, dy: 20 },
        { dx: -395, dy: 165 },
        { dx: -175, dy: 145 },
        { dx: 85, dy: 155 },
        { dx: 335, dy: 175 },
      ];

      // Shuffle zones randomly via Fisher-Yates so every load has a unique random arrangement
      const shuffledZones = [...candidateZones];
      for (let i = shuffledZones.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledZones[i], shuffledZones[j]] = [
          shuffledZones[j],
          shuffledZones[i],
        ];
      }

      const placed: { x: number; y: number }[] = [];
      const coords: Record<string, { dx: number; dy: number }> = {};

      iconIds.forEach((id, idx) => {
        const zone = shuffledZones[idx];
        let finalX = zone.dx;
        let finalY = zone.dy;

        for (let attempt = 0; attempt < 24; attempt++) {
          const jx = Math.round((Math.random() - 0.5) * 95);
          const jy = Math.round((Math.random() - 0.5) * 75);
          const cx = zone.dx + jx;
          const cy = zone.dy + jy;
          const tooClose = placed.some(
            (p) => Math.hypot(p.x - cx, p.y - cy) < 122
          );
          if (!tooClose) {
            finalX = cx;
            finalY = cy;
            break;
          }
        }

        placed.push({ x: finalX, y: finalY });
        coords[id] = { dx: finalX, dy: finalY };
      });

      return coords;
    }
  );

  // All apps & social profile icons randomly scattered farther across the desktop
  const scatteredDesktopItems: ScatteredItem[] = [
    {
      id: 'icon-ai-agent',
      label: 'Arther',
      variant: 'ai-agent',
      dx: randomCoords['icon-ai-agent']?.dx ?? -30,
      dy: randomCoords['icon-ai-agent']?.dy ?? -120,
      onActivate: () => openWindow('ai-agent'),
    },
    {
      id: 'icon-resume',
      label: 'Resume',
      variant: 'notes-resume',
      dx: randomCoords['icon-resume']?.dx ?? -380,
      dy: randomCoords['icon-resume']?.dy ?? -210,
      onActivate: () => openWindow('resume'),
    },
    {
      id: 'icon-certifications',
      label: 'Certifications',
      variant: 'mac-certifications',
      dx: randomCoords['icon-certifications']?.dx ?? -95,
      dy: randomCoords['icon-certifications']?.dy ?? -240,
      onActivate: () => openWindow('certifications'),
    },
    {
      id: 'icon-projects',
      label: 'Projects',
      variant: 'folder-resources',
      dx: randomCoords['icon-projects']?.dx ?? 260,
      dy: randomCoords['icon-projects']?.dy ?? -215,
      onActivate: () => openProjectsFolder(null, 'Featured'),
    },
    {
      id: 'icon-about',
      label: 'About Me',
      variant: 'appstore-about',
      dx: randomCoords['icon-about']?.dx ?? -265,
      dy: randomCoords['icon-about']?.dy ?? -55,
      onActivate: () => openWindow('about'),
    },
    {
      id: 'icon-movies',
      label: 'Cinema',
      variant: 'clapper-movies',
      dx: randomCoords['icon-movies']?.dx ?? 115,
      dy: randomCoords['icon-movies']?.dy ?? -85,
      onActivate: () => openWindow('movies'),
    },
    {
      id: 'icon-manga',
      label: 'Manwha & Manga',
      variant: 'manga-orv',
      dx: randomCoords['icon-manga']?.dx ?? -45,
      dy: randomCoords['icon-manga']?.dy ?? 65,
      onActivate: () => openWindow('manga'),
    },
    {
      id: 'icon-github',
      label: 'GitHub',
      variant: 'github-profile',
      dx: randomCoords['icon-github']?.dx ?? 415,
      dy: randomCoords['icon-github']?.dy ?? -40,
      href: identity.github,
    },
    {
      id: 'icon-music',
      label: 'Music',
      variant: 'apple-music',
      dx: randomCoords['icon-music']?.dx ?? -420,
      dy: randomCoords['icon-music']?.dy ?? 125,
      onActivate: () => openWindow('music'),
    },
    {
      id: 'icon-linkedin',
      label: 'LinkedIn',
      variant: 'linkedin-profile',
      dx: randomCoords['icon-linkedin']?.dx ?? -195,
      dy: randomCoords['icon-linkedin']?.dy ?? 175,
      href: identity.linkedin,
    },
    {
      id: 'icon-kaggle',
      label: 'Kaggle',
      variant: 'kaggle-profile',
      dx: randomCoords['icon-kaggle']?.dx ?? 295,
      dy: randomCoords['icon-kaggle']?.dy ?? 155,
      href: identity.kaggle,
    },
  ];

  return (
    <main
      aria-label="Pranam Chand macOS Portfolio Desktop"
      className="relative w-screen h-screen overflow-hidden select-none pt-9 pb-20"
    >
      {/* Official Apple M3 MacBook Pro 8K Wallpaper */}
      <AppleWallpaper />

      {/* Desktop Draggable Icons Canvas (≥640px) — Centered Scattered Layout */}
      <div className="hidden sm:block relative w-full h-full">
        {scatteredDesktopItems.map((item, idx) => {
          const initialX = Math.max(
            24,
            Math.min(viewport.vw - 100, centerX + item.dx)
          );
          const initialY = Math.max(
            52,
            Math.min(viewport.vh - 128, centerY + item.dy)
          );
          return (
            <DesktopIcon
              key={item.id}
              id={item.id}
              index={idx}
              bootFinished={bootFinished}
              label={item.label}
              variant={item.variant}
              initialX={initialX}
              initialY={initialY}
              onActivate={item.onActivate}
              href={item.href}
            />
          );
        })}
      </div>

      {/* Mobile Optimized Home Screen Grid (<640px) with Real macOS App Icons */}
      <div className="sm:hidden relative z-10 px-6 pt-8 pb-24 h-full flex flex-col justify-start overflow-y-auto">
        <div className="grid grid-cols-3 gap-x-5 gap-y-6 place-items-center">
          {scatteredDesktopItems.map((item, idx) =>
            item.href ? (
              <motion.a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${item.label}`}
                initial={{ opacity: 0, y: 6 }}
                animate={
                  bootFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
                }
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: bootFinished ? idx * 0.045 : 0,
                }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="w-[64px] h-[64px] active:scale-95 transition-transform duration-150">
                  <MacAppIconGraphic
                    variant={item.variant}
                    label={item.label}
                  />
                </div>
                <span className="text-[11.5px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] tracking-tight text-center">
                  {item.label}
                </span>
              </motion.a>
            ) : (
              <motion.button
                key={item.id}
                type="button"
                onClick={item.onActivate}
                aria-label={`Open ${item.label}`}
                initial={{ opacity: 0, y: 6 }}
                animate={
                  bootFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
                }
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: bootFinished ? idx * 0.045 : 0,
                }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="w-[64px] h-[64px] active:scale-95 transition-transform duration-150">
                  <MacAppIconGraphic
                    variant={item.variant}
                    label={item.label}
                  />
                </div>
                <span className="text-[11.5px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] tracking-tight text-center">
                  {item.label}
                </span>
              </motion.button>
            )
          )}
        </div>
      </div>

      {/* All macOS Application Windows */}
      <AboutWindow />
      <ProjectsWindow />
      <ProjectDetailWindow />
      <ResumeWindow />
      <SkillsWindow />
      <GalleryWindow />
      <ReelWindow />
      <ContactWindow />
      <MusicWindow />
      <MoviesWindow />
      <MangaWindow />
      <CertificationsWindow />
      <ResourcesWindow />
      <AiAgentWindow />

      {/* System Modals, Spotlight Search, Dynamic Pixel Cat & Dock */}
      <AboutThisMacModal />
      <SpotlightModal />
      <PixelCat />
      <Dock bootFinished={bootFinished} />
    </main>
  );
};
