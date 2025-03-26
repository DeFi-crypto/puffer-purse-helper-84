
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
      
      const response = await fetch(`${supabase.functions.url}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe');
      }
      
      setEmail('');
      setIsSubscribed(true);
      toast.success(result.message || 'You have been successfully subscribed!');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="section-padding bg-stone-50 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-taupe-100 rounded-full opacity-60 blur-3xl"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-midnight-100 rounded-full opacity-40 blur-3xl"></div>
      
      <div className="container-custom max-w-5xl relative z-10">
        <AnimatedSection>
          <div className="glass-panel p-8 md:p-16 rounded-2xl text-center">
            <div className="tag mb-4 inline-block">Stay Updated</div>
            <h2 className="heading-md mb-6">Be The First To Know</h2>
            <p className="body-md text-stone-600 max-w-2xl mx-auto mb-8">
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
                      className="pr-14 h-12 border-stone-200 focus:border-taupe-500 transition-all duration-300"
                      disabled={isSubmitting}
                    />
                    <Button 
                      type="submit" 
                      size="icon"
                      className="absolute right-1 top-1 bg-taupe-800 hover:bg-taupe-700 h-10 w-10 rounded-md flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-taupe-800">
                <Send className="h-5 w-5" />
                <span>Thank you for subscribing!</span>
              </div>
            )}
            
            <div className="mt-10 text-sm text-stone-500">
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
