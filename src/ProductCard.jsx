import React from 'react';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const {
    image,
    title,
    currentPrice,
    originalPrice,
    rating = 0,
    reviewCount = 0,
  } = product;

  const discountPercent = originalPrice && currentPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const formatPrice = (price) => {
    if (typeof price === 'number') return `Rs. ${price.toLocaleString('en-IN')}.00`;
    return price;
  };

  return (
    <div className="flex flex-col bg-white overflow-hidden"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.10)' }}>

      {/* Image area */}
      <div className="relative w-full overflow-hidden bg-gray-100" style={{ aspectRatio: '4 / 5' }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Save badge – top left */}
        {discountPercent > 0 && (
          <div
            className="absolute top-3 left-3 px-4 py-1.5 rounded-full text-white text-sm font-semibold"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            Save {discountPercent}%
          </div>
        )}

        {/* Rating badge – top right */}
        {rating > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white"
            style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.12)' }}>
            <svg className="w-4 h-4 fill-current text-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span className="text-sm font-semibold text-gray-800">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-5 flex flex-col items-center gap-2 bg-white">
        <h3 className="text-sm font-bold text-gray-900 text-center uppercase tracking-wide leading-snug">
          {title}
        </h3>

        {/* Rating & reviews row */}
        {reviewCount > 0 && rating > 0 && (
          <div className="flex items-center gap-2">
            {/* Half-star row */}
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(i => {
                const full = i <= Math.floor(rating);
                const half = !full && i === Math.ceil(rating) && rating % 1 >= 0.3;
                const cId = `pc-clip-${i}-${Math.round(rating*100)}`;
                return (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24">
                    <defs>{half && <clipPath id={cId}><rect x="0" y="0" width="12" height="24"/></clipPath>}</defs>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#e5e7eb"/>
                    {(full || half) && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f59e0b" clipPath={half ? `url(#${cId})` : undefined}/>}
                  </svg>
                );
              })}
            </div>
            <span className="text-xs font-bold text-gray-800">{rating.toFixed(1)}</span>
            <span className="w-px h-3 bg-gray-200 rounded"/>
            <span className="text-xs text-gray-500">{reviewCount.toLocaleString('en-IN')} reviews</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <span className="text-base font-bold text-gray-900">{formatPrice(currentPrice)}</span>
          {originalPrice && (
            <span className="text-base font-medium line-through" style={{ color: '#e05c2a' }}>
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
