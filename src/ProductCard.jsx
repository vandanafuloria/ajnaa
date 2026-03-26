import React from 'react';

const ProductCard = ({ product, onClick }) => {
  if (!product) return null;

  const { image, title, currentPrice, originalPrice, rating = 4.5, reviewCount = 128 } = product;

  const discountPercent = originalPrice && currentPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const formatPrice = (price) =>
    `Rs. ${Number(price).toLocaleString('en-IN')}.00`;

  return (
    <div
      className="flex flex-col overflow-hidden cursor-pointer"
      style={{ backgroundColor: '#f0ece3', minWidth: '250px', maxWidth: '320px' }}
      onClick={onClick}
    >
      {/* Image area — portrait 3:4 */}
      <div className="relative w-full" style={{ aspectRatio: '3 / 4', backgroundColor: '#e8e3da' }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* OFF badge — top-left, black */}
        {discountPercent > 0 && (
          <div
            className="absolute top-2 left-2 px-1.5 py-0.5"
            style={{ backgroundColor: '#111', color: '#fff' }}
          >
            <span className="font-bold" style={{ fontSize: '10px' }}>OFF {discountPercent}%</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col items-center gap-1.5 px-2.5 pt-3 pb-3" style={{ backgroundColor: '#f0ece3' }}>
        {/* Title */}
        <h3
          className="text-center font-bold leading-snug line-clamp-2 w-full"
          style={{ fontSize: '0.78rem', fontFamily: 'Georgia, serif', color: '#1a1a1a' }}
        >
          {title}
        </h3>

        {/* Rating & reviews */}
        <div className="flex items-center justify-center gap-2 w-full">
          {/* Dark pill */}
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-md"
            style={{ backgroundColor: '#3d4f35' }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f5c518"/>
            </svg>
            <span className="font-bold" style={{ fontSize: '11px', color: '#fff' }}>{rating}</span>
          </div>
          {/* Review count */}
          <span style={{ fontSize: '11px', color: '#888' }}>{reviewCount.toLocaleString('en-IN')} reviews</span>
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-1.5 justify-center flex-wrap">
          <span className="font-bold text-xs" style={{ color: '#1a1a1a' }}>
            {formatPrice(currentPrice)}
          </span>
          {originalPrice && (
            <span className="line-through" style={{ fontSize: '10px', color: '#999' }}>
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          className="w-full py-1.5 text-white font-semibold uppercase mt-1"
          style={{ backgroundColor: '#5c6b45', letterSpacing: '0.08em', fontSize: '10px' }}
          onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
