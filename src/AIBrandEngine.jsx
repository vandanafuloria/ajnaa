import React, { useState } from 'react';
import './AIBrandEngine.css';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const Sparkline = ({ data }) => {
  const [hovered, setHovered] = useState(null);
  const w = 200, h = 48, pad = 6;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (w - pad * 2),
    y: h - pad - ((v - min) / range) * (h - pad * 2),
    v,
    i,
  }));
  const pathD = 'M ' + pts.map(p => `${p.x},${p.y}`).join(' L ');
  const areaD = `${pathD} L ${pts[pts.length-1].x},${h} L ${pts[0].x},${h} Z`;

  return (
    <div style={{ position: 'relative' }}>
      {hovered !== null && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: `${(pts[hovered].x / w) * 100}%`,
          transform: 'translateX(-50%)',
          background: '#41543F',
          color: '#fff',
          fontSize: '9px',
          fontWeight: 600,
          padding: '3px 7px',
          borderRadius: '5px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          {MONTHS[hovered]}: {data[hovered] * 8 + 22} orders
        </div>
      )}
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#41543F" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#41543F" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#sparkGrad)"/>
        <path d={pathD} fill="none" stroke="#41543F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        {pts.map((p) => (
          <circle
            key={p.i}
            cx={p.x}
            cy={p.y}
            r={hovered === p.i ? 3.5 : 2}
            fill={hovered === p.i ? '#41543F' : '#fff'}
            stroke="#41543F"
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
  const [activeTab, setActiveTab] = useState('floral');

  if (!showExtras) return null;

  const tabs = [
    { id: 'floral',      label: 'Floral'      },
    { id: 'abstract',    label: 'Abstract'    },
    { id: 'nature',      label: 'Nature'      },
    { id: 'peacock',     label: 'Peacock'     },
    { id: 'geometric',   label: 'Geometric'   },
    { id: 'traditional', label: 'Traditional' },
  ];

  const content = {
    floral: {
      title: 'VibeCrafts Floral Collection',
      category: 'Canvas Wall Art · Floral & Botanical',
      metrics: {
        purchases: 18420,
        reviews: 4312,
        refundRate: 1.8,
        qualityScore: 97,
        trend: [40, 55, 48, 72, 65, 88, 102, 95, 118, 130, 122, 148],
      },
      stats: [
        { value: 'Premium',  label: 'Fade-proof UV-resistant inks' },
        { value: 'Ready',    label: 'Stretched & ready to hang' },
        { value: '59% OFF',  label: 'Limited season sale pricing' },
      ],
      highlights: [
        'Rich jewel-tone palette inspired by Indian art',
        'Available in 4 sizes from 18x12 to 48x32 inch',
        'Fitted wood frame — no assembly required',
        'Eco-friendly canvas, non-toxic inks',
      ],
    },
    abstract: {
      title: 'VibeCrafts Abstract Collection',
      category: 'Canvas Wall Art · Abstract & Contemporary',
      metrics: {
        purchases: 14870,
        reviews: 3291,
        refundRate: 2.1,
        qualityScore: 96,
        trend: [30, 38, 42, 50, 58, 70, 65, 80, 88, 95, 105, 118],
      },
      stats: [
        { value: 'Modern',   label: 'Curated for contemporary homes' },
        { value: 'HD Print', label: 'High-resolution digital print' },
        { value: '60% OFF',  label: 'End of season discount' },
      ],
      highlights: [
        'Minimalist to bold designs for every aesthetic',
        'Seamless color gradients with museum-quality finish',
        'Pairs perfectly with neutral & Scandinavian interiors',
        'Gift-ready packaging with protective wrap',
      ],
    },
    nature: {
      title: 'VibeCrafts Nature Collection',
      category: 'Canvas Wall Art · Landscapes & Nature',
      metrics: {
        purchases: 11340,
        reviews: 2605,
        refundRate: 1.9,
        qualityScore: 98,
        trend: [22, 28, 35, 40, 38, 52, 60, 55, 68, 75, 80, 92],
      },
      stats: [
        { value: 'Serene',      label: 'Calming mountain & lake themes' },
        { value: 'Weatherproof', label: 'Moisture-resistant canvas coat' },
        { value: '58% OFF',     label: 'Home decor season pricing' },
      ],
      highlights: [
        'Breathtaking mountain lakes and forest scenes',
        'Warm sunrise & golden hour palettes',
        'Perfect for bedrooms, study rooms & corridors',
        'Brings nature indoors with photorealistic detail',
      ],
    },
    peacock: {
      title: 'VibeCrafts Peacock Collection',
      category: 'Canvas Wall Art · Peacock & Birds',
      metrics: {
        purchases: 21200,
        reviews: 5180,
        refundRate: 1.6,
        qualityScore: 99,
        trend: [50, 60, 72, 80, 75, 90, 100, 112, 108, 125, 138, 160],
      },
      stats: [
        { value: '#1 Seller', label: 'Best-selling canvas category' },
        { value: 'Vibrant',   label: 'Jewel-tone teal & gold palette' },
        { value: '59% OFF',   label: 'Flash sale pricing active' },
      ],
      highlights: [
        'Majestic peacock motifs in Indian art style',
        'Bold colors that transform any living room',
        'Lotus, arch & garden backdrop compositions',
        'Most gifted canvas category on VibeCrafts',
      ],
    },
    geometric: {
      title: 'VibeCrafts Geometric Collection',
      category: 'Canvas Wall Art · Geometric & Patterns',
      metrics: {
        purchases: 8920,
        reviews: 1980,
        refundRate: 2.3,
        qualityScore: 95,
        trend: [18, 22, 30, 35, 40, 45, 50, 58, 62, 70, 78, 88],
      },
      stats: [
        { value: 'Precision',  label: 'Crisp lines & sharp geometry' },
        { value: 'Versatile',  label: 'Suits office & modern homes' },
        { value: '55% OFF',    label: 'Season discount pricing' },
      ],
      highlights: [
        'Tessellated and mandala-inspired designs',
        'Monochrome to multi-hued pattern options',
        'Great for feature walls and gallery setups',
        'Available as single panel & triptych sets',
      ],
    },
    traditional: {
      title: 'VibeCrafts Traditional Collection',
      category: 'Canvas Wall Art · Indian Heritage Art',
      metrics: {
        purchases: 7610,
        reviews: 1742,
        refundRate: 2.0,
        qualityScore: 97,
        trend: [15, 18, 22, 28, 32, 38, 42, 48, 55, 60, 68, 78],
      },
      stats: [
        { value: 'Heritage',   label: 'Inspired by Indian folk art forms' },
        { value: 'Handcrafted', label: 'Artisan-designed compositions' },
        { value: '57% OFF',    label: 'End of season pricing' },
      ],
      highlights: [
        'Madhubani, Warli & Pattachitra-inspired motifs',
        'Warm earthy tones with golden accents',
        'Ideal for pooja rooms, foyers & dining areas',
        'Celebrates Indian cultural heritage in modern form',
      ],
    },
  };

  const current = content[activeTab];
  const m = current.metrics;

  const fmt = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;

  return (
    <div className={`ai-brand-engine ${isExpanded ? 'expanded' : ''}`}>
      {!isExpanded ? (
        <button
          className="ai-brand-engine-trigger"
          onClick={() => setIsExpanded(true)}
          aria-label="Explore Collections"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </button>
      ) : (
        <div className="ai-brand-engine-panel">
          {/* Header */}
          <div className="panel-header">
            <div className="header-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              <div>
                <h3 className="panel-title">VibeCrafts</h3>
                <p className="panel-subtitle">Canvas Wall Art · Home Decor · Since 2022</p>
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
            {/* Title row */}
            <div className="content-header-row">
              <h4 className="content-title">{current.title}</h4>
              <span className="content-category">{current.category}</span>
            </div>

            {/* Metric tiles */}
            <div className="metric-tiles">
              <div className="metric-tile">
                <div className="metric-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                </div>
                <div className="metric-num">{fmt(m.purchases)}</div>
                <div className="metric-lbl">Purchases</div>
              </div>
              <div className="metric-tile">
                <div className="metric-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div className="metric-num">{fmt(m.reviews)}</div>
                <div className="metric-lbl">Reviews</div>
              </div>
              <div className="metric-tile">
                <div className="metric-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="metric-num">{m.qualityScore}%</div>
                <div className="metric-lbl">Quality</div>
              </div>
              <div className="metric-tile">
                <div className="metric-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.27"/>
                  </svg>
                </div>
                <div className="metric-num">{m.refundRate}%</div>
                <div className="metric-lbl">Returns</div>
              </div>
            </div>

            {/* Quality + Refund side by side */}
            <div className="score-row">
              {/* Quality score — arc gauge */}
              <div className="score-card">
                <div className="score-arc-wrap">
                  <svg width="64" height="40" viewBox="0 0 64 40">
                    <path d="M 6 38 A 26 26 0 0 1 58 38" fill="none" stroke="#ebebeb" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M 6 38 A 26 26 0 0 1 58 38" fill="none" stroke="#41543F" strokeWidth="5" strokeLinecap="round"
                      strokeDasharray={`${(m.qualityScore / 100) * 81.7} 81.7`}/>
                  </svg>
                  <div className="score-arc-label">{m.qualityScore}%</div>
                </div>
                <div className="score-title">Quality</div>
                <div className="score-sub">Customer satisfaction</div>
              </div>

              {/* Return rate — segmented bar */}
              <div className="score-card">
                <div className="refund-gauge">
                  <div className="refund-big">{m.refundRate}<span className="refund-pct">%</span></div>
                  <div className="refund-bar-wrap">
                    {[...Array(10)].map((_, i) => {
                      const filled = i < Math.round(m.refundRate * 10 / 10);
                      return <div key={i} className={`refund-seg ${filled ? 'filled' : ''}`}/>;
                    })}
                  </div>
                </div>
                <div className="score-title">Returns</div>
                <div className="score-sub">Avg return rate</div>
              </div>
            </div>

            {/* Purchase trend */}
            <div className="trend-card">
              <div className="trend-header">
                <span className="trend-label">Purchase trend</span>
                <span className="trend-badge">Last 12 months</span>
              </div>
              <Sparkline data={m.trend} />
              <div className="trend-axes">
                <span className="trend-axis">Jan</span>
                <span className="trend-axis">Dec</span>
              </div>
            </div>

            {/* Highlights */}
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
