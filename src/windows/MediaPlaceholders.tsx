import React, { useMemo, useState } from 'react';
import {
  Film,
  BookOpen,
  Search,
  ExternalLink,
  FileText,
  X,
} from 'lucide-react';
import { PORTFOLIO_CONTENT, CertificationItem } from '../data/content';
import { Window } from '../components/Window';

export const MoviesWindow: React.FC = () => {
  const { cinema } = PORTFOLIO_CONTENT;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCinema = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return cinema;
    return cinema.filter((item) => item.title.toLowerCase().includes(q));
  }, [cinema, searchQuery]);

  return (
    <Window id="movies">
      <div className="p-6 sm:p-7 space-y-5 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7] min-h-full">
        {/* Top Heading: My Top Picks */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/[0.06] dark:border-white/10">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-[21px] font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                My Top Picks
              </h1>
            </div>
            <p className="text-[13px] text-[#86868b] dark:text-[#98989d] mt-0.5">
              Click any series or show card to open its Google Search results
            </p>
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-[#86868b] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter top picks..."
              aria-label="Filter cinema top picks"
              className="w-full pl-8 pr-6 py-1.5 rounded-lg text-[12.5px] bg-[#f5f5f7] dark:bg-[#2c2c2e] border border-black/[0.06] dark:border-white/10 text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/30"
            />
          </div>
        </div>

        {/* 3-Per-Line Grid of Series & Shows Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {filteredCinema.map((item) => (
            <a
              key={item.id}
              href={item.searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.title} — Search on Google`}
              className="group rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/10 bg-[#fbfbfd] dark:bg-[#242426] hover:border-[#0a84ff]/50 dark:hover:border-[#0a84ff]/60 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              {/* Official Cover Banner Thumbnail */}
              <div className="relative h-52 w-full overflow-hidden bg-[#141416]">
                {/* Subtle blurred atmospheric banner fill behind cover */}
                <img
                  src={item.coverImage}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-45 pointer-events-none"
                />
                {/* Crisp Official Cover Thumbnail */}
                <img
                  src={item.coverImage}
                  alt={item.title}
                  loading="lazy"
                  className="relative z-10 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/15">
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Title Footer */}
              <div className="p-3.5 flex items-center justify-between gap-2 bg-white dark:bg-[#242426]">
                <h3 className="text-[13.5px] font-semibold leading-snug text-[#1d1d1f] dark:text-[#f5f5f7] group-hover:text-[#0a84ff] transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Window>
  );
};

export const MangaWindow: React.FC = () => {
  const { manga } = PORTFOLIO_CONTENT;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredManga = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return manga;
    return manga.filter((item) => item.title.toLowerCase().includes(q));
  }, [manga, searchQuery]);

  return (
    <Window id="manga">
      <div className="p-6 sm:p-7 space-y-5 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7] min-h-full">
        {/* Top Heading: My Top Picks */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/[0.06] dark:border-white/10">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-[21px] font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                My Top Picks
              </h1>
            </div>
            <p className="text-[13px] text-[#86868b] dark:text-[#98989d] mt-0.5">
              Click any manhwa or manga card to open its Google Search results
            </p>
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-[#86868b] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter top picks..."
              aria-label="Filter top picks"
              className="w-full pl-8 pr-6 py-1.5 rounded-lg text-[12.5px] bg-[#f5f5f7] dark:bg-[#2c2c2e] border border-black/[0.06] dark:border-white/10 text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/30"
            />
          </div>
        </div>

        {/* 3-Per-Line Grid of 24 Manhwa & Manga Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {filteredManga.map((item) => (
            <a
              key={item.id}
              href={item.searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.title} — Search on Google`}
              className="group rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/10 bg-[#fbfbfd] dark:bg-[#242426] hover:border-[#0a84ff]/50 dark:hover:border-[#0a84ff]/60 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              {/* Official Cover Banner Thumbnail */}
              <div className="relative h-52 w-full overflow-hidden bg-[#141416]">
                {/* Subtle blurred atmospheric banner fill behind cover */}
                <img
                  src={item.coverImage}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-45 pointer-events-none"
                />
                {/* Crisp Official Cover Thumbnail */}
                <img
                  src={item.coverImage}
                  alt={item.title}
                  loading="lazy"
                  className="relative z-10 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/15">
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Title Footer */}
              <div className="p-3.5 flex items-center justify-between gap-2 bg-white dark:bg-[#242426]">
                <h3 className="text-[13.5px] font-semibold leading-snug text-[#1d1d1f] dark:text-[#f5f5f7] group-hover:text-[#0a84ff] transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Window>
  );
};

const CERT_TABS: (CertificationItem['category'] | 'All')[] = [
  'All',
  'IBM SkillsBuild',
  'Microsoft & Google',
  'Internships & Recognition',
];

