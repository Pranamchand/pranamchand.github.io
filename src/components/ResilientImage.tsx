import React, { useEffect, useState } from 'react';
import { getProjectInitials } from '../utils/portfolioLogic';

interface ResilientImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  titleForInitials?: string;
  className?: string;
  imgClassName?: string;
  gradientClassName?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  fallbackSrc,
  alt,
  titleForInitials,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  gradientClassName = 'from-[#0a84ff] via-indigo-600 to-slate-900',
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasFailed, setHasFailed] = useState<boolean>(
    !src || src.startsWith('[ADD')
  );

  useEffect(() => {
    setCurrentSrc(src);
    setHasFailed(!src || src.startsWith('[ADD'));
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc && !fallbackSrc.startsWith('[ADD')) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasFailed(true);
    }
  };

  if (hasFailed) {
    const initials = getProjectInitials(titleForInitials || alt || 'PC');
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br ${gradientClassName} text-white select-none overflow-hidden ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_60%)]" />
        <span className="relative z-10 font-mono text-lg font-bold tracking-wider">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={handleError}
        className={imgClassName}
      />
    </div>
  );
};
