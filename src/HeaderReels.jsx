import React, { useCallback, useEffect, useRef, useState } from 'react';

const REEL_URLS = [
  'https://www.duroflexworld.com/cdn/shop/files/quinn_okircxgun9u10td4r6qc6g0z.mp4#t=0.1',
  'https://www.duroflexworld.com/cdn/shop/files/quinn_jsgq5vyye1dmilj7zne9rnzt.mp4#t=0.1',
  'https://www.duroflexworld.com/cdn/shop/files/quinn_lmznryqrwzauev3s397avtn4.mp4#t=0.1',
  'https://www.duroflexworld.com/cdn/shop/files/quinn_wes92m2vvgwc4en2nloqw41x.mp4#t=0.1',
  'https://www.duroflexworld.com/cdn/shop/files/quinn_gvww4nhiqe5br78eh2oj54vn.mp4#t=0.1',
  'https://www.duroflexworld.com/cdn/shop/files/quinn_djau6vfis9hyb11kyk40m2bd.mp4#t=0.1',
  'https://www.duroflexworld.com/cdn/shop/files/quinn_dxgxo8wni5yeqmj4e0juw7bx.mp4#t=0.1',
];

const REEL_CAPTIONS = [
  'Designed to destress — sleep better tonight.',
  'Duroflex mattresses · trusted since 1963.',
  'Wake up refreshed with Duropedic comfort.',
  'Natural Living range · eco-conscious sleep.',
  'Airboost layers · breathable, supportive rest.',
  '100-night trial on select mattresses.',
  'Shop the reel — your next mattress is here.',
  'Premium comfort, crafted for Indian homes.',
  'Relax deeper. Live brighter.',
  'Where engineering meets a good night’s sleep.',
];

function pickCaption() {
  return REEL_CAPTIONS[Math.floor(Math.random() * REEL_CAPTIONS.length)];
}

function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function IconChevronUp({ className = 'text-gray-600' }) {
  return (
    <svg className={className} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronDown({ className = 'text-gray-600' }) {
  return (
    <svg className={className} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
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
      preload="auto"
      className="h-full w-full object-cover scale-110"
    />
  );
}

export default function HeaderReels() {
  const n = REEL_URLS.length;
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [caption, setCaption] = useState('');
  const [muted, setMuted] = useState(true);
  const viewerVideoRef = useRef(null);
  const touchStartY = useRef(null);

  const goPrev = useCallback(() => {
    setViewerIndex((i) => (i - 1 + n) % n);
    setCaption(pickCaption());
  }, [n]);

  const goNext = useCallback(() => {
    setViewerIndex((i) => (i + 1) % n);
    setCaption(pickCaption());
  }, [n]);

  const openViewer = (i) => {
    setViewerIndex(i);
    setCaption(pickCaption());
    setMuted(true);
    setViewerOpen(true);
  };

  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setViewerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [viewerOpen]);

  useEffect(() => {
    if (!viewerOpen) return;
    const v = viewerVideoRef.current;
    if (!v) return;
    v.muted = muted;
    v.play().catch(() => {});
  }, [viewerOpen, viewerIndex, muted]);

  const onViewerTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const onViewerTouchEnd = (e) => {
    if (touchStartY.current == null) return;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartY.current = null;
    if (dy > 56) goPrev();
    else if (dy < -56) goNext();
  };

  return (
    <>
      <section
        className="w-full bg-white border-b border-gray-100"
        aria-labelledby="header-reels-heading"
      >
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-3 pt-3 pb-0">
          <h2
            id="header-reels-heading"
            className="text-center text-lg sm:text-xl font-semibold text-gray-900 tracking-tight mb-2 sm:mb-3"
          >
            Duroflex reels
          </h2>
          <div className="flex gap-2 sm:gap-3 justify-start sm:justify-center overflow-x-auto scrollbar-hide snap-x snap-mandatory py-1">
            {REEL_URLS.map((url, i) => (
              <button
                key={url}
                type="button"
                onClick={() => openViewer(i)}
                className={`relative shrink-0 h-[76px] w-[76px] sm:h-[92px] sm:w-[92px] rounded-full overflow-hidden snap-start shadow-md ring-2 transition-transform hover:scale-[1.04] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB2A20] focus-visible:ring-offset-2 ${
                  i === viewerIndex && viewerOpen ? 'ring-[#DB2A20]' : 'ring-gray-200'
                }`}
                aria-label={`Open reel ${i + 1}`}
              >
                <CircleStripVideo src={url} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {viewerOpen && (
        <div
          className="fixed inset-0 z-200 flex flex-col bg-white/88 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Reels viewer"
        >
          <div className="shrink-0 flex items-center justify-between px-3 py-2 pt-[max(0.5rem,env(safe-area-inset-top))] border-b border-gray-200/80 bg-white/70">
            <button
              type="button"
              onClick={() => setViewerOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-800 hover:bg-gray-200/80"
              aria-label="Close reels"
            >
              <IconClose />
            </button>
            <span className="text-gray-700 text-sm font-medium tabular-nums">
              {viewerIndex + 1} / {n}
            </span>
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-800 bg-gray-200/90 hover:bg-gray-300/90"
            >
              {muted ? 'Sound on' : 'Mute'}
            </button>
          </div>

          <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-3 py-2">
            <div
              className="relative w-full max-w-sm flex-1 min-h-[200px] max-h-[min(72dvh,calc(100vh-11rem))] flex items-center justify-center touch-pan-y"
              onTouchStart={onViewerTouchStart}
              onTouchEnd={onViewerTouchEnd}
            >
              <div className="relative h-full aspect-[9/16] max-h-full mx-auto rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200/80 bg-gray-100">
                <video
                  ref={viewerVideoRef}
                  key={viewerIndex}
                  src={REEL_URLS[viewerIndex]}
                  className="h-full w-full object-cover sm:object-contain"
                  playsInline
                  loop
                  muted={muted}
                />
              </div>

              <button
                type="button"
                onClick={goPrev}
                className="absolute left-0 top-0 bottom-0 w-[26%] max-w-[120px] z-10 opacity-0"
                aria-label="Previous reel"
              />
              <button
                type="button"
                onClick={goNext}
                className="absolute right-0 top-0 bottom-0 w-[26%] max-w-[120px] z-10 opacity-0"
                aria-label="Next reel"
              />

              <div className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2 pointer-events-none opacity-60">
                <IconChevronUp />
                <IconChevronDown />
              </div>
            </div>

            {caption ? (
              <p className="mt-2 mb-1 max-w-md text-center text-sm text-gray-700 font-medium leading-snug px-4">
                {caption}
              </p>
            ) : null}
          </div>

          <div className="shrink-0 flex justify-center gap-5 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 border-t border-gray-200/80 bg-white/70">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200/90 text-gray-800 hover:bg-gray-300/90"
              aria-label="Previous reel"
            >
              <IconChevronUp className="text-gray-800" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200/90 text-gray-800 hover:bg-gray-300/90"
            >
              <IconChevronDown className="text-gray-800" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
