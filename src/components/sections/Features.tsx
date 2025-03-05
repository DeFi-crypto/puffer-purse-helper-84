
import React from 'react';
import { ArrowDownRight, Sparkles, Leaf, Clock } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import ProductTransform from '../ui/ProductTransform';

const Features = () => {
  return (
    <section id="features" className="section-padding bg-stone-50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-taupe-100 rounded-full opacity-70 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ivory-100 rounded-full opacity-50 blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="tag inline-block mb-4">Revolutionary Design</div>
            <h2 className="heading-lg mb-6">One Product, Two Functions</h2>
            <p className="body-md text-stone-600 max-w-2xl mx-auto">
              Our innovative design allows you to transform your winter puffer jacket into a 
              stylish leather purse in seconds. Experience the perfect blend of functionality and fashion.
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <AnimatedSection direction="left" className="order-2 lg:order-1">
            <div className="space-y-8">
              <div className="glass-panel p-6">
                <div className="flex items-start">
                  <div className="bg-taupe-800 text-white p-3 rounded-xl mr-4">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Seamless Transformation</h3>
                    <p className="text-stone-600">
                      Transform your jacket into a purse in under 30 seconds with our 
                      intuitive design. No complex folding or extra steps required.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="glass-panel p-6">
                <div className="flex items-start">
                  <div className="bg-midnight-800 text-white p-3 rounded-xl mr-4">
                    <Leaf size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Premium Materials</h3>
                    <p className="text-stone-600">
                      Crafted with sustainable, high-quality materials that provide warmth 
                      when worn as a jacket and elegance when carried as a purse.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="glass-panel p-6">
                <div className="flex items-start">
                  <div className="bg-taupe-600 text-white p-3 rounded-xl mr-4">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">All-Night Convenience</h3>
                    <p className="text-stone-600">
                      Never worry about coat check again. Keep your essentials secure and 
                      your hands free while staying warm to and from venues.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection direction="right" className="order-1 lg:order-2">
            <ProductTransform />
          </AnimatedSection>
        </div>
        
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 glass-panel hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-midnight-800 mb-2">30s</div>
              <p className="text-stone-600">Transform Time</p>
            </div>
            
            <div className="text-center p-8 glass-panel hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-taupe-800 mb-2">5+</div>
              <p className="text-stone-600">Color Options</p>
            </div>
            
            <div className="text-center p-8 glass-panel hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-midnight-800 mb-2">100%</div>
              <p className="text-stone-600">Convenience</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Features;
