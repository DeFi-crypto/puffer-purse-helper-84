import React, { useEffect, useRef, useState } from 'react';

const STEPS = ['Unclip', 'Unfold', 'Zip up'];

/** Map scroll progress -> video time fraction. */
const mapProgress = (p: number) => {
  if (p <= 0.2) return (p / 0.2) * 0.15;
  if (p <= 0.55) return 0.15 + ((p - 0.2) / 0.35) * 0.6;
  return 0.75 + ((p - 0.55) / 0.45) * 0.25;
};

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(hover: none)').matches || window.innerWidth < 768);

const HowItWorks = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [frac, setFrac] = useState(0);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const set = () => setTouch(isTouchDevice());
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  /* Mobile / touch: plain autoplay loop (frame seeking is unreliable on iOS) */
  useEffect(() => {
    if (!touch) return;
    const video = videoRef.current;
    if (!video) return;

    const onTime = () => {
      if (video.duration) setFrac(video.currentTime / video.duration);
    };
    video.addEventListener('timeupdate', onTime);

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);

    const kick = () => video.play().catch(() => {});
    document.addEventListener('touchstart', kick, { once: true, passive: true });

    return () => {
      video.removeEventListener('timeupdate', onTime);
      io.disconnect();
      document.removeEventListener('touchstart', kick);
    };
  }, [touch]);

  /* Desktop: scroll-scrub */
  useEffect(() => {
    if (touch) return;
    const video = videoRef.current;
    if (!video) return;

    video.play().then(() => video.pause()).catch(() => {});

    let raf = 0;
    let current = 0;

    const tick = () => {
      const wrap = wrapRef.current;
      if (wrap && video.duration) {
        const rect = wrap.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
        const target = mapProgress(p);
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
  }, [touch]);

  const active = frac < 0.33 ? 0 : frac < 0.72 ? 1 : 2;

  return (
    <section
      id="how-it-works"
      ref={wrapRef}
      className="relative bg-background"
      style={touch ? undefined : { height: '280vh' }}
    >
      <div
        className={
          touch
            ? 'flex flex-col items-center justify-center px-4 py-14'
            : 'sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4'
        }
      >
        <div className="inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs sm:text-sm text-white/70 mb-3 sm:mb-4">
          How it works
        </div>
        <h2 className="font-display text-2xl sm:text-5xl text-foreground text-center mb-5 sm:mb-8">
          Purse to puffer in <span className="text-primary">30 seconds</span>
        </h2>

        <div className="relative w-full max-w-2xl">
          <div className="rounded-2xl sm:rounded-3xl bg-[#EDEDE7] overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              src="/media/scrub.mp4"
              poster="/media/scrub-poster.jpg"
              muted
              playsInline
              loop={touch}
              autoPlay={touch}
              preload="auto"
              className="w-full h-auto max-h-[42vh] sm:max-h-[56vh] object-contain"
            />
          </div>
          <div className="absolute -top-5 -right-5 w-14 h-14 rounded-full bg-primary opacity-90 hidden sm:block" />
          <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-2xl bg-secondary opacity-80 hidden sm:block" />
        </div>

        <div className="mt-5 sm:mt-8 w-full max-w-2xl px-2">
          <div className="flex items-center justify-center gap-5 sm:gap-14">
            {STEPS.map((s, idx) => (
              <div
                key={s}
                className={`flex items-baseline gap-1.5 sm:gap-2 text-sm sm:text-base transition-colors duration-300 ${
                  active === idx ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <span className="font-display text-xs sm:text-sm">{String(idx + 1).padStart(2, '0')}</span>
                <span className={`font-semibold ${active === idx ? 'text-foreground' : ''}`}>{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 sm:mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-[width] duration-100"
              style={{ width: `${Math.round(frac * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
