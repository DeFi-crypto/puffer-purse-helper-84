// Keeps the price in the page HTML current without a redeploy.
//
// The build bakes the price it read at build time into every page (scripts/prerender-plugin.ts).
// The price is changed often in the Mailer dashboard (Settings → Store), and crawlers and AI
// agents read the HTML without running scripts, so this swaps the baked price for the live one
// on every page request. If anything here fails, the page is served exactly as built.

// Public values, the same ones shipped in the site's JavaScript (.env).
const SUPABASE_URL = 'https://tfuuelkswultbitktyhb.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmdXVlbGtzd3VsdGJpdGt0eWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNDczMTIsImV4cCI6MjA1NzgyMzMxMn0.VeezgonxZxfNoubTujRU_fBziq0ENKVQdIgRconYlYY';

const TTL_MS = 30_000; // how long one edge node reuses the price it last read
let cache: { cents: number; at: number } | null = null;

const valid = (n: unknown): n is number =>
  typeof n === 'number' && Number.isInteger(n) && n >= 100 && n <= 1000000;

const dollars = (cents: number) => (cents / 100).toFixed(2);

async function livePriceCents(): Promise<number | null> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.cents;
  const env = (globalThis as { Netlify?: { env?: { get(name: string): string | undefined } } }).Netlify?.env;
  const url = env?.get('VITE_SUPABASE_URL') || SUPABASE_URL;
  const key = env?.get('VITE_SUPABASE_PUBLISHABLE_KEY') || SUPABASE_KEY;
  if (!url || !key) return null;
  const res = await fetch(`${url}/rest/v1/store_settings?id=eq.1&select=price_cents`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    signal: AbortSignal.timeout(1500),
  });
  if (!res.ok) return cache?.cents ?? null;
  const cents = (await res.json())?.[0]?.price_cents;
  if (!valid(cents)) return cache?.cents ?? null;
  cache = { cents, at: Date.now() };
  return cents;
}

/** Swap the price baked into a prerendered page for `cents`. */
export function rewriteHtml(html: string, cents: number): string {
  const baked = Number(html.match(/window\.__MINNY_PRICE_CENTS__=(\d+)/)?.[1]);
  if (!valid(baked) || baked === cents) return html;
  return html
    .replaceAll(`window.__MINNY_PRICE_CENTS__=${baked}`, () => `window.__MINNY_PRICE_CENTS__=${cents}`)
    .replaceAll(`"price":"${dollars(baked)}"`, () => `"price":"${dollars(cents)}"`)
    .replaceAll(`$${dollars(baked)}`, () => `$${dollars(cents)}`);
}

/** Swap the price line in llms.txt for `cents`. */
export function rewriteLlms(text: string, cents: number): string {
  return text.replace(/^(- Price: )\$\d+\.\d\d/m, (_, label) => `${label}$${dollars(cents)}`);
}

export default async (request: Request, context: { next: (req?: Request) => Promise<Response> }) => {
  if (request.method !== 'GET') return context.next();

  // Ask for the full page every time: a "not modified" answer would leave a stale price in place.
  const headers = new Headers(request.headers);
  headers.delete('if-none-match');
  headers.delete('if-modified-since');
  const response = await context.next(new Request(request, { headers }));

  try {
    const type = response.headers.get('content-type') ?? '';
    const isHtml = type.includes('text/html');
    const isLlms = new URL(request.url).pathname === '/llms.txt';
    if (response.status !== 200 || (!isHtml && !isLlms)) return response;

    const [body, cents] = await Promise.all([response.clone().text(), livePriceCents()]);
    if (cents == null) return response;

    const out = new Headers(response.headers);
    out.delete('content-length');
    out.delete('etag');
    out.delete('last-modified');
    out.set('cache-control', 'public, max-age=0, must-revalidate');
    return new Response(isHtml ? rewriteHtml(body, cents) : rewriteLlms(body, cents), {
      status: response.status,
      headers: out,
    });
  } catch (error) {
    console.error('live-price: serving the page as built', error);
    return response;
  }
};

export const config = {
  path: '/*',
  excludedPath: ['/assets/*', '/media/*', '/lovable-uploads/*', '/fonts/*', '/*.png', '/*.ico', '/*.svg', '/*.xml', '/robots.txt'],
  onError: 'bypass',
};
