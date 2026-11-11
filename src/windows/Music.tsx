import React from 'react';
import { Music2 } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { Window } from '../components/Window';

export const MusicWindow: React.FC = () => {
  const { tracks } = PORTFOLIO_CONTENT.music;

  return (
    <Window id="music">
      <div className="flex flex-col h-full min-h-[360px] bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7]">
        {tracks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] dark:bg-[#2c2c2e] text-[#86868b] dark:text-[#98989d] flex items-center justify-center mb-3.5">
              <Music2 className="w-6 h-6 stroke-[1.6]" />
            </div>
            <h2 className="text-[17px] font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
              No Music
            </h2>
            <p className="text-[13px] text-[#86868b] dark:text-[#98989d] mt-1 max-w-xs leading-relaxed">
              Favourite tracks and playlists will appear here once added.
            </p>
          </div>
        ) : (
          <div className="p-5 divide-y divide-black/[0.06] dark:divide-white/10">
            {tracks.map((item) => (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between text-[13.5px]"
              >
                <div>
                  <div className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
                    {item.title}
                  </div>
                  <div className="text-[12px] text-[#86868b] dark:text-[#98989d]">
                    {item.artist}
                  </div>
                </div>
                <span className="font-mono text-[12px] text-[#86868b] dark:text-[#98989d]">
                  {item.duration}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Window>
  );
};
