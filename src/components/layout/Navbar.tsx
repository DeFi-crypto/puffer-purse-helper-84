
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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass-nav py-3' : 'py-5'
      )}
    >
      <div className="container-custom flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img 
            src="/lovable-uploads/26bf3933-f082-41d8-9f43-d6fd9fc0c29d.png" 
            alt="Minny Logo" 
            className="h-10 md:h-12"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <a 
            href="#features" 
            className="text-taupe-800 hover:text-taupe-600 transition-colors"
          >
            Features
          </a>
          <a 
            href="#use-cases" 
            className="text-taupe-800 hover:text-taupe-600 transition-colors"
          >
            Use Cases
          </a>
          <a 
            href="#newsletter" 
            className="text-taupe-800 hover:text-taupe-600 transition-colors"
          >
            Updates
          </a>
          <a 
            href="#" 
            className="btn-primary"
          >
            Pre-Order Now
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 transform transition-transform duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/26bf3933-f082-41d8-9f43-d6fd9fc0c29d.png" 
            alt="Minny Logo" 
            className="h-10"
          />
        </div>
        <nav className="flex flex-col space-y-6 text-lg">
          <a 
            href="#features" 
            className="text-taupe-800 hover:text-taupe-600 transition-colors py-2 border-b border-stone-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#use-cases" 
            className="text-taupe-800 hover:text-taupe-600 transition-colors py-2 border-b border-stone-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Use Cases
          </a>
          <a 
            href="#newsletter" 
            className="text-taupe-800 hover:text-taupe-600 transition-colors py-2 border-b border-stone-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Updates
          </a>
          <a 
            href="#" 
            className="btn-primary text-center mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pre-Order Now
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
