import { execa } from 'execa'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'
import type { RegistryItem } from '../types/registry.js'
import type { Config } from '../utils/config.js'
import { logger } from '../utils/logger.js'
import { detectPackageManager, executeDlx } from '../utils/package-manager.js'
import { fetchRegistryItem } from '../utils/registry.js'
import { transformImports } from '../utils/transformers.js'

/**
 * Resolves all registry dependencies recursively
 */
export async function resolveDependencies(
  item: RegistryItem,
  resolved: RegistryItem[] = []
): Promise<RegistryItem[]> {
  // Check if already resolved
  if (resolved.some(r => r.name === item.name)) {
    return resolved
  }

  // Fetch and resolve registry dependencies first
  if (item.registryDependencies && item.registryDependencies.length > 0) {
    for (const depName of item.registryDependencies) {
      const depItem = await fetchRegistryItem(depName)
      if (depItem) {
        resolved = await resolveDependencies(depItem, resolved)
      }
    }
  }

  // Add current item
  resolved.push(item)

  return resolved
}

/**
 * Installs component files from a registry item
 */
export async function installComponentFiles(
  item: RegistryItem,
  cwd: string,
  config: Config
): Promise<void> {
  if (item.files.length === 0) {
    return
  }

  for (const file of item.files) {
    const { fetchFileContent } = await import('../utils/registry.js')
    const content = await fetchFileContent(file.path)

    if (!content) {
      continue
    }

    // Transform imports to match user's config
    const transformedContent = transformImports(content, config)

    // Determine target path
    let targetPath: string
    if (file.target) {
      // Use explicit target (for registry:page and registry:file)
      targetPath = path.join(cwd, file.target.replace(/^~\//, ''))
    }
    else {
      // Use aliases from config
      const pathParts = file.path.split('/')
      const firstDir = pathParts[0]

      // Handle special directories that should preserve full path structure
      if (firstDir === 'modules' || firstDir === 'layouts' || firstDir === 'shared') {
        // For modules, layouts, and shared directories, preserve the full path under src/
        targetPath = path.join(cwd, 'src', file.path)
      }
      else {
        // Use alias mapping for other paths
        let alias = config.aliases.components
        if (firstDir === 'lib') {
          alias = config.aliases.lib
        }
        else if (firstDir === 'composables') {
          alias = config.aliases.composables
        }

        // Replace @ with src
        const basePath = alias.replace('@/', 'src/')
        const relativePath = pathParts.slice(1).join('/')

        targetPath = path.join(cwd, basePath, relativePath)
      }
    }

    // Ensure directory exists
    await fs.ensureDir(path.dirname(targetPath))

    // Write file
    await fs.writeFile(targetPath, transformedContent, 'utf-8')
  }
}

/**
 * Installs a component from the registry or falls back to shadcn-vue
 */
export async function installRegistryComponent(
  componentName: string,
  cwd: string,
  config: Config,
  options?: { showSpinner?: boolean; fallbackToShadcn?: boolean }
): Promise<boolean> {
  const {
    showSpinner = true,
    fallbackToShadcn = true,
  } = options ?? {}

  const spinner = showSpinner ? ora(`Installing ${componentName}...`).start() : null

  try {
    // Fetch component from registry
    const item = await fetchRegistryItem(componentName)

    if (!item) {
      if (fallbackToShadcn) {
        spinner?.info(`${componentName} not found in vue-blocks-registry, using shadcn-vue...`)

        // Fall back to shadcn-vue
        const packageManager = detectPackageManager(cwd)
        await executeDlx(
          packageManager,
          'shadcn-vue@latest',
          ['add', componentName, '-y'],
          {
            cwd,
            stdio: 'pipe',
          }
        )

        spinner?.succeed(`${componentName} installed from shadcn-vue`)
        return true
      }
      else {
        spinner?.warn(`${componentName} not found in registry`)
        return false
      }
    }

    // Resolve all dependencies
    const allDeps = await resolveDependencies(item, [])

    // Install npm dependencies
    const allNpmDeps = new Set<string>()
    for (const dep of allDeps) {
      if (dep.dependencies) {
        for (const npmDep of dep.dependencies) {
          allNpmDeps.add(npmDep)
        }
      }
    }

    if (allNpmDeps.size > 0) {
      const packageManager = detectPackageManager(cwd)
      await execa(packageManager.command, [...packageManager.addCommand, ...Array.from(allNpmDeps)], {
        cwd,
        stdio: 'pipe'
      })
    }

    // Install component files
    for (const dep of allDeps) {
      await installComponentFiles(dep, cwd, config)
    }

    spinner?.succeed(`${componentName} installed`)
    return true
  }
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    spinner?.fail(`Failed to install ${componentName}: ${message}`)
    const packageManager = detectPackageManager(cwd)
    const dlxCmd = packageManager.name === 'npm' ? 'npx' : `${packageManager.name} dlx`
    logger.warn(`Please install manually: ${dlxCmd} vue-blocks-registry add ${componentName}`)
    return false
  }
}
