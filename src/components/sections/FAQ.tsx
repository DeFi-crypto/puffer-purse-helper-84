import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSection from '../ui/AnimatedSection';
import { FAQ_ITEMS } from '@/lib/faq';

const FAQ = () => {
  const faqItems = FAQ_ITEMS;

  return (
    <section id="faq" className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="absolute top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full opacity-30 blur-3xl"></div>

      <div className="container-custom max-w-4xl relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
            <div className="tag inline-block mb-3">Questions</div>
            <h2 className="font-display text-3xl sm:text-5xl text-foreground">Fair questions</h2>
          </div>

          <div className="glass-panel border border-white/5 hover:border-white/10 transition-all duration-300 rounded-xl overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-5 py-3.5 text-left hover:no-underline hover:bg-white/5">
                    <span className="text-base sm:text-lg font-medium">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 py-3.5 bg-black/20">
                    <p className="text-muted-foreground">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Still have questions?{' '}
              <a href="mailto:contact@minnyapparel.com" className="text-primary hover:underline">
                Reach out to us
              </a>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQ;
