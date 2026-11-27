import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// The pre-order price is set in the Mailer dashboard (Settings → Store) and stored in the
// store_settings table. The checkout function charges the same number. DEFAULT_PRICE_CENTS is
// only the last resort, used if the price can't be read at build time or in the browser.
//
// The build reads the live price and bakes it into every page's HTML (scripts/prerender-plugin.ts),
// so crawlers and AI agents, which read the HTML without waiting for scripts, see the real price
// and visitors don't see it change after the page loads.
export const DEFAULT_PRICE_CENTS = 13999;
const CACHE_KEY = 'minny_price_cents';

declare global {
  interface Window {
    __MINNY_PRICE_CENTS__?: number;
  }
}

let serverPriceCents: number | null = null;

/** Build-time only: the price the prerender renders into the static HTML. */
export function setServerPriceCents(cents: number): void {
  if (valid(cents)) serverPriceCents = cents;
}

/** The price already in the page's HTML. The first render must match it exactly. */
function initial(): number {
  if (typeof window === 'undefined') return serverPriceCents ?? DEFAULT_PRICE_CENTS;
  const baked = window.__MINNY_PRICE_CENTS__;
  return valid(baked) ? baked : cached();
}

function valid(cents: unknown): cents is number {
  return typeof cents === 'number' && Number.isInteger(cents) && cents >= 100 && cents <= 1000000;
}

function cached(): number {
  try {
    const n = Number(sessionStorage.getItem(CACHE_KEY));
    return valid(n) ? n : DEFAULT_PRICE_CENTS;
  } catch {
    return DEFAULT_PRICE_CENTS;
  }
}

/** A sale set in the Mailer (Settings → Store → Sale): the regular price is shown crossed out with a % OFF badge. */
export type Sale = { compareAt: string; percentOff: number; label: string };

// Filled by the same request that reads the price. Never part of the prerendered HTML: the badge appears
// once the live row has been read, so the first render always matches the page as built.
let liveSale: Sale | null = null;

function readSale(row: { price_cents?: unknown; compare_at_cents?: unknown; sale_label?: unknown } | null): Sale | null {
  const price = row?.price_cents;
  const compareAt = row?.compare_at_cents;
  if (!valid(price) || !valid(compareAt) || compareAt <= price) return null;
  const percentOff = Math.round((1 - price / compareAt) * 100);
  if (percentOff < 1) return null;
  return { compareAt: formatPrice(compareAt), percentOff, label: typeof row?.sale_label === 'string' ? row.sale_label.trim() : '' };
}

let inflight: Promise<number | null> | null = null;

function fetchPrice(): Promise<number | null> {
  if (!inflight) {
    inflight = (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await (supabase as any)
          .from('store_settings')
          .select('*') // price_cents, plus compare_at_cents and sale_label when a sale is running
          .eq('id', 1)
          .maybeSingle();
        const cents = data?.price_cents;
        if (error || !valid(cents)) return null;
        liveSale = readSale(data);
        try {
          sessionStorage.setItem(CACHE_KEY, String(cents));
        } catch {
          // private mode: fine
        }
        return cents;
      } catch {
        return null;
      }
    })();
  }
  return inflight;
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/** The current pre-order price, formatted like "$139.99". */
export function usePrice(): string {
  const [cents, setCents] = useState<number>(initial);

  useEffect(() => {
    let alive = true;
    fetchPrice().then((live) => {
      if (alive && live != null) setCents(live);
    });
    return () => {
      alive = false;
    };
  }, []);

  return formatPrice(cents);
}

/** The running sale, or null. Null on the first render and whenever no sale is set. */
export function useSale(): Sale | null {
  const [sale, setSale] = useState<Sale | null>(null);

  useEffect(() => {
    let alive = true;
    fetchPrice().then(() => {
      if (alive) setSale(liveSale);
    });
    return () => {
      alive = false;
    };
  }, []);

  return sale;
}
