import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useCheckout = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const startCheckout = async () => {
    try {
      setIsCheckingOut(true);
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { accepted_terms: true },
      });
      if (error) throw new Error(error.message || 'Failed to start checkout');
      if (!data?.url) throw new Error('No checkout URL returned');
      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
      setIsCheckingOut(false);
    }
  };

  return { isCheckingOut, startCheckout };
};
