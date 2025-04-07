
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductTransformProps {
  className?: string;
}

const ProductTransform = ({ className }: ProductTransformProps) => {
  const [isTransforming, setIsTransforming] = useState(false);
  const [productState, setProductState] = useState<'jacket' | 'purse'>('jacket');

  const handleTransform = () => {
    setIsTransforming(true);
    setTimeout(() => {
      setProductState(prev => prev === 'jacket' ? 'purse' : 'jacket');
      setIsTransforming(false);
    }, 1500);
  };

  return (
    <div className={cn("relative w-full max-w-lg mx-auto", className)}>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100">
        {/* Product images */}
        <div 
          className={cn(
            "w-full h-full transition-opacity duration-500",
            isTransforming ? "opacity-0" : "opacity-100"
          )}
        >
          {productState === 'jacket' ? (
            <div className="w-full h-full flex items-center justify-center p-4">
              <img 
                src="/lovable-uploads/d9d5597b-edb6-4a76-b148-90abf928a78d.png" 
                alt="Minny Puffer Jacket" 
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4">
              <img 
                src="/lovable-uploads/d9d5597b-edb6-4a76-b148-90abf928a78d.png" 
                alt="Minny Leather Purse"
                className="w-full h-full object-contain object-right"
                style={{ objectPosition: "95% center" }}
              />
            </div>
          )}
        </div>
        
        {/* Animation overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-stone-100 pointer-events-none flex items-center justify-center",
            isTransforming ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="animate-product-transform w-3/4 h-3/4 bg-gradient-to-r from-secondary/70 to-primary/70 rounded-lg shadow-lg flex items-center justify-center text-white font-medium">
            Transforming...
          </div>
        </div>
      </div>
      
      {/* Removed accent elements */}
      
      <button 
        onClick={handleTransform}
        className="mt-6 btn-primary w-full"
        disabled={isTransforming}
      >
        {isTransforming 
          ? "Transforming..." 
          : productState === 'jacket' 
            ? "Transform to Purse" 
            : "Transform to Jacket"}
      </button>
    </div>
  );
};

export default ProductTransform;
