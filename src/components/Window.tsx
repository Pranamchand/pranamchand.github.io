import React, { useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { WindowId } from '../data/content';
import { useWindowManager } from '../hooks/useWindowManager';

interface WindowProps {
  id: WindowId;
  children: React.ReactNode;
  hideTitleText?: boolean;
  headerRight?: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  id,
  children,
  hideTitleText = false,
  headerRight,
}) => {
  const {
    windows,
    activeWindowId,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    updateWindowPosition,
  } = useWindowManager();

  const win = windows[id];
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement | null>(null);

  if (!win) return null;

  const isVisible = win.isOpen && !win.isMinimized;
  const isActive = activeWindowId === id;

  const handlePointerDownHeader = (e: React.PointerEvent) => {
    focusWindow(id);
    if (!win.isMaximized) {
      dragControls.start(e);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          ref={windowRef}
          role="dialog"
          aria-label={win.title}
          drag={!win.isMaximized}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (!win.isMaximized) {
              updateWindowPosition(
                id,
                win.position.x + info.offset.x,
                win.position.y + info.offset.y
              );
            }
          }}
          onMouseDown={() => focusWindow(id)}
          initial={{
            opacity: 0,
            scale: 0.95,
            x: win.isMaximized ? 0 : win.position.x,
            y: win.isMaximized ? 36 : win.position.y,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: win.isMaximized ? 0 : win.position.x,
            y: win.isMaximized ? 36 : win.position.y,
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            transition: { duration: 0.14 },
          }}
          transition={{
            type: 'spring',
            stiffness: 420,
            damping: 32,
          }}
          style={{
            zIndex: win.zIndex,
            position: 'fixed',
            top: 0,
            left: 0,
            width: win.isMaximized
              ? '100vw'
              : `min(${win.defaultSize.width}px, calc(100vw - 24px))`,
            height: win.isMaximized
              ? 'calc(100vh - 110px)'
              : `min(${win.defaultSize.height}px, calc(100vh - 124px))`,
          }}
          className={`flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7] border transition-shadow ${
            isActive
              ? 'border-black/12 dark:border-white/15 shadow-[0_26px_70px_rgba(0,0,0,0.38)]'
              : 'border-black/8 dark:border-white/10 shadow-[0_14px_40px_rgba(0,0,0,0.22)]'
          }`}
        >
          {/* macOS Window Title Bar */}
          <header
            onPointerDown={handlePointerDownHeader}
            onDoubleClick={() => toggleMaximizeWindow(id)}
            className="h-11 px-4 flex items-center justify-between gap-3 bg-white dark:bg-[#1c1c1e] border-b border-black/[0.06] dark:border-white/10 shrink-0 select-none cursor-grab active:cursor-grabbing"
          >
            {/* Traffic Light Controls */}
            <div
              className="flex items-center gap-2 shrink-0"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => closeWindow(id)}
                aria-label={`Close ${win.title}`}
                className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/10 flex items-center justify-center group cursor-pointer"
              >
                <X className="w-2 h-2 text-black/75 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                type="button"
                onClick={() => minimizeWindow(id)}
                aria-label={`Minimize ${win.title}`}
                className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/10 flex items-center justify-center group cursor-pointer"
              >
                <Minus className="w-2 h-2 text-black/75 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                type="button"
                onClick={() => toggleMaximizeWindow(id)}
                aria-label={`Maximize ${win.title}`}
                className="w-3 h-3 rounded-full bg-[#28c840] border border-black/10 flex items-center justify-center group cursor-pointer"
              >
                <Maximize2 className="w-2 h-2 text-black/75 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Center Window Title */}
            {!hideTitleText ? (
              <div className="text-[13px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate text-center">
                {win.title}
              </div>
            ) : (
              <div />
            )}

            {/* Optional Right Action Slot */}
            <div
              className="flex items-center justify-end min-w-[52px] shrink-0"
              onPointerDown={(e) => e.stopPropagation()}
            >
              {headerRight}
            </div>
          </header>

          {/* Scrollable Window Body */}
          <div className="flex-1 overflow-y-auto mac-scroll bg-white dark:bg-[#1c1c1e]">
            {children}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
