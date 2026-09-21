import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

const PreOrderSuccess = () => {
  useEffect(() => {
    document.title = 'Pre-Order Confirmed | Minny';
  }, []);

  return (
    <div className="min-h-[100svh] flex flex-col bg-background relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full opacity-30 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-secondary/20 rounded-full opacity-30 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container-custom relative z-10 flex-grow flex items-center justify-center py-10 sm:py-16">
        <div className="w-full max-w-xl text-center">
          <div className="glass-panel p-6 sm:p-10 rounded-2xl">
            <div className="flex justify-center mb-5">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <CheckCircle2 className="h-9 w-9 text-primary" />
              </span>
            </div>
            <div className="tag mb-3 inline-block">Order confirmed</div>
            <h1 className="font-display text-3xl sm:text-4xl mb-3 text-foreground">
              Your pre-order is <span className="text-primary">in</span>.
            </h1>
            <p className="text-muted-foreground mb-6">
              Thank you! Your Minny is reserved from our first production run. We'll email you as it moves
              through production and again with tracking the moment it ships.
            </p>
            <Link to="/" className="btn-primary inline-flex items-center justify-center">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrderSuccess;
