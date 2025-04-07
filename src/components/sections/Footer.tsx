
import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-primary neon-text">TRANSFORM</h2>
            <p className="text-gray-300 max-w-md">
              Revolutionizing winter wear with our innovative transformable jacket to purse design.
              Never worry about coat check again.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-primary hover:text-primary/80 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors" aria-label="Email">
                <Mail size={20} />
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
              <li className="text-gray-300">support@transform.com</li>
              <li className="text-gray-300">+1 (555) 123-4567</li>
              <li className="text-gray-300">123 Fashion Ave, New York, NY</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Transform. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
