
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProductTransformProps {
  className?: string;
}

const ProductTransform = ({ className }: ProductTransformProps) => {
  const [isTransforming, setIsTransforming] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTransform = () => {
    if (videoRef.current) {
      setIsTransforming(true);
      videoRef.current.currentTime = 0; // Reset to start
      videoRef.current.play();
      
      // Reset state and go back to coat view when video ends
      videoRef.current.onended = () => {
        setIsTransforming(false);
        if (videoRef.current) {
          videoRef.current.currentTime = 1; // Show the coat at the beginning
        }
      };
    }
  };

  return (
    <div className={cn("relative w-full max-w-lg mx-auto", className)}>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          preload="metadata"
        >
          <source src="/lovable-uploads/Minny_Haven_Jacket_Transformation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Removed accent elements */}
      
      <button 
        onClick={handleTransform}
        className="mt-6 btn-primary w-full"
        disabled={isTransforming}
      >
        {isTransforming ? "Transforming..." : "Transform to Purse"}
      </button>
    </div>
  );
};

export default ProductTransform;
