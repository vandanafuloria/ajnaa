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
    v, i,
  }));
  const pathD = 'M ' + pts.map(p => `${p.x},${p.y}`).join(' L ');
  const areaD = `${pathD} L ${pts[pts.length-1].x},${h} L ${pts[0].x},${h} Z`;

  return (
    <div style={{ position: 'relative' }}>
      {hovered !== null && (
        <div style={{
          position: 'absolute', top: 0,
          left: `${(pts[hovered].x / w) * 100}%`,
          transform: 'translateX(-50%)',
          background: '#DB2A20', color: '#fff',
          fontSize: '9px', fontWeight: 600,
          padding: '3px 7px', borderRadius: '5px',
          whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 10,
        }}>
          {MONTHS[hovered]}: {data[hovered] * 6 + 30} orders
        </div>
      )}
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DB2A20" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#DB2A20" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#sparkGrad)"/>
        <path d={pathD} fill="none" stroke="#DB2A20" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        {pts.map((p) => (
          <circle key={p.i} cx={p.x} cy={p.y}
            r={hovered === p.i ? 3.5 : 2}
            fill={hovered === p.i ? '#DB2A20' : '#fff'}
            stroke="#DB2A20" strokeWidth="1.4"
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
  const [activeTab, setActiveTab] = useState('serum');

  if (!showExtras) return null;

  const tabs = [
    { id: 'serum',      label: 'Serums'       },
    { id: 'moisturiser',label: 'Moisturisers' },
    { id: 'facepack',   label: 'Face Packs'   },
    { id: 'oil',        label: 'Face Oils'    },
    { id: 'suncare',    label: 'Suncare'      },
    { id: 'kits',       label: 'Kits'         },
  ];

  const content = {
    serum: {
      title: 'Luxova Serum Collection',
      category: 'Skincare · Serums & Treatments',
      metrics: { purchases: 9332, reviews: 2814, refundRate: 1.2, qualityScore: 98,
        trend: [38, 50, 45, 68, 72, 85, 90, 105, 98, 118, 132, 148] },
      stats: [
        { value: 'Silver',   label: 'Pure Silver Overnight Face Oil Serum' },
        { value: '7% OFF',   label: 'Limited time pricing' },
        { value: 'Natural',  label: 'Blend of natural oils' },
      ],
      highlights: [
        'Pure silver-infused formula for overnight skin repair',
        'Reduces wrinkles, fine lines & pigmentation',
        'Blend of natural oils — no harmful chemicals',
        'Lightweight, non-greasy texture absorbs fast',
      ],
    },
    moisturiser: {
      title: 'Luxova Moisturiser Collection',
      category: 'Skincare · Hydration & Moisture',
      metrics: { purchases: 7210, reviews: 1980, refundRate: 1.5, qualityScore: 97,
        trend: [28, 35, 42, 50, 55, 68, 72, 80, 88, 95, 108, 122] },
      stats: [
        { value: 'Deep',     label: 'Deep hydration for 24 hrs' },
        { value: 'Glow',     label: 'Instant luminous finish' },
        { value: 'Natural',  label: 'Natural ingredient formula' },
      ],
      highlights: [
        'Scientifically formulated for Indian skin types',
        'Hyaluronic acid & botanical extract blend',
        'Suitable for dry, oily & combination skin',
        'Dermatologist tested, paraben-free formula',
      ],
    },
    facepack: {
      title: 'Luxova Face Pack Collection',
      category: 'Skincare · Masks & Face Packs',
      metrics: { purchases: 5840, reviews: 1542, refundRate: 1.8, qualityScore: 96,
        trend: [22, 28, 32, 40, 48, 55, 60, 70, 75, 85, 92, 105] },
      stats: [
        { value: 'Glow',     label: 'Instant brightening effect' },
        { value: 'Clay',     label: 'Deep pore cleansing action' },
        { value: 'Herbal',   label: 'Ayurvedic herb infusion' },
      ],
      highlights: [
        'Watermelon & saffron — deep moisturising pack',
        'Removes tan, impurities & excess oil',
        'Leaves skin visibly brighter in one use',
        'Suitable for weekly detox skin routine',
      ],
    },
    oil: {
      title: 'Luxova Face Oil Collection',
      category: 'Skincare · Oils & Elixirs',
      metrics: { purchases: 6120, reviews: 1730, refundRate: 1.3, qualityScore: 98,
        trend: [30, 42, 38, 55, 60, 72, 80, 88, 95, 110, 120, 138] },
      stats: [
        { value: 'Pure',     label: 'Cold-pressed natural oils' },
        { value: 'Silver',   label: 'Pure silver overnight serum' },
        { value: '100%',     label: 'Natural, toxin-free formula' },
      ],
      highlights: [
        'Pure Silver Overnight Face Oil Serum — bestseller',
        'Repairs skin barrier while you sleep',
        'Rosehip, argan & jojoba oil complex',
        'Visibly plumper, softer skin in 7 days',
      ],
    },
    suncare: {
      title: 'Luxova Suncare Collection',
      category: 'Skincare · SPF & Sun Protection',
      metrics: { purchases: 4380, reviews: 1120, refundRate: 2.0, qualityScore: 95,
        trend: [18, 22, 28, 35, 42, 58, 70, 80, 72, 65, 55, 48] },
      stats: [
        { value: 'SPF 50',   label: 'Broad spectrum protection' },
        { value: 'PA+++',    label: 'UVA & UVB shield' },
        { value: 'No White', label: 'Zero white cast formula' },
      ],
      highlights: [
        'Lightweight SPF 50 PA+++ sunscreen',
        'No white cast — suitable for all skin tones',
        'Moisturises while protecting from sun damage',
        'Water-resistant formula for active lifestyles',
      ],
    },
    kits: {
      title: 'Luxova Skincare Kits',
      category: 'Skincare · Combo Sets & Gift Kits',
      metrics: { purchases: 3910, reviews: 980, refundRate: 1.4, qualityScore: 97,
        trend: [20, 25, 30, 38, 45, 52, 60, 68, 75, 85, 95, 112] },
      stats: [
        { value: 'Complete', label: 'Full skincare routine in one box' },
        { value: 'Gift',     label: 'Premium gift-ready packaging' },
        { value: 'Value',    label: 'Save up to 30% vs individual' },
      ],
      highlights: [
        'Curated AM & PM skincare routine kits',
        'Includes cleanser, serum, moisturiser & SPF',
        'Perfect for gifting — luxurious unboxing experience',
        'Scientifically formulated with natural ingredients',
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
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </button>
      ) : (
        <div className="ai-brand-engine-panel">
          {/* Header */}
          <div className="panel-header">
            <div className="header-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              <div>
                <h3 className="panel-title">Luxova Skincare</h3>
                <p className="panel-subtitle">Skincare · Natural Ingredients · Science-backed</p>
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

            {/* Quality + Return rate */}
            <div className="score-row">
              <div className="score-card">
                <div className="score-arc-wrap">
                  <svg width="64" height="40" viewBox="0 0 64 40">
                    <path d="M 6 38 A 26 26 0 0 1 58 38" fill="none" stroke="#ebebeb" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M 6 38 A 26 26 0 0 1 58 38" fill="none" stroke="#DB2A20" strokeWidth="5" strokeLinecap="round"
                      strokeDasharray={`${(m.qualityScore / 100) * 81.7} 81.7`}/>
                  </svg>
                  <div className="score-arc-label">{m.qualityScore}%</div>
                </div>
                <div className="score-title">Quality</div>
                <div className="score-sub">Customer satisfaction</div>
              </div>

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
