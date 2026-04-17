import React, { useState, useEffect, useCallback } from 'react';
import './PhotoGallery.css';

import g1  from './assets/photo_gallary/scrapshala_1761480533_3751893106967916003_2996941590.jpeg';
import g2  from './assets/photo_gallary/scrapshala_1764068734_3773604510154350485_2996941590.jpeg';
import g3  from './assets/photo_gallary/scrapshala_1764068734_3773604510162738155_2996941590.jpeg';
import g4  from './assets/photo_gallary/scrapshala_1764068734_3773604510330503291_2996941590.jpeg';
import g5  from './assets/photo_gallary/scrapshala_1767090866_3798955994618200420_2996941590.jpeg';
import g6  from './assets/photo_gallary/scrapshala_1767090866_3798955994802811719_2996941590.jpeg';
import g7  from './assets/photo_gallary/scrapshala_1767090866_3798955994853082447_2996941590.jpeg';
import g8  from './assets/photo_gallary/scrapshala_1767883325_3805603617659879593_2996941590.jpeg';
import g9  from './assets/photo_gallary/scrapshala_1767883325_3805603617659902763_2996941590.jpeg';
import g10 from './assets/photo_gallary/scrapshala_1767883325_3805603617701853322_2996941590.jpeg';
import g11 from './assets/photo_gallary/scrapshala_1767883325_3805603617710222892_2996941590.jpeg';
import g12 from './assets/photo_gallary/scrapshala_1768554994_3811237985422110077_2996941590.jpeg';
import g13 from './assets/photo_gallary/scrapshala_1768554994_3811237985556333889_2996941590.jpeg';
import g14 from './assets/photo_gallary/scrapshala_1768554994_3811237985606691907_2996941590.jpeg';
import g15 from './assets/photo_gallary/scrapshala_1769148711_3816216163911688534_2996941590.jpeg';
import g16 from './assets/photo_gallary/scrapshala_1769148711_3816216172048631962_2996941590.jpeg';
import g17 from './assets/photo_gallary/scrapshala_1769148711_3816216180823115852_2996941590.jpeg';
import g18 from './assets/photo_gallary/scrapshala_1769148711_3816216188783927096_2996941590.jpeg';
import g19 from './assets/photo_gallary/scrapshala_1769148711_3816216200637040843_2996941590.jpeg';
import g20 from './assets/photo_gallary/scrapshala_1769148711_3816216210762053329_2996941590.jpeg';
import g21 from './assets/photo_gallary/scrapshala_1769586292_3819886205899589074_2996941590.jpeg';
import g22 from './assets/photo_gallary/scrapshala_1769586292_3819886220764247161_2996941590.jpeg';
import g23 from './assets/photo_gallary/scrapshala_1769586292_3819886229782000420_2996941590.jpeg';
import g24 from './assets/photo_gallary/scrapshala_1769586292_3819886238447384277_2996941590.jpeg';
import g25 from './assets/photo_gallary/scrapshala_1769586292_3819886247590976202_2996941590.jpeg';
import g26 from './assets/photo_gallary/scrapshala_1771081962_3832435711585262439_2996941590.jpeg';
import g27 from './assets/photo_gallary/scrapshala_1773128119_3849597819879911188_2996941590.jpeg';
import g28 from './assets/photo_gallary/scrapshala_1773128119_3849597824569155064_2996941590.jpeg';
import g29 from './assets/photo_gallary/scrapshala_1773312956_3851147332058855972_2996941590.jpeg';
import g30 from './assets/photo_gallary/scrapshala_1773312956_3851147332931273223_2996941590.jpeg';
import g31 from './assets/photo_gallary/scrapshala_1773663438_3854087958811374180_2996941590.jpeg';
import g32 from './assets/photo_gallary/scrapshala_1773663438_3854087960111575098_2996941590.jpeg';
import g33 from './assets/photo_gallary/scrapshala_1773663438_3854087961806077271_2996941590.jpeg';
import g34 from './assets/photo_gallary/scrapshala_1773830595_3855489346376257935_2996941590.jpeg';
import g35 from './assets/photo_gallary/scrapshala_1773830595_3855489351703008489_2996941590 (1).jpeg';
import g36 from './assets/photo_gallary/scrapshala_1773909598_3856155635079967604_2996941590 (1).jpeg';
import g37 from './assets/photo_gallary/scrapshala_1774345175_3859809516506792496_2996941590 (1).jpeg';
import g38 from './assets/photo_gallary/scrapshala_1774961005_3864973163847961613_2996941590.jpeg';
import g39 from './assets/photo_gallary/scrapshala_1774961006_3864973160408616466.jpeg';
import g40 from './assets/photo_gallary/scrapshala_1774961006_3864973163847961613.jpeg';

export const GALLERY_IMAGES = [
  g1,g2,g3,g4,g5,g6,g7,g8,g9,g10,
  g11,g12,g13,g14,g15,g16,g17,g18,g19,g20,
  g21,g22,g23,g24,g25,g26,g27,g28,g29,g30,
  g31,g32,g33,g34,g35,g36,g37,g38,g39,g40,
];

const INITIAL_SHOW = 12;

export default function PhotoGallery({ title = 'Our Gallery', subtitle = 'Real moments, real craft' }) {
  const [lightbox, setLightbox] = useState(null); // index or null
  const [showAll, setShowAll] = useState(false);

  const images = showAll ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, INITIAL_SHOW);

  const close = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() =>
    setLightbox(i => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length), []);

  const next = useCallback(() =>
    setLightbox(i => (i + 1) % GALLERY_IMAGES.length), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, prev, next]);

  return (
    <section className="pg-section">
      {/* Header */}
      <div className="pg-header">
        <p className="pg-eyebrow">✦ Scrapshala</p>
        <h2 className="pg-title">{title}</h2>
        <p className="pg-subtitle">{subtitle}</p>
      </div>

      {/* Masonry grid */}
      <div className="pg-grid">
        {images.map((src, i) => (
          <button
            key={i}
            className="pg-item"
            onClick={() => setLightbox(i)}
            aria-label={`View photo ${i + 1}`}
          >
            <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
            <span className="pg-item-overlay">
              <span className="pg-add-cart">Add to Cart</span>
            </span>
          </button>
        ))}
      </div>

      {/* Show more / less */}
      {GALLERY_IMAGES.length > INITIAL_SHOW && (
        <div className="pg-footer">
          <button
            className="pg-toggle-btn"
            onClick={() => setShowAll(v => !v)}
          >
            {showAll ? 'Show Less' : `View All ${GALLERY_IMAGES.length} Photos`}
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="pg-lb-backdrop" onClick={close} role="dialog" aria-modal="true">
          <div className="pg-lb-box" onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button className="pg-lb-close" onClick={close} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Prev */}
            <button className="pg-lb-arrow pg-lb-prev" onClick={prev} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <img
              key={lightbox}
              src={GALLERY_IMAGES[lightbox]}
              alt={`Photo ${lightbox + 1}`}
              className="pg-lb-img"
            />

            {/* Next */}
            <button className="pg-lb-arrow pg-lb-next" onClick={next} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Counter */}
            <p className="pg-lb-counter">{lightbox + 1} / {GALLERY_IMAGES.length}</p>
          </div>
        </div>
      )}
    </section>
  );
}
