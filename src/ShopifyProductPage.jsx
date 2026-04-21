import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
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
import { SCRAPSHALA_SHOP_VIDEOS, PDP_DRAGGABLE_VIDEO } from './scrapshalaShopVideos';
import {
  bestSellerProducts,
  AJNAA_PRODUCT_IMAGES,
  LE108_PDP_GALLERY_IMAGES,
} from './scrapshalaBestSellers';

import reviewData from '../review.json';
import { INSTAGRAM_POST_URLS } from './instagramPosts';

/** Review images — use gallery images */
const PRODUCT_REVIEW_IMAGES = GALLERY_IMAGES;
const BRAND_REVIEW_IMAGES = [...GALLERY_IMAGES].reverse();

function getReviewTitle(text) {
  const first = text.split(/[.!,]/)[0].trim();
  return first.length > 5 ? first : text.substring(0, 50);
}

function formatSoldLabel(n) {
  if (n == null || Number.isNaN(Number(n))) return '';
  const num = Math.max(0, Math.floor(Number(n)));
  if (num >= 1000) {
    const k = num / 1000;
    const s = k >= 10 ? String(Math.round(k)) : k.toFixed(1).replace(/\.0$/, '');
    return `${s}k+ sold`;
  }
  return `${num.toLocaleString('en-IN')}+ sold`;
}


// Brand Name (footer / assets)
const BRAND_NAME = "Ajnaa Jewels";
const AJNAA_INSTAGRAM_URL = 'https://www.instagram.com/ajnaajewels/';
/** Display label for Instagram follower count (reviews sidebar + links) */
const AJNAA_INSTAGRAM_FOLLOWERS_LABEL = '78.6K';

/** Reviews UI — brand burgundy accent */
const REVIEW_ACCENT = '#651F39';
const REVIEW_RING_TRACK = '#ede4e8';
const REVIEW_SOFT = 'rgba(101, 31, 57, 0.09)';
const REVIEW_ACCENT_BORDER = 'rgba(101, 31, 57, 0.25)';

// Product Video — draggable floating card (rana_kavita25 reel clip)
const PRODUCT_VIDEO = PDP_DRAGGABLE_VIDEO;

// Product Details
const PRODUCT_NAME = "Ghats of Varanasi Wall Decor | Rectangular | Backside Hanging Hook | Handpainted | Made in India | Ajnaa Jewels";
const PRODUCT_PRICE = 1945;
const PRODUCT_ORIGINAL_PRICE = 2145;
const PRODUCT_DISCOUNT = 9;
const PRODUCT_SKU = "SS-LB-NP-TT-001";
const PRODUCT_DESCRIPTION = "Hand-finished kundan and pearl work by Indian artisans — this piece is designed for weddings, festivals, and occasions where you want jewellery that photographs beautifully and feels comfortable to wear for hours. The setting is checked for smooth edges, secure clasps, and even stone alignment. Pair it with silk, organza, or minimal fusion fits. Each order supports small workshops and careful quality control before dispatch.";
const PRODUCT_BRAND = "Ajnaa Jewels";
const PRODUCT_COLORS = [];
const PRODUCT_SIZES = [];
/** Social proof — shown next to rating & reviews on the buy box */
const PRODUCT_REVIEW_COUNT = 320;
const PRODUCT_SOLD_COUNT = 480;

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
  'Kundan & pearls',
  'Wedding edits',
  'Hand-set stones',
  'Customer favourites',
  'Lightweight wear',
  'Real customer stories',
  'Festive & bridal',
  'Nickel-conscious picks',
  'Gift-ready boxes',
  'Shop Ajnaa Jewels',
  'Handmade in India',
];

/** Short keyword chips under rating / reviews on the buy box */
const PDP_KEYWORD_TAGS = ['Perfect gifting', 'Timeless design', 'Trusted quality', 'Festive ready'];

const PDP_BREADCRUMB_MID = 'Deal of the Week';
const PDP_GIFT_PROMO =
  'Complimentary Festive Gift worth ₹599/- with every order';
const PDP_COUPON_CODE = 'DEAL10';
const PDP_COUPON_COPY =
  'Get an extra 10% off on top picks — use code DEAL10';

/** Trust row below CTAs (icons + labels) */
const PDP_TRUST_FEATURES = [
  {
    label: 'Easy 3 Days Return',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  {
    label: 'COD Available',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    label: '6 Month Maintenance Warranty',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: 'Anti-Tarnish',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.5 3 4 5.5 4 8a4 4 0 11-8 0c0-2.5 1.5-5 4-8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v2M10 13h4" />
      </svg>
    ),
  },
];

// ============================================
// END OF EDITABLE SECTION
// ============================================

