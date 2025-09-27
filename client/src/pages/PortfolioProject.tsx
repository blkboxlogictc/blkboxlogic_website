import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import SEO from "@/components/layout/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, ArrowLeft, Quote, Loader2 } from "lucide-react";
import { getPortfolioProjectBySlug, urlFor } from "@/lib/sanity";

// Types for individual portfolio project
interface PortfolioProjectData {
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
  caseStudy?: {
    challenge?: string;
    solution?: string;
    results?: string;
    additionalImages?: any[];
  };
  testimonial?: {
    quote?: string;
    clientName?: string;
    clientPosition?: string;
  };
}

export default function PortfolioProject() {
  const params = useParams();
  const slug = params.slug;

  // Fetch individual portfolio project
  const { data: project, isLoading, error } = useQuery<PortfolioProjectData>({
    queryKey: ['portfolioProject', slug],
    queryFn: () => getPortfolioProjectBySlug(slug as string),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 md:py-12 mt-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-accent" />
              <p className="text-gray-400">Loading portfolio project...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 md:py-12 mt-12">
          <div className="text-center">
            <p className="text-red-400 mb-4">Portfolio project not found</p>
            <p className="text-gray-500 mb-6">
              The portfolio project you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/why-choose-us">
              <Button className="bg-accent text-black hover:bg-opacity-90">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // SEO configuration
  const seoConfig = {
    title: `${project.title} - ${project.client} | Blackbox Logic Portfolio`,
    description: project.description,
    keywords: `${project.technologies.join(', ')}, ${project.projectType}, portfolio, case study`,
    canonical: `https://blkboxlogic.com/portfolio/${project.slug.current}`,
    ogTitle: `${project.title} - ${project.client}`,
    ogDescription: project.description,
    ogImage: project.previewImage ? urlFor(project.previewImage).width(1200).height(630).url() : undefined,
  };

  const previewImageUrl = project.previewImage ? urlFor(project.previewImage).width(1200).height(800).url() : null;

  return (
    <div className="pt-20">
      <SEO {...seoConfig} />
      
      <article className="container mx-auto px-4 py-8 md:py-12 mt-12 max-w-6xl">
        {/* Back to Portfolio */}
        <div className="mb-6">
          <Link href="/why-choose-us">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-accent hover:text-black">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Project Header */}
        <header className="mb-8 md:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Project Image */}
            <div className="order-2 lg:order-1">
              {previewImageUrl && (
                <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
                  <img
                    src={previewImageUrl}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-accent text-black">
                  {project.projectType}
                </Badge>
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(project.completedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {project.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-accent font-semibold mb-6">
                {project.client}
              </p>
              
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-white">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visit Website Button */}
              <Button
                asChild
                className="bg-accent text-black hover:bg-opacity-90 self-start"
                size="lg"
              >
                <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                  Visit Website
                  <ExternalLink className="h-5 w-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </header>

        {/* Case Study Section */}
        {project.caseStudy && (project.caseStudy.challenge || project.caseStudy.solution || project.caseStudy.results) && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Case Study
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {project.caseStudy.challenge && (
                <Card className="p-6 bg-muted border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-red-400">Challenge</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.caseStudy.challenge}
                  </p>
                </Card>
              )}
              
              {project.caseStudy.solution && (
                <Card className="p-6 bg-muted border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-blue-400">Solution</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.caseStudy.solution}
                  </p>
                </Card>
              )}
              
              {project.caseStudy.results && (
                <Card className="p-6 bg-muted border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-green-400">Results</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.caseStudy.results}
                  </p>
                </Card>
              )}
            </div>

            {/* Additional Images */}
            {project.caseStudy.additionalImages && project.caseStudy.additionalImages.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-6 text-center">Project Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.caseStudy.additionalImages.map((image, index) => (
                    <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={urlFor(image).width(500).height(375).url()}
                        alt={image.alt || `${project.title} gallery image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Testimonial Section */}
        {project.testimonial && project.testimonial.quote && (
          <section className="mb-12 md:mb-16">
            <Card className="p-8 md:p-12 bg-muted border-accent">
              <div className="text-center">
                <Quote className="h-12 w-12 text-accent mx-auto mb-6" />
                <blockquote className="text-lg md:text-xl text-gray-300 italic mb-6 leading-relaxed">
                  "{project.testimonial.quote}"
                </blockquote>
                {(project.testimonial.clientName || project.testimonial.clientPosition) && (
                  <div className="text-center">
                    {project.testimonial.clientName && (
                      <p className="text-white font-semibold">
                        {project.testimonial.clientName}
                      </p>
                    )}
                    {project.testimonial.clientPosition && (
                      <p className="text-gray-400 text-sm">
                        {project.testimonial.clientPosition}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </section>
        )}

        {/* Call to Action */}
        <Card className="p-6 md:p-8 bg-muted border-accent">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Ready for Your Own Success Story?
            </h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how we can help transform your business with custom technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-accent text-black hover:bg-opacity-90">
                  Start Your Project
                </Button>
              </Link>
              <Link href="/why-choose-us">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-black">
                  View More Projects
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </article>
    </div>
  );
}