import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Loader2, Eye } from "lucide-react";
import { getFeaturedPortfolioProjects, getPortfolioProjects, urlFor } from "@/lib/sanity";

// Types for Sanity portfolio data
interface SanityPortfolioProject {
  _id: string;
  title: string;
  slug: { current: string };
  client: string;
  websiteUrl: string;
  previewImage?: any;
  description: string;
  technologies: string[];
  projectType: string;
  completedAt: string;
  featured: boolean;
  caseStudy?: {
    challenge?: string;
    solution?: string;
    results?: string;
  };
  testimonial?: {
    quote?: string;
    clientName?: string;
    clientPosition?: string;
  };
}

// Mock portfolio data for fallback - this will be replaced with Sanity CMS data
const mockProjects = [
  {
    id: 1,
    title: "Stone Crab Pools Website",
    client: "Stone Crab Pools",
    websiteUrl: "https://stonecrabpools.com",
    previewImage: "/api/placeholder/600/400",
    description: "Complete website redesign with automated scheduling, invoice generation, and customer communication system. Streamlined operations and improved customer experience.",
    technologies: ["React", "Node.js", "Stripe", "Automated Scheduling"],
    projectType: "Website & Automation",
    completedAt: "2023-11-15",
    featured: true,
    caseStudy: {
      challenge: "Outdated website with manual scheduling and invoicing processes",
      solution: "Modern responsive website with integrated automation systems",
      results: "50% reduction in administrative time, 200% increase in online bookings"
    },
    testimonial: {
      quote: "Blackbox Logic transformed the way we run Stone Crab Pools—our new website looks amazing, and the invoice and scheduling automation saves us hours every week. The automated replies are a game-changer for customer communication—couldn't be happier with the results!",
      clientName: "Noah Jones",
      clientPosition: "Owner, Stone Crab Pools"
    }
  },
  {
    id: 2,
    title: "La Pasadita Taqueria Operations",
    client: "La Pasadita Taqueria",
    websiteUrl: "https://lapasaditataqueria.com",
    previewImage: "/api/placeholder/600/400",
    description: "Custom automation solution for order management and customer communication. One-time payment model saved thousands compared to subscription services.",
    technologies: ["Custom Software", "POS Integration", "SMS Automation"],
    projectType: "Business Automation",
    completedAt: "2023-09-20",
    featured: true,
    caseStudy: {
      challenge: "Manual order processing and customer communication bottlenecks",
      solution: "Integrated automation system with POS and communication tools",
      results: "Thousands saved vs subscription alternatives, streamlined operations"
    },
    testimonial: {
      quote: "Blackbox Logic transformed our business operations with a custom automation solution. Their one-time payment model saved us thousands compared to subscription services we were considering.",
      clientName: "Juan Romero",
      clientPosition: "Owner, La Pasadita Taqueria"
    }
  },
  {
    id: 3,
    title: "Atlante Realty AI Chatbot",
    client: "Atlante Realty",
    websiteUrl: "https://atlanterealty.com",
    previewImage: "/api/placeholder/600/400",
    description: "AI-powered chatbot implementation that increased customer response rate by 200% while freeing up staff for high-value tasks.",
    technologies: ["AI Integration", "Natural Language Processing", "CRM Integration"],
    projectType: "AI Integration",
    completedAt: "2023-08-10",
    featured: false,
    caseStudy: {
      challenge: "High volume of repetitive customer inquiries overwhelming staff",
      solution: "Custom AI chatbot with CRM integration for seamless handoffs",
      results: "200% increase in response rate, staff freed for high-value activities"
    },
    testimonial: {
      quote: "Having a local tech partner who understands our specific needs has been invaluable. Their AI chatbot increased our customer response rate by 200% while freeing up our staff for more important tasks.",
      clientName: "Quinesha Hawkins",
      clientPosition: "Broker, Atlante Realty"
    }
  },
  {
    id: 4,
    title: "Martin County Medical Practice",
    client: "Treasure Coast Health",
    websiteUrl: "https://treasurecoasthealth.com",
    previewImage: "/api/placeholder/600/400",
    description: "HIPAA-compliant patient portal with appointment scheduling and secure messaging. Improved patient satisfaction and operational efficiency.",
    technologies: ["HIPAA Compliance", "Secure Messaging", "Appointment System"],
    projectType: "Healthcare Portal",
    completedAt: "2023-07-05",
    featured: false,
    caseStudy: {
      challenge: "Need for secure patient communication and online scheduling",
      solution: "HIPAA-compliant portal with integrated scheduling system",
      results: "Improved patient satisfaction, reduced phone call volume"
    }
  },
  {
    id: 5,
    title: "Port St. Lucie Retail Analytics",
    client: "Coastal Boutique",
    websiteUrl: "https://coastalboutique.com",
    previewImage: "/api/placeholder/600/400",
    description: "E-commerce platform with advanced analytics dashboard. Data-driven insights helped optimize inventory and marketing strategies.",
    technologies: ["E-commerce", "Analytics Dashboard", "Inventory Management"],
    projectType: "E-commerce & Analytics",
    completedAt: "2023-06-15",
    featured: false,
    caseStudy: {
      challenge: "Limited visibility into sales patterns and inventory needs",
      solution: "Custom analytics platform with real-time insights",
      results: "25% improvement in inventory turnover, targeted marketing success"
    }
  },
  {
    id: 6,
    title: "Stuart Marina Management",
    client: "Sunset Marina",
    websiteUrl: "https://sunsetmarina.com",
    previewImage: "/api/placeholder/600/400",
    description: "Marina management system with slip reservations, maintenance tracking, and customer portal. Streamlined operations for busy marina.",
    technologies: ["Reservation System", "Maintenance Tracking", "Customer Portal"],
    projectType: "Management System",
    completedAt: "2023-05-20",
    featured: false,
    caseStudy: {
      challenge: "Manual slip management and maintenance coordination",
      solution: "Integrated management system with customer self-service",
      results: "Reduced administrative overhead, improved customer satisfaction"
    }
  }
];

