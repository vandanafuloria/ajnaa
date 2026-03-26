import React, { useState, useEffect, useCallback } from 'react';
import ShopifyHeader from './ShopifyHeader';
import ShopifyFooter from './ShopifyFooter';
import AIBrandEngine from './AIBrandEngine';
import ProductCard from './ProductCard';
import SocialProofBadge from './SocialProofBadge';

// ============================================
// EDIT THESE VALUES TO CUSTOMIZE YOUR PRODUCT
// ============================================

import productHeader from './assets/product_header.png';


import reviewData from '../review.json';


// Luxova product card images
const OLIVLIFE_IMGS = [
  'https://www.luxova.in/cdn/shop/files/PureSilverOvernightFaceOilSerum_2.png?v=1769862702&width=1946',
  'https://www.luxova.in/cdn/shop/files/frames_3.png?v=1770109888&width=1946',
  'https://www.luxova.in/cdn/shop/files/20231018_175734_0000_2.png?v=1769163609&width=1946',
  'https://www.luxova.in/cdn/shop/files/frames_3.png?v=1770109888',
];

function getReviewTitle(text) {
  const first = text.split(/[.!,]/)[0].trim();
  return first.length > 5 ? first : text.substring(0, 50);
}


// Brand Name
const BRAND_NAME = "wordofmouth";

// Product Images Array - All product images
const PRODUCT_IMAGES = [
  "https://www.luxova.in/cdn/shop/files/PureSilverOvernightFaceOilSerum_2.png?v=1769862702&width=1946",
  "https://www.luxova.in/cdn/shop/files/frames_3.png?v=1770109888&width=1946",
  "https://www.luxova.in/cdn/shop/files/20231018_175734_0000_2.png?v=1769163609&width=1946",
  "https://www.luxova.in/cdn/shop/files/frames_3.png?v=1770109888",
];

// Product Video
const PRODUCT_VIDEO = 'https://www.luxova.in/cdn/shop/files/quinn_vwgff828tv7lpcepnfgllnhr.mp4#t=0.1';

// All Luxova videos for video section
const VIBECRAFTS_VIDEOS = [
  'https://www.luxova.in/cdn/shop/files/quinn_vwgff828tv7lpcepnfgllnhr.mp4#t=0.1',
  'https://www.luxova.in/cdn/shop/files/quinn_ep6v9azbcgyfirjy2k93jg1a.mp4#t=0.1',
  'https://www.luxova.in/cdn/shop/files/quinn_prlxca5a18163gp9umry98em.mp4#t=0.1',
  'https://www.luxova.in/cdn/shop/files/quinn_wz5nlug6cyex50opla3y46bj.mp4#t=0.1',
  'https://www.luxova.in/cdn/shop/files/quinn_ftl1ge2kq7fzk5jq8w6p3eco.mp4#t=0.1',
  'https://www.luxova.in/cdn/shop/files/quinn_urmhs7hbsh51h8sbwyiypex7.mp4#t=0.1',
];

// Product Details
const PRODUCT_NAME = "Pure Silver Overnight Face Oil Serum";
const PRODUCT_PRICE = 2699;
const PRODUCT_ORIGINAL_PRICE = 6599;
const PRODUCT_DISCOUNT = 59;
const PRODUCT_SKU = "PTVCH-4307";
const PRODUCT_DESCRIPTION = "Bring the timeless beauty of Indian art into your living space with this stunning Vibrant Peacock and Red Lotus Floral Canvas Wall Painting. Featuring a majestic peacock set against a backdrop of blooming lotus flowers and lush foliage in rich jewel tones, this artwork is digitally printed on premium-grade canvas with UV-resistant, fade-proof inks. Ready to hang with a fitted wood frame — no assembly needed.";
const PRODUCT_BRAND = "VibeCrafts";
const PRODUCT_COLORS = [
  { name: "Standard", value: "#868753" },
  { name: "Vibrant", value: "#c0392b" },
];
const PRODUCT_SIZES = ["18x12 inch", "24x16 inch", "36x24 inch", "48x32 inch"];

// You May Also Like Products Data
const RELATED_PRODUCTS = [
  {
    id: 1,
    name: "Pure Silver Overnight Face Oil Serum",
    image: "https://www.luxova.in/cdn/shop/files/PureSilverOvernightFaceOilSerum_2.png?v=1769862702&width=1946",
    price: 1299,
    originalPrice: 1399,
    rating: 4.8,
    reviews: 320
  },
  {
    id: 2,
    name: "Luxova Frames Collection",
    image: "https://www.luxova.in/cdn/shop/files/frames_3.png?v=1770109888&width=1946",
    price: 999,
    originalPrice: 1199,
    rating: 4.7,
    reviews: 218
  },
  {
    id: 3,
    name: "Luxova Skincare Kit",
    image: "https://www.luxova.in/cdn/shop/files/20231018_175734_0000_2.png?v=1769163609&width=1946",
    price: 1799,
    originalPrice: 2199,
    rating: 4.9,
    reviews: 415
  },
  {
    id: 4,
    name: "Luxova Premium Frames",
    image: "https://www.luxova.in/cdn/shop/files/frames_3.png?v=1770109888",
    price: 1499,
    originalPrice: 1799,
    rating: 4.6,
    reviews: 178
  }
];

