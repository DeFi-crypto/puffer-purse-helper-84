
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
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
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
