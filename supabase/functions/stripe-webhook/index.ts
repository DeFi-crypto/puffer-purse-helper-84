import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

serve(async (req) => {
  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!stripeKey || !webhookSecret) {
    console.error('Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET');
    return new Response('Webhook not configured', { status: 500 });
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: '2024-06-20',
    httpClient: Stripe.createFetchHttpClient(),
  });

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  const body = await req.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    console.error('Signature verification failed:', err.message);
    return new Response(`Webhook signature verification failed: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      if (session.metadata?.type === 'vip_preorder') {
        const email =
          session.customer_details?.email || session.customer_email || null;

        if (email) {
          const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
          );

          const { error } = await supabaseAdmin
            .from('subscribers')
            .upsert(
              { email, source: 'vip_preorder' },
              { onConflict: 'email' }
            );

          if (error) {
            console.error('Failed to upsert VIP subscriber:', error);
            return new Response('Database error', { status: 500 });
          }

          console.log(`VIP subscriber recorded: ${email}`);

          if (session.customer) {
            try {
              const customerId =
                typeof session.customer === 'string'
                  ? session.customer
                  : session.customer.id;
              await stripe.customers.update(customerId, {
                metadata: { vip_preorder: 'true', brand: 'MinnyApparel' },
              });
            } catch (tagErr) {
              console.warn('Could not tag Stripe customer as VIP:', tagErr.message);
            }
          }
        } else {
          console.warn('checkout.session.completed had no email');
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return new Response('Webhook handler failed', { status: 500 });
  }
});
