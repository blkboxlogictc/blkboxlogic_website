import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { PortableText } from "@portabletext/react";
import SEO from "@/components/layout/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Loader2 } from "lucide-react";
import { getBlogPostBySlug, urlFor } from "@/lib/sanity";

// Types for individual blog post
interface BlogPostData {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  featuredImage?: any;
  content: any[];
  publishedAt: string;
  author: {
    name: string;
    image?: any;
    bio?: any[];
    position?: string;
  };
  categories: Array<{
    title: string;
    slug: { current: string };
    color?: { hex: string };
  }>;
  tags: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

// Custom components for PortableText
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlFor(value).width(800).height(500).url();
      return (
        <div className="my-8">
          <img
            src={imageUrl}
            alt={value.alt || "Blog image"}
            className="w-full rounded-lg shadow-lg"
          />
          {value.alt && (
            <p className="text-sm text-gray-400 mt-2 text-center italic">
              {value.alt}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }: any) => (
      <div className="my-6">
        {value.filename && (
          <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono border-b border-gray-700">
            {value.filename}
          </div>
        )}
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
          <code className={`language-${value.language || 'text'}`}>
            {value.code}
          </code>
        </pre>
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-white">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-3 text-white">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3 text-white">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg md:text-xl font-bold mt-4 mb-2 text-white">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent pl-6 my-6 italic text-gray-300 bg-gray-800/50 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-200">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-800 text-accent px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300 ml-4">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-gray-300">{children}</li>,
  },
};

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;

  // Fetch individual blog post
  const { data: post, isLoading, error } = useQuery<BlogPostData>({
    queryKey: ['blogPost', slug],
    queryFn: () => getBlogPostBySlug(slug as string),
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
              <p className="text-gray-400">Loading blog post...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 md:py-12 mt-12">
          <div className="text-center">
            <p className="text-red-400 mb-4">Blog post not found</p>
            <p className="text-gray-500 mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blog">
              <Button className="bg-accent text-black hover:bg-opacity-90">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // SEO configuration
  const seoConfig = {
    title: post.seo?.metaTitle || `${post.title} | Blackbox Logic Blog`,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords?.join(', ') || post.tags?.join(', '),
    canonical: `https://blkboxlogic.com/blog/${post.slug.current}`,
    ogTitle: post.title,
    ogDescription: post.excerpt,
    ogImage: post.featuredImage ? urlFor(post.featuredImage).width(1200).height(630).url() : undefined,
  };

  const featuredImageUrl = post.featuredImage ? urlFor(post.featuredImage).width(1200).url() : null;
  const authorImageUrl = post.author?.image ? urlFor(post.author.image).width(80).height(80).url() : null;

  return (
    <div className="pt-20">
      <SEO {...seoConfig} />
      
      <article className="container mx-auto px-4 py-8 md:py-12 mt-12 max-w-4xl">
        {/* Back to Blog */}
        <div className="mb-6">
          <Link href="/blog">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-accent hover:text-black">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Featured Image */}
        {featuredImageUrl && (
          <div className="mb-8 flex justify-center">
            <img
              src={featuredImageUrl}
              alt={post.title}
              className="max-w-full h-auto rounded-xl shadow-lg object-contain"
              style={{ maxHeight: '70vh' }}
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.categories?.[0] && (
              <Badge 
                variant="secondary" 
                className="bg-accent text-black"
                style={post.categories[0].color ? { backgroundColor: post.categories[0].color.hex + '20', color: post.categories[0].color.hex } : {}}
              >
                {post.categories[0].title}
              </Badge>
            )}
            <div className="flex items-center text-sm text-gray-400">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg border border-gray-700">
            {authorImageUrl ? (
              <img
                src={authorImageUrl}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <User className="h-6 w-6 text-black" />
              </div>
            )}
            <div>
              <p className="font-semibold text-white">{post.author.name}</p>
              {post.author.position && (
                <p className="text-sm text-gray-400">{post.author.position}</p>
              )}
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <PortableText value={post.content} components={portableTextComponents} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-white">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <Card className="mt-12 p-6 md:p-8 bg-muted border-accent">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how custom software solutions can help your business thrive.
            </p>
            <Link href="/contact">
              <Button className="bg-accent text-black hover:bg-opacity-90">
                Get Started Today
              </Button>
            </Link>
          </div>
        </Card>
      </article>
    </div>
  );
}