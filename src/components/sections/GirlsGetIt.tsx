import React, { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

const TikTokIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .595.043.88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.1 20.14a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.14-.14z" />
  </svg>
);

const InstagramIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const CARDS = [
  {
    src: '/media/girls-1.mp4',
    poster: '/media/girls-1-poster.jpg',
    handle: '@minnyapparel',
    caption: 'coat check could never',
    order: 'order-2 sm:order-1',
  },
  {
    src: '/media/girls-2.mp4',
    poster: '/media/girls-2-poster.jpg',
    handle: '@minnyapparel',
    caption: 'wait for the flip',
    order: 'order-1 sm:order-2',
  },
  {
    src: '/media/girls-3.mp4?v=2',
    poster: '/media/girls-3-poster.jpg?v=2',
    handle: '@minnyapparel',
    caption: '12 degrees and unbothered',
    order: 'order-3 sm:order-3',
  },
];

const GirlsGetIt = () => {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [soundOn, setSoundOn] = useState<number | null>(null);

  const toggleSound = (i: number) => {
    const v = refs.current[i];
    if (!v) return;
    if (soundOn === i) {
      v.muted = true;
      setSoundOn(null);
      return;
    }
    refs.current.forEach((o, j) => { if (o && j !== i) o.muted = true; });
    v.currentTime = 0;
    v.muted = false;
    v.play().catch(() => {});
    setSoundOn(i);
  };

  return (
    <section id="use-cases" className="section-padding bg-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-6">
            <div className="tag inline-block mb-4">On your feed</div>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground mb-6">Girls get it</h2>
            <div className="flex items-center justify-center gap-6 text-white/80">
              <a
                href="https://www.tiktok.com/@minnyapparel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <TikTokIcon className="h-5 w-5" />
                <span className="font-medium">@minnyapparel</span>
              </a>
              <a
                href="https://www.instagram.com/minnyapparel/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />
                <span className="font-medium">@minnyapparel</span>
              </a>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-10 mt-12 max-w-5xl mx-auto">
          {CARDS.map((c, i) => (
            <AnimatedSection key={c.src} delay={i * 120} className={c.order}>
              <div className={`relative rounded-[28px] overflow-hidden bg-black border border-white/10 shadow-2xl aspect-[9/16] max-w-[320px] mx-auto`}>
                <video
                  ref={(el) => { refs.current[i] = el; }}
                  src={c.src}
                  poster={c.poster}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
                <button
                  type="button"
                  onClick={() => toggleSound(i)}
                  aria-label={soundOn === i ? 'Mute video' : 'Play with sound'}
                  className="absolute top-3 right-3 h-10 w-10 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-black/80 hover:text-primary transition-colors"
                >
                  {soundOn === i ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                </button>
                <div className="absolute bottom-0 inset-x-0 p-4 text-left">
                  <div className="text-white font-semibold">{c.handle}</div>
                  <div className="text-white/75 text-sm">{c.caption}</div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GirlsGetIt;
