import React, { useState, useEffect, useCallback } from 'react';
import ShopifyHeader from './ShopifyHeader';
import ShopifyFooter from './ShopifyFooter';
import AIBrandEngine from './AIBrandEngine';
import ProductCard from './ProductCard';
import SocialProofBadge from './SocialProofBadge';

// ============================================
// EDIT THESE VALUES TO CUSTOMIZE YOUR PRODUCT
// ============================================

// Product images now use external URL
import productImage1 from './assets/product/SPP_8830.jpg';
import productImage2 from './assets/product/SPP_8834.jpg';
import productImage3 from './assets/product/SPP_8844.jpg';
import product1 from './assets/product1.png';
import product2 from './assets/product2.png';

// Brand Images — review photos
import bi1 from './assets/Brand Images/1.png';
import bi2 from './assets/Brand Images/2.png';
import bi3 from './assets/Brand Images/3.png';
import bi4 from './assets/Brand Images/4.png';
import bi5 from './assets/Brand Images/5.png';
import bi6 from './assets/Brand Images/6.png';
import bi7 from './assets/Brand Images/7.png';
import bi8 from './assets/Brand Images/8.png';
import bi9 from './assets/Brand Images/9.png';
import bi10 from './assets/Brand Images/10.png';
import bi11 from './assets/Brand Images/11.png';
import bi12 from './assets/Brand Images/12.png';

import reviewData from '../review.json';

// Image arrays for review cycling
// Product reviews: 1 → 12 (ascending)
const ST_PRODUCT_IMGS = [bi1, bi2, bi3, bi4, bi5, bi6, bi7, bi8, bi9, bi10, bi11, bi12];
// Brand reviews: 12 → 1 (descending)
const ST_BRAND_IMGS = [bi12, bi11, bi10, bi9, bi8, bi7, bi6, bi5, bi4, bi3, bi2, bi1];

function getReviewTitle(text) {
  const first = text.split(/[.!,]/)[0].trim();
  return first.length > 5 ? first : text.substring(0, 50);
}


// Brand Name
const BRAND_NAME = "wordofmouth";

// Product Images Array - All product images
const PRODUCT_IMAGES = [
  "https://thebaeshop.com/cdn/shop/files/11_755a3607-c9cb-4454-a07f-5a1e20e2d454.jpg?v=1771311357&width=1000",
  "https://thebaeshop.com/cdn/shop/files/5_a829b020-8293-4669-a908-e2b74c0793eb.jpg?v=1771311357&width=1000",
  "https://thebaeshop.com/cdn/shop/files/4_f576be0a-7134-47dc-8131-9279cc3e46ee.jpg?v=1771311357&width=1000",
  "https://thebaeshop.com/cdn/shop/files/2_6fa6df98-2639-4302-9159-e1569bbbe8bb.jpg?v=1771311357&width=1000",
  "https://thebaeshop.com/cdn/shop/files/3_d8c07677-5f85-4974-aea2-4ea281ed5c82.jpg?v=1771311357&width=1000",
  "https://thebaeshop.com/cdn/shop/files/6_801394e4-f984-4d22-b7f8-e1aba3f4b469.jpg?v=1771311357&width=1000",
];

// Product Video
const PRODUCT_VIDEO = 'https://static.zegsuapps.com/user-data/instagenie/bf98230ee1c9d00319d98ef61cde61afc2efbd63.mp4#t=0.1';

// Product Details
const PRODUCT_NAME = "Bae Bag — Personalised Vegan Leather Pouch";
const PRODUCT_PRICE = 1699;
const PRODUCT_ORIGINAL_PRICE = 1999;
const PRODUCT_DISCOUNT = 15;
const PRODUCT_SKU = "TB-BAG-001";
const PRODUCT_DESCRIPTION = "Handcrafted with premium 100% vegan leather — soft, durable, and cruelty-free. Features a smooth metal zip, satin-lined interior, and personalised name embossing. Gift-ready in an elegant magnetic box. Perfect for everyday carry, travel, and gifting.";
const PRODUCT_COLORS = [
  { name: "Black", value: "#1a1a1a" },
];
const PRODUCT_SIZES = ["One Size"];

