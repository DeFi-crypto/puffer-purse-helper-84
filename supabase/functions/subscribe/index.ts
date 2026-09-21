import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FROM = 'Minny <hello@minnyapparel.com>';
const FN_BASE = 'https://tfuuelkswultbitktyhb.supabase.co/functions/v1';
const CODE = 'MINNY10';

type EmailTemplate = { subject: string | null; html: string | null };
type TemplateStore = {
  from: (table: string) => {
    select: (columns: string) => {
      eq: (column: string, value: string) => {
        maybeSingle: () => Promise<{ data: unknown }>;
      };
    };
  };
};

async function unsubToken(email: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(email.toLowerCase()));
  return [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function unsubUrl(email: string, token: string): string {
  return `${FN_BASE}/unsubscribe?e=${encodeURIComponent(email)}&t=${token}`;
}

function isEmailTemplate(value: unknown): value is EmailTemplate {
  return typeof value === 'object' && value !== null && 'subject' in value && 'html' in value;
}

async function getTemplate(sb: TemplateStore, key: string): Promise<EmailTemplate | null> {
  try {
    const { data } = await sb
      .from('email_templates')
      .select('subject, html')
      .eq('key', key)
      .maybeSingle();
    return isEmailTemplate(data) && data.html ? data : null;
  } catch (_error) {
    return null;
  }
}

function footer(unsub: string): string {
  return `
    <div style="padding:24px 34px 34px;border-top:1px solid #2a2f2b;margin-top:18px;text-align:center">
      <div style="color:#646b65;font-family:Helvetica,Arial,sans-serif;font-size:11px">Minny &middot; minnyapparel.com</div>
      <div style="margin-top:10px"><a href="${unsub}" style="color:#646b65;font-family:Helvetica,Arial,sans-serif;font-size:11px;text-decoration:underline">Unsubscribe</a></div>
    </div>`;
}

function welcomeHtml(unsub: string): string {
  return `
    <div style="background:#0B0C0B;padding:32px 0;font-family:Helvetica,Arial,sans-serif">
      <div style="max-width:560px;margin:0 auto;background:#101410;border-radius:16px;overflow:hidden">
        <div style="padding:34px 34px 8px">
          <div style="color:#C6FF3D;font-weight:800;font-size:13px;letter-spacing:.16em;text-transform:uppercase">MINNY</div>
          <h1 style="color:#fff;font-size:30px;line-height:1.1;letter-spacing:-.02em;margin:14px 0 0">Thanks for subscribing.</h1>
        </div>
        <div style="padding:14px 34px 4px;color:#9AA39C;font-size:15px;line-height:1.65">
          You're on the list. We'll send first looks at new drops, behind-the-scenes from the studio,
          and early access before anyone else. No spam &mdash; just the good stuff.
        </div>
        ${footer(unsub)}
      </div>
    </div>`;
}

function exitOfferHtml(unsub: string): string {
  return `
    <div style="background:#0B0C0B;padding:32px 0;font-family:Helvetica,Arial,sans-serif">
      <div style="max-width:560px;margin:0 auto;background:#101410;border-radius:16px;overflow:hidden">
        <div style="padding:34px 34px 8px">
          <div style="color:#C6FF3D;font-weight:800;font-size:13px;letter-spacing:.16em;text-transform:uppercase">MINNY &middot; 10% OFF</div>
          <h1 style="color:#fff;font-size:30px;line-height:1.1;letter-spacing:-.02em;margin:14px 0 0">Your Minny is waiting.</h1>
        </div>
        <div style="padding:14px 34px 4px;color:#D9DED9;font-size:15px;line-height:1.65">
          Thanks for joining us. Use this code at Stripe Checkout to take 10% off your Minny pre-order.
        </div>
        <div style="margin:24px 34px 8px;padding:17px;text-align:center;border:1px solid #C6FF3D;border-radius:12px;color:#C6FF3D;font-family:monospace;font-size:26px;font-weight:800;letter-spacing:.16em">${CODE}</div>
        <div style="padding:18px 34px 4px;text-align:center"><a href="https://minnyapparel.com" style="display:inline-block;background:#C6FF3D;color:#0B0C0B;padding:13px 22px;border-radius:999px;font-weight:800;font-size:14px;text-decoration:none">Use my 10% off</a></div>
        ${footer(unsub)}
      </div>
    </div>`;
}

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

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    const { email, source } = await req.json();
    const signupSource = source === 'exit_popup' ? 'exit_popup' : 'newsletter';

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data, error } = await supabaseClient
      .from('subscribers')
      .insert([{ email, source: signupSource }])
      .select();

    const alreadySubscribed = error?.code === '23505';
    if (error && !alreadySubscribed) {
      console.error('Error saving subscriber:', error);
      return new Response(JSON.stringify({ error: 'Failed to save subscription' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // An existing subscriber who asks for the exit offer should still receive it.
    if (!alreadySubscribed || signupSource === 'exit_popup') {
      const secret = Deno.env.get('ADMIN_API_KEY') ?? '';
      const link = unsubUrl(email, await unsubToken(email, secret));
      const templateKey = signupSource === 'exit_popup' ? 'exit_popup' : 'welcome';
      const template = await getTemplate(supabaseClient, templateKey);
      const subject = template?.subject || (signupSource === 'exit_popup'
        ? `Your 10% off code: ${CODE}`
        : 'Welcome to Minny ✨');
      const html = template?.html
        ? String(template.html).split('{{UNSUBSCRIBE_URL}}').join(link)
        : signupSource === 'exit_popup' ? exitOfferHtml(link) : welcomeHtml(link);
      await sendEmail(email, subject, html, link);
    }

    return new Response(JSON.stringify({
      message: alreadySubscribed ? 'You are already subscribed!' : 'Successfully subscribed!',
      data,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