// Best Seller Products data — same as home page
const bestSellerProducts = [
  { id: 1, image: 'https://www.luxova.in/cdn/shop/files/PureSilverOvernightFaceOilSerum_2.png?v=1769862702&width=1946', title: 'Pure Silver Overnight Face Oil Serum', currentPrice: 1299, originalPrice: 1399, rating: 4.8, reviewCount: 320, feature: 'Natural Ingredients' },
  { id: 2, image: 'https://www.luxova.in/cdn/shop/files/frames_3.png?v=1770109888&width=1946', title: 'Luxova Frames Collection', currentPrice: 999, originalPrice: 1199, rating: 4.7, reviewCount: 218, feature: 'Premium Quality' },
  { id: 3, image: 'https://www.luxova.in/cdn/shop/files/20231018_175734_0000_2.png?v=1769163609&width=1946', title: 'Luxova Skincare Kit', currentPrice: 1799, originalPrice: 2199, rating: 4.9, reviewCount: 415, feature: 'Scientifically Formulated' },
  { id: 4, image: 'https://www.luxova.in/cdn/shop/files/frames_3.png?v=1770109888', title: 'Luxova Premium Frames', currentPrice: 1499, originalPrice: 1799, rating: 4.6, reviewCount: 178, feature: 'Luxova Exclusive' },
];

// ============================================
// END OF EDITABLE SECTION
// ============================================

