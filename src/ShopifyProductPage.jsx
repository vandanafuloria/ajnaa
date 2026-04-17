import React, { useState, useEffect, useCallback } from 'react';
import ShopifyHeader from './ShopifyHeader';
import ShopifyFooter from './ShopifyFooter';
import AIBrandEngine from './AIBrandEngine';
import PhotoGallery, { GALLERY_IMAGES } from './PhotoGallery';
import ProductCard from './ProductCard';
import TrustSignalsRotator from './TrustSignals';
import PdpHeroReviewRotator from './PdpHeroReviewRotator';

// ============================================
// EDIT THESE VALUES TO CUSTOMIZE YOUR PRODUCT
// ============================================

import productHeader from './assets/product_header.png';
import { DUROFLEX_SHOP_VIDEOS } from './duroflexShopVideos';
import { bestSellerProducts } from './duroflexBestSellers';

import reviewData from '../review.json';

/** Review images — use gallery images */
const PRODUCT_REVIEW_IMAGES = GALLERY_IMAGES;
const BRAND_REVIEW_IMAGES = [...GALLERY_IMAGES].reverse();

// Scrapshala product imagery — main gallery
const DUROFLEX_PDP_IMAGES = [
  'https://scrapshala.com/cdn/shop/files/WhatsApp_Image_2026-03-12_at_3.45.06_PM.jpg?format=webp&v=1773310830&width=713',
];

function getReviewTitle(text) {
  const first = text.split(/[.!,]/)[0].trim();
  return first.length > 5 ? first : text.substring(0, 50);
}


// Brand Name (footer / assets)
const BRAND_NAME = "Scrapshala";

/** Reviews UI — brand red (matches PDP accents) */
const REVIEW_ACCENT = '#178604';
const REVIEW_RING_TRACK = '#dcf5d8';
const REVIEW_SOFT = 'rgba(23, 134, 4, 0.09)';
const REVIEW_ACCENT_BORDER = 'rgba(23, 134, 4, 0.25)';

// Product Images Array - All product images
const PRODUCT_IMAGES = [...DUROFLEX_PDP_IMAGES];

// Product Video — draggable card + modals use Duroflex CDN reels
const PRODUCT_VIDEO = DUROFLEX_SHOP_VIDEOS[0];

// Product Details
const PRODUCT_NAME = "Ghats of Varanasi Wall Decor | Rectangular | Backside Hanging Hook | Handpainted | Made in India | Scrapshala";
const PRODUCT_PRICE = 1945;
const PRODUCT_ORIGINAL_PRICE = 2145;
const PRODUCT_DISCOUNT = 9;
const PRODUCT_SKU = "SS-LB-NP-TT-001";
const PRODUCT_DESCRIPTION = "Handcrafted from upcycled newspaper textile and tyre tubes, this eco-friendly laptop bag is a statement of sustainable style. Each bag is one-of-a-kind, made by skilled artisans who give waste materials a beautiful second life. The newspaper textile exterior is water-resistant and surprisingly durable, while the tyre tube handles provide a firm, comfortable grip. Fits laptops up to 15.6 inches. By choosing this bag, you are directly contributing to reducing landfill waste and supporting local craftspeople.";
const PRODUCT_BRAND = "Scrapshala";
const PRODUCT_COLORS = [];
const PRODUCT_SIZES = [];

// You May Also Like — aligned with best sellers (reserved for future alternate carousels)
const RELATED_PRODUCTS = bestSellerProducts.slice(0, 4).map((p) => ({
  id: p.id,
  name: p.title,
  image: p.image,
  price: p.currentPrice,
  originalPrice: p.originalPrice,
  rating: p.rating,
  reviews: p.reviewCount,
}));

// Short captions under PDP reel pills
const PDP_REEL_LABELS = [
  'Upcycled with love',
  'Zero waste craft',
  'Shark Tank India',
  'Customer favourites',
  'Eco-friendly bags',
  'Newspaper textile',
  'Tyre tube handles',
  'Real customer stories',
  'Sustainable gifting',
  'Shop Scrapshala',
  'Rest worth dreaming of',
];

// ============================================
// END OF EDITABLE SECTION
// ============================================

// Dummy review templates — Scrapshala upcycled product content
const dummyReviews = [
  {
    name: 'Priya Sharma',
    rating: 5,
    title: 'Love the concept and the quality!',
    text: 'Ordered the laptop bag and I am absolutely in love. The fact that it is made from upcycled newspaper and tyre tubes is incredible. Got so many compliments at my office. Packaging was minimal and eco-friendly too.',
    date: '1/20/2025',
    type: 'product'
  },
  {
    name: 'Anjali Mehta',
    rating: 5,
    title: 'Sturdy, unique and sustainable',
    text: 'The bag is much sturdier than I expected. It fits my 15 inch laptop perfectly and the handles are very comfortable. Really happy to support a brand that upcycles waste into something so beautiful.',
    date: '1/18/2025',
    type: 'product'
  },
  {
    name: 'Riya Patel',
    rating: 4,
    title: 'Great gifting option',
    text: 'Bought the zip pouch as a gift for my friend and she absolutely loved it. It looks very premium in person. The tyre tube material feels durable and the stitching is neat. Will order more products soon.',
    date: '1/15/2025',
    type: 'product'
  },
  {
    name: 'Kavya Reddy',
    rating: 5,
    title: 'As seen on Shark Tank — and it shows!',
    text: 'I had seen Scrapshala on Shark Tank and immediately knew I had to order. The table organizer is so well made and looks great on my desk. Love that it is made from e-waste. Very unique and purposeful.',
    date: '1/12/2025',
    type: 'product'
  },
  {
    name: 'Meera Singh',
    rating: 5,
    title: 'Worth every rupee',
    text: 'The pen stand from audio tapes is such a creative product. It is colourful, sturdy and holds all my stationery neatly. My kids also love the story behind it. Will definitely order again.',
    date: '1/10/2025',
    type: 'product'
  },
  {
    name: 'Sneha Verma',
    rating: 5,
    title: 'Conscious shopping done right',
    text: 'Finally a brand that makes sustainability cool. The bag looks stylish and feels very well crafted. Delivery was quick and the product was wrapped in recycled material. 10 out of 10 experience.',
    date: '1/08/2025',
    type: 'product'
  },
  {
    name: 'Divya Nair',
    rating: 4,
    title: 'Unique product, great quality',
    text: 'I was a little unsure about ordering but the product exceeded my expectations. The newspaper print pattern on the bag is very eye-catching and the tyre tube handles are solid. Recommended!',
    date: '1/05/2025',
    type: 'product'
  },
  {
    name: 'Pooja Mehta',
    rating: 5,
    title: 'Gifted it and got rave reviews',
    text: 'Gifted the multipurpose pouch to my colleague on her birthday and she was thrilled. Everyone in the office asked where it was from. So happy to spread the word about Scrapshala.',
    date: '1/03/2025',
    type: 'product'
  },
  {
    name: 'Neha Kapoor',
    rating: 5,
    title: 'Eco-friendly and actually beautiful',
    text: 'I was looking for sustainable home accessories and Scrapshala was a perfect find. The desk organizer is functional, aesthetically pleasing and the craftsmanship is excellent.',
    date: '12/30/2024',
    type: 'product'
  },
  {
    name: 'Aarti Desai',
    rating: 5,
    title: 'Recommended to everyone I know',
    text: 'Placed my second order already. The products are genuinely high quality and the idea of giving waste a second life is something I deeply believe in. Scrapshala is doing amazing work.',
    date: '12/28/2024',
    type: 'product'
  }
];

