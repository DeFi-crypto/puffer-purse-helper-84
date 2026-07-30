import React, { useEffect, useRef, useState } from 'react';

const STEPS = ['Unclip', 'Unfold', 'Zip up'];

/** Map scroll progress -> video time fraction.
 *  Middle "unfold" chunk covers more video per scroll (feels faster). */
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
    let current = 0;      // smoothed progress
    let want = 0;         // last requested video time
    let seeking = false;  // a seek is in flight (iOS drops overlapping seeks)
    let primed = false;

    /** iOS/Safari will not honour currentTime until the video has actually
     *  started decoding once. Muted + playsInline lets us do that silently. */
    const prime = () => {
      if (primed) return;
      primed = true;
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.then(() => video.pause()).catch(() => {
          primed = false; // autoplay blocked — retry on first touch
        });
      } else {
        video.pause();
      }
    };

    prime();
    video.addEventListener('loadedmetadata', prime, { once: true });
    const touchPrime = () => prime();
    document.addEventListener('touchstart', touchPrime, { passive: true });

    const onSeeked = () => {
      seeking = false;
      // If scroll moved on while we were seeking, chase the newest position.
      if (Math.abs(video.currentTime - want) > 0.04) seek(want);
    };
    video.addEventListener('seeked', onSeeked);

    const seek = (t: number) => {
      if (seeking) return;
      seeking = true;
      try {
        video.currentTime = t;
      } catch {
        seeking = false;
      }
    };

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
        // One seek at a time — queued via the 'seeked' handler above.
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
    <section
      id="how-it-works"
      ref={wrapRef}
      className="relative bg-background h-[220vh] sm:h-[280vh]"
    >
      <div className="sticky top-0 h-[100svh] sm:h-screen flex flex-col items-center justify-center overflow-hidden px-4">
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
              className="h-full bg-primary rounded-full"
              style={{ width: `${Math.round(frac * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
