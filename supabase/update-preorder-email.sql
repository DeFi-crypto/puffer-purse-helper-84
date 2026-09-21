-- Run in Supabase SQL editor (project tfuuelkswultbitktyhb).
-- Replaces the "vip" ($1 VIP list) email with the pre-order confirmation.
-- The stripe-webhook function reads this row and substitutes {{UNSUBSCRIBE_URL}}.

update public.email_templates
set
  subject = 'Your Minny pre-order is in 🎉',
  updated_at = now(),
  html = $HTML$
<div style="background:#0B0C0B;padding:32px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#101410;border-radius:16px;overflow:hidden">
    <div style="padding:34px 34px 8px">
      <div style="color:#33f2a0;font-weight:800;font-size:13px;letter-spacing:.16em;text-transform:uppercase">MINNY &middot; PRE-ORDER</div>
      <h1 style="color:#fff;font-size:30px;line-height:1.1;letter-spacing:-.02em;margin:14px 0 0">Your pre-order is in.</h1>
    </div>
    <div style="padding:14px 34px 4px;color:#9AA39C;font-size:15px;line-height:1.65">
      Thank you &mdash; your Minny is reserved from our first production run. We'll email you as it
      moves through production, and again with tracking the moment it ships.
    </div>
    <div style="padding:18px 34px 4px">
      <div style="background:#33f2a0;border-radius:14px;padding:18px 22px;text-align:center">
        <div style="color:#0B0C0B;font-weight:800;font-size:18px">We'll ship your order soon.</div>
        <div style="color:#0B0C0B;font-size:13px;margin-top:4px;opacity:.75">No fixed ship date &mdash; you'll hear from us first.</div>
      </div>
    </div>
    <div style="padding:18px 34px 4px">
      <a href="https://www.tiktok.com/@minnyapparel/video/7589134849173097742" style="text-decoration:none;display:block">
        <div style="border-radius:14px;overflow:hidden;border:1px solid #2a2f2b;background:#0b0c0b">
          <img src="https://tfuuelkswultbitktyhb.supabase.co/storage/v1/object/public/email-assets/video-thumb.jpg" alt="Watch Minny in action" width="492" style="display:block;width:100%;height:auto;border:0" />
          <div style="padding:14px 20px;text-align:center">
            <div style="color:#ffffff;font-weight:800;font-size:16px">Watch our latest on TikTok</div>
            <div style="color:#9AA39C;font-size:13px;margin-top:4px">See Minny in action &mdash; tap to play</div>
          </div>
        </div>
      </a>
    </div>
    <div style="padding:14px 34px 4px;color:#9AA39C;font-size:15px;line-height:1.65">
      Questions about your order? Reply to this email or write to contact@minnyapparel.com.
    </div>
    <div style="padding:24px 34px 34px;border-top:1px solid #2a2f2b;margin-top:18px;text-align:center">
      <a href="https://www.instagram.com/minnyapparel/" style="color:#9AA39C;text-decoration:none;font-size:13px;font-weight:600;margin:0 9px">Instagram</a>
      <a href="https://www.tiktok.com/@minnyapparel" style="color:#9AA39C;text-decoration:none;font-size:13px;font-weight:600;margin:0 9px">TikTok</a>
      <a href="https://www.youtube.com/@MinnyApparel" style="color:#9AA39C;text-decoration:none;font-size:13px;font-weight:600;margin:0 9px">YouTube</a>
      <a href="https://www.linkedin.com/company/minnyapparel/" style="color:#9AA39C;text-decoration:none;font-size:13px;font-weight:600;margin:0 9px">LinkedIn</a>
      <div style="color:#646b65;font-size:11px;margin-top:14px">Pre-order terms: minnyapparel.com/terms &middot; minnyapparel.com</div>
      <div style="margin-top:10px"><a href="{{UNSUBSCRIBE_URL}}" style="color:#646b65;font-size:11px;text-decoration:underline">Unsubscribe</a></div>
    </div>
  </div>
</div>
$HTML$
where key = 'vip';

-- Welcome email: swap the $1 VIP language for the pre-order price.
update public.email_templates
set
  html = replace(replace(html,
           'early-bird pricing', 'pre-order updates'),
           '$1', '$179.99'),
  updated_at = now()
where key = 'welcome';
