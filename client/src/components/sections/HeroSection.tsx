import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="pt-28 md:pt-32 pb-16 md:pb-24 hero-gradient overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="block">One Payment.</span>
              <span className="block">Smart Tech.</span>
              <span className="block text-accent glow-text">
                Local Support.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Treasure Coast's premier AI and technology solutions provider.
              Empowering small to medium-sized businesses with cutting-edge
              technology—no subscriptions required.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                className="px-8 py-3 bg-accent text-black font-semibold rounded-md hover:bg-opacity-90 transition-all duration-300"
              >
                <Link href="/services">
                  <div>Explore Services</div>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-8 py-3 border border-accent text-accent font-semibold rounded-md hover:bg-accent hover:bg-opacity-10 transition-all duration-300"
              >
                <Link href="/contact">
                  <div>Get In Touch</div>
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Abstract 3D cube visualization with animations */}
              <div className="absolute w-full h-full bg-muted rounded-lg opacity-50 animate-rotate-12"></div>
              <div className="absolute w-full h-full bg-secondary rounded-lg opacity-70 animate-rotate-minus-12"></div>
              <div className="absolute w-full h-full border-2 border-accent rounded-lg opacity-80 animate-rotate-3"></div>
              <div className="absolute w-3/4 h-3/4 top-1/2 left-1/2 bg-black rounded animate-rotate-center"></div>
              <div className="absolute w-1/2 h-1/2 top-1/2 left-1/2 border border-[#39FF14] rounded animate-pulse-rotate-center"></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-accent font-mono text-sm opacity-80 animate-pulse">
                  <div>▮▯▯▮▮▯▯▮</div>
                  <div>▮▯▮▯▯▮▯▮</div>
                  <div>▮▮▯▯▮▯▮▯</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company highlights */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <CompanyHighlight
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            }
            title="5 Years of Experience"
            description="Designing AI and tech solutions tailored to small business needs and challenges."
          />

          <CompanyHighlight
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
            title="Locally Owned & Operated"
            description="Proudly serving the Treasure Coast business community with personalized service."
          />

          <CompanyHighlight
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            title="One-Time Payment Model"
            description="No subscriptions, no recurring fees. Just transparent, one-time pricing for your solutions."
          />
        </div>
      </div>
    </section>
  );
}

interface CompanyHighlightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function CompanyHighlight({ icon, title, description }: CompanyHighlightProps) {
  return (
    <div className="bg-muted bg-opacity-50 p-6 rounded-lg card-hover">
      <div className="text-accent mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
