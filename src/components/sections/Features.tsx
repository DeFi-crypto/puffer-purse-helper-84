import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';

const ITEMS = [
  {
    n: '01',
    t: 'Real Minnesota warmth',
    d: 'A true puffer, not a gimmick — built for the walk from Dinkytown in January.',
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
      <div className="container-custom py-20 md:py-28">
        <AnimatedSection>
          <h2 className="font-display text-4xl sm:text-5xl mb-3">Made for the whole night</h2>
          <p className="text-[#4a4a4a] text-lg mb-14">The walk there, the hours inside, and the walk home.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
            {ITEMS.map((it, i) => (
              <AnimatedSection key={it.n} delay={i * 100}>
                <div>
                  <div className="font-display text-4xl text-[#22cf87] mb-3">{it.n}</div>
                  <h3 className="text-xl font-semibold mb-2">{it.t}</h3>
                  <p className="text-[#4a4a4a]">{it.d}</p>
                </div>
              </AnimatedSection>
            ))}
            <AnimatedSection delay={300}>
              <div className="flex flex-col justify-end gap-4 h-full">
                <div className="rounded-2xl bg-[#0a0a0a] text-center py-6 px-4">
                  <div className="font-display text-3xl text-primary mb-1">30s</div>
                  <div className="text-white/60 text-sm">Transform Time</div>
                </div>
                <div className="rounded-2xl bg-[#0a0a0a] text-center py-6 px-4">
                  <div className="font-display text-3xl text-[#ff5d9e] mb-1">100%</div>
                  <div className="text-white/60 text-sm">Convenience</div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection direction="right">
            <div className="relative max-w-sm mx-auto">
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
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-primary opacity-90" />
              <div className="absolute -bottom-5 -right-5 w-14 h-14 rounded-2xl bg-secondary opacity-80" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Features;