function AccordionRow({ label, content }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-t border-gray-200">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between py-3.5 text-xs font-semibold tracking-widest text-gray-800 hover:text-gray-600 transition-colors"
      >
        <span>{label}</span>
        <svg
          className="h-4 w-4 shrink-0 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed text-gray-600">{content}</p>
      )}
    </div>
  );
}

const ShopifyProductPage = ({ product: passedProduct, onHomeClick }) => {
  // Use passed product data when available, fall back to defaults
  const productName    = passedProduct?.title         || PRODUCT_NAME;
  const productPrice   = passedProduct?.currentPrice  || PRODUCT_PRICE;
  const productOriginal= passedProduct?.originalPrice || PRODUCT_ORIGINAL_PRICE;
  const productDiscount= passedProduct?.originalPrice
    ? Math.round(((passedProduct.originalPrice - passedProduct.currentPrice) / passedProduct.originalPrice) * 100)
    : PRODUCT_DISCOUNT;
  const productImages  = passedProduct?.image
    ? [passedProduct.image, ...PRODUCT_IMAGES]
    : PRODUCT_IMAGES;
  const productRating  = passedProduct?.rating        || 4.8;
  const productReviews = passedProduct?.reviewCount   || 320;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAISummaryExpanded, setIsAISummaryExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalImageIndex, setSelectedModalImageIndex] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isGridModalOpen, setIsGridModalOpen] = useState(false);
  const [gridModalImages, setGridModalImages] = useState([]);
  const [gridModalReview, setGridModalReview] = useState(null);
  const [activeTab, setActiveTab] = useState('product');
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [reviewLikes, setReviewLikes] = useState({});
  const [expandedReviews, setExpandedReviews] = useState({});
  const [productSortBy, setProductSortBy] = useState('most-recent');
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [instagramLoading, setInstagramLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoCard, setShowVideoCard] = useState(true);
  const [wildVideoIdx, setWildVideoIdx] = useState(null);
  const dragCardRef = React.useRef(null);
  const dragOffset = React.useRef({ x: 0, y: 0 });
  const dragPos = React.useRef({ x: null, y: null });
  const dragVideoRef = React.useRef(null);

  // Set initial position of drag card to bottom-right corner
  useEffect(() => {
    if (dragCardRef.current) {
      const card = dragCardRef.current;
      const x = window.innerWidth - card.offsetWidth - 16;
      const y = window.innerHeight - card.offsetHeight - 16;
      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
      dragPos.current = { x, y };
    }
    if (dragVideoRef.current) {
      dragVideoRef.current.muted = true;
      dragVideoRef.current.play().catch(() => {});
    }
  }, [showVideoCard]);

  // Instagram post URLs
  const instagramPosts = [
    'https://www.instagram.com/p/DUkDWOYiL8x/',
    'https://www.instagram.com/p/DW1GPT3CLZt/',
    'https://www.instagram.com/p/DWyteqICIrT/',
    'https://www.instagram.com/p/DWvjkgfiG99/',
    'https://www.instagram.com/p/DWndarEiAbr/',
    'https://www.instagram.com/p/DWlF0FTCD73/',
    'https://www.instagram.com/p/DWjPq5KCAIq/',
    'https://www.instagram.com/p/DV8th8KiA24/',
    'https://www.instagram.com/p/DViRz7QiFbi/',
    'https://www.instagram.com/p/DUncBy-CL5c/',
    'https://www.instagram.com/p/DShk_eXDQST/',
  ];


  // Load Instagram embed script
  useEffect(() => {
    const scriptId = 'instagram-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Process embeds when modal opens
  useEffect(() => {
    if (!showInstagramModal) return;
    
    // Set loading state asynchronously to avoid linter warning
    setTimeout(() => setInstagramLoading(true), 0);
    
      const processEmbeds = () => {
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        // Hide loading after embeds are processed
        setTimeout(() => {
          setInstagramLoading(false);
        }, 2000);
        }
      };
      
    // Process embeds with delays to ensure DOM is ready
    const timers = [
      setTimeout(processEmbeds, 500),
      setTimeout(processEmbeds, 1500),
      setTimeout(processEmbeds, 2500)
    ];

    // Fallback: hide loading after max wait time
    const fallbackTimer = setTimeout(() => {
      setInstagramLoading(false);
    }, 5000);

      return () => {
      timers.forEach(timer => clearTimeout(timer));
      clearTimeout(fallbackTimer);
      };
  }, [showInstagramModal]);

  useEffect(() => {
    if (wildVideoIdx === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setWildVideoIdx(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [wildVideoIdx]);

  
  // productImages already set from passedProduct above

  const nReviewAssets = PRODUCT_REVIEW_IMAGES.length;

  // Customer review images — first 8 slots cycle local product review assets
  const customerReviewImages = Array.from({ length: 8 }, (_, i) => PRODUCT_REVIEW_IMAGES[i % nReviewAssets]);

  // Full set for modal indexOf (same files as brand, different pairings)
  const allReviewImages = PRODUCT_REVIEW_IMAGES;

  // Short reviews for carousel widget — from very_small + small entries in review.json
  const shortReviewMinutes = [10, 360, 1440, 5760, 30, 120, 2880, 720, 180, 4320, 60, 240, 480, 1200, 3600];
  const shortReviews = reviewData
    .filter(r => r.type === 'very_small' || r.type === 'small')
    .map((r, i) => ({
      id: `sr${i + 1}`,
      name: r.name,
      minutesAgo: shortReviewMinutes[i % shortReviewMinutes.length],
      text: r.review,
      verified: true,
    }));

  // Product Reviews — from 'large' type entries in review.json
  const productReviewDates = ['8/19/2025', '2/03/2025', '7/20/2025', '10/11/2024', '4/20/2025', '12/15/2024', '3/15/2025'];
  const reviews = reviewData
    .filter(r => r.type === 'large')
    .map((r, i) => ({
      id: i + 1,
      name: r.name,
      location: r.location,
      date: productReviewDates[i] || '1/01/2025',
      rating: r.rating,
      title: r.title || getReviewTitle(r.review),
      text: r.review,
      images: [
        PRODUCT_REVIEW_IMAGES[(i * 2) % nReviewAssets],
        PRODUCT_REVIEW_IMAGES[(i * 2 + 1) % nReviewAssets],
      ],
    }));

  // Brand Reviews — from 'mid' type entries in review.json (images = reversed asset order)
  const brandReviewDates = ['1/12/2025', '1/08/2025', '1/05/2025', '12/30/2024', '12/25/2024', '12/20/2024', '12/15/2024', '12/10/2024'];
  const brandReviews = reviewData
    .filter(r => r.type === 'mid')
    .map((r, i) => ({
      id: `b${i + 1}`,
      name: r.name,
      location: r.location,
      date: brandReviewDates[i] || '1/01/2025',
      rating: r.rating,
      title: r.title || getReviewTitle(r.review),
      text: r.review,
      images: [
        BRAND_REVIEW_IMAGES[(i * 2) % nReviewAssets],
        BRAND_REVIEW_IMAGES[(i * 2 + 1) % nReviewAssets],
      ],
    }));

  // Handle like functionality
  const handleLike = (reviewId, type = 'product') => {
    const key = `${type}-${reviewId}`;
    setReviewLikes(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1
    }));
  };

  const handleReadMore = (reviewId, type = 'product') => {
    const key = `${type}-${reviewId}`;
    setExpandedReviews(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Convert date to "X days ago" format
  const getDaysAgo = (dateString) => {
    const [month, day, year] = dateString.split('/').map(Number);
    const reviewDate = new Date(year, month - 1, day);
    const today = new Date();
    const diffTime = today - reviewDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 60) return '1 month ago';
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
  };

  // Convert date to relative time format (minutes/hours/days ago)
  const getRelativeTime = (minutesAgo) => {
    if (minutesAgo < 60) {
      return `${minutesAgo} ${minutesAgo === 1 ? 'min' : 'mins'} ago`;
    } else if (minutesAgo < 1440) {
      const hours = Math.floor(minutesAgo / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(minutesAgo / 1440);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  // Find which review an image belongs to, or create a dummy review
  const findReviewForImage = useCallback((imageSrc) => {
    // Check product reviews
    for (const review of reviews) {
      if (review.images && review.images.includes(imageSrc)) {
        return { ...review, type: 'product' };
      }
    }
    // Check brand reviews
    for (const review of brandReviews) {
      if (review.images && review.images.includes(imageSrc)) {
        return { ...review, type: 'brand' };
      }
    }
    // If no review found, create a dummy review based on image index
    const imageIndex = allReviewImages.indexOf(imageSrc);
    if (imageIndex !== -1) {
      const dummyIndex = imageIndex % dummyReviews.length;
      return { ...dummyReviews[dummyIndex], id: `dummy-${imageIndex}` };
    }
    return null;
  }, [reviews, brandReviews, allReviewImages]);

  // Handle image click to open modal
  const handleImageClick = (index) => {
    setSelectedModalImageIndex(index);
    const imageSrc = allReviewImages[index];
    const review = findReviewForImage(imageSrc);
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  // Handle modal navigation
  const handlePrevious = () => {
    setSelectedModalImageIndex((prev) => {
      const newIndex = prev === 0 ? allReviewImages.length - 1 : prev - 1;
      const imageSrc = allReviewImages[newIndex];
      const review = findReviewForImage(imageSrc);
      setSelectedReview(review);
      return newIndex;
    });
  };

  const handleNext = () => {
    setSelectedModalImageIndex((prev) => {
      const newIndex = prev === allReviewImages.length - 1 ? 0 : prev + 1;
      const imageSrc = allReviewImages[newIndex];
      const review = findReviewForImage(imageSrc);
      setSelectedReview(review);
      return newIndex;
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowLeft') {
        setSelectedModalImageIndex((prev) => {
          const newIndex = prev === 0 ? allReviewImages.length - 1 : prev - 1;
          const imageSrc = allReviewImages[newIndex];
          const review = findReviewForImage(imageSrc);
          setSelectedReview(review);
          return newIndex;
        });
      } else if (e.key === 'ArrowRight') {
        setSelectedModalImageIndex((prev) => {
          const newIndex = prev === allReviewImages.length - 1 ? 0 : prev + 1;
          const imageSrc = allReviewImages[newIndex];
          const review = findReviewForImage(imageSrc);
          setSelectedReview(review);
          return newIndex;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, allReviewImages, findReviewForImage]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">

      {/* Back to Home */}
      {onHomeClick && (
        <div className="w-full bg-white border-b border-gray-100 px-4 py-2">
          <button
            onClick={onHomeClick}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back to Home
          </button>
        </div>
      )}

      {/* Product Page Header Banner — full width (no max-width) */}
      <div className="w-full bg-white">
        <img src={productHeader} alt="Product Header" className="w-full object-cover" />
      </div>

      {/* Product Video - Draggable floating card */}
      {showVideoCard && (
        <div
          ref={dragCardRef}
          className="fixed z-50 select-none"
          style={{
            width: '150px',
            touchAction: 'none',
            userSelect: 'none',
            cursor: 'grab',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            overflow: 'hidden',
            background: '#000',
          }}
          onPointerDown={(e) => {
            if (e.target.closest('.close-btn')) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            e.currentTarget.style.cursor = 'grabbing';
            const rect = e.currentTarget.getBoundingClientRect();
            dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
            dragOffset.current.startX = e.clientX;
            dragOffset.current.startY = e.clientY;
            dragOffset.current.moved = false;
          }}
          onPointerMove={(e) => {
            if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
            const dx = Math.abs(e.clientX - dragOffset.current.startX);
            const dy = Math.abs(e.clientY - dragOffset.current.startY);
            if (dx > 5 || dy > 5) dragOffset.current.moved = true;
            const card = e.currentTarget;
            const x = Math.max(0, Math.min(window.innerWidth - card.offsetWidth, e.clientX - dragOffset.current.x));
            const y = Math.max(0, Math.min(window.innerHeight - card.offsetHeight, e.clientY - dragOffset.current.y));
            card.style.left = `${x}px`;
            card.style.top = `${y}px`;
          }}
          onPointerUp={(e) => {
            e.currentTarget.releasePointerCapture(e.pointerId);
            e.currentTarget.style.cursor = 'grab';
            if (!dragOffset.current.moved && !e.target.closest('.close-btn')) {
              setSelectedVideo(PRODUCT_VIDEO);
            }
          }}
        >
          {/* Close button */}
          <button
            className="close-btn absolute top-2 right-2 z-20 w-7 h-7 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white"
            onClick={(e) => { e.stopPropagation(); setShowVideoCard(false); }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Video */}
          <video
            ref={dragVideoRef}
            src={PRODUCT_VIDEO}
            style={{ width: '150px', height: '225px', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
            loop
            muted
            autoPlay
            playsInline
            preload="auto"
          />
        </div>
      )}
      
      <main className="flex-1 bg-white py-6 md:py-10">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-5">
            <button onClick={onHomeClick} className="hover:text-gray-700 transition-colors">Home</button>
            <span>/</span>
            <span className="text-gray-700 truncate">{productName}</span>
          </nav>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">

            {/* LEFT — thumbnail strip + main image + arrows */}
            {(() => {
              const imgs = productImages.length ? productImages : [productHeader];
              return (
                <div className="flex gap-3">
                  {/* Thumbnail strip */}
                  <div className="hidden md:flex flex-col gap-2 w-[72px] shrink-0">
                    {imgs.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedImage(i)}
                        className="w-full aspect-square overflow-hidden rounded border-2 transition-all"
                        style={{ borderColor: selectedImage === i ? '#1a1a1a' : '#e5e7eb' }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  {/* Main image + arrows */}
                  <div className="relative flex-1 rounded-lg overflow-hidden bg-gray-50">
                    <img
                      src={imgs[selectedImage] || imgs[0]}
                      alt={productName}
                      className="w-full h-auto object-contain"
                      style={{ aspectRatio: '1/1' }}
                    />
                    {/* Prev arrow */}
                    {imgs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setSelectedImage(i => (i - 1 + imgs.length) % imgs.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 18l-6-6 6-6"/>
                        </svg>
                      </button>
                    )}
                    {/* Next arrow */}
                    {imgs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setSelectedImage(i => (i + 1) % imgs.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </button>
                    )}
                    {/* Mobile thumb strip below */}
                    <div className="md:hidden flex gap-2 overflow-x-auto mt-3 pb-1 scrollbar-hide">
                      {imgs.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedImage(i)}
                          className="w-16 h-16 shrink-0 rounded border-2 overflow-hidden transition-all"
                          style={{ borderColor: selectedImage === i ? '#1a1a1a' : '#e5e7eb' }}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* RIGHT — buy box */}
            <div className="flex flex-col gap-4">

              {/* Title */}
              <h1 className="text-xl font-semibold leading-snug text-gray-900 md:text-2xl">{productName}</h1>

              {/* Stars + review count */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="15" height="15" viewBox="0 0 24 24">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        fill={i <= Math.round(productRating) ? '#f97316' : '#e5e7eb'}
                      />
                    </svg>
                  ))}
                </span>
                <span className="text-sm text-gray-500">
                  {productReviews > 0 ? `${productReviews} reviews` : 'No reviews'}
                </span>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  {productOriginal && (
                    <span className="text-sm text-gray-400 line-through">
                      Rs. {productOriginal.toLocaleString('en-IN')}.00
                    </span>
                  )}
                  <span className="text-xl font-semibold text-gray-900">
                    Rs. {productPrice.toLocaleString('en-IN')}.00
                  </span>
                  {productDiscount > 0 && (
                    <span className="text-xs font-semibold text-white px-2 py-0.5 rounded" style={{ backgroundColor: '#178604' }}>
                      Sale
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">Tax included.</p>
              </div>

              <div className="border-t border-gray-100" />

              {/* Quantity */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
                <div className="flex items-center border border-gray-300 rounded w-fit">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-gray-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart + Buy Now */}
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 h-11 rounded text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#1a1a1a' }}
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="flex-1 h-11 rounded text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#178604' }}
                >
                  Buy Now
                </button>
              </div>

              {/* Accordions */}
              {[
                {
                  label: 'DESCRIPTION',
                  content: passedProduct?.feature
                    ? `${passedProduct.feature}. ${PRODUCT_DESCRIPTION}`
                    : PRODUCT_DESCRIPTION,
                },
                {
                  label: 'PREPARATION DAYS',
                  content: 'This product is handcrafted and requires 3–5 working days of preparation before dispatch.',
                },
                {
                  label: 'RETURN/EXCHANGE POLICY',
                  content: 'We accept returns and exchanges within 7 days of delivery. The product must be unused and in its original packaging.',
                },
                {
                  label: 'CANCELLATION POLICY',
                  content: 'Orders can be cancelled within 24 hours of placement. Once dispatched, cancellations are not accepted.',
                },
                {
                  label: 'SHIPPING POLICY',
                  content: 'Free shipping on all orders. Estimated delivery in 5–7 business days across India.',
                },
              ].map(({ label, content }) => (
                <AccordionRow key={label} label={label} content={content} />
              ))}

            </div>
          </div>
        </div>
      </main>


      {/* Duroflex reels strip — white band */}
      {(() => {
        const WILD_VIDEOS = DUROFLEX_SHOP_VIDEOS;
        return (
          <>
            <div className="w-full border-t border-b border-gray-100 bg-white py-7">
              <div className="w-full px-4 max-w-7xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">
                      See Duroflex in real homes
                    </h2>
                    <p className="text-xs text-gray-600 mt-1 max-w-md">
                      Short clips from Duroflex World — mattresses, comfort layers & everyday rest.
                    </p>
                  </div>
                  <a
                    href="https://www.instagram.com/duroflexworld/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full shrink-0 bg-gray-50 text-gray-800 border border-gray-200 shadow-sm hover:bg-white hover:border-[#178604]/40 transition-colors"
                    style={{ textDecoration: 'none' }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
                      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                    </svg>
                    @duroflexworld
                  </a>
                </div>
                <div className="overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                  <div className="flex gap-3 sm:gap-4 min-w-max">
                    {WILD_VIDEOS.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#178604] focus-visible:ring-offset-2 rounded-[999px] flex flex-col items-center"
                        onClick={() => setWildVideoIdx(idx)}
                      >
                        <div
                          className="relative overflow-hidden shadow-md"
                          style={{
                            width: '108px',
                            height: '180px',
                            borderRadius: '999px',
                            border: '2px solid rgba(26, 26, 26, 0.1)',
                          }}
                        >
                          <video src={url} className="w-full h-full object-cover" autoPlay muted playsInline loop />
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 45%)' }}
                          />
                        </div>
                        <span className="mt-2 text-[11px] text-gray-600 text-center max-w-[108px] leading-snug line-clamp-2 px-0.5">
                          {PDP_REEL_LABELS[idx % PDP_REEL_LABELS.length]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {wildVideoIdx !== null && (
              <div
                className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-stone-900/40 backdrop-blur-2xl"
                onClick={() => setWildVideoIdx(null)}
                role="presentation"
              >
                <div
                  className="relative overflow-hidden rounded-3xl bg-stone-950 shadow-[0_32px_90px_-24px_rgba(0,0,0,0.45)] ring-2 ring-white/20"
                  style={{ width: 'min(380px, 92vw)', height: 'min(660px, 88vh)' }}
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Reel video"
                >
                  <video key={wildVideoIdx} src={WILD_VIDEOS[wildVideoIdx]} className="h-full w-full object-cover" autoPlay muted playsInline controls loop />
                  <button
                    type="button"
                    className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/35"
                    onClick={() => setWildVideoIdx(null)}
                    aria-label="Close video"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30"
                    onClick={() => setWildVideoIdx((i) => (i - 1 + WILD_VIDEOS.length) % WILD_VIDEOS.length)}
                    aria-label="Previous reel"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/30"
                    onClick={() => setWildVideoIdx((i) => (i + 1) % WILD_VIDEOS.length)}
                    aria-label="Next reel"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                    {WILD_VIDEOS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setWildVideoIdx(i)}
                        className="rounded-full transition-all"
                        style={{ width: i === wildVideoIdx ? '22px' : '7px', height: '7px', background: i === wildVideoIdx ? '#fff' : 'rgba(255,255,255,0.4)' }}
                        aria-label={`Reel ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })()}

      {/* Best Sellers Section */}
      <section className="w-full py-12 md:py-16 bg-white border-t border-gray-100">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#178604] tracking-wide">
              SHOP OUR BEST SELLERS
            </h2>
          </div>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 md:gap-6 min-w-max pb-2">
              {bestSellerProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-[90vw] md:w-[380px] lg:w-[280px] flex-shrink-0 cursor-pointer"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section - premium layout, full content */}
      <div id="reviews-section" className="w-full border-t border-stone-200/70 bg-gradient-to-b from-stone-50/80 via-white to-white py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="mb-11 md:mb-14 text-center">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 md:text-4xl">Customer Reviews</h2>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
            {/* Left Side - Rating Breakdown — full row height so sticky has room to track while scrolling reviews */}
            <div className="lg:col-span-1">
              <div className="relative lg:sticky lg:top-[100px]">
                <div className="rounded-[3px] border border-stone-200/80 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] md:p-7">
                  {/* Rating Score Card */}
                  <div className="mb-7 text-center">
                    <div
                      className="relative mx-auto mb-5 flex h-[7.25rem] w-[7.25rem] items-center justify-center rounded-full"
                      style={{
                        background: `conic-gradient(${REVIEW_ACCENT} 0% 96%, ${REVIEW_RING_TRACK} 96% 100%)`,
                        boxShadow: '0 10px 28px rgba(219, 42, 32, 0.22)',
                      }}
                    >
                      <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-white">
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-3xl font-semibold tracking-tight" style={{ color: REVIEW_ACCENT }}>
                            4.8
                          </span>
                          <span className="text-sm font-medium text-stone-400">/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-2 flex justify-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg key={i} width="18" height="18" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={i <= 4 ? REVIEW_ACCENT : '#e7e5e4'} />
                          {i === 5 && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z" fill={REVIEW_ACCENT} />}
                        </svg>
                      ))}
                    </div>
                    <p className="mb-3 text-sm text-stone-600">
                      Based on <strong className="font-semibold text-stone-900">147</strong> reviews
                    </p>
                    <div
                      className="inline-flex items-center gap-2 rounded-[3px] border px-3.5 py-1.5 text-xs font-medium"
                      style={{
                        backgroundColor: REVIEW_SOFT,
                        color: REVIEW_ACCENT,
                        borderColor: REVIEW_ACCENT_BORDER,
                      }}
                    >
                      <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      96% would gift it
                    </div>
                  </div>

                  <div className="mb-7 space-y-2.5">
                    {[
                      { stars: 5, percent: 75 },
                      { stars: 4, percent: 17 },
                      { stars: 3, percent: 5 },
                      { stars: 2, percent: 2 },
                      { stars: 1, percent: 1 },
                    ].map((item) => (
                      <div key={item.stars} className="flex items-center gap-2 sm:gap-3">
                        <div className="flex w-8 shrink-0 items-center gap-1 text-xs text-stone-600">
                          <svg className="h-3 w-3" fill={REVIEW_ACCENT} viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span>{item.stars}</span>
                        </div>
                        <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-[3px] bg-stone-200/90">
                          <div
                            className="h-full rounded-[3px] transition-all duration-300"
                            style={{
                              width: `${item.percent}%`,
                              minWidth: item.percent ? '2px' : 0,
                              backgroundColor: REVIEW_ACCENT,
                            }}
                          />
                        </div>
                        <span className="w-8 shrink-0 text-right text-xs tabular-nums text-stone-600">{item.percent}%</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        icon: (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ),
                        label: 'Would recommend to a friend',
                        value: '96%',
                      },
                      {
                        icon: (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ),
                        label: 'Praise unique upcycled design',
                        value: '9/10',
                      },
                      {
                        icon: (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        ),
                        label: 'Love the eco-friendly mission',
                        value: '98%',
                      },
                    ].map((stat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-[3px] border border-stone-100 bg-stone-50/60 px-3 py-3"
                      >
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] bg-white shadow-sm ring-1 ring-stone-100"
                          style={{ color: REVIEW_ACCENT }}
                        >
                          {stat.icon}
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <div className="text-sm font-semibold text-stone-900">{stat.value}</div>
                          <div className="text-xs leading-snug text-stone-600">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Reviews */}
            <div className="mt-10 lg:mt-0 lg:col-span-2">

              {/* AI Insight card — redesigned clean + attractive */}
              <div
                className="mb-6 overflow-hidden rounded-xl border border-stone-200/70 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                style={{ borderTop: `3px solid ${REVIEW_ACCENT}` }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between px-5 pt-4 pb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full"
                      style={{ background: REVIEW_SOFT }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={REVIEW_ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                      </svg>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: REVIEW_ACCENT }}>AI Insight</span>
                  </div>
                  <span
                    className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                    style={{ background: REVIEW_SOFT, color: REVIEW_ACCENT }}
                  >
                    <svg width="10" height="10" viewBox="0 0 20 20" fill={REVIEW_ACCENT}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Verified reviews
                  </span>
                </div>

                {/* Headline + body */}
                <div className="px-5 pb-4">
                  <h4 className="mb-2 text-[1.1rem] font-bold tracking-tight text-stone-900">What customers are saying</h4>
                  <p className="text-sm leading-relaxed text-stone-600">
                    {isAISummaryExpanded ? (
                      <>
                        Customers consistently love Scrapshala products for their unique, handcrafted appeal and the story behind each piece. Buyers highlight the premium build quality — especially the tyre tube handles and newspaper textile that hold up far better than expected. Many mention getting compliments at work and gifting Scrapshala products to friends and family. Shoppers who saw the brand on Shark Tank say the real products exceed what they saw on screen. Eco-conscious buyers appreciate the zero-waste philosophy and minimal, recycled packaging. Repeat customers often mention picking up multiple products as they trust the craft and want to support the artisans behind each piece.
                        <button type="button" onClick={() => setIsAISummaryExpanded(false)}
                          className="ml-1 cursor-pointer font-semibold underline underline-offset-2 transition-opacity hover:opacity-75"
                          style={{ color: REVIEW_ACCENT }}>Read less</button>
                      </>
                    ) : (
                      <>
                        Customers love Scrapshala for its unique upcycled craft, premium build quality, and the meaningful story behind every product — many say it makes the perfect eco-conscious gift.
                        <button type="button" onClick={() => setIsAISummaryExpanded(true)}
                          className="ml-1 cursor-pointer font-semibold underline underline-offset-2 transition-opacity hover:opacity-75"
                          style={{ color: REVIEW_ACCENT }}>Read more</button>
                      </>
                    )}
                  </p>
                </div>

                {/* Tags */}
                <div className="border-t border-stone-100 px-5 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {['Upcycled craft', 'Eco-friendly', 'Shark Tank India', 'Unique gifting', 'Premium quality', 'Zero waste', 'Artisan made'].map((item, index) => (
                      <span
                        key={index}
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                        style={{ background: REVIEW_SOFT, color: REVIEW_ACCENT }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tabs — compact pills, right inside the card at the bottom */}
                <div className="border-t border-stone-100 px-5 py-3">
                  <div className="flex gap-2">
                    {[['product', 'Product Reviews'], ['brand', 'Brand Reviews']].map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setActiveTab(id)}
                        className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all"
                        style={activeTab === id
                          ? { background: REVIEW_ACCENT, color: '#fff', boxShadow: '0 2px 8px rgba(23,134,4,0.25)' }
                          : { background: '#f5f5f4', color: '#78716c' }
                        }
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Tab Content */}
              {activeTab === 'product' && (
                <div className="mb-8">
                  <div className="mb-12">
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <h3 className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">CUSTOMER PHOTOS</h3>
                        <p className="text-sm text-stone-600">Real results from the community</p>
                      </div>
                      <span className="rounded-[3px] bg-stone-100 px-3 py-1 text-xs font-medium tabular-nums text-stone-600">
                        {customerReviewImages.length} uploads
                      </span>
                    </div>
                    
                    {/* Instagram-style Photo Gallery Grid - Show first 6, then "View all" */}
                    {customerReviewImages.length > 0 ? (
                      <div className="mb-6 flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:overflow-x-visible md:pb-0">
                        {customerReviewImages.slice(0, 6).map((image, i) => (
                          <div
                            key={i}
                            className="group relative shrink-0 cursor-pointer overflow-hidden rounded-[3px] ring-1 ring-stone-200/80 transition-shadow hover:shadow-md"
                            onClick={() => handleImageClick(i)}
                            style={{
                              backgroundColor: '#f5f5f4',
                              width: '100px',
                              height: '100px',
                            }}
                          >
                            <img
                              src={image}
                              alt={`Customer review ${i + 1}`}
                              style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                display: 'block',
                                backgroundColor: 'transparent',
                                color: 'transparent',
                                opacity: 1,
                              }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                              onLoad={(e) => {
                                e.target.style.opacity = '1';
                              }}
                            />
                            <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
                          </div>
                        ))}
                        {customerReviewImages.length > 6 && (
                          <div
                            className="relative shrink-0 cursor-pointer overflow-hidden rounded-[3px] ring-1 ring-stone-200/80 transition-opacity hover:opacity-95"
                            onClick={() => {
                              setGridModalImages(customerReviewImages);
                              setGridModalReview(null);
                              setIsGridModalOpen(true);
                            }}
                            style={{ width: '100px', height: '100px' }}
                          >
                            <img
                              src={customerReviewImages[6]}
                              alt="more"
                              style={{ width: '100px', height: '100px', objectFit: 'cover', display: 'block' }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900/55 backdrop-blur-[1px]">
                              <div className="text-sm font-semibold text-white">+{customerReviewImages.length - 6}</div>
                              <div className="mt-0.5 text-[10px] font-medium text-white/90">View all</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-stone-500">No customer photos available</p>
                    )}
                  </div>

                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-stone-700 md:text-[15px]">Sort &amp; Filter:</span>
                    <div className="relative">
                      <select
                        value={productSortBy}
                        onChange={(e) => setProductSortBy(e.target.value)}
                        className="min-h-[44px] cursor-pointer appearance-none rounded-[3px] border border-stone-200 bg-white px-4 py-2 pr-9 text-[17px] font-medium text-stone-800 shadow-sm transition-colors hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300/40 md:min-h-0 md:text-sm"
                      >
                        <option value="most-recent">Most Recent</option>
                        <option value="highest-rated">Highest Rated</option>
                        <option value="lowest-rated">Lowest Rated</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
                        <svg className="h-4 w-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    {reviews.slice(0, reviewsToShow).map((review) => {
                      const likeKey = `product-${review.id}`;
                      return (
                        <div
                          key={review.id}
                          className="rounded-[3px] border border-stone-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:p-5"
                        >
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                              <div className="flex shrink-0 items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((i) => {
                                  const full = i <= Math.floor(review.rating);
                                  const half = !full && i === Math.ceil(review.rating) && review.rating % 1 >= 0.3;
                                  const cId = `rc-clip-${review.id}-${i}`;
                                  return (
                                    <svg key={i} width="16" height="16" viewBox="0 0 24 24">
                                      <defs>
                                        {half && (
                                          <clipPath id={cId}>
                                            <rect x="0" y="0" width="12" height="24" />
                                          </clipPath>
                                        )}
                                      </defs>
                                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#e7e5e4" />
                                      {(full || half) && (
                                        <path
                                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                          fill={REVIEW_ACCENT}
                                          clipPath={half ? `url(#${cId})` : undefined}
                                        />
                                      )}
                                    </svg>
                                  );
                                })}
                              </div>
                              <span className="truncate text-xs font-semibold text-stone-900">{review.name}</span>
                              <svg className="h-3 w-3 shrink-0 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="shrink-0 text-xs text-stone-400">{getDaysAgo(review.date)}</span>
                          </div>

                          {review.title && <p className="mb-1 text-sm font-semibold text-stone-800">{review.title}</p>}

                          <p className="mb-2 text-sm leading-relaxed text-stone-600 md:text-base">
                            {expandedReviews[`product-${review.id}`] ? review.text : `${review.text.slice(0, 140)}...`}
                            <button
                              type="button"
                              onClick={() => handleReadMore(review.id, 'product')}
                              className="ml-1 text-xs font-medium text-stone-500 underline decoration-stone-200 underline-offset-2 hover:text-stone-800"
                            >
                              {expandedReviews[`product-${review.id}`] ? 'less' : 'more'}
                            </button>
                          </p>

                          {review.images?.length > 0 && (
                            <div className="mb-2 flex gap-2">
                              {review.images.map((image, imgIndex) => (
                                <div
                                  key={imgIndex}
                                  className="h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded-[3px] ring-1 ring-stone-200/80 transition-opacity hover:opacity-85"
                                  onClick={() => {
                                    const idx = allReviewImages.indexOf(image);
                                    if (idx !== -1) handleImageClick(idx);
                                  }}
                                >
                                  <img src={image} alt="" className="h-full w-full object-cover" />
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-[3px] border border-stone-100 bg-stone-50/90 px-3 py-2.5 md:px-4">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-xs text-stone-500">Helpful?</span>
                              <button
                                type="button"
                                onClick={() => handleLike(review.id, 'product')}
                                className="flex items-center gap-1 text-xs text-stone-600 transition-colors hover:text-[#b91c1c]"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                </svg>
                                ({reviewLikes[likeKey] || 716})
                              </button>
                              <button type="button" className="flex items-center gap-1 text-xs text-stone-400 transition-colors hover:text-stone-600">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
                                  <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                                </svg>
                                (0)
                              </button>
                            </div>
                            <button type="button" className="text-xs font-semibold text-stone-600 underline-offset-2 hover:underline" style={{ color: REVIEW_ACCENT }}>
                              Report
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {reviewsToShow < reviews.length && (
                    <div className="mt-8 text-center">
                      <button
                        type="button"
                        onClick={() => setReviewsToShow(reviews.length)}
                        className="rounded-[3px] border border-stone-300 bg-white px-8 py-3 text-sm font-semibold text-stone-800 shadow-sm transition-all hover:border-stone-400 hover:bg-stone-50 md:text-base"
                      >
                        View More Reviews
                      </button>
                    </div>
                  )}

                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      className="rounded-[3px] bg-stone-900 px-8 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-stone-800 md:text-base"
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
              )}

              {/* Brand Tab Content */}
              {activeTab === 'brand' && (
                <div className="mb-8">
                  {/* Brand Gallery — image-only masonry, click reveals review text */}
                  <div className="mb-12">
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <h3 className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">CUSTOMER PHOTOS</h3>
                        <p className="text-sm text-stone-600">Real moments, real craft — click any photo to read the story</p>
                      </div>
                      <span className="rounded-[3px] bg-stone-100 px-3 py-1 text-xs font-medium tabular-nums text-stone-600">
                        {GALLERY_IMAGES.length} photos
                      </span>
                    </div>

                    {/* Masonry grid — images only */}
                    <style>{`
                      .brand-gallery-grid { columns: 3; column-gap: 6px; }
                      @media (min-width: 640px) { .brand-gallery-grid { columns: 4; } }
                      @media (min-width: 1024px) { .brand-gallery-grid { columns: 5; } }
                      .bg-item:hover .bg-overlay { background: rgba(0,0,0,0.32) !important; }
                      .bg-item:hover img { transform: scale(1.04); }
                    `}</style>
                    <div className="brand-gallery-grid">
                      {GALLERY_IMAGES.map((src, idx) => {
                        return (
                          <div
                            key={idx}
                            className="bg-item"
                            style={{ breakInside: 'avoid', marginBottom: '6px', cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: '6px', display: 'block' }}
                            onClick={() => handleImageClick(idx)}
                          >
                            <img
                              src={src}
                              alt={`Customer photo ${idx + 1}`}
                              loading="lazy"
                              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px', transition: 'transform 0.35s ease' }}
                            />
                            <div
                              className="bg-overlay"
                              style={{
                                position: 'absolute', inset: 0, borderRadius: '6px',
                                background: 'rgba(0,0,0,0)', transition: 'background 0.3s ease',
                                pointerEvents: 'none',
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Floating Instagram Button — icon only on mobile, pill on desktop */}
      <button
        className="fixed bottom-5 left-5 w-12 h-12 md:w-auto md:h-auto md:px-5 md:py-3 rounded-full flex items-center justify-center md:gap-2.5 text-sm font-semibold text-white cursor-pointer z-[1000] transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
          boxShadow: '0 4px 15px rgba(188, 24, 136, 0.4)'
        }}
        onClick={() => setShowInstagramModal(true)}
        aria-label="See Our Instagram"
      >
        <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span className="hidden md:inline whitespace-nowrap">See Our Instagram</span>
      </button>

      {/* Instagram Modal */}
      {showInstagramModal && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[10000] p-4 overflow-y-auto"
          onClick={() => setShowInstagramModal(false)}
        >
          <div 
            className="relative w-full md:w-2/5 max-w-4xl h-full md:h-[90vh] bg-gray-50 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 bg-black bg-opacity-60 border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 z-[10001] hover:bg-opacity-80"
              onClick={() => setShowInstagramModal(false)}
              aria-label="Close Instagram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="h-full flex flex-col overflow-hidden">
              <div className="text-center border-b border-gray-200 flex-shrink-0 py-4 px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 m-0">Our Instagram</h2>
                <p className="text-base text-gray-600 m-0">Check out our latest posts and reels</p>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-4">
                <div className="max-w-2xl mx-auto w-full">
                  {/* Loading Skeleton */}
                  {instagramLoading && (
                    <div className="space-y-6">
                      {[1, 2, 3, 4].map((i) => (
                    <div
                          key={`skeleton-${i}`}
                          className="w-full bg-gray-200 rounded-lg overflow-hidden animate-pulse"
                          style={{ height: '600px' }}
                        >
                          <div className="h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                      ))}
                      <div className="flex items-center justify-center py-4">
                        <div className="flex items-center gap-2 text-gray-500">
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Loading Instagram posts...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Instagram Posts */}
                  <div style={{ display: instagramLoading ? 'none' : 'block' }}>
                    {instagramPosts.map((url, index) => (
                      <div
                        key={`instagram-post-${index}`}
                        className="w-full flex justify-center mb-6 last:mb-0"
                      >
                        <blockquote 
                          className="instagram-media" 
                          data-instgrm-permalink={url}
                          data-instgrm-version="14"
                          style={{ maxWidth: '100%', width: '100%' }}
                      />
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="video-modal-overlay"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="video-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="video-modal-close"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <video
              src={selectedVideo}
              className="video-modal-player"
              controls
              autoPlay
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* You May Also Like Section */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#178604] mb-3 tracking-wide">
              Best Sellers
            </h2>
          </div>
          <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4 md:gap-6 min-w-max">
              {bestSellerProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-[90vw] md:w-[380px] lg:w-[280px] flex-shrink-0 cursor-pointer"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <PhotoGallery title="More from Scrapshala" subtitle="Handcrafted with love — upcycled for a better tomorrow" />

      <ShopifyFooter brandName={BRAND_NAME} />
      
      {/* Grid Modal - Show All Images - Full Screen */}
      {isGridModalOpen && (
        <div 
          className="fixed inset-0 bg-white z-[9998] flex flex-col"
          onClick={() => setIsGridModalOpen(false)}
        >
          {/* Header - Fixed at top */}
          <div 
            className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                {gridModalReview ? `${gridModalReview.name}'s Photos` : 'Customer Photos'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {gridModalImages.length} {gridModalImages.length === 1 ? 'photo' : 'photos'}
              </p>
            </div>
            <button
              onClick={() => setIsGridModalOpen(false)}
              className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Images Grid - Full screen scrollable */}
          <div 
            className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 max-w-7xl mx-auto">
              {gridModalImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-gray-200 shadow-sm"
                  onClick={() => {
                    const imageIndex = allReviewImages.indexOf(image);
                    if (imageIndex !== -1) {
                      setIsGridModalOpen(false);
                      handleImageClick(imageIndex);
                    }
                  }}
                >
                  <img
                    src={image}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Failed to load grid image ${index}:`, image);
                      e.target.style.display = 'none';
                    }}
                    onLoad={(e) => {
                      e.target.style.opacity = '1';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          {/* Modal Content Container - Myntra Style Side-by-Side for Desktop */}
          <div 
            className="relative w-full max-w-6xl h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors z-20 bg-white rounded-full p-2 shadow-lg"
            aria-label="Close modal"
          >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

            {/* Left Side - Image Section */}
            <div className="relative w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-4 md:p-8">
              {/* Previous Button - Mobile only */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
                className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 transition-colors z-10 bg-white bg-opacity-80 rounded-full p-2 shadow-lg"
            aria-label="Previous image"
          >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

              {/* Next Button - Mobile only */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
                className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 transition-colors z-10 bg-white bg-opacity-80 rounded-full p-2 shadow-lg"
            aria-label="Next image"
          >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

              {/* Image */}
            <img
                src={allReviewImages[selectedModalImageIndex]}
                alt={`Review image ${selectedModalImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
              {/* Image Counter - Bottom Left */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1.5 rounded-full text-xs md:text-sm">
                {selectedModalImageIndex + 1} / {allReviewImages.length}
            </div>
          </div>
            
            {/* Right Side - Review Details Section (Desktop) */}
            {selectedReview && (
              <div className="hidden md:flex w-full md:w-1/2 bg-white overflow-y-auto flex-col">
                <div className="p-6 md:p-8">
                  {/* Header with Name and Date */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 text-lg md:text-xl">{selectedReview.name}</span>
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
        </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{getDaysAgo(selectedReview.date)}</div>
                    </div>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        style={{ fill: i < selectedReview.rating ? '#178604' : '#d1d5db' }}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  {/* Review Title */}
                  {selectedReview.title && (
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg md:text-xl">{selectedReview.title}</h3>
                  )}
                  
                  {/* Review Text */}
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">{selectedReview.text}</p>
                  
                  {/* Review Type Badge */}
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1.5 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(23, 134, 4, 0.1)', color: '#178604' }}>
                      {selectedReview.type === 'product' ? 'Product Review' : 'Brand Review'}
                    </span>
                  </div>

                  {/* Navigation Buttons for Desktop - Bottom */}
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevious();
                      }}
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
                      aria-label="Previous image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="text-sm font-medium">Previous</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
                      aria-label="Next image"
                    >
                      <span className="text-sm font-medium">Next</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile: Review Details Below Image */}
            {selectedReview && (
              <div className="md:hidden w-full bg-white p-4 border-t border-gray-200 overflow-y-auto max-h-[40vh]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-base">{selectedReview.name}</span>
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{getDaysAgo(selectedReview.date)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <defs>
                      <linearGradient id="mobileModalStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#178604" />
                        <stop offset="50%" stopColor="#E85C54" />
                        <stop offset="100%" stopColor="#F28B86" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className="w-4 h-4"
                      style={i < selectedReview.rating ? { 
                        fill: 'url(#mobileModalStarGradient)',
                        filter: 'drop-shadow(0 1px 2px rgba(53, 31, 49, 0.3))'
                      } : { fill: '#d1d5db' }}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {selectedReview.title && (
                  <h3 className="font-medium text-gray-900 mb-2 text-base">{selectedReview.title}</h3>
                )}
                <p className="text-gray-700 text-sm leading-relaxed mb-2">{selectedReview.text}</p>
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(23, 134, 4, 0.1)', color: '#178604' }}>
                  {selectedReview.type === 'product' ? 'Product Review' : 'Brand Review'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      <AIBrandEngine />
    </div>
  );
};

export default ShopifyProductPage;
