#!/bin/bash

# Script to test full CLI setup with validation
# This script:
# 1. Creates a fresh test project using setup --all
# 2. Runs linter, type-check, and build to validate the installation
# 3. Reports any errors found
#
# Usage: ./scripts/test-full-setup.sh [project-name]
#
# Examples:
#   ./scripts/test-full-setup.sh
#   ./scripts/test-full-setup.sh my-test-app

set -e
set -o pipefail

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Get absolute path to the project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Default project name
TEST_PROJECT_NAME="${1:-tmp-test-project}"
TEST_PROJECT_PATH="$PROJECT_ROOT/$TEST_PROJECT_NAME"

echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  Vue Blocks Registry - Full Setup Test                        ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Step 1: Clean up previous test project
if [ -d "$TEST_PROJECT_PATH" ]; then
  echo -e "${YELLOW}→ Removing existing test project: ${TEST_PROJECT_NAME}${NC}"
  rm -rf "$TEST_PROJECT_PATH"
  echo -e "${GREEN}✓ Cleaned up${NC}"
  echo ""
fi

# Step 2: Run setup --all
echo -e "${BLUE}→ Creating new test project with setup --all...${NC}"
echo -e "${CYAN}  Command: ./scripts/test-cli.sh setup --all ${TEST_PROJECT_NAME}${NC}"
echo ""

cd "$PROJECT_ROOT"
if ./scripts/test-cli.sh setup --all "$TEST_PROJECT_NAME"; then
  echo ""
  echo -e "${GREEN}✓ Setup completed successfully${NC}"
  echo ""
else
  echo ""
  echo -e "${RED}✗ Setup failed${NC}"
  exit 1
fi

# Step 3: Validate project exists
if [ ! -d "$TEST_PROJECT_PATH" ]; then
  echo -e "${RED}✗ Test project directory not found: ${TEST_PROJECT_PATH}${NC}"
  exit 1
fi

cd "$TEST_PROJECT_PATH"

echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  Running Validation Tests                                     ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Track overall success
VALIDATION_FAILED=0

# Step 4: Run linter
echo -e "${BLUE}→ Running linter...${NC}"
if pnpm run lint 2>&1 | tee /tmp/lint-output.log; then
  echo -e "${GREEN}✓ Linter passed${NC}"
  echo ""
else
  echo -e "${RED}✗ Linter failed${NC}"
  echo -e "${YELLOW}  See errors above${NC}"
  echo ""
  VALIDATION_FAILED=1
fi

# Step 5: Run type-check
echo -e "${BLUE}→ Running type-check...${NC}"
if pnpm run type-check 2>&1 | tee /tmp/type-check-output.log; then
  echo -e "${GREEN}✓ Type-check passed${NC}"
  echo ""
else
  echo -e "${RED}✗ Type-check failed${NC}"
  echo -e "${YELLOW}  See errors above${NC}"
  echo ""
  VALIDATION_FAILED=1
fi

# Step 6: Run build
echo -e "${BLUE}→ Running build...${NC}"
if pnpm run build 2>&1 | tee /tmp/build-output.log; then
  echo -e "${GREEN}✓ Build passed${NC}"
  echo ""
else
  echo -e "${RED}✗ Build failed${NC}"
  echo -e "${YELLOW}  See errors above${NC}"
  echo ""
  VALIDATION_FAILED=1
fi

# Summary
echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  Test Summary                                                  ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Project:${NC} $TEST_PROJECT_NAME"
echo -e "${BLUE}Location:${NC} $TEST_PROJECT_PATH"
echo ""

if [ $VALIDATION_FAILED -eq 0 ]; then
  echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║  ✓ ALL TESTS PASSED                                           ║${NC}"
  echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
  echo ""
  echo -e "${GREEN}The project was successfully created and validated.${NC}"
  echo -e "${CYAN}You can now explore it at: ${TEST_PROJECT_PATH}${NC}"
  echo ""
  exit 0
else
  echo -e "${RED}╔════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${RED}║  ✗ VALIDATION FAILED                                           ║${NC}"
  echo -e "${RED}╚════════════════════════════════════════════════════════════════╝${NC}"
  echo ""
  echo -e "${RED}Some validation tests failed. Please review the errors above.${NC}"
  echo -e "${YELLOW}Project is available for debugging at: ${TEST_PROJECT_PATH}${NC}"
  echo ""
  exit 1
fi