export const CertificationsWindow: React.FC = () => {
  const { certifications } = PORTFOLIO_CONTENT;
  const [selectedTab, setSelectedTab] = useState<
    CertificationItem['category'] | 'All'
  >('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewCert, setPreviewCert] = useState<CertificationItem | null>(
    null
  );

  const filteredCerts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return certifications.filter((c) => {
      const matchesTab = selectedTab === 'All' || c.category === selectedTab;
      if (!matchesTab) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    });
  }, [certifications, selectedTab, searchQuery]);

  return (
    <Window id="certifications">
      <div className="p-6 sm:p-7 space-y-5 bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7] min-h-full">
        {/* Top Header + Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-black/[0.06] dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                Certificates & Credentials
              </h1>
            </div>
            <p className="text-[13px] text-[#86868b] dark:text-[#98989d] mt-0.5">
              Verified certifications across IBM SkillsBuild, Microsoft Learn, Google Cloud, and national hackathons
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-56">
            <Search className="w-3.5 h-3.5 text-[#86868b] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter certificates..."
              aria-label="Filter certificates"
              className="w-full pl-8 pr-6 py-1.5 rounded-lg text-[12.5px] bg-[#f5f5f7] dark:bg-[#2c2c2e] border border-black/[0.06] dark:border-white/10 text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/30"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div
          role="tablist"
          aria-label="Certificate categories"
          className="flex flex-wrap items-center gap-1.5"
        >
          {CERT_TABS.map((tab) => {
            const active = selectedTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f]'
                    : 'bg-[#f5f5f7] dark:bg-[#2c2c2e] text-[#6e6e73] dark:text-[#98989d] hover:text-[#1d1d1f] dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Minimalist Certificate Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCerts.map((cert) => (
            <article
              key={cert.id}
              onClick={() => setPreviewCert(cert)}
              className="group rounded-2xl overflow-hidden border border-black/[0.07] dark:border-white/10 bg-white dark:bg-[#2c2c2e] hover:border-black/15 dark:hover:border-white/20 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-40 w-full bg-[#f5f5f7] dark:bg-[#242426] border-b border-black/[0.05] dark:border-white/8 flex items-center justify-center p-3 overflow-hidden">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain rounded-lg group-hover:scale-103 transition-transform duration-200"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-[#86868b] dark:text-[#98989d]">
                    <span className="truncate">{cert.issuer}</span>
                    <span className="font-mono shrink-0">{cert.date}</span>
                  </div>
                  <h3 className="text-[13.5px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mt-1 line-clamp-2 group-hover:text-[#0a84ff] transition-colors">
                    {cert.title}
                  </h3>
                </div>
              </div>

              <div
                className="px-4 pb-3.5 pt-2 border-t border-black/[0.05] dark:border-white/8 flex items-center justify-between text-[11.5px]"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[#86868b] dark:text-[#98989d]">
                  {cert.format}
                </span>

                {cert.pdfUrl ? (
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[#0a84ff] hover:underline"
                  >
                    <FileText className="w-3 h-3" />
                    <span>PDF</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPreviewCert(cert)}
                    className="inline-flex items-center gap-1 font-medium text-[#0a84ff] hover:underline cursor-pointer"
                  >
                    <span>Preview</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Quick Look Certificate Modal */}
        {previewCert && (
          <div
            data-lightbox-open="true"
            onClick={() => setPreviewCert(null)}
            className="fixed inset-0 z-[195] bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full rounded-2xl overflow-hidden bg-white dark:bg-[#242426] border border-black/10 dark:border-white/15 shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-black/[0.06] dark:border-white/10">
                <div className="min-w-0">
                  <h3 className="text-[14.5px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
                    {previewCert.title}
                  </h3>
                  <p className="text-[12px] text-[#86868b] dark:text-[#98989d]">
                    {previewCert.issuer} · {previewCert.date}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewCert(null)}
                  aria-label="Close certificate preview"
                  className="p-1.5 rounded-full hover:bg-black/[0.06] dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 bg-[#f5f5f7] dark:bg-[#1c1c1e] flex items-center justify-center max-h-[65vh] overflow-auto">
                <img
                  src={previewCert.imageUrl}
                  alt={previewCert.title}
                  className="max-h-[58vh] w-auto object-contain rounded-lg shadow-sm"
                />
              </div>

              <div className="px-5 py-3.5 border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between">
                <span className="text-[12px] text-[#86868b] dark:text-[#98989d]">
                  {previewCert.credentialId
                    ? `Credential ID: ${previewCert.credentialId}`
                    : previewCert.category}
                </span>
                {previewCert.pdfUrl && (
                  <a
                    href={previewCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a84ff] hover:bg-[#0070e0] text-white text-xs font-medium transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open Original PDF</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Window>
  );
};
