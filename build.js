const { execSync } = require('child_process');
const path = require('path');

console.log('Starting custom build process...');

try {
  // Set environment variables
  process.env.CI = 'false';
  process.env.GENERATE_SOURCEMAP = 'false';
  
  // Run the build using node directly
  const reactScriptsPath = path.join(__dirname, 'node_modules', 'react-scripts', 'scripts', 'build.js');
  
  console.log('Running React build...');
  execSync(`node "${reactScriptsPath}"`, { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
