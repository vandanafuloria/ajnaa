import React, { useState } from 'react';


const ProductCard = ({ product, onClick }) => {
  const [wished, setWished] = useState(false);

  if (!product) return null;

  const { image, title, currentPrice, originalPrice, rating = 4.5, reviewCount = 1284, feature } = product;

  const discountPercent = originalPrice && currentPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const formatPrice = (price) => `₹${Number(price).toLocaleString('en-IN')}`;
  const emiAmount = Math.round(currentPrice / 4);

  return (
    <div
      className="flex flex-col overflow-hidden bg-white cursor-pointer"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.10)', minWidth: '200px' }}
      onClick={onClick}
    >
      {/* Image area — landscape 16:9 */}
      <div className="relative w-full" style={{ backgroundColor: '#f8f8f8', aspectRatio: '16 / 9' }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Top-left: discount badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5">
            <span
              className="text-white text-xs font-bold px-2 py-0.5 rounded"
              style={{ backgroundColor: '#22c55e' }}
            >
              {discountPercent}% OFF
            </span>
          </div>
        )}

        {/* Top-right: heart */}
        <button
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow"
          onClick={(e) => { e.stopPropagation(); setWished(w => !w); }}
          aria-label="Wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? '#ef4444' : 'none'} stroke={wished ? '#ef4444' : '#888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="px-3 pt-3 pb-3 flex flex-col gap-2 bg-white">
        {/* Title */}
        <p className="text-gray-900 text-sm font-semibold leading-snug line-clamp-2">{title}</p>

        {/* Rating & review count */}
        <div className="flex items-center gap-2">
          {/* Rating pill */}
          <div
            className="flex items-center gap-1 px-2 py-0.5"
            style={{ backgroundColor: '#41543F', borderRadius: '3px' }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFD700">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-white font-bold" style={{ fontSize: '11px' }}>{rating}</span>
          </div>
          {/* Review count */}
          <span className="text-gray-400 font-medium" style={{ fontSize: '11px' }}>{reviewCount.toLocaleString('en-IN')} reviews</span>
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-2">
          <span className="text-gray-900 text-lg font-bold">{formatPrice(currentPrice)}</span>
          {originalPrice && (
            <span className="text-gray-400 text-sm line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>

        {/* EMI row */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-xs">or {formatPrice(emiAmount)}/Month</span>
          <button
            className="text-white text-xs font-semibold px-3 py-1 rounded"
            style={{ backgroundColor: '#22c55e' }}
            onClick={(e) => e.stopPropagation()}
          >
            Buy on EMI &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
