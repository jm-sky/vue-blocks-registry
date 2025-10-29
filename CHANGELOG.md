# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.4] - 2025-10-29

### Added
- **CLI Help Examples**: Added usage examples to all command help texts
  - `setup --help` now shows 3 example usage patterns
  - `add --help` shows examples for single and multiple components
  - `scaffold --help` demonstrates different flag combinations
  - `init --help` shows basic and non-interactive usage
  - Improves CLI usability and discoverability

### Fixed
- **Setup Scaffold**: Added `--overwrite` flag when running scaffold from setup command
  - Prevents "Files already exist" error when using `setup --scaffold`
  - Scaffold now properly overwrites default Vue files with custom templates

## [0.3.3] - 2025-10-29

### Changed
- **CLI Help**: Enhanced main help text to indicate that users can run `<command> --help` for command-specific options
  - Added helpful hint: "Run 'vue-blocks-registry <command> --help' for more information on a specific command."
  - Improves discoverability of command options and arguments

## [0.3.2] - 2025-10-29

### Fixed
- **Layouts Dependencies**: Added missing `locale-toggle` to layouts registryDependencies
  - GuestLayoutCentered and other layout components use LocaleToggle component
  - LocaleToggle now properly installs when layouts are installed
  - Fixed incomplete layout installation missing locale switcher functionality

## [0.3.1] - 2025-10-29

### Fixed
- **Scaffold Command**: Fixed layout installation using correct registry name
  - Changed from `layout-guest-centered` to `layouts` registry item
  - GuestLayoutCentered now properly installs when HomePage.vue is generated

## [0.3.0] - 2025-10-29

### Added
- **Setup Command**: New automated project setup command
  - Creates Vue 3 project with TypeScript, Router, Pinia
  - Installs and configures Tailwind CSS v4
  - Configures TypeScript path aliases (`@/*`, `baseUrl`)
  - Runs shadcn-vue init with defaults (New York, Zinc, CSS variables)
  - `--scaffold` flag to optionally run scaffold after setup
  - Runs linter to format generated code
  - Usage: `npx vue-blocks-registry setup my-app --scaffold`
- **Enhanced Scaffold Command**: Now generates complete project structure
  - `src/pages/HomePage.vue` - Home page with GuestLayoutCentered layout
  - `src/router/index.ts` - Vue Router configuration
  - `src/router/routes.ts` - Application routes definition with home route
  - Automatically cleans up default Vue boilerplate files (views, counter store, HelloWorld, etc.)
  - Auto-installs required components (sonner, GuestLayoutCentered)
- **Shadcn-vue Fallback**: Component installation now automatically falls back to shadcn-vue
  - If a component is not found in vue-blocks-registry, it tries to install from shadcn-vue
  - Seamless experience for users - no need to know where each component comes from
- **Helper Modules**: Extracted reusable logic to `cli/src/helpers/`
  - `component-installer.ts` - Component installation with dependency resolution
  - `project-cleanup.ts` - Project cleanup utilities

### Changed
- **README**: Updated with automated setup as recommended approach
  - Added Option 1 (Automated Setup) with setup command
  - Moved manual setup to Option 2
  - Updated CLI commands documentation
- **Code Architecture**: Refactored scaffold command for better maintainability
  - Reduced `scaffold.ts` from 498 to 303 lines (39% reduction)
  - Eliminated code duplication across commands
  - Improved testability with modular helpers

## [0.2.7] - 2025-10-29

### Fixed
- **Scaffold Command**: Fixed missing template files in published package
  - Added `cli/templates/**/*` to package.json `files` field
  - Template files (main.ts, App.vue, eslint.config.ts, .env.example) are now properly included when installed via npm/pnpm
  - Resolves "ENOENT: no such file or directory" error when running `scaffold` command

## [0.2.6] - 2025-10-28

### Fixed
- **DataTable Row Selection**: Fixed "Select All" checkbox not working
  - Updated checkbox implementation from `checked` to `modelValue` (Reka-UI breaking change)
  - Updated event handler from `onUpdate:checked` to `onUpdate:model-value`
  - All rows now properly select/deselect when clicking header checkbox
- **DataTable Column Visibility**: Fixed column visibility toggle not working
  - Added `column.toggleVisibility()` call in `DataTableToolbar.vue`
  - Columns now properly hide/show when toggled via dropdown menu
- **DataTable Configuration**: Fixed missing `enableRowSelection` in TanStack Table config
  - Added `enableRowSelection` and `enableMultiRowSelection` properties
  - Row selection state now properly synchronized with table instance

### Changed
- **DataTableShowcase**: Updated to use correct props
  - Changed `filter-column` to `search-placeholder`
  - Added `enable-row-selection` boolean prop
  - Updated example code to reflect correct API usage
