
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen pt-24 pb-12 flex items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-stone-100 rounded-full opacity-50 blur-3xl animate-float"></div>
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-ivory-100 rounded-full opacity-40 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="tag mb-4 animate-pulse-subtle">Introducing</div>
            <h1 className="heading-xl mb-6">
              The Jacket That <span className="text-midnight-800">Transforms</span> Into a Purse
            </h1>
            <p className="body-lg text-stone-700 mb-8 max-w-xl">
              Never worry about coat check again. Our revolutionary puffer jacket transforms into a stylish leather purse in seconds, perfect for bars, concerts, and social events.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#" className="btn-primary flex items-center justify-center">
                Pre-Order Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#features" className="btn-secondary flex items-center justify-center">
                Learn More
              </a>
            </div>
            
            <div className="flex items-center mt-10 space-x-6">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-stone-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-stone-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-stone-500 border-2 border-white"></div>
              </div>
              <div className="text-sm text-stone-600">
                <span className="font-semibold">300+</span> 
                <span className="ml-1">early adopters</span>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 max-w-md mx-auto lg:max-w-none animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative">
              {/* Product image placeholder */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 shadow-lg">
                <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-midnight-400 rounded-lg shadow-lg flex items-center justify-center text-white font-medium">
                    Product Showcase
                  </div>
                </div>
              </div>
              
              {/* Accent elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-lg bg-taupe-500 opacity-80"></div>
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-midnight-300 opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
