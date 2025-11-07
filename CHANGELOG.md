# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.10.1] - 2025-11-07

### Added
- **Settings Module Registry Entries**: Complete registry definitions for settings module
  - `settings-types` - TypeScript type definitions (Theme, Settings, ISettingsService)
  - `settings-utils` - TanStack Query utilities (query keys, retry functions)
  - `settings-service` - Settings API service with real and mock implementations
  - `settings-validation` - Zod validation schemas for settings forms
  - `settings-composables` - Vue composables (useSettings, useUpdateSettings)
  - `settings-components` - UI components (PreferencesSettingsCard, DeleteAccountCard)
  - All components now available in CLI via `vue-blocks-registry add settings-*`

- **Test Automation**: Full setup validation script
  - `scripts/test-full-setup.sh` - Automated testing of full CLI setup
  - Runs linter, type-check, and build on generated projects
  - Provides detailed error reporting and validation summary

- **Documentation**: Issue tracking and resolution documentation
  - `docs/issues/v0.9.1--2025-11-06/` - Historical issue documentation
  - `docs/issues/v0.9.1--2025-11-07/` - Current issue documentation
  - Documented account deletion implementation status
  - Documented logs-management module renaming

### Changed
- **Settings Bundle**: Updated registry dependencies
  - `settings-pages` now depends on `settings-components` and `security-settings-card`
  - `settingsFull` bundle now includes all 11 module components (was 4)
  - Improved dependency resolution for complete module installation

### Fixed
- **i18n Module Integration**: Fixed logs-management module naming
  - CLI now uses `logs-management` instead of `logs` in i18n injection
  - Updated `cli/src/commands/setup.ts` module list
  - Added `toCamelCase()` helper in `i18n-injector.ts` for hyphenated module names
  - Renamed exports: `logsEn`/`logsPl` → `logsManagementEn`/`logsManagementPl`
  - Fixed imports in demo app `src/i18n/index.ts`

- **Demo App**: Fixed badge component imports
  - Updated `src/pages/demo/examples/Auth.vue` to use `@/components/ui/badge/`
  - Updated `src/pages/demo/examples/TenantSelect.vue` to use `@/components/ui/badge/`
  - Fixed TypeScript compilation errors in demo pages

- **Test Script**: Improved error detection
  - Added `set -o pipefail` to `scripts/test-full-setup.sh`
  - Script now correctly reports validation failures
  - Better error output formatting and summary

- **Code Quality**: Minor linting fixes
  - Removed trailing newlines in `cli/src/helpers/router-injector.ts`
  - Removed trailing newlines in `registry/modules/dashboard/routes.ts`

## [0.10.0] - 2025-11-07

### Added
- **Account Deletion Feature**: Complete account deletion functionality
  - `deleteAccount` method in `IAuthService` interface
  - Implementation in `authService` (DELETE /api/auth/account endpoint)
  - Mock implementation in `mockAuthService` for demo purposes
  - `useDeleteAccount` composable with automatic logout on success
  - Integration with `useAuth` composable
  - Delete Account section in Settings page with confirmation modal
  - Full i18n support (EN/PL) for delete account feature
  - Security warnings and confirmation flow (type DELETE + checkbox)

- **Settings Page Components**: Modular settings page architecture
  - `PreferencesSettingsCard` component for theme and locale settings
  - `DeleteAccountCard` component for account deletion
  - Refactored `SettingsPage` to use separate card components
  - Improved code organization and maintainability

- **Demo Settings Page**: Enhanced demo settings page
  - Full settings page with preferences and delete account sections
  - Delete account modal with confirmation flow
  - Demo integration showing account deletion functionality

- **Badge Component**: New UI badge component
  - Badge.vue component
  - Badge index exports

### Changed
- **Settings Page Refactoring**: Modularized settings page
  - Extracted preferences section to `PreferencesSettingsCard`
  - Extracted delete account section to `DeleteAccountCard`
  - Simplified `SettingsPage` to use card components
  - Better separation of concerns

