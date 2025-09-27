import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import ContactSection from "@/components/sections/ContactSection";
import SEO, { seoConfigs } from "@/components/layout/SEO";

export default function Home() {
  return (
    <div>
      <SEO {...seoConfigs.home} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CaseStudiesSection />
      <WhyChooseUsSection />
      <ContactSection />
    </div>
  );
}
