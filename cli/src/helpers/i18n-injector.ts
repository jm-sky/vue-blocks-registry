import fs from 'fs-extra'
import path from 'path'

/**
 * i18n Injector - Automatic module translation aggregation
 *
 * This helper automatically injects module-specific i18n imports into the
 * application's aggregator file (src/i18n/index.ts).
 *
 * ARCHITECTURE:
 * - Registry provides base i18n config in: src/shared/i18n/
 * - Modules provide translations in: src/modules/{module}/i18n/
 * - Application aggregates all in: src/i18n/index.ts (this file)
 *
 * For detailed documentation about i18n architecture, see:
 * docs/I18N_ARCHITECTURE.md
 *
 * For module structure guidelines, see:
 * docs/GUIDELINES.md
 */

export interface InjectI18nOptions {
  projectRoot: string
  i18nIndexRelative?: string // default: src/i18n/index.ts
  modules: string[] // e.g., ['auth', 'dashboard', 'user', 'settings', 'logs']
}

const I18N_IMPORTS_ANCHOR = '// @vbr-insert-module-imports'
const I18N_MERGES_ANCHOR = '// @vbr-insert-module-merges'

/**
 * Inject i18n module imports and merges into src/i18n/index.ts
 *
 * This function is called automatically when installing modules that contain i18n.
 * It uses special anchor comments in the template to know where to inject code.
 *
 * Example:
 * ```
 * await injectI18nModules({
 *   projectRoot: '/path/to/project',
 *   modules: ['auth', 'user', 'settings']
 * })
 * ```
 *
 * This will inject:
 * ```typescript
 * // Imports:
 * import { authEn } from '@/modules/auth/i18n'
 * import { authPl } from '@/modules/auth/i18n'
 *
 * // Merges:
 * const en = { ...registryEn, ...authEn, ...userEn, ...settingsEn }
 * const pl = { ...registryPl, ...authPl, ...userPl, ...settingsPl }
 * ```
 */
export async function injectI18nModules(options: InjectI18nOptions): Promise<void> {
  const i18nIndexPath = path.join(
    options.projectRoot,
    options.i18nIndexRelative ?? 'src/i18n/index.ts',
  )

  if (!await fs.pathExists(i18nIndexPath)) {
    console.warn(`[i18n-injector] File not found: ${i18nIndexPath}`)
    return
  }

  let content = await fs.readFile(i18nIndexPath, 'utf-8')

  // Helper function to convert module name to camelCase for variable names
  const toCamelCase = (str: string): string => {
    return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
  }

  // Generate import lines for each module
  const importLines: string[] = []
  for (const module of options.modules) {
    const varName = toCamelCase(module)
    importLines.push(`import { ${varName}En } from '@/modules/${module}/i18n'`)
    importLines.push(`import { ${varName}Pl } from '@/modules/${module}/i18n'`)
  }

  // Inject imports
  if (content.includes(I18N_IMPORTS_ANCHOR) && importLines.length > 0) {
    // Check if imports already exist
    const newImports = importLines.filter(line => !content.includes(line))
    if (newImports.length > 0) {
      content = content.replace(
        I18N_IMPORTS_ANCHOR,
        `${I18N_IMPORTS_ANCHOR}\n${newImports.join('\n')}`,
      )
    }
  }

  // Generate merge fragments for each module
  const mergeFragmentsEn: string[] = []
  const mergeFragmentsPl: string[] = []
  for (const module of options.modules) {
    const varName = toCamelCase(module)
    mergeFragmentsEn.push(`...${varName}En`)
    mergeFragmentsPl.push(`...${varName}Pl`)
  }

  // Inject merges
  if (content.includes(I18N_MERGES_ANCHOR) && mergeFragmentsEn.length > 0) {
    // Find existing merge lines
    const enMergeRegex = /const en = \{([^}]+)\}/
    const plMergeRegex = /const pl = \{([^}]+)\}/

    const enMatch = enMergeRegex.exec(content)
    const plMatch = plMergeRegex.exec(content)

    if (enMatch && plMatch) {
      const existingEnMerges = enMatch[1] ? enMatch[1].trim() : ''
      const existingPlMerges = plMatch[1] ? plMatch[1].trim() : ''

      // Add new modules only if they don't exist
      const newEnMerges = mergeFragmentsEn.filter(
        frag => !existingEnMerges.includes(frag),
      )
      const newPlMerges = mergeFragmentsPl.filter(
        frag => !existingPlMerges.includes(frag),
      )

      if (newEnMerges.length > 0) {
        const updatedEnMerges = existingEnMerges
          ? `${existingEnMerges}, ${newEnMerges.join(', ')}`
          : newEnMerges.join(', ')
        content = content.replace(
          enMergeRegex,
          `const en = { ${updatedEnMerges} }`,
        )
      }

      if (newPlMerges.length > 0) {
        const updatedPlMerges = existingPlMerges
          ? `${existingPlMerges}, ${newPlMerges.join(', ')}`
          : newPlMerges.join(', ')
        content = content.replace(
          plMergeRegex,
          `const pl = { ${updatedPlMerges} }`,
        )
      }
    }
  }

  await fs.writeFile(i18nIndexPath, content, 'utf-8')
}
