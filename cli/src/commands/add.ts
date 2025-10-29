import { Command } from 'commander'
import { execa } from 'execa'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'
import prompts from 'prompts'
import type { RegistryItem } from '../types/registry.js'
import type { Config } from '../utils/config.js'
import { getConfig } from '../utils/config.js'
import { logger } from '../utils/logger.js'
import { detectPackageManager, getAddCommand } from '../utils/package-manager.js'
import { fetchFileContent, fetchRegistryItem } from '../utils/registry.js'
import { transformImports, validateTransformation } from '../utils/transformers.js'

export const add = new Command()
  .name('add')
  .description('Add a component, feature, or bundle to your project')
  .argument('[components...]', 'Name of the components to add')
  .option('-o, --overwrite', 'Overwrite existing files', false)
  .option('-y, --yes', 'Skip confirmation prompt', false)
  .addHelpText('after', `
Examples:
  $ pnpm dlx vue-blocks-registry add button
  $ pnpm dlx vue-blocks-registry add button input form
  $ pnpm dlx vue-blocks-registry add --yes --overwrite authFull
  $ pnpm dlx vue-blocks-registry add dark-mode layouts`)
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
  config: Config,
  options: { overwrite: boolean; yes: boolean }
): Promise<void> {
  const spinner = ora(`Fetching ${name}...`).start()

  // Fetch registry item
  const item = await fetchRegistryItem(name)

  if (!item) {
    spinner.info(`Component "${name}" not found in vue-blocks-registry.`)

    // Try to fall back to shadcn-vue
    logger.info('Attempting to install from shadcn-vue...')

    try {
      const packageManager = detectPackageManager(cwd)
      const shadcnCommand = packageManager.name === 'pnpm'
        ? ['dlx', 'shadcn-vue@latest', 'add', name]
        : packageManager.name === 'yarn'
        ? ['dlx', 'shadcn-vue@latest', 'add', name]
        : ['npx', 'shadcn-vue@latest', 'add', name]

      const fallbackSpinner = ora(`Installing ${name} from shadcn-vue...`).start()

      if (packageManager.name === 'npm') {
        await execa(shadcnCommand[0], shadcnCommand.slice(1), {
          cwd,
          stdio: 'inherit',
        })
      } else {
        await execa(packageManager.name, shadcnCommand.slice(1), {
          cwd,
          stdio: 'inherit',
        })
      }

      fallbackSpinner.succeed(`Installed ${name} from shadcn-vue`)
      return
    }
    catch {
      logger.error(`Failed to install ${name} from shadcn-vue`)
      logger.info(`You can try manually: pnpm dlx shadcn-vue@latest add ${name}`)
      return
    }
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
      const packageManager = detectPackageManager(cwd)
      const addCommand = getAddCommand(packageManager, Array.from(allNpmDeps))

      logger.info(`Using ${packageManager.name} to install dependencies...`)
      await execa(addCommand[0], addCommand.slice(1), { cwd })
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
  config: Config,
  overwrite: boolean
): Promise<void> {
  const spinner = ora(`Installing ${item.name}...`).start()

  try {
    for (const file of item.files) {
      // Fetch file content
      let content = await fetchFileContent(file.path)
      if (!content) {
        throw new Error(`Failed to fetch ${file.path}`)
      }

      // Transform @registry imports to user's aliases
      content = transformImports(content, config)

      // Validate transformation (optional - for debugging)
      const remainingRegistryImports = validateTransformation(content)
      if (remainingRegistryImports.length > 0) {
        logger.warn(`Warning: Some @registry imports may not have been transformed in ${file.path}:`)
        remainingRegistryImports.forEach(imp => { logger.warn(`  - ${imp}`) })
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

      // Check if file exists
      if (await fs.pathExists(targetPath) && !overwrite) {
        spinner.stop()
        const { shouldOverwrite } = await prompts({
          type: 'confirm',
          name: 'shouldOverwrite',
          message: `${path.relative(cwd, targetPath)} already exists. Overwrite?`,
          initial: false,
        })

        if (!shouldOverwrite) {
          spinner.warn(`Skipping ${path.relative(cwd, targetPath)}`)
          continue
        }

        spinner.start(`Installing ${item.name}...`)
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
