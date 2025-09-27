import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  structuredData?: object;
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  structuredData
}: SEOProps) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      updateMetaTag('name', 'description', description);
    }

    // Update keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }

    // Update canonical URL
    if (canonical) {
      updateLinkTag('canonical', canonical);
    }

    // Update Open Graph tags
    if (ogTitle) {
      updateMetaTag('property', 'og:title', ogTitle);
    }
    if (ogDescription) {
      updateMetaTag('property', 'og:description', ogDescription);
    }
    if (ogImage) {
      updateMetaTag('property', 'og:image', ogImage);
    }
    if (canonical) {
      updateMetaTag('property', 'og:url', canonical);
    }

    // Update Twitter tags
    if (twitterTitle) {
      updateMetaTag('property', 'twitter:title', twitterTitle);
    }
    if (twitterDescription) {
      updateMetaTag('property', 'twitter:description', twitterDescription);
    }
    if (ogImage) {
      updateMetaTag('property', 'twitter:image', ogImage);
    }
    if (canonical) {
      updateMetaTag('property', 'twitter:url', canonical);
    }

    // Update structured data
    if (structuredData) {
      updateStructuredData(structuredData);
    }
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, twitterTitle, twitterDescription, structuredData]);

  const updateMetaTag = (attribute: string, name: string, content: string) => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    if (element) {
      element.content = content;
    } else {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      element.content = content;
      document.head.appendChild(element);
    }
  };

  const updateLinkTag = (rel: string, href: string) => {
    let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
    if (element) {
      element.href = href;
    } else {
      element = document.createElement('link');
      element.rel = rel;
      element.href = href;
      document.head.appendChild(element);
    }
  };

  const updateStructuredData = (data: object) => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic="true"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-dynamic', 'true');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  return null; // This component doesn't render anything
}

// SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: "Local Web Developer & AI Integration | Blackbox Logic | Stuart, FL | Treasure Coast",
    description: "Premier local web developer & AI integration specialist in Stuart, FL. Custom software development, business process automation, chatbot development. No monthly fees, one-time payment model.",
    keywords: "local web developer, treasure coast websites, AI integration Stuart FL, treasure coast data services, custom software development florida, business process automation stuart fl, chatbot development treasure coast, web development martin county, local tech support, workflow automation florida, no monthly fees software development, one time payment web development, florida software company, martin county tech support",
    canonical: "https://blkboxlogic.com/",
    ogTitle: "Local Web Developer & AI Integration | Blackbox Logic | Stuart, FL",
    ogDescription: "Premier local web developer & AI integration specialist in Stuart, FL. Custom software development, business automation, no monthly fees.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Blackbox Logic - Local Web Developer & AI Integration",
      "description": "Premier local web developer and AI integration specialist serving Stuart, FL and the Treasure Coast",
      "url": "https://blkboxlogic.com/",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "Blackbox Logic",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Stuart",
          "addressRegion": "FL",
          "addressCountry": "US"
        }
      }
    }
  },
  about: {
    title: "About Blackbox Logic | Local Tech Company | Stuart, FL | Treasure Coast",
    description: "Learn about Blackbox Logic, your local technology partner in Stuart, FL. 5+ years serving Treasure Coast businesses with custom software development, AI integration, and digital transformation.",
    keywords: "about blackbox logic, local tech company stuart fl, treasure coast technology services, martin county web developer, florida software company, stuart florida IT consulting, digital transformation stuart fl, custom software development florida, small business tech support, API development stuart florida",
    canonical: "https://blkboxlogic.com/about",
    ogTitle: "About Blackbox Logic | Local Tech Company | Stuart, FL",
    ogDescription: "Learn about Blackbox Logic, your local technology partner in Stuart, FL. 5+ years serving Treasure Coast businesses with custom solutions.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Blackbox Logic",
      "description": "Learn about Blackbox Logic, a local technology company serving Stuart, FL and the Treasure Coast",
      "url": "https://blkboxlogic.com/about",
      "mainEntity": {
        "@type": "Organization",
        "name": "Blackbox Logic",
        "foundingDate": "2019",
        "description": "Local technology solutions provider specializing in web development, AI integration, and custom software for small businesses"
      }
    }
  },
  services: {
    title: "Custom Software Development & AI Services | Stuart, FL | Treasure Coast | Blackbox Logic",
    description: "Professional custom software development, AI integration, business process automation, and workflow automation in Stuart, FL. CRM integration, API development, database solutions. No monthly fees.",
    keywords: "custom software development florida, web development stuart fl, AI services treasure coast, business process automation stuart fl, chatbot development treasure coast, workflow automation florida, CRM integration stuart fl, API development stuart florida, database development martin county, restaurant POS integration florida, real estate software development, healthcare software stuart fl, no monthly fees software development",
    canonical: "https://blkboxlogic.com/services",
    ogTitle: "Custom Software Development & AI Services | Stuart, FL | Blackbox Logic",
    ogDescription: "Professional custom software development, AI integration, business automation in Stuart, FL. One-time payment solutions for Treasure Coast businesses.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Web Development & AI Services",
      "description": "Comprehensive technology services including web development, AI integration, and custom software solutions",
      "url": "https://blkboxlogic.com/services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Blackbox Logic",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Stuart",
          "addressRegion": "FL"
        }
      },
      "serviceType": [
        "Website Development",
        "AI Integration",
        "Custom Software Development",
        "Data Services",
        "Business Automation"
      ],
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Treasure Coast, Florida"
      }
    }
  },
  whyChooseUs: {
    title: "Why Choose Local Tech Support | Blackbox Logic | Stuart, FL | Treasure Coast",
    description: "Discover why Treasure Coast businesses choose Blackbox Logic. Local support, no monthly fees, escape subscription software, affordable custom software, personalized service in Stuart, FL.",
    keywords: "why choose local tech support, treasure coast tech advantages, stuart fl technology benefits, no monthly fees software development, one time payment web development, escape subscription software, affordable custom software florida, martin county tech support, local web developer benefits, personalized tech support florida",
    canonical: "https://blkboxlogic.com/why-choose-us",
    ogTitle: "Why Choose Local Tech Support | Blackbox Logic | Stuart, FL",
    ogDescription: "Local tech support, no monthly fees, escape subscription software. Treasure Coast businesses choose Blackbox Logic for affordable custom solutions.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Why Choose Blackbox Logic",
      "description": "Learn the advantages of choosing a local technology partner in Stuart, FL",
      "url": "https://blkboxlogic.com/why-choose-us"
    }
  },
  contact: {
    title: "Contact Custom Software Developer | Get Quote | Stuart, FL | Blackbox Logic",
    description: "Contact Blackbox Logic for custom software development, business process automation, AI integration in Stuart, FL. Serving Treasure Coast businesses. Free consultation, no monthly fees.",
    keywords: "contact web developer stuart fl, custom software development florida, get quote treasure coast, business process automation stuart fl, AI integration consultation, workflow automation florida, CRM integration stuart fl, local tech support contact, martin county tech support",
    canonical: "https://blkboxlogic.com/contact",
    ogTitle: "Contact Custom Software Developer | Get Quote | Stuart, FL",
    ogDescription: "Contact Blackbox Logic for custom software development, business automation, AI integration in Stuart, FL. Free consultation available.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Blackbox Logic",
      "description": "Get in touch with Blackbox Logic for technology solutions in Stuart, FL",
      "url": "https://blkboxlogic.com/contact",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "Blackbox Logic",
        "telephone": "(772) 634-8025",
        "email": "info@blkboxlogic.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Stuart",
          "addressRegion": "FL",
          "addressCountry": "US"
        }
      }
    }
  }
};