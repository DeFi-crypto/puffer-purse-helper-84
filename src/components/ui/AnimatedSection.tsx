
import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  threshold?: number;
  id?: string;
}

const AnimatedSection = ({
  children,
  className,
  direction = 'up',
  delay = 0,
  threshold = 0.2,
  id,
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    // Reveal once and stay revealed — re-hiding on scroll-out made content
    // fade/slide in again on every scroll back up, which felt janky on phones.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      // Tall blocks on small screens may never reach a 20% ratio, so also trigger near the fold.
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(currentRef);

    return () => observer.disconnect();
  }, [threshold]);

  const directionClass = 
    direction === 'left' 
      ? 'scroll-reveal-left' 
      : direction === 'right' 
        ? 'scroll-reveal-right' 
        : 'scroll-reveal';

  return (
    <div
      ref={sectionRef}
      id={id}
      className={cn(
        directionClass,
        isVisible ? 'visible' : '',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
