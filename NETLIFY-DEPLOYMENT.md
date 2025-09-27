# Netlify Deployment Guide

This guide provides instructions for deploying the Blackbox Logic website to Netlify.

## Prerequisites

- Node.js and npm installed
- Git installed and configured
- Netlify account

## Option 1: Deploy using Netlify CLI (Recommended)

The Netlify CLI provides a more reliable way to deploy your site directly from the command line.

### Installation

```bash
npm install -g netlify-cli
```

### Deployment Steps

1. Build the project:

   ```bash
   npm run build
   ```

2. Ensure the \_redirects file exists in the dist/public directory:

   ```
   # Redirect API requests to 404
   /api/*  /404.html  404

   # Handle client-side routing
   /*  /index.html  200
   ```

3. Deploy using the Netlify CLI:

   ```bash
   netlify login
   netlify deploy --prod --dir=dist/public
   ```

4. Alternatively, use the provided deployment script:
   ```bash
   node deploy-to-netlify.js
   ```

## Option 2: Manual Deployment

If you prefer to manually upload files to Netlify:

1. Build the project:

   ```bash
   npm run build
   ```

2. Ensure the \_redirects file exists in the dist/public directory.

3. Log in to your Netlify account.

4. Go to "Sites" and click "Add new site" > "Deploy manually".

5. Drag and drop the `dist/public` folder to the designated area.

6. Configure your site settings:
   - Domain settings: Set up a custom domain if needed
   - Build settings: Not needed for manual deployment
   - Deploy settings: Ensure "Asset optimization" is enabled

## Troubleshooting

If you encounter a 404 error when accessing your deployed site:

1. Check that the \_redirects file exists in your deployed site.
2. Verify that the index.html file is at the root of your deployed site.
3. Check the Netlify deployment logs for any errors.
4. Try clearing your browser cache or accessing the site in an incognito window.
5. Verify that all asset paths in your HTML files are relative.

## GitHub Integration

For continuous deployment, you can connect your GitHub repository to Netlify:

1. In Netlify, go to "Sites" and click "Add new site" > "Import an existing project".
2. Choose GitHub as the Git provider.
3. Select your repository.
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
5. Click "Deploy site".

This will automatically deploy your site whenever you push changes to your GitHub repository.
