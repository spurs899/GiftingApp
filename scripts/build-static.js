const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const apiDir = path.join(__dirname, '..', 'app', 'api');
const apiBackup = path.join(__dirname, '..', 'app', '_api_backup');

console.log('📦 Preparing static build...');

// Rename api folder to exclude it from build
if (fs.existsSync(apiDir)) {
  console.log('   Moving API routes out of build...');
  fs.renameSync(apiDir, apiBackup);
}

try {
  // Run the build
  console.log('🔨 Building Next.js static export...');
  execSync('cross-env GITHUB_PAGES=true next build', { 
    stdio: 'inherit',
    env: { ...process.env, GITHUB_PAGES: 'true' }
  });
  console.log('✅ Build complete!');
} finally {
  // Restore api folder
  if (fs.existsSync(apiBackup)) {
    console.log('📂 Restoring API routes...');
    fs.renameSync(apiBackup, apiDir);
  }
}
