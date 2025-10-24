import type { Config } from './config.js'

/**
 * Transforms @registry imports to user's configured aliases
 *
 * Example transformations:
 * - @registry/components/ui/button -> @/components/ui/button
 * - @registry/lib/utils -> @/lib/utils
 * - @registry/modules/auth/... -> @/modules/auth/...
 * - @registry/app/layouts/... -> @/layouts/...
 * - @registry/shared/utils/typeGuards -> @/lib/typeGuards (or @/shared/utils/typeGuards)
 */
export function transformImports(content: string, config: Config): string {
  let transformed = content

  // Transform @registry/modules -> @/modules (preserve full module structure)
  transformed = transformed.replace(
    /@registry\/modules/g,
    '@/modules'
  )

  // Transform @registry/app/layouts -> @/layouts
  transformed = transformed.replace(
    /@registry\/app\/layouts/g,
    '@/layouts'
  )

  // Transform @registry/components -> user's components alias
  if (config.aliases.components) {
    const componentsAlias = config.aliases.components
    transformed = transformed.replace(
      /@registry\/components/g,
      componentsAlias
    )
  }

  // Transform @registry/lib -> user's lib alias
  if (config.aliases.lib) {
    const libAlias = config.aliases.lib
    transformed = transformed.replace(
      /@registry\/lib/g,
      libAlias
    )
  }

  // Transform @registry/shared paths
  // Map shared utils to lib alias (e.g., @/lib/utils.ts)
  transformed = transformed.replace(
    /@registry\/shared\/utils/g,
    config.aliases.lib || '@/lib'
  )

  // Transform remaining @registry/shared paths to @/shared (preserve structure)
  // This includes: components, composables, services, config, i18n, etc.
  transformed = transformed.replace(
    /@registry\/shared/g,
    '@/shared'
  )

  return transformed
}

/**
 * Validates that all @registry imports have been transformed
 * Returns an array of any remaining @registry imports found
 */
export function validateTransformation(content: string): string[] {
  const registryImportRegex = /@registry\/[\w/.-]+/g
  const matches = content.match(registryImportRegex)
  return matches ?? []
}
