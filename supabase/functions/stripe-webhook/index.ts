import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
// ---- Email settings ----
const FROM = 'Minny <hello@minnyapparel.com>';
const FN_BASE = 'https://tfuuelkswultbitktyhb.supabase.co/functions/v1';
const IG = 'https://www.instagram.com/minnyapparel/';
const TT = 'https://www.tiktok.com/@minnyapparel';
const YT = 'https://www.youtube.com/@MinnyApparel';
const LI = 'https://www.linkedin.com/company/minnyapparel/';
const FEATURED_VIDEO = 'https://www.tiktok.com/@minnyapparel/video/7589134849173097742';
async function unsubToken(email, secret) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), {
    name: 'HMAC',
    hash: 'SHA-256'
  }, false, [
    'sign'
  ]);
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(email.toLowerCase()));
  return [
    ...new Uint8Array(mac)
  ].map((b)=>b.toString(16).padStart(2, '0')).join('');
}
function unsubUrl(email, token) {
  return `https://minnyapparel.com/unsubscribe?e=${encodeURIComponent(email)}&t=${token}`;
}
// Read the dashboard-editable template from the DB (falls back to inline default).
async function getTemplate(sb, key) {
  try {
    const { data } = await sb.from('email_templates').select('subject, html').eq('key', key).maybeSingle();
    return data && data.html ? data : null;
  } catch (_e) {
    return null;
  }
}
function videoCard() {
  return `
  <div style="padding:18px 34px 4px">
    <a href="${FEATURED_VIDEO}" style="text-decoration:none;display:block">
      <div style="border-radius:14px;overflow:hidden;border:1px solid #2a2f2b;background:linear-gradient(135deg,#15171a,#0b0c0b)">
        <div style="padding:38px 20px;text-align:center">
          <div style="width:60px;height:60px;border-radius:50%;background:#C6FF3D;margin:0 auto 14px;color:#0B0C0B;font-size:22px;font-weight:900;line-height:60px">&#9658;</div>
          <div style="color:#ffffff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:800;font-size:18px">Watch our latest on TikTok</div>
          <div style="color:#9AA39C;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;margin-top:6px">See Minny in action &mdash; tap to play</div>
        </div>
      </div>
    </a>
  </div>`;
}
function footer(unsub) {
  const a = (href, label)=>`<a href="${href}" style="color:#9AA39C;text-decoration:none;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;margin:0 9px">${label}</a>`;
  return `
  <div style="padding:24px 34px 34px;border-top:1px solid #2a2f2b;margin-top:18px;text-align:center">
    ${a(IG, 'Instagram')}${a(TT, 'TikTok')}${a(YT, 'YouTube')}${a(LI, 'LinkedIn')}
    <div style="color:#646b65;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;margin-top:14px">Made from rescued materials &middot; minnyapparel.com</div>
    <div style="margin-top:10px"><a href="${unsub}" style="color:#646b65;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;text-decoration:underline">Unsubscribe</a></div>
  </div>`;
}
function vipHtml(unsub) {
  return `
  <div style="background:#0B0C0B;padding:32px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#101410;border-radius:16px;overflow:hidden">
      <div style="padding:34px 34px 8px">
        <div style="color:#C6FF3D;font-weight:800;font-size:13px;letter-spacing:.16em;text-transform:uppercase">MINNY &middot; PRE-ORDER</div>
        <h1 style="color:#fff;font-size:30px;line-height:1.1;letter-spacing:-.02em;margin:14px 0 0">Your pre-order is in.</h1>
      </div>
      <div style="padding:14px 34px 4px;color:#9AA39C;font-size:15px;line-height:1.65">
        Thank you &mdash; your Minny is reserved from our first production run. We'll email you as it moves through production, and again with tracking the moment it ships.
      </div>
      <div style="padding:18px 34px 4px">
        <div style="background:#C6FF3D;border-radius:14px;padding:18px 22px;text-align:center">
          <div style="color:#0B0C0B;font-weight:800;font-size:18px">We'll ship your order soon.</div>
        </div>
      </div>
      ${videoCard()}
      <div style="padding:14px 34px 4px;color:#9AA39C;font-size:15px;line-height:1.65">
        While you wait, follow along &mdash; we post the good stuff daily.
      </div>
      ${footer(unsub)}
    </div>
  </div>`;
}
// Verify a Stripe webhook signature using Web Crypto (no Stripe SDK).
async function verifyStripeSignature(payload, sigHeader, secret) {
  let t = '';
  const sigs = [];
  for (const part of sigHeader.split(',')){
    const [k, v] = part.trim().split('=');
    if (k === 't') t = v;
    if (k === 'v1') sigs.push(v);
  }
  if (!t || sigs.length === 0) return false;
  const age = Math.abs(Date.now() / 1000 - Number(t));
  if (Number.isFinite(age) && age > 300) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), {
    name: 'HMAC',
    hash: 'SHA-256'
  }, false, [
    'sign'
  ]);
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${t}.${payload}`));
  const expected = [
    ...new Uint8Array(mac)
  ].map((b)=>b.toString(16).padStart(2, '0')).join('');
  return sigs.some((s)=>{
    if (s.length !== expected.length) return false;
    let diff = 0;
    for(let i = 0; i < s.length; i++)diff |= s.charCodeAt(i) ^ expected.charCodeAt(i);
    return diff === 0;
  });
}
async function sendEmail(to, subject, html, unsub) {
  const key = Deno.env.get('RESEND_API_KEY');
  if (!key) {
    console.warn('RESEND_API_KEY not set — skipping VIP email');
    return;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM,
        to,
        subject,
        html,
        headers: {
          'List-Unsubscribe': `<${unsub.replace('https://minnyapparel.com/unsubscribe', FN_BASE + '/unsubscribe')}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
        }
      })
    });
    if (!res.ok) console.error('Resend error:', await res.text());
  } catch (e) {
    console.error('Resend request failed:', e);
  }
}
serve(async (req)=>{
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return new Response('Webhook not configured', {
      status: 500
    });
  }
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing stripe-signature header', {
      status: 400
    });
  }
  const body = await req.text();
  const valid = await verifyStripeSignature(body, signature, webhookSecret);
  if (!valid) {
    console.error('Signature verification failed');
    return new Response('Invalid signature', {
      status: 400
    });
  }
  let event;
  try {
    event = JSON.parse(body);
  } catch  {
    return new Response('Invalid JSON', {
      status: 400
    });
  }
  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      if (session.metadata?.type === 'vip_preorder') {
        const email = session.customer_details?.email || session.customer_email || null;
        if (email) {
          const supabaseAdmin = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
          const { error } = await supabaseAdmin.from('subscribers').upsert({
            email,
            source: 'vip_preorder'
          }, {
            onConflict: 'email'
          });
          if (error) {
            console.error('Failed to upsert VIP subscriber:', error);
            return new Response('Database error', {
              status: 500
            });
          }
          console.log(`VIP subscriber recorded: ${email}`);
          const secret = Deno.env.get('ADMIN_API_KEY') ?? '';
          const link = unsubUrl(email, await unsubToken(email, secret));
          const tpl = await getTemplate(supabaseAdmin, 'vip');
          const subject = tpl && tpl.subject || "Your Minny pre-order is in 🎉";
          const html = tpl && tpl.html ? String(tpl.html).split('{{UNSUBSCRIBE_URL}}').join(link) : vipHtml(link);
          await sendEmail(email, subject, html, link);
          const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
          const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
          if (stripeKey && customerId) {
            try {
              await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${stripeKey}`,
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'metadata[vip_preorder]=true&metadata[brand]=MinnyApparel'
              });
            } catch (tagErr) {
              console.warn('Could not tag Stripe customer as VIP:', tagErr);
            }
          }
        } else {
          console.warn('checkout.session.completed had no email');
        }
      }
    }
    return new Response(JSON.stringify({
      received: true
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return new Response('Webhook handler failed', {
      status: 500
    });
  }
});