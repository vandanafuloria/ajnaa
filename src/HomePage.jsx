import React, { useState, useEffect } from 'react';
import ShopifyHeader from './ShopifyHeader';
import ShopifyFooter from './ShopifyFooter';
import ProductCard from './ProductCard';
import AIBrandEngine from './AIBrandEngine';
import LiveUserCounter from './LiveUserCounter';
import ActivityBanner from './ActivityBanner';
import './HomePage.css';

const SHOPIFY_VIDEO_URLS = [
  'https://cdn.shopify.com/videos/c/o/v/6705397241a34c05bb518fb088efebbc.mp4',
  'https://cdn.shopify.com/videos/c/o/v/4ccf42fed6f24c33a4fe40ed57894447.mp4',
  'https://cdn.shopify.com/videos/c/o/v/6e87d98ad895427785883250699980be.mp4',
  'https://cdn.shopify.com/videos/c/o/v/7de778663bbd4ae8891937d41152bd28.mp4',
  'https://cdn.shopify.com/videos/c/o/v/b5259f2f9e4c4d1c89237bf73eeacead.mp4',
  'https://cdn.shopify.com/videos/c/o/v/0848219d3ecf4b958d7a7431f67f472b.mp4',
  'https://cdn.shopify.com/videos/c/o/v/b24af678e64b40518f1dadd3796ab3b2.mp4',
  'https://cdn.shopify.com/videos/c/o/v/738c5e887f4241629de7eaea7632c4ad.mp4',
  'https://cdn.shopify.com/videos/c/o/v/6d4c3029fce7492fa25dee1717b98205.mp4',
  'https://cdn.shopify.com/videos/c/o/v/0ac45b808de7488bb1ab1e51fd202926.mp4',
];

const BRAND_NAME = "wordofmouth";

// Best Seller Products data
const bestSellerProducts = [
  {
    id: 1,
    image: 'https://vibecrafts.com/cdn/shop/files/vibrant-peacock-and-red-lotus-floral-canvas-wall-painting-PTVCH_4307_1.webp?v=1774351105&width=600',
    title: 'Vibrant Peacock and Red Lotus Floral Canvas Wall Painting',
    currentPrice: 2699,
    originalPrice: 6599,
    rating: 4.7,
    badge: 'Best Sellers',
    feature: 'Premium Canvas Print',
  },
  {
    id: 2,
    image: 'https://vibecrafts.com/cdn/shop/files/abstract-mountain-lake-canvas-wall-art-painting-for-wall-decor-PTVCH_3616_1.webp?v=1774350796&width=600',
    title: 'Abstract Mountain Lake Canvas Wall Art Painting for Wall Decor',
    currentPrice: 1999,
    originalPrice: 4999,
    rating: 4.8,
    badge: 'Trending',
    feature: 'UV Resistant Colors',
  },
  {
    id: 3,
    image: 'https://vibecrafts.com/cdn/shop/files/artistic-abstract-canvas-wall-art-painting-for-modern-decor-PTVCH_3615_1.webp?v=1774350665&width=600',
    title: 'Artistic Abstract Canvas Wall Art Painting for Modern Decor',
    currentPrice: 1799,
    originalPrice: 4499,
    rating: 4.9,
    badge: 'New Launch',
    feature: 'Stretched & Ready to Hang',
  },
  {
    id: 4,
    image: 'https://vibecrafts.com/cdn/shop/files/abstract-peacock-feather-canvas-wall-art-painting-PTVCH_3614_1.webp?v=1774350343&width=600',
    title: 'Abstract Peacock Feather Canvas Wall Art Painting',
    currentPrice: 2299,
    originalPrice: 5999,
    rating: 4.8,
    badge: 'Best Sellers',
    feature: 'Fade-Proof Ink Technology',
  },
];

const getRandomSoldThisWeek = (min = 180, max = 420) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const VIBECRAFTS_IMGS = [
  'https://vibecrafts.com/cdn/shop/files/vibrant-peacock-and-red-lotus-floral-canvas-wall-painting-PTVCH_4307_1.webp?v=1774351105&width=600',
  'https://vibecrafts.com/cdn/shop/files/abstract-mountain-lake-canvas-wall-art-painting-for-wall-decor-PTVCH_3616_1.webp?v=1774350796&width=600',
  'https://vibecrafts.com/cdn/shop/files/artistic-abstract-canvas-wall-art-painting-for-modern-decor-PTVCH_3615_1.webp?v=1774350665&width=600',
  'https://vibecrafts.com/cdn/shop/files/abstract-peacock-feather-canvas-wall-art-painting-PTVCH_3614_1.webp?v=1774350343&width=600',
];

