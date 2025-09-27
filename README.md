# Blackbox Logic Website

A modern, responsive website for Blackbox Logic built with React, TypeScript, and Sanity CMS.

## Features

- 🚀 **Modern Tech Stack**: React 18, TypeScript, Vite
- 🎨 **Beautiful UI**: Tailwind CSS with custom components
- 📱 **Fully Responsive**: Mobile-first design
- 🔍 **SEO Optimized**: Meta tags, structured data, sitemap
- 📝 **Content Management**: Sanity CMS integration
- 🎯 **Performance**: Optimized builds and caching
- 🔒 **Security**: Security headers and CSP

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **CMS**: Sanity
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Deployment**: Netlify

## Project Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and configurations
│   │   └── hooks/          # Custom React hooks
│   └── public/             # Static assets
├── server/                 # Backend (optional, not used in deployment)
└── shared/                 # Shared types and schemas
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/blkboxlogictc/blkboxlogic_website.git
cd blkboxlogic_website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see Environment Variables section)

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

The application requires the following environment variables for Sanity CMS integration:

```env
# Sanity Configuration (already configured in code)
VITE_SANITY_PROJECT_ID=j96wu9wz
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

Note: Sanity configuration is currently hardcoded in the client. For security in production, consider moving to environment variables.

## Build and Deployment

### Local Build

```bash
npm run build
npm run preview
```

### Netlify Deployment

The site is configured for automatic deployment on Netlify:

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Node Version**: 18+

The `netlify.toml` file contains all necessary configuration including:
- SPA routing redirects
- Security headers
- Cache optimization
- Sanity CDN integration

## Content Management

### Sanity CMS

The website uses Sanity for content management with the following content types:

- **Blog Posts**: Full-featured blog with rich text, images, and metadata
- **Portfolio Projects**: Project showcases with case studies and testimonials
- **Authors**: Blog post authors with bio and images
- **Categories**: Blog post categorization with color coding

### Content Schema

See `sanity-schema.js` for the complete Sanity schema definition.

## Features

### Blog System
- Rich text editing with PortableText
- Image optimization
- Category filtering
- Search functionality
- SEO optimization
- Individual post pages

### Portfolio Showcase
- Project galleries
- Case studies
- Client testimonials
- Technology tags
- Project type filtering
- External website links

### SEO & Performance
- Structured data markup
- Meta tags optimization
- Image optimization
- Caching strategies
- Mobile optimization
- Accessibility compliance

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type checking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, contact Blackbox Logic or create an issue in the repository.