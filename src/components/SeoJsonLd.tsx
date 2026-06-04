import React, { useEffect } from 'react';

export const SeoJsonLd: React.FC = () => {
  useEffect(() => {
    // Set Document Title
    document.title = "Indulge Coffee Lesotho | Coffee Lounge, Warmth & Good Coffee";

    // Set or Create Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      'Discover Indulge Coffee in Lesotho — a warm coffee lounge experience for fresh coffee, light meals, work sessions, meetups, and relaxed conversations.'
    );
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "name": "Indulge Coffee",
    "description": "A coffee lounge experience in Lesotho focused on coffee, warmth, light meals, work sessions, meetups, and relaxed hospitality.",
    "url": "https://indulgecoffee.ls", // Placeholder URL as requested
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Maseru City Centre, Kingsway Rd", // Placeholder
      "addressLocality": "Maseru",
      "addressCountry": "LS"
    },
    "telephone": "+266 5800 0000", // Placeholder
    "sameAs": [
      "https://instagram.com/indulge_cl", // Placeholder
      "https://facebook.com/indulge_cl" // Placeholder
    ],
    "servesCuisine": "Coffee, Light meals",
    "priceRange": "$$",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2078&auto=format&fit=crop" // Beautiful background placeholder
  };

  return (
    <script 
      id="seo-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }} 
    />
  );
};
