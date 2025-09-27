import AboutSection from "@/components/sections/AboutSection";
import SEO, { seoConfigs } from "@/components/layout/SEO";

export default function About() {
  return (
    <div className="pt-20">
      <SEO {...seoConfigs.about} />
      <div className="container mx-auto px-4 py-8 mt-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          About <span className="text-accent">Us</span>
        </h1>
      </div>
      <AboutSection hideTitle={true} />
    </div>
  );
}
