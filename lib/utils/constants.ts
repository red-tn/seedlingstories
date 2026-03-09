export const SITE_NAME = 'Seedling Stories';
export const SITE_TAGLINE = 'Planting God\'s Word in Little Hearts';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://seedlingstories.co';
export const ETSY_SHOP_URL = process.env.NEXT_PUBLIC_ETSY_SHOP_URL || 'https://etsy.com/shop/SeedlingStoriesCo';
export const GUMROAD_URL = process.env.NEXT_PUBLIC_GUMROAD_URL || 'https://seedlingstories.gumroad.com';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Packs', href: '/packs' },
  { label: 'Free Pack', href: '/free' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Parents', href: '/parents' },
  { label: 'Contact', href: '/contact' },
];

export const PACK_INCLUDES_ICONS: Record<string, string> = {
  'story-pages': '/images/icon-read.png',
  'coloring-pages': '/images/icon-download.png',
  'audio-narration': '/images/icon-listen.png',
  'worship-song': '/images/icon-listen.png',
  'animated-video': '/images/icon-qr-scan.png',
  'discussion-guide': '/images/icon-discuss.png',
  'memory-verse-card': '/images/icon-verse.png',
  'activity-sheets': '/images/icon-download-alt.png',
};
