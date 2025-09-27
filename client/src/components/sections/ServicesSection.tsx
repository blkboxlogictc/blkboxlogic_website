import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ui/service-card";
import { Monitor, MessageSquare, Zap, BarChart, Lightbulb } from "lucide-react";

interface ServicesSectionProps {
  hideTitle?: boolean;
}

export default function ServicesSection({ hideTitle = false }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {!hideTitle && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-accent">Services</span></h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-300">
              We provide comprehensive technology solutions designed specifically for small to medium-sized businesses in the Treasure Coast area. Each service is tailored to your unique needs.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Monitor className="h-6 w-6" />}
            title="Website & App Development"
            description="Custom-built websites and applications designed to boost your online presence and streamline business operations."
            features={[
              "Responsive web design",
              "E-commerce solutions",
              "Business process applications"
            ]}
          />
          
          <ServiceCard
            icon={<MessageSquare className="h-6 w-6" />}
            title="AI Chatbots & Automation"
            description="Intelligent chatbots and automation tools that handle customer inquiries and streamline repetitive tasks."
            features={[
              "24/7 customer support",
              "Workflow automation",
              "Lead qualification systems"
            ]}
          />
          
          <ServiceCard
            icon={<Zap className="h-6 w-6" />}
            title="Business System Optimization"
            description="Streamline your business operations with integrated systems that reduce redundancy and increase efficiency."
            features={[
              "Process mapping & improvement",
              "Digital transformation",
              "Integrated software solutions"
            ]}
          />
          
          <ServiceCard
            icon={<BarChart className="h-6 w-6" />}
            title="Data Analysis & Market Reports"
            description="Transform your raw data into actionable business intelligence to help drive informed decision-making."
            features={[
              "Customer behavior analytics",
              "Market trend reporting",
              "Performance dashboards"
            ]}
          />
          
          <ServiceCard
            icon={<Lightbulb className="h-6 w-6" />}
            title="AI Integration & Custom Solutions"
            description="Leverage the power of artificial intelligence to solve unique business challenges and create competitive advantages."
            features={[
              "Predictive analytics",
              "Machine learning models",
              "AI-powered decision support"
            ]}
          />

          {/* CTA Card */}
          <div className="bg-accent bg-opacity-10 rounded-lg overflow-hidden border border-accent card-hover flex flex-col justify-center p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Need a custom solution?</h3>
            <p className="text-center mb-6">
              Let's discuss how we can create a tailored technology solution for your specific business needs.
            </p>
            <Button asChild className="mt-auto mx-auto px-6 py-3 bg-accent text-black font-semibold rounded-md hover:bg-opacity-90 transition-all duration-300">
              <Link href="/contact">
                <div>Get in Touch</div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
