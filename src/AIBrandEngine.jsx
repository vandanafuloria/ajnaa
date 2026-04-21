import React, { useId, useState } from 'react';
import './AIBrandEngine.css';

const SHOP_URL = 'https://ajnaajewels.com/';
const INSTAGRAM_URL = 'https://www.instagram.com/ajnaajewels/';

/** Sparkle mark — Ajnaa burgundy / rose / gold (AI accent, not third-party logo) */
function PremiumAIIcon({ gradientId, className, style, size = 40 }) {
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a227" />
          <stop offset="0.45" stopColor="#651f39" />
          <stop offset="1" stopColor="#b76e79" />
        </linearGradient>
      </defs>
      <path
        d="M24 12C25.6 18.3 29.7 22.4 36 24C29.7 25.6 25.6 29.7 24 36C22.4 29.7 18.3 25.6 12 24C18.3 22.4 22.4 18.3 24 12Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M16.3 28.7C16.8 30.5 18 31.7 19.8 32.2C18 32.7 16.8 33.9 16.3 35.7C15.8 33.9 14.6 32.7 12.8 32.2C14.6 31.7 15.8 30.5 16.3 28.7Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
    </svg>
  );
}

function AIBrandEngine({ showExtras = true }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics');
  const [activeMetric, setActiveMetric] = useState('fit');
  const baseId = useId().replace(/:/g, '');

  if (!showExtras) return null;

  const getIcon = (type) => {
    const icons = {
      craft: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      occasions: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      returns: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 9L9 3L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 15L15 21L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      care: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3L4 7V11C4 16.55 7.16 21.74 12 23C16.84 21.74 20 16.55 20 11V7L12 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      shipping: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M1 3H17L22 8L17 13H1V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" />
          <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      brand: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      gift: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 12V20H4V12M2 7H22V12H2V7ZM12 7V20M12 7H7.5C6.12 7 5 5.88 5 4.5C5 3.12 6.12 2 7.5 2C10.5 2 12 7 12 7ZM12 7H16.5C17.88 7 19 5.88 19 4.5C19 3.12 17.88 2 16.5 2C13.5 2 12 7 12 7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      metrics: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 16L12 11L16 15L21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 10V3H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    };
    return icons[type] || icons.metrics;
  };

  const brandInfo = {
    craft: {
      title: 'Fine jewellery craft',
      iconType: 'craft',
      content: [
        {
          label: 'Heritage techniques',
          value: 'Kundan · pearls',
          description: 'Hand-set work and gold-tone finishes suited to bridal necklaces, chokers, and statement earrings.',
        },
        {
          label: 'Made for milestones',
          value: 'Wedding-ready',
          description: 'Pieces chosen for mandap light, sangeet sparkle, and reception photos — secure clasps for long wear.',
        },
        {
          label: 'Finish',
          value: 'Hand-checked',
          description: 'Smooth edges and even stones so jewellery sits comfortably through rituals and family photos.',
        },
      ],
      highlights: [
        'Lightweight options for mehendi and haldi without weighing you down.',
        'Sets that pair with lehenga, saree, or sharara lines.',
        'Packaging that feels worthy of trousseau and milestone gifts.',
      ],
    },
    occasions: {
      title: 'Wedding & marriage moments',
      iconType: 'occasions',
      content: [
        {
          label: 'Bridal journey',
          value: 'Roka → reception',
          description: 'Engagement, roka, sangeet, wedding day, and reception — coordinated sets and matching pieces for each function.',
        },
        {
          label: 'Family rituals',
          value: 'Karva · festivals',
          description: 'Karva Chauth, Teej, Diwali pooja, and anniversary dinners — pieces that feel traditional yet wearable.',
        },
        {
          label: 'On camera',
          value: 'Photo-friendly',
          description: 'Stones and polish chosen to read clearly in daylight, flash, and reel lighting.',
        },
      ],
      highlights: [
        'Necklaces and earrings that frame the face for bridal portraits.',
        'Matching sets for the bride and coordinated tones for sisters / mothers.',
        'Comfort for long ceremonies — so you enjoy the day, not just the photos.',
      ],
    },
    gifting: {
      title: 'Gifting that feels personal',
      iconType: 'gift',
      content: [
        {
          label: "Who it's for",
          value: 'Her · them',
          description: 'Mother of the bride, sister of the groom, wife, daughter-in-law, or friend — jewellery as a keepsake, not a generic box.',
        },
        {
          label: 'Occasions',
          value: 'Festive · life',
          description: 'Housewarming, baby shower, promotion, anniversary, Diwali, Eid, Rakhi, birthdays, and “just because” surprises.',
        },
        {
          label: 'Presentation',
          value: 'Gift-ready',
          description: 'Premium boxes and pouches so gifts feel occasion-appropriate without extra wrapping stress.',
        },
      ],
      highlights: [
        'Thoughtful sets for first Diwali after marriage or first Karva Chauth.',
        'Elevated gifting for colleagues and clients when you want more than sweets.',
        'Easy to pair with sarees, suits, and fusion fits the recipient already owns.',
      ],
    },
    care: {
      title: 'Care for heirloom-worthy pieces',
      iconType: 'care',
      content: [
        {
          label: 'After the wedding',
          value: 'Store right',
          description: 'Keep sets in soft pouches, separate heavy necklaces so chains and stones don’t rub.',
        },
        {
          label: 'Daily wear',
          value: 'Last on',
          description: 'Perfume, hair spray, and haldi stains stay off the metal — put jewellery on after dressing.',
        },
        {
          label: 'Cleaning',
          value: 'Soft cloth',
          description: 'Gentle wipe-down; follow product-specific care for kundan, pearls, and plated pieces.',
        },
      ],
      highlights: [
        'Rotate heavy bridal pieces with lighter everyday jewels to preserve finish.',
        'Avoid sleeping in delicate ear hooks and maang tikka chains.',
        'Re-wear wedding jewellery for anniversaries — store it so it stays photo-ready.',
      ],
    },
    shipping: {
      title: 'Delivery to your door',
      iconType: 'shipping',
      content: [
        {
          label: 'Pan-India',
          value: 'Trackable',
          description: 'Wedding timelines and festival gifting — check estimated delivery at checkout for your PIN.',
        },
        {
          label: 'Orders & help',
          value: 'Support',
          description: 'Questions on sizing, sets, or dispatch — use site contact with your order ID.',
        },
        {
          label: 'Returns',
          value: 'As per policy',
          description: 'Eligibility and windows are on each product and policy page — keep pieces unused where required.',
        },
      ],
      highlights: [
        'Secure outer packaging for high-value jewellery in transit.',
        'Plan ahead for wedding dates — order with buffer for alterations or exchanges if needed.',
        'Free or promotional shipping when shown in cart — see current offers on ajnaajewels.com.',
      ],
    },
    brand: {
      title: 'Ajnaa Jewels',
      iconType: 'brand',
      content: [
        {
          label: 'Promise',
          value: 'Fine · Indian',
          description: 'Jewellery imagined for real weddings, festivals, and gifts — not shelf decoration.',
        },
        {
          label: 'Shop',
          value: 'Online',
          description: 'Browse bridal edits, festive drops, and gifting-friendly sets on the store.',
        },
        {
          label: 'Inspiration',
          value: '@ajnaajewels',
          description: 'Reels and styling for marriage seasons, festivals, and everyday shine.',
        },
      ],
      highlights: [
        'Built around how Indian women actually wear jewellery — from engagement to anniversary.',
        'Community love for kundan, pearls, and lightweight glam.',
        'When in doubt, match the moment: wedding, festival, or a gift they’ll remember.',
      ],
    },
  };

  const graphData = {
    fit: {
      label: 'Bridal comfort (wear)',
      data: [85, 88, 86, 90, 87, 91, 92],
      color: '#651f39',
    },
    positive: {
      label: 'Love for craft & look',
      data: [78, 82, 84, 87, 85, 88, 90],
      color: '#8b4a62',
    },
    repeat: {
      label: 'Repeat buys & gifts',
      data: [62, 65, 68, 70, 72, 75, 78],
      color: '#c9a227',
    },
    delivery: {
      label: 'Delivery (wedding timelines)',
      data: [86, 88, 89, 91, 90, 92, 93],
      color: '#b76e79',
    },
    rating: {
      label: 'Avg. rating (illustrative)',
      data: [4.2, 4.3, 4.4, 4.5, 4.5, 4.6, 4.7],
      color: '#4a1942',
    },
    issue: {
      label: 'Care & resolution (proxy)',
      data: [80, 82, 85, 87, 88, 90, 91],
      color: '#7c2d42',
    },
  };

  const metrics = [
    { id: 'positive', label: 'Love' },
    { id: 'repeat', label: 'Gifts' },
    { id: 'fit', label: 'Bridal' },
    { id: 'delivery', label: 'Ship' },
    { id: 'rating', label: 'Stars' },
    { id: 'issue', label: 'Care' },
  ];

  const currentMetric = graphData[activeMetric];
  const currentValue = currentMetric.data[currentMetric.data.length - 1];
  const percentage = typeof currentValue === 'number' ? currentValue.toFixed(1) : currentValue;
  const displayValue =
    activeMetric === 'rating' && typeof currentValue === 'number' && currentValue < 10
      ? `${currentValue.toFixed(1)}/5`
      : `${percentage}%`;

  const renderChart = () => {
    const data = currentMetric.data;
    const maxValue = Math.max(...data) * 1.1;
    const minValue = Math.min(...data) * 0.9;
    const range = maxValue - minValue || 1;
    const width = 340;
    const height = 160;
    const padding = { top: 15, right: 15, bottom: 35, left: 45 };
    const gradId = `${baseId}-chart-${activeMetric}`;

    const points = data.map((value, index) => {
      const x = padding.left + (index / (data.length - 1)) * (width - padding.left - padding.right);
      const y =
        padding.top +
        (height - padding.top - padding.bottom) -
        ((value - minValue) / range) * (height - padding.top - padding.bottom);
      return { x, y, value };
    });

    const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;

    return (
      <div className="chart-container">
        <div className="chart-header">
          <h5 className="chart-title">Jewellery trust snapshot</h5>
          <div className="chart-value">{displayValue}</div>
        </div>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="chart-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={currentMetric.color} stopOpacity="0.45" />
              <stop offset="100%" stopColor={currentMetric.color} stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradId})`} opacity="0.35" />
          {[0, 1, 2, 3, 4].map((i) => {
            const y = padding.top + (i / 4) * (height - padding.top - padding.bottom);
            return (
              <line
                key={i}
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#e8eaed"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            );
          })}
          <path
            d={linePath}
            fill="none"
            stroke={currentMetric.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((point, index) => (
            <circle key={index} cx={point.x} cy={point.y} r="4" fill={currentMetric.color} stroke="white" strokeWidth="2" />
          ))}
          {points.map((point, index) => (
            <text
              key={`lbl-${index}`}
              x={point.x}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              fill="#666"
              fontSize="10"
              fontWeight="500"
            >
              S{index + 1}
            </text>
          ))}
        </svg>
        <div className="metric-filters">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              type="button"
              className={`metric-filter-btn ${activeMetric === metric.id ? 'active' : ''}`}
              onClick={() => setActiveMetric(metric.id)}
            >
              {metric.label}
            </button>
          ))}
        </div>
        <p className="chart-footnote">
          Illustrative trend only — not live data. Themes: bridal wear, gifting, and festival shopping satisfaction.
        </p>
      </div>
    );
  };

  const tabs = [
    { id: 'metrics', label: 'Signals', iconType: 'metrics' },
    { id: 'craft', label: 'Craft', iconType: 'craft' },
    { id: 'occasions', label: 'Wedding', iconType: 'occasions' },
    { id: 'gifting', label: 'Gifts', iconType: 'gift' },
    { id: 'care', label: 'Care', iconType: 'care' },
    { id: 'shipping', label: 'Ship', iconType: 'shipping' },
    { id: 'brand', label: 'Brand', iconType: 'brand' },
  ];

  const currentInfo = brandInfo[activeTab];

  const sparkleGrad = `${baseId}-sparkle`;

  return (
    <div className={`ai-brand-engine ${isExpanded ? 'expanded' : ''}`}>
      {!isExpanded ? (
        <div className="ai-brand-engine-trigger-wrap">
          <button
            type="button"
            className="ai-brand-engine-trigger"
            onClick={() => setIsExpanded(true)}
            aria-label="Open jewellery and gifting insights for Ajnaa Jewels"
          >
            <div className="trigger-icon">
              <span className="ai-gemini-rotator" aria-hidden="true">
                <PremiumAIIcon gradientId={sparkleGrad} className="ai-gemini-icon" size={36} />
              </span>
            </div>
            <div className="trigger-text">
              <span className="trigger-label">Bridal & gifts</span>
              <span className="trigger-sublabel">Ajnaa Jewels</span>
            </div>
            <span className="trigger-badge">AI</span>
          </button>
          <div className="ai-brand-engine-tooltip" role="note">
            Weddings, gifting & fine jewellery — tap to explore
            <span className="ai-brand-engine-tooltip__arrow" aria-hidden />
          </div>
        </div>
      ) : (
        <div className="ai-brand-engine-panel" role="dialog" aria-label="Ajnaa Jewels jewellery and gifting insights">
          <div className="panel-header">
            <div className="header-left">
              <div className="header-icon">
                <PremiumAIIcon gradientId={`${baseId}-head`} style={{ width: 36, height: 36 }} size={36} />
              </div>
              <div>
                <h3 className="panel-title">AI Brand Engine</h3>
                <p className="panel-subtitle">Fine jewellery · weddings · gifting</p>
              </div>
            </div>
            <button type="button" className="panel-close-btn" onClick={() => setIsExpanded(false)} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="panel-tabs" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{getIcon(tab.iconType)}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="panel-content">
            {activeTab === 'metrics' ? (
              renderChart()
            ) : currentInfo ? (
              <>
                <div className="content-header">
                  <div className="content-icon">{getIcon(currentInfo.iconType)}</div>
                  <h4 className="content-title">{currentInfo.title}</h4>
                </div>
                <div className="stats-grid">
                  {currentInfo.content.map((item) => (
                    <div key={item.label} className="stat-card">
                      <div className="stat-value">{item.value}</div>
                      <div className="stat-label">{item.label}</div>
                      <div className="stat-description">{item.description}</div>
                    </div>
                  ))}
                </div>
                <div className="highlights-section">
                  <h5 className="highlights-title">Why it matters</h5>
                  <ul className="highlights-list">
                    {currentInfo.highlights.map((highlight) => (
                      <li key={highlight} className="highlight-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="highlight-icon">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="panel-content-cta">
                  <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" className="abe-cta abe-cta--primary">
                    Shop bridal & gifts
                  </a>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="abe-cta abe-cta--ghost">
                    Instagram
                  </a>
                </div>
              </>
            ) : null}
          </div>

          <div className="panel-footer">
            <div className="footer-badge">
              <span className="footer-badge-icon" aria-hidden>
                <PremiumAIIcon gradientId={`${baseId}-foot`} size={18} />
              </span>
              <span>Curated for bridal & gifting moments</span>
            </div>
            <p className="footer-note">
              For weddings, festivals, and gifts — summaries are for inspiration only. Check product pages and policies on ajnaajewels.com before you buy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIBrandEngine;
