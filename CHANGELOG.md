# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-01-23

### Added
- **UI Components Suite**:
  - HoverCard components with gradient overlay and link variants
  - DropdownMenu components (14 components: menu, item, label, separator, checkbox, radio, sub-menu, shortcuts, etc.)
  - Table components suite (Table, TableBody, TableHead, TableRow, TableCell, TableEmpty, etc.)
  - DataTable components with TanStack Table integration (DataTable, DataTableBasic)
  - ButtonLink and ButtonLinkExternal components
  - Checkbox component
  - ScrollToTop component
  - GradientButton component
  - HoverLink and HoverLinkExternal components
  - Sidebar components suite (18 components with provider, menu, rail, trigger, etc.)
  - Sheet components suite (9 components: dialog, content, header, footer, etc.)
  - Separator component
  - Skeleton component
  - Tooltip components suite (Tooltip, TooltipContent, TooltipProvider, TooltipTrigger)

- **Layout Components**:
  - MainNav component for main navigation
  - PageCard component for page wrapping
  - PageListHeader and PageListWrapper components
  - UserNav component with dropdown menu

- **Auth Module Enhancements**:
  - TanStack Query integration for auth module
  - Auth query configuration (`auth.config.ts`, `queryClient.ts`)
  - Query utilities (`queryUtils.ts`)
  - Enhanced useAuth composable with query support
  - Auth module comprehensive README documentation

- **Layouts**:
  - GuestLayoutCenteredGlass - Glass-morphism centered layout
  - GuestLayoutTwoColumns - Two-column guest layout
  - Renamed AuthLayout to GuestLayoutCentered for clarity
  - Renamed DefaultLayout to PublicLayout for clarity

- **Demo & Documentation**:
  - New demo pages structure with main layout
  - Introduction page with hero section
  - Components showcase page
  - Examples page with auth and dashboard examples
  - Data table examples with full column definitions
  - Enhanced demo layouts (MainLayout, DocsLayout with sidebar)
  - ComponentCard, FeatureCard, HeroSection components
  - Auth links and menu components

- **Assets**:
  - Hero image and video for demo
  - Logo image
  - GithubIcon component

- **Configuration**:
  - Enhanced registry.json with all new components
  - Added tanstack/vue-query and tanstack/vue-table dependencies

### Changed
- Enhanced AuthenticatedLayout with improved structure
- Updated dark mode toggle with better styling
- Improved button component variants
- Enhanced CSS styles with new utility classes
- Restructured demo router with cleaner route organization
- Updated auth pages with new layout components
- Improved NotFoundPage styling

### Removed
- Removed deprecated StandoutCard components
- Removed old demo structure (DemoParent, Auth.vue, Forms.vue, Layout.vue, Buttons.vue)
- Removed ComingSoon and StatsSection components
- Removed old icon components (ButtonIcon, FormIcon, LayoutIcon)
- Removed deprecated Header and NavbarTop components

### Documentation
- Added comprehensive auth module README
- Added data table README with usage examples
- Added planning document for component collection

## [0.1.8] - 2025-01-27

### Added
- Registry build script (`scripts/build-registry.ts`) to auto-generate component JSON files from registry.json
- `build:registry` npm script for generating registry component files
- All 20 component JSON files in `public/r/styles/default/` directory
- Automated registry build integrated into `prepublishOnly` hook

### Fixed
- Fixed CLI unable to install components other than `utils` and `button`
- Updated vite to 7.1.11 to fix security vulnerability (GHSA-93m4-6634-74q7)

### Changed
- All registry components now available for CLI installation (label, input, form, config, type-guards, http-client, auth-*, layouts, alert, dark-mode, bundles)
- Improved registry JSON generation process for better maintainability

## [0.1.7] - 2025-01-27

### Added
- Automatic package manager detection for CLI commands
- Support for npm, pnpm, and yarn package managers
- Dynamic dependency installation using the detected package manager

### Fixed
- Fixed "pnpm is not recognized" error when using CLI with npm or yarn projects
- CLI now automatically detects and uses the correct package manager based on lock files

### Changed
- Updated `add` command to use detected package manager instead of hardcoded pnpm
- Enhanced CLI logging to show which package manager is being used

## [0.1.6] - 2025-10-21

### Changed
- Updated package.json homepage to production demo URL (https://vue-blocks-registry.dev-made.it)

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
