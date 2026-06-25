import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

const PreOrderSuccess = () => {
  useEffect(() => {
    document.title = "You're on the VIP List | Minny";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full opacity-30 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-secondary/20 rounded-full opacity-30 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container-custom relative z-10 flex-grow flex items-center justify-center py-16">
        <div className="w-full max-w-xl text-center">
          <div className="glass-panel p-8 md:p-12 rounded-2xl">
            <div className="flex justify-center mb-6">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <CheckCircle2 className="h-9 w-9 text-primary" />
              </span>
            </div>
            <div className="tag mb-4 inline-block">You're In</div>
            <h1 className="heading-md mb-4 text-foreground">
              Welcome to the <span className="text-primary">VIP List</span>
            </h1>
            <p className="body-md text-muted-foreground mb-8">
              Your spot is secured. You'll get guaranteed access to our exclusive launch pricing — no matter the platform we launch on. Keep an eye on your inbox for VIP-only updates and early access.
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
