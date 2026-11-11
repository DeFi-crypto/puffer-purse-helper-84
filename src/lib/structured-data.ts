import {
  SITE_URL, COMPANY_NAME, LEGAL_NAME, PRODUCT_NAME, CONTACT_EMAIL, LOGO_PATH, OG_IMAGE_PATH,
  COMPANY_PROFILES, FOUNDER, hasFounder, absoluteUrl, getPageMeta,
} from './site';
import { FAQ_ITEMS } from './faq';

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const PRODUCT_ID = `${SITE_URL}/#product`;
const PERSON_ID = `${SITE_URL}/founder#person`;

const organization = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: COMPANY_NAME,
  legalName: LEGAL_NAME,
  alternateName: PRODUCT_NAME,
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}${LOGO_PATH}` },
  image: `${SITE_URL}${OG_IMAGE_PATH}`,
  description:
    'Minny Apparel is a Minneapolis apparel startup from the University of Minnesota. It makes Minny, a patent-pending purse that unfolds into a down puffer jacket.',
  email: CONTACT_EMAIL,
  foundingLocation: { '@type': 'Place', name: 'Minneapolis, Minnesota, United States' },
  address: { '@type': 'PostalAddress', addressLocality: 'Minneapolis', addressRegion: 'MN', addressCountry: 'US' },
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: CONTACT_EMAIL },
  sameAs: COMPANY_PROFILES,
  ...(hasFounder() ? { founder: { '@id': PERSON_ID } } : {}),
});

const person = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: FOUNDER.name,
  jobTitle: FOUNDER.jobTitle,
  url: absoluteUrl('/founder'),
  worksFor: { '@id': ORG_ID },
  ...(FOUNDER.bio.length ? { description: FOUNDER.bio.join(' ') } : {}),
  ...(FOUNDER.image ? { image: `${SITE_URL}${FOUNDER.image}` } : {}),
  ...(FOUNDER.alumniOf ? { alumniOf: { '@type': 'CollegeOrUniversity', name: FOUNDER.alumniOf } } : {}),
  ...(FOUNDER.profiles.length ? { sameAs: FOUNDER.profiles } : {}),
});

const website = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/`,
  name: COMPANY_NAME,
  alternateName: PRODUCT_NAME,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-US',
});

const product = (priceCents: number) => ({
  '@type': 'Product',
  '@id': PRODUCT_ID,
  name: 'Minny Convertible Purse-to-Puffer Jacket',
  description:
    'A purse that unfolds into a down-and-feather puffer jacket in under 30 seconds, and folds back into a purse when you get inside. Patent pending.',
  image: [`${SITE_URL}${OG_IMAGE_PATH}`, `${SITE_URL}/lovable-uploads/MinnyCoatPurse.png`],
  category: 'Apparel & Accessories > Clothing > Outerwear > Coats & Jackets',
  brand: { '@type': 'Brand', name: PRODUCT_NAME },
  manufacturer: { '@id': ORG_ID },
  offers: {
    '@type': 'Offer',
    url: `${SITE_URL}/`,
    price: (priceCents / 100).toFixed(2),
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder',
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@id': ORG_ID },
    eligibleRegion: { '@type': 'Country', name: 'US' },
  },
});

const faqPage = () => ({
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: FAQ_ITEMS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

/** The JSON-LD graph for one page, or null for pages that should carry none. */
export const buildStructuredData = (path: string, priceCents: number): object | null => {
  const meta = getPageMeta(path);
  if (!meta.index) return null;

  const webPage = (type: string, extra: object = {}) => ({
    '@type': type,
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': SITE_ID },
    inLanguage: 'en-US',
    ...extra,
  });

  const graph: object[] = [organization(), website()];
  if (hasFounder()) graph.push(person());

  if (path === '/') graph.push(webPage('WebPage', { about: { '@id': PRODUCT_ID } }), product(priceCents), faqPage());
  else if (path === '/about') graph.push(webPage('AboutPage', { mainEntity: { '@id': ORG_ID } }));
  else if (path === '/founder') graph.push(webPage('ProfilePage', { mainEntity: { '@id': PERSON_ID } }));
  else graph.push(webPage('WebPage'));

  return { '@context': 'https://schema.org', '@graph': graph };
};
