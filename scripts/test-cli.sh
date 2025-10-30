#!/bin/bash

# Script to test CLI commands with pnpm link
# This script automatically sets environment variables for local testing:
# - VUE_BLOCKS_LOCAL_CLI: Makes nested CLI calls use local CLI instead of npm
# - VUE_BLOCKS_LOCAL_REGISTRY: Makes CLI read from local registry files instead of GitHub
# This allows testing unreleased features and components.
#
# Usage: ./scripts/test-cli.sh <command> [args...]
#
# Examples:
#   ./scripts/test-cli.sh init
#   ./scripts/test-cli.sh add button
#   ./scripts/test-cli.sh list
#   ./scripts/test-cli.sh setup my-app
#   ./scripts/test-cli.sh setup -ys my-project
#   ./scripts/test-cli.sh setup --all tmp-test-project
#   ./scripts/test-cli.sh setup --auth-full --scaffold frontend
#   ./scripts/test-cli.sh scaffold --all --overwrite --yes

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get absolute path to the CLI dist file
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
LOCAL_CLI_PATH="$PROJECT_ROOT/cli/dist/index.js"

echo -e "${BLUE}Building registry...${NC}"
pnpm run build:registry

echo -e "${BLUE}Building CLI...${NC}"
pnpm run build:cli

echo -e "${BLUE}Linking package globally...${NC}"
pnpm link --global

# Export local CLI path and registry path for nested vue-blocks-registry calls
export VUE_BLOCKS_LOCAL_CLI="$LOCAL_CLI_PATH"
export VUE_BLOCKS_LOCAL_REGISTRY="$PROJECT_ROOT"
echo -e "${BLUE}Using local CLI: ${LOCAL_CLI_PATH}${NC}"
echo -e "${BLUE}Using local registry: ${PROJECT_ROOT}${NC}"

echo -e "${GREEN}Running: vue-blocks-registry $@${NC}"
echo ""

# Run the command
vue-blocks-registry "$@"

EXIT_CODE=$?

echo ""
echo -e "${YELLOW}Unlinking package...${NC}"
pnpm unlink --global

if [ $EXIT_CODE -eq 0 ]; then
  echo -e "${GREEN}✓ Command completed successfully${NC}"
else
  echo -e "${YELLOW}✗ Command exited with code $EXIT_CODE${NC}"
fi

exit $EXIT_CODE