- **Settings i18n**: Enhanced settings translations
  - Added `preferences` section translations (EN/PL)
  - Added `delete_account` section translations (EN/PL)
  - Comprehensive modal translations for delete account flow

## [0.9.1] - 2025-11-06

### Fixed
- **Module Naming Conflict**: Resolved gitignore conflict with logs module
  - Module `logs` renamed to `logs-management` to avoid conflicts with common `.gitignore` patterns
  - No longer requires manual `.gitignore` exceptions (`!app/modules/logs`)
  - All references updated across registry, CLI, and documentation

### Added
- **Account Deletion Feature (Phase 1)**: Basic account deletion functionality
  - Backend endpoint DELETE /api/auth/account
  - Soft delete with data anonymization
  - Removal of related data (2FA, passkeys)
  - Frontend confirmation modal
  - API integration

## [0.9.0] - 2025-11-05

### Added
- **Two-Factor Authentication (2FA) System**: Complete production-ready 2FA implementation
  - **TOTP Support**: Time-based One-Time Password authentication
    - QR code generation for easy setup with authenticator apps
    - Manual secret entry option
    - 6-digit code verification
    - 10 backup codes for account recovery
    - Enable/disable functionality
    - Multi-step wizard for user-friendly setup
  - **WebAuthn Passkeys Support**: Modern biometric authentication
    - Register multiple passkeys with custom names
    - Biometric authentication (Face ID, Touch ID, fingerprint)
    - Hardware security key support (YubiKey, etc.)
    - Manage registered passkeys (list, delete)
    - Track last usage per passkey
    - Cross-platform compatibility
  - **2FA Components**: Complete UI component suite
    - `TotpSetupForm` - TOTP setup wizard with QR code
    - `TotpVerifyForm` - TOTP code verification
    - `TotpQrCode` - QR code display component
    - `WebAuthnRegisterForm` - Passkey registration
    - `WebAuthnVerifyForm` - Passkey verification
    - `PasskeyList` - Passkey management list
  - **2FA Pages**: Ready-to-use page components
    - `TwoFactorSetupPage` - Complete 2FA setup page
    - `TwoFactorVerifyPage` - 2FA verification page
  - **2FA Services**: Production-ready service layer
    - `twoFactorService` - API service for 2FA operations
    - `mockTwoFactorService` - Mock service for development/demos
    - Full TypeScript type definitions
  - **2FA Composables**: Vue composables for easy integration
    - `useTotp` - TOTP setup and verification logic
    - `useWebAuthn` - WebAuthn passkey management
    - `useTwoFactor` - Combined 2FA status and methods
  - **2FA Router Guard**: Automatic route protection
    - `twoFactorGuard` - Enforces 2FA verification for protected routes
    - JWT-based 2FA status checking (`tfaPending`, `tfaVerified`, `tfaMethod` flags)
    - Automatic redirection to verification page when needed
  - **Security Settings**: Integration with settings module
    - `SecuritySettingsCard` component for 2FA management
    - Enable/disable TOTP and WebAuthn
    - View registered passkeys
    - Manage backup codes
  - **JWT Enhancement**: Extended JWT payload with 2FA flags
    - `tfaPending` - 2FA verification required
    - `tfaVerified` - 2FA verification completed
    - `tfaMethod` - Active 2FA method (TOTP or WebAuthn)
    - Enhanced JWT decoder with 2FA status extraction
  - **i18n Support**: Full internationalization
    - English and Polish translations for all 2FA features
    - Auth module i18n extended with 2FA messages
    - Settings module i18n extended with security settings
  - **Documentation**: Comprehensive 2FA guide
    - `docs/2FA_README.md` - Complete implementation guide
    - Usage examples and API documentation
    - Router setup instructions
    - Mock service usage guide
  - **Registry Bundles**: New 2FA bundles for easy installation
    - `twoFactorFeat` - Core 2FA functionality (services, composables, types)
    - `twoFactorFull` - Complete 2FA bundle (includes UI components and pages)
  - **Tabs Component**: Added tabs UI component for 2FA setup wizard
    - Tabs, TabsList, TabsTrigger, TabsContent components
    - Full keyboard navigation support

