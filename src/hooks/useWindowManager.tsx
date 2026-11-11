import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ProjectCategory, WindowId } from '../data/content';
import { clampWindowPosition } from '../utils/portfolioLogic';
import {
  playMacSound,
  setMacSoundEnabled,
} from '../utils/macSoundEffects';

export interface MacNotificationItem {
  id: string;
  title: string;
  subtitle: string;
  iconUrl?: string;
}

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

interface WindowManagerContextValue {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  selectedProjectId: string;
  projectsInitialCategory: ProjectCategory;
  projectsInitialFolderId: 'dashboard-folder' | 'eda-folder' | null;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  activeNotification: MacNotificationItem | null;
  pushNotification: (
    title: string,
    subtitle: string,
    iconUrl?: string
  ) => void;
  dismissNotification: () => void;
  isAboutMacOpen: boolean;
  isSpotlightOpen: boolean;
  isCatEnabled: boolean;
  bouncingAppId: WindowId | null;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  toggleMaximizeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updateWindowPosition: (id: WindowId, x: number, y: number) => void;
  openProjectDetail: (projectId: string) => void;
  openProjectsFolder: (
    folderId: 'dashboard-folder' | 'eda-folder' | null,
    category?: ProjectCategory
  ) => void;
  setIsAboutMacOpen: (open: boolean) => void;
  setIsSpotlightOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCatEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const WindowManagerContext = createContext<WindowManagerContextValue | null>(
  null
);

function getCenteredPosition(
  width: number,
  height: number,
  offsetX = 0,
  offsetY = 0
): { x: number; y: number } {
  if (typeof window === 'undefined') {
    return { x: 240 + offsetX, y: 72 + offsetY };
  }
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const rawX = Math.max(24, Math.round((vw - width) / 2) + offsetX);
  const rawY = Math.max(44, Math.round((vh - height - 60) / 2) + offsetY);
  return clampWindowPosition(rawX, rawY, vw, vh, width);
}

const INITIAL_WINDOWS: Record<WindowId, Omit<WindowState, 'position'>> = {
  about: {
    id: 'about',
    title: 'About Me — Pranam Chand',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 20,
    defaultSize: { width: 980, height: 615 },
  },
  projects: {
    id: 'projects',
    title: 'Projects — Finder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 15,
    defaultSize: { width: 960, height: 620 },
  },
  'project-detail': {
    id: 'project-detail',
    title: 'Case Study — Project Detail',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 16,
    defaultSize: { width: 840, height: 610 },
  },
  resume: {
    id: 'resume',
    title: 'Resume',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 14,
    defaultSize: { width: 820, height: 620 },
  },
  skills: {
    id: 'skills',
    title: 'Skills & Tools — System Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 13,
    defaultSize: { width: 800, height: 560 },
  },
  gallery: {
    id: 'gallery',
    title: 'Photos — Gallery',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 12,
    defaultSize: { width: 860, height: 580 },
  },
  reel: {
    id: 'reel',
    title: 'Video — Player',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11,
    defaultSize: { width: 740, height: 500 },
  },
  contact: {
    id: 'contact',
    title: 'Mail — New Message to Pranam Chand',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    defaultSize: { width: 800, height: 540 },
  },
  music: {
    id: 'music',
    title: 'Music — Now Playing',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    defaultSize: { width: 420, height: 470 },
  },
  movies: {
    id: 'movies',
    title: 'Cinema — My Top Picks',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    defaultSize: { width: 880, height: 610 },
  },
  manga: {
    id: 'manga',
    title: 'Manwha & Manga — My Top Picks',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    defaultSize: { width: 880, height: 610 },
  },
  certifications: {
    id: 'certifications',
    title: 'Certifications — Credentials & PDFs',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    defaultSize: { width: 880, height: 600 },
  },
  resources: {
    id: 'resources',
    title: 'Resources — Learning & Data Links',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 8,
    defaultSize: { width: 740, height: 520 },
  },
  'ai-agent': {
    id: 'ai-agent',
    title: 'Arther',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 22,
    defaultSize: { width: 450, height: 560 },
  },
};

const WINDOW_OFFSETS: Record<WindowId, { x: number; y: number }> = {
  about: { x: 0, y: -10 },
  projects: { x: 24, y: 12 },
  'project-detail': { x: 48, y: 24 },
  resume: { x: -28, y: 16 },
  skills: { x: 18, y: -14 },
  gallery: { x: -20, y: 20 },
  reel: { x: 30, y: 10 },
  contact: { x: -16, y: 18 },
  music: { x: 120, y: -20 },
  movies: { x: -24, y: -12 },
  manga: { x: 24, y: -12 },
  certifications: { x: 12, y: -8 },
  resources: { x: -36, y: 26 },
  'ai-agent': { x: 0, y: -6 },
};

export function WindowManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(() => {
    const result = {} as Record<WindowId, WindowState>;
    (Object.keys(INITIAL_WINDOWS) as WindowId[]).forEach((id) => {
      const cfg = INITIAL_WINDOWS[id];
      const offset = WINDOW_OFFSETS[id];
      result[id] = {
        ...cfg,
        position: getCenteredPosition(
          cfg.defaultSize.width,
          cfg.defaultSize.height,
          offset.x,
          offset.y
        ),
      };
    });
    return result;
  });

