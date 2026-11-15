import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// Website signups (newsletter forms and the exit popup).
//
// Every subscriber gets their own one-time discount code, named after them (EMILY10). It is a real
// Stripe promotion code limited to one redemption, stored on their subscribers row, and emailed in the
// welcome email. Asking again (same email) re-sends the same code, never a second one. When EMILY10 is
// taken by another Emily who hasn't used it yet, the next one gets EMILY10OFF, EMILYOFF10 and so on.
//
// The email is the live `welcome` / `exit_popup` template from the Mailer dashboard when it contains
// {{DISCOUNT_CODE}}; otherwise the built-in design below is used, so the code is always delivered.
// Tags filled in here: {{DISCOUNT_CODE}} {{DISCOUNT_PERCENT}} {{first_name}} {{first_name|there}}
// {{email}} {{UNSUBSCRIBE_URL}}.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FROM = 'Minny <hello@minnyapparel.com>';
const FN_BASE = 'https://tfuuelkswultbitktyhb.supabase.co/functions/v1';
const SHOP_URL = 'https://minnyapparel.com/pre-order';

const DISCOUNT_PERCENT = 10;
// One shared Stripe coupon (the 10% rule); each subscriber gets their own promotion code on top of it.
const WELCOME_COUPON_ID = `minny-welcome-${DISCOUNT_PERCENT}`;
// Shared code used only if Stripe can't be reached, so the email never goes out without a working code.
const FALLBACK_CODE = 'MINNY10';
// Pinned so request/response shapes don't change with the account's default API version.
const STRIPE_VERSION = '2024-06-20';

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ---------------------------------------------------------------------------
// Unsubscribe link (must match the unsubscribe function and the Mailer app)
// ---------------------------------------------------------------------------
async function unsubToken(email: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(email.toLowerCase()));
  return [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function unsubUrl(email: string, token: string): string {
  return `${FN_BASE}/unsubscribe?e=${encodeURIComponent(email)}&t=${token}`;
}

// ---------------------------------------------------------------------------
// Personal discount codes
// ---------------------------------------------------------------------------
async function stripe(key: string, method: 'GET' | 'POST', path: string, params?: URLSearchParams) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      'Stripe-Version': STRIPE_VERSION,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: method === 'POST' ? (params ?? new URLSearchParams()).toString() : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function ensureCoupon(key: string): Promise<boolean> {
  const found = await stripe(key, 'GET', `coupons/${WELCOME_COUPON_ID}`);
  if (found.ok) return true;
  const made = await stripe(key, 'POST', 'coupons', new URLSearchParams({
    id: WELCOME_COUPON_ID,
    percent_off: String(DISCOUNT_PERCENT),
    duration: 'once',
    name: `Welcome ${DISCOUNT_PERCENT}% (personal codes)`,
    'metadata[source]': 'minny-welcome',
  }));
  // Two signups at once can both try to create it; "already exists" is success.
  return made.ok || made.data?.error?.code === 'resource_already_exists';
}

/** "Émilie-Rose" -> "EMILIEROSE". Letters only, so the code is easy to type. */
function lettersOnly(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z]/g, '');
}

