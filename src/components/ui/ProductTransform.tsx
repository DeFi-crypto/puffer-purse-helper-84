
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProductTransformProps {
  className?: string;
}

const ProductTransform = ({ className }: ProductTransformProps) => {
  const [isTransforming, setIsTransforming] = useState(false);
  const [isJacket, setIsJacket] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number>();

  const handleTransform = () => {
    if (!videoRef.current) return;
    
    setIsTransforming(true);
    const video = videoRef.current;

    if (!isJacket) {
      // Transform to jacket (play forward)
      video.playbackRate = 1;
      video.play();
      
      video.onended = () => {
        setIsTransforming(false);
        setIsJacket(true);
      };
    } else {
      // Transform to purse (play reverse)
      const playReverse = () => {
        if (video.currentTime <= 0) {
          setIsTransforming(false);
          setIsJacket(false);
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
        } else {
          video.currentTime -= 0.033; // ~30fps
          animationFrameRef.current = requestAnimationFrame(playReverse);
        }
      };
      
      animationFrameRef.current = requestAnimationFrame(playReverse);
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
        {isTransforming ? "Transforming..." : isJacket ? "Transform to Jacket" : "Transform to Purse"}
      </button>
    </div>
  );
};

export default ProductTransform;
