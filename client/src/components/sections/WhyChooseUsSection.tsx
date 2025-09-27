import { useState } from "react";
import WhyChooseCard from "@/components/ui/why-choose-card";
import TestimonialCard from "@/components/ui/testimonial-card";
import { DollarSign, MapPin, Settings, Check, X } from "lucide-react";

interface WhyChooseUsSectionProps {
  hideTitle?: boolean;
}

export default function WhyChooseUsSection({ hideTitle = false }: WhyChooseUsSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        "Blackbox Logic transformed our business operations with a custom automation solution. Their one-time payment model saved us thousands compared to subscription services we were considering.",
      author: "Juan Romero",
      position: "La Pasadita Taqueria, Stuart",
    },
    {
      quote:
        "Having a local tech partner who understands our specific needs has been invaluable. Their AI chatbot increased our customer response rate by 200% while freeing up our staff for more important tasks.",
      author: "Quinesha Hawkins",
      position: "Atlante Realty, Port St. Lucie",
    },
    {
      quote:
        "Blackbox Logic transformed the way we run Stone Crab Pools—our new website looks amazing, and the invoice and scheduling automation saves us hours every week. The automated replies are a game-changer for customer communication—couldn’t be happier with the results!",
      author: "Noah Jones",
      position: "Stone Crab Pools, Stuart",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {!hideTitle && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-accent">Us</span>
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-300">
              We're different from big tech companies and SaaS providers. Here's
              why Blackbox Logic is the right partner for your business.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* No Monthly Fees */}
          <WhyChooseCard
            icon={<DollarSign className="h-10 w-10" />}
            title="No Monthly Fees"
            description="Unlike major SaaS companies, we provide custom-built solutions for a one-time payment."
          >
            <div className="bg-black bg-opacity-40 p-4 rounded-lg space-y-3">
              <Feature isNegative text="Endless recurring subscription fees" />
              <Feature isNegative text="Unpredictable annual price increases" />
              <Feature text="Simple one-time payment structure" />
              <Feature text="No ongoing financial obligation" />
            </div>
          </WhyChooseCard>

          {/* Support Local Business */}
          <WhyChooseCard
            icon={<MapPin className="h-10 w-10" />}
            title="Support Local Business"
            description="We are a Treasure Coast-based business helping other small businesses grow."
          >
            <div className="bg-black bg-opacity-40 p-4 rounded-lg space-y-3">
              <Feature isNegative text="Offshore support centers" />
              <Feature isNegative text="Impersonal corporate relationships" />
              <Feature text="Face-to-face meetings and direct support" />
              <Feature text="Understanding of local market dynamics" />
            </div>
          </WhyChooseCard>

          {/* Customized Solutions */}
          <WhyChooseCard
            icon={<Settings className="h-10 w-10" />}
            title="Customized Solutions"
            description="We tailor technology to your business, unlike generic subscription software."
          >
            <div className="bg-black bg-opacity-40 p-4 rounded-lg space-y-3">
              <Feature isNegative text="Generic one-size-fits-all solutions" />
              <Feature isNegative text="Paying for features you don't need" />
              <Feature text="Solutions built for your specific needs" />
              <Feature text="Technology that grows with your business" />
            </div>
          </WhyChooseCard>
        </div>

        {/* Testimonial Section */}
        <div className="mt-20 bg-muted rounded-lg p-8 overflow-hidden">
          <h3 className="text-xl font-bold mb-6 text-center">
            What Our Clients Say
          </h3>

          <div className="relative">
            <div
              id="testimonial-slider"
              className="flex transition-transform duration-500"
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  position={testimonial.position}
                  isActive={activeTestimonial === index}
                />
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full focus:outline-none ${
                    activeTestimonial === index ? "bg-accent" : "bg-gray-600"
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface LocalFeatureProps {
  text: string;
}

function LocalFeature({ text }: LocalFeatureProps) {
  return (
    <li className="flex items-start">
      <div className="flex-shrink-0 text-[#0AE582] mr-3">
        <Check className="h-5 w-5" />
      </div>
      <span className="text-sm text-gray-300">{text}</span>
    </li>
  );
}

interface FeatureProps {
  text: string;
  isNegative?: boolean;
}

function Feature({ text, isNegative = false }: FeatureProps) {
  return (
    <div className="flex items-center">
      <div
        className={`mr-3 ${isNegative ? "text-[#FF3B30]" : "text-[#0AE582]"}`}
      >
        {isNegative ? <X className="h-5 w-5" /> : <Check className="h-5 w-5" />}
      </div>
      <span className="text-sm text-gray-300">{text}</span>
    </div>
  );
}
