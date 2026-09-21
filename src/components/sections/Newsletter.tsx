import React, { useState } from 'react';
import { Send } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { supabase } from '@/integrations/supabase/client';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email address');
      return;
    }
    try {
      setIsSubmitting(true);
      const { data, error } = await supabase.functions.invoke('subscribe', { body: { email } });
      if (error) throw new Error(error.message || 'Failed to subscribe');
      setEmail('');
      setIsSubscribed(true);
      toast.success(data?.message || 'You have been successfully subscribed!');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/20 rounded-full opacity-30 blur-3xl"></div>

      <div className="container-custom max-w-4xl relative z-10">
        <AnimatedSection>
          <div className="glass-panel p-6 md:p-10 rounded-2xl text-center border border-white/5">
            <div className="tag mb-3 inline-block">Stay Updated</div>
            <h2 className="font-display text-3xl sm:text-4xl mb-3 text-foreground">Be The First To Know</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-5 text-sm sm:text-base">
              Drops, behind-the-scenes, and first access before anyone else. No spam.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="pr-14 h-12 bg-black/60 border-white/10 focus:border-primary transition-all duration-300 text-foreground"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-1 top-1 bg-primary hover:bg-primary/80 text-black h-10 w-10 rounded-md flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-primary">
                <Send className="h-5 w-5" />
                <span>Thank you for subscribing!</span>
              </div>
            )}

            <div className="mt-4 text-xs text-muted-foreground">
              By subscribing, you agree to receive product updates from us. Unsubscribe at any time.
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Newsletter;
