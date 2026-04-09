import React, { useState } from 'react';
import './AIBrandEngine.css';

const STORE_LOCATOR_URL = 'https://stores.duroflexworld.com/';
const SHOP_ONLINE_URL = 'https://www.duroflexworld.com/';

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
            background: '#DB2A20',
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
          {MONTHS[hovered]}: {data[hovered] * 80 + 400} visits
        </div>
      )}
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="sparkGradDuro" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DB2A20" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#DB2A20" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#sparkGradDuro)" />
        <path
          d={pathD}
          fill="none"
          stroke="#DB2A20"
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
            fill={hovered === p.i ? '#DB2A20' : '#fff'}
            stroke="#DB2A20"
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
  const [activeTab, setActiveTab] = useState('duropedic');

  if (!showExtras) return null;

  const tabs = [
    { id: 'duropedic', label: 'Duropedic' },
    { id: 'airboost', label: 'Airboost' },
    { id: 'natural', label: 'Natural Living' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'stores', label: 'Stores' },
    { id: 'support', label: 'Expert care' },
  ];

  const content = {
    duropedic: {
      title: 'Duropedic engineered support',
      category: 'Mattresses · Orthopedic & back care',
      metrics: {
        purchases: 128400,
        reviews: 45200,
        refundRate: 0.9,
        qualityScore: 97,
        trend: [42, 48, 44, 52, 58, 62, 68, 72, 76, 82, 88, 94],
      },
      highlights: [
        'Zoned support for neutral spine alignment — built for Indian sleepers',
        'Trusted by families upgrading from basic foam or spring mattresses',
        'Pairs with roll-pack delivery and clear warranty documentation',
        'Try feel & firmness at a Duroflex Experience Centre near you',
      ],
    },
    airboost: {
      title: 'Airboost breathable comfort',
      category: 'Mattresses · Cooler, airier sleep',
      metrics: {
        purchases: 98600,
        reviews: 31100,
        refundRate: 1.1,
        qualityScore: 98,
        trend: [55, 58, 54, 60, 65, 70, 75, 78, 82, 88, 95, 102],
      },
      highlights: [
        'Comfort layers designed for breathability in warm, humid climates',
        'Popular for couples who want motion isolation without a “stuck” feel',
        'Cool-touch and quilted covers match what you see on Duroflex World',
        'See trims & specs online — then lie down in store to decide',
      ],
    },
    natural: {
      title: 'Natural Living range',
      category: 'Mattresses · Eco-conscious materials',
      metrics: {
        purchases: 62400,
        reviews: 18900,
        refundRate: 1.2,
        qualityScore: 96,
        trend: [30, 34, 38, 42, 45, 48, 52, 56, 60, 65, 70, 76],
      },
      highlights: [
        'Natural and eco-forward options for allergen-conscious households',
        'Transparent specs — compare imports vs local service & warranty',
        'Layering and fabrics chosen for durability in real Indian homes',
        'Experience Centres stock multiple feels — no guesswork online only',
      ],
    },
    accessories: {
      title: 'Pillows, protectors & more',
      category: 'Sleep accessories · Complete the bed',
      metrics: {
        purchases: 215000,
        reviews: 67800,
        refundRate: 1.4,
        qualityScore: 95,
        trend: [70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95, 98],
      },
      highlights: [
        'Mattress protectors, pillows and toppers to extend mattress life',
        'Designed to pair with Duropedic, Airboost and Natural Living beds',
        'Add-ons available online and at Experience Centres',
        'Staff can suggest height & size for your existing frame',
      ],
    },
    stores: {
      title: 'Duroflex Experience Centres',
      category: 'Store locator · Try before you buy',
      metrics: {
        purchases: 89400,
        reviews: 125000,
        refundRate: 0.8,
        qualityScore: 99,
        trend: [48, 52, 55, 60, 65, 72, 78, 85, 90, 96, 102, 110],
      },
      highlights: [
        'Experience Centres across Bengaluru, Mumbai, Delhi NCR, Chennai, Hyderabad & more',
        'Filter by state, city and locality — same flow as the official store finder',
        'Highly rated locations (e.g. 4.8+ stars) with thousands of reviews nationwide',
        'Step in to compare firmness, fabrics and Duropedic vs Airboost in person',
      ],
    },
    support: {
      title: 'Expert shopping & aftercare',
      category: 'Warranty · WhatsApp · Hours',
      metrics: {
        purchases: 34200,
        reviews: 28900,
        refundRate: 0.7,
        qualityScore: 99,
        trend: [25, 28, 32, 38, 42, 48, 52, 58, 62, 68, 72, 78],
      },
      highlights: [
        '50+ years of sleep expertise — mattresses engineered for Indian homes',
        'Warranty registration, blogs and policies on Duroflex World',
        'Get shopping help like the locator: expert chat & store teams',
        'Typical care hours: 10am–10pm — check WhatsApp / Talk to expert on the site',
      ],
    },
  };

  const current = content[activeTab];
  const m = current.metrics;
  const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n);

  return (
    <div className={`ai-brand-engine ${isExpanded ? 'expanded' : ''}`}>
      {!isExpanded ? (
        <button
          type="button"
          className="ai-brand-engine-trigger"
          onClick={() => setIsExpanded(true)}
          aria-label="Open Duroflex brand guide and store help"
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
                <h3 className="panel-title">Duroflex World</h3>
                <p className="panel-subtitle">Mattresses · Experience Centres · 50+ years in India</p>
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
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div className="metric-num">{fmt(m.purchases)}</div>
                <div className="metric-lbl">Happy homes</div>
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
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 .49-3.27" />
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
                      stroke="#DB2A20"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${(m.qualityScore / 100) * 81.7} 81.7`}
                    />
                  </svg>
                  <div className="score-arc-label">{m.qualityScore}%</div>
                </div>
                <div className="score-title">Satisfaction</div>
                <div className="score-sub">Across ranges & channels</div>
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
                <div className="score-sub">Industry-low dispute rate</div>
              </div>
            </div>

            <div className="trend-card">
              <div className="trend-header">
                <span className="trend-label">Experience Centre interest</span>
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
                href={STORE_LOCATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ai-brand-cta ai-brand-cta--primary"
              >
                Find a store
              </a>
              <a
                href={SHOP_ONLINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ai-brand-cta ai-brand-cta--secondary"
              >
                Shop online
              </a>
            </div>
            <p className="ai-brand-footnote">
              Official store locator & Experience Centres:{' '}
              <a href={STORE_LOCATOR_URL} target="_blank" rel="noopener noreferrer">
                stores.duroflexworld.com
              </a>
              . Expert help & hours as on Duroflex sites (e.g. ~10am–10pm).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBrandEngine;
