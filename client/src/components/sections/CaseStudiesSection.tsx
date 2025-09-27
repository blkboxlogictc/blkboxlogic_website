import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface CaseStudy {
  id: number;
  title: string;
  business: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string; // We'll use CSS for this instead of actual images
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "AI-Powered Inventory Management",
    business: "Construction Supply Company",
    industry: "Retail",
    challenge:
      "Manual inventory tracking was causing stockouts and excess inventory, costing the business an estimated $35,000 annually in lost sales and carrying costs.",
    solution:
      "Implemented a custom AI-driven inventory forecasting system that analyzes historical sales data, seasonality, and market trends to predict optimal stock levels.",
    results: [
      "Reduced stockouts by 78%",
      "Decreased excess inventory by 42%",
      "Saved $27,500 in annual costs",
      "Improved customer satisfaction ratings by 23%",
    ],
    image: "bg-gradient-to-br from-blue-900 to-indigo-900",
  },
  {
    id: 2,
    title: "Automated Client Communication System",
    business: "Local Small Law Firm",
    industry: "Legal Services",
    challenge:
      "Attorneys were spending 15+ hours weekly responding to routine client inquiries, taking valuable time away from billable work.",
    solution:
      "Developed an AI-powered client portal and chatbot system that handles common questions, updates clients on case status, and schedules appointments automatically.",
    results: [
      "Reduced attorney response time by 85%",
      "Saved 12+ hours per attorney weekly",
      "Increased client satisfaction by 31%",
      "Generated $150,000+ in additional billable time annually",
    ],
    image: "bg-gradient-to-br from-cyan-900 to-teal-900",
  },
  {
    id: 3,
    title: "Smart Appointment Scheduling",
    business: "Pediatric Physical Therapy",
    industry: "Healthcare",
    challenge:
      "High no-show rates (27%) and inefficient scheduling were causing significant revenue loss and staff frustration.",
    solution:
      "Created a custom scheduling system with predictive analytics to optimize appointment slots, automated reminders, and intelligent rescheduling capabilities.",
    results: [
      "Reduced no-shows by 68%",
      "Increased appointment capacity by 22%",
      "Generated 15% more revenue",
      "Improved staff satisfaction ratings",
    ],
    image: "bg-gradient-to-br from-purple-900 to-violet-900",
  },
];

export default function CaseStudiesSection() {
  const [activeCase, setActiveCase] = useState(0);

  const handlePrevious = () => {
    setActiveCase((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCase((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };

  const currentCase = caseStudies[activeCase];

  return (
    <section id="case-studies" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-accent">Success Stories</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            See how our custom technology solutions have helped local businesses
            solve real problems and achieve measurable results.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mb-10">
          {/* Case Study Visual */}
          <div className="w-full lg:w-2/5">
            <div
              className={cn(
                "relative h-full min-h-[300px] rounded-lg overflow-hidden flex items-center justify-center p-8",
                currentCase.image
              )}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="relative z-10 text-center">
                <div className="inline-block bg-accent text-black text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {currentCase.industry}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                  {currentCase.title}
                </h3>
                <p className="text-white text-lg mb-4">
                  {currentCase.business}
                </p>
                <div className="flex justify-center space-x-1">
                  {caseStudies.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-3 h-3 rounded-full focus:outline-none",
                        activeCase === index ? "bg-accent" : "bg-gray-600"
                      )}
                      onClick={() => setActiveCase(index)}
                      aria-label={`View case study ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Case Study Details */}
          <div className="w-full lg:w-3/5 bg-muted rounded-lg p-8">
            <div className="mb-6">
              <h4 className="text-accent mb-2 font-semibold">The Challenge</h4>
              <p className="text-gray-300">{currentCase.challenge}</p>
            </div>

            <div className="mb-6">
              <h4 className="text-accent mb-2 font-semibold">Our Solution</h4>
              <p className="text-gray-300">{currentCase.solution}</p>
            </div>

            <div>
              <h4 className="text-accent mb-3 font-semibold">The Results</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentCase.results.map((result, i) => (
                  <li key={i} className="flex items-start mb-2">
                    <div className="text-accent mr-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="flex space-x-2">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  size="sm"
                  className="text-gray-300 hover:text-accent"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button
                  onClick={handleNext}
                  variant="outline"
                  size="sm"
                  className="text-gray-300 hover:text-accent"
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <Button
                variant="default"
                className="bg-accent hover:bg-opacity-80 text-black"
                asChild
              >
                <Link href="/contact">
                  <div className="flex items-center">
                    Get Started <ExternalLink className="h-4 w-4 ml-2" />
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
