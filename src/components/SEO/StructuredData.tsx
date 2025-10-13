import { useEffect } from 'react';

const StructuredData = () => {
  useEffect(() => {
    // Product Schema
    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Minny Transformable Jacket",
      "image": "/lovable-uploads/MinnyCoatPurse.png",
      "description": "A purse that transforms into a winter coat. University of Minnesota startup's convertible outerwear - perfect for concerts, bars, and social events.",
      "brand": {
        "@type": "Brand",
        "name": "Minny"
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/PreOrder",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "2"
      }
    };

    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Minny",
      "description": "University of Minnesota startup creating transformable winter wear",
      "url": window.location.origin,
      "logo": "/lovable-uploads/9575f4c8-b4b8-46cc-9487-939b865fc223.png",
      "foundingLocation": {
        "@type": "Place",
        "name": "University of Minnesota"
      }
    };

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does the transformation work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our innovative design allows you to seamlessly transform your jacket into a purse in just 30 seconds. Simply fold, zip, and you're ready to go—no complicated steps or tools required."
          }
        },
        {
          "@type": "Question",
          "name": "What materials are used?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use premium, durable materials that are both water-resistant and designed to withstand Minnesota winters while maintaining a sleek, fashionable appearance."
          }
        },
        {
          "@type": "Question",
          "name": "When will it be available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We're currently in pre-order phase. Sign up for our newsletter to be notified when we launch and receive exclusive early-bird offers."
          }
        }
      ]
    };

    // Insert schemas
    const insertSchema = (id: string, schema: object) => {
      const existing = document.getElementById(id);
      if (existing) {
        existing.textContent = JSON.stringify(schema);
      } else {
        const script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      }
    };

    insertSchema('product-schema', productSchema);
    insertSchema('organization-schema', organizationSchema);
    insertSchema('faq-schema', faqSchema);
  }, []);

  return null;
};

export default StructuredData;
