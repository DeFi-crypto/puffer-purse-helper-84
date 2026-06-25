import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Loader2, ShieldCheck, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const perks = [
  'Guaranteed access to exclusive launch pricing',
  'Locked in no matter the platform we launch on',
  'Early-access window before the public',
  'VIP-only product updates and drops',
];

const PreOrder = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('create-checkout');
      if (error) throw new Error(error.message || 'Failed to start checkout');
      if (!data?.url) throw new Error('No checkout URL returned');
      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full opacity-30 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-secondary/20 rounded-full opacity-30 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container-custom relative z-10 flex-grow flex items-center justify-center py-16">
        <div className="w-full max-w-2xl">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="glass-panel p-8 md:p-12 rounded-2xl">
            <div className="tag mb-4 inline-block">VIP Pre-Order</div>
            <h1 className="heading-lg mb-4 text-foreground">
              Lock In Our <span className="text-primary">Lowest Launch Price</span>
            </h1>

            <p className="body-lg text-muted-foreground mb-2">
              We're offering a limited group the chance to lock in our lowest launch price.
            </p>
            <p className="body-lg text-muted-foreground mb-8">
              For <span className="text-foreground font-semibold">$1</span>, you'll be added to our VIP list and guaranteed access to exclusive pricing when we officially launch, no matter the platform.
            </p>

            <ul className="space-y-3 mb-8">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  <span className="body-md text-foreground/90">{perk}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-foreground">$1</span>
              <span className="text-muted-foreground">one-time · secures your VIP spot</span>
            </div>

            <Button onClick={handleCheckout} disabled={isLoading} className="btn-primary w-full h-12 flex items-center justify-center text-base">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Redirecting to secure checkout…
                </>
              ) : (
                <>
                  Continue to Secure Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Secured by Stripe
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Your $1 confirms your VIP access
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrder;
