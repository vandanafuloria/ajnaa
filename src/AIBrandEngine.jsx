import React, { useState } from 'react';
import './AIBrandEngine.css';

const SHOP_URL = 'https://ajnaajewels.com/';
const INSTAGRAM_URL = 'https://www.instagram.com/ajnaajewels/';

/** Minimal jewellery-focused stories — no fake metrics */
const TABS = [
  { id: 'craft', label: 'Craft' },
  { id: 'occasions', label: 'Occasions' },
  { id: 'brand', label: 'Brand' },
];

const PANEL_COPY = {
  craft: {
    title: 'Craft & finish',
    lead: 'Pieces are set and finished by artisans — kundan, pearls, and gold-tone work meant to last beyond one season.',
    lines: ['Comfortable weight for long events.', 'Secure clasps and smooth edges.'],
  },
  occasions: {
    title: 'How customers wear Ajnaa',
    lead: 'From roka and sangeet to office dinners — styling that reads on camera and in person.',
    lines: ['Popular for gifting and bridal edits.', 'Pairs with silk, organza, or clean fusion looks.'],
  },
  brand: {
    title: 'Ajnaa Jewels',
    lead: 'Fine jewellery handmade in India, with care for detail and how each piece feels when you wear it.',
    lines: ['Shop online with pan-India delivery.', 'Follow new drops and styling on Instagram.'],
  },
};

const AIBrandEngine = ({ showExtras = true }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('craft');

  if (!showExtras) return null;

  const current = PANEL_COPY[activeTab];

  return (
    <div className="ai-brand-engine">
      {!open ? (
        <button
          type="button"
          className="ai-brand-engine-trigger"
          onClick={() => setOpen(true)}
          aria-label="About Ajnaa Jewels"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            <path d="M5 19h14" opacity="0.5" />
          </svg>
        </button>
      ) : (
        <div className="ai-brand-engine-panel" role="dialog" aria-label="Ajnaa Jewels">
          <div className="ai-brand-engine-panel__head">
            <div>
              <p className="ai-brand-engine-panel__eyebrow">Ajnaa Jewels</p>
              <p className="ai-brand-engine-panel__tagline">Handmade in India</p>
            </div>
            <button type="button" className="ai-brand-engine-panel__close" onClick={() => setOpen(false)} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="ai-brand-engine-panel__tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={activeTab === t.id}
                className={`ai-brand-engine-panel__tab ${activeTab === t.id ? 'is-active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="ai-brand-engine-panel__body">
            <h4 className="ai-brand-engine-panel__title">{current.title}</h4>
            <p className="ai-brand-engine-panel__lead">{current.lead}</p>
            <ul className="ai-brand-engine-panel__list">
              {current.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <div className="ai-brand-engine-panel__actions">
              <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" className="ai-brand-engine-panel__btn ai-brand-engine-panel__btn--primary">
                Shop collection
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="ai-brand-engine-panel__btn ai-brand-engine-panel__btn--ghost">
                Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBrandEngine;
