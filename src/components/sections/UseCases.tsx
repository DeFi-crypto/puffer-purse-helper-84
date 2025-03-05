
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
            <p className="body-md text-stone-600 max-w-2xl mx-auto">
              Whether you're heading to a concert, bar-hopping with friends, or attending a social event, 
              our transformable jacket is designed to make your night out easier and more enjoyable.
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
              <div className="h-48 bg-stone-200 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  Concert Image Placeholder
                </div>
              </div>
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
              <div className="h-48 bg-stone-200 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  Bar Image Placeholder
                </div>
              </div>
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
              <div className="h-48 bg-stone-200 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  Event Image Placeholder
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
        
        <AnimatedSection>
          <div className="glass-panel p-8 md:p-12 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-8 md:mb-0 md:mr-12 md:w-1/2">
                <div className="tag mb-4">Testimonial</div>
                <h3 className="text-2xl font-semibold mb-4">What Our Early Users Say</h3>
                <div className="text-lg text-stone-700 italic">
                  "I've lost so many jackets at bars because I didn't want to carry them all night. 
                  This ingenious design has saved me money and added convenience to my social life."
                </div>
                <div className="mt-4 font-medium">— Samantha K., New York</div>
              </div>
              <div className="w-full md:w-1/2 bg-stone-200 rounded-xl h-64 flex items-center justify-center">
                <div>Testimonial Image Placeholder</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default UseCases;
