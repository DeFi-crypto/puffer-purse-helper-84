import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Stripe coupons for the Mailer dashboard (Settings → Store). Called only by the Mailer's server,
// which has already checked that the signed-in person is an admin, with the shared ADMIN_API_KEY.
// Plain fetch against the Stripe API — the Stripe SDK BOOT_ERRORs on Supabase Edge.
//
// POST { action: "list" }
// POST { action: "create", code, percentOff? | amountOffCents?, maxRedemptions?, expiresAt? (unix seconds) }
// POST { action: "set_active", id, active }

// Pinned so the request/response shapes below don't change with the account's default API version.
const STRIPE_VERSION = "2024-06-20";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

function sameKey(a: string, b: string): boolean {
  const x = new TextEncoder().encode(a);
  const y = new TextEncoder().encode(b);
  if (x.length !== y.length) return false;
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

async function stripe(key: string, method: "GET" | "POST" | "DELETE", path: string, params?: URLSearchParams) {
  const url = `https://api.stripe.com/v1/${path}${method === "GET" && params ? `?${params}` : ""}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      "Stripe-Version": STRIPE_VERSION,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: method === "POST" ? (params ?? new URLSearchParams()).toString() : undefined,
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

// deno-lint-ignore no-explicit-any
function shape(p: any) {
  return {
    id: p.id,
    code: p.code,
    active: Boolean(p.active) && Boolean(p.coupon?.valid),
    percentOff: p.coupon?.percent_off ?? null,
    amountOffCents: p.coupon?.amount_off ?? null,
    timesRedeemed: p.times_redeemed ?? 0,
    maxRedemptions: p.max_redemptions ?? null,
    expiresAt: p.expires_at ?? null,
    created: p.created ?? null,
  };
}

serve(async (req) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const adminKey = Deno.env.get("ADMIN_API_KEY");
  const given = req.headers.get("x-admin-key") ?? "";
  if (!adminKey || !sameKey(given, adminKey)) return json({ error: "Unauthorized" }, 401);

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (!stripeKey) return json({ error: "STRIPE_SECRET_KEY is not set in Supabase" }, 500);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  try {
    if (body.action === "list") {
      const r = await stripe(stripeKey, "GET", "promotion_codes", new URLSearchParams({ limit: "100" }));
      if (!r.ok) return json({ error: r.data?.error?.message || "Stripe error" }, 502);
      return json({ coupons: (r.data.data ?? []).map(shape) });
    }

    if (body.action === "create") {
      const code = String(body.code ?? "").trim().toUpperCase();
      if (!/^[A-Z0-9_-]{3,40}$/.test(code)) return json({ error: "Code must be 3–40 letters, numbers, - or _" }, 400);
      const percentOff = body.percentOff == null ? null : Number(body.percentOff);
      const amountOffCents = body.amountOffCents == null ? null : Number(body.amountOffCents);
      if ((percentOff == null) === (amountOffCents == null)) return json({ error: "Give a percent or an amount, not both" }, 400);

      const max = body.maxRedemptions == null ? null : Number(body.maxRedemptions);
      if (max != null && (!Number.isInteger(max) || max < 1)) return json({ error: "Usage limit must be a whole number" }, 400);
      const expires = body.expiresAt == null ? null : Number(body.expiresAt);
      if (expires != null && (!Number.isInteger(expires) || expires * 1000 <= Date.now())) {
        return json({ error: "Expiry must be in the future" }, 400);
      }

      const coupon = new URLSearchParams({ duration: "once", name: code });
      if (percentOff != null) {
        if (!(percentOff > 0 && percentOff <= 100)) return json({ error: "Percent must be between 1 and 100" }, 400);
        coupon.set("percent_off", String(percentOff));
      } else {
        if (!Number.isInteger(amountOffCents) || amountOffCents! < 1) return json({ error: "Amount must be at least $0.01" }, 400);
        coupon.set("amount_off", String(amountOffCents));
        coupon.set("currency", "usd");
      }
      coupon.set("metadata[source]", "minny-mailer");
      const c = await stripe(stripeKey, "POST", "coupons", coupon);
      if (!c.ok) return json({ error: c.data?.error?.message || "Stripe refused the coupon" }, 502);

      const promo = new URLSearchParams({ coupon: c.data.id, code });
      if (max != null) promo.set("max_redemptions", String(max));
      if (expires != null) promo.set("expires_at", String(expires));
      const p = await stripe(stripeKey, "POST", "promotion_codes", promo);
      if (!p.ok) {
        // Don't leave an orphan coupon behind when the code itself was refused (e.g. already in use).
        await stripe(stripeKey, "DELETE", `coupons/${c.data.id}`).catch(() => {});
        return json({ error: p.data?.error?.message || "Stripe refused the code" }, 502);
      }
      return json({ coupon: shape(p.data) });
    }

    if (body.action === "set_active") {
      const id = String(body.id ?? "");
      if (!/^promo_[A-Za-z0-9]+$/.test(id)) return json({ error: "Bad id" }, 400);
      const r = await stripe(stripeKey, "POST", `promotion_codes/${id}`, new URLSearchParams({ active: body.active ? "true" : "false" }));
      if (!r.ok) return json({ error: r.data?.error?.message || "Stripe error" }, 502);
      return json({ coupon: shape(r.data) });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (error) {
    console.error("admin-store error:", error);
    return json({ error: (error as Error).message || "Something went wrong" }, 500);
  }
});