  const [, setHighestZ] = useState<number>(25);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    'apple-global-retail-analytics'
  );
  const [projectsInitialCategory, setProjectsInitialCategory] =
    useState<ProjectCategory>('Featured');
  const [projectsInitialFolderId, setProjectsInitialFolderId] = useState<
    'dashboard-folder' | 'eda-folder' | null
  >(null);
  const [isAboutMacOpen, setIsAboutMacOpen] = useState<boolean>(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState<boolean>(false);
  const [isCatEnabled, setIsCatEnabled] = useState<boolean>(true);
  const [bouncingAppId, setBouncingAppId] = useState<WindowId | null>(null);

  // Default to White (light) mode when the app opens
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [activeNotification, setActiveNotification] =
    useState<MacNotificationItem | null>(null);

  const toggleTheme = useCallback(() => {
    playMacSound('toggle');
    setIsDark((prev) => !prev);
  }, []);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => {
      const next = !prev;
      setMacSoundEnabled(next);
      if (next) {
        playMacSound('notification');
      }
      return next;
    });
  }, []);

  const dismissNotification = useCallback(() => {
    setActiveNotification(null);
  }, []);

  const pushNotification = useCallback(
    (title: string, subtitle: string, iconUrl?: string) => {
      playMacSound('notification');
      const id = `notif-${Date.now()}`;
      setActiveNotification({ id, title, subtitle, iconUrl });
    },
    []
  );

  useEffect(() => {
    if (!activeNotification) return;
    const timer = window.setTimeout(() => {
      setActiveNotification((curr) =>
        curr?.id === activeNotification.id ? null : curr
      );
    }, 3600);
    return () => window.clearTimeout(timer);
  }, [activeNotification]);

  // Global tactile macOS click sound for interactive buttons, links, tabs, and switches
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'button, a[href], [role="button"], [role="tab"], [role="switch"]'
      ) as HTMLElement | null;
      if (!interactive) return;
      if (interactive.hasAttribute('disabled')) return;
      if (interactive.getAttribute('role') === 'switch') {
        playMacSound('toggle');
      } else {
        playMacSound('click');
      }
    };
    document.addEventListener('click', handleGlobalClick, true);
    return () => document.removeEventListener('click', handleGlobalClick, true);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Re-clamp windows on viewport resize so no window title bar gets lost off-screen
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setWindows((prev) => {
        const next = { ...prev };
        (Object.keys(next) as WindowId[]).forEach((id) => {
          const w = next[id];
          next[id] = {
            ...w,
            position: clampWindowPosition(
              w.position.x,
              w.position.y,
              vw,
              vh,
              w.defaultSize.width
            ),
          };
        });
        return next;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerBounce = useCallback((id: WindowId) => {
    setBouncingAppId(id);
    setTimeout(() => {
      setBouncingAppId((curr) => (curr === id ? null : curr));
    }, 650);
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setHighestZ((prevZ) => {
      const nextZ = prevZ + 1;
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          zIndex: nextZ,
        },
      }));
      return nextZ;
    });
  }, []);

  const openWindow = useCallback(
    (id: WindowId) => {
      playMacSound('open');
      triggerBounce(id);
      setHighestZ((prevZ) => {
        const nextZ = prevZ + 1;
        setWindows((prev) => {
          const target = prev[id];
          const offset = WINDOW_OFFSETS[id];
          const pos = !target.isOpen
            ? getCenteredPosition(
                target.defaultSize.width,
                target.defaultSize.height,
                offset.x,
                offset.y
              )
            : target.position;
          return {
            ...prev,
            [id]: {
              ...target,
              isOpen: true,
              isMinimized: false,
              zIndex: nextZ,
              position: pos,
            },
          };
        });
        return nextZ;
      });
    },
    [triggerBounce]
  );

  const closeWindow = useCallback((id: WindowId) => {
    playMacSound('close');
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    }));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    playMacSound('minimize');
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
        isMaximized: false,
      },
    }));
  }, []);

  const toggleMaximizeWindow = useCallback((id: WindowId) => {
    playMacSound('toggle');
    setHighestZ((prevZ) => {
      const nextZ = prevZ + 1;
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isMaximized: !prev[id].isMaximized,
          isMinimized: false,
          zIndex: nextZ,
        },
      }));
      return nextZ;
    });
  }, []);

  const updateWindowPosition = useCallback(
    (id: WindowId, x: number, y: number) => {
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
      setWindows((prev) => {
        const w = prev[id];
        const clamped = clampWindowPosition(x, y, vw, vh, w.defaultSize.width);
        return {
          ...prev,
          [id]: {
            ...w,
            position: clamped,
          },
        };
      });
    },
    []
  );

  const openProjectDetail = useCallback(
    (projectId: string) => {
      setSelectedProjectId(projectId);
      openWindow('project-detail');
    },
    [openWindow]
  );

  const openProjectsFolder = useCallback(
    (
      folderId: 'dashboard-folder' | 'eda-folder' | null,
      category: ProjectCategory = 'Featured'
    ) => {
      setProjectsInitialFolderId(folderId);
      setProjectsInitialCategory(category);
      openWindow('projects');
    },
    [openWindow]
  );

  const activeWindowId = useMemo<WindowId | null>(() => {
    const openVisible = (Object.values(windows) as WindowState[]).filter(
      (w) => w.isOpen && !w.isMinimized
    );
    if (openVisible.length === 0) return null;
    return openVisible.reduce((top, curr) =>
      curr.zIndex > top.zIndex ? curr : top
    ).id;
  }, [windows]);

  // Global keyboard shortcuts: Cmd+Space / Ctrl+Space / Cmd+K toggles Spotlight; Escape closes modals/windows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        (e.code === 'Space' || e.key === ' ' || e.key.toLowerCase() === 'k')
      ) {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
        return;
      }

      if (e.key === 'Escape') {
        if (isSpotlightOpen) {
          setIsSpotlightOpen(false);
          return;
        }
        if (isAboutMacOpen) {
          setIsAboutMacOpen(false);
          return;
        }
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        if (document.querySelector('[data-lightbox-open="true"]')) return;
        if (activeWindowId) {
          closeWindow(activeWindowId);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWindowId, closeWindow, isAboutMacOpen, isSpotlightOpen]);

  const value = useMemo(
    () => ({
      windows,
      activeWindowId,
      selectedProjectId,
      projectsInitialCategory,
      projectsInitialFolderId,
      isDark,
      setIsDark,
      toggleTheme,
      isSoundEnabled,
      toggleSound,
      activeNotification,
      pushNotification,
      dismissNotification,
      isAboutMacOpen,
      isSpotlightOpen,
      isCatEnabled,
      bouncingAppId,
      openWindow,
      closeWindow,
      minimizeWindow,
      toggleMaximizeWindow,
      focusWindow,
      updateWindowPosition,
      openProjectDetail,
      openProjectsFolder,
      setIsAboutMacOpen,
      setIsSpotlightOpen,
      setIsCatEnabled,
    }),
    [
      windows,
      activeWindowId,
      selectedProjectId,
      projectsInitialCategory,
      projectsInitialFolderId,
      isDark,
      toggleTheme,
      isSoundEnabled,
      toggleSound,
      activeNotification,
      pushNotification,
      dismissNotification,
      isAboutMacOpen,
      isSpotlightOpen,
      isCatEnabled,
      bouncingAppId,
      openWindow,
      closeWindow,
      minimizeWindow,
      toggleMaximizeWindow,
      focusWindow,
      updateWindowPosition,
      openProjectDetail,
      openProjectsFolder,
    ]
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager(): WindowManagerContextValue {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error(
      'useWindowManager must be used inside a WindowManagerProvider'
    );
  }
  return ctx;
}
