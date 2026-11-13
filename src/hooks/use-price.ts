import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// The pre-order price is set in the Mailer dashboard (Settings → Store) and stored in the
// store_settings table. The checkout function charges the same number. DEFAULT_PRICE_CENTS is
// only what's shown for the instant before the live price loads, or if it can't be read.
export const DEFAULT_PRICE_CENTS = 17999;
const CACHE_KEY = 'minny_price_cents';

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

let inflight: Promise<number | null> | null = null;

function fetchPrice(): Promise<number | null> {
  if (!inflight) {
    inflight = (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await (supabase as any)
          .from('store_settings')
          .select('price_cents')
          .eq('id', 1)
          .maybeSingle();
        const cents = data?.price_cents;
        if (error || !valid(cents)) return null;
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

/** The current pre-order price, formatted like "$179.99". */
export function usePrice(): string {
  const [cents, setCents] = useState<number>(cached);

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
