import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SCRAPSHALA_SHOP_VIDEOS } from './scrapshalaShopVideos';

const REEL_URLS = SCRAPSHALA_SHOP_VIDEOS;

/** One line per reel — stable copy (no random shuffle on navigation) */
const REEL_CAPTIONS = [
  'Upcycled with love — giving waste a second life.',
  'Scrapshala · crafted from what others throw away.',
  'Eco-friendly products for everyday living.',
  'As seen on Shark Tank India 🦈',
  'Handcrafted bags from upcycled newspapers & tyres.',
  'Sustainable gifting starts here.',
  'Zero waste, full style.',
  'Every product tells a story of reuse.',
];

const BRAND_ACCENT = '#DB2A20';

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function IconVolumeOn() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinejoin="round" />
      <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" strokeLinecap="round" />
    </svg>
  );
}

function IconVolumeOff() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinejoin="round" />
      <path d="M23 9l-6 6M17 9l6 6" strokeLinecap="round" />
    </svg>
  );
}

function IconChevronLeft({ className = '' }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight({ className = '' }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CircleStripVideo({ src }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener('canplay', tryPlay, { once: true });
    return () => v.removeEventListener('canplay', tryPlay);
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      loop
      autoPlay
      preload="metadata"
      className="h-full w-full object-cover scale-110"
    />
  );
}

export default function HeaderReels() {
  const n = REEL_URLS.length;
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const viewerVideoRef = useRef(null);
  const touchStartY = useRef(null);
  const touchStartX = useRef(null);
  const goPrev = useCallback(() => {
    setViewerIndex((i) => (i - 1 + n) % n);
  }, [n]);

  const goNext = useCallback(() => {
    setViewerIndex((i) => (i + 1) % n);
  }, [n]);

  const openViewer = (i) => {
    setViewerIndex(i);
    setMuted(true);
    setViewerOpen(true);
  };

  const caption = REEL_CAPTIONS[viewerIndex % REEL_CAPTIONS.length] ?? REEL_CAPTIONS[0];

  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setViewerOpen(false);
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [viewerOpen, goPrev, goNext]);

  useEffect(() => {
    if (!viewerOpen) return;
    const v = viewerVideoRef.current;
    if (!v) return;
    v.muted = muted;
    v.play().catch(() => {});
  }, [viewerOpen, viewerIndex, muted]);

  const onViewerTouchStart = (e) => {
    const t = e.touches[0];
    touchStartY.current = t.clientY;
    touchStartX.current = t.clientX;
  };

  const onViewerTouchEnd = (e) => {
    if (touchStartY.current == null || touchStartX.current == null) return;
    const t = e.changedTouches[0];
    const dy = t.clientY - touchStartY.current;
    const dx = t.clientX - touchStartX.current;
    touchStartY.current = null;
    touchStartX.current = null;

    const threshold = 44;
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;

    if (Math.abs(dx) >= Math.abs(dy)) {
      if (dx < -threshold) goNext();
      else if (dx > threshold) goPrev();
    } else {
      if (dy < -threshold) goNext();
      else if (dy > threshold) goPrev();
    }
  };

  return (
    <>
      <section
        className="w-full border-b border-stone-200/90 bg-gradient-to-b from-white to-stone-50/80"
        aria-labelledby="header-reels-heading"
      >
        <div className="mx-auto w-full max-w-6xl px-3 pb-3 pt-4 sm:px-4 sm:pb-4 sm:pt-5">
          <div className="mb-3 flex flex-col items-center gap-0.5 sm:mb-4">
            <h2
              id="header-reels-heading"
              className="text-center text-base font-semibold tracking-tight text-stone-900 sm:text-lg"
            >
              Scrapshala reels
            </h2>
            <p className="text-center text-xs text-stone-500 sm:text-[13px]">
              Tap a story to watch — swipe or use arrows to browse
            </p>
          </div>
          <div className="flex snap-x snap-mandatory justify-start gap-2.5 overflow-x-auto py-1 scrollbar-hide sm:justify-center sm:gap-3.5">
            {REEL_URLS.map((url, i) => (
              <button
                key={url}
                type="button"
                onClick={() => openViewer(i)}
                className={`group relative h-[78px] w-[78px] shrink-0 snap-start overflow-hidden rounded-full shadow-md transition-all duration-200 hover:scale-[1.06] hover:shadow-lg active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB2A20] focus-visible:ring-offset-2 sm:h-[92px] sm:w-[92px] ${
                  i === viewerIndex && viewerOpen
                    ? 'ring-[3px] ring-[#DB2A20] ring-offset-2 ring-offset-white'
                    : 'ring-2 ring-stone-200/90 ring-offset-0 hover:ring-stone-300'
                }`}
                aria-label={`Watch reel ${i + 1} of ${n}`}
              >
                <CircleStripVideo src={url} />
                <span
                  className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-stone-900 shadow-lg backdrop-blur-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5" aria-hidden>
                      <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {viewerOpen && (
        <div
          className="fixed inset-0 z-[220] flex items-end justify-center sm:items-center sm:p-6"
          role="presentation"
        >
          {/* Backdrop — light frost so the page still reads through; avoids a heavy “black veil” */}
          <button
            type="button"
            className="absolute inset-0 cursor-default border-0 bg-gradient-to-b from-white/80 via-stone-100/82 to-stone-300/55 backdrop-blur-2xl backdrop-saturate-150"
            aria-label="Close reels"
            onClick={() => setViewerOpen(false)}
          />

          {/* Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Scrapshala reels"
            className="relative z-10 flex w-full max-w-[min(100%,420px)] flex-col sm:max-h-[min(92dvh,880px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto w-full px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-0 sm:pb-0 sm:pt-0">
              <div
                className="relative mx-auto overflow-hidden rounded-[1.65rem] bg-stone-950 shadow-[0_32px_100px_-24px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.12)] ring-1 ring-white/10"
                style={{ maxHeight: 'min(78dvh, 720px)' }}
              >
                {/* Top gradient + controls */}
                <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 bg-gradient-to-b from-black/75 via-black/35 to-transparent pb-16 pt-3">
                  <div className="pointer-events-auto flex items-center justify-between px-3 sm:px-4">
                    <div className="flex min-w-0 items-center gap-2">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-inner"
                        style={{ background: `linear-gradient(145deg, ${BRAND_ACCENT}, #b91f18)` }}
                      >
                        D
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white drop-shadow-sm">Scrapshala</p>
                        <p className="text-[11px] font-medium text-white/75">
                          Reel {viewerIndex + 1} of {n}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setMuted((m) => !m)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
                        aria-label={muted ? 'Unmute video' : 'Mute video'}
                      >
                        {muted ? <IconVolumeOff /> : <IconVolumeOn />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewerOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
                        aria-label="Close"
                      >
                        <IconClose />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Video + gestures */}
                <div
                  className="relative aspect-[9/16] w-full max-h-[min(78dvh,720px)] touch-none"
                  onTouchStart={onViewerTouchStart}
                  onTouchEnd={onViewerTouchEnd}
                >
                  <video
                    ref={viewerVideoRef}
                    key={viewerIndex}
                    src={REEL_URLS[viewerIndex]}
                    className="pointer-events-none h-full w-full object-cover"
                    playsInline
                    loop
                    muted={muted}
                  />

                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute bottom-0 left-0 top-0 z-10 w-[30%] max-w-[140px] bg-transparent opacity-0"
                    aria-label="Previous reel"
                  />
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute bottom-0 right-0 top-0 z-10 w-[30%] max-w-[140px] bg-transparent opacity-0"
                    aria-label="Next reel"
                  />

                  {/* Visible chevrons — desktop */}
                  <div className="pointer-events-none absolute left-2 top-1/2 hidden -translate-y-1/2 z-[11] sm:block">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white/90 backdrop-blur-md">
                      <IconChevronLeft />
                    </span>
                  </div>
                  <div className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 z-[11] sm:block">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white/90 backdrop-blur-md">
                      <IconChevronRight />
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 pb-5 pt-14">
                  <p className="pointer-events-none text-center text-[13px] font-medium leading-snug text-white/95 sm:text-sm">
                    {caption}
                  </p>
                  <p className="pointer-events-none mt-2 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
                    Swipe · Arrow keys · Tap edges
                  </p>
                </div>
              </div>

              {/* Dots */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 px-2">
                {REEL_URLS.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    type="button"
                    onClick={() => setViewerIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === viewerIndex
                        ? 'w-6 bg-stone-800'
                        : 'w-1.5 bg-stone-400/60 hover:bg-stone-500/70'
                    }`}
                    aria-label={`Go to reel ${i + 1}`}
                  />
                ))}
              </div>

              <div className="mt-3 hidden items-center justify-center gap-3 sm:flex">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300/90 bg-white/90 px-4 py-2 text-sm font-semibold text-stone-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                >
                  <IconChevronLeft className="opacity-90" />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-300/90 bg-white/90 px-4 py-2 text-sm font-semibold text-stone-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                >
                  Next
                  <IconChevronRight className="opacity-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
