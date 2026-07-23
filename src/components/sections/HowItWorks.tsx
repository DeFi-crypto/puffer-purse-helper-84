import React, { useEffect, useRef, useState } from 'react';

const STEPS = ['Unclip', 'Unfold', 'Zip up'];

/** Map scroll progress -> video time fraction.
 *  Middle "unfold" chunk covers more video per scroll (feels faster),
 *  intro + ending run at a calmer pace. */
const mapProgress = (p: number) => {
  if (p <= 0.2) return (p / 0.2) * 0.15;
  if (p <= 0.55) return 0.15 + ((p - 0.2) / 0.35) * 0.6;
  return 0.75 + ((p - 0.55) / 0.45) * 0.25;
};

const HowItWorks = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [frac, setFrac] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let raf = 0;
    let current = 0;

    const tick = () => {
      const wrap = wrapRef.current;
      if (wrap && video.duration) {
        const rect = wrap.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
        const target = mapProgress(p);
        // smooth toward target for buttery scrubbing (esp. mobile)
        current += (target - current) * 0.3;
        if (Math.abs(target - current) < 0.002) current = target;
        const t = current * video.duration;
        if (Math.abs(video.currentTime - t) > 0.01) {
          try { video.currentTime = t; } catch { /* not seekable yet */ }
        }
        setFrac(current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const active = frac < 0.33 ? 0 : frac < 0.72 ? 1 : 2;

  return (
    <section id="how-it-works" ref={wrapRef} className="relative bg-background" style={{ height: '280vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        <div className="inline-block rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm text-white/70 mb-4">
          How it works
        </div>
        <h2 className="font-display text-3xl sm:text-5xl text-foreground text-center mb-8">
          Purse to puffer in <span className="text-primary">30 seconds</span>
        </h2>

        <div className="relative w-full max-w-2xl">
          <div className="rounded-3xl bg-[#EDEDE7] overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              src="/media/scrub.mp4"
              poster="/media/scrub-poster.jpg"
              muted
              playsInline
              preload="auto"
              className="w-full h-auto max-h-[56vh] object-contain"
            />
          </div>
          {/* decorative brand shapes */}
          <div className="absolute -top-5 -right-5 w-14 h-14 rounded-full bg-primary opacity-90 hidden sm:block" />
          <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-2xl bg-secondary opacity-80 hidden sm:block" />
        </div>

        <div className="mt-8 w-full max-w-2xl px-2">
          <div className="flex items-center justify-center gap-8 sm:gap-14">
            {STEPS.map((s, idx) => (
              <div key={s} className={`flex items-baseline gap-2 transition-colors duration-300 ${active === idx ? 'text-primary' : 'text-muted-foreground'}`}>
                <span className="font-display text-sm">{String(idx + 1).padStart(2, '0')}</span>
                <span className={`font-semibold ${active === idx ? 'text-foreground' : ''}`}>{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${Math.round(frac * 100)}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
