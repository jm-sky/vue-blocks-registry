import type { Config } from './config.js'

/**
 * Transforms @registry imports to user's configured aliases
 *
 * Example transformations:
 * - @registry/components/ui/button -> @/components/ui/button
 * - @registry/lib/utils -> @/lib/utils
 * - @registry/shared/utils/typeGuards -> @/lib/typeGuards (or @/shared/utils/typeGuards)
 */
export function transformImports(content: string, config: Config): string {
  let transformed = content

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

  // Transform @registry/shared -> @/lib or custom shared alias
  // By default, map shared utils to lib since most configs don't have a separate shared alias
  const sharedAlias = config.aliases.lib || '@/lib'
  transformed = transformed.replace(
    /@registry\/shared\/utils/g,
    sharedAlias
  )

  // Transform remaining @registry/shared paths (composables, services, etc.)
  // Map to composables or lib depending on the path
  transformed = transformed.replace(
    /@registry\/shared\/composables/g,
    config.aliases.composables || '@/composables'
  )

  // For other shared paths (services, types, config), map to lib
  transformed = transformed.replace(
    /@registry\/shared/g,
    sharedAlias
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
  return matches || []
}
