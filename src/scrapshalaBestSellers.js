/** Ajnaa Jewels — best sellers (Kartmax product imagery) */

/** LE-108 — PDP display set (600×900, quality 6) */
export const LE108_PDP_GALLERY_IMAGES = [
  'https://pictures.kartmax.in/cover/live/600x900/quality=6/sites/2PJTceF68A15QtTG2Czy/product-images/LE-108_2.jpg',
  'https://pictures.kartmax.in/cover/live/600x900/quality=6/sites/2PJTceF68A15QtTG2Czy/product-images/LE-108_3.jpg',
  'https://pictures.kartmax.in/cover/live/600x900/quality=6/sites/2PJTceF68A15QtTG2Czy/product-images/LE-108_1.jpg',
];

export const AJNAA_PRODUCT_IMAGES = [
  /** Homepage first card + shared LE-108 thumb — matches PDP gallery[0] */
  LE108_PDP_GALLERY_IMAGES[0],
  'https://pictures.kartmax.in/live/300x458/cover/quality=9/sites/2PJTceF68A15QtTG2Czy/product-images/LE139_3.jpg',
  'https://pictures.kartmax.in/live/300x458/cover/quality=9/sites/2PJTceF68A15QtTG2Czy/product-images/LE170_2.jpg',
  'https://pictures.kartmax.in/live/300x458/cover/quality=9/sites/2PJTceF68A15QtTG2Czy/product-images/LE184_1.jpg',
  'https://pictures.kartmax.in/live/300x458/cover/quality=9/sites/2PJTceF68A15QtTG2Czy/product-images/LE-40.jpg',
  'https://pictures.kartmax.in/live/300x458/cover/quality=9/sites/2PJTceF68A15QtTG2Czy/product-images/LE-81.jpg',
];

export const bestSellerProducts = [
  {
    id: 1,
    image: AJNAA_PRODUCT_IMAGES[0],
    galleryImages: LE108_PDP_GALLERY_IMAGES,
    title: 'Kundan Pearl Choker with Green Bead Drops',
    currentPrice: 8900,
    originalPrice: 14800,
    rating: 4.8,
    reviewCount: 124,
    badge: 'Sale',
  },
  {
    id: 2,
    image: AJNAA_PRODUCT_IMAGES[1],
    title: 'Traditional Jhumka with Pearl Sahara Chain',
    currentPrice: 6500,
    originalPrice: 10800,
    rating: 4.7,
    reviewCount: 98,
    badge: 'Sale',
  },
  {
    id: 3,
    image: AJNAA_PRODUCT_IMAGES[2],
    title: 'Multi-Strand Pearl Kundan Choker Necklace',
    currentPrice: 12400,
    originalPrice: 18600,
    rating: 4.9,
    reviewCount: 156,
    badge: 'Sale',
  },
  {
    id: 4,
    image: AJNAA_PRODUCT_IMAGES[3],
    title: 'Plain Kundan Long Drop Earrings',
    currentPrice: 3900,
    originalPrice: 6500,
    rating: 4.6,
    reviewCount: 203,
    badge: 'Sale',
  },
  {
    id: 5,
    image: AJNAA_PRODUCT_IMAGES[4],
    title: 'Meenakari Kundan Necklace with Gem Drops',
    currentPrice: 15200,
    originalPrice: 22800,
    rating: 4.8,
    reviewCount: 87,
    badge: 'Sale',
  },
  {
    id: 6,
    image: AJNAA_PRODUCT_IMAGES[5],
    title: 'Pearl Kundan Maang Tikka with Emerald',
    currentPrice: 4200,
    originalPrice: 7000,
    rating: 4.5,
    reviewCount: 72,
    badge: 'Sale',
  },
];
