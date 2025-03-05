
import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      toast.success('You have been successfully subscribed!');
    }, 1500);
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
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="px-4 py-3 rounded-md flex-grow border border-stone-200 focus:outline-none focus:ring-2 focus:ring-taupe-500"
                  />
                  <button 
                    type="submit" 
                    className="btn-primary flex-shrink-0 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Subscribing...</span>
                    ) : (
                      <>
                        Subscribe <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-taupe-800">
                <Check className="h-5 w-5" />
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
