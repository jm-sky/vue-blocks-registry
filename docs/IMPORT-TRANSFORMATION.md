# Import Transformation Implementation

## Problem
Registry components used `@/` imports (e.g., `@/components/ui/button`, `@/lib/utils`) which wouldn't work when installed in user projects that don't have these exact paths configured.

## Solution (Following shadcn-vue Best Practice)
Implemented a two-step approach:

### 1. Registry Components Use `@registry` Imports
All components in the `registry/` folder now use the `@registry` prefix:
```vue
// registry/components/ui/button/Button.vue
import { cn } from '@registry/lib/utils'
import { buttonVariants } from '@registry/components/ui/button'
```

### 2. CLI Automatically Transforms Imports
When users install components via CLI, imports are automatically transformed to match their `components.json` configuration:
```vue
// user-project/src/components/ui/button/Button.vue
import { cn } from '@/lib/utils'  // ✅ transformed!
import { buttonVariants } from '@/components/ui/button'  // ✅ transformed!
```

## Implementation Details

### Files Changed

#### 1. Created `cli/src/utils/transformers.ts`
- **`transformImports(content, config)`**: Transforms all `@registry` imports to user's configured aliases
- **`validateTransformation(content)`**: Validates that all imports were transformed correctly

Transformation mappings:
- `@registry/components` → user's `config.aliases.components` (e.g., `@/components`)
- `@registry/lib` → user's `config.aliases.lib` (e.g., `@/lib`)
- `@registry/shared/utils` → user's `config.aliases.lib` (e.g., `@/lib`)
- `@registry/shared/composables` → user's `config.aliases.composables` (e.g., `@/composables`)

#### 2. Updated `cli/src/commands/add.ts`
Added transformation logic in the `installFiles()` function:
```typescript
// Fetch file content
let content = await fetchFileContent(file.path)

// Transform @registry imports to user's aliases
content = transformImports(content, config)

// Validate transformation (optional - for debugging)
const remainingRegistryImports = validateTransformation(content)
if (remainingRegistryImports.length > 0) {
  logger.warn(`Warning: Some @registry imports may not have been transformed...`)
}

// Write transformed file
await fs.writeFile(targetPath, content, 'utf-8')
```

#### 3. Updated Registry Components
Changed all components to use `@registry` imports:
- ✅ `registry/components/ui/button/Button.vue`
- ✅ `registry/components/ui/form/*.vue`
- ✅ `registry/components/ui/input/Input.vue`
- ✅ `registry/components/ui/label/Label.vue`
- ✅ `registry/components/ui/alert/*.vue`
- ✅ `registry/components/ui/LogoText.vue`
- ✅ `registry/modules/auth/components/LoginFormOfficial.vue`
- ✅ And all other registry components

### Configuration Already in Place

The project was already configured to support `@registry` imports:

**`tsconfig.json`:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@registry/*": ["./registry/*"]
    }
  }
}
```

**`vite.config.ts`:**
```typescript
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
    '@registry': fileURLToPath(new URL('./registry', import.meta.url))
  }
}
```

## Benefits

1. ✅ **Components work in both registry project AND user projects**
   - Registry project can use and test components directly
   - User projects get properly transformed imports

2. ✅ **Clear separation**
   - `@registry` = source code in registry
   - `@/` = user's project structure

3. ✅ **Industry standard**
   - Follows shadcn-vue and shadcn-svelte patterns
   - Familiar to developers using these tools

4. ✅ **Flexible**
   - Users can customize their path aliases
   - Transformation adapts to their configuration

5. ✅ **Registry remains a working demo**
   - You can run and test the registry project
   - Components reference each other correctly

## Testing

Tested the transformation with real components:

**Input (Registry):**
```vue
import { Button } from '@registry/components/ui/button'
import { cn } from '@registry/lib/utils'
import { isValidationError } from '@registry/shared/utils/typeGuards'
```

**Output (User Project):**
```vue
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { isValidationError } from '@/lib/typeGuards'
```

All tests passed ✅

## Usage

No changes needed for end users! The transformation happens automatically:

```bash
# User runs
pnpm dlx vue-blocks-registry add button

# CLI automatically:
# 1. Fetches button component from registry
# 2. Transforms @registry imports to user's aliases
# 3. Writes transformed file to user's project
```
