import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';

const ITEMS = [
  {
    n: '01',
    t: 'Real Minnesota warmth',
    d: '700-fill puffer insulation and a wind-blocking shell — built for the walk from Dinkytown in January, not a fashion-only layer.',
  },
  {
    n: '02',
    t: 'Fits your essentials',
    d: 'Phone, wallet, keys, lip gloss — zipped up and on your shoulder.',
  },
  {
    n: '03',
    t: 'Nothing to lose',
    d: 'No coat check line, no jacket forgotten at the bar, no cover fee for warmth.',
  },
];

const Features = () => {
  return (
    <section id="features" className="relative overflow-hidden bg-[#EDEDE7] text-[#0a0a0a]">
      <div className="container-custom py-12 md:py-16">
        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-5xl mb-2">Made for the whole night</h2>
          <p className="text-[#4a4a4a] text-base sm:text-lg mb-8 md:mb-10">The walk there, the hours inside, and the walk home.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
            {ITEMS.map((it, i) => (
              <AnimatedSection key={it.n} delay={i * 100}>
                <div>
                  <div className="font-display text-3xl text-[#22cf87] mb-1.5">{it.n}</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1.5">{it.t}</h3>
                  <p className="text-[#4a4a4a] text-sm sm:text-base">{it.d}</p>
                </div>
              </AnimatedSection>
            ))}
            <AnimatedSection delay={300}>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 h-full content-end">
                <div className="rounded-2xl bg-[#0a0a0a] text-center py-4 px-3">
                  <div className="font-display text-2xl sm:text-3xl text-primary mb-0.5">30s</div>
                  <div className="text-white/60 text-xs sm:text-sm">Transform Time</div>
                </div>
                <div className="rounded-2xl bg-[#0a0a0a] text-center py-4 px-3">
                  <div className="font-display text-2xl sm:text-3xl text-[#ff5d9e] mb-0.5">700</div>
                  <div className="text-white/60 text-xs sm:text-sm">Fill Power</div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection direction="right">
            <div className="relative max-w-[280px] sm:max-w-sm mx-auto">
              <div className="rounded-3xl overflow-hidden bg-black shadow-2xl aspect-[9/16]">
                <video
                  src="/media/transform.mp4"
                  poster="/media/transform-poster.jpg"
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary opacity-90" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl bg-secondary opacity-80" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Features;
