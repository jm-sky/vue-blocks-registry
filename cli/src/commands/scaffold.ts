import { Command } from 'commander'
import { execa } from 'execa'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'
import prompts from 'prompts'
import { fileURLToPath } from 'url'
import { installRegistryComponent } from '../helpers/component-installer.js'
import { cleanupDefaultVueFiles } from '../helpers/project-cleanup.js'
import { injectRoutesAndGuards } from '../helpers/router-injector.js'
import { getConfig } from '../utils/config.js'
import { logger } from '../utils/logger.js'
import { detectPackageManager, getAddCommand } from '../utils/package-manager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface ScaffoldFile {
  name: string
  description: string
  templatePath: string
  targetPath: string
  required?: boolean
}

export const scaffold = new Command()
  .name('scaffold')
  .description('Generate foundational project files (main.ts, App.vue, etc.)')
  .option('-a, --all', 'Generate all foundational files', false)
  .option('-o, --overwrite', 'Overwrite existing files', false)
  .option('-y, --yes', 'Skip confirmation prompt', false)
  .addHelpText('after', `
Examples:
  $ pnpm dlx vue-blocks-registry scaffold
  $ pnpm dlx vue-blocks-registry scaffold --all
  $ pnpm dlx vue-blocks-registry scaffold --all --overwrite --yes`)
  .action(async (options) => {
    try {
      const cwd = process.cwd()

      // Get config
      const config = await getConfig(cwd)
      if (!config) {
        logger.error('Error: components.json not found.')
        logger.info('Run "vue-blocks-registry init" first to initialize your project.')
        process.exit(1)
      }

      logger.info('\n🏗️ Scaffolding your project...\n')
      logger.info(`- ${options.all ? 'All' : 'Selected'} files will be generated...\n`)
      logger.info(`- ${options.overwrite ? 'Existing files will be overwritten' : 'Only new files will be created'}...\n`)
      logger.info(`- ${options.yes ? 'No confirmation prompt will be shown' : 'Confirmation prompt will be shown'}...\n`)

      // Define available scaffold files
      const scaffoldFiles: ScaffoldFile[] = [
        {
          name: 'main.ts',
          description: 'Main entry file with Pinia, Router, Vue Query, i18n, and vTooltip',
          templatePath: path.join(__dirname, '../../templates/main.ts.template'),
          targetPath: 'src/main.ts',
        },
        {
          name: 'App.vue',
          description: 'Root App component with RouterView and Toaster',
          templatePath: path.join(__dirname, '../../templates/App.vue.template'),
          targetPath: 'src/App.vue',
        },
        {
          name: 'router/index.ts',
          description: 'Vue Router configuration',
          templatePath: path.join(__dirname, '../../templates/router-index.ts.template'),
          targetPath: 'src/router/index.ts',
        },
        {
          name: 'router/routes.ts',
          description: 'Application routes definition',
          templatePath: path.join(__dirname, '../../templates/routes.ts.template'),
          targetPath: 'src/router/routes.ts',
        },
        {
          name: 'pages/HomePage.vue',
          description: 'Home page with GuestLayoutCentered',
          templatePath: path.join(__dirname, '../../templates/HomePage.vue.template'),
          targetPath: 'src/pages/HomePage.vue',
        },
        {
          name: 'eslint.config.ts',
          description: 'ESLint flat config with Vue, TypeScript, and Perfectionist',
          templatePath: path.join(__dirname, '../../templates/eslint.config.ts.template'),
          targetPath: 'eslint.config.ts',
        },
        {
          name: '.env.example',
          description: 'Environment variables template for app configuration',
          templatePath: path.join(__dirname, '../../templates/.env.example.template'),
          targetPath: '.env.example',
        },
      ]

      let filesToGenerate: ScaffoldFile[] = []

      if (options.all) {
        // Generate all files
        filesToGenerate = scaffoldFiles
      }
      else {
        // Let user choose which files to generate
        const { selectedFiles } = await prompts({
          type: 'multiselect',
          name: 'selectedFiles',
          message: 'Select files to generate:',
          choices: scaffoldFiles.map(file => ({
            title: `${file.name} - ${file.description}`,
            value: file.name,
            selected: false,
          })),
          min: 1,
        })

        if (!selectedFiles || selectedFiles.length === 0) {
          logger.warn('No files selected. Exiting.')
          process.exit(0)
        }

        filesToGenerate = scaffoldFiles.filter(file => selectedFiles.includes(file.name))
      }

      // Show what will be generated
      logger.info(`\nFiles to generate: ${filesToGenerate.map(f => f.name).join(', ')}`)

      // Check for existing files
      const existingFiles = []
      for (const file of filesToGenerate) {
        const targetPath = path.join(cwd, file.targetPath)
        if (await fs.pathExists(targetPath)) {
          existingFiles.push(file.name)
        }
      }

      if (existingFiles.length > 0 && !options.overwrite) {
        logger.warn(`\nThe following files already exist:\n${existingFiles.map(f => `  - ${f}`).join('\n')}`)

        if (!options.yes) {
          const { shouldOverwrite } = await prompts({
            type: 'confirm',
            name: 'shouldOverwrite',
            message: 'Overwrite existing files?',
            initial: false,
          })

          if (!shouldOverwrite) {
            logger.warn('Cancelled. No files were generated.')
            process.exit(0)
          }
        }
        else {
          // If --yes flag is used but --overwrite is not, don't generate files
          logger.error('Error: Files already exist. Use --overwrite flag to overwrite existing files.')
          process.exit(1)
        }
      }

      // Confirm generation
      if (!options.yes) {
        const { proceed } = await prompts({
          type: 'confirm',
          name: 'proceed',
          message: 'Proceed with file generation?',
          initial: true,
        })

        if (!proceed) {
          logger.warn('Generation cancelled.')
          return
        }
      }

      // Install dependencies first
      await installDependencies(filesToGenerate, cwd)

      // Clean up default Vue files if we're scaffolding structure files
      const fileNames = filesToGenerate.map(f => f.name)
      if (fileNames.some(name => ['App.vue', 'pages/HomePage.vue', 'router/index.ts'].includes(name))) {
        await cleanupDefaultVueFiles(cwd)
      }

      // Generate files
      for (const file of filesToGenerate) {
        await generateFile(file, cwd)
      }

      // Install sonner component if App.vue was generated
      if (fileNames.includes('App.vue')) {
        await installRegistryComponent('sonner', cwd, config)
      }

      // Install layouts if HomePage.vue was generated
      if (fileNames.includes('pages/HomePage.vue')) {
        await installRegistryComponent('layouts', cwd, config, { fallbackToShadcn: false })
      }

      // After files exist, inject default guards placeholder if anchors present
      try {
        await injectRoutesAndGuards({
          projectRoot: cwd,
          importLines: [],
          spreadLines: [],
          guardBlock: '// Default guards placeholder. Configure auth store before enabling.\n// See @registry/modules/auth for recommended integration.',
        })
      }
      catch {
        // best-effort; non-blocking
      }

      logger.break()
      logger.success('Done! Foundational files generated successfully.')

      // Show next steps
      logger.info('\nNext steps:')
      logger.info('  1. Review the generated files')
      logger.info('  2. Start development: pnpm dev')
    }
    catch (error) {
      logger.error('Error:', error instanceof Error ? error.message : 'Unknown error')
      process.exit(1)
    }
  })

