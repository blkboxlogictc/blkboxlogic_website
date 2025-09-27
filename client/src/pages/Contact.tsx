import ContactSection from "@/components/sections/ContactSection";
import SEO, { seoConfigs } from "@/components/layout/SEO";

export default function Contact() {
  return (
    <div className="pt-20">
      <SEO {...seoConfigs.contact} />
      <div className="container mx-auto px-4 py-8 mt-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Get In <span className="text-accent">Touch</span>
        </h1>
      </div>
      <ContactSection hideTitle={true} />
    </div>
  );
}
