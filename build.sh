#!/bin/bash
set -e

# Install dependencies
npm install

# Build the project
npx react-scripts build

echo "Build completed successfully"
