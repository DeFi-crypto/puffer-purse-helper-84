
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSection from '../ui/AnimatedSection';

const FAQ = () => {
  const faqItems = [
    {
      question: "How does it transform?",
      answer: "A folding system tucks the down into the shell — the shell becomes the purse and the lining becomes the storage. Under 30 seconds, no practice needed."
    },
    {
      question: "Is it warm enough for Minnesota winters?",
      answer: "Yes. It's a real puffer, designed in Minneapolis for the walk there and back."
    },
    {
      question: "What fits in the purse?",
      answer: "Phone, wallet, keys, makeup — everything you'd take out, zipped and secure."
    },
    {
      question: "Can I wash it?",
      answer: "Machine wash on gentle with cold water, then air dry."
    },
    {
      question: "Can I buy one right now?",
      answer: "We're taking pre-orders for the first production run — pre-ordering locks your spot."
    },
    {
      question: "Do you ship internationally?",
      answer: "US only for now. International is coming as we grow."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-background relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-20 left-20 w-64 h-64 bg-secondary/10 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container-custom max-w-4xl relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="tag inline-block mb-4">Questions</div>
            <h2 className="font-display text-4xl sm:text-5xl mb-6 text-foreground">Fair questions</h2>
            <p className="body-md text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about our convertible coat to bag design, 
              shipping, and product features. Our coat that turns into a bag is revolutionizing winter wear.
            </p>
          </div>
          
          <div className="glass-panel border border-white/5 hover:border-white/10 transition-all duration-300 rounded-xl overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-white/5">
                    <span className="text-lg font-medium">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-black/20">
                    <p className="text-muted-foreground">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-muted-foreground">
              Still have questions about our stylish winter coat for concerts or social events?{' '}
              <a href="#newsletter" className="text-primary hover:underline">
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
