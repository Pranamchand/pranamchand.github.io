import React from 'react';

export const AppleWallpaper: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0a0c]"
    >
      <img
        src="/assets/aistudio/M3-MacBook-Pro-Wallpaper-8K_88fe2834.png"
        alt=""
        draggable={false}
        className="w-full h-full object-cover object-center select-none"
      />
    </div>
  );
};
