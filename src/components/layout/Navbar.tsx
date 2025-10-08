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
    const newsletterSection = document.getElementById('newsletter');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    }
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
          className="md:hidden text-primary z-50 relative"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu content */}
          <div className="fixed inset-0 z-40 flex items-center justify-center md:hidden pointer-events-none">
            <div className="w-full max-w-md pointer-events-auto">
              <div className="flex justify-center mb-8">
                <img 
                  src="/lovable-uploads/9575f4c8-b4b8-46cc-9487-939b865fc223.png" 
                  alt="Minny Logo - Transformable jacket to purse" 
                  className="h-10"
                />
              </div>
              <nav className="flex flex-col space-y-6 text-lg px-6">
                <a 
                  href="#features" 
                  className="text-primary hover:text-primary/80 transition-colors py-2 border-b border-muted text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#use-cases" 
                  className="text-primary hover:text-primary/80 transition-colors py-2 border-b border-muted text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Use Cases
                </a>
                <a 
                  href="#faq" 
                  className="text-primary hover:text-primary/80 transition-colors py-2 border-b border-muted text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </a>
                <a 
                  href="#newsletter" 
                  className="text-primary hover:text-primary/80 transition-colors py-2 border-b border-muted text-center"
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
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
