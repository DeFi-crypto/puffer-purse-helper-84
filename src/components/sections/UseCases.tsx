
import React from 'react';
import { Music, Wine, Star } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

const UseCases = () => {
  return (
    <section id="use-cases" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-stone-100 rounded-full opacity-50 blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="tag mb-4">Perfect For</div>
            <h2 className="heading-lg mb-6">For Your Social Lifestyle</h2>
            <p className="body-md text-stone-600 max-w-2xl mx-auto mb-4">
              Whether you're heading to a concert, bar-hopping with friends, or attending a social event, 
              our transformable jacket is designed to make your night out easier and more enjoyable. This stylish winter coat for concerts and social events eliminates the hassle of coat check lines and lost jackets.
            </p>
            <p className="body-md text-stone-600 max-w-2xl mx-auto">
              Our coat to bag design means you'll never have to choose between staying warm and traveling light. Perfect for Minnesota winters and the active social scene around the University of Minnesota, this coat purse hybrid keeps you comfortable outdoors and hands-free indoors. The transforming winter jacket is ideal for anyone who loves going out but hates dealing with bulky coats at venues.
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <AnimatedSection delay={100}>
            <div className="glass-panel p-8 h-full hover:shadow-md transition-all duration-300">
              <div className="bg-midnight-800 text-white p-4 inline-flex rounded-xl mb-6">
                <Music size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Concerts & Shows</h3>
              <p className="text-stone-600 mb-6">
                Stay warm on your way to the venue, then transform your jacket into a purse 
                once inside. No more sweating during performances or losing your coat at the venue.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <div className="glass-panel p-8 h-full hover:shadow-md transition-all duration-300">
              <div className="bg-taupe-800 text-white p-4 inline-flex rounded-xl mb-6">
                <Wine size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Bars & Nightlife</h3>
              <p className="text-stone-600 mb-6">
                Never deal with overcrowded coat checks again. Transform your jacket into a stylish 
                purse that complements your outfit while keeping your essentials secure.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={300}>
            <div className="glass-panel p-8 h-full hover:shadow-md transition-all duration-300">
              <div className="bg-midnight-600 text-white p-4 inline-flex rounded-xl mb-6">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Social Events</h3>
              <p className="text-stone-600 mb-6">
                From gallery openings to dinner parties, make transitions between outdoor and indoor 
                spaces seamless while maintaining your aesthetic with our transformable design.
              </p>
            </div>
          </AnimatedSection>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="glass-panel p-8 md:p-12 rounded-2xl">
              <div className="flex flex-col">
                <div className="mb-8">
                  <div className="tag mb-4">Testimonial</div>
                  <h3 className="text-2xl font-semibold mb-4">What Our Early Users Say</h3>
                  <div className="text-lg text-stone-700 italic">
                    "I've lost so many jackets at bars because I didn't want to carry them all night. 
                    This ingenious design has saved me money and added convenience to my social life."
                  </div>
                  <div className="mt-4 font-medium">— Anonymous</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <div className="glass-panel p-8 md:p-12 rounded-2xl">
              <div className="flex flex-col">
                <div className="mb-8">
                  <div className="tag mb-4">Testimonial</div>
                  <h3 className="text-2xl font-semibold mb-4">More User Feedback</h3>
                  <div className="text-lg text-stone-700 italic">
                    "The Minny jacket is a game-changer for city life. I no longer have to choose between 
                    being cold or carrying my bulky coat around all night. Absolute genius!"
                  </div>
                  <div className="mt-4 font-medium">— Anonymous</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
