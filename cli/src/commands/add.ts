import { Command } from 'commander'
import { execa } from 'execa'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'
import prompts from 'prompts'
import type { RegistryItem } from '../types/registry.js'
import { getConfig } from '../utils/config.js'
import { logger } from '../utils/logger.js'
import { fetchFileContent, fetchRegistryItem } from '../utils/registry.js'

export const add = new Command()
  .name('add')
  .description('Add a component, feature, or bundle to your project')
  .argument('[components...]', 'Name of the components to add')
  .option('-o, --overwrite', 'Overwrite existing files', false)
  .option('-y, --yes', 'Skip confirmation prompt', false)
  .action(async (components: string[], options) => {
    try {
      const cwd = process.cwd()

      // Get config
      const config = await getConfig(cwd)
      if (!config) {
        logger.error('Error: components.json not found.')
        logger.info('Run "vue-blocks-registry init" first to initialize your project.')
        process.exit(1)
      }

      // If no components specified, prompt
      if (components.length === 0) {
        const { component } = await prompts({
          type: 'text',
          name: 'component',
          message: 'Which component would you like to add?',
        })

        if (!component) {
          logger.warn('No component selected. Exiting.')
          process.exit(0)
        }

        components = [component]
      }

      // Fetch and install each component
      for (const componentName of components) {
        await installComponent(componentName, cwd, config, options)
      }

      logger.break()
      logger.success('Done!')
    }
    catch (error) {
      logger.error('Error:', error instanceof Error ? error.message : 'Unknown error')
      process.exit(1)
    }
  })

async function installComponent(
  name: string,
  cwd: string,
  config: any,
  options: { overwrite: boolean; yes: boolean }
): Promise<void> {
  const spinner = ora(`Fetching ${name}...`).start()

  // Fetch registry item
  const item = await fetchRegistryItem(name)

  if (!item) {
    spinner.fail(`Component "${name}" not found in registry.`)
    return
  }

  spinner.succeed(`Found ${item.title ?? name}`)

  // Resolve dependencies
  const allDeps = await resolveDependencies(item, [])

  // Show what will be installed
  logger.info(`\nComponents to install: ${allDeps.map(d => d.name).join(', ')}`)

  if (item.dependencies && item.dependencies.length > 0) {
    logger.info(`NPM dependencies: ${item.dependencies.join(', ')}`)
  }

  // Confirm
  if (!options.yes) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: 'Proceed with installation?',
      initial: true,
    })

    if (!proceed) {
      logger.warn('Installation cancelled.')
      return
    }
  }

  // Install npm dependencies first
  const allNpmDeps = new Set<string>()
  for (const dep of allDeps) {
    if (dep.dependencies) {
      for (const npmDep of dep.dependencies) {
        allNpmDeps.add(npmDep)
      }
    }
  }

  if (allNpmDeps.size > 0) {
    const depsSpinner = ora('Installing dependencies...').start()
    try {
      await execa('pnpm', ['add', ...Array.from(allNpmDeps)], { cwd })
      depsSpinner.succeed('Dependencies installed')
    }
    catch (error) {
      depsSpinner.fail('Failed to install dependencies')
      throw error
    }
  }

  // Install components
  for (const dep of allDeps) {
    await installFiles(dep, cwd, config, options.overwrite)
  }
}

async function resolveDependencies(
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
      // Skip external URLs for now
      if (depName.startsWith('http://') || depName.startsWith('https://')) {
        continue
      }

      const depItem = await fetchRegistryItem(depName)
      if (depItem) {
        await resolveDependencies(depItem, resolved)
      }
    }
  }

  // Add current item
  resolved.push(item)

  return resolved
}

async function installFiles(
  item: RegistryItem,
  cwd: string,
  config: any,
  overwrite: boolean
): Promise<void> {
  const spinner = ora(`Installing ${item.name}...`).start()

  try {
    for (const file of item.files) {
      // Fetch file content
      const content = await fetchFileContent(file.path)
      if (!content) {
        throw new Error(`Failed to fetch ${file.path}`)
      }

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

      // Check if file exists
      if (await fs.pathExists(targetPath) && !overwrite) {
        spinner.warn(`Skipping ${path.relative(cwd, targetPath)} (already exists)`)
        continue
      }

      // Ensure directory exists
      await fs.ensureDir(path.dirname(targetPath))

      // Write file
      await fs.writeFile(targetPath, content, 'utf-8')
    }

    spinner.succeed(`Installed ${item.name}`)
  }
  catch (error) {
    spinner.fail(`Failed to install ${item.name}`)
    throw error
  }
}