// You May Also Like Products Data
const RELATED_PRODUCTS = [
  {
    id: 1,
    name: "Brown Collarless Checkered Shirt",
    image: "https://somashop.com/_next/image?url=https%3A%2F%2Fapi.somashop.com%2Fassets%2Fuploads%2Fmedia%2F_DSC8004.webp&w=640&q=75",
    price: 7999,
    originalPrice: 8499,
    rating: 4.5,
    reviews: 156
  },
  {
    id: 2,
    name: "Indigo Style Tunic",
    image: "https://somashop.com/_next/image?url=https%3A%2F%2Fapi.somashop.com%2Fassets%2Fuploads%2Fmedia%2F_AR73374.webp&w=640&q=75",
    price: 6799,
    originalPrice: 7299,
    rating: 4.7,
    reviews: 189
  },
  {
    id: 3,
    name: "Box Pleat Dress Beige",
    image: "https://somashop.com/_next/image?url=https%3A%2F%2Fapi.somashop.com%2Fassets%2Fuploads%2Fmedia%2F_DSC8160.webp&w=640&q=75",
    price: 5899,
    originalPrice: 6399,
    rating: 4.3,
    reviews: 142
  },
  {
    id: 4,
    name: "Box Pleat Blue Twill Dress",
    image: "https://api.somashop.com/assets/uploads/media/_DSC8033.webp",
    price: 6299,
    originalPrice: 6799,
    rating: 4.6,
    reviews: 178
  }
];

// Best Seller Products data — same as home page
const BS_IMG_1 = 'https://thebaeshop.com/cdn/shop/files/2_6fa6df98-2639-4302-9159-e1569bbbe8bb.jpg?v=1771311357&width=1080';
const BS_IMG_2 = 'https://thebaeshop.com/cdn/shop/files/12_df44ffa7-3472-4888-9f08-0566995b2cda.jpg?v=1771311291&width=2000';
const BS_IMG_3 = 'https://thebaeshop.com/cdn/shop/files/8_8dd5c96c-2111-4a49-99cc-3de41e1ca1ff.jpg?v=1771311343&width=2000';
const BS_IMG_4 = 'https://thebaeshop.com/cdn/shop/files/6_a60ca2c3-e0e9-4282-8350-c20bc6472dda.jpg?v=1770214028&width=1080';

const bestSellerProducts = [
  { id: 1, image: BS_IMG_1, title: 'BAE BAG CARAMEL CRUSH', currentPrice: 1699, originalPrice: 1999, rating: 4.6, reviewCount: 312, isBestseller: true },
  { id: 2, image: BS_IMG_2, title: 'BAE BAG VINTAGE GOLD', currentPrice: 1799, originalPrice: 2199, rating: 4.6, reviewCount: 278, isBestseller: true },
  { id: 3, image: BS_IMG_3, title: 'BAE BAG CHERRY ROUGE', currentPrice: 1799, originalPrice: 2199, rating: 4.6, reviewCount: 245, isBestseller: true },
  { id: 4, image: BS_IMG_4, title: 'BAE BAG GOLD RUSH', currentPrice: 1799, originalPrice: 2199, rating: 4.6, reviewCount: 198, isBestseller: true },
];

// ============================================
// END OF EDITABLE SECTION
// ============================================

