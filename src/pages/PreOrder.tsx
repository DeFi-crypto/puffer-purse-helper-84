import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Loader2, ShieldCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCheckout } from '@/hooks/use-checkout';

const PRICE = '$179.99';

const perks = [
  'A real down-and-feather puffer that folds into a purse in 30 seconds',
  'First production run — pre-orders ship before anyone else can buy',
  'Locked-in pre-order price; retail will be higher',
  'Email updates as your order moves through production',
];

const PreOrder = () => {
  const { isCheckingOut, startCheckout } = useCheckout();

  useEffect(() => {
    document.title = 'Pre-Order Minny — $179.99';
  }, []);

  return (
    <div className="min-h-[100svh] flex flex-col bg-background relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full opacity-30 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-secondary/20 rounded-full opacity-30 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container-custom relative z-10 flex-grow flex items-center justify-center py-6 sm:py-14">
        <div className="w-full max-w-2xl">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-3 sm:mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="glass-panel p-5 sm:p-8 md:p-10 rounded-2xl">
            <div className="tag mb-3 inline-block">Pre-Order · First Run</div>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl leading-tight mb-3 text-foreground">
              Reserve your <span className="text-primary">Minny</span>
            </h1>

            <p className="text-[15px] sm:text-lg text-muted-foreground mb-4 sm:mb-6">
              The purse that unfolds into a real puffer jacket. Pre-order now to be in the first
              production run — we'll email you when it ships.
            </p>

            <div className="flex items-baseline gap-2 mb-4 sm:mb-5">
              <span className="text-3xl sm:text-4xl font-bold text-foreground">{PRICE}</span>
              <span className="text-sm sm:text-base text-muted-foreground">one-time · pre-order price</span>
            </div>

            <Button
              onClick={startCheckout}
              disabled={isCheckingOut}
              className="btn-primary w-full h-12 flex items-center justify-center text-base disabled:opacity-50"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Redirecting to secure checkout…
                </>
              ) : (
                <>
                  Pre-Order for {PRICE}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            <p className="mt-3 text-center text-xs sm:text-sm text-muted-foreground">
              By clicking Pre-Order, you agree to our{' '}
              <Link to="/terms" className="text-primary underline underline-offset-2 hover:text-primary/80">
                Terms &amp; Conditions
              </Link>.
            </p>

            <div className="mt-3 sm:mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Secured by Stripe
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                US shipping included
              </span>
            </div>

            <ul className="space-y-2 sm:space-y-3 mt-5 sm:mt-7 pt-5 sm:pt-7 border-t border-white/10">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  <span className="text-sm sm:text-base text-foreground/90">{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrder;
