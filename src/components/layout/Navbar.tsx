import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
          <a href="#how-it-works" className="text-primary hover:text-primary/80 transition-colors">How It Works</a>
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
            Nights Out
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
          <Link to="/pre-order" className="btn-primary">
            Pre-Order Now
          </Link>
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
          <div className="fixed top-20 left-0 right-0 z-40 md:hidden">
            <div className="mx-4 bg-black/90 backdrop-blur-md rounded-lg border border-primary/20 shadow-xl">
              <nav className="flex flex-col space-y-4 text-lg px-6 py-8">
                <a 
                  href="#features" 
                  className="text-primary hover:text-primary/80 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#use-cases" 
                  className="text-primary hover:text-primary/80 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Use Cases
                </a>
                <a 
                  href="#faq" 
                  className="text-primary hover:text-primary/80 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </a>
                <a 
                  href="#newsletter" 
                  className="text-primary hover:text-primary/80 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Updates
                </a>
                <Link to="/pre-order" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary text-center mt-4">
                  Pre-Order Now
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;

