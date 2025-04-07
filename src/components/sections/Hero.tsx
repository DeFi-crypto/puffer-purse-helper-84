
import React, { useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePreOrder = () => {
    // Redirect to Stripe checkout
    window.location.href = 'https://checkout.stripe.com/c/pay/cs_test_a1aBCdEfGHiJKlMNOpQRstUv';
    
    // Note: In production, you would replace the URL above with your real Stripe checkout session URL
    // It's best to create this session dynamically on your server for each order
  };

  const handleSubscribe = async (e: React.FormEvent) => {
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
      toast.success(data?.message || 'Successfully subscribed!');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-12 flex items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full opacity-30 blur-3xl animate-float"></div>
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-secondary/20 rounded-full opacity-30 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="tag mb-4 animate-pulse-subtle">Introducing</div>
            <h1 className="heading-xl mb-6">
              The Jacket That <span className="text-primary">Transforms</span> Into a Purse
            </h1>
            <p className="body-lg text-muted-foreground mb-8 max-w-xl">
              Never worry about coat check again. Our revolutionary puffer jacket transforms into a stylish leather purse in seconds, perfect for bars, concerts, and social events.
            </p>
            
            {/* Email subscription form */}
            <form onSubmit={handleSubscribe} className="mb-8">
              <div className="relative max-w-xl">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for updates"
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
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button 
                onClick={handlePreOrder}
                className="btn-primary flex items-center justify-center"
              >
                Pre-Order Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <a href="#features" className="btn-secondary flex items-center justify-center">
                Learn More
              </a>
            </div>
            
            <div className="flex items-center mt-10 space-x-6">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-black/50 border-2 border-primary/30"></div>
                <div className="w-8 h-8 rounded-full bg-black/60 border-2 border-primary/30"></div>
                <div className="w-8 h-8 rounded-full bg-black/70 border-2 border-primary/30"></div>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold">300+</span> 
                <span className="ml-1">early adopters</span>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 max-w-md mx-auto lg:max-w-none animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative">
              {/* Product image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-lg">
                <img 
                  src="/lovable-uploads/d9d5597b-edb6-4a76-b148-90abf928a78d.png" 
                  alt="Minny Transformable Jacket" 
                  className="w-full h-full object-contain p-4"
                />
              </div>
              
              {/* Accent elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-lg bg-secondary opacity-70"></div>
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-primary opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
