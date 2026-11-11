import React from 'react';
import { Play } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { isPlaceholderLink } from '../utils/portfolioLogic';
import { Window } from '../components/Window';

export const ReelWindow: React.FC = () => {
  const { reel } = PORTFOLIO_CONTENT;
  const hasVideo = !isPlaceholderLink(reel.videoUrl);

  return (
    <Window id="reel">
      <div className="flex flex-col h-full min-h-[400px] bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7]">
        {hasVideo ? (
          <div className="flex-1 p-5">
            <iframe
              src={reel.videoUrl}
              title={reel.channelName}
              className="w-full h-full min-h-[340px] rounded-xl border border-black/[0.06] dark:border-white/10"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] dark:bg-[#2c2c2e] text-[#86868b] dark:text-[#98989d] flex items-center justify-center mb-3.5">
              <Play className="w-6 h-6 stroke-[1.6] ml-0.5" />
            </div>
            <h2 className="text-[17px] font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
              No Videos
            </h2>
            <p className="text-[13px] text-[#86868b] dark:text-[#98989d] mt-1 max-w-xs leading-relaxed">
              Videos and project clips will appear here once added.
            </p>
          </div>
        )}
      </div>
    </Window>
  );
};
