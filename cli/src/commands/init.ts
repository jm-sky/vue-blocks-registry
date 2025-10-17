import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import prompts from 'prompts'
import { DEFAULT_CONFIG, saveConfig } from '../utils/config'
import { logger } from '../utils/logger'

export const init = new Command()
  .name('init')
  .description('Initialize your project for vue-blocks-registry')
  .option('-y, --yes', 'Use default configuration', false)
  .action(async (options) => {
    try {
      const cwd = process.cwd()
      const configPath = path.join(cwd, 'components.json')

      // Check if already initialized
      if (await fs.pathExists(configPath)) {
        const { overwrite } = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: 'components.json already exists. Overwrite?',
          initial: false,
        })

        if (!overwrite) {
          logger.warn('Initialization cancelled.')
          return
        }
      }

      let config = { ...DEFAULT_CONFIG }

      if (!options.yes) {
        // Prompt for configuration
        const answers = await prompts([
          {
            type: 'select',
            name: 'style',
            message: 'Which style would you like to use?',
            choices: [
              { title: 'New York', value: 'new-york' },
              { title: 'Default', value: 'default' },
            ],
            initial: 0,
          },
          {
            type: 'select',
            name: 'baseColor',
            message: 'Which color would you like to use as base color?',
            choices: [
              { title: 'Neutral', value: 'neutral' },
              { title: 'Gray', value: 'gray' },
              { title: 'Zinc', value: 'zinc' },
              { title: 'Stone', value: 'stone' },
              { title: 'Slate', value: 'slate' },
            ],
            initial: 0,
          },
          {
            type: 'text',
            name: 'cssPath',
            message: 'Where is your global CSS file?',
            initial: 'src/css/style.css',
          },
          {
            type: 'confirm',
            name: 'cssVariables',
            message: 'Would you like to use CSS variables for theming?',
            initial: true,
          },
        ])

        if (!answers.style) {
          logger.warn('Initialization cancelled.')
          return
        }

        config = {
          ...config,
          style: answers.style,
          tailwind: {
            ...config.tailwind,
            css: answers.cssPath,
            baseColor: answers.baseColor,
            cssVariables: answers.cssVariables,
          },
        }
      }

      // Save config
      await saveConfig(cwd, config)

      logger.success('\nSuccess! Configuration saved to components.json')
      logger.info('\nYou can now add components:')
      logger.info('  pnpm dlx vue-blocks-registry add button')
    }
    catch (error) {
      logger.error('Error:', error instanceof Error ? error.message : 'Unknown error')
      process.exit(1)
    }
  })
