# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`vue-blocks-registry` is a modular registry system for Vue 3 projects, inspired by shadcn-vue. It provides reusable UI components, functional features, and complete page bundles. The project consists of two main parts:
1. **CLI tool** (`cli/`) - Node.js CLI that installs components into user projects
2. **Registry** (`registry/`) - Collection of Vue 3 components, features, and bundles

Published as an npm package with the binary `vue-blocks-registry`.

## Development Commands

### Build & Test
```bash
# Build CLI only
pnpm run build:cli

# Build demo app
pnpm run build

# Run type checking
pnpm run type-check

# Run linting (with auto-fix)
pnpm run lint

# Run unit tests
pnpm run test:unit
```

### Development
```bash
# Run dev server for testing registry components
pnpm run dev

# Test CLI locally (uses tsx for development)
pnpm run cli [command]

# Test built CLI
node cli/dist/index.js [command]
```

## Versioning & Publishing

**CRITICAL**: Before every publish to npm, you MUST:
1. Update `CHANGELOG.md` with all changes
2. Bump version using one of:
   - `pnpm run version:patch` (bug fixes: 0.0.X)
   - `pnpm run version:minor` (new features: 0.X.0)
   - `pnpm run version:major` (breaking changes: X.0.0)
3. Commit changes: `git commit -m "chore: Release vX.X.X"`
4. Create git tag: `git tag vX.X.X`
5. Push: `git push origin develop && git push origin vX.X.X`
6. Publish: `npm publish`

See `VERSIONING.md` for complete workflow details.

The `prepublishOnly` hook automatically runs: `build:cli`, `type-check`, and `lint`.

## Architecture

### Registry Items Structure

Registry items are defined in `registry.json` with these types:
- **`registry:ui`** - UI components (button, input, form, etc.)
- **`registry:lib`** - Utilities, services, stores, types
- **`registry:page`** - Page components
- **`registry:layout`** - Layout components
- **`registry:feature`** - Standalone features (e.g., dark-mode)
- **`registry:bundle`** - Collections of related items (e.g., authFull)

Each item specifies:
- `files[]` - Files to copy to user project
- `dependencies[]` - npm packages to install
- `registryDependencies[]` - Other registry items it depends on

### Import Transformation System

**Critical**: All registry components MUST use `@registry` imports, not `@/` imports.

```vue
<!-- ✅ CORRECT: registry/components/ui/button/Button.vue -->
import { cn } from '@registry/lib/utils'

<!-- ❌ WRONG -->
import { cn } from '@/lib/utils'
```

When users install components via CLI, imports are automatically transformed:
- `@registry/components` → user's `config.aliases.components` (e.g., `@/components`)
- `@registry/lib` → user's `config.aliases.lib` (e.g., `@/lib`)
- `@registry/shared/utils` → user's `config.aliases.lib`
- `@registry/shared/composables` → user's `config.aliases.composables`

See `IMPORT-TRANSFORMATION.md` for full details.

The transformation logic is in `cli/src/utils/transformers.ts` and applied in `cli/src/commands/add.ts`.

### Project Structure

```
cli/                          # CLI tool source
├── src/
│   ├── commands/            # CLI commands (init, add, list)
│   ├── utils/               # Utilities (config, registry, transformers)
│   └── types/               # TypeScript types
└── dist/                    # Compiled CLI output

registry/                    # Registry components source
├── components/ui/           # UI components (button, input, form, etc.)
├── modules/auth/            # Auth module (store, services, pages, etc.)
├── app/layouts/             # Layout components
└── shared/                  # Shared utilities (config, services, composables)

src/                         # Demo app for testing registry components
```

### Supported User Project Structure

Registry items are designed for this target structure in user projects:
```
src/
├── components/
│   └── ui/                  # shadcn-vue style UI components
├── lib/                     # Utilities (utils.ts, apiClient.ts)
├── composables/             # Vue composables
├── modules/                 # Feature modules (auth, billing, etc.)
│   └── auth/
│       ├── components/
│       ├── pages/
│       ├── store/
│       ├── services/
│       ├── validation/
│       └── types/
├── stores/                  # Pinia stores (if not using modular structure)
└── config.ts                # Centralized config
```

See `docs/FOLDER_STRUCTURE.md` and `docs/GUIDELINES.md` for detailed structure guidelines.

## Key Technologies

- **Vue 3** with Composition API
- **TypeScript**
- **Tailwind CSS v4**
- **Pinia** for state management
- **VeeValidate + Zod** for form validation
- **Axios** for HTTP client
- **Reka UI** (formerly Radix Vue) for accessible components
- **Commander** for CLI
- **pnpm** as package manager (required)

## CLI Commands

```bash
# Initialize project configuration
vue-blocks-registry init

# Add component/feature/bundle
vue-blocks-registry add <name>

# List available items
vue-blocks-registry list
```

## Testing

When testing the CLI locally before publishing:

```bash
# Build CLI
pnpm run build:cli

# Test basic commands
node cli/dist/index.js --version
node cli/dist/index.js list

# Test in a real project
cd tmp-test-project
node ../cli/dist/index.js init
node ../cli/dist/index.js add button
```

## Registry Development Guidelines

1. **Always use `@registry` imports** in registry components - **This is enforced by ESLint!**
   - ESLint will throw an error if you use `@/` or `~/` imports in `registry/**` files
   - The rule provides a clear error message explaining the requirement
2. **Export types and interfaces** from index.ts files for easy imports
3. **Follow modular structure** for features (store, service, validation, types separate)
4. **Use Zod schemas** for validation with VeeValidate integration
5. **Type guards** for error handling (see `shared/utils/typeGuards.ts`)
6. **Config-driven** - use `config.ts` for app settings, avoid hardcoding

## ESLint Import Validation

The project has ESLint rules to enforce correct import patterns:
- **`registry/**` files**: MUST use `@registry/*` imports (enforced by `no-restricted-imports` rule)
- **`src/**` files**: Can use both `@/` and `@registry/*` imports

If you accidentally use `@/` imports in registry files, ESLint will show:
```
error '@/components/...' import is restricted from being used by a pattern.
Use @registry imports in registry files instead of @/ imports.
Registry components must use @registry/* to work when installed in user projects.
```

Run `pnpm run lint` to check for import violations.

## Important Files

- `registry.json` - Registry items catalog
- `components.json` - User project configuration (created by `init` command)
- `VERSIONING.md` - Complete release workflow
- `IMPORT-TRANSFORMATION.md` - Import transformation documentation
- `CHANGELOG.md` - Version history (MUST be updated before releases)
- W plikach SPF .vue zawsze pierwszy powinien być <script setup> a potem dopiero <template>