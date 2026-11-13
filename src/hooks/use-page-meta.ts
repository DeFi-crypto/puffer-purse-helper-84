import { useEffect } from 'react';
import { absoluteUrl, getPageMeta, NOT_FOUND_META } from '@/lib/site';

const setAttr = (selector: string, attr: string, value: string) => {
  document.head.querySelector(selector)?.setAttribute(attr, value);
};

/**
 * Keeps the title, description, canonical and robots tags right when moving between pages
 * in the browser. The same values are baked into each page's HTML at build time.
 */
export const usePageMeta = (path: string | null) => {
  useEffect(() => {
    const meta = path === null ? NOT_FOUND_META : getPageMeta(path);
    document.title = meta.title;
    setAttr('meta[name="description"]', 'content', meta.description);
    setAttr('meta[name="robots"]', 'content', meta.index ? 'index, follow, max-image-preview:large' : 'noindex, follow');
    if (path !== null) {
      setAttr('link[rel="canonical"]', 'href', absoluteUrl(meta.path));
      setAttr('meta[property="og:url"]', 'content', absoluteUrl(meta.path));
    }
    setAttr('meta[property="og:title"]', 'content', meta.title);
    setAttr('meta[property="og:description"]', 'content', meta.description);
    setAttr('meta[name="twitter:title"]', 'content', meta.title);
    setAttr('meta[name="twitter:description"]', 'content', meta.description);
  }, [path]);
};
