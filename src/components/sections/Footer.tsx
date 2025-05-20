
import React from 'react';
import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-primary neon-text">Minny</h2>
            <p className="text-gray-300 max-w-md">
              Revolutionizing winter wear with our innovative transformable jacket to purse design.
              Never worry about coat check again.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://www.instagram.com/minnyapparel/" 
                className="text-primary hover:text-primary/80 transition-colors" 
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-300 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#use-cases" className="text-gray-300 hover:text-primary transition-colors">Use Cases</a></li>
              <li><a href="#newsletter" className="text-gray-300 hover:text-primary transition-colors">Updates</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">contact@minnyapparel.com</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Minny. All rights reserved.
          </div>
          <div>
            <img 
              src="/lovable-uploads/bd4c449a-9276-43e2-b2ef-de88c03e2a85.png" 
              alt="Minnesota Cup 2025 Semifinalist" 
              className="h-16 md:h-16" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
