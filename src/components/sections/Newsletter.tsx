
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
      
      const { data, error } = await supabase.functions.invoke('subscribe', {
        body: { email }
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to subscribe');
      }
      
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
    <section id="newsletter" className="section-padding bg-background relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/20 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/20 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container-custom max-w-5xl relative z-10">
        <AnimatedSection>
          <div className="glass-panel p-8 md:p-16 rounded-2xl text-center border border-white/5 hover:border-white/10 transition-all duration-300">
            <div className="tag mb-4 inline-block">Stay Updated</div>
            <h2 className="heading-md mb-6 text-foreground">Be The First To Know</h2>
            <p className="body-md text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our exclusive waiting list for product updates, launch information, and early-bird pricing. 
              Be among the first to experience the future of transformable fashion.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
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
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-primary">
                <Send className="h-5 w-5" />
                <span>Thank you for subscribing!</span>
              </div>
            )}
            
            <div className="mt-10 text-sm text-muted-foreground">
              By subscribing, you agree to receive product updates and marketing communications from us.
              You can unsubscribe at any time.
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Newsletter;
