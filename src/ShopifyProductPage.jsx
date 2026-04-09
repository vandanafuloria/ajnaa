import React, { useState, useEffect, useCallback } from 'react';
import ShopifyHeader from './ShopifyHeader';
import ShopifyFooter from './ShopifyFooter';
import AIBrandEngine from './AIBrandEngine';
import ProductCard from './ProductCard';
import TrustSignalsRotator from './TrustSignals';

// ============================================
// EDIT THESE VALUES TO CUSTOMIZE YOUR PRODUCT
// ============================================

import productHeader from './assets/product_header.png';
import productReviewImg1 from './assets/Product Images/1.png';
import productReviewImg2 from './assets/Product Images/2.png';
import productReviewImg3 from './assets/Product Images/3.png';
import productReviewImg4 from './assets/Product Images/4.png';
import productReviewImg5 from './assets/Product Images/5.png';
import productReviewImg6 from './assets/Product Images/6.png';
import productReviewImg7 from './assets/Product Images/7.png';
import productReviewImg8 from './assets/Product Images/8.png';
import productReviewImg9 from './assets/Product Images/9.png';
import productReviewImg10 from './assets/Product Images/10.png';
import productReviewImg11 from './assets/Product Images/11.png';
import productReviewImg12 from './assets/Product Images/12.png';
import productReviewImg13 from './assets/Product Images/13.png';
import productReviewImg14 from './assets/Product Images/14.png';
import productReviewImg15 from './assets/Product Images/15.png';
import { DUROFLEX_SHOP_VIDEOS } from './duroflexShopVideos';
import { bestSellerProducts } from './duroflexBestSellers';

import reviewData from '../review.json';

/** Local assets for review UIs — product tab uses this order; brand tab uses {@link BRAND_REVIEW_IMAGES} (reversed). */
const PRODUCT_REVIEW_IMAGES = [
  productReviewImg1,
  productReviewImg2,
  productReviewImg3,
  productReviewImg4,
  productReviewImg5,
  productReviewImg6,
  productReviewImg7,
  productReviewImg8,
  productReviewImg9,
  productReviewImg10,
  productReviewImg11,
  productReviewImg12,
  productReviewImg13,
  productReviewImg14,
  productReviewImg15,
];
const BRAND_REVIEW_IMAGES = [...PRODUCT_REVIEW_IMAGES].reverse();

// Duroflex product imagery — main gallery only (CDN)
const DUROFLEX_PDP_IMAGES = [
  'https://www.duroflexworld.com/cdn/shop/files/Airboost-6_8_jpg.jpg?v=1773923691',
  'https://www.duroflexworld.com/cdn/shop/files/Airboost-3_6_jpg.jpg?v=1773923784',
  'https://www.duroflexworld.com/cdn/shop/files/2_2026e6ee-a9e8-4ff5-88c7-104fea9cefb8.jpg?v=1744560694',
  'https://www.duroflexworld.com/cdn/shop/files/1_caa4360f-a470-4da1-9d81-78570f9f02c1.jpg?v=1749639354',
];

function getReviewTitle(text) {
  const first = text.split(/[.!,]/)[0].trim();
  return first.length > 5 ? first : text.substring(0, 50);
}


// Brand Name (footer / assets)
const BRAND_NAME = "Duroflex World";

/** Reviews UI — brand red (matches PDP accents) */
const REVIEW_ACCENT = '#DB2A20';
const REVIEW_RING_TRACK = '#fce8e7';
const REVIEW_SOFT = 'rgba(219, 42, 32, 0.09)';
const REVIEW_ACCENT_BORDER = 'rgba(219, 42, 32, 0.25)';

// Product Images Array - All product images
const PRODUCT_IMAGES = [...DUROFLEX_PDP_IMAGES];

// Product Video — draggable card + modals use Duroflex CDN reels
const PRODUCT_VIDEO = DUROFLEX_SHOP_VIDEOS[0];

