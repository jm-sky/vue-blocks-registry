import { Command } from 'commander'
import { execa } from 'execa'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'
import prompts from 'prompts'
import { DEFAULT_CONFIG, saveConfig } from '../utils/config.js'
import { logger } from '../utils/logger.js'

export const setup = new Command()
  .name('setup')
  .description('Create a new Vue 3 project with shadcn-vue and vue-blocks-registry')
  .argument('[project-name]', 'Name of the project directory')
  .option('-y, --yes', 'Use default configuration', false)
  .action(async (projectName: string | undefined, options) => {
    try {
      let targetDir: string = projectName ?? ''

      // If no project name provided, prompt for it
      if (!targetDir) {
        const { name } = await prompts({
          type: 'text',
          name: 'name',
          message: 'Project name:',
          initial: 'my-vue-app',
        })

        if (!name) {
          logger.warn('Setup cancelled.')
          return
        }

        targetDir = name as string
      }

      const projectPath = path.join(process.cwd(), targetDir)

      // Check if directory already exists
      if (await fs.pathExists(projectPath)) {
        logger.error(`Error: Directory "${targetDir}" already exists.`)
        process.exit(1)
      }

      logger.info('\n🚀 Setting up a new Vue 3 project with vue-blocks-registry...\n')

      // Step 1: Create Vue project
      const vueSpinner = ora('Creating Vue 3 project...').start()
      try {
        await execa('pnpm', [
          'create',
          'vue@latest',
          targetDir,
          '--',
          '--typescript',
          '--router',
          '--pinia',
          '--eslint',
        ], {
          stdio: 'pipe',
        })
        vueSpinner.succeed('Vue 3 project created')
      }
      catch (error) {
        vueSpinner.fail('Failed to create Vue project')
        logger.error('Make sure you have pnpm installed: npm install -g pnpm')
        throw error
      }

      // Step 2: Install Tailwind CSS v4
      const tailwindSpinner = ora('Installing Tailwind CSS v4...').start()
      try {
        await execa('pnpm', [
          'add',
          'tailwindcss@next',
          '@tailwindcss/vite@next',
        ], {
          cwd: projectPath,
          stdio: 'pipe',
        })
        tailwindSpinner.succeed('Tailwind CSS v4 installed')
      }
      catch (error) {
        tailwindSpinner.fail('Failed to install Tailwind CSS')
        throw error
      }

      // Step 3: Configure Tailwind in vite.config.ts
      const viteConfigSpinner = ora('Configuring Tailwind in Vite...').start()
      try {
        const viteConfigPath = path.join(projectPath, 'vite.config.ts')
        let viteConfig = await fs.readFile(viteConfigPath, 'utf-8')

        // Add tailwindcss import
        if (!viteConfig.includes('@tailwindcss/vite')) {
          viteConfig = viteConfig.replace(
            /import vue from '@vitejs\/plugin-vue'/,
            'import vue from \'@vitejs/plugin-vue\'\nimport tailwindcss from \'@tailwindcss/vite\''
          )

          // Add to plugins array
          viteConfig = viteConfig.replace(
            /plugins:\s*\[/,
            'plugins: [\n    tailwindcss(),'
          )

          await fs.writeFile(viteConfigPath, viteConfig, 'utf-8')
        }
        viteConfigSpinner.succeed('Tailwind configured in Vite')
      }
      catch (error) {
        viteConfigSpinner.fail('Failed to configure Tailwind in Vite')
        throw error
      }

      // Step 4: Create CSS file with Tailwind directives
      const cssSpinner = ora('Creating Tailwind CSS file...').start()
      try {
        const cssDir = path.join(projectPath, 'src/css')
        const cssPath = path.join(cssDir, 'style.css')

        await fs.ensureDir(cssDir)
        await fs.writeFile(cssPath, `@import "tailwindcss";

/* Your custom styles here */
`, 'utf-8')

        // Update main.ts to import the CSS file
        const mainTsPath = path.join(projectPath, 'src/main.ts')
        let mainTs = await fs.readFile(mainTsPath, 'utf-8')

        // Replace old CSS import with new one
        mainTs = mainTs.replace(
          /import '\.\/assets\/main\.css'/,
          'import \'./css/style.css\''
        )

        await fs.writeFile(mainTsPath, mainTs, 'utf-8')

        cssSpinner.succeed('Tailwind CSS file created')
      }
      catch (error) {
        cssSpinner.fail('Failed to create Tailwind CSS file')
        throw error
      }

      // Step 5: Initialize shadcn-vue
      const shadcnSpinner = ora('Initializing shadcn-vue...').start()
      try {
        // Run shadcn-vue init with automatic yes to all prompts
        await execa('pnpm', [
          'dlx',
          'shadcn-vue@latest',
          'init',
          '-y',
        ], {
          cwd: projectPath,
          stdio: 'pipe',
        })
        shadcnSpinner.succeed('shadcn-vue initialized')
      }
      catch {
        shadcnSpinner.fail('Failed to initialize shadcn-vue')
        logger.warn('You may need to run it manually: pnpm dlx shadcn-vue@latest init')
      }

      // Step 6: Initialize vue-blocks-registry
      const registrySpinner = ora('Initializing vue-blocks-registry...').start()
      try {
        const config = { ...DEFAULT_CONFIG }

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
              type: 'confirm',
              name: 'cssVariables',
              message: 'Would you like to use CSS variables for theming?',
              initial: true,
            },
          ])

          if (answers.style) {
            config.style = answers.style
            config.tailwind.baseColor = answers.baseColor
            config.tailwind.cssVariables = answers.cssVariables
          }
        }

        // Save config
        await saveConfig(projectPath, config)
        registrySpinner.succeed('vue-blocks-registry initialized')
      }
      catch (error) {
        registrySpinner.fail('Failed to initialize vue-blocks-registry')
        throw error
      }

      logger.break()
      logger.success(`✨ Project "${targetDir}" created successfully!\n`)

      logger.info('Next steps:')
      logger.info(`  cd ${targetDir}`)
      logger.info('  pnpm install')
      logger.info('  pnpm dev')
      logger.info('\nAdd components:')
      logger.info('  pnpm dlx vue-blocks-registry add button')
      logger.info('  pnpm dlx vue-blocks-registry add authFull')
      logger.info('\nGenerate foundational files:')
      logger.info('  pnpm dlx vue-blocks-registry scaffold')
    }
    catch (error) {
      logger.error('Error:', error instanceof Error ? error.message : 'Unknown error')
      process.exit(1)
    }
  })
