import { Command } from 'commander'
import { execa } from 'execa'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'
import prompts from 'prompts'
import { logger } from '../utils/logger.js'
import { detectPackageManager, executeDlx } from '../utils/package-manager.js'

export const setup = new Command()
  .name('setup')
  .description('Create a new Vue 3 project with shadcn-vue and vue-blocks-registry')
  .argument('[project-name]', 'Name of the project directory')
  .option('-y, --yes', 'Use default configuration', false)
  .option('-s, --scaffold', 'Run scaffold after setup to generate foundational files', false)
  .addHelpText('after', `
Examples:
  $ pnpm dlx vue-blocks-registry setup my-app
  $ pnpm dlx vue-blocks-registry setup --yes --scaffold frontend
  $ pnpm dlx vue-blocks-registry setup -ys my-project`)
  .action(async (projectName: string | undefined, options: { yes: boolean; scaffold: boolean }) => {
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

      if (options.scaffold) {
        logger.info('🏗️  Will scaffold to generate foundational files after setup...\n')
      }

      // Step 1: Create Vue project
      const vueSpinner = ora('Creating Vue 3 project...').start()
      try {
        await execa('pnpm', [
          'create',
          'vue@latest',
          targetDir,
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

      // Step 5: Configure TypeScript path alias
      const tsconfigSpinner = ora('Configuring TypeScript path alias...').start()
      try {
        const tsconfigPath = path.join(projectPath, 'tsconfig.json')
        const tsconfigAppPath = path.join(projectPath, 'tsconfig.app.json')

        // Read tsconfig.json (main config that shadcn-vue checks)
        const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, 'utf-8'))

        // Add baseUrl and path alias if not present
        tsconfig.compilerOptions ??= {}
        tsconfig.compilerOptions.baseUrl ??= '.'
        tsconfig.compilerOptions.paths ??= {}
        tsconfig.compilerOptions.paths['@/*'] ??= ['./src/*']

        // Write back
        await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf-8')

        // Also update tsconfig.app.json for consistency
        const tsconfigApp = JSON.parse(await fs.readFile(tsconfigAppPath, 'utf-8'))

        tsconfigApp.compilerOptions ??= {}
        tsconfigApp.compilerOptions.baseUrl ??= '.'
        tsconfigApp.compilerOptions.paths ??= {}
        tsconfigApp.compilerOptions.paths['@/*'] ??= ['./src/*']

        await fs.writeFile(tsconfigAppPath, JSON.stringify(tsconfigApp, null, 2), 'utf-8')

        tsconfigSpinner.succeed('TypeScript path alias configured')
      }
      catch (error) {
        tsconfigSpinner.fail('Failed to configure TypeScript path alias')
        throw error
      }

      // Step 6: Initialize shadcn-vue with defaults (New York, Zinc, CSS variables)
      const shadcnSpinner = ora('Initializing shadcn-vue...').start()
      try {
        // Detect package manager and run shadcn-vue init
        const packageManager = detectPackageManager(projectPath)
        await executeDlx(
          packageManager,
          'shadcn-vue@latest',
          ['init', '-d', '-y'],
          {
            cwd: projectPath,
            stdio: 'pipe',
          }
        )
        shadcnSpinner.succeed('shadcn-vue initialized')
      }
      catch (error) {
        shadcnSpinner.fail('Failed to initialize shadcn-vue')
        logger.error('Make sure your package manager is installed and working correctly')
        throw error
      }

      // Step 7: Run scaffold if requested
      if (options.scaffold) {
        logger.break()
        logger.info('Running scaffold to generate foundational files...\n')

        try {
          const packageManager = detectPackageManager(projectPath)
          await executeDlx(
            packageManager,
            'vue-blocks-registry',
            ['scaffold', '--all', '--overwrite', '--yes'],
            {
              cwd: projectPath,
              stdio: 'inherit',
            }
          )
        }
        catch {
          const packageManager = detectPackageManager(projectPath)
          const dlxCmd = packageManager.name === 'npm' ? 'npx' : `${packageManager.name} dlx`
          logger.warn(`Scaffold failed. You can run it manually later: ${dlxCmd} vue-blocks-registry scaffold`)
        }
      }

      // Step 8: Run linter to format the modified files
      const lintSpinner = ora('Running linter to format code...').start()
      try {
        await execa('pnpm', ['lint'], {
          cwd: projectPath,
          stdio: 'pipe',
        })
        lintSpinner.succeed('Code formatted')
      }
      catch {
        lintSpinner.warn('Linting skipped (run "pnpm lint" manually if needed)')
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

      if (!options.scaffold) {
        logger.info('\nGenerate foundational files:')
        logger.info('  pnpm dlx vue-blocks-registry scaffold')
      }
    }
    catch (error) {
      logger.error('Error:', error instanceof Error ? error.message : 'Unknown error')
      process.exit(1)
    }
  })
