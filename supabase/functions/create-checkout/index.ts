import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Plain fetch against the Stripe API — the Stripe SDK BOOT_ERRORs on Supabase Edge.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PRICE_CENTS = 14999; // $149.99
const PRODUCT_NAME = 'Minny — Convertible Puffer Purse (Pre-Order)';
const PRODUCT_DESC =
  'Pre-order from our first production run. Ships when production is complete — no fixed ship date. ' +
  'Full terms: https://minnyapparel.com/terms';

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function createSession(key: string, params: URLSearchParams) {
  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY is not set');
      return json({ error: 'Payment system is not configured' }, 500);
    }

    const origin =
      req.headers.get('origin') ||
      req.headers.get('referer')?.replace(/\/$/, '') ||
      'https://minnyapparel.com';

    const base = new URLSearchParams();
    base.set('mode', 'payment');
    base.set('line_items[0][price_data][currency]', 'usd');
    base.set('line_items[0][price_data][unit_amount]', String(PRICE_CENTS));
    base.set('line_items[0][price_data][product_data][name]', PRODUCT_NAME);
    base.set('line_items[0][price_data][product_data][description]', PRODUCT_DESC);
    base.set('line_items[0][quantity]', '1');
    base.set('billing_address_collection', 'required');
    base.set('shipping_address_collection[allowed_countries][0]', 'US');
    base.set('customer_creation', 'always');
    base.set('phone_number_collection[enabled]', 'true');
    base.set('allow_promotion_codes', 'true');
    base.set('success_url', `${origin}/pre-order/success?session_id={CHECKOUT_SESSION_ID}`);
    base.set('cancel_url', `${origin}/`);
    base.set('metadata[type]', 'vip_preorder'); // keep: the webhook keys off this value
    base.set('metadata[brand]', 'MinnyApparel');
    base.set('metadata[price_cents]', String(PRICE_CENTS));
    base.set('metadata[accepted_terms_on_site]', 'true');
    base.set('custom_text[submit][message]',
      'Pre-order: ships when production is complete. No fixed ship date.');

    const result = await createSession(stripeKey, base);

    if (!result.ok) {
      console.error('Stripe error:', result.data);
      return json({ error: result.data?.error?.message || 'Failed to create checkout session' }, 500);
    }

    return json({ url: result.data.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return json({ error: (error as Error).message || 'Failed to create checkout session' }, 500);
  }
});
