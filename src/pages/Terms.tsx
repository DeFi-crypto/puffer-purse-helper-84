import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  useEffect(() => {
    document.title = 'Pre-Order Terms | Minny';
  }, []);

  return (
    <div className="min-h-[100svh] bg-background text-foreground">
      <div className="container-custom max-w-3xl py-10 sm:py-16">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <h1 className="font-display text-3xl sm:text-5xl mb-2">Pre-Order Terms</h1>
        <p className="text-muted-foreground mb-8">Last updated September 2026 · MinnyApparel Inc.</p>

        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. What you're buying</h2>
            <p>
              A pre-order reserves one Minny convertible purse-to-puffer jacket from our first production run
              at the pre-order price shown at checkout. Payment is taken in full at the time of pre-order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. No fixed ship date</h2>
            <p>
              Minny is a product still in production. <strong>We do not commit to any delivery date and have no
              time obligation to ship by a particular date.</strong> Any dates or timeframes we share are
              estimates only and may change. Your order ships when production of your unit is complete, at
              a time determined solely by MinnyApparel Inc.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Updates</h2>
            <p>
              We'll email the address you used at checkout with production updates and a shipping
              confirmation with tracking when your order goes out.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Changes to the product</h2>
            <p>
              Final materials, colors, and details may differ slightly from images and videos shown on our
              site as we finalize production.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Cancellations and refunds</h2>
            <p>
              You may request a cancellation and full refund at any time before your order ships by emailing{' '}
              <a href="mailto:contact@minnyapparel.com" className="text-primary underline">contact@minnyapparel.com</a>.
              After shipment, our standard return policy applies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Shipping</h2>
            <p>We currently ship within the United States only.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
            <p>
              Questions about your pre-order: <a href="mailto:contact@minnyapparel.com" className="text-primary underline">contact@minnyapparel.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
