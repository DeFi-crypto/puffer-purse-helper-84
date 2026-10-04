import { useEffect } from 'react';

/**
 * Plays muted videos only while they're on screen and pauses them otherwise,
 * so phones aren't decoding several videos at once while the user scrolls.
 */
export function useInViewAutoplay(getVideos: () => (HTMLVideoElement | null)[], threshold = 0.35) {
  useEffect(() => {
    const videos = getVideos().filter((v): v is HTMLVideoElement => !!v);
    if (!videos.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold }
    );
    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold]);
}
