import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import PortfolioShowcase from "@/components/sections/PortfolioShowcase";
import SEO, { seoConfigs } from "@/components/layout/SEO";

export default function WhyChooseUs() {
  return (
    <div className="pt-20">
      <SEO {...seoConfigs.whyChooseUs} />
      <div className="container mx-auto px-4 py-8 mt-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Why Choose <span className="text-accent">Us</span>
        </h1>
      </div>
      <WhyChooseUsSection hideTitle={true} />
      <PortfolioShowcase />
    </div>
  );
}
