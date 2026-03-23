import React, { useState } from 'react';
import './AIBrandEngine.css';

const BRAND_COLOR = '#351F31';

const AIBrandEngine = ({ showExtras = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  if (!showExtras) return null;

  const tabs = [
    { id: 'products',    label: 'Products'    },
    { id: 'materials',   label: 'Materials'   },
    { id: 'personalise', label: 'Personalise' },
    { id: 'gifting',     label: 'Gifting'     },
    { id: 'shipping',    label: 'Shipping'    },
  ];

  const content = {
    products: {
      title: 'Our Collections',
      stats: [
        { value: 'Makeup Bags',      label: 'Vanity & cosmetic organisers' },
        { value: 'Earring Pouches',  label: 'Compact jewellery carry cases' },
        { value: 'Travel Kits',      label: 'All-in-one travel organisers' },
      ],
      highlights: [
        'Zipper pouches for makeup & skincare',
        'Earring + ring organiser pouches',
        'Passport holders & travel wallets',
        'Personalised name-embossed bags',
      ],
    },
    materials: {
      title: 'Premium Materials',
      stats: [
        { value: '100% Vegan',    label: 'No animal leather used' },
        { value: 'Premium PU',   label: 'Soft, durable vegan leather' },
        { value: 'Care-Lined',   label: 'Satin & microfibre interiors' },
      ],
      highlights: [
        'Scratch & water resistant exterior',
        'Smooth zip pulls with metal hardware',
        'Colour-safe, fade-resistant material',
        'Cruelty-free certified production',
      ],
    },
    personalise: {
      title: 'Personalisation',
      stats: [
        { value: 'Name / Initials', label: 'Embossed on every piece' },
        { value: '48 Hr',           label: 'Personalisation turnaround' },
        { value: '15+ Colours',     label: 'Pick your perfect shade' },
      ],
      highlights: [
        'Custom name embossing on all bags',
        'Gift-ready with personalised tags',
        'Monogram & initial options available',
        'Perfect for birthdays & anniversaries',
      ],
    },
    gifting: {
      title: 'Gift Ready',
      stats: [
        { value: 'Gift Wrapped',  label: 'Every order elegantly packed' },
        { value: 'Custom Note',   label: 'Add a personal message' },
        { value: '4.8★ Gifting', label: 'Rated by gifters' },
      ],
      highlights: [
        'Magnetic gift boxes on request',
        'Bulk gifting for corporates',
        'Special occasion bundles available',
        'Surprise delivery options',
      ],
    },
    shipping: {
      title: 'Fast Delivery',
      stats: [
        { value: '2–4 Days',    label: 'Pan-India standard delivery' },
        { value: 'Free Ship',   label: 'On orders above ₹499' },
        { value: 'Easy Return', label: '7-day hassle-free returns' },
      ],
      highlights: [
        'Real-time tracking on every order',
        'Safe padded packaging for bags',
        'Cash on delivery available',
        'Express 1–2 day delivery in metros',
      ],
    },
  };

  const current = content[activeTab];

  return (
    <div className={`ai-brand-engine ${isExpanded ? 'expanded' : ''}`}>
      {!isExpanded ? (
        <button
          className="ai-brand-engine-trigger"
          onClick={() => setIsExpanded(true)}
          aria-label="Open Brand Info"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </button>
      ) : (
        <div className="ai-brand-engine-panel">
          {/* Header */}
          <div className="panel-header">
            <div className="header-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <div>
                <h3 className="panel-title">The Bae Shop</h3>
                <p className="panel-subtitle">Handcrafted · Vegan Leather · Personalised</p>
              </div>
            </div>
            <button className="panel-close-btn" onClick={() => setIsExpanded(false)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="panel-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="panel-content">
            <h4 className="content-title">{current.title}</h4>

            <div className="stats-grid">
              {current.stats.map((item, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-value">{item.value}</div>
                  <div className="stat-label">{item.label}</div>
                </div>
              ))}
            </div>

            <ul className="highlights-list">
              {current.highlights.map((h, i) => (
                <li key={i} className="highlight-item">
                  <span className="highlight-dot" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBrandEngine;
