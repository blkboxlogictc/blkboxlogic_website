import ServicesSection from "@/components/sections/ServicesSection";
import SEO, { seoConfigs } from "@/components/layout/SEO";

export default function Services() {
  return (
    <div className="pt-20">
      <SEO {...seoConfigs.services} />
      <div className="container mx-auto px-4 py-8 mt-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Our <span className="text-accent">Services</span>
        </h1>
      </div>
      <ServicesSection hideTitle={true} />
    </div>
  );
}
