import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SEO, { seoConfigs } from "@/components/layout/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getBlogPosts, urlFor } from "@/lib/sanity";

// Types for Sanity blog data
interface SanityBlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  featuredImage?: any;
  publishedAt: string;
  author: {
    name: string;
    image?: any;
  };
  categories: Array<{
    title: string;
    slug: { current: string };
    color?: { hex: string };
  }>;
  tags: string[];
  featured: boolean;
}

// Mock blog data for fallback - this will be replaced with Sanity CMS data
const mockBlogPosts = [
  {
    id: 1,
    title: "5 AI Tools Every Small Business Should Use in 2024",
    excerpt: "Discover the latest AI tools that can transform your small business operations, from customer service chatbots to automated scheduling systems.",
    author: "Aaron Thompson",
    publishedAt: "2024-01-15",
    category: "AI Integration",
    tags: ["AI", "Small Business", "Automation"],
    featured: true,
    image: "/api/placeholder/600/400"
  },
  {
    id: 2,
    title: "Why Local Businesses Need Custom Web Development",
    excerpt: "Learn why off-the-shelf website builders aren't enough for growing local businesses and how custom development can give you a competitive edge.",
    author: "Aaron Thompson", 
    publishedAt: "2024-01-10",
    category: "Web Development",
    tags: ["Web Development", "Local Business", "Custom Solutions"],
    featured: false,
    image: "/api/placeholder/600/400"
  },
  {
    id: 3,
    title: "Treasure Coast Business Spotlight: Digital Transformation Success Stories",
    excerpt: "Real stories from local Treasure Coast businesses that have successfully implemented digital solutions to grow their operations.",
    author: "Aaron Thompson",
    publishedAt: "2024-01-05",
    category: "Case Studies",
    tags: ["Treasure Coast", "Success Stories", "Digital Transformation"],
    featured: false,
    image: "/api/placeholder/600/400"
  },
  {
    id: 4,
    title: "Data Security Best Practices for Small Businesses",
    excerpt: "Essential cybersecurity measures every small business should implement to protect customer data and business operations.",
    author: "Aaron Thompson",
    publishedAt: "2023-12-28",
    category: "Security",
    tags: ["Security", "Data Protection", "Best Practices"],
    featured: false,
    image: "/api/placeholder/600/400"
  },
  {
    id: 5,
    title: "ROI of Business Automation: Stuart, FL Case Study",
    excerpt: "A detailed analysis of how one Stuart-based business achieved 300% ROI through strategic automation implementation.",
    author: "Aaron Thompson",
    publishedAt: "2023-12-20",
    category: "Automation",
    tags: ["ROI", "Automation", "Stuart FL"],
    featured: false,
    image: "/api/placeholder/600/400"
  },
  {
    id: 6,
    title: "Local SEO for Treasure Coast Businesses: Complete Guide",
    excerpt: "Master local SEO strategies specifically designed for businesses in the Treasure Coast area to dominate local search results.",
    author: "Aaron Thompson",
    publishedAt: "2023-12-15",
    category: "SEO",
    tags: ["Local SEO", "Treasure Coast", "Digital Marketing"],
    featured: false,
    image: "/api/placeholder/600/400"
  }
];

