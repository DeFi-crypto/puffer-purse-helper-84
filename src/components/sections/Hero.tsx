
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
    // Scroll to newsletter section instead of redirecting
    const newsletterSection = document.getElementById('newsletter');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    }
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
              From the University of Minnesota, Minny is reinventing winter wear with our transformable puffer jacket. 
              A purse that transforms into a coat—perfect for concerts, bars, and social events. Never worry about coat check again with our innovative winter coat that turns into a purse for going out with storage.
            </p>
            <p className="body-md text-muted-foreground mb-8 max-w-xl">
              Experience the future of convertible outerwear. Our coat that turns into a bag offers the perfect solution for Minnesota winters and social events. This purse with storage for going out turns into a winter coat to keep you warm when you need it most. Whether you're heading to a concert or bar-hopping with friends, our coat purse hybrid provides unmatched convenience and style.
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
          </div>
          
          <div className="order-1 lg:order-2 max-w-md mx-auto lg:max-w-none animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative">
              {/* Product image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-lg">
                <img 
                  src="/lovable-uploads/d9d5597b-edb6-4a76-b148-90abf928a78d.png" 
                  alt="Puffer jacket that transforms into purse" 
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
