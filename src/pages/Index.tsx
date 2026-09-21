import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import GirlsGetIt from '@/components/sections/GirlsGetIt';
import FAQ from '@/components/sections/FAQ';
import Newsletter from '@/components/sections/Newsletter';
import Footer from '@/components/sections/Footer';
import ExitIntent from '@/components/ExitIntent';

const Index = () => {
  useEffect(() => {
    document.title = 'Minny | The Purse That Transforms Into a Jacket';
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <GirlsGetIt />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      <ExitIntent />
    </div>
  );
};

export default Index;
