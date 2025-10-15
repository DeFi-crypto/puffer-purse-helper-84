
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProductTransformProps {
  className?: string;
}

const ProductTransform = ({ className }: ProductTransformProps) => {
  const [isTransforming, setIsTransforming] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleTransform = () => {
    setIsTransforming(true);
    setShouldPlay(true);
    
    // Reset after video duration
    setTimeout(() => {
      setIsTransforming(false);
      setShouldPlay(false);
    }, 8000); // Adjust based on video length
  };

  return (
    <div className={cn("relative w-full max-w-lg mx-auto", className)}>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100">
        {/* Canva Video Embed */}
        <div className="w-full h-full">
          <iframe 
            ref={iframeRef}
            loading="lazy" 
            className="absolute w-full h-full top-0 left-0 border-0 p-0 m-0"
            src={`https://www.canva.com/design/DAG14gKiLxA/Wz8Cz6bTasvXLL5q-rcW3w/watch?embed${shouldPlay ? '&autoplay=true' : ''}`}
            allowFullScreen
            allow="autoplay; fullscreen"
            title="Minny jacket transforming into purse"
          />
        </div>
      </div>
      
      {/* Removed accent elements */}
      
      <button 
        onClick={handleTransform}
        className="mt-6 btn-primary w-full"
        disabled={isTransforming}
      >
        {isTransforming ? "Watch the Transformation..." : "Transform to Purse"}
      </button>
    </div>
  );
};

export default ProductTransform;
