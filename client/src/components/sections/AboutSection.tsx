import { CheckIcon } from "lucide-react";

interface AboutSectionProps {
  hideTitle?: boolean;
}

export default function AboutSection({ hideTitle = false }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {!hideTitle && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About <span className="text-accent">Us</span></h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <h3 className="text-2xl font-bold mb-6">Innovation with a <span className="text-accent">Local</span> Approach</h3>
            <p className="text-gray-300 mb-6">
              At Blackbox Logic, we believe that cutting-edge technology solutions shouldn't be reserved for enterprise-level companies. For the past 5 years, we've dedicated ourselves to democratizing access to AI and advanced tech tools for small to medium-sized businesses in the Treasure Coast area.
            </p>
            <p className="text-gray-300 mb-6">
              Our mission is to empower local businesses with the same technological advantages that larger corporations enjoy, but with solutions that are specifically tailored to your unique needs, goals, and budget constraints.
            </p>
            <p className="text-gray-300">
              We don't just build technology—we build partnerships. When you work with Blackbox Logic, you're working with neighbors who understand the local business landscape and are invested in seeing our community thrive.
            </p>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6 text-center">Why Choosing a <span className="text-accent">Local</span> Tech Partner Matters</h3>
              
              <div className="space-y-6">
                <LocalBenefit 
                  title="Personalized Support"
                  description="We're just a call or short drive away. No call centers or support tickets—get direct access to our team when you need us."
                />
                
                <LocalBenefit 
                  title="Industry-Specific Understanding"
                  description="We understand the unique challenges and opportunities of businesses operating in the Treasure Coast region."
                />
                
                <LocalBenefit 
                  title="Community Investment"
                  description="When you work with us, you're reinvesting in the local economy and supporting the growth of our shared community."
                />
                
                <LocalBenefit 
                  title="Tailored Solutions"
                  description="We create custom solutions that fit your specific business needs, not one-size-fits-all packages."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface LocalBenefitProps {
  title: string;
  description: string;
}

function LocalBenefit({ title, description }: LocalBenefitProps) {
  return (
    <div className="flex">
      <div className="flex-shrink-0 text-accent mr-4">
        <CheckIcon className="h-6 w-6" />
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
}