// Fallback blurbs for image modals — short, casual (matches review.json tone)
const dummyReviews = [
  { name: 'Priya Sharma', rating: 5, title: 'Wedding ready', text: 'Choker sat perfectly with my lehenga. Didn’t feel heavy by midnight — cousins asked where I got it.', date: '1/20/2025', type: 'product' },
  { name: 'Anjali Mehta', rating: 5, title: 'Secure clasp', text: 'Back of the necklace doesn’t poke. Clasp clicks in properly; I’m not worried about it opening on the dance floor.', date: '1/18/2025', type: 'product' },
  { name: 'Riya Patel', rating: 4, title: 'Gift for sister', text: 'Earrings for roka — she said hooks don’t hurt. 4 stars only because delivery took 4 days.', date: '1/15/2025', type: 'product' },
  { name: 'Kavya Reddy', rating: 5, title: 'Looks like the reel', text: 'Saw styling on IG — stones match what arrived. Pearls are evenly sized, not lumpy.', date: '1/12/2025', type: 'product' },
  { name: 'Meera Singh', rating: 5, title: 'Office day subtle', text: 'Small studs for everyday — not loud under office lights. Comfortable full day.', date: '1/10/2025', type: 'product' },
  { name: 'Sneha Verma', rating: 5, title: 'Quick delivery', text: 'Came in a proper box with cloth pouches. No rattling in transit.', date: '1/08/2025', type: 'product' },
  { name: 'Divya Nair', rating: 4, title: 'Nice finish', text: 'Gold tone even across the set. One tiny thread on the pouch — jewellery itself fine.', date: '1/05/2025', type: 'product' },
  { name: 'Pooja Mehta', rating: 5, title: 'Mother’s gift', text: 'Bought bangles for mum — she has thin wrists; fit was ok with the extra links.', date: '1/03/2025', type: 'product' },
  { name: 'Neha Kapoor', rating: 5, title: 'Second buy', text: 'First was jhumkas. This time a long necklace — same quality of setting.', date: '12/30/2024', type: 'product' },
  { name: 'Aarti Desai', rating: 5, title: 'Photos well', text: 'Wore for a shoot — didn’t reflect weird under camera flash. Makeup artist kept the set.', date: '12/28/2024', type: 'product' },
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
  const productImages = passedProduct?.galleryImages?.length
    ? passedProduct.galleryImages
    : passedProduct?.image
      ? [passedProduct.image, ...AJNAA_PRODUCT_IMAGES.filter((u) => u !== passedProduct.image)]
      : LE108_PDP_GALLERY_IMAGES;
  const productRating  = passedProduct?.rating        ?? 4.8;
  const productReviews = passedProduct?.reviewCount   ?? PRODUCT_REVIEW_COUNT;
  const productSoldCount =
    passedProduct?.soldCount ?? passedProduct?.sold ?? PRODUCT_SOLD_COUNT;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [pincodeInput, setPincodeInput] = useState('');
  const [isAISummaryExpanded, setIsAISummaryExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalImageIndex, setSelectedModalImageIndex] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isGridModalOpen, setIsGridModalOpen] = useState(false);
  const [gridModalImages, setGridModalImages] = useState([]);
  const [gridModalReview, setGridModalReview] = useState(null);
  const [activeTab, setActiveTab] = useState('product');
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [productSortBy, setProductSortBy] = useState('most-recent');

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [instagramLoading, setInstagramLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoCard, setShowVideoCard] = useState(true);
  const [wildVideoIdx, setWildVideoIdx] = useState(null);
  const [pdpWildMuted, setPdpWildMuted] = useState(true);
  const [pdpWildLiked, setPdpWildLiked] = useState(false);
  const pdpWildVideoRef = React.useRef(null);
  const pdpWildLastWheel = React.useRef(0);
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

  const instagramPosts = INSTAGRAM_POST_URLS;


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

  const pdpReelCount = SCRAPSHALA_SHOP_VIDEOS.length;

  useEffect(() => {
    if (wildVideoIdx === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setWildVideoIdx(null);
      if (e.key === 'ArrowLeft') {
        setWildVideoIdx((i) => (i != null && i > 0 ? i - 1 : i));
      }
      if (e.key === 'ArrowRight') {
        setWildVideoIdx((i) => (i != null && i < pdpReelCount - 1 ? i + 1 : i));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [wildVideoIdx, pdpReelCount]);

  useEffect(() => {
    if (wildVideoIdx !== null && pdpWildVideoRef.current) {
      pdpWildVideoRef.current.muted = pdpWildMuted;
    }
  }, [wildVideoIdx, pdpWildMuted]);

  
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
            className="close-btn absolute top-2 right-2 z-20 w-7 h-7 bg-black/60 hover:bg-black/80 rounded-none flex items-center justify-center text-white"
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

          {/* Breadcrumb — reference-style trail */}
          <nav className="mb-5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-gray-500">
            <button type="button" onClick={onHomeClick} className="text-gray-500 transition-colors hover:text-gray-800">
              Home
            </button>
            <span className="text-gray-400" aria-hidden>
              &gt;
            </span>
            <span className="text-gray-500">{PDP_BREADCRUMB_MID}</span>
            <span className="text-gray-400" aria-hidden>
              &gt;
            </span>
            <span className="max-w-[min(100%,14rem)] truncate font-medium text-gray-800 sm:max-w-none">{productName}</span>
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
                        className="w-full aspect-square overflow-hidden rounded-none border-2 transition-all"
                        style={{ borderColor: selectedImage === i ? '#1a1a1a' : '#e5e7eb' }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  {/* Main image + arrows */}
                  <div className="relative flex-1 rounded-none overflow-hidden bg-gray-50">
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
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-none bg-white shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
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
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-none bg-white shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
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
                          className="w-16 h-16 shrink-0 rounded-none border-2 overflow-hidden transition-all"
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

            {/* RIGHT — buy box (reference-style layout; rating + keyword block preserved) */}
            <div className="flex flex-col gap-4 lg:max-w-xl lg:justify-self-end">
              {/* Title + wishlist */}
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-xl font-semibold leading-snug text-gray-900 md:text-2xl">{productName}</h1>
                <button
                  type="button"
                  onClick={() => setWishlisted((w) => !w)}
                  className="mt-0.5 shrink-0 rounded-none p-1.5 text-gray-400 transition-colors hover:bg-stone-100 hover:text-[#651F39]"
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill={wishlisted ? '#651F39' : 'none'}
                    stroke={wishlisted ? '#651F39' : 'currentColor'}
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Rating, stars, reviews & sold + keyword checkmarks — unchanged content */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  <span className="font-semibold tabular-nums text-gray-900" aria-hidden>
                    {productRating.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-0.5" aria-label={`${productRating.toFixed(1)} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} width="15" height="15" viewBox="0 0 24 24" aria-hidden>
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                          fill={i <= Math.round(productRating) ? '#f97316' : '#e5e7eb'}
                        />
                      </svg>
                    ))}
                  </span>
                  <span className="hidden sm:inline text-gray-600" aria-hidden>
                    ·
                  </span>
                  <span className="text-gray-500">
                    {productReviews > 0
                      ? `${Number(productReviews).toLocaleString('en-IN')} reviews`
                      : 'No reviews'}
                  </span>
                  {Number(productSoldCount) > 0 && (
                    <>
                      <span className="hidden sm:inline text-gray-600" aria-hidden>
                        ·
                      </span>
                      <span className="text-gray-500">{formatSoldLabel(productSoldCount)}</span>
                    </>
                  )}
                </div>
                <ul
                  className="m-0 flex list-none flex-wrap items-center gap-y-1.5 p-0"
                  aria-label="Product highlights"
                >
                  {PDP_KEYWORD_TAGS.map((kw, i) => (
                    <li key={kw} className="flex items-center text-[13px] text-stone-700 sm:text-sm">
                      {i > 0 && (
                        <span
                          className="mx-2.5 h-3.5 w-px shrink-0 bg-stone-300 sm:mx-3"
                          aria-hidden
                        />
                      )}
                      <span>{kw}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social share */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-none text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#1877f2' }}
                  aria-label="Share on Facebook"
                >
                  <span className="text-[11px] font-bold">f</span>
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${productName} ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-none text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#25d366' }}
                  aria-label="Share on WhatsApp"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&description=${encodeURIComponent(productName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-none text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#e60023' }}
                  aria-label="Share on Pinterest"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.132 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.397 2.967 7.397 6.931 0 4.136-2.607 7.466-6.233 7.466-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </a>
              </div>

              {/* Price */}
              <div>
                <div className="flex flex-wrap items-baseline gap-2 gap-y-1">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{productPrice.toLocaleString('en-IN')}
                  </span>
                  {productOriginal ? (
                    <span className="text-base text-gray-400 line-through">
                      ₹{productOriginal.toLocaleString('en-IN')}
                    </span>
                  ) : null}
                  {productDiscount > 0 ? (
                    <span className="text-sm font-semibold text-orange-500">{productDiscount}% off</span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-gray-500">(Inclusive of all taxes)</p>
              </div>

              <p className="text-sm font-medium text-orange-500">{PDP_GIFT_PROMO}</p>

              {/* Coupon */}
              <div className="rounded-none border border-dashed border-gray-300 bg-gray-50/80 px-3 py-3">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none text-sm font-bold text-white"
                    style={{ backgroundColor: '#f97316' }}
                  >
                    %
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-bold text-gray-900">{PDP_COUPON_CODE}</p>
                    <p className="mt-0.5 text-[13px] leading-snug text-gray-600">{PDP_COUPON_COPY}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Quantity */}
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Quantity</p>
                <div className="flex w-fit items-center rounded-none border border-gray-300">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center text-lg text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-gray-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center text-lg text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart + Buy Now — full-width stacked */}
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-none text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#f97316' }}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add To Cart
                </button>
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-none text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#111111' }}
                >
                  <span className="flex items-center gap-0.5 opacity-90" aria-hidden>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </span>
                  BUY NOW
                </button>
              </div>

              {/* Trust icons row */}
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 sm:grid-cols-4 sm:gap-3">
                {PDP_TRUST_FEATURES.map(({ label, icon }) => (
                  <div key={label} className="flex flex-col items-center gap-2 text-center">
                    <div className="text-gray-600">{icon}</div>
                    <p className="text-[11px] font-medium leading-snug text-gray-700 sm:text-xs">{label}</p>
                  </div>
                ))}
              </div>

              {/* Pincode */}
              <div className="border-t border-gray-100 pt-4">
                <p className="mb-2 text-xs font-semibold text-gray-900">Check Pincode For COD</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="ENTER YOUR PINCODE"
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="min-w-0 flex-1 rounded-none border border-gray-300 bg-white px-3 py-2.5 text-xs font-medium uppercase tracking-wide text-gray-800 placeholder:text-gray-400 placeholder:normal-case"
                  />
                  <button
                    type="button"
                    className="shrink-0 rounded-none border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-gray-800 transition-colors hover:bg-gray-50"
                  >
                    Check
                  </button>
                </div>
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


      {/* Reels — open full-screen reel modal (same pattern as home “Shop the Look”) */}
      {(() => {
        const WILD_VIDEOS = SCRAPSHALA_SHOP_VIDEOS;
        const n = WILD_VIDEOS.length;
        const idx = wildVideoIdx;
        const canWildPrev = idx != null && idx > 0;
        const canWildNext = idx != null && idx < n - 1;
        const thumbImg = idx != null ? AJNAA_PRODUCT_IMAGES[idx % AJNAA_PRODUCT_IMAGES.length] : AJNAA_PRODUCT_IMAGES[0];
        const reelLabel = idx != null ? PDP_REEL_LABELS[idx % PDP_REEL_LABELS.length] : '';

        return (
          <>
            <div className="w-full border-t border-b border-gray-100/80 bg-white py-7 md:py-8">
              <div className="w-full px-4 max-w-7xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">
                      See Ajnaa Jewels in action
                    </h2>
                  </div>
                  <a
                    href="https://www.instagram.com/ajnaajewels/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-none shrink-0 bg-white text-gray-800 border border-gray-200 shadow-sm hover:bg-white hover:border-[#651F39]/40 transition-colors"
                    style={{ textDecoration: 'none' }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
                      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                    </svg>
                    @ajnaajewels
                  </a>
                </div>
                <div className="overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                  <div className="flex gap-3 sm:gap-4 min-w-max">
                    {WILD_VIDEOS.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#651F39] focus-visible:ring-offset-2 rounded-none flex flex-col items-center"
                        onClick={() => {
                          setPdpWildMuted(false);
                          setWildVideoIdx(idx);
                        }}
                      >
                        <div className="rounded-[999px] bg-[linear-gradient(135deg,#feda75_0%,#fa7e1e_35%,#d62976_68%,#962fbf_100%)] p-[2.5px] sm:p-[3px]">
                          <div
                            className="relative overflow-hidden"
                            style={{
                              width: '103px',
                              height: '175px',
                              borderRadius: '999px',
                            }}
                          >
                            <video src={url} className="h-full w-full object-cover" autoPlay muted playsInline loop />
                            <div
                              className="pointer-events-none absolute inset-0"
                              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 45%)' }}
                            />
                          </div>
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
                className="fixed inset-0 z-[999] flex items-stretch md:items-center justify-center md:p-5 bg-gradient-to-b from-stone-100/90 via-stone-200/85 to-stone-400/55 backdrop-blur-2xl"
                onClick={() => setWildVideoIdx(null)}
                onWheel={(e) => {
                  e.preventDefault();
                  const now = Date.now();
                  if (now - pdpWildLastWheel.current < 420) return;
                  pdpWildLastWheel.current = now;
                  const dy = e.deltaY;
                  setWildVideoIdx((cur) => {
                    if (cur == null) return cur;
                    const next = dy > 0 ? Math.min(cur + 1, n - 1) : Math.max(cur - 1, 0);
                    return next === cur ? cur : next;
                  });
                }}
                role="presentation"
              >
                <div
                  className="flex w-full max-w-6xl flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-center md:gap-4"
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Ajnaa Jewels reels"
                >
                  {/* Desktop: previous preview */}
                  <div className="hidden w-[148px] shrink-0 flex-col md:flex">
                    {canWildPrev ? (
                      <button
                        type="button"
                        onClick={() => setWildVideoIdx((i) => (i != null && i > 0 ? i - 1 : i))}
                        className="group relative w-full overflow-hidden rounded-none bg-stone-900 shadow-lg ring-2 ring-white/50 aspect-[9/16] max-h-[300px]"
                        aria-label="Previous reel preview"
                      >
                        <video
                          src={WILD_VIDEOS[idx - 1]}
                          muted
                          playsInline
                          loop
                          preload="metadata"
                          className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                        />
                      </button>
                    ) : (
                      <div className="flex w-full aspect-[9/16] max-h-[300px] items-center justify-center rounded-none border border-dashed border-stone-300/80 bg-stone-200/50 text-center text-xs font-medium text-stone-500">
                        First reel
                      </div>
                    )}
                  </div>

                  {/* Main reel (phone-style) */}
                  <div
                    className="relative mx-auto w-full max-w-[420px] overflow-hidden shadow-[0_32px_90px_-20px_rgba(0,0,0,0.35)] ring-2 ring-white/25 rounded-none bg-stone-950 h-[100dvh] md:h-[min(88dvh,780px)] md:max-h-[88dvh]"
                  >
                    <video
                      ref={pdpWildVideoRef}
                      key={`pdp-wild-${idx}`}
                      src={WILD_VIDEOS[idx]}
                      className="pointer-events-none relative z-0 h-full w-full object-cover"
                      autoPlay
                      loop
                      playsInline
                      muted={pdpWildMuted}
                    />

                    <button
                      type="button"
                      disabled={!canWildPrev}
                      onClick={(e) => { e.stopPropagation(); setWildVideoIdx((i) => (i != null && i > 0 ? i - 1 : i)); }}
                      className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-none bg-white/25 text-white backdrop-blur-md transition-opacity md:hidden disabled:opacity-25"
                      aria-label="Previous reel"
                    >
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      disabled={!canWildNext}
                      onClick={(e) => { e.stopPropagation(); setWildVideoIdx((i) => (i != null && i < n - 1 ? i + 1 : i)); }}
                      className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-none bg-white/25 text-white backdrop-blur-md transition-opacity md:hidden disabled:opacity-25"
                      aria-label="Next reel"
                    >
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <div
                      className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-5 pb-2"
                      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)' }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-none overflow-hidden border-2 border-white shrink-0 bg-stone-800">
                          <img src={thumbImg} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white text-sm font-semibold leading-none truncate">Ajnaa Jewels</p>
                          <p className="text-white/75 text-xs mt-0.5 truncate">
                            Reel {idx + 1} of {n}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setWildVideoIdx(null)}
                        className="w-8 h-8 rounded-none bg-black/45 flex items-center justify-center text-white shrink-0"
                        aria-label="Close reels"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 top-4 z-20 flex gap-1">
                      {WILD_VIDEOS.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setWildVideoIdx(i)}
                          className="rounded-none transition-all"
                          style={{
                            width: i === idx ? '16px' : '6px',
                            height: '6px',
                            background: i === idx ? '#fff' : 'rgba(255,255,255,0.45)',
                          }}
                          aria-label={`Reel ${i + 1}`}
                        />
                      ))}
                    </div>

                    <div className="absolute right-3 bottom-44 z-20 flex flex-col items-center gap-5">
                      <button type="button" onClick={() => setPdpWildLiked((l) => !l)} className="flex flex-col items-center gap-1">
                        <div className={`w-11 h-11 rounded-none flex items-center justify-center ${pdpWildLiked ? 'bg-pink-500' : 'bg-black/40'}`}>
                          <svg viewBox="0 0 24 24" fill={pdpWildLiked ? 'white' : 'none'} stroke="white" strokeWidth="2" className="w-5 h-5">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                        </div>
                        <span className="text-white text-xs font-medium">{pdpWildLiked ? 'Liked' : 'Like'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const m = !pdpWildMuted;
                          setPdpWildMuted(m);
                          if (pdpWildVideoRef.current) pdpWildVideoRef.current.muted = m;
                        }}
                        className="flex flex-col items-center gap-1"
                      >
                        <div className="w-11 h-11 rounded-none bg-black/40 flex items-center justify-center">
                          {pdpWildMuted ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                              <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                            </svg>
                          )}
                        </div>
                        <span className="text-white text-xs font-medium">{pdpWildMuted ? 'Unmute' : 'Mute'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          navigator.share
                            ? navigator.share({ title: 'Ajnaa Jewels', text: reelLabel, url: window.location.href })
                            : navigator.clipboard?.writeText(window.location.href)
                        }
                        className="flex flex-col items-center gap-1"
                      >
                        <div className="w-11 h-11 rounded-none bg-black/40 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                          </svg>
                        </div>
                        <span className="text-white text-xs font-medium">Share</span>
                      </button>
                    </div>

                    <div
                      className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-6 pt-16"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 55%, transparent)' }}
                    >
                      <p className="text-white text-sm font-medium mb-2 line-clamp-2">{reelLabel}</p>
                      <a
                        href="https://www.instagram.com/ajnaajewels/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center py-3 rounded-none text-sm font-bold text-white bg-[#651F39] hover:opacity-95 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Follow @ajnaajewels
                      </a>
                    </div>
                  </div>

                  {/* Desktop: next preview */}
                  <div className="hidden w-[148px] shrink-0 flex-col md:flex">
                    {canWildNext ? (
                      <button
                        type="button"
                        onClick={() => setWildVideoIdx((i) => (i != null && i < n - 1 ? i + 1 : i))}
                        className="group relative aspect-[9/16] max-h-[300px] w-full overflow-hidden rounded-none bg-stone-900 shadow-lg ring-2 ring-white/50"
                        aria-label="Next reel preview"
                      >
                        <video
                          src={WILD_VIDEOS[idx + 1]}
                          muted
                          playsInline
                          loop
                          preload="metadata"
                          className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                        />
                      </button>
                    ) : (
                      <div className="flex aspect-[9/16] max-h-[300px] w-full items-center justify-center rounded-none border border-dashed border-stone-300/80 bg-stone-200/50 text-center text-xs font-medium text-stone-500">
                        Last reel
                      </div>
                    )}
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
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#651F39] tracking-wide">
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
                <div className="rounded-none border border-stone-200/80 bg-white px-4 py-5 md:p-5">
                  {/* Rating Score Card */}
                  <div className="mb-5 text-center">
                    <div
                      className="relative mx-auto mb-4 flex h-[7.25rem] w-[7.25rem] items-center justify-center rounded-full"
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
                      className="inline-flex items-center gap-2 rounded-none border border-stone-200/70 px-3.5 py-1.5 text-xs font-medium"
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
                      96% perfect for gifting
                    </div>
                  </div>

                  <div className="mb-4 space-y-1.5">
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
                        <div className="h-3 min-w-0 flex-1 overflow-hidden rounded-none bg-stone-200/90">
                          <div
                            className="h-full rounded-none transition-all duration-300"
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

                  <div className="divide-y divide-stone-200/80 border-t border-stone-200/80">
                    {[
                      {
                        icon: (
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ),
                        label: 'Weddings & festive',
                        value: '96%',
                      },
                      {
                        icon: (
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ),
                        label: 'Kundan sparkle',
                        value: '9/10',
                      },
                      {
                        icon: (
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        ),
                        label: 'Comfortable wear',
                        value: '98%',
                      },
                    ].map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 py-2 first:pt-2.5">
                        <div className="shrink-0" style={{ color: REVIEW_ACCENT }}>
                          {stat.icon}
                        </div>
                        <div className="min-w-0 flex-1 text-left leading-tight">
                          <span className="text-sm font-semibold text-stone-900">{stat.value}</span>
                          <span className="text-xs text-stone-600"> · {stat.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 border-t border-stone-200/80 pt-3">
                    <a
                      href={AJNAA_INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open @ajnaajewels on Instagram"
                      className="flex items-center gap-3.5 rounded-none border border-stone-200/70 bg-white px-3.5 py-3 transition-colors hover:bg-stone-50/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#651F39]/35 focus-visible:ring-offset-2"
                      style={{ textDecoration: 'none' }}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center" aria-hidden>
                        <svg width="28" height="28" viewBox="0 0 24 24" className="overflow-visible">
                          <defs>
                            <linearGradient
                              id="igGradReviewsSidebar"
                              x1="0%"
                              y1="100%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#f09433" />
                              <stop offset="25%" stopColor="#e6683c" />
                              <stop offset="50%" stopColor="#dc2743" />
                              <stop offset="75%" stopColor="#cc2366" />
                              <stop offset="100%" stopColor="#bc1888" />
                            </linearGradient>
                          </defs>
                          <path
                            fill="url(#igGradReviewsSidebar)"
                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                          />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1 text-left">
                        <div className="flex flex-col gap-1.5">
                          <p className="text-[13px] font-semibold leading-snug text-stone-900">@ajnaajewels</p>
                          <p className="text-[11px] leading-snug text-stone-600">
                            <span className="font-semibold tabular-nums text-stone-800">{AJNAA_INSTAGRAM_FOLLOWERS_LABEL}</span>
                            {' '}
                            followers
                          </p>
                        </div>
                      </div>
                      <svg className="h-4 w-4 shrink-0 self-center text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Reviews */}
            <div className="mt-10 lg:mt-0 lg:col-span-2">

              {/* AI Insight — premium, minimal */}
              <div className="mb-8 overflow-hidden rounded-none border border-stone-200/60 bg-gradient-to-b from-white to-stone-50/40 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="flex items-baseline justify-between gap-4 border-b border-stone-200/50 px-6 py-4">
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400">Insight</span>
                  <span className="text-[11px] text-stone-500">Verified reviews</span>
                </div>

                <div className="px-6 pb-2 pt-5">
                  <h4 className="mb-3 font-serif text-xl font-normal tracking-tight text-stone-900 md:text-[1.35rem]">
                    What jewellery lovers are saying
                  </h4>
                  <p className="text-[15px] leading-[1.65] text-stone-600">
                    {isAISummaryExpanded ? (
                      <>
                        Shoppers praise Ajnaa Jewels for fine jewellery that feels comfortable to wear for hours — secure clasps, smooth settings, and stones that match what they saw online. Reviews often mention kundan and pearl work, lightweight necklaces and earrings for weddings and festivals, and pieces that photograph well for reels and family events. Many buy again for matching sets or gifts, and note premium boxes and pouches that feel occasion-ready.{' '}
                        <button
                          type="button"
                          onClick={() => setIsAISummaryExpanded(false)}
                          className="text-[13px] font-medium text-stone-800 underline decoration-stone-300 underline-offset-[3px] transition-colors hover:text-stone-950 hover:decoration-stone-400"
                        >
                          Read less
                        </button>
                      </>
                    ) : (
                      <>
                        Buyers love our handcrafted jewellery for weddings, festive wear, and gifting — with attention to finish, stone sparkle, and pieces that work from silk to everyday fusion looks.{' '}
                        <button
                          type="button"
                          onClick={() => setIsAISummaryExpanded(true)}
                          className="text-[13px] font-medium text-stone-800 underline decoration-stone-300 underline-offset-[3px] transition-colors hover:text-stone-950 hover:decoration-stone-400"
                        >
                          Read more
                        </button>
                      </>
                    )}
                  </p>
                </div>

                <div className="px-6 pb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] leading-relaxed text-stone-500">
                  {[
                    'Kundan & pearls',
                    'Bridal & festive',
                    'Handcrafted',
                    'Lightweight wear',
                    'Gift-ready',
                    'Made in India',
                    'Everyday & occasion',
                  ].map((kw, i) => (
                    <span key={kw} className="inline-flex items-center gap-2">
                      {i > 0 && (
                        <span className="text-stone-300 select-none" aria-hidden>
                          ·
                        </span>
                      )}
                      {kw}
                    </span>
                  ))}
                </div>

                <div className="flex border-t border-stone-200/50">
                  {[
                    ['product', 'Product reviews'],
                    ['brand', 'Brand reviews'],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveTab(id)}
                      className={`flex-1 py-3.5 text-center text-[13px] font-medium transition-colors ${
                        activeTab === id
                          ? 'border-b-2 border-stone-900 text-stone-900'
                          : 'border-b-2 border-transparent text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
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
                      <span className="rounded-none bg-stone-100 px-3 py-1 text-xs font-medium tabular-nums text-stone-600">
                        {customerReviewImages.length} uploads
                      </span>
                    </div>
                    
                    {/* Instagram-style Photo Gallery Grid - Show first 6, then "View all" */}
                    {customerReviewImages.length > 0 ? (
                      <div className="mb-6 flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:overflow-x-visible md:pb-0">
                        {customerReviewImages.slice(0, 6).map((image, i) => (
                          <div
                            key={i}
                            className="group relative shrink-0 cursor-pointer overflow-hidden rounded-none ring-1 ring-stone-200/80 transition-shadow hover:shadow-md"
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
                            className="relative shrink-0 cursor-pointer overflow-hidden rounded-none ring-1 ring-stone-200/80 transition-opacity hover:opacity-95"
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
                        className="min-h-[44px] cursor-pointer appearance-none rounded-none border border-stone-200 bg-white px-4 py-2 pr-9 text-[17px] font-medium text-stone-800 shadow-sm transition-colors hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300/40 md:min-h-0 md:text-sm"
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
                      return (
                        <div
                          key={review.id}
                          className="rounded-none border border-stone-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:p-5"
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
                              <svg className="h-3 w-3 shrink-0 text-[#651F39]" fill="currentColor" viewBox="0 0 20 20">
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
                            {review.text.length <= 140 || expandedReviews[`product-${review.id}`]
                              ? review.text
                              : `${review.text.slice(0, 140)}...`}
                            {review.text.length > 140 && (
                              <button
                                type="button"
                                onClick={() => handleReadMore(review.id, 'product')}
                                className="ml-1 text-xs font-medium text-stone-500 underline decoration-stone-200 underline-offset-2 hover:text-stone-800"
                              >
                                {expandedReviews[`product-${review.id}`] ? 'less' : 'more'}
                              </button>
                            )}
                          </p>

                          {review.images?.length > 0 && (
                            <div className="mb-2 flex gap-2">
                              {review.images.map((image, imgIndex) => (
                                <div
                                  key={imgIndex}
                                  className="h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded-none ring-1 ring-stone-200/80 transition-opacity hover:opacity-85"
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
                        </div>
                      );
                    })}
                  </div>

                  {reviewsToShow < reviews.length && (
                    <div className="mt-8 text-center">
                      <button
                        type="button"
                        onClick={() => setReviewsToShow(reviews.length)}
                        className="rounded-none border border-stone-300 bg-white px-8 py-3 text-sm font-semibold text-stone-800 shadow-sm transition-all hover:border-stone-400 hover:bg-stone-50 md:text-base"
                      >
                        View More Reviews
                      </button>
                    </div>
                  )}

                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      className="rounded-none bg-stone-900 px-8 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-stone-800 md:text-base"
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
                      <span className="rounded-none bg-stone-100 px-3 py-1 text-xs font-medium tabular-nums text-stone-600">
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
        className="fixed bottom-5 left-5 w-12 h-12 md:w-auto md:h-auto md:px-5 md:py-3 rounded-none flex items-center justify-center md:gap-2.5 text-sm font-semibold text-white cursor-pointer z-[1000] transition-all duration-300 hover:scale-105 active:scale-95"
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
            className="relative w-full md:w-2/5 max-w-4xl h-full md:h-[90vh] bg-gray-50 rounded-none shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 bg-black bg-opacity-60 border-none rounded-none w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 z-[10001] hover:bg-opacity-80"
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
                <div className="max-w-xs mx-auto w-full">
                  {/* Loading Skeleton */}
                  {instagramLoading && (
                    <div className="space-y-6">
                      {[1, 2, 3, 4].map((i) => (
                    <div
                          key={`skeleton-${i}`}
                          className="w-full bg-gray-200 rounded-none overflow-hidden animate-pulse"
                          style={{ height: '380px' }}
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
                    {instagramPosts.map((url) => (
                      <div
                        key={url}
                        className="w-full flex justify-center mb-4 last:mb-0"
                      >
                        <blockquote 
                          className="instagram-media" 
                          data-instgrm-permalink={url}
                          data-instgrm-version="14"
                          style={{ maxWidth: '260px', width: '100%' }}
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
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#651F39] mb-3 tracking-wide">
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
      <PhotoGallery title="More from Ajnaa Jewels" subtitle="Handcrafted with love — jewelry for every moment" />

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
              className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-none hover:bg-gray-100"
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
                  className="relative aspect-square rounded-none overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-gray-200 shadow-sm"
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
            className="relative w-full max-w-6xl h-[90vh] bg-white rounded-none overflow-hidden flex flex-col md:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors z-20 bg-white rounded-none p-2 shadow-lg"
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
                className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 transition-colors z-10 bg-white bg-opacity-80 rounded-none p-2 shadow-lg"
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
                className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 transition-colors z-10 bg-white bg-opacity-80 rounded-none p-2 shadow-lg"
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
              className="max-w-full max-h-full object-contain rounded-none"
            />
            
              {/* Image Counter - Bottom Left */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1.5 rounded-none text-xs md:text-sm">
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
                      <svg className="w-5 h-5 text-[#651F39] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                        style={{ fill: i < selectedReview.rating ? '#651F39' : '#d1d5db' }}
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
                    <span className="inline-block px-3 py-1.5 text-xs font-medium rounded-none" style={{ backgroundColor: 'rgba(101, 31, 57, 0.1)', color: '#651F39' }}>
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
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors px-4 py-2 rounded-none hover:bg-gray-50"
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
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors px-4 py-2 rounded-none hover:bg-gray-50"
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
                    <svg className="w-4 h-4 text-[#651F39]" fill="currentColor" viewBox="0 0 20 20">
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
                        <stop offset="0%" stopColor="#651F39" />
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
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-none" style={{ backgroundColor: 'rgba(101, 31, 57, 0.1)', color: '#651F39' }}>
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
