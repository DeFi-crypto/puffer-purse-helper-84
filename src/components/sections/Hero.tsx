import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
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

      <div className="container-custom relative z-10 py-28 md:py-32">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur px-4 py-2 text-sm text-white/85 border border-white/10 mb-6">
            Made by cold college students
            <span className="text-white/40">—</span>
            <span className="text-primary font-medium">Patent Pending</span>
          </div>

          <h1 className="font-display text-white leading-[1.04] text-[2.6rem] sm:text-6xl lg:text-7xl mb-6">
            Stay warm on the way.
            <br />
            Stay <span className="text-primary">cute</span> all night.
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-xl mb-9">
            Minny is a purse that unfolds into a real puffer jacket. Wear it there,
            clip it up inside — no coat check, nothing left behind.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/pre-order"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-black font-semibold px-8 h-14 text-base hover:bg-primary/90 transition-colors shadow-[0_0_28px_rgba(51,242,160,0.35)]"
            >
              Pre-Order Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-primary/60 text-primary px-8 h-14 text-base hover:bg-primary/10 transition-colors"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-14 flex items-center gap-3 text-white/50 text-xs tracking-[0.18em] uppercase">
            <ArrowDown className="h-4 w-4" />
            Scroll — the purse does a trick
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