- **DataTable Toolbar**: Improved reactivity with `v-model` bindings
  - Changed from event-based to `v-model` for `global-filter` and `column-visibility`
- **Pagination Options**: Reduced default page size options from `[10, 20, 30, 40, 50, 100, 500]` to `[10, 20, 50, 100, 500]`

## [0.2.5] - 2025-10-24

### Added
- **LogoText Component**: Added `logo-text` UI component to registry for branding
- **Auth Config Module**: Added `auth-config` registry item containing:
  - auth.config.ts - Authentication configuration
  - queryClient.ts - TanStack Query client setup
  - routes.ts - Auth route definitions
  - queryUtils.ts - Query utilities for auth
- **Base Types**: Added `base-types` registry item with base.type.ts (TULID type)
- **.env.example Template**: Added environment variables template to scaffold command
  - Includes API base URL configuration
  - App configuration variables (ID, name, description)
  - Optional i18n locale settings

### Changed
- **Auth Service**: Removed mock service import from production authService.ts
  - Mock service is no longer bundled with installed components
  - Users get clean production-ready auth service
- **Layouts Dependencies**: Added `logo-text` to layouts bundle registryDependencies
- **Config Types**: Moved `SupportedLocale` type to config.ts to avoid cyclic dependencies
  - Fixed `config.i18n.fallbackLocale` type errors
  - Added LOCALE_STORAGE_KEY export to config

### Fixed
- **Auth Module Dependencies**: Fixed missing registry dependencies in authFull bundle
  - auth-composables now depends on auth-config
  - auth-types now depends on base-types
  - auth-forms includes form and input dependencies
  - auth-pages includes form, input, and alert dependencies
- **Cyclic Dependency**: Resolved circular import between config and i18n modules

## [0.2.4] - 2025-10-24

### Added
- **SCAFFOLDING Category in List**: Added dedicated SCAFFOLDING section to `list` command showing scaffold options
- **Automatic Dependency Installation**: Scaffold command now automatically installs required dependencies
  - Runtime dependencies: @tanstack/vue-query, floating-vue, pinia, vue-router, vue-sonner
  - Dev dependencies: @vue/eslint-config-typescript, eslint, eslint-plugin-perfectionist, eslint-plugin-vue
  - Detects package manager (npm/pnpm/yarn) and uses appropriate commands
  - Gracefully handles installation failures with manual instructions
- **i18n Setup Instructions**: Added commented-out i18n setup in main.ts template for easy opt-in

### Changed
- Removed dependency installation instructions from scaffold output (now installed automatically)
- Improved `Next steps` section to show only relevant actions

### Fixed
- Fixed scaffold command failing when files exist without --overwrite flag
- Better error handling when using --yes flag without --overwrite on existing files

## [0.2.3] - 2025-10-24

### Added
- **ESLint Config Template**: Added `eslint.config.ts` template to scaffold command
  - Flat config format with Vue, TypeScript, and Perfectionist plugins
  - Pre-configured rules for clean and consistent code
  - Includes sensible defaults for Vue 3 and TypeScript projects
  - Can be generated via `vue-blocks-registry scaffold` command

### Changed
- Enhanced scaffold command to show relevant dependencies based on generated files
  - Runtime dependencies shown only when main.ts or App.vue is generated
  - Dev dependencies shown only when eslint.config.ts is generated

## [0.2.2] - 2025-10-24

### Added
- **Scaffold Command**: New `scaffold` CLI command to generate foundational project files
  - `src/main.ts` template with Pinia, Router, Vue Query, i18n, and vTooltip setup
  - `src/App.vue` template with RouterView and Toaster component
  - Interactive file selection or `--all` flag to generate all files
  - `--overwrite` flag to force overwrite existing files
  - `--yes` flag to skip confirmation prompts
- **Sonner Component**: Added toast notification component to registry
  - Sonner.vue wrapper for vue-sonner library
  - Export file for easy imports

### Changed
- Removed unused parameters in scaffold command for cleaner code

## [0.2.1] - 2025-10-24

### Fixed
- **CLI Path Resolution**: Fixed critical issue where auth module files were being placed under `src/components/auth/` instead of `src/modules/auth/`
- **Import Transformation**: Fixed `@registry/modules/*` imports to correctly transform to `@/modules/*`
- **Import Transformation**: Fixed `@registry/app/layouts/*` imports to correctly transform to `@/layouts/*`
- **Import Transformation**: Fixed `@registry/shared/*` imports to correctly transform to `@/shared/*` (except utils which still maps to `@/lib`)

### Changed
- Enhanced CLI path resolution to preserve full directory structure for `modules/`, `app/`, and `shared/` directories
- Updated import transformer to handle modular project structures correctly

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
