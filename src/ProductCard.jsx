import React from 'react';
import './ProductCard.css';

const SNAP_LOGO =
  'https://assets.snapmint.com/assets/express_checkout/snap-logo-circle.png';

function formatInr(price) {
  const n = Number(price);
  return `₹ ${n.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function imageUrlWithWidth(image, width) {
  if (!image) return '';
  try {
    const base =
      image.startsWith('//') ? `https:${image}` : image;
    const u = new URL(base);
    u.searchParams.set('width', String(width));
    return u.toString();
  } catch {
    const sep = image.includes('?') ? '&' : '?';
    return `${image}${sep}width=${width}`;
  }
}

function StarRow({ rating }) {
  const rounded = Math.max(
    0,
    Math.min(5, Math.round(Number(rating) || 0))
  );
  return (
    <span className="jdgm-prev-badge__stars" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`jdgm-star ${i <= rounded ? 'jdgm--on' : ''}`}
        />
      ))}
    </span>
  );
}

const ProductCard = ({ product, onClick }) => {
  if (!product) return null;

  const {
    image,
    title,
    currentPrice,
    originalPrice,
    rating = 4.5,
    reviewCount = 128,
    badge = 'Best Seller',
    feature,
    categoryLabel,
    descriptionBullets,
    handle,
    emiPerMonth,
    imageAlt,
  } = product;

  const discountPercent =
    originalPrice && currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  const productPath = handle
    ? `/products/${handle.replace(/^\//, '')}`
    : '#';

  const label =
    categoryLabel ||
    (feature ? String(feature).toUpperCase() : '') ||
    'FEATURED';

  const bullets =
    Array.isArray(descriptionBullets) && descriptionBullets.length > 0
      ? descriptionBullets
      : [feature].filter(Boolean);

  const displayRating =
    Math.round(Number(rating) * 10) / 10;

  const monthly =
    emiPerMonth != null
      ? Number(emiPerMonth)
      : Math.max(1, Math.round(Number(currentPrice) / 12));

  const src352 = imageUrlWithWidth(image, 352);
  const src500 = imageUrlWithWidth(image, 500);

  const onNavigate = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
      return;
    }
    if (productPath === '#') {
      e.preventDefault();
    }
  };

  return (
    <div className="product-item">
      <div className="proimg">
        <a href={productPath} onClick={onNavigate}>
          {badge ? <span className="protag">{badge}</span> : null}
          <img
            src={src500 || image}
            alt={imageAlt || title}
            srcSet={
              image
                ? `${src352} 352w, ${src500} 500w`
                : undefined
            }
            sizes="(max-width: 768px) 90vw, 280px"
            width={500}
            height={500}
            loading="lazy"
          />
        </a>
      </div>
      <div className="prodata">
        <a href={productPath} onClick={onNavigate}>
          <div className="custom_review_star_block">
            <span className="metafield_text_text">{label}</span>
            <span className="review_count_block custom_product_card_everywhere">
              <span
                className="jdgm-widget jdgm-preview-badge jdgm-preview-badge--with-link jdgm--done-setup"
                data-widget-name="preview_badge"
              >
                <div
                  className="jdgm-prev-badge"
                  data-average-rating={rating}
                  data-number-of-reviews={reviewCount}
                >
                  <StarRow rating={Number(rating)} />
                  <span className="jdgm-prev-badge__text">
                    {displayRating.toFixed(1)}
                  </span>
                  <span className="jdgm-prev-badge__count">
                    ({Number(reviewCount).toLocaleString('en-IN')} reviews)
                  </span>
                </div>
              </span>
            </span>
          </div>
          <h3>{title}</h3>
          <div className="pricearea">
            <span className="price-item price-item--sale price-item--last">
              {formatInr(currentPrice)}
              {discountPercent > 0 ? (
                <span className="saveamount"> {discountPercent}% off</span>
              ) : null}
            </span>
            {originalPrice ? (
              <span className="custom_span_compare">
                <s className="price-item price-item--regular">
                  {formatInr(originalPrice)}
                </s>
              </span>
            ) : null}
          </div>
          <div className="snap_dp_list">
            <div
              className="snap_collection_category snap_mobile_widget"
              role="presentation"
              onClick={(e) => e.preventDefault()}
            >
              <span>
                or{' '}
                <span className="snap_blue_color_text">
                  ₹
                  <span className="dp-collection-price">
                    {monthly.toLocaleString('en-IN')}
                  </span>
                </span>
                /Month
              </span>
              <img
                src={SNAP_LOGO}
                alt=""
                className="snap_circle_logo"
              />
              <span className="snap_know_more_text">Buy on EMI &gt;</span>
            </div>
          </div>
          {bullets.length > 0 ? (
            <div className="prodescription">
              <ul>
                {bullets.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