// Dummy review templates for images without reviews
const dummyReviews = [
  {
    name: 'Priya Sharma',
    rating: 5,
    title: 'Absolutely stunning bag!',
    text: 'This personalised bae bag is absolutely beautiful! The vegan leather quality is excellent and the personalised embossing is so precise and elegant. I received so many compliments. Highly recommended!',
    date: '1/20/2025',
    type: 'product'
  },
  {
    name: 'Anjali Mehta',
    rating: 4,
    title: 'Great quality, love the colour',
    text: 'The bag is well-made with premium vegan leather. The design is elegant and the colour is vibrant and exactly as shown. The zipper hardware is smooth and sturdy. Overall, a great purchase!',
    date: '1/18/2025',
    type: 'product'
  },
  {
    name: 'Riya Patel',
    rating: 5,
    title: 'Perfect gift for special occasions',
    text: 'I bought this as a birthday gift and it was perfect! The packaging is premium, the gift box is magnetic and so luxurious. The personalised name tag added such a special touch. Worth every penny!',
    date: '1/15/2025',
    type: 'product'
  },
  {
    name: 'Kavya Reddy',
    rating: 4,
    title: 'Good bag, great value',
    text: 'The bae bag is good quality. The vegan leather feels premium and the satin lining inside is so soft. The personalisation was done neatly. Very satisfied with the purchase!',
    date: '1/12/2025',
    type: 'product'
  },
  {
    name: 'Meera Singh',
    rating: 5,
    title: 'Exceeded my expectations!',
    text: 'I was pleasantly surprised by the quality of the bag. The vegan leather is soft yet durable, the design is beautiful, and the personalised embossing looks stunning. The gift packaging is also very premium.',
    date: '1/10/2025',
    type: 'product'
  },
  {
    name: 'Sneha Verma',
    rating: 5,
    title: 'Best personalised gift brand!',
    text: 'Ordered for my sister\'s wedding and she absolutely loved it. The vegan leather quality is top notch and the personalised name on the bag makes it so special. Delivery was fast and packaging was elegant.',
    date: '1/08/2025',
    type: 'product'
  },
  {
    name: 'Divya Nair',
    rating: 4,
    title: 'Great value for money',
    text: 'The bae bag offers great value for the price. The vegan leather looks trendy and feels premium. The cruelty-free material is a big plus for me. Overall, a very satisfactory purchase!',
    date: '1/05/2025',
    type: 'product'
  },
  {
    name: 'Pooja Mehta',
    rating: 5,
    title: 'Love it! Perfect personalised bag',
    text: 'This is one of the best personalised bags I\'ve purchased online. The vegan leather quality is excellent, the personalised embossing is perfect, and the design is so elegant. Already ordered another in a different colour!',
    date: '1/03/2025',
    type: 'product'
  },
  {
    name: 'Neha Kapoor',
    rating: 4,
    title: 'Nice everyday bag',
    text: 'The bae bag is a great everyday carry. The vegan leather looks premium, the interior satin lining keeps things scratch-free, and the zipper is smooth. Exactly what I was looking for!',
    date: '12/30/2024',
    type: 'product'
  },
  {
    name: 'Aarti Desai',
    rating: 5,
    title: 'Beautiful and functional',
    text: 'I absolutely love my personalised bae bag! It\'s so stylish and the vegan leather quality is great. The personalised embossing looks elegant. Perfect for both daily use and gifting occasions.',
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
  const productRating  = passedProduct?.rating        || 4.6;
  const productReviews = passedProduct?.reviewCount   || 0;
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
    'https://www.instagram.com/p/DWBwnwzCGz-/',
    'https://www.instagram.com/p/DV8evfAk8WK/',
    'https://www.instagram.com/p/DVi06_pGDZ4/',
    'https://www.instagram.com/p/DVYgmN_mOky/',
    'https://www.instagram.com/p/DVONcAQkxKq/',
    'https://www.instagram.com/p/DVGjQReEtZu/',
    'https://www.instagram.com/p/DUuX_tMk8YK/',
    'https://www.instagram.com/p/DUDiVtxk1et/',
    'https://www.instagram.com/p/DTfbzsAE2kt/',
    'https://www.instagram.com/p/DTS0wspE5sx/',
    'https://www.instagram.com/p/DSC2COMkzyQ/',
    'https://www.instagram.com/p/DU-tK8PkxVI/',
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

  // Customer review images - Brand Images 1→12
  const customerReviewImages = [...ST_PRODUCT_IMGS];

  // All review images (product + brand) for modal navigation
  const allReviewImages = [...ST_PRODUCT_IMGS, ...ST_BRAND_IMGS];

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
      title: getReviewTitle(r.review),
      text: r.review,
      images: [ST_PRODUCT_IMGS[(i * 2) % 12], ST_PRODUCT_IMGS[(i * 2 + 1) % 12]],
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
      title: getReviewTitle(r.review),
      text: r.review,
      images: [ST_BRAND_IMGS[(i * 2) % 12], ST_BRAND_IMGS[(i * 2 + 1) % 12]],
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
      image: productImage1
    },
    {
      type: 'review',
      name: 'Neha',
      action: 'gave the review',
      time: '30 min ago',
      image: productImage2
    },
    {
      type: 'viewed',
      name: 'Priya',
      action: 'recently viewed',
      time: '1 hour ago',
      image: productImage3
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
      
      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Images Section - Grid Layout for Laptop */}
            <div className="w-full max-w-2xl mx-auto">
              {/* Main Product Image */}
              <div className="relative bg-white rounded-2xl overflow-hidden mb-6 group">
                <div className="aspect-square flex items-center justify-center p-8">
                  <img 
                    src={productImages[selectedImage] || productImages[0]} 
                    alt={productName}
                    className="w-full h-full object-contain cursor-zoom-in transition-transform group-hover:scale-105"
                  />
                  
                  {/* Zoom Icon */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                  
                  {/* Save Badge */}
                  <div className="absolute top-4 left-4 bg-[#351F31] text-white text-sm font-semibold px-3 py-1 rounded-lg">
                    SAVE {productDiscount}%
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3 justify-center overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    className={`w-16 h-16 md:w-20 md:h-20 shrink-0 border-2 rounded-lg overflow-hidden cursor-pointer transition-all bg-white ${
                      selectedImage === index 
                        ? 'border-gray-900 shadow-lg ring-2 ring-gray-900/20' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${productName} view ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            </div>


            {/* Product Details Section */}
            <div className="flex flex-col gap-5 pt-2">

              {/* Rating + sold count row — above title */}
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{productName}</h1>

              {/* Rating + sold count row — below title */}
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Half-star aware star row */}
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => {
                    const full = i <= Math.floor(productRating);
                    const half = !full && i === Math.ceil(productRating) && productRating % 1 >= 0.3;
                    const clipId = `star-clip-${i}`;
                    return (
                      <svg key={i} width="18" height="18" viewBox="0 0 24 24" style={{ filter: full || half ? 'drop-shadow(0 1px 1px rgba(245,158,11,0.4))' : 'none' }}>
                        <defs>{half && <clipPath id={clipId}><rect x="0" y="0" width="12" height="24"/></clipPath>}</defs>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#e5e7eb"/>
                        {(full || half) && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f59e0b" clipPath={half ? `url(#${clipId})` : undefined}/>}
                      </svg>
                    );
                  })}
                  <span className="text-sm font-bold text-gray-800 ml-1">{productRating}</span>
                </div>
                <span className="w-px h-4 bg-gray-300 rounded"/>
                <span className="text-sm text-gray-500"><span className="font-semibold text-gray-700">{productReviews > 0 ? productReviews : 300}</span> Reviews</span>
                <span className="w-px h-4 bg-gray-300 rounded"/>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg>
                  <span className="font-semibold text-gray-700">684</span> Sold this week
                </span>
              </div>

              {/* Keyword pills — below rating */}
              <div className="flex flex-wrap gap-2">
                {['Personalised', 'Vegan Leather', 'Gift Ready', 'Handcrafted', 'Travel Friendly'].map(kw => (
                  <span key={kw} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#f5f0f4] text-[#5c3a52] border border-[#e8d8e4]">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {kw}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl md:text-3xl font-bold text-gray-900">Rs. {productPrice.toLocaleString('en-IN')}.00</span>
                <span className="text-lg line-through" style={{ color: '#c0392b' }}>Rs. {productOriginal.toLocaleString('en-IN')}.00</span>
              </div>

              {/* Save badge */}
              <div className="inline-flex">
                <span className="px-3 py-1.5 text-sm font-semibold text-white rounded" style={{ backgroundColor: '#2d6a2d' }}>
                  SAVE Rs. {(productOriginal - productPrice).toLocaleString('en-IN')}.00 ({productDiscount}% OFF)
                </span>
              </div>

              {/* Colour swatches */}
              <div>
                <p className="text-xs font-semibold text-gray-700 tracking-widest mb-3">AVAILABLE IN {productImages.length} COLOURS:</p>
                <div className="flex gap-2 flex-wrap">
                  {productImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-14 h-14 rounded overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                      <img src={img} alt={`Colour ${i+1}`} className="w-full h-full object-cover"/>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name on bag info */}
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                </svg>
                <span>Please enter the name you'd like on your bag. If you have ordered more than 1, separate each name with a comma.</span>
              </div>

              {/* Name input */}
              <input
                type="text"
                placeholder="NAME ON THE BAG"
                className="w-full border border-gray-300 rounded px-4 py-4 text-sm text-gray-500 tracking-widest focus:outline-none focus:border-gray-600 bg-white"
              />

              {/* Add-ons */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
                  </svg>
                  <span className="text-sm font-bold text-gray-900 tracking-widest">ADD-ONS</span>
                </div>
                {[
                  { label: 'Gift Wrap Your Order', price: 50, img: 'https://thebaeshop.com/cdn/shop/files/2_6fa6df98-2639-4302-9159-e1569bbbe8bb.jpg?v=1771311357&width=1080' },
                  { label: "Add A Photo & Message (We'll reach out to you for same once you order.)", price: 50, img: 'https://thebaeshop.com/cdn/shop/files/12_df44ffa7-3472-4888-9f08-0566995b2cda.jpg?v=1771311291&width=2000' },
                ].map((addon, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                    <img src={addon.img} alt={addon.label} className="w-14 h-14 rounded object-cover flex-shrink-0"/>
                    <span className="flex-1 text-sm text-gray-800">{addon.label}</span>
                    <span className="text-sm font-semibold text-gray-900 mr-3">₹{addon.price}.00</span>
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-400 accent-gray-800 cursor-pointer flex-shrink-0"/>
                  </div>
                ))}
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex gap-3 items-stretch">
                <div className="flex items-center border border-gray-300 rounded">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-gray-600 hover:bg-gray-100 text-lg">‹</button>
                  <span className="px-5 text-base font-medium text-gray-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-gray-600 hover:bg-gray-100 text-lg">›</button>
                </div>
                <button className="flex-1 py-3 text-white font-bold text-sm uppercase tracking-widest rounded transition-opacity hover:opacity-90" style={{ backgroundColor: '#8B1A3A' }}>
                  ADD TO CART
                </button>
              </div>

              {/* Promo banner */}
              <div className="px-4 py-3 rounded text-sm text-gray-700" style={{ backgroundColor: '#f0eaf5' }}>
                5% off on your first order. Use code <strong>FIRSTGIFT</strong>. Extra 5% off on all pre-paid orders.
              </div>

              {/* Free shipping */}
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                </svg>
                <span className="text-sm font-bold text-gray-900">Free Shipping. Ships within 24–48 hours.</span>
              </div>

              {/* Accordion */}
              {[
                { key: 'details', label: 'Product Details', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', content: PRODUCT_DESCRIPTION },
                { key: 'shipping', label: 'Shipping Details', icon: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8z', content: 'Free shipping on all orders. Ships within 24–48 hours. Express delivery available for metro cities.' },
                { key: 'returns', label: 'Returns & Exchanges', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', content: '7-day hassle-free returns. Item must be unused and in original packaging.' },
              ].map(({ key, label, icon, content }) => (
                <div key={key} className="border-t border-gray-200">
                  <button
                    onClick={() => setIsDescriptionOpen(isDescriptionOpen === key ? null : key)}
                    className="w-full flex items-center justify-between py-4 text-sm font-semibold text-gray-900"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon}/>
                      </svg>
                      {label}
                    </div>
                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${isDescriptionOpen === key ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16"/>
                    </svg>
                  </button>
                  {isDescriptionOpen === key && (
                    <div className="pb-4 text-sm text-gray-600">{content}</div>
                  )}
                </div>
              ))}
              <div className="border-t border-gray-200" />

            </div>
          </div>
        </div>
      </main>

      {/* PDP Banner Images */}
      <div className="w-full bg-white">
        <img src={product1} alt="" className="w-full block" />
        <img src={product2} alt="" className="w-full block" />
      </div>

      {/* Videos Section */}
      {(() => {
        const PDP_VIDEOS = [
          'https://static.zegsuapps.com/user-data/instagenie/fcf16e7602400ff148106a4823cf11c8f36a49f6.mp4',
          'https://static.zegsuapps.com/user-data/instagenie/ea61e7f228905000ee6a0e1eec4ae4228b334414.mp4',
          'https://static.zegsuapps.com/user-data/instagenie/b0eed95e675c0254b1c4e1a5835bb9efae1de7b3.mp4',
          'https://static.zegsuapps.com/user-data/instagenie/18d42e8ff21548957ccc45ca4dc1711c4889e8ac.mp4',
          'https://static.zegsuapps.com/user-data/instagenie/bf98230ee1c9d00319d98ef61cde61afc2efbd63.mp4',
          'https://static.zegsuapps.com/user-data/instagenie/02690b7ae3a0bcf8590cae2454cbd864ae32a23a.mp4',
        ];

        const VideoSection = () => {
          const [activeVideo, setActiveVideo] = React.useState(null);
          const modalVideoRef = React.useRef(null);
          const touchStartX = React.useRef(null);

          React.useEffect(() => {
            if (activeVideo === null) return;
            const v = modalVideoRef.current;
            if (v) { v.currentTime = 0; v.play().catch(() => {}); }
          }, [activeVideo]);

          React.useEffect(() => {
            const onKey = (e) => {
              if (activeVideo === null) return;
              if (e.key === 'Escape') setActiveVideo(null);
              if (e.key === 'ArrowRight') setActiveVideo(i => (i + 1) % PDP_VIDEOS.length);
              if (e.key === 'ArrowLeft') setActiveVideo(i => (i - 1 + PDP_VIDEOS.length) % PDP_VIDEOS.length);
            };
            window.addEventListener('keydown', onKey);
            return () => window.removeEventListener('keydown', onKey);
          }, [activeVideo]);

          return (
            <>
              <div className="w-full py-12" style={{ background: '#1a0f18' }}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                  {/* Header */}
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.25em] mb-2" style={{ color: '#c9a0b8' }}>REAL PEOPLE · REAL BAGS</p>
                      <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">See It In The Wild</h2>
                    </div>
                    <span className="hidden md:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border" style={{ color: '#c9a0b8', borderColor: 'rgba(201,160,184,0.3)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      @thebaeshop.xoxo
                    </span>
                  </div>

                  {/* Scrollable video row */}
                  <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                    {PDP_VIDEOS.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer"
                        style={{ width: '160px', height: '285px', background: '#2a1525' }}
                        onClick={() => setActiveVideo(idx)}
                      >
                        <video
                          src={src}
                          className="w-full h-full object-cover"
                          muted
                          autoPlay
                          playsInline
                          preload="auto"
                          loop
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(26,15,24,0.75) 0%, transparent 50%)' }} />
                        {/* Bottom label */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="text-[10px] font-semibold text-white/80 tracking-wide">#{idx + 1} The Bae Shop</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Full-screen video modal */}
              {activeVideo !== null && (
                <div
                  className="fixed inset-0 z-[999] flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.92)' }}
                  onClick={() => setActiveVideo(null)}
                >
                  {/* Video container */}
                  <div
                    className="relative"
                    style={{ width: 'min(360px, 90vw)', height: 'min(640px, 85vh)' }}
                    onClick={e => e.stopPropagation()}
                    onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
                    onTouchEnd={e => {
                      if (touchStartX.current === null) return;
                      const diff = touchStartX.current - e.changedTouches[0].clientX;
                      if (Math.abs(diff) > 50) {
                        setActiveVideo(i => diff > 0 ? (i + 1) % PDP_VIDEOS.length : (i - 1 + PDP_VIDEOS.length) % PDP_VIDEOS.length);
                      }
                      touchStartX.current = null;
                    }}
                  >
                    <video
                      ref={modalVideoRef}
                      key={activeVideo}
                      src={PDP_VIDEOS[activeVideo]}
                      className="w-full h-full object-cover rounded-2xl"
                      autoPlay
                      playsInline
                      loop
                      controls
                      style={{ background: '#000' }}
                    />

                    {/* Close */}
                    <button
                      className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center z-10"
                      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
                      onClick={() => setActiveVideo(null)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>

                    {/* Prev */}
                    <button
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10"
                      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
                      onClick={() => setActiveVideo(i => (i - 1 + PDP_VIDEOS.length) % PDP_VIDEOS.length)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>

                    {/* Next */}
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10"
                      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
                      onClick={() => setActiveVideo(i => (i + 1) % PDP_VIDEOS.length)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                      {PDP_VIDEOS.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveVideo(i)}
                          className="rounded-full transition-all"
                          style={{ width: i === activeVideo ? '20px' : '6px', height: '6px', background: i === activeVideo ? 'white' : 'rgba(255,255,255,0.4)' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        };

        return <VideoSection />;
      })()}

      {/* Best Sellers Section */}
      <section className="w-full py-12 md:py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#8B4513] tracking-wide">
              SHOP OUR BEST SELLERS
            </h2>
          </div>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 md:gap-6 min-w-max pb-2">
              {bestSellerProducts.slice(0, 4).map((product) => (
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
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
                        background: `conic-gradient(#7a4f6d 0% 96%, #ede0eb 96% 100%)`,
                        boxShadow: '0 8px 24px rgba(122,79,109,0.22)'
                      }}
                    >
                      <div className="absolute inset-[6px] rounded-full bg-white flex items-center justify-center">
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-3xl font-bold" style={{ color: '#7a4f6d' }}>4.8</span>
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border" style={{ backgroundColor: 'rgba(53,31,49,0.07)', color: '#351F31', borderColor: 'rgba(53,31,49,0.2)' }}>
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
                              backgroundColor: '#7a4f6d',
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
                        label: 'Love the vegan leather quality',
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
              <div className="flex flex-wrap mb-6 bg-gray-100 rounded-lg p-1 gap-1">
                <button 
                  className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'product' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'hover:text-gray-900'
                  }`}
                  style={{ color: activeTab === 'product' ? undefined : '#351F31' }}
                  onClick={() => setActiveTab('product')}
                >
                  Product Reviews
                </button>
                <button 
                  className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'brand' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'hover:text-gray-900'
                  }`}
                  style={{ color: activeTab === 'brand' ? undefined : '#351F31' }}
                  onClick={() => setActiveTab('brand')}
                >
                  Brand Reviews
                </button>
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
                          Customers love the personalised embossing and premium vegan leather quality of The Bae Shop bags. The name customisation is consistently praised for being precise and elegant. Many customers highlight how well the bags work as gifts — the magnetic gift box and personalised tag make unboxing a special experience. The satin-lined interior, sturdy metal zippers, and water-resistant exterior are frequently mentioned as standout features that make these bags feel truly luxurious.
                          <button onClick={() => setIsAISummaryExpanded(false)} className="underline ml-1 cursor-pointer" style={{ color: '#351F31' }}>Read less</button>
                        </>
                      ) : (
                        <>
                          Customers love the personalised embossing and premium vegan leather quality of The Bae Shop bags. The name customisation is consistently praised for being precise and elegant.
                          <button onClick={() => setIsAISummaryExpanded(true)} className="underline ml-1 cursor-pointer" style={{ color: '#351F31' }}>Read more</button>
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
                        {['Personalised Embossing', 'Vegan Leather', 'Gift Ready', 'Premium Quality', 'Satin Lining'].map((item, index) => (
                          <span key={index} className="text-xs font-semibold" style={{ color: '#7a4f6d' }}>
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
                        <div key={review.id} className="py-5">
                          {/* Top row: stars + name + date */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-0.5">
                                {[1,2,3,4,5].map(i => {
                                  const full = i <= Math.floor(review.rating);
                                  const half = !full && i === Math.ceil(review.rating) && review.rating % 1 >= 0.3;
                                  const cId = `rc-clip-${review.id}-${i}`;
                                  return (
                                    <svg key={i} width="13" height="13" viewBox="0 0 24 24">
                                      <defs>{half && <clipPath id={cId}><rect x="0" y="0" width="12" height="24"/></clipPath>}</defs>
                                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#e5e7eb"/>
                                      {(full || half) && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f59e0b" clipPath={half ? `url(#${cId})` : undefined}/>}
                                    </svg>
                                  );
                                })}
                              </div>
                              <span className="text-sm font-semibold text-gray-900">{review.name}</span>
                              <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <span className="text-xs text-gray-400">{getDaysAgo(review.date)}</span>
                          </div>

                          {/* Review text */}
                          <p className="text-sm text-gray-600 leading-relaxed mb-3">
                            {expandedReviews[`product-${review.id}`] ? review.text : `${review.text.slice(0, 140)}...`}
                            <button onClick={() => handleReadMore(review.id, 'product')} className="ml-1 text-xs font-medium underline text-gray-400 hover:text-gray-600">
                              {expandedReviews[`product-${review.id}`] ? 'less' : 'more'}
                            </button>
                          </p>

                          {/* Images */}
                          {review.images?.length > 0 && (
                            <div className="flex gap-2 mb-3">
                              {review.images.map((image, imgIndex) => (
                                <div key={imgIndex} className="w-16 h-16 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity"
                                  onClick={() => { const idx = allReviewImages.indexOf(image); if (idx !== -1) handleImageClick(idx); }}>
                                  <img src={image} alt="" className="w-full h-full object-cover"/>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">{review.location}</span>
                            <button onClick={() => handleLike(review.id, 'product')} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                              Helpful ({reviewLikes[likeKey] || 4})
                            </button>
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
                          Customers love The Bae Shop for its consistent quality, beautiful personalisation, and thoughtful packaging. The brand is known for premium vegan leather bags, elegant designs, and a cruelty-free ethos that resonates deeply with customers. Many shoppers praise the brand for its gifting experience — the magnetic gift box, personalised name tags, and careful packing make every order feel special. Customers also frequently highlight the brand's fast delivery, helpful customer support, and great value for money across all collections.
                          <button onClick={() => setIsBrandAISummaryExpanded(false)} className="underline ml-1 cursor-pointer" style={{ color: '#351F31' }}>Read less</button>
                        </>
                      ) : (
                        <>
                          Customers love The Bae Shop for its consistent quality, beautiful personalisation, and thoughtful packaging. The brand is known for premium vegan leather bags and a cruelty-free ethos.
                          <button onClick={() => setIsBrandAISummaryExpanded(true)} className="underline ml-1 cursor-pointer" style={{ color: '#351F31' }}>Read more</button>
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
                        {['Cruelty-Free', 'Personalised Gifting', 'Elegant Packaging', 'Fast Delivery', 'Premium Vegan Leather', 'Great Value'].map((item, index) => (
                          <span key={index} className="text-xs font-semibold" style={{ color: '#7a4f6d' }}>
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
                        <div key={review.id} className="py-5">
                          {/* Top row: stars + name + date */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-0.5">
                                {[1,2,3,4,5].map(i => {
                                  const full = i <= Math.floor(review.rating);
                                  const half = !full && i === Math.ceil(review.rating) && review.rating % 1 >= 0.3;
                                  const cId = `br-clip-${review.id}-${i}`;
                                  return (
                                    <svg key={i} width="13" height="13" viewBox="0 0 24 24">
                                      <defs>{half && <clipPath id={cId}><rect x="0" y="0" width="12" height="24"/></clipPath>}</defs>
                                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#e5e7eb"/>
                                      {(full || half) && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f59e0b" clipPath={half ? `url(#${cId})` : undefined}/>}
                                    </svg>
                                  );
                                })}
                              </div>
                              <span className="text-sm font-semibold text-gray-900">{review.name}</span>
                              <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <span className="text-xs text-gray-400">{getDaysAgo(review.date)}</span>
                          </div>

                          {/* Review text */}
                          <p className="text-sm text-gray-600 leading-relaxed mb-3">
                            {expandedReviews[`brand-${review.id}`] ? review.text : `${review.text.slice(0, 140)}...`}
                            {review.text.length > 140 && (
                              <button onClick={() => handleReadMore(review.id, 'brand')} className="ml-1 text-xs font-medium underline text-gray-400 hover:text-gray-600">
                                {expandedReviews[`brand-${review.id}`] ? 'less' : 'more'}
                              </button>
                            )}
                          </p>

                          {/* Images */}
                          {review.images?.length > 0 && (
                            <div className="flex gap-2 mb-3">
                              {review.images.map((image, imgIndex) => (
                                <div key={imgIndex} className="w-16 h-16 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity"
                                  onClick={() => { const idx = allReviewImages.indexOf(image); if (idx !== -1) handleImageClick(idx); }}>
                                  <img src={image} alt="" className="w-full h-full object-cover"/>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">{review.location}</span>
                            <button onClick={() => handleLike(review.id, 'brand')} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                              Helpful ({reviewLikes[likeKey] || 4})
                            </button>
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
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