// Dummy review templates for images without reviews
const dummyReviews = [
  {
    name: 'Priya Sharma',
    rating: 5,
    title: 'Absolutely transformed my living room!',
    text: 'The Vibrant Peacock canvas is stunning in person — the colors are so rich and vibrant. It arrived perfectly packed and was ready to hang right out of the box. Looks like it came from a high-end gallery!',
    date: '1/20/2025',
    type: 'product'
  },
  {
    name: 'Anjali Mehta',
    rating: 4,
    title: 'Beautiful artwork, great quality canvas',
    text: 'The print quality is exceptional — every detail of the lotus and peacock is crisp and sharp. The wood frame is sturdy and the canvas is tightly stretched. Really happy with this purchase!',
    date: '1/18/2025',
    type: 'product'
  },
  {
    name: 'Riya Patel',
    rating: 5,
    title: 'Perfect centerpiece for my drawing room',
    text: 'I was looking for something to fill the large blank wall above my sofa and this painting was exactly right. The size is perfect, the colors match my interiors beautifully, and everyone who visits asks where I got it!',
    date: '1/15/2025',
    type: 'product'
  },
  {
    name: 'Kavya Reddy',
    rating: 4,
    title: 'Great decor piece, fast delivery',
    text: 'The canvas arrived well-packed and undamaged. The colors are true to the product photos and the print is very clear. The peacock design gives such a royal feel to the room. Would definitely buy again!',
    date: '1/12/2025',
    type: 'product'
  },
  {
    name: 'Meera Singh',
    rating: 5,
    title: 'Exceeded all my expectations!',
    text: 'I gifted this to my mother for her new home and she absolutely loved it. The packaging was premium, the canvas quality is top-notch, and the colors are incredibly vivid. VibeCrafts never disappoints!',
    date: '1/10/2025',
    type: 'product'
  },
  {
    name: 'Sneha Verma',
    rating: 5,
    title: 'Best home decor purchase this year!',
    text: 'This peacock painting has completely changed the look of my bedroom. The UV-resistant print means the colors stay bright — no fading even in sunlight. Delivery was quick and the frame is solid. 10/10!',
    date: '1/08/2025',
    type: 'product'
  },
  {
    name: 'Divya Nair',
    rating: 4,
    title: 'Stunning wall art at a great price',
    text: 'For the price, the quality is outstanding. The canvas has a nice texture and the print is sharp with no pixelation. The ready-to-hang feature saved me a lot of effort. Very satisfied with VibeCrafts!',
    date: '1/05/2025',
    type: 'product'
  },
  {
    name: 'Pooja Mehta',
    rating: 5,
    title: 'Museum quality art for your home',
    text: 'I have bought many canvas prints before but nothing comes close to VibeCrafts. The colors pop, the details are sharp, and the frame is premium. My guests keep complimenting it. Already ordered two more!',
    date: '1/03/2025',
    type: 'product'
  },
  {
    name: 'Neha Kapoor',
    rating: 4,
    title: 'Elegant and sophisticated wall art',
    text: 'The abstract peacock feather design is truly mesmerizing. It looks even better in real life than in the photos. The canvas is high quality and the colors are fade-proof. Very happy with this decor piece!',
    date: '12/30/2024',
    type: 'product'
  },
  {
    name: 'Aarti Desai',
    rating: 5,
    title: 'A statement piece for any room',
    text: 'This canvas painting is a true statement piece. The floral and peacock motif brings so much life and color to my otherwise neutral living room. Premium packaging, perfect print, quick delivery — loved everything!',
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
    'https://www.instagram.com/p/DWOkJDuExMS/',
    'https://www.instagram.com/p/DWGjpesAZvP/',
    'https://www.instagram.com/p/DWRJ7kPD6_c/',
    'https://www.instagram.com/p/DWBtR6vj3n3/',
    'https://www.instagram.com/p/DWA3oX3Ewfc/',
    'https://www.instagram.com/p/DWBGFbvDZ1S/',
    'https://www.instagram.com/p/DV7r2UQD-d8/',
    'https://www.instagram.com/p/DV27mLnCW2W/',
    'https://www.instagram.com/p/DVqAumXkYQk/',
    'https://www.instagram.com/p/DVlVxNkGTSg/',
    'https://www.instagram.com/p/DU5k3k0j31C/',
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

  
  // productImages already set from passedProduct above

  // Customer review images — repeat to fill grid
  const customerReviewImages = Array.from({ length: 8 }, (_, i) => OLIVLIFE_IMGS[i % OLIVLIFE_IMGS.length]);

  // All review images for modal navigation
  const allReviewImages = customerReviewImages;

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
      images: [OLIVLIFE_IMGS[(i * 2) % OLIVLIFE_IMGS.length], OLIVLIFE_IMGS[(i * 2 + 1) % OLIVLIFE_IMGS.length]],
    }));

  // Brand Reviews — from 'mid' type entries in review.json
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
      images: [OLIVLIFE_IMGS[(i * 2) % OLIVLIFE_IMGS.length], OLIVLIFE_IMGS[(i * 2 + 1) % OLIVLIFE_IMGS.length]],
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

  // Social proof carousel data
  const [socialProofIndex, setSocialProofIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(true);
  const socialProofItems = [
    {
      type: 'bought',
      name: 'Pooja',
      action: 'bought this dress',
      time: 'Just now',
      image: OLIVLIFE_IMGS[0]
    },
    {
      type: 'review',
      name: 'Neha',
      action: 'gave the review',
      time: '30 min ago',
      image: OLIVLIFE_IMGS[1]
    },
    {
      type: 'viewed',
      name: 'Priya',
      action: 'recently viewed',
      time: '1 hour ago',
      image: OLIVLIFE_IMGS[2]
    }
  ];

  // Auto-rotate social proof carousel
  useEffect(() => {
    if (!showCarousel) return;
    
    const interval = setInterval(() => {
      setSocialProofIndex((prev) => {
        const nextIndex = (prev + 1) % socialProofItems.length;
        // If we've shown the last item and are about to cycle back to first, hide carousel
        if (prev === socialProofItems.length - 1) {
          setShowCarousel(false);
          // Show again after 3 seconds
          setTimeout(() => {
            setShowCarousel(true);
            setSocialProofIndex(0);
          }, 3000);
          return prev; // Keep showing last item until hidden
        }
        return nextIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [showCarousel, socialProofItems.length]);

  const SocialProofCarousel = () => (
    showCarousel ? (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3 flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={socialProofItems[socialProofIndex].image} 
            alt="Product" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">
            <span className="font-semibold text-[#351F31]">{socialProofItems[socialProofIndex].name}</span> {socialProofItems[socialProofIndex].action}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{socialProofItems[socialProofIndex].time}</p>
        </div>
      </div>
    ) : null
  );

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

      {/* Product Page Header Banner */}
      <div className="w-full">
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
      
      <main className="flex-1 py-8 md:py-12" style={{ backgroundColor: '#f0ece3' }}>
        <div className="w-full px-4 md:px-8">

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
                                <stop offset="50%" stopColor="#f5a623"/>
                                <stop offset="50%" stopColor="#e0e0e0"/>
                              </linearGradient>
                            </defs>
                          )}
                          <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            fill={full ? '#f5a623' : half ? `url(#pdp-hg-${i})` : '#e0e0e0'}
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

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2">
                  {['Natural Ingredients', 'Silver-Infused', 'Paraben-Free', 'Cruelty-Free', 'Dermatologist Tested'].map(label => (
                    <span
                      key={label}
                      className="text-xs font-semibold px-3 py-1.5 text-white"
                      style={{ backgroundColor: '#868753', borderRadius: '999px' }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price row */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-bold text-xl" style={{ color: '#868753' }}>
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
                  style={{ backgroundColor: '#5c6b45', letterSpacing: '0.12em' }}
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#868753" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Estimated deliver</strong> in 5-7 days
                  </p>
                </div>

                {/* Free shipping */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: '#e8e3da' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#868753" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">Free Shipping</p>
                </div>

                {/* Query */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: '#e8e3da' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#868753" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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


      {/* In Your Home */}
      {(() => {
        const WILD_VIDEOS = [
          'https://www.luxova.in/cdn/shop/files/quinn_vwgff828tv7lpcepnfgllnhr.mp4#t=0.1',
          'https://www.luxova.in/cdn/shop/files/quinn_ep6v9azbcgyfirjy2k93jg1a.mp4#t=0.1',
          'https://www.luxova.in/cdn/shop/files/quinn_prlxca5a18163gp9umry98em.mp4#t=0.1',
          'https://www.luxova.in/cdn/shop/files/quinn_wz5nlug6cyex50opla3y46bj.mp4#t=0.1',
          'https://www.luxova.in/cdn/shop/files/quinn_ftl1ge2kq7fzk5jq8w6p3eco.mp4#t=0.1',
          'https://www.luxova.in/cdn/shop/files/quinn_urmhs7hbsh51h8sbwyiypex7.mp4#t=0.1',
        ];
        return (
          <>
            <div className="w-full py-7" style={{ background: '#868753' }}>
              <div className="w-full px-4">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-white tracking-wide">In Your Skincare Routine</h2>
                  <a href="https://www.instagram.com/luxova_official/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full" style={{ color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.25)', textDecoration: 'none' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8"/>
                      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                    </svg>
                    luxova_official
                  </a>
                </div>
                <div className="overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                  <div className="flex gap-3 min-w-max">
                    {WILD_VIDEOS.map((url, idx) => (
                      <button key={idx} className="focus:outline-none" onClick={() => setWildVideoIdx(idx)}>
                        <div className="relative overflow-hidden" style={{ width: '108px', height: '180px', borderRadius: '999px', border: '2px solid rgba(255,255,255,0.18)' }}>
                          <video src={url} className="w-full h-full object-cover" autoPlay muted playsInline loop />
                          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)' }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {wildVideoIdx !== null && (
              <div className="fixed inset-0 z-[999] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.93)' }} onClick={() => setWildVideoIdx(null)}>
                <div className="relative bg-black rounded-2xl overflow-hidden" style={{ width: 'min(380px, 92vw)', height: 'min(660px, 88vh)' }} onClick={e => e.stopPropagation()}>
                  <video key={wildVideoIdx} src={WILD_VIDEOS[wildVideoIdx]} className="w-full h-full object-cover" autoPlay muted playsInline controls loop />
                  <button className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center z-10" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setWildVideoIdx(null)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                  <button className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setWildVideoIdx(i => (i - 1 + WILD_VIDEOS.length) % WILD_VIDEOS.length)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setWildVideoIdx(i => (i + 1) % WILD_VIDEOS.length)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                    {WILD_VIDEOS.map((_, i) => (
                      <button key={i} onClick={() => setWildVideoIdx(i)} className="rounded-full transition-all" style={{ width: i === wildVideoIdx ? '20px' : '6px', height: '6px', background: i === wildVideoIdx ? 'white' : 'rgba(255,255,255,0.35)' }} />
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
        <div className="w-full px-4">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#8B4513] tracking-wide">
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

      {/* Reviews Section - WOM Style */}
      <div id="reviews-section" className="bg-white w-full py-12 md:py-16">
        <div className="w-full px-4 max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-800">Customer Reviews</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Side - Rating Breakdown */}
            <div className="lg:col-span-1 mt-[100px] mb-[100px] lg:mb-[200px]">
              <div className="relative lg:sticky lg:top-[145px]" style={{ maxHeight: 'calc(-300px + 100vh)' }}>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  {/* Rating Score Card */}
                  <div className="text-center mb-6">
                    {/* Circle ring — 4.8/5 = 96% fill */}
                    <div
                      className="w-32 h-32 rounded-full flex items-center justify-center mb-4 relative mx-auto"
                      style={{
                        background: `conic-gradient(#868753 0% 96%, #d4e0d3 96% 100%)`,
                        boxShadow: '0 8px 24px rgba(65,84,63,0.25)'
                      }}
                    >
                      <div className="absolute inset-[6px] rounded-full bg-white flex items-center justify-center">
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-3xl font-bold" style={{ color: '#868753' }}>4.8</span>
                          <span className="text-sm font-medium text-gray-400">/5</span>
                        </div>
                      </div>
                    </div>
                    {/* Stars */}
                    <div className="flex justify-center gap-0.5 mb-2">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} width="18" height="18" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 1px 1px rgba(245,158,11,0.4))' }}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={i <= 4 ? '#f59e0b' : '#e5e7eb'}/>
                          {i === 5 && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z" fill="#f59e0b"/>}
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Based on <strong className="text-gray-800">147</strong> reviews</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border" style={{ backgroundColor: 'rgba(65,84,63,0.07)', color: '#868753', borderColor: 'rgba(65,84,63,0.25)' }}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      93% would buy again
                    </div>
                  </div>

                  {/* Rating Distribution */}
                  <div className="space-y-3 mb-6">
                    {[
                      { stars: 5, percent: 75 },
                      { stars: 4, percent: 17 },
                      { stars: 3, percent: 5 },
                      { stars: 2, percent: 2 },
                      { stars: 1, percent: 1 },
                    ].map((item) => (
                      <div key={item.stars} className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-1 text-xs text-gray-600 w-8 flex-shrink-0">
                          <svg className="w-3 h-3" fill="#f59e0b" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <span>{item.stars}</span>
                        </div>
                        <div className="flex-1 min-w-0 h-3.5 bg-gray-200 overflow-hidden" style={{ borderRadius: '1px' }}>
                          <div
                            className="h-full transition-all duration-300"
                            style={{
                              width: `${item.percent}%`,
                              minWidth: '2px',
                              backgroundColor: '#868753',
                              borderRadius: '1px'
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-8 flex-shrink-0 text-right">{item.percent}%</span>
                      </div>
                    ))}
                  </div>

                  {/* Rating Highlights */}
                  <div className="space-y-3">
                    {[
                      { 
                        icon: (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ), 
                        label: 'Would recommend', 
                        value: '93%' 
                      },
                      { 
                        icon: (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ), 
                        label: 'Love the perfect fit', 
                        value: '9/10' 
                      },
                      { 
                        icon: (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.69c-2.5 0-4.5 2-4.5 4.5 0 1.5.7 2.8 1.7 3.7L12 18l2.8-7.1c1-0.9 1.7-2.2 1.7-3.7 0-2.5-2-4.5-4.5-4.5z" />
                          </svg>
                        ), 
                        label: 'Love the deep bass quality',
                        value: '92%'
                      },
                    ].map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white" style={{ color: '#351F31' }}>
                          {stat.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-gray-900">{stat.value}</div>
                          <div className="text-xs text-gray-600">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Reviews */}
            <div className="lg:col-span-2">
              {/* Tab Headers */}
              <div className="flex gap-2 mb-6">
                {[['product', 'Product Reviews'], ['brand', 'Brand Reviews']].map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    style={{
                      padding: '6px 14px',
                      fontSize: '12px',
                      fontWeight: '600',
                      borderRadius: '0',
                      border: '1.5px solid',
                      borderColor: activeTab === id ? '#868753' : '#e0e0e0',
                      background: activeTab === id ? '#868753' : '#fff',
                      color: activeTab === id ? '#fff' : '#666',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Product Tab Content - AI Insight & Customer Photos */}
              {activeTab === 'product' && (
                <div className="mb-8">
                  {/* AI Insight Section */}
                  <div className="mb-12 bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">AI INSIGHT</h3>
                      </div>
                      <button className="px-3 py-1.5 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(53, 31, 49, 0.1)', color: '#351F31' }}>Verified reviews</button>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Customers say</h4>

                    <p className="text-gray-700 leading-relaxed mb-2 text-base">
                      {isAISummaryExpanded ? (
                        <>
                          Customers consistently praise Luxova's Pure Silver Overnight Face Oil Serum for visibly improving skin texture within just one week of use. The lightweight, non-greasy formula is a standout highlight — reviewers love that it absorbs quickly and leaves the skin feeling plump and hydrated by morning. Many customers mention a noticeable reduction in fine lines, dark spots, and dullness after regular use. The natural ingredient blend, including the silver-infused formula, earns trust from buyers looking for clean, toxin-free skincare. Packaging is frequently described as premium and gift-worthy, and customers appreciate the brand's science-backed approach to natural skincare. Several long-term users mention switching from expensive international brands after discovering Luxova's results at an accessible price.
                          <button onClick={() => setIsAISummaryExpanded(false)} className="underline ml-1 cursor-pointer" style={{ color: '#868753' }}>Read less</button>
                        </>
                      ) : (
                        <>
                          Customers love Luxova's Pure Silver Overnight Face Oil Serum for its lightweight formula and visible results — softer, brighter skin within days. The natural ingredient blend and science-backed approach are consistently praised.
                          <button onClick={() => setIsAISummaryExpanded(true)} className="underline ml-1 cursor-pointer" style={{ color: '#868753' }}>Read more</button>
                        </>
                      )}
                    </p>

                    <p className="text-xs text-gray-500 mb-4">Updated in near real-time as new feedback arrives.</p>

                    {/* Divider */}
                    <div className="border-t border-gray-200 mb-4"></div>

                    {/* Frequently Mentioned */}
                    <div>
                      <p className="text-[11px] font-medium text-gray-400 mb-3 uppercase tracking-widest">Customers Frequently Mention</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                        {['Glowing Skin', 'Natural Ingredients', 'Fast Absorption', 'Visible Results', 'Great Packaging', 'Science-backed'].map((item, index) => (
                          <span key={index} className="text-xs font-semibold" style={{ color: '#868753' }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Customer Photos Section - Instagram Style */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">CUSTOMER PHOTOS</h3>
                        <p className="text-sm text-gray-600">Real results from the community</p>
                      </div>
                      <span className="text-sm text-gray-500">{customerReviewImages.length} uploads</span>
                    </div>
                    
                    {/* Instagram-style Photo Gallery Grid - Show first 6, then "View all" */}
                    {customerReviewImages.length > 0 ? (
                      <div className="flex gap-2 mb-6 overflow-x-auto md:flex-wrap md:overflow-x-visible pb-2 md:pb-0 scrollbar-hide">
                        {customerReviewImages.slice(0, 6).map((image, i) => (
                          <div 
                            key={i} 
                            className="relative rounded-lg overflow-hidden cursor-pointer group flex-shrink-0"
                            onClick={() => handleImageClick(i)}
                            style={{ 
                              backgroundColor: '#f3f4f6',
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
                                opacity: 1
                              }}
                              onError={(e) => {
                                console.error(`Failed to load image ${i}:`, image);
                                e.target.style.display = 'none';
                              }}
                              onLoad={(e) => {
                                console.log(`Image ${i} loaded successfully:`, image);
                                e.target.style.opacity = '1';
                              }}
                            />
                            <div 
                              className="absolute inset-0 transition-all duration-300 pointer-events-none"
                              style={{
                                backgroundColor: 'transparent'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            ></div>
                          </div>
                        ))}
                        {customerReviewImages.length > 6 && (
                          <div
                            className="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0"
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
                            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(53,31,49,0.55)' }}>
                              <div className="text-sm font-bold text-white">+{customerReviewImages.length - 6}</div>
                              <div className="text-[10px] text-white/80 mt-0.5">View all</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No customer photos available</p>
                    )}
                  </div>

                  {/* Sort & Filter Dropdown */}
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-[17px] md:text-sm font-medium text-gray-700">Sort & Filter:</span>
                    <div className="relative">
                      <select
                        value={productSortBy}
                        onChange={(e) => setProductSortBy(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-[17px] md:text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      >
                        <option value="most-recent">Most Recent</option>
                        <option value="highest-rated">Highest Rated</option>
                        <option value="lowest-rated">Lowest Rated</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Review Cards */}
                  <div className="divide-y divide-gray-100">
                    {reviews.slice(0, reviewsToShow).map((review) => {
                      const likeKey = `product-${review.id}`;
                      return (
                        <div key={review.id} className="py-3">
                          {/* Top row: stars + name + date */}
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <div className="flex items-center gap-0.5">
                                {[1,2,3,4,5].map(i => {
                                  const full = i <= Math.floor(review.rating);
                                  const half = !full && i === Math.ceil(review.rating) && review.rating % 1 >= 0.3;
                                  const cId = `rc-clip-${review.id}-${i}`;
                                  return (
                                    <svg key={i} width="16" height="16" viewBox="0 0 24 24">
                                      <defs>{half && <clipPath id={cId}><rect x="0" y="0" width="12" height="24"/></clipPath>}</defs>
                                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#e5e7eb"/>
                                      {(full || half) && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f59e0b" clipPath={half ? `url(#${cId})` : undefined}/>}
                                    </svg>
                                  );
                                })}
                              </div>
                              <span className="text-xs font-semibold text-gray-900">{review.name}</span>
                              <svg className="w-3 h-3 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <span className="text-xs text-gray-400">{getDaysAgo(review.date)}</span>
                          </div>

                          {/* Title */}
                          {review.title && <p className="text-sm font-semibold text-gray-800 mb-1">{review.title}</p>}

                          {/* Review text */}
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-2">
                            {expandedReviews[`product-${review.id}`] ? review.text : `${review.text.slice(0, 140)}...`}
                            <button onClick={() => handleReadMore(review.id, 'product')} className="ml-1 text-xs font-medium underline text-gray-400 hover:text-gray-600">
                              {expandedReviews[`product-${review.id}`] ? 'less' : 'more'}
                            </button>
                          </p>

                          {/* Images */}
                          {review.images?.length > 0 && (
                            <div className="flex gap-1.5 mb-2">
                              {review.images.map((image, imgIndex) => (
                                <div key={imgIndex} className="w-14 h-14 overflow-hidden cursor-pointer shrink-0 hover:opacity-80 transition-opacity"
                                  onClick={() => { const idx = allReviewImages.indexOf(image); if (idx !== -1) handleImageClick(idx); }}>
                                  <img src={image} alt="" className="w-full h-full object-cover"/>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between mt-3 pt-2.5 -mx-4 px-4 pb-1" style={{ background: '#f7f8fa', borderTop: '1px solid #efefef' }}>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-400">Helpful?</span>
                              <button onClick={() => handleLike(review.id, 'product')} className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-500 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                                ({reviewLikes[likeKey] || 716})
                              </button>
                              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
                                (0)
                              </button>
                            </div>
                            <button className="text-xs font-medium" style={{ color: '#2563eb' }}>Report</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* View More Reviews Button */}
                  {reviewsToShow < reviews.length && (
                    <div className="mt-6 text-center">
                      <button 
                        onClick={() => setReviewsToShow(reviews.length)}
                        className="bg-transparent border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium text-sm md:text-base hover:border-gray-400 transition-colors"
                      >
                        View More Reviews
                      </button>
                    </div>
                  )}

                  {/* Write Review Button */}
                  <div className="mt-8 text-center">
                    <button className="bg-black text-white px-6 py-3 rounded-lg font-medium text-sm md:text-base hover:bg-gray-800 transition-colors">
                      Write a Review
                    </button>
                  </div>
                </div>
              )}

              {/* Brand Tab Content */}
              {activeTab === 'brand' && (
                <div className="mb-8">
                  {/* Brand AI Insight Section */}
                  <div className="mb-12 bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">AI INSIGHT</h3>
                      </div>
                      <button className="px-3 py-1.5 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(53, 31, 49, 0.1)', color: '#351F31' }}>Verified reviews</button>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Customers say about the brand</h4>

                    <p className="text-gray-700 leading-relaxed mb-2 text-base">
                      {isBrandAISummaryExpanded ? (
                        <>
                          Customers deeply trust Luxova Skincare for its commitment to blending science with nature. The brand is widely praised for formulating products that deliver real, visible results without relying on harsh chemicals or synthetic additives. Reviewers frequently highlight Luxova's transparency about ingredients — particularly the use of pure silver, natural oils, and botanical extracts that are clearly labelled and explained. The brand's skincare range is celebrated for being suitable for Indian skin types, addressing common concerns like pigmentation, dullness, uneven tone, and signs of ageing. Long-term customers mention switching from expensive international skincare brands after experiencing Luxova's results at a fraction of the price. The luxurious packaging, fast delivery, and responsive customer support further strengthen buyer confidence. Many reviewers describe Luxova as a brand that genuinely cares about skin health, not just sales.
                          <button onClick={() => setIsBrandAISummaryExpanded(false)} className="underline ml-1 cursor-pointer" style={{ color: '#868753' }}>Read less</button>
                        </>
                      ) : (
                        <>
                          Customers trust Luxova Skincare for science-backed, natural formulas that deliver real results. The brand's transparency about ingredients, suitability for Indian skin, and premium packaging make it a consistent favourite.
                          <button onClick={() => setIsBrandAISummaryExpanded(true)} className="underline ml-1 cursor-pointer" style={{ color: '#868753' }}>Read more</button>
                        </>
                      )}
                    </p>

                    <p className="text-xs text-gray-500 mb-4">Updated in near real-time as new feedback arrives.</p>

                    {/* Divider */}
                    <div className="border-t border-gray-200 mb-4"></div>

                    {/* Brand Keywords */}
                    <div>
                      <p className="text-[11px] font-medium text-gray-400 mb-3 uppercase tracking-widest">Brand Frequently Mentioned</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                        {['Clean Ingredients', 'Visible Glow', 'Fast Delivery', 'Trusted by Dermatologists', 'Cruelty-Free', 'Premium Packaging', 'Great Value'].map((item, index) => (
                          <span key={index} className="text-xs font-semibold" style={{ color: '#868753' }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Customer Photos Section - Brand Reviews */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">CUSTOMER PHOTOS</h3>
                        <p className="text-sm text-gray-600">Real results from the community</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {brandReviews.reduce((total, review) => total + (review.images?.length || 0), 0)} uploads
                      </span>
                    </div>
                    
                    {/* Get all brand review images */}
                    {(() => {
                      const allBrandImages = brandReviews.flatMap(review => review.images || []);
                      return allBrandImages.length > 0 ? (
                        <div className="flex gap-2 mb-6 overflow-x-auto md:flex-wrap md:overflow-x-visible pb-2 md:pb-0 scrollbar-hide">
                          {allBrandImages.slice(0, 6).map((image, i) => {
                            const imageIndex = allReviewImages.indexOf(image);
                            return (
                              <div 
                                key={i} 
                                className="relative rounded-lg overflow-hidden cursor-pointer group flex-shrink-0"
                                onClick={() => {
                                  if (imageIndex !== -1) {
                                    handleImageClick(imageIndex);
                                  }
                                }}
                                style={{ 
                                  backgroundColor: '#f3f4f6',
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
                                    opacity: 1
                                  }}
                                  onError={(e) => {
                                    console.error(`Failed to load brand image ${i}:`, image);
                                    e.target.style.display = 'none';
                                  }}
                                  onLoad={(e) => {
                                    console.log(`Brand image ${i} loaded successfully:`, image);
                                    e.target.style.opacity = '1';
                                  }}
                                />
                                <div 
                                  className="absolute inset-0 transition-all duration-300 pointer-events-none"
                                  style={{
                                    backgroundColor: 'transparent'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                ></div>
                              </div>
                            );
                          })}
                          {allBrandImages.length > 6 && (
                            <div
                              className="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0"
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
                              <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(53,31,49,0.55)' }}>
                                <div className="text-sm font-bold text-white">+{allBrandImages.length - 6}</div>
                                <div className="text-[10px] text-white/80 mt-0.5">View all</div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No customer photos available</p>
                      );
                    })()}
                  </div>

                  {/* Sort & Filter Dropdown */}
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-[17px] md:text-sm font-medium text-gray-700">Sort & Filter:</span>
                    <div className="relative">
                      <select
                        value={brandSortBy}
                        onChange={(e) => setBrandSortBy(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-[17px] md:text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      >
                        <option value="most-recent">Most Recent</option>
                        <option value="highest-rated">Highest Rated</option>
                        <option value="lowest-rated">Lowest Rated</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Brand Review Cards */}
                  <div className="divide-y divide-gray-100">
                    {brandReviews.slice(0, brandReviewsToShow).map((review) => {
                      const likeKey = `brand-${review.id}`;
                      return (
                        <div key={review.id} className="py-3">
                          {/* Top row: stars + name + date */}
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <div className="flex items-center gap-0.5">
                                {[1,2,3,4,5].map(i => {
                                  const full = i <= Math.floor(review.rating);
                                  const half = !full && i === Math.ceil(review.rating) && review.rating % 1 >= 0.3;
                                  const cId = `br-clip-${review.id}-${i}`;
                                  return (
                                    <svg key={i} width="16" height="16" viewBox="0 0 24 24">
                                      <defs>{half && <clipPath id={cId}><rect x="0" y="0" width="12" height="24"/></clipPath>}</defs>
                                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#e5e7eb"/>
                                      {(full || half) && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f59e0b" clipPath={half ? `url(#${cId})` : undefined}/>}
                                    </svg>
                                  );
                                })}
                              </div>
                              <span className="text-xs font-semibold text-gray-900">{review.name}</span>
                              <svg className="w-3 h-3 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <span className="text-xs text-gray-400">{getDaysAgo(review.date)}</span>
                          </div>

                          {/* Title */}
                          {review.title && <p className="text-sm font-semibold text-gray-800 mb-1">{review.title}</p>}

                          {/* Review text */}
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-2">
                            {expandedReviews[`brand-${review.id}`] ? review.text : `${review.text.slice(0, 140)}...`}
                            {review.text.length > 140 && (
                              <button onClick={() => handleReadMore(review.id, 'brand')} className="ml-1 text-xs font-medium underline text-gray-400 hover:text-gray-600">
                                {expandedReviews[`brand-${review.id}`] ? 'less' : 'more'}
                              </button>
                            )}
                          </p>

                          {/* Images */}
                          {review.images?.length > 0 && (
                            <div className="flex gap-1.5 mb-2">
                              {review.images.map((image, imgIndex) => (
                                <div key={imgIndex} className="w-14 h-14 overflow-hidden cursor-pointer shrink-0 hover:opacity-80 transition-opacity"
                                  onClick={() => { const idx = allReviewImages.indexOf(image); if (idx !== -1) handleImageClick(idx); }}>
                                  <img src={image} alt="" className="w-full h-full object-cover"/>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between mt-3 pt-2.5 -mx-4 px-4 pb-1" style={{ background: '#f7f8fa', borderTop: '1px solid #efefef' }}>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-400">Helpful?</span>
                              <button onClick={() => handleLike(review.id, 'brand')} className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-500 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                                ({reviewLikes[likeKey] || 716})
                              </button>
                              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
                                (0)
                              </button>
                            </div>
                            <button className="text-xs font-medium" style={{ color: '#2563eb' }}>Report</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* View More Brand Reviews Button */}
                  {brandReviewsToShow < brandReviews.length && (
                    <div className="mt-6 text-center">
                      <button 
                        onClick={() => setBrandReviewsToShow(brandReviews.length)}
                        className="bg-transparent border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium text-sm md:text-base hover:border-gray-400 transition-colors"
                      >
                        View More Reviews
                      </button>
                    </div>
                  )}

                  {/* Write Review Button */}
                  <div className="mt-8 text-center">
                    <button className="bg-black text-white px-6 py-3 rounded-lg font-medium text-sm md:text-base hover:bg-gray-800 transition-colors">
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
        <div className="w-full px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#8B4513] mb-3 tracking-wide">
              Best Sellers
            </h2>
          </div>
          <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4 md:gap-6 min-w-max">
              {bestSellerProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="w-[90vw] md:w-[380px] lg:w-[280px] flex-shrink-0 cursor-pointer"
                  onClick={() => onProductClick && onProductClick()}
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
                          <stop offset="0%" stopColor="#351F31" />
                          <stop offset="50%" stopColor="#A855A5" />
                          <stop offset="100%" stopColor="#C47BC5" />
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
                    <span className="inline-block px-3 py-1.5 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(53, 31, 49, 0.1)', color: '#351F31' }}>
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
                        <stop offset="0%" stopColor="#351F31" />
                        <stop offset="50%" stopColor="#A855A5" />
                        <stop offset="100%" stopColor="#C47BC5" />
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
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: 'rgba(53, 31, 49, 0.1)', color: '#351F31' }}>
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
