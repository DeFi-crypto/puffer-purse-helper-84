import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const STEPS = ['Unclip', 'Unfold', 'Zip up'];

const CHECKS = [
  { h: '700+ fill-power down', s: 'a real winter puffer, not a shell' },
  { h: 'Purse to puffer in 30 seconds', s: 'no practice, no instructions' },
  { h: 'Skip the coat check', s: 'nothing left at the bar, no line, no fee' },
];

/** Scroll progress -> video time. Middle "unfold" chunk runs faster. */
const mapProgress = (p: number) => {
  if (p <= 0.2) return (p / 0.2) * 0.15;
  if (p <= 0.55) return 0.15 + ((p - 0.2) / 0.35) * 0.6;
  return 0.75 + ((p - 0.55) / 0.45) * 0.25;
};

const Hero = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [frac, setFrac] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    let current = 0;
    let want = 0;
    let seeking = false;
    let primed = false;

    // Safari won't honour currentTime until the video has decoded once.
    const prime = () => {
      if (primed) return;
      primed = true;
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.then(() => video.pause()).catch(() => { primed = false; });
      } else {
        video.pause();
      }
    };
    prime();
    video.addEventListener('loadedmetadata', prime, { once: true });
    const touchPrime = () => prime();
    document.addEventListener('touchstart', touchPrime, { passive: true });

    const seek = (t: number) => {
      if (seeking) return;
      seeking = true;
      try { video.currentTime = t; } catch { seeking = false; }
    };
    const onSeeked = () => {
      seeking = false;
      if (Math.abs(video.currentTime - want) > 0.04) seek(want);
    };
    video.addEventListener('seeked', onSeeked);

    const tick = () => {
      const wrap = wrapRef.current;
      const dur = video.duration;
      if (wrap && dur && !Number.isNaN(dur)) {
        const rect = wrap.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
        const target = mapProgress(p);
        current += (target - current) * 0.25;
        if (Math.abs(target - current) < 0.002) current = target;
        want = current * dur;
        if (!seeking && Math.abs(video.currentTime - want) > 0.04) seek(want);
        setFrac(current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadedmetadata', prime);
      document.removeEventListener('touchstart', touchPrime);
    };
  }, []);

  const active = frac < 0.33 ? 0 : frac < 0.72 ? 1 : 2;

  return (
    // Tall wrapper drives the scrub; the inner panel stays pinned for one screen.
    <section id="how-it-works" ref={wrapRef} className="relative bg-black h-[200vh] sm:h-[220vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Background frame from the night-out video */}
        <div className="absolute inset-0">
          <img
            src="/media/hero-frame.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center scale-110 blur-[6px] brightness-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/90" />
        </div>

        <div className="container-custom relative z-10 h-full flex items-center pt-16 sm:pt-20 pb-6">
          <div className="grid w-full grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-12 items-center">
            {/* ---------- Copy ---------- */}
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/60 backdrop-blur px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-sm text-white/85 border border-white/10 mb-3 sm:mb-5">
                Made by cold college students
                <span className="text-white/40">—</span>
                <span className="text-primary font-medium">Patent Pending</span>
              </div>

              <h1 className="font-display text-white leading-[1.06] text-[1.9rem] sm:text-5xl xl:text-6xl mb-2.5 sm:mb-4">
                Stay warm on the way.
                <br />
                Stay <span className="text-primary">cute</span> all night.
              </h1>

              <p className="text-white/80 text-[14px] sm:text-base xl:text-lg max-w-lg mb-4 sm:mb-5">
                Minny is a purse that unfolds into a real puffer jacket. Wear it there,
                clip it up inside — no coat check, nothing left behind.
              </p>

              <ul className="space-y-1.5 sm:space-y-2.5 mb-5 sm:mb-6">
                {CHECKS.map((c) => (
                  <li key={c.h} className="flex items-center gap-2.5 text-white text-[14px] sm:text-base">
                    <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-primary text-black">
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={3} />
                    </span>
                    <span>
                      <span className="font-semibold">{c.h}</span>
                      <span className="text-white/60"> — {c.s}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-row flex-wrap gap-3">
                <Link
                  to="/pre-order"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-black font-semibold px-6 sm:px-8 h-11 sm:h-14 text-[15px] sm:text-base hover:bg-primary/90 transition-colors shadow-[0_0_28px_rgba(51,242,160,0.35)]"
                >
                  Pre-Order — $179.99
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-primary/60 text-primary px-6 sm:px-8 h-11 sm:h-14 text-[15px] sm:text-base hover:bg-primary/10 transition-colors"
                >
                  Why it's warm
                </a>
              </div>
              <div className="mt-3 text-[12px] sm:text-[13px] text-white/55">
                Free US shipping · Full refund any time before it ships · Secure checkout by Stripe
              </div>
            </div>

            {/* ---------- Scroll-scrubbed product video ---------- */}
            <div className="animate-fade-up">
              <div className="rounded-2xl sm:rounded-3xl bg-[#0f0f0f]/80 backdrop-blur border border-white/10 p-3 sm:p-4 shadow-2xl">
                <div className="flex items-center justify-between mb-2 sm:mb-3 px-1">
                  <div className="font-display text-white text-base sm:text-xl">
                    Purse to puffer in <span className="text-primary">30 seconds</span>
                  </div>
                  <div className="hidden sm:block text-[11px] tracking-[0.18em] uppercase text-white/45">
                    Scroll to play
                  </div>
                </div>
                <div className="rounded-xl sm:rounded-2xl bg-[#EDEDE7] overflow-hidden">
                  <video
                    ref={videoRef}
                    src="/media/scrub.mp4"
                    poster="/media/scrub-poster.jpg"
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-auto max-h-[34vh] sm:max-h-[44vh] lg:max-h-[52vh] object-contain"
                  />
                </div>
                <div className="mt-2.5 sm:mt-3 px-1">
                  <div className="flex items-center justify-between sm:justify-center gap-3 sm:gap-10">
                    {STEPS.map((s, idx) => (
                      <div
                        key={s}
                        className={`flex items-baseline gap-1.5 text-[13px] sm:text-sm transition-colors duration-300 ${
                          active === idx ? 'text-primary' : 'text-white/45'
                        }`}
                      >
                        <span className="font-display text-[11px] sm:text-xs">{String(idx + 1).padStart(2, '0')}</span>
                        <span className={`font-semibold ${active === idx ? 'text-white' : ''}`}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${Math.round(frac * 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
