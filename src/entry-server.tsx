// Build-time only. The prerender plugin (scripts/prerender-plugin.ts) builds this file for Node
// and uses it to write real HTML for every page, so crawlers don't get an empty <body>.
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_PRICE_CENTS } from '@/hooks/use-price';
import { AppRoutes } from './App';

export { PAGES, NOT_FOUND_META, SITE_URL, absoluteUrl } from '@/lib/site';
export { buildStructuredData } from '@/lib/structured-data';

export const render = (path: string): string =>
  renderToString(
    <QueryClientProvider client={new QueryClient()}>
      <TooltipProvider>
        <StaticRouter location={path}>
          <AppRoutes />
        </StaticRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );

/** The live pre-order price for the Product markup; falls back to the default if unreachable. */
export const getPriceCents = async (): Promise<number> => {
  try {
    const query = // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase as any).from('store_settings').select('price_cents').eq('id', 1).maybeSingle();
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000));
    const res = await Promise.race([query, timeout]);
    const cents = res?.data?.price_cents;
    return Number.isInteger(cents) && cents >= 100 && cents <= 1000000 ? cents : DEFAULT_PRICE_CENTS;
  } catch {
    return DEFAULT_PRICE_CENTS;
  }
};
