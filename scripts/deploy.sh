#!/bin/bash

# Deployment script for vue-blocks-registry
# This script pulls latest changes, installs dependencies, builds the project,
# and deploys to /var/www/vue-blocks-registry/
#
# Usage:
#   ./scripts/deploy.sh           # Deploy without removing old files
#   ./scripts/deploy.sh --clean   # Remove old files before deploying

set -e  # Exit on error

# Parse command line arguments
CLEAN_DEPLOY=false
if [[ "$1" == "--clean" ]]; then
  CLEAN_DEPLOY=true
fi

echo "🚀 Starting deployment..."

# Pull latest changes
echo "📥 Pulling latest changes from git..."
git pull

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build project
echo "🔨 Building project..."
pnpm run build

# Deploy to web server
echo "🌐 Deploying to /var/www/vue-blocks-registry/..."

if [ "$CLEAN_DEPLOY" = true ]; then
  echo "🧹 Cleaning old files..."
  sudo rm -rf /var/www/vue-blocks-registry/*
fi

sudo cp -r dist/* /var/www/vue-blocks-registry/

echo "✅ Deployment completed successfully!"