// Video Products data
const videoProducts = [
  { id: 1, video: SHOPIFY_VIDEO_URLS[0], image: VIBECRAFTS_IMGS[0], views: '4.0K', title: 'Vibrant Peacock and Red Lotus Floral Canvas Wall Painting', currentPrice: 2699, originalPrice: 6599, soldThisWeek: getRandomSoldThisWeek() },
  { id: 2, video: SHOPIFY_VIDEO_URLS[1], image: VIBECRAFTS_IMGS[1], views: '4.2K', title: 'Abstract Mountain Lake Canvas Wall Art Painting', currentPrice: 1999, originalPrice: 4999, soldThisWeek: getRandomSoldThisWeek() },
  { id: 3, video: SHOPIFY_VIDEO_URLS[2], image: VIBECRAFTS_IMGS[2], views: '3.8K', title: 'Artistic Abstract Canvas Wall Art for Modern Decor', currentPrice: 1799, originalPrice: 4499, soldThisWeek: getRandomSoldThisWeek() },
  { id: 4, video: SHOPIFY_VIDEO_URLS[3], image: VIBECRAFTS_IMGS[3], views: '3.1K', title: 'Abstract Peacock Feather Canvas Wall Art Painting', currentPrice: 2299, originalPrice: 5999, soldThisWeek: getRandomSoldThisWeek() },
  { id: 5, video: SHOPIFY_VIDEO_URLS[4], image: VIBECRAFTS_IMGS[0], views: '2.9K', title: 'Vibrant Peacock Floral Canvas – Premium Edition', currentPrice: 2699, originalPrice: 6599, soldThisWeek: getRandomSoldThisWeek() },
  { id: 6, video: SHOPIFY_VIDEO_URLS[5], image: VIBECRAFTS_IMGS[1], views: '2.7K', title: 'Mountain Serenity Canvas Wall Art', currentPrice: 1999, originalPrice: 4999, soldThisWeek: getRandomSoldThisWeek() },
  { id: 7, video: SHOPIFY_VIDEO_URLS[6], image: VIBECRAFTS_IMGS[2], views: '3.3K', title: 'Artistic Abstract Modern Canvas Painting', currentPrice: 1799, originalPrice: 4499, soldThisWeek: getRandomSoldThisWeek() },
  { id: 8, video: SHOPIFY_VIDEO_URLS[7], image: VIBECRAFTS_IMGS[3], views: '3.5K', title: 'Peacock Feather Wall Art – Teal Edition', currentPrice: 2299, originalPrice: 5999, soldThisWeek: getRandomSoldThisWeek() },
  { id: 9, video: SHOPIFY_VIDEO_URLS[8], image: VIBECRAFTS_IMGS[0], views: '4.1K', title: 'Floral Peacock Canvas – Living Room Décor', currentPrice: 2699, originalPrice: 6599, soldThisWeek: getRandomSoldThisWeek() },
  { id: 10, video: SHOPIFY_VIDEO_URLS[9], image: VIBECRAFTS_IMGS[1], views: '3.9K', title: 'Lake & Mountains Canvas Art for Bedroom', currentPrice: 1999, originalPrice: 4999, soldThisWeek: getRandomSoldThisWeek() },
];

