import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import Features from '@/components/sections/Features';
import GirlsGetIt from '@/components/sections/GirlsGetIt';
import Newsletter from '@/components/sections/Newsletter';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import StructuredData from '@/components/SEO/StructuredData';
import ExitIntent from '@/components/ExitIntent';

const Index = () => {
  useEffect(() => {
    document.title = 'Minny | The Purse That Transforms Into a Jacket';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
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
