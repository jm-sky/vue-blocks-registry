import { Command } from 'commander'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'
import prompts from 'prompts'
import { fileURLToPath } from 'url'
import { getConfig } from '../utils/config.js'
import { logger } from '../utils/logger.js'

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

      // Generate files
      for (const file of filesToGenerate) {
        await generateFile(file, cwd)
      }

      logger.break()
      logger.success('Done! Foundational files generated successfully.')

      // Show next steps
      logger.info('\nNext steps:')
      logger.info('  1. Review the generated files')
      logger.info('  2. Install required dependencies if not already installed:')
      logger.info('     - @tanstack/vue-query')
      logger.info('     - floating-vue')
      logger.info('     - pinia')
      logger.info('     - vue-router')
      logger.info('     - vue-sonner')
      logger.info('  3. Make sure you have the sonner component installed:')
      logger.info('     vue-blocks-registry add sonner')
    }
    catch (error) {
      logger.error('Error:', error instanceof Error ? error.message : 'Unknown error')
      process.exit(1)
    }
  })

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