// Product Details
const PRODUCT_NAME = "Duropedic Airboost 6.8 Arctic Ice Mattress";
const PRODUCT_PRICE = 26197;
const PRODUCT_ORIGINAL_PRICE = 39693;
const PRODUCT_DISCOUNT = 34;
const PRODUCT_SKU = "DF-AIRBOOST-68-ARCTIC";
const PRODUCT_DESCRIPTION = "The Duropedic Airboost 6.8 combines breathable Airboost comfort layers with a cool-touch Arctic Ice quilted cover — designed for deeper, undisturbed sleep in Indian weather. Duropedic engineering supports neutral spine alignment for back and side sleepers, while advanced foams help isolate motion so partners sleep peacefully. Premium knit fabric with anti-microbial treatment keeps the sleep surface fresher between washes; roll-pack delivery makes setup straightforward in any bedroom.";
const PRODUCT_BRAND = "Duroflex";
const PRODUCT_COLORS = [
  { name: "Arctic Ice", value: "#7eb8c9" },
  { name: "Pearl Grey", value: "#b8b5b0" },
];
const PRODUCT_SIZES = [
  "72 × 36 in (Single)",
  "72 × 60 in (Queen)",
  "72 × 72 in (King)",
  "78 × 72 in (King XL)",
];

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

// Short captions under PDP reel pills (Duroflex shop clips)
const PDP_REEL_LABELS = [
  'Airboost comfort',
  'Designed to destress',
  'Natural Living',
  'Customer favourites',
  'Better sleep tonight',
  'Duropedic support',
  'Breathable layers',
  'Real Indian homes',
  'Mattress innovation',
  'Shop Duroflex World',
  'Rest worth dreaming of',
];

// ============================================
// END OF EDITABLE SECTION
// ============================================