const HomePage = ({ onProductClick }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedLookVideo, setSelectedLookVideo] = useState(null);
  const [lookVideoIndex, setLookVideoIndex] = useState(0);
  const lookVideoIndexRef = React.useRef(0);
  const lookLastSwitchTime = React.useRef(0);
  const [lookVideoMuted, setLookVideoMuted] = useState(true);
  const [lookLiked, setLookLiked] = useState(false);
  const lookModalVideoRef = React.useRef(null);
  const lookTouchStartY = React.useRef(null);

  const goToLookVideo = (n) => {
    lookVideoIndexRef.current = n;
    setLookVideoIndex(n);
    setSelectedLookVideo(videoProducts[n]);
    setLookLiked(false);
  };
  const videoRefs = React.useRef({});
  const modalVideoRef = React.useRef(null);
  const [videoMuted, setVideoMuted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const instagramCarouselRef = React.useRef(null);
  

  
  // Instagram Section - Fresh Implementation
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [instagramLoading, setInstagramLoading] = useState(true);
  
  // Instagram post URLs
  const instagramPosts = [
    'https://www.instagram.com/p/DWOkJDuExMS/',
    'https://www.instagram.com/p/DWGjpesAZvP/',
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

  // Process embeds when modal opens and for carousel
  useEffect(() => {
    const processEmbeds = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };

    let modalTimers = [];
    let fallbackTimer = null;

    if (showInstagramModal) {
      setTimeout(() => setInstagramLoading(true), 0);
      
      // Process embeds with delays to ensure DOM is ready
      modalTimers = [
        setTimeout(processEmbeds, 500),
        setTimeout(processEmbeds, 1500),
        setTimeout(processEmbeds, 2500)
      ];

      // Hide loading after embeds are processed
      setTimeout(() => {
        setInstagramLoading(false);
      }, 2000);

      // Fallback: hide loading after max wait time
      fallbackTimer = setTimeout(() => {
        setInstagramLoading(false);
      }, 5000);
    } else {
      setTimeout(() => setInstagramLoading(true), 0);
    }

    // Process embeds for carousel on mount and when Instagram script loads
    const carouselTimers = [
      setTimeout(processEmbeds, 1000),
      setTimeout(processEmbeds, 2000),
      setTimeout(processEmbeds, 3000),
    ];

    return () => {
      modalTimers.forEach(timer => clearTimeout(timer));
      if (fallbackTimer) clearTimeout(fallbackTimer);
      carouselTimers.forEach(timer => clearTimeout(timer));
    };
  }, [showInstagramModal]);

  // Auto-scroll Instagram carousel
  useEffect(() => {
    const carousel = instagramCarouselRef.current;
    if (!carousel) return;

    let scrollAmount = 0;
    const scrollSpeed = 1; // pixels per frame
    const scrollInterval = 16; // ~60fps
    let intervalId = null;
    let isPaused = false;

    const scroll = () => {
      if (isPaused) return;
      scrollAmount += scrollSpeed;
      carousel.scrollLeft = scrollAmount;

      // Reset scroll position when reaching the end (seamless loop)
      if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
        scrollAmount = 0;
      }
    };

    const startScrolling = () => {
      if (!intervalId) {
        intervalId = setInterval(scroll, scrollInterval);
      }
      isPaused = false;
    };

    const stopScrolling = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      isPaused = true;
    };

    startScrolling();

    // Pause on hover
    carousel.addEventListener('mouseenter', stopScrolling);
    carousel.addEventListener('mouseleave', startScrolling);

    return () => {
      stopScrolling();
      carousel.removeEventListener('mouseenter', stopScrolling);
      carousel.removeEventListener('mouseleave', startScrolling);
    };
  }, [instagramPosts.length]);

  // Scroll detection for live counter
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play all videos
  useEffect(() => {
    videoProducts.forEach((product) => {
      const video = videoRefs.current[product.id];
      if (video) {
        video.play().catch(() => {});
      }
    });
  }, []);

  // Handle modal video audio when opened
  useEffect(() => {
    if (selectedVideo) {
      // Always start muted to respect autoplay policies
      setTimeout(() => setVideoMuted(true), 0);
      
      // Use setTimeout to ensure video element is rendered
      setTimeout(() => {
        if (modalVideoRef.current) {
          const video = modalVideoRef.current;
          // Start muted to ensure autoplay works
          video.muted = true;
          video.volume = 1.0;
          video.play().catch((err) => {
            console.log('Play error:', err);
          });
        }
      }, 100);
    }
  }, [selectedVideo]);


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ShopifyHeader brandName={BRAND_NAME} />
      
      {/* Live User Counter */}
      <LiveUserCounter className={`fixed left-4 z-50 transition-all duration-300 ${isScrolled ? 'top-4' : 'top-[46px]'}`} />
      
      {/* Trusted Customers Widget - Sticky on right side */}
      <div 
        className="fixed right-4 rounded-lg px-3 md:px-6 py-2 md:py-3 shadow-lg z-30 bg-white"
        style={{
          visibility: 'visible',
          display: 'block',
          zIndex: 30,
          top: '226px',
          transform: 'rotate(270deg)',
          transformOrigin: 'right',
          minWidth: '200px'
        }}
      >
        <div className="flex items-center gap-2 md:gap-3 whitespace-nowrap">
          <div className="flex items-center gap-0.5 md:gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-3 h-3 md:w-5 md:h-5"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0L10.06 5.51L16 6.18L12 10.15L12.94 16L8 13.18L3.06 16L4 10.15L0 6.18L5.94 5.51L8 0Z"
                  fill="#FF9500"
                />
              </svg>
            ))}
          </div>
          <span className="text-xs md:text-sm font-bold text-gray-900 font-['Space_Grotesk']">Trusted by 10,000+ customers</span>
        </div>
      </div>
      


      {/* Big Deals Section */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="w-full px-4">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Big Deals</h2>
            <button className="text-base md:text-lg font-bold text-gray-900 hover:opacity-70 transition-opacity">View All</button>
          </div>
          <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4 md:gap-5 min-w-max pb-2">
              {bestSellerProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 cursor-pointer"
                  style={{ width: '300px' }}
                  onClick={() => onProductClick && onProductClick(product)}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>




      {/* Video Section - moved to product page */}
      <section className="w-full py-12 md:py-16 bg-white hidden">
        <div className="w-full px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#8B4513] mb-3 tracking-wide">
              SHOP OUR BEST SELLERS
            </h2>
          </div>

          {/* Pill / Story-style thumbnails */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-3 md:gap-4 min-w-max pb-2">
              {videoProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedVideo(product)}
                  className="flex flex-col items-center gap-1.5 focus:outline-none"
                >
                  {/* Pill frame with pink gradient ring */}
                  <div
                    className="rounded-[999px] p-[2px]"
                    style={{ background: 'linear-gradient(180deg,#f9a8d4,#fbcfe8,#fce7f3)' }}
                  >
                    <div className="rounded-[999px] overflow-hidden bg-gray-100"
                      style={{ width: '140px', height: '210px' }}>
                      <video
                        src={product.video}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        style={{ pointerEvents: 'none' }}
                      />
                    </div>
                  </div>
                  {/* Label */}
                  <span className="text-xs text-gray-700 text-center max-w-[140px] leading-tight line-clamp-2">
                    {product.title}
                  </span>
                </button>
              ))}

            </div>
          </div>

          {/* old scroll kept hidden — replaced by pills above */}
          <div className="hidden overflow-x-auto -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4 md:gap-6 min-w-max">
              {videoProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="w-[200px] md:w-[240px] flex-shrink-0"
                  style={{ minHeight: '330px', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 8px', borderRadius: '8px' }}
                >
                  <div className="bg-white rounded-lg overflow-hidden h-full flex flex-col">
                    {/* Video Container */}
                    <div 
                      className="relative w-full h-[360px] md:h-[440px]"
                    >
                      <div 
                        className="w-full h-full"
                        style={{ backgroundColor: 'rgb(242, 242, 242)', borderRadius: '8px 8px 0px 0px' }}
                      >
                        <video
                          src={product.video}
                          className="w-full h-full object-cover"
                          style={{ borderRadius: '8px 8px 0px 0px' }}
                          loop
                          muted
                          autoPlay
                          playsInline
                          preload="none"
                          ref={(el) => {
                            videoRefs.current[product.id] = el;
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedVideo(product);
                          }}
                        />
                      </div>
                      
                      {/* Views Container - Bottom Left */}
                      <div 
                        className="absolute bottom-[10px] left-[10px] text-white text-sm font-medium px-2 py-1 rounded"
                        style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        {product.views} Views
                      </div>
                      
                      {/* Like/Share Container - Bottom Right */}
                      <div 
                        className="absolute bottom-[10px] right-[10px] flex items-center gap-3"
                      >
                        {/* Like Icon */}
                        <div className="flex items-center justify-center">
                          <svg 
                            width="15" 
                            height="16" 
                            viewBox="0 0 15 16" 
                            fill="none" 
                            stroke="#fff" 
                            strokeWidth="1" 
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transform: 'scale(1.3)', filter: 'drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.5))' }}
                          >
                            <path d="M10.3128 2.31787C9.11857 2.31787 8.07301 2.8314 7.42127 3.69942C6.76953 2.8314 5.72396 2.31787 4.52978 2.31787C3.57919 2.31894 2.66784 2.69704 1.99567 3.36921C1.3235 4.04138 0.945407 4.95272 0.944336 5.90331C0.944336 9.9514 6.94648 13.228 7.20209 13.3634C7.26946 13.3996 7.34477 13.4186 7.42127 13.4186C7.49777 13.4186 7.57307 13.3996 7.64044 13.3634C7.89605 13.228 13.8982 9.9514 13.8982 5.90331C13.8971 4.95272 13.519 4.04138 12.8469 3.36921C12.1747 2.69704 11.2633 2.31894 10.3128 2.31787ZM7.42127 12.4265C6.3653 11.8112 1.86961 9.00819 1.86961 5.90331C1.87053 5.19808 2.15109 4.52199 2.64977 4.02331C3.14845 3.52463 3.82454 3.24406 4.52978 3.24315C5.65457 3.24315 6.59893 3.84226 6.99333 4.80455C7.02818 4.8894 7.08748 4.96198 7.16367 5.01305C7.23987 5.06413 7.32953 5.0914 7.42127 5.0914C7.513 5.0914 7.60266 5.06413 7.67886 5.01305C7.75506 4.96198 7.81435 4.8894 7.84921 4.80455C8.24361 3.84053 9.18797 3.24315 10.3128 3.24315C11.018 3.24406 11.6941 3.52463 12.1928 4.02331C12.6914 4.52199 12.972 5.19808 12.9729 5.90331C12.9729 9.00357 8.47608 11.8106 7.42127 12.4265Z" fill="white"></path>
                          </svg>
                        </div>
                        
                        {/* Share Icon */}
                        <div className="flex items-center justify-center">
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16" 
                            fill="none" 
                            stroke="#fff" 
                            strokeWidth="1" 
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transform: 'scale(1.3)', filter: 'drop-shadow(0 0 0.4rem rgba(0, 0, 0, 0.5))' }}
                          >
                            <path d="M14.0074 2.12578C13.8911 2.0095 13.7458 1.92634 13.5866 1.88487C13.4274 1.8434 13.2601 1.84511 13.1018 1.88983H13.0931L1.99328 5.25784C1.81259 5.3098 1.65202 5.41557 1.53295 5.56107C1.41388 5.70656 1.34196 5.88488 1.32676 6.07228C1.31156 6.25967 1.35381 6.44725 1.44788 6.61003C1.54195 6.77281 1.68338 6.90308 1.85333 6.98348L6.80471 9.32847L9.14971 14.2799C9.22374 14.4384 9.3416 14.5725 9.48936 14.6663C9.63712 14.76 9.80862 14.8095 9.98361 14.809C10.0102 14.809 10.0368 14.8078 10.0634 14.8055C10.2501 14.7904 10.4278 14.7185 10.5725 14.5996C10.7172 14.4806 10.8221 14.3202 10.873 14.1399L14.2387 3.04007C14.2387 3.03717 14.2387 3.03428 14.2387 3.03139C14.284 2.87349 14.2865 2.70638 14.2458 2.54723C14.2052 2.38807 14.1229 2.24261 14.0074 2.12578ZM9.98882 13.875L9.98592 13.8831L7.70975 9.07807L10.4416 6.34561C10.5247 6.25815 10.5704 6.14168 10.5688 6.02104C10.5673 5.9004 10.5187 5.78514 10.4334 5.69983C10.348 5.61452 10.2328 5.56591 10.1121 5.56436C9.9915 5.56282 9.87504 5.60846 9.78757 5.69156L7.05511 8.42344L2.24946 6.14726H2.25756L13.3528 2.78041L9.98882 13.875Z" fill="white"></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="flex items-start gap-3">
                        {/* Product Image Thumbnail */}
                        <div 
                          className="flex-shrink-0 rounded-full overflow-hidden"
                          style={{ height: '32px', width: '32px', borderRadius: '2rem' }}
                        >
                          <img 
                            src={product.image || product.video} 
                            alt={product.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32"%3E%3Crect width="32" height="32" fill="%23f2f2f2"/%3E%3C/svg%3E';
                            }}
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          {/* Product Name */}
                          <div 
                            className="text-black font-normal text-[13px] mb-1 line-clamp-2"
                            style={{ color: 'rgb(0, 0, 0)', fontWeight: 400, fontSize: '13px' }}
                          >
                            {product.title}
                          </div>
                          
                          {/* Prices */}
                          <div className="flex items-center gap-2 flex-wrap">Curated for Your Elegance
                            {product.currentPrice && (
                              <div 
                                className="text-black font-normal"
                                style={{ color: '#000000', fontStyle: 'normal' }}
                              >
                                ₹ {product.currentPrice.toLocaleString('en-IN')}
                              </div>
                            )}
                          </div>
                          
                          {/* Offer Percentage */}
                          {product.discount && (
                            <div 
                              className="text-sm font-normal mt-1"
                              style={{ color: 'rgb(21, 106, 5)', fontWeight: 400 }}
                            >
                              {product.discount}% Off
                            </div>
                          )}
                          
                          {/* Social Proof - Sold This Week */}
                          <div 
                            className="text-xs font-normal mt-1.5"
                            style={{ color: '#7f2065', fontWeight: 400 }}
                          >
                            {(product.soldThisWeek ?? 235)} sold this week
                          </div>
                        </div>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Add to cart:', product);
                        }}
                        className="w-full text-white py-2.5 px-4 rounded-lg font-semibold text-xs uppercase tracking-wide transition-all duration-300 hover:shadow-md mt-3" style={{ backgroundColor: '#264171', marginTop: '12px' }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop Videos Section */}
      <section className="w-full py-10 bg-white">
        <div className="w-full px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">New Arrivals</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">🛋️ Shop the Vibe</h2>
            </div>
            <button className="text-sm font-bold text-gray-900 hover:opacity-70 transition-opacity">View All</button>
          </div>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 md:gap-6 min-w-max pb-2">
              {videoProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-[240px] md:w-[280px] flex-shrink-0 cursor-pointer"
                  style={{ minHeight: '330px', boxShadow: 'rgba(0,0,0,0.2) 0px 4px 8px', borderRadius: '8px' }}
                  onClick={() => { const idx = videoProducts.findIndex(p => p.id === product.id); goToLookVideo(idx); }}
                >
                  <div className="bg-white rounded-lg overflow-hidden h-full flex flex-col">
                    {/* Video */}
                    <div className="relative w-full h-[360px] md:h-[440px]">
                      <div className="w-full h-full" style={{ backgroundColor: 'rgb(242,242,242)', borderRadius: '8px 8px 0 0' }}>
                        <video
                          src={product.video}
                          className="w-full h-full object-cover"
                          style={{ borderRadius: '8px 8px 0 0', pointerEvents: 'none' }}
                          loop
                          muted
                          autoPlay
                          playsInline
                          preload="none"
                        />
                      </div>
                      {/* Views — bottom left */}
                      <div
                        className="absolute bottom-[10px] left-[10px] text-white text-sm font-medium px-2 py-1 rounded"
                        style={{ background: 'rgba(255,255,255,0.2)' }}
                      >
                        {product.views} Views
                      </div>
                      {/* Like + Share — bottom right */}
                      <div className="absolute bottom-[10px] right-[10px] flex items-center gap-3">
                        <div className="flex items-center justify-center">
                          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" stroke="#fff" strokeWidth="1"
                            style={{ transform: 'scale(1.3)', filter: 'drop-shadow(0 0 0.4rem rgba(0,0,0,0.5))' }}>
                            <path d="M10.3128 2.31787C9.11857 2.31787 8.07301 2.8314 7.42127 3.69942C6.76953 2.8314 5.72396 2.31787 4.52978 2.31787C3.57919 2.31894 2.66784 2.69704 1.99567 3.36921C1.3235 4.04138 0.945407 4.95272 0.944336 5.90331C0.944336 9.9514 6.94648 13.228 7.20209 13.3634C7.26946 13.3996 7.34477 13.4186 7.42127 13.4186C7.49777 13.4186 7.57307 13.3996 7.64044 13.3634C7.89605 13.228 13.8982 9.9514 13.8982 5.90331C13.8971 4.95272 13.519 4.04138 12.8469 3.36921C12.1747 2.69704 11.2633 2.31894 10.3128 2.31787ZM7.42127 12.4265C6.3653 11.8112 1.86961 9.00819 1.86961 5.90331C1.87053 5.19808 2.15109 4.52199 2.64977 4.02331C3.14845 3.52463 3.82454 3.24406 4.52978 3.24315C5.65457 3.24315 6.59893 3.84226 6.99333 4.80455C7.02818 4.8894 7.08748 4.96198 7.16367 5.01305C7.23987 5.06413 7.32953 5.0914 7.42127 5.0914C7.513 5.0914 7.60266 5.06413 7.67886 5.01305C7.75506 4.96198 7.81435 4.8894 7.84921 4.80455C8.24361 3.84053 9.18797 3.24315 10.3128 3.24315C11.018 3.24406 11.6941 3.52463 12.1928 4.02331C12.6914 4.52199 12.972 5.19808 12.9729 5.90331C12.9729 9.00357 8.47608 11.8106 7.42127 12.4265Z" fill="white"/>
                          </svg>
                        </div>
                        <div className="flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1"
                            style={{ transform: 'scale(1.3)', filter: 'drop-shadow(0 0 0.4rem rgba(0,0,0,0.5))' }}>
                            <path d="M14.0074 2.12578C13.8911 2.0095 13.7458 1.92634 13.5866 1.88487C13.4274 1.8434 13.2601 1.84511 13.1018 1.88983H13.0931L1.99328 5.25784C1.81259 5.3098 1.65202 5.41557 1.53295 5.56107C1.41388 5.70656 1.34196 5.88488 1.32676 6.07228C1.31156 6.25967 1.35381 6.44725 1.44788 6.61003C1.54195 6.77281 1.68338 6.90308 1.85333 6.98348L6.80471 9.32847L9.14971 14.2799C9.22374 14.4384 9.3416 14.5725 9.48936 14.6663C9.63712 14.76 9.80862 14.8095 9.98361 14.809C10.0102 14.809 10.0368 14.8078 10.0634 14.8055C10.2501 14.7904 10.4278 14.7185 10.5725 14.5996C10.7172 14.4806 10.8221 14.3202 10.873 14.1399L14.2387 3.04007C14.2387 3.03717 14.2387 3.03428 14.2387 3.03139C14.284 2.87349 14.2865 2.70638 14.2458 2.54723C14.2052 2.38807 14.1229 2.24261 14.0074 2.12578ZM9.98882 13.875L9.98592 13.8831L7.70975 9.07807L10.4416 6.34561C10.5247 6.25815 10.5704 6.14168 10.5688 6.02104C10.5673 5.9004 10.5187 5.78514 10.4334 5.69983C10.348 5.61452 10.2328 5.56591 10.1121 5.56436C9.9915 5.56282 9.87504 5.60846 9.78757 5.69156L7.05511 8.42344L2.24946 6.14726H2.25756L13.3528 2.78041L9.98882 13.875Z" fill="white"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden" style={{ borderRadius: '2rem' }}>
                          <img src={product.image} alt={product.title} className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32"%3E%3Crect width="32" height="32" fill="%23f2f2f2"/%3E%3C/svg%3E'; }}/>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-black text-[13px] mb-1 line-clamp-2">{product.title}</div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {product.currentPrice && (
                              <span className="text-black font-semibold">Rs. {product.currentPrice.toLocaleString('en-IN')}.00</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-full text-white py-2.5 px-4 rounded-lg font-semibold text-xs uppercase tracking-wide transition-all duration-300 hover:shadow-md mt-3" style={{ backgroundColor: '#41543F' }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Instagram Profile Section */}
      <section className="w-full py-6 md:py-10 bg-white">
        <div className="w-full px-4">

          {/* ── DESKTOP layout (md+): left | center | right ── */}
          <div className="hidden md:grid grid-cols-3 items-center gap-16">

            {/* LEFT: Avatar */}
            <div className="flex justify-center">
              <div className="rounded-full p-[3px]" style={{ background: 'linear-gradient(45deg, #f9a825, #f06292, #ab47bc)' }}>
                <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center flex-col gap-1" style={{ backgroundColor: '#41543F' }}>
                  <svg width="56" height="56" viewBox="0 0 100 80" fill="none">
                    {/* Top-left diamond */}
                    <rect x="10" y="5" width="30" height="30" rx="3" transform="rotate(45 25 20)" fill="none" stroke="white" strokeWidth="3"/>
                    {/* Top-right diamond */}
                    <rect x="45" y="5" width="30" height="30" rx="3" transform="rotate(45 60 20)" fill="none" stroke="white" strokeWidth="3"/>
                    {/* Bottom-left diamond */}
                    <rect x="10" y="40" width="30" height="30" rx="3" transform="rotate(45 25 55)" fill="none" stroke="white" strokeWidth="3"/>
                    {/* Bottom-right diamond */}
                    <rect x="45" y="40" width="30" height="30" rx="3" transform="rotate(45 60 55)" fill="none" stroke="white" strokeWidth="3"/>
                    {/* Center connecting lines */}
                    <line x1="25" y1="37" x2="60" y2="37" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="42" y1="20" x2="42" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span style={{ color: 'white', fontSize: '9px', fontWeight: 600, letterSpacing: '1px', fontStyle: 'italic' }}>vibecrafts</span>
                </div>
              </div>
            </div>

            {/* CENTER: username + stats */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/vibecrafts_official/" target="_blank" rel="noopener noreferrer"
                  className="text-gray-900 font-semibold text-xl hover:opacity-70 transition-opacity">
                  vibecrafts_official
                </a>
                <span className="text-gray-400 text-base tracking-widest">···</span>
              </div>
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-base">2,166</p>
                  <p className="text-gray-400 text-sm">posts</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-base">95.1K</p>
                  <p className="text-gray-400 text-sm">followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-base">1</p>
                  <p className="text-gray-400 text-sm">following</p>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <a href="https://www.instagram.com/vibecrafts_official/" target="_blank" rel="noopener noreferrer"
                  className="px-8 py-1.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: '#4f6ef7' }}>
                  Follow
                </a>
                <a href="https://www.instagram.com/vibecrafts_official/" target="_blank" rel="noopener noreferrer"
                  className="px-6 py-1.5 rounded-lg text-sm font-semibold text-white hover:opacity-80 transition-opacity" style={{ backgroundColor: '#363636' }}>
                  Message
                </a>
                <button className="w-9 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#363636' }}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-3h-1.26c-.19-.73-.49-1.42-.87-2.05l.89-.89a1 1 0 0 0 0-1.41l-2.41-2.41a1 1 0 0 0-1.41 0l-.89.89A8.007 8.007 0 0 0 16 2.26V1a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1.26c-.73.19-1.42.49-2.05.87l-.89-.89a1 1 0 0 0-1.41 0L5.24 4.65a1 1 0 0 0 0 1.41l.89.89A8.007 8.007 0 0 0 5.26 9H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1.26c.19.73.49 1.42.87 2.05l-.89.89a1 1 0 0 0 0 1.41l2.41 2.41a1 1 0 0 0 1.41 0l.89-.89c.63.38 1.32.68 2.05.87V22a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1.26c.73-.19 1.42-.49 2.05-.87l.89.89a1 1 0 0 0 1.41 0l2.41-2.41a1 1 0 0 0 0-1.41l-.89-.89c.38-.63.68-1.32.87-2.05H22a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* RIGHT: bio */}
            <div className="space-y-1">
              <p className="text-gray-900 text-sm font-semibold">VibeCrafts</p>
              <p className="text-gray-400 text-sm">Home decor</p>
              <p className="text-gray-800 text-sm">Most Reliable Brand in Premium Home Decor &amp; Furniture products.</p>
              <p className="text-gray-800 text-sm">1 Million+ Trusted customers across the Nation.</p>
              <p className="text-gray-800 text-sm">Visit and experience the Home Decor.</p>
              <a href="https://www.vibecrafts.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium" style={{ color: '#4f6ef7' }}>www.vibecrafts.com</a>
            </div>
          </div>

          {/* ── MOBILE layout: exact Instagram app style ── */}
          <div className="flex flex-col md:hidden gap-3">
            {/* Row 1: avatar + stats side by side */}
            <div className="flex flex-row items-center gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="rounded-full p-[3px]" style={{ background: 'linear-gradient(45deg, #f9a825, #f06292, #ab47bc)' }}>
                  <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#41543F' }}>
                    <svg width="44" height="44" viewBox="0 0 80 80" fill="none">
                      <rect x="20" y="20" width="40" height="40" rx="4" stroke="white" strokeWidth="3" transform="rotate(45 40 40)"/>
                      <rect x="28" y="28" width="24" height="24" rx="3" stroke="white" strokeWidth="2.5" transform="rotate(45 40 40)"/>
                      <rect x="34" y="34" width="12" height="12" rx="2" stroke="white" strokeWidth="2" transform="rotate(45 40 40)"/>
                      <line x1="40" y1="8" x2="40" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                      <line x1="40" y1="60" x2="40" y2="72" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                      <line x1="8" y1="40" x2="20" y2="40" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                      <line x1="60" y1="40" x2="72" y2="40" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              {/* Stats row */}
              <div className="flex flex-1 justify-around">
                <div className="text-center">
                  <p className="font-semibold text-gray-900 text-base">2,166</p>
                  <p className="text-gray-400 text-xs">posts</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 text-base">95.1K</p>
                  <p className="text-gray-400 text-xs">followers</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 text-base">1</p>
                  <p className="text-gray-400 text-xs">following</p>
                </div>
              </div>
            </div>

            {/* Bio block */}
            <div className="space-y-0.5">
              <p className="text-gray-900 text-sm font-semibold">VibeCrafts</p>
              <p className="text-gray-400 text-xs">Home decor</p>
              <p className="text-gray-800 text-sm">Most Reliable Brand in Premium Home Decor &amp; Furniture products.</p>
              <p className="text-gray-800 text-sm">1 Million+ Trusted customers across the Nation.</p>
              <a href="https://www.vibecrafts.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium" style={{ color: '#4f6ef7' }}>www.vibecrafts.com</a>
            </div>

            {/* Buttons — full width like Instagram */}
            <div className="flex gap-2">
              <a href="https://www.instagram.com/vibecrafts_official/" target="_blank" rel="noopener noreferrer"
                className="flex-1 py-1.5 rounded-lg text-sm font-semibold text-white text-center" style={{ backgroundColor: '#4f6ef7' }}>
                Follow
              </a>
              <a href="https://www.instagram.com/vibecrafts_official/" target="_blank" rel="noopener noreferrer"
                className="flex-1 py-1.5 rounded-lg text-sm font-semibold text-white text-center" style={{ backgroundColor: '#363636' }}>
                Message
              </a>
              <button className="w-9 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#363636' }}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-3h-1.26c-.19-.73-.49-1.42-.87-2.05l.89-.89a1 1 0 0 0 0-1.41l-2.41-2.41a1 1 0 0 0-1.41 0l-.89.89A8.007 8.007 0 0 0 16 2.26V1a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1.26c-.73.19-1.42.49-2.05.87l-.89-.89a1 1 0 0 0-1.41 0L5.24 4.65a1 1 0 0 0 0 1.41l.89.89A8.007 8.007 0 0 0 5.26 9H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1.26c.19.73.49 1.42.87 2.05l-.89.89a1 1 0 0 0 0 1.41l2.41 2.41a1 1 0 0 0 1.41 0l.89-.89c.63.38 1.32.68 2.05.87V22a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1.26c.73-.19 1.42-.49 2.05-.87l.89.89a1 1 0 0 0 1.41 0l2.41-2.41a1 1 0 0 0 0-1.41l-.89-.89c.38-.63.68-1.32.87-2.05H22a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Instagram Reels Carousel Section */}
      <section className="w-full py-8 md:py-12 bg-white overflow-hidden">
        <div className="w-full">
          <div 
            ref={instagramCarouselRef}
            className="overflow-x-auto scrollbar-hide" 
            style={{ scrollBehavior: 'auto', overflowX: 'auto' }}
          >
            <div className="flex gap-8 md:gap-10 px-4 md:px-6" style={{ width: 'max-content' }}>
              {instagramPosts.map((url, index) => (
                <div
                  key={`instagram-reel-${index}`}
                  className="flex-shrink-0"
                  style={{ width: '300px', minWidth: '300px' }}
                >
                  <blockquote 
                    className="instagram-media" 
                    data-instgrm-permalink={url}
                    data-instgrm-version="14"
                    style={{ 
                      background: '#FFF', 
                      border: '0', 
                      borderRadius: '3px', 
                      boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                      margin: '1px',
                      maxWidth: '100%',
                      minWidth: '300px',
                      padding: '0',
                      width: '100%'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Modal card — centered, constrained */}
          <div
            className="relative flex w-full h-full md:h-auto md:max-h-[85vh] md:max-w-3xl md:rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* VIDEO PANEL */}
            <div className="relative bg-black w-full md:w-[55%] flex-shrink-0" style={{ aspectRatio: undefined }}>
              <video
                key={`video-${selectedVideo.id}`}
                ref={modalVideoRef}
                src={selectedVideo.video}
                className="w-full h-full object-cover"
                style={{ maxHeight: '85vh' }}
                autoPlay
                playsInline
                loop
                muted={videoMuted}
              />

              {/* Title — top left */}
              <div className="absolute top-4 left-4 text-white text-sm font-medium drop-shadow">
                {selectedVideo.title}
              </div>

              {/* Controls — top right */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); const m = !videoMuted; setVideoMuted(m); if (modalVideoRef.current) modalVideoRef.current.muted = m; }}
                  className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white"
                >
                  {videoMuted ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                      <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                  )}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); if (navigator.share) navigator.share({ title: selectedVideo.title, url: window.location.href }); }}
                  className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </button>
              </div>

              {/* Mobile — product bottom sheet */}
              <div className="absolute bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-6 pt-10">
                <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                  {videoProducts.slice(0, 3).map((p) => (
                    <div key={p.id} className="flex-shrink-0 flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-3 py-2 min-w-[180px]">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-700">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none'; }}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium line-clamp-1">{p.title}</p>
                        <p className="text-yellow-300 text-sm font-bold">₹{p.currentPrice?.toLocaleString('en-IN')}</p>
                        <button className="mt-1 px-3 py-0.5 rounded text-xs font-bold text-gray-900 bg-[#FFD700]">
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PRODUCT PANEL — desktop only */}
            <div className="hidden md:flex flex-col bg-[#111] w-[45%] overflow-y-auto">
              <div className="flex justify-end p-3">
                <button onClick={() => setSelectedVideo(null)} className="text-white/70 hover:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-3 px-4 pb-6">
                {videoProducts.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 bg-[#1e1e1e] rounded-xl p-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-800">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium line-clamp-2 mb-1">{p.title}</p>
                      <p className="text-white text-sm font-bold">₹{p.currentPrice?.toLocaleString('en-IN')}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); }}
                        className="mt-1.5 px-3 py-1 rounded text-xs font-bold text-gray-900 bg-[#FFD700] hover:opacity-90 transition-opacity"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Close button — mobile top right */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="md:hidden absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white z-10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* SHOP THE LOOK — Creative Reels Modal */}
      {selectedLookVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: '#000' }}
          onTouchStart={(e) => { lookTouchStartY.current = e.touches[0].clientY; }}
          onTouchEnd={(e) => {
            if (lookTouchStartY.current === null) return;
            const diff = lookTouchStartY.current - e.changedTouches[0].clientY;
            lookTouchStartY.current = null;
            if (Math.abs(diff) < 50) return;
            const now = Date.now();
            if (now - lookLastSwitchTime.current < 400) return;
            lookLastSwitchTime.current = now;
            const cur = lookVideoIndexRef.current;
            const next = diff > 0
              ? Math.min(cur + 1, videoProducts.length - 1)
              : Math.max(cur - 1, 0);
            if (next !== cur) goToLookVideo(next);
          }}
          onWheel={(e) => {
            e.preventDefault();
            const now = Date.now();
            if (now - lookLastSwitchTime.current < 400) return;
            lookLastSwitchTime.current = now;
            const cur = lookVideoIndexRef.current;
            const next = e.deltaY > 0
              ? Math.min(cur + 1, videoProducts.length - 1)
              : Math.max(cur - 1, 0);
            if (next !== cur) goToLookVideo(next);
          }}
        >
          <div
            className="relative w-full md:w-[400px] md:rounded-3xl overflow-hidden shadow-2xl"
            style={{ height: '100dvh', maxHeight: '100dvh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video full-height */}
            <video
              ref={lookModalVideoRef}
              key={`look-${selectedLookVideo.id}`}
              src={selectedLookVideo.video}
              className="w-full h-full object-cover"
              style={{ display: 'block' }}
              autoPlay
              loop
              playsInline
              muted={lookVideoMuted}
            />

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-5 pb-2"
              style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <img src={selectedLookVideo.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none">sotrue.beauty</p>
                  <p className="text-white/70 text-xs mt-0.5">{selectedLookVideo.views} views</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLookVideo(null)}
                className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Video index dots */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 flex gap-1 z-10">
              {videoProducts.map((_, i) => (
                <div key={i} className="rounded-full transition-all" style={{ width: i === lookVideoIndex ? '16px' : '6px', height: '6px', background: i === lookVideoIndex ? '#fff' : 'rgba(255,255,255,0.4)' }} />
              ))}
            </div>

            {/* Right side action buttons */}
            <div className="absolute right-3 bottom-44 flex flex-col items-center gap-5">
              {/* Like */}
              <button
                onClick={() => setLookLiked(l => !l)}
                className="flex flex-col items-center gap-1"
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center ${lookLiked ? 'bg-pink-500' : 'bg-black/40'}`}>
                  <svg viewBox="0 0 24 24" fill={lookLiked ? 'white' : 'none'} stroke="white" strokeWidth="2" className="w-5 h-5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <span className="text-white text-xs font-medium">{lookLiked ? 'Liked' : 'Like'}</span>
              </button>

              {/* Mute */}
              <button
                onClick={() => { const m = !lookVideoMuted; setLookVideoMuted(m); if (lookModalVideoRef.current) lookModalVideoRef.current.muted = m; }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center">
                  {lookVideoMuted ? (
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
                <span className="text-white text-xs font-medium">{lookVideoMuted ? 'Unmute' : 'Mute'}</span>
              </button>

              {/* Share */}
              <button
                onClick={() => navigator.share ? navigator.share({ title: selectedLookVideo.title, text: `Check out ${selectedLookVideo.title} from SoTrue Beauty!`, url: window.location.href }) : navigator.clipboard?.writeText(window.location.href)}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </div>
                <span className="text-white text-xs font-medium">Share</span>
              </button>
            </div>

            {/* Bottom product card */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-16"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 60%, transparent)' }}>
              <p className="text-white text-base font-semibold mb-1 line-clamp-1">{selectedLookVideo.title}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white text-xl font-bold">₹{selectedLookVideo.currentPrice?.toLocaleString('en-IN')}</span>
                <span className="text-white/50 line-through text-sm">₹{selectedLookVideo.originalPrice?.toLocaleString('en-IN')}</span>
                <span className="bg-[#A71499] text-white text-xs font-bold px-2 py-0.5 rounded-full">{selectedLookVideo.discount}% OFF</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-3 rounded-2xl text-sm font-bold text-white border border-white/40"
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
                >
                  Wishlist
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-3 rounded-2xl text-sm font-bold text-white"
                  style={{ background: '#A71499' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Floating Instagram Button */}
      <button
        className="fixed bottom-5 left-5 w-12 h-12 md:w-auto md:h-auto md:px-5 md:py-3 rounded-full flex items-center justify-center md:gap-2.5 text-sm font-semibold text-white cursor-pointer z-30 transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
          boxShadow: '0 4px 15px rgba(188, 24, 136, 0.4)'
        }}
        onClick={() => setShowInstagramModal(true)}
        aria-label="See Our Instagram"
      >
        <svg className="w-5 h-5 md:w-5 md:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
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

      <ShopifyFooter brandName={BRAND_NAME} />
      <AIBrandEngine />
      <ActivityBanner />
    </div>
  );
};

export default HomePage;

