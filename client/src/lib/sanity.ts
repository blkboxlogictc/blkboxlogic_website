import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Sanity client configuration
export const client = createClient({
  projectId: "j96wu9wz",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Set to false for server-side rendering or if you need the freshest data
});

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source: any) {
  return builder.image(source);
}

// Helper function to fetch blog posts
export async function getBlogPosts() {
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      author->{
        name,
        image
      },
      categories[]->{
        title,
        slug,
        color
      },
      tags,
      featured
    }
  `);
}

// Helper function to fetch featured blog posts
export async function getFeaturedBlogPosts() {
  return client.fetch(`
    *[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      author->{
        name,
        image
      },
      categories[]->{
        title,
        slug,
        color
      }
    }
  `);
}

// Helper function to fetch portfolio projects
export async function getPortfolioProjects() {
  return client.fetch(`
    *[_type == "portfolioProject"] | order(completedAt desc) {
      _id,
      title,
      slug,
      client,
      websiteUrl,
      previewImage,
      description,
      technologies,
      projectType,
      completedAt,
      featured,
      caseStudy,
      testimonial
    }
  `);
}

// Helper function to fetch featured portfolio projects
export async function getFeaturedPortfolioProjects() {
  return client.fetch(`
    *[_type == "portfolioProject" && featured == true] | order(completedAt desc) [0...6] {
      _id,
      title,
      slug,
      client,
      websiteUrl,
      previewImage,
      description,
      technologies,
      projectType,
      completedAt,
      testimonial
    }
  `);
}

// Helper function to fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  return client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      content,
      publishedAt,
      author->{
        name,
        image,
        bio,
        position
      },
      categories[]->{
        title,
        slug,
        color
      },
      tags,
      seo
    }
  `, { slug });
}

// Helper function to fetch a single portfolio project by slug
export async function getPortfolioProjectBySlug(slug: string) {
  return client.fetch(`
    *[_type == "portfolioProject" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      client,
      websiteUrl,
      previewImage,
      description,
      technologies,
      projectType,
      completedAt,
      caseStudy,
      testimonial
    }
  `, { slug });
}