// Dummy review templates for images without reviews
const dummyReviews = [
  {
    name: 'Priya Sharma',
    rating: 5,
    title: 'Finally sleeping through the night',
    text: 'We switched from a budget spring mattress to this Duropedic Airboost — the difference in support and temperature is night and day. Unboxing was simple and it fluffed up evenly within a day.',
    date: '1/20/2025',
    type: 'product'
  },
  {
    name: 'Anjali Mehta',
    rating: 4,
    title: 'Cooler surface than our old foam bed',
    text: 'The Arctic Ice cover really does feel cooler to the touch. My husband runs hot and he has stopped hogging the fan side of the bed. Edge support is better than expected for a rolled mattress.',
    date: '1/18/2025',
    type: 'product'
  },
  {
    name: 'Riya Patel',
    rating: 5,
    title: 'Motion isolation works as advertised',
    text: 'I am a light sleeper and my partner moves a lot — I barely notice now. The mattress has a premium look in person and matches the Duroflex World listing photos closely.',
    date: '1/15/2025',
    type: 'product'
  },
  {
    name: 'Kavya Reddy',
    rating: 4,
    title: 'Great for back sleepers',
    text: 'I needed firmer lumbar support after a minor strain. This bed hits a nice middle ground — supportive without feeling like a slab. Delivery team placed it exactly where we asked.',
    date: '1/12/2025',
    type: 'product'
  },
  {
    name: 'Meera Singh',
    rating: 5,
    title: 'Worth it for parents',
    text: 'Bought for my parents who wanted orthopedic-style comfort. They are very happy and say getting out of bed is easier. Packaging and warranty booklet were clear.',
    date: '1/10/2025',
    type: 'product'
  },
  {
    name: 'Sneha Verma',
    rating: 5,
    title: 'Second Duroflex in our home',
    text: 'We already had a Duroflex in the guest room — this Airboost 6.8 for the master feels a step up in breathability. No regrets; would buy from Duroflex World again.',
    date: '1/08/2025',
    type: 'product'
  },
  {
    name: 'Divya Nair',
    rating: 4,
    title: 'Strong value vs imports we tried',
    text: 'We almost bought an imported boxed brand. Duroflex gave similar specs, faster local support, and a better trial story from friends. The mattress feels high quality.',
    date: '1/05/2025',
    type: 'product'
  },
  {
    name: 'Pooja Mehta',
    rating: 5,
    title: 'Consistent firmness across the surface',
    text: 'No obvious dip in the middle after two months. We rotate per the care guide. The anti-microbial cover is a nice touch for our toddler jumping on the bed sometimes!',
    date: '1/03/2025',
    type: 'product'
  },
  {
    name: 'Neha Kapoor',
    rating: 4,
    title: 'Looks smart with our bed frame',
    text: 'Height works with our existing king frame without looking too thick. Sheets fit well. Subtle quilting pattern looks modern, not clinical.',
    date: '12/30/2024',
    type: 'product'
  },
  {
    name: 'Aarti Desai',
    rating: 5,
    title: 'Recommended to two friends already',
    text: 'Honest review — setup was easy, smell dissipated quickly, and we are both waking up less groggy. Duroflex earned our trust on this purchase.',
    date: '12/28/2024',
    type: 'product'
  }
];

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
  const [selectedSize, setSelectedSize] = useState('S');
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
  const [brandReviewsToShow, setBrandReviewsToShow] = useState(3);
  const [isBrandAISummaryExpanded, setIsBrandAISummaryExpanded] = useState(false);
  const [reviewLikes, setReviewLikes] = useState({});
  const [reviewReplies, setReviewReplies] = useState({});
  const [expandedReviews, setExpandedReviews] = useState({});
  const [productSortBy, setProductSortBy] = useState('most-recent');
  const [brandSortBy, setBrandSortBy] = useState('most-recent');
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [instagramLoading, setInstagramLoading] = useState(true);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
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

  // Handle reply functionality
  const handleReply = (reviewId, type = 'product') => {
    const key = `${type}-${reviewId}`;
    setReviewReplies(prev => ({
      ...prev,
      [key]: !prev[key]
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

  // Auto-rotate reviews carousel every 3 seconds
  useEffect(() => {
    if (shortReviews.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % shortReviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [shortReviews.length]);

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
      
      <main className="flex-1 bg-white py-8 md:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <button onClick={onHomeClick} className="hover:text-gray-700 transition-colors">Home</button>
            <span>›</span>
            <span className="text-gray-800 font-medium truncate">{productName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* LEFT: main image + thumbnails below */}
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <div
                className="relative w-full overflow-hidden cursor-zoom-in"
                style={{ backgroundColor: '#e8e3da' }}
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  src={productImages[selectedImage] || productImages[0]}
                  alt={productName}
                  className="w-full object-cover"
                  style={{ aspectRatio: '4/5' }}
                />
              </div>

              {/* Thumbnails below */}
              <div className="flex gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className="overflow-hidden flex-shrink-0 transition-all"
                    style={{
                      width: '80px',
                      height: '80px',
                      border: selectedImage === index ? '2px solid #1a1a1a' : '2px solid transparent',
                      backgroundColor: '#e8e3da',
                    }}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: product info */}
            <div className="flex flex-col gap-5">

              {/* Title */}
              <h1
                className="leading-tight"
                style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: '#1a1a1a' }}
              >
                {productName}
              </h1>

              {/* Stars + Reviews + Sold + Tags */}
              <div className="flex flex-col gap-2.5">
                {/* Stars row */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => {
                      const full = i <= Math.floor(productRating);
                      const half = !full && i === Math.ceil(productRating) && productRating % 1 >= 0.5;
                      return (
                        <svg key={i} width="18" height="18" viewBox="0 0 24 24">
                          {half && (
                            <defs>
                              <linearGradient id={`pdp-hg-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="50%" stopColor="#DB2A20"/>
                                <stop offset="50%" stopColor="#e0e0e0"/>
                              </linearGradient>
                            </defs>
                          )}
                          <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            fill={full ? '#DB2A20' : half ? `url(#pdp-hg-${i})` : '#e0e0e0'}
                          />
                        </svg>
                      );
                    })}
                    <span className="text-sm font-bold text-gray-800 ml-1">{productRating}</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-600"><span className="font-bold text-gray-900">{productReviews}</span> Reviews</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-600">
                    <span className="text-amber-500 mr-1">⚡</span>
                    <span className="font-bold text-gray-900">684</span> Sold this week
                  </span>
                </div>

                {/* Feature tags — soft pills, subtle brand accent */}
                <div className="flex flex-wrap gap-2">
                  {['Duropedic support', 'Airboost layers', 'Arctic Ice cover', 'Motion isolation', '10-year warranty'].map(label => (
                    <span
                      key={label}
                      className="inline-flex items-center rounded-full border border-stone-200/90 bg-linear-to-b from-white to-stone-50/90 px-3.5 py-1.5 text-xs font-medium tracking-wide text-stone-700 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-stone-900/3"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <TrustSignalsRotator productPage className="pt-0.5" />
              </div>

              {/* Price row */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-bold text-xl" style={{ color: '#DB2A20' }}>
                  Rs. {productPrice.toLocaleString('en-IN')}.00
                </span>
                <span className="line-through text-base" style={{ color: '#999' }}>
                  Rs. {productOriginal.toLocaleString('en-IN')}.00
                </span>
                <span className="text-xs font-bold text-white px-2 py-1" style={{ backgroundColor: '#111' }}>
                  OFF
                </span>
              </div>

              {/* Shipping note */}
              <p className="text-sm" style={{ color: '#555' }}>Shipping calculated at checkout.</p>

              <div className="border-t" style={{ borderColor: '#d4cfc7' }} />

              {/* Quantity + Add to Cart */}
              <div className="flex gap-3 items-stretch">
                <div className="flex items-center border" style={{ borderColor: '#1a1a1a' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-12 flex items-center justify-center text-xl text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-base font-semibold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-12 flex items-center justify-center text-xl text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  className="flex-1 h-12 text-white text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#DB2A20', letterSpacing: '0.12em' }}
                >
                  Add to Cart
                </button>
              </div>

              {/* Buy Now */}
              <button
                className="w-full py-3.5 text-white text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#111', letterSpacing: '0.12em' }}
              >
                Buy Now
              </button>

              {/* Add to wishlist */}
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors w-fit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
                Add to wishlist
              </button>

              <div className="border-t" style={{ borderColor: '#d4cfc7' }} />

              {/* Delivery info */}
              <div className="flex flex-col gap-4">
                {/* Estimated delivery */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: '#e8e3da' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DB2A20" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Estimated delivery</strong> in 5–7 days
                  </p>
                </div>

                {/* Free shipping */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: '#e8e3da' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DB2A20" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">Free Shipping</p>
                </div>

                {/* Query */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: '#e8e3da' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DB2A20" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">About your query!</p>
                </div>
              </div>

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
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full shrink-0 bg-gray-50 text-gray-800 border border-gray-200 shadow-sm hover:bg-white hover:border-[#DB2A20]/40 transition-colors"
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
                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB2A20] focus-visible:ring-offset-2 rounded-[999px] flex flex-col items-center"
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
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#DB2A20] tracking-wide">
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
                      93% would buy again
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
                        label: 'Would recommend',
                        value: '93%',
                      },
                      {
                        icon: (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ),
                        label: 'Say support feels “just right”',
                        value: '9/10',
                      },
                      {
                        icon: (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.69c-2.5 0-4.5 2-4.5 4.5 0 1.5.7 2.8 1.7 3.7L12 18l2.8-7.1c1-0.9 1.7-2.2 1.7-3.7 0-2.5-2-4.5-4.5-4.5z" />
                          </svg>
                        ),
                        label: 'Praise cooler, breathable sleep',
                        value: '92%',
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
              <div className="mb-8 flex gap-1 rounded-[3px] bg-stone-100/90 p-1 ring-1 ring-stone-200/60">
                {[
                  ['product', 'Product Reviews'],
                  ['brand', 'Brand Reviews'],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`min-h-[44px] flex-1 rounded-[3px] px-3 py-2.5 text-center text-xs font-semibold tracking-wide transition-all md:min-h-0 md:text-sm ${
                      activeTab === id
                        ? 'bg-white text-stone-900 shadow-sm ring-1 ring-stone-200/80'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Product Tab Content - AI Insight & Customer Photos */}
              {activeTab === 'product' && (
                <div className="mb-8">
                  <div className="mb-10 rounded-[3px] border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] md:mb-12 md:p-7">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">AI INSIGHT</h3>
                      <button
                        type="button"
                        className="rounded-[3px] border px-3 py-1.5 text-xs font-medium"
                        style={{
                          backgroundColor: REVIEW_SOFT,
                          color: REVIEW_ACCENT,
                          borderColor: REVIEW_ACCENT_BORDER,
                        }}
                      >
                        Verified reviews
                      </button>
                    </div>

                    <h4 className="mb-3 text-xl font-semibold tracking-tight text-stone-900 md:text-[1.35rem]">Customers say</h4>

                    <p className="mb-2 text-base leading-relaxed text-stone-700">
                      {isAISummaryExpanded ? (
                        <>
                          Buyers consistently praise the Duropedic Airboost 6.8 for cooler, more breathable nights and dependable back support. Reviewers often mention balanced firmness — supportive without feeling stiff — and strong motion isolation for couples. The Arctic Ice cover and Airboost comfort layers come up repeatedly as reasons people sleep more deeply in warm weather. Many note clear communication on warranty and care, straightforward roll-pack delivery, and that the mattress matches Duroflex World imagery in person. Long-term owners say edge support and surface consistency hold up better than budget boxed alternatives they tried before.
                          <button
                            type="button"
                            onClick={() => setIsAISummaryExpanded(false)}
                            className="ml-1 cursor-pointer font-medium underline decoration-stone-300 underline-offset-2 transition-colors hover:opacity-90"
                            style={{ color: REVIEW_ACCENT }}
                          >
                            Read less
                          </button>
                        </>
                      ) : (
                        <>
                          Customers love the Airboost 6.8 for cooler sleep, solid Duropedic support, and minimal partner disturbance — with many calling it a worthwhile upgrade over ordinary foam mattresses.
                          <button
                            type="button"
                            onClick={() => setIsAISummaryExpanded(true)}
                            className="ml-1 cursor-pointer font-medium underline decoration-stone-300 underline-offset-2 transition-colors hover:opacity-90"
                            style={{ color: REVIEW_ACCENT }}
                          >
                            Read more
                          </button>
                        </>
                      )}
                    </p>

                    <p className="mb-5 text-xs text-stone-500">Updated in near real-time as new feedback arrives.</p>

                    <div className="mb-5 border-t border-stone-200/80" />

                    <div>
                      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-stone-400">Customers Frequently Mention</p>
                      <div className="flex flex-wrap gap-2">
                        {['Cooler nights', 'Back support', 'Motion isolation', 'Breathable layers', 'Easy delivery', 'Trusted warranty'].map((item, index) => (
                          <span
                            key={index}
                            className="rounded-[3px] border border-stone-200/90 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

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
                  <div className="mb-10 rounded-[3px] border border-stone-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] md:mb-12 md:p-7">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">AI INSIGHT</h3>
                      <button
                        type="button"
                        className="rounded-[3px] border px-3 py-1.5 text-xs font-medium"
                        style={{
                          backgroundColor: REVIEW_SOFT,
                          color: REVIEW_ACCENT,
                          borderColor: REVIEW_ACCENT_BORDER,
                        }}
                      >
                        Verified reviews
                      </button>
                    </div>

                    <h4 className="mb-3 text-xl font-semibold tracking-tight text-stone-900 md:text-[1.35rem]">Customers say about the brand</h4>

                    <p className="mb-2 text-base leading-relaxed text-stone-700">
                      {isBrandAISummaryExpanded ? (
                        <>
                          Shoppers deeply trust Duroflex World for mattresses engineered for Indian homes — from humid coastal cities to dryer northern winters. The brand is praised for clear specifications, Duropedic and Airboost lines that deliver predictable firmness, and after-sales clarity on warranty and service. Reviewers highlight breathable foams and fabrics that stay comfortable without trapping heat, thoughtful roll-pack delivery, and consistency between online photos and real products. Long-term buyers often mention comparing imports and choosing Duroflex for local support, proven ranges like Duropedic, and value at each price tier. Many describe Duroflex as focused on sleep quality and durability, not one-season hype.
                          <button
                            type="button"
                            onClick={() => setIsBrandAISummaryExpanded(false)}
                            className="ml-1 cursor-pointer font-medium underline decoration-stone-300 underline-offset-2 transition-colors hover:opacity-90"
                            style={{ color: REVIEW_ACCENT }}
                          >
                            Read less
                          </button>
                        </>
                      ) : (
                        <>
                          Customers trust Duroflex for honest specs, durable construction, and sleep-focused innovation — with Duropedic support and Airboost comfort cited again and again.
                          <button
                            type="button"
                            onClick={() => setIsBrandAISummaryExpanded(true)}
                            className="ml-1 cursor-pointer font-medium underline decoration-stone-300 underline-offset-2 transition-colors hover:opacity-90"
                            style={{ color: REVIEW_ACCENT }}
                          >
                            Read more
                          </button>
                        </>
                      )}
                    </p>

                    <p className="mb-5 text-xs text-stone-500">Updated in near real-time as new feedback arrives.</p>

                    <div className="mb-5 border-t border-stone-200/80" />

                    <div>
                      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-stone-400">Brand Frequently Mentioned</p>
                      <div className="flex flex-wrap gap-2">
                        {['Duroflex quality', 'Duropedic range', 'Fast delivery', 'All-India footprint', 'Warranty clarity', 'Breathable design', 'Family trusted'].map((item, index) => (
                          <span key={index} className="rounded-[3px] border border-stone-200/90 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-700">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-12">
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <h3 className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">CUSTOMER PHOTOS</h3>
                        <p className="text-sm text-stone-600">Real results from the community</p>
                      </div>
                      <span className="rounded-[3px] bg-stone-100 px-3 py-1 text-xs font-medium tabular-nums text-stone-600">
                        {brandReviews.reduce((total, review) => total + (review.images?.length || 0), 0)} uploads
                      </span>
                    </div>
                    
                    {/* Get all brand review images */}
                    {(() => {
                      const allBrandImages = brandReviews.flatMap(review => review.images || []);
                      return allBrandImages.length > 0 ? (
                        <div className="mb-6 flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:overflow-x-visible md:pb-0">
                          {allBrandImages.slice(0, 6).map((image, i) => {
                            const imageIndex = allReviewImages.indexOf(image);
                            return (
                              <div
                                key={i}
                                className="group relative shrink-0 cursor-pointer overflow-hidden rounded-[3px] ring-1 ring-stone-200/80 transition-shadow hover:shadow-md"
                                onClick={() => {
                                  if (imageIndex !== -1) {
                                    handleImageClick(imageIndex);
                                  }
                                }}
                                style={{
                                  backgroundColor: '#f5f5f4',
                                  width: '100px',
                                  height: '100px',
                                }}
                              >
                                <img
                                  src={image}
                                  alt={`Brand review photo ${i + 1}`}
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
                            );
                          })}
                          {allBrandImages.length > 6 && (
                            <div
                              className="relative shrink-0 cursor-pointer overflow-hidden rounded-[3px] ring-1 ring-stone-200/80 transition-opacity hover:opacity-95"
                              onClick={() => {
                                setGridModalImages(allBrandImages);
                                setGridModalReview(null);
                                setIsGridModalOpen(true);
                              }}
                              style={{ width: '100px', height: '100px' }}
                            >
                              <img
                                src={allBrandImages[6]}
                                alt="more"
                                style={{ width: '100px', height: '100px', objectFit: 'cover', display: 'block' }}
                              />
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900/55 backdrop-blur-[1px]">
                                <div className="text-sm font-semibold text-white">+{allBrandImages.length - 6}</div>
                                <div className="mt-0.5 text-[10px] font-medium text-white/90">View all</div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-stone-500">No customer photos available</p>
                      );
                    })()}
                  </div>

                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-stone-700 md:text-[15px]">Sort &amp; Filter:</span>
                    <div className="relative">
                      <select
                        value={brandSortBy}
                        onChange={(e) => setBrandSortBy(e.target.value)}
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
                    {brandReviews.slice(0, brandReviewsToShow).map((review) => {
                      const likeKey = `brand-${review.id}`;
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
                                  const cId = `br-clip-${review.id}-${i}`;
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
                            {expandedReviews[`brand-${review.id}`] ? review.text : `${review.text.slice(0, 140)}...`}
                            {review.text.length > 140 && (
                              <button
                                type="button"
                                onClick={() => handleReadMore(review.id, 'brand')}
                                className="ml-1 text-xs font-medium text-stone-500 underline decoration-stone-200 underline-offset-2 hover:text-stone-800"
                              >
                                {expandedReviews[`brand-${review.id}`] ? 'less' : 'more'}
                              </button>
                            )}
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
                                onClick={() => handleLike(review.id, 'brand')}
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

                  {brandReviewsToShow < brandReviews.length && (
                    <div className="mt-8 text-center">
                      <button
                        type="button"
                        onClick={() => setBrandReviewsToShow(brandReviews.length)}
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
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#DB2A20] mb-3 tracking-wide">
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
                    <svg width="0" height="0" style={{ position: 'absolute' }}>
                      <defs>
                        <linearGradient id="modalStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#DB2A20" />
                          <stop offset="50%" stopColor="#E85C54" />
                          <stop offset="100%" stopColor="#F28B86" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className="w-5 h-5"
                        style={i < selectedReview.rating ? { 
                          fill: 'url(#modalStarGradient)',
                          filter: 'drop-shadow(0 1px 2px rgba(53, 31, 49, 0.3))'
                        } : { fill: '#d1d5db' }}
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
                    <span className="inline-block px-3 py-1.5 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(219, 42, 32, 0.1)', color: '#DB2A20' }}>
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
                        <stop offset="0%" stopColor="#DB2A20" />
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
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(219, 42, 32, 0.1)', color: '#DB2A20' }}>
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