### Changed
- **JWT Types**: Refactored JWT type definitions
  - Replaced `MockJWTPayload` and `MockJWTPayloadOptions` with `JWTPayload` and `JWTPayloadOptions`
  - Centralized JWT types in `shared/types/jwt.type.ts`
  - Enhanced type safety across JWT handling
- **Router Injector**: Updated router injector to support 2FA routes
- **Auth Routes**: Extended auth routes with 2FA pages
  - `/auth/2fa/setup` - 2FA setup page
  - `/auth/2fa/verify` - 2FA verification page

### Fixed
- **Code Cleanup**: Removed trailing blank lines in router files
- **Tenant Service**: Updated to use new JWT types for consistency

## [0.8.3] - 2025-11-04

### Fixed
- **Main Template i18n Import**: Fixed incorrect i18n import path in main.ts template
  - Changed from `@/shared/i18n` to `@/i18n` to match the two-layer i18n architecture
  - Aligns with documentation in I18N_ARCHITECTURE.md
  - Fixes import errors when scaffolding new projects

## [0.8.2] - 2025-11-04

### Added
- **Select Component**: Added select dropdown component to registry
  - 11 Select component files (Select, SelectContent, SelectGroup, SelectItem, etc.)
  - Full keyboard navigation and accessibility support
  - Added to registry.json with proper dependencies (reka-ui, utils)

- **i18n Architecture Documentation**: Comprehensive documentation for i18n system
  - New `docs/I18N_ARCHITECTURE.md` explaining two-layer architecture
  - Documents registry layer (shared/i18n) vs application layer (i18n)
  - Explains auto-injection mechanism and anchor comments
  - Troubleshooting guide and best practices

- **Module Documentation Structure**: Added documentation references in CLAUDE.md
  - New "Module Architecture & Documentation" section
  - Direct links to specialized docs (i18n, guidelines, imports)
  - Helps developers and AI agents find relevant documentation

### Changed
- **i18n Template Architecture**: Eliminated code duplication in i18n configuration
  - `src/i18n/index.ts` now uses `createI18nInstance()` from registry
  - Removed duplicated locale detection and configuration logic
  - Template now only handles message merging, not configuration
  - Cleaner, more maintainable application-level i18n setup

### Fixed
- **Module Dependencies**: Fixed missing registry dependencies
  - `user-pages`: Added button-link, form, input, type-guards dependencies
  - `settings-pages`: Added button, form, select dependencies
  - Modules now install all required components automatically

### Documentation
- Added inline comments in CLI helpers explaining architecture
- Updated scaffold.ts with reference to I18N_ARCHITECTURE.md
- Enhanced i18n-injector.ts with architecture documentation links

## [0.8.1] - 2025-11-03

### Fixed
- **Module i18n Installation**: Added missing i18n registry items
  - Added `auth-i18n`, `user-i18n`, `settings-i18n`, `logs-i18n` to registry
  - Translation files now properly install with their respective modules
  - authFull, userFull, settingsFull, logsFull bundles now include i18n dependencies
  - Fixes broken imports in automatically generated `src/i18n/index.ts`

## [0.8.0] - 2025-11-03

### Added
- **Auth Guards Module**: New dedicated router guard system for authentication
  - `auth-guards` registry item with `authGuard.ts` module
  - Auto-refresh user data when JWT exists but user data is missing
  - Auto-logout on 401 Unauthorized errors
  - `protectRoutes(router)` helper function for easy installation
  - Added to `authFeat` bundle for automatic inclusion

- **Automatic i18n Module Merging**: `setup --all` now auto-configures i18n
  - New `src/i18n/index.ts` template with module import anchors
  - Automatic injection of i18n imports for installed modules (auth, user, settings, logs)
  - i18n-injector helper that intelligently merges translations
  - No manual configuration needed - works out of the box

