import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-black">
      {/* Background frame from the night-out video */}
      <div className="absolute inset-0">
        <img
          src="/media/hero-frame.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center scale-110 blur-[6px] brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/85" />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-10 sm:py-28 md:py-32">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/60 backdrop-blur px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-sm text-white/85 border border-white/10 mb-4 sm:mb-6">
            Made by cold college students
            <span className="text-white/40">—</span>
            <span className="text-primary font-medium">Patent Pending</span>
          </div>

          <h1 className="font-display text-white leading-[1.06] text-[2rem] sm:text-6xl lg:text-7xl mb-3 sm:mb-6">
            Stay warm on the way.
            <br />
            Stay <span className="text-primary">cute</span> all night.
          </h1>

          <p className="text-white/80 text-[15px] sm:text-lg md:text-xl max-w-xl mb-5 sm:mb-9">
            Minny is a purse that unfolds into a real puffer jacket. Wear it there,
            clip it up inside — no coat check, nothing left behind.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/pre-order"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-black font-semibold px-8 h-12 sm:h-14 text-[15px] sm:text-base hover:bg-primary/90 transition-colors shadow-[0_0_28px_rgba(51,242,160,0.35)]"
            >
              Pre-Order Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-primary/60 text-primary px-8 h-12 sm:h-14 text-[15px] sm:text-base hover:bg-primary/10 transition-colors"
            >
              See How It Works
            </a>
          </div>

          {/* quick benefits — visible on the first screen */}
          <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-white/70 text-[12px] sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> 30s transform
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> No coat check
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Real Minnesota warmth
            </span>
          </div>

          <div className="mt-6 sm:mt-10 hidden sm:flex items-center gap-3 text-white/50 text-xs tracking-[0.18em] uppercase">
            <ArrowDown className="h-4 w-4" />
            Scroll — the purse does a trick
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
