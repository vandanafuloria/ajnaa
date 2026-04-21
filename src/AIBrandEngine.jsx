import React, { useState } from 'react';
import './AIBrandEngine.css';

const SHOP_URL = 'https://ajnaajewels.com/';
const INSTAGRAM_URL = 'https://www.instagram.com/ajnaajewels/';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Sparkline = ({ data }) => {
  const [hovered, setHovered] = useState(null);
  const w = 200;
  const h = 48;
  const pad = 6;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (w - pad * 2),
    y: h - pad - ((v - min) / range) * (h - pad * 2),
    v,
    i,
  }));
  const pathD = `M ${pts.map((p) => `${p.x},${p.y}`).join(' L ')}`;
  const areaD = `${pathD} L ${pts[pts.length - 1].x},${h} L ${pts[0].x},${h} Z`;

  return (
    <div style={{ position: 'relative' }}>
      {hovered !== null && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `${(pts[hovered].x / w) * 100}%`,
            transform: 'translateX(-50%)',
            background: '#651F39',
            color: '#fff',
            fontSize: '9px',
            fontWeight: 600,
            padding: '3px 7px',
            borderRadius: '5px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {MONTHS[hovered]}: {data[hovered] * 60 + 300} orders
        </div>
      )}
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="sparkGradScrap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#651F39" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#651F39" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#sparkGradScrap)" />
        <path
          d={pathD}
          fill="none"
          stroke="#651F39"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {pts.map((p) => (
          <circle
            key={p.i}
            cx={p.x}
            cy={p.y}
            r={hovered === p.i ? 3.5 : 2}
            fill={hovered === p.i ? '#651F39' : '#fff'}
            stroke="#651F39"
            strokeWidth="1.4"
            style={{ cursor: 'pointer', transition: 'r 0.15s' }}
            onMouseEnter={() => setHovered(p.i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>
    </div>
  );
};

const AIBrandEngine = ({ showExtras = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('bags');

  if (!showExtras) return null;

  const tabs = [
    { id: 'bags', label: 'Bags' },
    { id: 'organizers', label: 'Organizers' },
    { id: 'wallets', label: 'Wallets' },
    { id: 'gifting', label: 'Gifting' },
    { id: 'story', label: 'Our Story' },
    { id: 'impact', label: 'Impact' },
  ];

  const content = {
    bags: {
      title: 'Upcycled bags & totes',
      category: 'Bags · Newspaper textile & tyre tubes',
      metrics: {
        purchases: 42000,
        reviews: 18600,
        refundRate: 0.8,
        qualityScore: 97,
        trend: [38, 42, 40, 50, 55, 62, 68, 74, 80, 88, 94, 102],
      },
      highlights: [
        'Handcrafted from upcycled newspaper textile and tyre tubes',
        'Each bag is one-of-a-kind — no two pieces look exactly alike',
        'Water-resistant exterior, firm tyre tube handles for daily use',
        'Fits laptops up to 15.6 inches — perfect for work and college',
      ],
    },
    organizers: {
      title: 'Desk & table organizers',
      category: 'Home decor · E-waste & audio tape upcycle',
      metrics: {
        purchases: 35800,
        reviews: 14200,
        refundRate: 1.0,
        qualityScore: 96,
        trend: [30, 35, 38, 44, 48, 54, 60, 66, 72, 78, 84, 90],
      },
      highlights: [
        'Made from upcycled e-waste components and cassette tapes',
        'Functional, colourful and a conversation starter on any desk',
        'Holds pens, scissors, cards and stationery neatly',
        'Great gifting option for colleagues and students',
      ],
    },
    wallets: {
      title: 'Wallets & zip pouches',
      category: 'Accessories · Tyre tube craft',
      metrics: {
        purchases: 28400,
        reviews: 11900,
        refundRate: 0.9,
        qualityScore: 98,
        trend: [25, 28, 32, 37, 42, 48, 54, 60, 65, 72, 78, 86],
      },
      highlights: [
        'Slim wallets and pouches crafted from reclaimed tyre tubes',
        'Durable, waterproof and incredibly light for everyday carry',
        'Available in multiple sizes — card holders to full zip pouches',
        'Popular as eco-friendly birthday and anniversary gifts',
      ],
    },
    gifting: {
      title: 'Gifting & combos',
      category: 'Gifting · Bulk orders · Corporate',
      metrics: {
        purchases: 19600,
        reviews: 8400,
        refundRate: 0.7,
        qualityScore: 99,
        trend: [20, 24, 28, 35, 42, 50, 58, 65, 74, 84, 92, 100],
      },
      highlights: [
        'Custom gifting hampers for birthdays, weddings and corporate events',
        'Each gift tells a sustainability story — meaningful and unique',
        'Bulk orders accepted with personalisation and branded packaging',
        'DM on Instagram or WhatsApp to discuss custom gift sets',
      ],
    },
    story: {
      title: 'As seen on Shark Tank India',
      category: 'Brand story · Zero waste · Artisan craft',
      metrics: {
        purchases: 100000,
        reviews: 52000,
        refundRate: 0.6,
        qualityScore: 99,
        trend: [40, 46, 50, 58, 65, 72, 80, 88, 95, 100, 108, 116],
      },
      highlights: [
        'Featured on Shark Tank India — built on a zero-waste philosophy',
        'Every product gives industrial waste a beautiful second life',
        'Skilled artisans handcraft each piece — supporting local livelihoods',
        '52K+ Instagram followers and 1 lakh+ happy customers across India',
      ],
    },
    impact: {
      title: 'Our environmental impact',
      category: 'Sustainability · Zero waste · Made in India',
      metrics: {
        purchases: 100000,
        reviews: 52000,
        refundRate: 0.5,
        qualityScore: 99,
        trend: [35, 42, 48, 55, 62, 70, 78, 86, 92, 98, 106, 114],
      },
      highlights: [
        'Tonnes of newspaper, tyre rubber and e-waste diverted from landfills',
        'Minimal, recycled packaging on every shipment',
        'Pan-India delivery — buy directly from ajnaajewels.com',
        'Every purchase directly funds artisan wages and zero-waste workshops',
      ],
    },
  };

  const current = content[activeTab];
  const m = current.metrics;
  const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n);

  return (
    <div className={`ai-brand-engine ${isExpanded ? 'expanded' : ''}`}>
      {!isExpanded ? (
        <button
          type="button"
          className="ai-brand-engine-trigger"
          onClick={() => setIsExpanded(true)}
          aria-label="Open Ajnaa Jewels brand guide"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            <path d="M8 10h0M12 10h0M16 10h0" />
          </svg>
        </button>
      ) : (
        <div className="ai-brand-engine-panel">
          <div className="panel-header">
            <div className="header-left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <div>
                <h3 className="panel-title">Ajnaa Jewels</h3>
                <p className="panel-subtitle">Fine jewelry · Handmade in India · Trusted quality</p>
              </div>
            </div>
            <button type="button" className="panel-close-btn" onClick={() => setIsExpanded(false)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="panel-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="panel-content">
            <div className="content-header-row">
              <h4 className="content-title">{current.title}</h4>
              <span className="content-category">{current.category}</span>
            </div>

            <div className="metric-tiles">
              <div className="metric-tile">
                <div className="metric-icon" aria-hidden>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                    <path d="M16 3H8l-2 4h12l-2-4z" />
                  </svg>
                </div>
                <div className="metric-num">{fmt(m.purchases)}+</div>
                <div className="metric-lbl">Orders</div>
              </div>
              <div className="metric-tile">
                <div className="metric-icon" aria-hidden>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <div className="metric-num">{fmt(m.reviews)}</div>
                <div className="metric-lbl">Reviews</div>
              </div>
              <div className="metric-tile">
                <div className="metric-icon" aria-hidden>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="metric-num">{m.qualityScore}%</div>
                <div className="metric-lbl">Trust score</div>
              </div>
              <div className="metric-tile">
                <div className="metric-icon" aria-hidden>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </div>
                <div className="metric-num">{m.refundRate}%</div>
                <div className="metric-lbl">Returns</div>
              </div>
            </div>

            <div className="score-row">
              <div className="score-card">
                <div className="score-arc-wrap">
                  <svg width="64" height="40" viewBox="0 0 64 40" aria-hidden>
                    <path d="M 6 38 A 26 26 0 0 1 58 38" fill="none" stroke="#ebebeb" strokeWidth="5" strokeLinecap="round" />
                    <path
                      d="M 6 38 A 26 26 0 0 1 58 38"
                      fill="none"
                      stroke="#651F39"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${(m.qualityScore / 100) * 81.7} 81.7`}
                    />
                  </svg>
                  <div className="score-arc-label">{m.qualityScore}%</div>
                </div>
                <div className="score-title">Satisfaction</div>
                <div className="score-sub">Verified customer ratings</div>
              </div>

              <div className="score-card">
                <div className="refund-gauge">
                  <div className="refund-big">
                    {m.refundRate}
                    <span className="refund-pct">%</span>
                  </div>
                  <div className="refund-bar-wrap">
                    {[...Array(10)].map((_, i) => {
                      const filled = i < Math.round((m.refundRate * 10) / 10);
                      return <div key={i} className={`refund-seg ${filled ? 'filled' : ''}`} />;
                    })}
                  </div>
                </div>
                <div className="score-title">Returns</div>
                <div className="score-sub">Industry-low return rate</div>
              </div>
            </div>

            <div className="trend-card">
              <div className="trend-header">
                <span className="trend-label">Order interest trend</span>
                <span className="trend-badge">Last 12 months</span>
              </div>
              <Sparkline data={m.trend} />
              <div className="trend-axes">
                <span className="trend-axis">Jan</span>
                <span className="trend-axis">Dec</span>
              </div>
            </div>

            <ul className="highlights-list">
              {current.highlights.map((h, i) => (
                <li key={i} className="highlight-item">
                  <span className="highlight-dot" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="ai-brand-cta-row">
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ai-brand-cta ai-brand-cta--primary"
              >
                Shop Ajnaa Jewels
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ai-brand-cta ai-brand-cta--secondary"
              >
                @ajnaajewels
              </a>
            </div>
            <p className="ai-brand-footnote">
              Handcrafted in India · Zero waste · As seen on Shark Tank India.{' '}
              <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">
                ajnaajewels.com
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBrandEngine;
