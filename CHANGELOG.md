# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.5] - 2025-10-21

### Added
- ESLint rules to keep import paths in order - import from @registry only inside registry/ folder
- Added some missing default shadcn-vue components
- Added `required` and `label` props to `FormLabel` component

## [0.1.4] - 2025-10-21

### Changed
- CLI now prompts user to overwrite existing files instead of silently skipping them

## [0.1.3] - 2025-10-21

### Added
- Alert component for displaying important messages with variants
- Dark mode feature with toggle component and composable for theme management
- `authFeat` bundle - Complete authentication feature with store, services, composables, and validation (no UI)
- `authFull` bundle - Full authentication module with pages, forms, layouts, and all dependencies

## [0.1.2] - 2025-10-21

### Fixed
- Fixed `ERR_MODULE_NOT_FOUND` error when running CLI via npx by moving runtime dependencies from devDependencies to dependencies
- CLI dependencies now properly included: commander, chalk, ora, prompts, fs-extra, execa

### Changed
- Moved CLI runtime dependencies to production dependencies for proper distribution

## [0.1.1] - 2025-10-21

### Added
- Import transformation for registry components
- Alert component suite for enhanced user notifications
- Card components with enhanced structure and styling
- LogoText component for consistent branding

### Changed
- Enhanced routing and logout functionality
- Improved UI components structure

## [0.1.0] - 2025-10-21

### Added
- Initial release of vue-blocks-registry
- CLI tool for installing Vue components, features, and bundles
- Commands: `init`, `add`, `list`
- Registry system for managing reusable Vue 3 components
- Component transformation and import handling
- Authentication module with Pinia integration
- Dark mode toggle functionality
- Form components with vee-validate integration
- Button and utility components
- TypeScript support throughout
- Tailwind CSS v4 integration

### Infrastructure
- ESLint configuration with Vue and TypeScript support
- Vite build system
- Vitest for testing
- PNPM workspace configuration