async function installDependencies(
  files: ScaffoldFile[],
  cwd: string
): Promise<void> {
  const fileNames = files.map(f => f.name)
  const runtimeDeps: string[] = []
  const devDeps: string[] = []

  // Determine which dependencies to install based on selected files
  if (fileNames.includes('main.ts') || fileNames.includes('App.vue')) {
    runtimeDeps.push(
      '@tanstack/vue-query',
      'floating-vue',
      'pinia',
      'vue-router',
      'vue-sonner'
    )
  }

  if (fileNames.includes('eslint.config.ts')) {
    devDeps.push(
      '@vue/eslint-config-typescript',
      'eslint',
      'eslint-plugin-perfectionist',
      'eslint-plugin-vue'
    )
  }

  // Install runtime dependencies
  if (runtimeDeps.length > 0) {
    const spinner = ora('Installing runtime dependencies...').start()
    try {
      const packageManager = detectPackageManager(cwd)
      const addCommand = getAddCommand(packageManager, runtimeDeps)

      await execa(addCommand[0], addCommand.slice(1), { cwd })
      spinner.succeed('Runtime dependencies installed')
    }
    catch {
      spinner.fail('Failed to install runtime dependencies')
      logger.warn('You may need to install them manually:')
      logger.info(`  ${runtimeDeps.join(' ')}`)
    }
  }

  // Install dev dependencies
  if (devDeps.length > 0) {
    const spinner = ora('Installing dev dependencies...').start()
    try {
      const packageManager = detectPackageManager(cwd)
      const addCommand = getAddCommand(packageManager, devDeps, true)

      await execa(addCommand[0], addCommand.slice(1), { cwd })
      spinner.succeed('Dev dependencies installed')
    }
    catch {
      spinner.fail('Failed to install dev dependencies')
      logger.warn('You may need to install them manually:')
      logger.info(`  ${devDeps.join(' ')}`)
    }
  }

  if (runtimeDeps.length === 0 && devDeps.length === 0) {
    logger.info('No dependencies to install')
  }
}

async function generateFile(
  file: ScaffoldFile,
  cwd: string
): Promise<void> {
  const spinner = ora(`Generating ${file.name}...`).start()

  try {
    // Read template
    const templateContent = await fs.readFile(file.templatePath, 'utf-8')

    // Apply transformations (replace @/ with user's aliases if needed)
    const content = templateContent

    // For now, we're using @/ in templates which should work with most configs
    // In the future, we could add more sophisticated transformations here

    // Determine target path
    const targetPath = path.join(cwd, file.targetPath)

    // Ensure directory exists
    await fs.ensureDir(path.dirname(targetPath))

    // Write file
    await fs.writeFile(targetPath, content, 'utf-8')

    spinner.succeed(`Generated ${file.name}`)
  }
  catch (error) {
    spinner.fail(`Failed to generate ${file.name}`)
    throw error
  }
}
