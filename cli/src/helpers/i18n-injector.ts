import fs from 'fs-extra'
import path from 'path'

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

  // Generate import lines for each module
  const importLines: string[] = []
  for (const module of options.modules) {
    importLines.push(`import { ${module}En } from '@/modules/${module}/i18n'`)
    importLines.push(`import { ${module}Pl } from '@/modules/${module}/i18n'`)
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
    mergeFragmentsEn.push(`...${module}En`)
    mergeFragmentsPl.push(`...${module}Pl`)
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