### Changed
- **Router Guard Injection**: Simplified guard installation process
  - CLI now injects `protectRoutes()` instead of inline guard code
  - Updated router template with cleaner example
  - Guards are now modular and can be imported from separate files

- **Auth Service Interface**: Enhanced user data fetching
  - `getCurrentUser()` method now properly validates tokens
  - Mock service validates tokens against localStorage
  - Better error handling for expired/invalid tokens

- **Route Naming Convention**: Standardized to PascalCase
  - Dashboard route: `dashboard` → `Dashboard`
  - Logs route: `logs` → `Logs`
  - Settings route: `settings` → `Settings`
  - Consistent with auth routes naming (Login, Register, etc.)

- **Auth Response Type**: Extended with full token information
  - Added `refreshToken: string`
  - Added `tokenType: string`
  - Added `expiresIn: number`
  - Changed `token` → `accessToken` for clarity

- **User Type**: Extended with additional user properties
  - Added `isActive: boolean`
  - Added `isAdmin: boolean`
  - Added `createdAt: TDateTime`
  - Mock service now includes all fields

- **i18n Module Structure**: Decoupled module translations
  - `shared/i18n/locales/en.ts` and `pl.ts` now contain only common messages
  - Module-specific translations remain in their respective modules
  - Users merge translations in their own `src/i18n/index.ts`
  - Prevents broken imports when modules are not installed

### Fixed
- Removed extra blank lines at end of files (standardized to 1)
- Fixed Tailwind CSS class in LogoText component (`bg-gradient-to-r`)
- Improved code readability in auth guard with simplified flow
- Fixed i18n import errors by removing module dependencies from shared i18n

## [0.7.3] - 2025-11-03

### Fixed
- Fix repository paths and configs

## [0.7.2] - 2025-11-03

### Fixed
- Fix repository author in package.json

## [0.7.1] - 2025-11-03

### Fixed
- Corrected type paths across modules (auth/logs/settings/user).

## [0.7.0] - 2025-11-03

### Added
- **Auth Guards**: Introduced route authentication guards for protected navigation

### Changed
- **Authentication Flow**: Updated flow to integrate guards and improve UX

## [0.6.0] - 2025-10-31

### Added
- **Select Component Suite**: Complete dropdown component collection
  - Select, SelectContent, SelectTrigger, SelectValue components
  - SelectGroup, SelectLabel, SelectSeparator for organization
  - SelectItem, SelectItemText for menu items
  - SelectScrollUpButton, SelectScrollDownButton for navigation
  - Full keyboard navigation and accessibility support

- **Setup Command Enhancement**: Automatic Tailwind and proxy configuration
  - New `--dont-lint` flag to skip linter execution after setup
  - Automatic addition of Tailwind CSS configuration in vite.config.ts
  - Automatic addition of server proxy configuration in vite.config.ts
  - Updated .env.example template with API proxy URL

- **Localization Support**: Expanded i18n coverage
  - Added authentication localization strings for English and Polish
  - Added user profile localization strings in English and Polish
  - Added settings localization strings in English and Polish
  - Improved internationalization across auth and user modules

- **Enhanced User Profile Features**: 
  - Profile view page with improved UI and information display
  - Profile edit page with enhanced form elements
  - Additional user information and settings management

### Changed
- **useAuth Composable**: Enhanced flexibility with service parameter
  - Composable now accepts a service parameter for improved customization
  - Better separation of concerns and testability

- **Authentication Flow**: Auto-login feature for smoother dashboard experience
  - Improved user experience with automatic login capabilities
  - Better integration with dashboard and user flows

- **Settings Page**: Enhanced UI elements and information displays
  - Improved layout and visual hierarchy
  - Additional settings management features

### Fixed
- **Router Injector**: Cleaned up unnecessary code
- **Auth Forms**: Improved form validation and user feedback
- **Layout Consistency**: Fixed AuthenticatedLayout display issues

## [0.5.1] - 2025-10-30

