
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
      question: "How does the jacket transform into a purse?",
      answer: "Our innovative design features a specialized folding system that allows the jacket to collapse into a compact purse form in under 30 seconds. The outer shell becomes the purse exterior, while the inner lining creates secure storage space for your essentials."
    },
    {
      question: "Is the jacket warm enough for Minnesota winters?",
      answer: "Yes! As a University of Minnesota startup, we designed our jacket specifically for harsh winter conditions. The puffer design provides excellent insulation while remaining lightweight and comfortable. Perfect for winter weather while being stylish enough for social events."
    },
    {
      question: "What can I fit in the purse when transformed?",
      answer: "The transformed purse has enough room for essentials like your phone, wallet, keys, makeup.  The convertible outerwear is designed to hold everything you'd need for a night out while keeping your hands free."
    },
    {
      question: "Can I wash the jacket?",
      answer: "Yes, our transforming winter jacket is machine washable on a gentle cycle with cold water. We recommend air drying to maintain the integrity of the materials and transformation mechanism."
    },
    {
      question: "When will my order ship?",
      answer: "We're currently accepting pre-orders for our first production run. Orders are expected to ship within when we launch. You'll receive tracking information as soon as your coat purse hybrid ships."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we ship within the United States. We plan to expand our shipping options internationally in the near future as our University of Minnesota startup grows."
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
            <div className="tag inline-block mb-4">Questions & Answers</div>
            <h2 className="heading-lg mb-6 text-foreground">Frequently Asked Questions</h2>
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