/** Letters and digits only, for the part of an email address before the @. */
function lettersAndDigits(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

/**
 * The codes to try for this person, in order. No random characters: every one reads as a name.
 *   EMILY10 -> EMILY10OFF -> EMILYOFF10 -> EMILY10PERCENT -> EMILY10PERCENTOFF -> EMILYTENOFF
 *   -> EMILYSMITH10 (when we know the last name) -> EMILYJ9210 (their address before the @) -> ...10OFF
 * Stripe only requires a code to be unique among ACTIVE codes, and a one-time code switches off when it is
 * used. So once an earlier Emily has spent EMILY10, the next Emily gets EMILY10 again.
 */
function codeCandidates(firstName: string, lastName: string, email: string): string[] {
  const n = DISCOUNT_PERCENT;
  const local = lettersAndDigits(email.split('@')[0]).slice(0, 24);
  const first = lettersOnly(firstName.trim().split(/\s+/)[0] ?? '').slice(0, 14);
  const last = lettersOnly(lastName.trim()).slice(0, 14);
  const fromEmail = lettersOnly(email.split('@')[0].split(/[^A-Za-z\u00C0-\u024F]/)[0] ?? '').slice(0, 14);
  const name = first.length >= 2 ? first : fromEmail.length >= 2 ? fromEmail : 'MINNY';

  const list = [
    `${name}${n}`,
    `${name}${n}OFF`,
    `${name}OFF${n}`,
    `${name}${n}PERCENT`,
    `${name}${n}PERCENTOFF`,
    n === 10 ? `${name}TENOFF` : '',
    last.length >= 2 && first.length >= 2 ? `${first}${last}${n}` : '',
    last.length >= 2 && first.length >= 2 ? `${first}${last}${n}OFF` : '',
    local.length >= 2 ? `${local}${n}` : '',
    local.length >= 2 ? `${local}${n}OFF` : '',
    local.length >= 2 ? `${local}OFF${n}` : '',
  ];
  return [...new Set(list.filter(Boolean))];
}

/**
 * Creates this subscriber's own one-time code in Stripe, using the first name in codeCandidates() that isn't
 * taken by another active code. Returns null if Stripe can't be reached, refuses for another reason, or every
 * candidate is taken (the caller then falls back to the shared code).
 */
async function createPersonalCode(stripeKey: string, firstName: string, lastName: string, email: string): Promise<string | null> {
  if (!(await ensureCoupon(stripeKey))) return null;
  for (const code of codeCandidates(firstName, lastName, email)) {
    const made = await stripe(stripeKey, 'POST', 'promotion_codes', new URLSearchParams({
      coupon: WELCOME_COUPON_ID,
      code,
      max_redemptions: '1',
      'metadata[source]': 'welcome',
      'metadata[email]': email,
    }));
    if (made.ok) return String(made.data.code ?? code);
    const err = made.data?.error;
    const taken = err?.code === 'resource_already_exists' || /already exists|already in use/i.test(String(err?.message ?? ''));
    if (!taken) {
      console.error('Stripe refused the promotion code:', err?.message ?? made.status);
      return null;
    }
  }
  console.error('Every code name for this subscriber is taken; using the shared code.');
  return null;
}

// ---------------------------------------------------------------------------
// Email
// ---------------------------------------------------------------------------
type Vars = { code: string; firstName: string; email: string; unsub: string };

// {{ name }} or {{ name | fallback }}: the same tag syntax the Mailer dashboard uses.
const TAG = /\{\{\s*([A-Za-z_][A-Za-z0-9_]*)\s*(?:\|([^{}]*))?\}\}/g;

function fillTags(text: string, vars: Vars, asHtml: boolean): string {
  const esc = (value: string) => (asHtml ? escapeHtml(value) : value);
  return text.replace(TAG, (match: string, name: string, fallback?: string) => {
    switch (name) {
      case 'DISCOUNT_CODE':
        return esc(vars.code);
      case 'DISCOUNT_PERCENT':
        return String(DISCOUNT_PERCENT);
      case 'first_name':
      case 'FIRST_NAME':
        return vars.firstName ? esc(vars.firstName) : (fallback ?? '').trim();
      case 'email':
        return esc(vars.email);
      case 'UNSUBSCRIBE_URL':
        return vars.unsub;
      default:
        return match;
    }
  });
}

const DEFAULT_SUBJECT = "Here's your discount code";

// Brand: green #33f2a0, black #0a0a0a. Tables + inline styles for email clients.
const DEFAULT_HTML = `
<div style="background:#0a0a0a;padding:32px 12px;font-family:Helvetica,Arial,sans-serif">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="max-width:560px;margin:0 auto;background:#101410;border-radius:16px">
    <tr><td style="padding:34px 34px 6px">
      <div style="color:#33f2a0;font-weight:800;font-size:13px;letter-spacing:.16em;text-transform:uppercase">MINNY &middot; {{DISCOUNT_PERCENT}}% OFF</div>
      <h1 style="color:#ffffff;font-size:30px;line-height:1.15;margin:14px 0 0">Here's your discount code.</h1>
    </td></tr>
    <tr><td style="padding:14px 34px 4px;color:#d9ded9;font-size:15px;line-height:1.65">
      Hey {{first_name|there}}, thanks for subscribing. This code is yours: it takes {{DISCOUNT_PERCENT}}% off your Minny pre-order and works once.
    </td></tr>
    <tr><td style="padding:22px 34px 6px">
      <div style="padding:18px;text-align:center;border:2px dashed #33f2a0;border-radius:12px;color:#33f2a0;font-family:'Courier New',monospace;font-size:26px;font-weight:800;letter-spacing:.12em">{{DISCOUNT_CODE}}</div>
    </td></tr>
    <tr><td align="center" style="padding:18px 34px 4px">
      <a href="${SHOP_URL}" style="display:inline-block;background:#33f2a0;color:#0a0a0a;padding:13px 24px;border-radius:999px;font-weight:800;font-size:14px;text-decoration:none">Use my {{DISCOUNT_PERCENT}}% off</a>
    </td></tr>
    <tr><td style="padding:14px 34px 0;color:#9aa39c;font-size:13px;line-height:1.6;text-align:center">
      Enter the code on the checkout page. You'll also get first looks at new drops and early access. No spam.
    </td></tr>
    <tr><td style="padding:24px 34px 34px;text-align:center">
      <div style="border-top:1px solid #2a2f2b;padding-top:18px;color:#646b65;font-size:11px">Minny &middot; minnyapparel.com</div>
      <div style="margin-top:10px"><a href="{{UNSUBSCRIBE_URL}}" style="color:#646b65;font-size:11px;text-decoration:underline">Unsubscribe</a></div>
    </td></tr>
  </table>
</div>`;

async function sendEmail(to: string, subject: string, html: string, unsub: string) {
  const key = Deno.env.get('RESEND_API_KEY');
  if (!key) {
    console.warn('RESEND_API_KEY not set — skipping email');
    return;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to,
        subject,
        html,
        headers: {
          'List-Unsubscribe': `<${unsub}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      }),
    });
    if (!res.ok) console.error('Resend error:', await res.text());
  } catch (error) {
    console.error('Resend request failed:', error);
  }
}

// ---------------------------------------------------------------------------
serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const sb = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? '').trim().toLowerCase();
    const signupSource = body?.source === 'exit_popup' ? 'exit_popup' : 'newsletter';
    // Names are shown in the email and used in the code: keep them short and free of markup.
    const firstName = String(body?.first_name ?? '').replace(/[<>{}]/g, '').replace(/\s+/g, ' ').trim().slice(0, 40);

    if (!email || email.length > 254 || !/^\S+@\S+\.\S+$/.test(email)) return json({ error: 'Invalid email format' }, 400);

    const inserted = await sb
      .from('subscribers')
      .insert([{ email, source: signupSource, ...(firstName ? { first_name: firstName } : {}) }])
      .select('id, first_name, last_name, discount_code')
      .maybeSingle();

    const alreadySubscribed = inserted.error?.code === '23505';
    if (inserted.error && !alreadySubscribed) {
      console.error('Error saving subscriber:', inserted.error);
      return json({ error: 'Failed to save subscription' }, 500);
    }

    let row = inserted.data as { id: string; first_name: string | null; last_name: string | null; discount_code: string | null } | null;
    if (alreadySubscribed) {
      const existing = await sb.from('subscribers').select('id, first_name, last_name, discount_code').eq('email', email).limit(1).maybeSingle();
      row = existing.data as typeof row;
      if (row && firstName && !row.first_name) {
        await sb.from('subscribers').update({ first_name: firstName }).eq('id', row.id);
        row.first_name = firstName;
      }
    }

    // One code per person: reuse theirs if they already have one.
    let code = row?.discount_code ?? null;
    let createdNow = false;
    if (!code) {
      const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
      const made = stripeKey ? await createPersonalCode(stripeKey, firstName || row?.first_name || '', row?.last_name || '', email) : null;
      if (made) {
        code = made;
        createdNow = true;
        if (row) {
          const saved = await sb.from('subscribers').update({ discount_code: made }).eq('id', row.id);
          if (saved.error) console.error('Could not save the discount code:', saved.error.message);
        }
      }
    }

    // New subscribers always get the email. Someone already on the list gets it when they had no code yet,
    // or when they ask through the exit popup (which promises a code).
    if (!alreadySubscribed || createdNow || signupSource === 'exit_popup') {
      const unsub = unsubUrl(email, await unsubToken(email, Deno.env.get('ADMIN_API_KEY') ?? ''));
      const vars: Vars = { code: code ?? FALLBACK_CODE, firstName: firstName || row?.first_name || '', email, unsub };

      const templateKey = signupSource === 'exit_popup' ? 'exit_popup' : 'welcome';
      let template: { subject: string | null; html: string | null } | null = null;
      try {
        const { data } = await sb.from('email_templates').select('subject, html').eq('key', templateKey).maybeSingle();
        template = data as typeof template;
      } catch (_error) {
        template = null;
      }
      // A dashboard template is only used if it actually shows the code.
      const custom = template?.html && template.html.includes('{{DISCOUNT_CODE}}') ? template : null;

      const subject = fillTags(custom?.subject || DEFAULT_SUBJECT, vars, false);
      const html = fillTags(custom?.html || DEFAULT_HTML, vars, true);
      await sendEmail(email, subject, html, unsub);
    }

    return json({
      message: alreadySubscribed ? 'You are already subscribed! Check your email for your code.' : 'Successfully subscribed! Your code is on its way.',
      // Shown on screen only to a brand-new subscriber. For an address already on the list the code goes to the inbox only,
      // so typing someone else's email can't reveal their code.
      ...(createdNow && code && !alreadySubscribed ? { code } : {}),
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return json({ error: 'Internal server error' }, 500);
  }
});