### Fixed
- **Logs Module**: Added missing logs module files that were ignored by .gitignore
  - Fixed .gitignore pattern that was unintentionally ignoring `registry/modules/logs-management/` directory (module renamed from `logs` to `logs-management`)
  - Added LogsTable.vue, LogsBrowserPage.vue, and routes.ts for logs module
  - logsFull bundle now installs correctly

- **Router Templates**: Fixed template injection markers causing syntax errors
  - Separated anchor markers from inline comments in router-index.ts template
  - Guards now inject cleanly without appending comments to code

- **Auth Routes Import**: Fixed incorrect import path for authRoutes
  - Changed from `@/modules/auth/routes` to `@/modules/auth/config/routes`
  - Ensures proper route injection when using `--routes` flag

- **Auth Routes Paths**: Fixed incorrect component import paths in auth routes
  - Changed LoginPage import from `@/pages/auth/` to `@registry/modules/auth/pages/`
  - All auth page imports now use consistent `@registry` prefix

## [0.5.0] - 2025-10-30

### Added
- **Setup Command Enhancement**: New `--all` flag for full application bootstrap
  - Creates complete Vue 3 app with auth, layouts, and feature modules in one command
  - New `--auth-full` flag: Install complete auth module with layouts
  - New `--scaffold` flag: Generate foundational files after setup
  - Automatic installation of dashboardFull, userFull, settingsFull, logsFull bundles

- **Router Integration**: Automatic route and guard injection
  - New `--routes` flag for `add` command: Auto-inject module routes into router
  - New `--guards` flag for `add` command: Auto-inject auth guards into router
  - New router-injector helper for deterministic route/guard injection
  - Updated router templates with injection markers

- **New Registry Bundles**: Complete feature modules ready to use
  - `dashboardFull`: Dashboard module with page and routes
  - `userFull`: User profile module (view/edit pages + routes)
  - `settingsFull`: Settings module (page + routes)
  - `logsFull`: Logs browser module (components + pages + routes)

- **Local Testing Infrastructure**: Test unreleased features before publishing
  - `VUE_BLOCKS_LOCAL_CLI` env var: Use local CLI instead of npm
  - `VUE_BLOCKS_LOCAL_REGISTRY` env var: Read from local files instead of GitHub
  - New `test-cli.sh` script: Automated build + link + test + unlink workflow
  - npm scripts: `test:cli` and `test:setup-all` for quick testing

### Fixed
- **Route Template**: Fixed route injection anchor causing syntax errors
  - Separated anchor marker from inline comment to prevent malformed code
  - Imports and route spreads now inject cleanly without appending comments

## [0.4.12] - 2025-10-29

### Fixed
- **Auth Translations**: Fixed invalid credentials error message localization
  - Updated login error handling to use i18n for error messages
  - Added proper localization for "Invalid credentials" error
  - Improved user experience with translated auth error messages

## [0.4.11] - 2025-10-29

### Fixed
- **Environment Variables**: Updated .env.example template with all missing variables
  - Added VITE_DEFAULT_USER_EMAIL and VITE_DEFAULT_USER_PASSWORD for dev defaults
  - Added all auth route path variables (VITE_AUTH_*_PATH)
  - Uncommented i18n locale variables (now required by default)
  - Added clear comments about usage and security

## [0.4.10] - 2025-10-29

### Changed
- **i18n Configuration**: Enabled i18n by default in main.ts template
  - i18n is now imported and enabled automatically in scaffold
  - No need to uncomment - works out of the box when i18n module is added

## [0.4.9] - 2025-10-29

