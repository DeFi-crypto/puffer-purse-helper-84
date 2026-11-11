// Single source of truth for the brand name, the canonical domain and per-page SEO.
// The build (src/entry-server.tsx + prerender plugin) and the running app both read this.

export const SITE_URL = 'https://minnyapparel.com';

/** Company name: use this everywhere the business is named. "Minny" is the product/short name. */
export const COMPANY_NAME = 'Minny Apparel';
export const LEGAL_NAME = 'MinnyApparel Inc.';
export const PRODUCT_NAME = 'Minny';
export const CONTACT_EMAIL = 'contact@minnyapparel.com';
export const LOGO_PATH = '/lovable-uploads/9575f4c8-b4b8-46cc-9487-939b865fc223.png';
export const OG_IMAGE_PATH = '/minny-product-og.png';

/**
 * Every official profile. These go into the Organization's `sameAs` list, which is how Google
 * connects the site to the profiles. Add LinkedIn, Crunchbase, YouTube etc. here as they go live.
 */
export const COMPANY_PROFILES: string[] = [
  'https://www.instagram.com/minnyapparel/',
  'https://www.tiktok.com/@minnyapparel',
];

/**
 * Founder details. While `name` is empty, no founder page, founder section or Person markup is
 * published. Fill this in (exactly as the name appears on LinkedIn, the patent filing, etc.)
 * and the /founder page, the About-page sentence and the Person schema all switch on.
 */
export const FOUNDER = {
  name: 'Veeraj Chimanpure',
  jobTitle: 'Founder & CEO',
  /** Third-person bio, one or two short paragraphs. Use the same text on every profile. */
  bio: [
    'Chimanpure started Minny Apparel at the University of Minnesota in Minneapolis, to fix a problem every student there knows: needing a real winter coat on the walk to a night out, and having nowhere to put it once inside.',
  ] as string[],
  /** Path under /public. Use the same headshot on every profile. */
  image: '/media/veeraj-chimanpure.jpg',
  /** e.g. 'University of Minnesota'. Left empty until graduation status is confirmed. */
  alumniOf: '',
  /** Personal profiles: LinkedIn, X, Instagram, personal site. */
  profiles: ['https://www.linkedin.com/in/veeraj-chimanpure/'] as string[],
};

export const hasFounder = () => FOUNDER.name.trim().length > 0;

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** false = keep out of search results (and out of the sitemap). */
  index: boolean;
}

const HOME_DESCRIPTION =
  'Minny is the purse that unfolds into a real down puffer jacket in under 30 seconds. Skip the coat check at bars and concerts. Designed in Minneapolis by Minny Apparel, a University of Minnesota startup.';

export const PAGES: PageMeta[] = [
  {
    path: '/',
    title: 'Minny Apparel | The Purse That Transforms Into a Puffer Jacket',
    description: HOME_DESCRIPTION,
    index: true,
  },
  {
    path: '/about',
    title: 'About Minny Apparel | Convertible Purse-to-Puffer Jacket from Minneapolis',
    description:
      'Minny Apparel is a Minneapolis startup from the University of Minnesota. It makes Minny, a patent-pending purse that unfolds into a down puffer jacket.',
    index: true,
  },
  ...(hasFounder()
    ? [
        {
          path: '/founder',
          title: `${FOUNDER.name}, ${FOUNDER.jobTitle} of Minny Apparel`,
          description: `${FOUNDER.name} is the ${FOUNDER.jobTitle.replace('&', 'and')} of Minny Apparel, the Minneapolis startup behind the Minny convertible purse-to-puffer jacket.`,
          index: true,
        },
      ]
    : []),
  {
    path: '/terms',
    title: 'Pre-Order Terms | Minny Apparel',
    description: 'Terms for pre-ordering the Minny convertible purse-to-puffer jacket from Minny Apparel.',
    index: true,
  },
  {
    path: '/pre-order/success',
    title: 'Pre-Order Confirmed | Minny Apparel',
    description: 'Your Minny pre-order is confirmed.',
    index: false,
  },
  {
    path: '/unsubscribe',
    title: 'Unsubscribe | Minny Apparel',
    description: 'Unsubscribe from Minny Apparel emails.',
    index: false,
  },
];

export const NOT_FOUND_META: PageMeta = {
  path: '/404',
  title: 'Page Not Found | Minny Apparel',
  description: 'This page does not exist.',
  index: false,
};

export const getPageMeta = (path: string): PageMeta => {
  const clean = path.length > 1 ? path.replace(/\/+$/, '') : path;
  return PAGES.find((p) => p.path === clean) ?? NOT_FOUND_META;
};

export const absoluteUrl = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`;
