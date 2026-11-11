import React, { useState } from 'react';
import { X, MapPin, Image as ImageIcon } from 'lucide-react';
import { PORTFOLIO_CONTENT, GalleryItem } from '../data/content';
import { ResilientImage } from '../components/ResilientImage';
import { Window } from '../components/Window';

export const GalleryWindow: React.FC = () => {
  const { gallery } = PORTFOLIO_CONTENT;
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  return (
    <Window id="gallery">
      <div className="p-6 sm:p-7 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7] min-h-full flex flex-col">
        {gallery.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] dark:bg-[#2c2c2e] border border-black/[0.06] dark:border-white/10 flex items-center justify-center mb-3 text-[#86868b] dark:text-[#98989d]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h1 className="text-[15px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
              No Photos Yet
            </h1>
            <p className="text-[12.5px] text-[#86868b] dark:text-[#98989d] mt-1">
              Photos will appear here once added.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <h1 className="text-[20px] font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                Photos
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedPhoto(item)}
                  className="group rounded-2xl overflow-hidden border border-black/[0.07] dark:border-white/10 bg-white dark:bg-[#2c2c2e] text-left hover:border-black/15 dark:hover:border-white/20 transition-all cursor-pointer flex flex-col"
                >
                  <div className="h-44 w-full overflow-hidden bg-[#f5f5f7] dark:bg-[#242426]">
                    <ResilientImage
                      src={item.imageUrl}
                      alt={item.title}
                      titleForInitials={item.title}
                      gradientClassName={item.fallbackGradient}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3.5">
                    <div className="text-[13.5px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
                      {item.title}
                    </div>
                    <div className="text-[12px] text-[#86868b] dark:text-[#98989d] line-clamp-1 mt-0.5">
                      {item.caption}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedPhoto && (
          <div
            data-lightbox-open="true"
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[190] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-2xl overflow-hidden bg-white dark:bg-[#242426] border border-white/15 shadow-2xl"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-black/[0.06] dark:border-white/10">
                <div>
                  <h2 className="text-[14px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                    {selectedPhoto.title}
                  </h2>
                  <div className="flex items-center gap-1 text-[11.5px] text-[#86868b] dark:text-[#98989d]">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedPhoto.location}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Close photo preview"
                  className="p-1.5 rounded-full hover:bg-black/[0.06] dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>
              <div className="px-4 py-3 text-[13px] text-[#6e6e73] dark:text-[#a1a1a6]">
                {selectedPhoto.caption}
              </div>
            </div>
          </div>
        )}
      </div>
    </Window>
  );
};