export default function PortfolioShowcase() {
  const [selectedType, setSelectedType] = useState("All");

  // Fetch portfolio projects from Sanity
  const { data: portfolioProjects = [], isLoading, error } = useQuery<SanityPortfolioProject[]>({
    queryKey: ['portfolioProjects'],
    queryFn: getPortfolioProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Extract unique project types from portfolio projects
  const projectTypes: string[] = ["All", ...Array.from(new Set(
    portfolioProjects.map((project: SanityPortfolioProject) => project.projectType)
  ))];

  // Filter projects based on type
  const filteredProjects = portfolioProjects.filter((project: SanityPortfolioProject) => {
    return selectedType === "All" || project.projectType === selectedType;
  });

  const featuredProjects = filteredProjects.filter((project: SanityPortfolioProject) => project.featured);

  // Loading state
  if (isLoading) {
    return (
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-accent" />
              <p className="text-gray-400">Loading portfolio projects...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-400 mb-4">Error loading portfolio projects</p>
            <p className="text-gray-500">Please try again later or check your connection.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-accent">Portfolio</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            Real projects from real Treasure Coast businesses. See how we've helped local companies transform their operations with custom technology solutions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {projectTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
              className={`whitespace-nowrap text-xs md:text-sm ${
                selectedType === type
                  ? "bg-accent text-black"
                  : "border-gray-600 text-gray-300 hover:bg-accent hover:text-black"
              }`}
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && selectedType === "All" && (
          <div className="mb-12 md:mb-16">
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">Featured Projects</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {featuredProjects.map((project: SanityPortfolioProject) => (
                <FeaturedProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* All Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.filter(p => !p.featured || selectedType !== "All").map((project: SanityPortfolioProject) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400 mb-4">No projects found</p>
            <p className="text-gray-500">Try adjusting your project type filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: SanityPortfolioProject;
}

function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.previewImage ? urlFor(project.previewImage).width(600).height(400).url() : '/api/placeholder/600/400';
  return (
    <Card className="overflow-hidden bg-muted border-gray-700 hover:border-accent transition-all duration-300 card-hover">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="secondary" className="bg-accent text-black text-xs">
            {project.projectType}
          </Badge>
          <div className="flex items-center text-xs text-gray-400">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(project.completedAt).toLocaleDateString()}
          </div>
        </div>
        <Link href={`/portfolio/${project.slug.current}`}>
          <h3 className="text-lg md:text-xl font-bold mb-2 hover:text-accent transition-colors cursor-pointer">{project.title}</h3>
        </Link>
        <p className="text-gray-400 text-sm mb-3">{project.client}</p>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies?.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Link href={`/portfolio/${project.slug.current}`} className="flex-1">
            <Button
              size="sm"
              variant="outline"
              className="w-full border-accent text-accent hover:bg-accent hover:text-black"
            >
              View Project
              <Eye className="h-3 w-3 ml-2" />
            </Button>
          </Link>
          <Button
            asChild
            size="sm"
            className="flex-1 bg-accent text-black hover:bg-opacity-90"
          >
            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
              Visit Site
              <ExternalLink className="h-3 w-3 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function FeaturedProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.previewImage ? urlFor(project.previewImage).width(800).height(600).url() : '/api/placeholder/800/600';
  return (
    <Card className="overflow-hidden bg-muted border-gray-700 hover:border-accent transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="aspect-[4/3] md:aspect-auto">
          <img
            src={imageUrl}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 md:p-6 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-accent text-black">
              Featured
            </Badge>
            <Badge variant="outline" className="border-accent text-accent">
              {project.projectType}
            </Badge>
          </div>
          <Link href={`/portfolio/${project.slug.current}`}>
            <h3 className="text-xl md:text-2xl font-bold mb-2 hover:text-accent transition-colors cursor-pointer">{project.title}</h3>
          </Link>
          <p className="text-gray-400 mb-3">{project.client}</p>
          <p className="text-gray-300 mb-4 line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/portfolio/${project.slug.current}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-accent text-accent hover:bg-accent hover:text-black"
              >
                View Case Study
                <Eye className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Button
              asChild
              className="bg-accent text-black hover:bg-opacity-90 flex-1"
            >
              <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                Visit Website
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}