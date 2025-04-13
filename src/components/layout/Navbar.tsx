
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePreOrder = () => {
    // Redirect to Stripe checkout
    window.location.href = 'https://checkout.stripe.com/c/pay/cs_test_a1aBCdEfGHiJKlMNOpQRstUv';
    
    // Note: In production, you would replace the URL above with your real Stripe checkout session URL
    // It's best to create this session dynamically on your server for each order
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass-nav py-3' : 'py-5 bg-transparent'
      )}
    >
      <div className="container-custom flex justify-between items-center">
        <a href="#" className="flex items-center" aria-label="Minny - University of Minnesota startup">
          <img 
            src="/lovable-uploads/9575f4c8-b4b8-46cc-9487-939b865fc223.png" 
            alt="Minny Logo - Transformable jacket to purse" 
            className="h-10 md:h-12 neon-text"
          />
        </a>

        <nav className="hidden md:flex space-x-8 items-center">
          <a 
            href="#features" 
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Features
          </a>
          <a 
            href="#use-cases" 
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Use Cases
          </a>
          <a 
            href="#faq" 
            className="text-primary hover:text-primary/80 transition-colors"
          >
            FAQ
          </a>
          <a 
            href="#newsletter" 
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Updates
          </a>
          <button 
            onClick={handlePreOrder} 
            className="btn-primary"
          >
            Pre-Order Now
          </button>
        </nav>

        <button 
          className="md:hidden text-primary"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          'fixed inset-0 bg-background z-40 flex flex-col pt-24 px-6 transform transition-transform duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/9575f4c8-b4b8-46cc-9487-939b865fc223.png" 
            alt="Minny Logo - Transformable jacket to purse" 
            className="h-10"
          />
        </div>
        <nav className="flex flex-col space-y-6 text-lg">
          <a 
            href="#features" 
            className="text-primary hover:text-primary/80 transition-colors py-2 border-b border-muted"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#use-cases" 
            className="text-primary hover:text-primary/80 transition-colors py-2 border-b border-muted"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Use Cases
          </a>
          <a 
            href="#faq" 
            className="text-primary hover:text-primary/80 transition-colors py-2 border-b border-muted"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            FAQ
          </a>
          <a 
            href="#newsletter" 
            className="text-primary hover:text-primary/80 transition-colors py-2 border-b border-muted"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Updates
          </a>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              handlePreOrder();
            }} 
            className="btn-primary text-center mt-4"
          >
            Pre-Order Now
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
