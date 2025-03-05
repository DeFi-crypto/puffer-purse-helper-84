
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import UseCases from '@/components/sections/UseCases';
import Newsletter from '@/components/sections/Newsletter';
import Footer from '@/components/sections/Footer';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "Minny - Transformable Puffer Jacket";
    
    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <UseCases />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