const blogSeoConfig = {
  title: "Tech Blog & Software Development Insights | Blackbox Logic | Stuart, FL",
  description: "Read the latest custom software development insights, business process automation tips, AI integration strategies, and Treasure Coast business success stories. Expert advice for Florida businesses.",
  keywords: "tech blog stuart fl, custom software development florida, business process automation blog, AI integration blog, treasure coast technology insights, workflow automation florida, small business tech tips, web development blog florida, CRM integration stuart fl, database development martin county, digital transformation stuart fl",
  canonical: "https://blkboxlogic.com/blog",
  ogTitle: "Tech Blog & Software Development Insights | Blackbox Logic | Stuart, FL",
  ogDescription: "Expert custom software development insights and success stories for Treasure Coast businesses. Business automation, AI integration, and workflow tips.",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blackbox Logic Tech Blog",
    "description": "Technology insights and business success stories for the Treasure Coast",
    "url": "https://blkboxlogic.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Blackbox Logic",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Stuart",
        "addressRegion": "FL"
      }
    }
  }
};

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch blog posts from Sanity
  const { data: blogPosts = [], isLoading, error } = useQuery<SanityBlogPost[]>({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Extract unique categories from blog posts
  const categories: string[] = ["All", ...Array.from(new Set(
    blogPosts.flatMap((post: SanityBlogPost) =>
      post.categories?.map((cat: any) => cat.title as string) || []
    )
  ))];

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter((post: SanityBlogPost) => {
    const matchesCategory = selectedCategory === "All" ||
      post.categories?.some(cat => cat.title === selectedCategory);
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((post: SanityBlogPost) => post.featured);
  const regularPosts = filteredPosts.filter((post: SanityBlogPost) => !post.featured);

  // Loading state
  if (isLoading) {
    return (
      <div className="pt-20">
        <SEO {...blogSeoConfig} />
        <div className="container mx-auto px-4 py-8 md:py-12 mt-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-accent" />
              <p className="text-gray-400">Loading blog posts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="pt-20">
        <SEO {...blogSeoConfig} />
        <div className="container mx-auto px-4 py-8 md:py-12 mt-12">
          <div className="text-center">
            <p className="text-red-400 mb-4">Error loading blog posts</p>
            <p className="text-gray-500">Please try again later or check your connection.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <SEO {...blogSeoConfig} />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-12 mt-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Tech Insights & <span className="text-accent">Case Studies</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Stay ahead with the latest technology trends, AI integration strategies, and real success stories from small businesses.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted border-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-accent text-black"
                    : "border-gray-600 text-gray-300 hover:bg-accent hover:text-black"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "All" && (
        <div className="container mx-auto px-4 mb-12 md:mb-16">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center">Featured Article</h2>
          </div>
          <Card className="overflow-hidden bg-muted border-gray-700 hover:border-accent transition-colors duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto">
                <img
                  src={featuredPost.featuredImage ? urlFor(featuredPost.featuredImage).width(800).height(600).url() : '/api/placeholder/800/600'}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {featuredPost.categories?.[0] && (
                    <Badge variant="secondary" className="bg-accent text-black">
                      {featuredPost.categories[0].title}
                    </Badge>
                  )}
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(featuredPost.publishedAt).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 line-clamp-2">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-300 mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <User className="h-4 w-4 mr-2" />
                    {featuredPost.author?.name}
                  </div>
                  <Link href={`/blog/${featuredPost.slug.current}`}>
                    <Button className="bg-accent text-black hover:bg-opacity-90 self-start sm:self-auto">
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {regularPosts.map((post: SanityBlogPost) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400 mb-4">No articles found</p>
            <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface BlogPostCardProps {
  post: SanityBlogPost;
}

function BlogPostCard({ post }: BlogPostCardProps) {
  const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(600).height(400).url() : '/api/placeholder/600/400';
  const primaryCategory = post.categories?.[0];
  return (
    <Card className="overflow-hidden bg-muted border-gray-700 hover:border-accent transition-all duration-300 card-hover">
      <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {primaryCategory && (
            <Badge
              variant="secondary"
              className="bg-accent text-black text-xs"
              style={primaryCategory.color ? { backgroundColor: primaryCategory.color.hex + '20', color: primaryCategory.color.hex } : {}}
            >
              {primaryCategory.title}
            </Badge>
          )}
          <div className="flex items-center text-xs text-gray-400">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
        </div>
        <Link href={`/blog/${post.slug.current}`}>
          <h3 className="text-lg md:text-xl font-bold mb-3 line-clamp-2 hover:text-accent transition-colors cursor-pointer">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-400">
            <User className="h-3 w-3 mr-1" />
            {post.author?.name}
          </div>
          <Link href={`/blog/${post.slug.current}`}>
            <Button size="sm" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-black">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}