### Fixed
- **Import Transformation**: Fixed incorrect transformation of @registry/shared/utils imports
  - Now correctly transforms to @/shared/utils instead of @/lib
  - Fixes "Cannot find module '@/lib/typeGuards'" error in LoginForm.vue
  - All @registry/shared/* imports now preserve the shared/ directory structure

## [0.4.8] - 2025-10-29

### Fixed
- **Form Registry**: Removed non-existent Form.vue from form component files
  - Fixed "Failed to fetch components/ui/form/Form.vue" error when installing authFull
  - Form component now correctly includes only existing files

## [0.4.7] - 2025-10-29

### Changed
- **Setup Command Dependencies**: Added vue-i18n npm package installation by default
  - vue-i18n is now installed automatically during setup
  - main.ts template includes commented import with clear instructions
  - Users can uncomment when adding i18n module

## [0.4.6] - 2025-10-29

### Fixed
- **Tailwind CSS Version Alignment**: Fixed "Cannot convert undefined or null to object" error
  - Pinned tailwindcss and @tailwindcss/vite to same version (4.1.16) in setup command
  - Prevents version mismatch issues that cause Vite build errors
  - Resolves errors when importing CSS from node_modules (floating-vue, vue-sonner)
  - Updated registry dependencies to tailwindcss@4.1.16 and @tailwindcss/vite@4.1.16

## [0.4.5] - 2025-10-29

### Fixed
- **Setup Command Dependencies**: Added tw-animate-css npm package installation
  - tw-animate-css is now installed automatically during setup
  - CSS file includes `@import "tw-animate-css";` directive
  - Provides animation utilities used by registry components
- **CSS Template Formatting**: Fixed doubled newlines in generated style.css file
  - Removed extra trailing newline from CSS template
  - Cleaner generated CSS file output

## [0.4.4] - 2025-10-29

### Fixed
- **hover-link Files**: Added missing HoverLinkExternal.vue to hover-link registry files
  - HoverLinkExternal.vue now properly installs alongside HoverLink.vue
  - Resolves "Cannot find module './HoverLinkExternal.vue'" error
  - Both components now available after installation

## [0.4.3] - 2025-10-29

### Fixed
- **hover-link Index**: Fixed incorrect export in hover-link/index.ts
  - Changed from exporting HoverLinkExternal as HoverLink
  - Now correctly exports both HoverLink and HoverLinkExternal
  - Resolves "Cannot find module './HoverLinkExternal.vue'" error

## [0.4.2] - 2025-10-29

### Fixed
- **Dependencies**: Added missing dependencies for complete installation
  - Added `hover-link` to layouts registryDependencies (AuthenticatedLayout uses HoverLink)
  - Added `@tanstack/vue-table` to utils npm dependencies (utils.ts uses Updater type)
  - Ensures all required components and packages are installed automatically

## [0.4.1] - 2025-10-29

### Note
- No functional changes from 0.4.0
- Version bump to ensure package.json version consistency

## [0.4.0] - 2025-10-29

### Changed
- **BREAKING: Layouts Directory Structure**: Simplified layouts installation path
  - Moved from `src/app/layouts/` to `src/layouts/` for conventional Vue project structure
  - Registry paths changed from `app/layouts/*` to `layouts/*`
  - Import paths changed from `@registry/app/layouts` to `@registry/layouts`
  - User imports now use `@/layouts/` instead of `@/app/layouts/`
  - Removed unnecessary `app/` folder layer
  - More intuitive and aligns with standard Vue project conventions

### Migration Guide (for v0.3.x users)
If you previously installed layouts, you'll need to:
1. Move layouts from `src/app/layouts/` to `src/layouts/`
2. Update imports from `@/app/layouts/` to `@/layouts/`
3. Remove empty `src/app/` directory if no other files remain

## [0.3.6] - 2025-10-29

### Fixed
- **HomePage Template**: Fixed incorrect layout import path
  - Changed from `@/layouts/GuestLayoutCentered.vue` to `@/app/layouts/GuestLayoutCentered.vue`
  - Resolves TypeScript error "Cannot find module '@/layouts/GuestLayoutCentered.vue'"
  - Matches actual installation path of layout components

## [0.3.5] - 2025-10-29

### Fixed
- **Setup Command**: Restored missing scaffold notification message
  - "🏗️ Will scaffold to generate foundational files after setup..." message now displays when using `--scaffold` flag
  - Improves user feedback about what the command will do

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
