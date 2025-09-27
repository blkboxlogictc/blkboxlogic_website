// Simple script to deploy to Netlify
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the build directory exists
const distPublicPath = path.join(__dirname, 'dist', 'public');
if (!fs.existsSync(distPublicPath)) {
  console.error('Error: dist/public directory not found. Run npm run build first.');
  process.exit(1);
}

// Check for _redirects file
const redirectsPath = path.join(distPublicPath, '_redirects');
if (!fs.existsSync(redirectsPath)) {
  console.log('Creating _redirects file...');
  fs.writeFileSync(
    redirectsPath,
    `# Redirect API requests to 404
/api/*  /404.html  404

# Handle client-side routing
/*  /index.html  200`
  );
  console.log('_redirects file created.');
}

// Deploy to Netlify
console.log('Deploying to Netlify...');
try {
  // Run netlify deploy with production flag
  execSync('netlify deploy --prod --dir=dist/public', { stdio: 'inherit' });
  console.log('Deployment successful!');
} catch (error) {
  console.error('Deployment failed:', error.message);
  console.log('You can try manual deployment by running:');
  console.log('netlify deploy --prod --dir=dist/public');
  process.exit(1);
}