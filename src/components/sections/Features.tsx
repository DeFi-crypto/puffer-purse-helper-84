
import React from 'react';
import { ArrowDownRight, Sparkles, Leaf, Clock } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import ProductTransform from '../ui/ProductTransform';

const Features = () => {
  return (
    <section id="features" className="section-padding bg-background relative overflow-hidden">
      {/* Background accents - removed */}
      
      <div className="container-custom relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="tag inline-block mb-4">Revolutionary Design</div>
            <h2 className="heading-lg mb-6 text-foreground">One Product, Two Functions</h2>
            <p className="body-md text-muted-foreground max-w-2xl mx-auto">
              Our innovative design allows you to transform your winter puffer jacket into a 
              stylish leather purse in seconds. Experience the perfect blend of functionality and fashion.
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <AnimatedSection direction="left" className="order-2 lg:order-1">
            <div className="space-y-8">
              <div className="glass-panel p-6 border border-primary/30 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start">
                  <div className="bg-black text-primary p-3 rounded-xl mr-4 neon-box">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Seamless Transformation</h3>
                    <p className="text-muted-foreground">
                      Transform your jacket into a purse in under 30 seconds with our 
                      intuitive design. No complex folding or extra steps required.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="glass-panel p-6 border border-secondary/30 hover:border-secondary/50 transition-all duration-300">
                <div className="flex items-start">
                  <div className="bg-black text-secondary p-3 rounded-xl mr-4 neon-box">
                    <Leaf size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Premium Materials</h3>
                    <p className="text-muted-foreground">
                      Crafted with sustainable, high-quality materials that provide warmth 
                      when worn as a jacket and elegance when carried as a purse.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="glass-panel p-6 border border-accent/30 hover:border-accent/50 transition-all duration-300">
                <div className="flex items-start">
                  <div className="bg-black text-accent p-3 rounded-xl mr-4 neon-box">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">All-Night Convenience</h3>
                    <p className="text-muted-foreground">
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
            <div className="text-center p-8 glass-panel border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-primary mb-2">30s</div>
              <p className="text-muted-foreground">Transform Time</p>
            </div>
            
            <div className="text-center p-8 glass-panel border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-secondary mb-2">5+</div>
              <p className="text-muted-foreground">Color Options</p>
            </div>
            
            <div className="text-center p-8 glass-panel border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-accent mb-2">100%</div>
              <p className="text-muted-foreground">Convenience</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Features;
