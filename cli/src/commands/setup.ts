import { Command } from 'commander'
import { execa } from 'execa'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'
import prompts from 'prompts'
import { addProxyToViteConfig, addTailwindToViteConfig } from '../helpers/vite-config.js'
import { logger } from '../utils/logger.js'
import { detectPackageManager, executeDlx } from '../utils/package-manager.js'

export const setup = new Command()
  .name('setup')
  .description('Create a new Vue 3 project with shadcn-vue and vue-blocks-registry')
  .argument('[project-name]', 'Name of the project directory')
  .option('-y, --yes', 'Use default configuration', false)
  .option('-s, --scaffold', 'Run scaffold after setup to generate foundational files', false)
  .option('--auth-full', 'Install and wire up full auth module (authFull)', false)
  .option('--all', 'Full bootstrap: scaffold + init + authFull + tenantFeat + layouts', false)
  .option('--dont-lint', 'Skip running linter at the end', false)
  .addHelpText('after', `
Examples:
  $ pnpm dlx vue-blocks-registry setup my-app
  $ pnpm dlx vue-blocks-registry setup --yes my-project
  $ pnpm dlx vue-blocks-registry setup --scaffold frontend
  $ pnpm dlx vue-blocks-registry setup -ys my-project
  $ pnpm dlx vue-blocks-registry setup --all my-full-app
  $ pnpm dlx vue-blocks-registry setup --all --dont-lint my-debug-app
  $ pnpm dlx vue-blocks-registry setup --auth-full --scaffold backend-app`)
  .action(async (
    projectName: string | undefined,
    options: { yes: boolean; scaffold: boolean; authFull: boolean; all: boolean; dontLint: boolean }
  ) => {
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

      // Normalize flags: --all implies --scaffold and --auth-full
      if (options.all) {
        options.scaffold = true
        options.authFull = true
      }

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
        // Use explicit version to ensure @tailwindcss/vite and tailwindcss match
        // This prevents "Cannot convert undefined or null to object" errors
        const tailwindVersion = '4.1.16'
        await execa('pnpm', [
          'add',
          `tailwindcss@${tailwindVersion}`,
          `@tailwindcss/vite@${tailwindVersion}`,
          'tw-animate-css',
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

      // Step 2a: Install vue-i18n
      const i18nSpinner = ora('Installing vue-i18n...').start()
      try {
        await execa('pnpm', [
          'add',
          'vue-i18n',
        ], {
          cwd: projectPath,
          stdio: 'pipe',
        })
        i18nSpinner.succeed('vue-i18n installed')
      }
      catch (error) {
        i18nSpinner.fail('Failed to install vue-i18n')
        throw error
      }

      // Step 3: Configure Tailwind and proxy in vite.config.ts
      const viteConfigSpinner = ora('Configuring Tailwind and proxy in Vite...').start()
      try {
        await addTailwindToViteConfig(projectPath)
        await addProxyToViteConfig(projectPath)
        viteConfigSpinner.succeed('Tailwind and proxy configured in Vite')
      }
      catch (error) {
        viteConfigSpinner.fail('Failed to configure Tailwind and proxy in Vite')
        throw error
      }

      // Step 4: Create CSS file with Tailwind directives
      const cssSpinner = ora('Creating Tailwind CSS file...').start()
      try {
        const cssDir = path.join(projectPath, 'src/css')
        const cssPath = path.join(cssDir, 'style.css')

        await fs.ensureDir(cssDir)
        await fs.writeFile(cssPath, `@import "tailwindcss";
@import "tw-animate-css";

/* Your custom styles here */`, 'utf-8')

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

      // Step 7: Run scaffold if requested (or implied by --all)
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

      // Step 8: Ensure components.json exists (for add command); run init if missing
      try {
        const configPath = path.join(projectPath, 'components.json')
        const exists = await fs.pathExists(configPath)
        if (!exists) {
          const packageManager = detectPackageManager(projectPath)
          await executeDlx(
            packageManager,
            'vue-blocks-registry',
            ['init', '--yes'],
            { cwd: projectPath, stdio: 'inherit' }
          )
        }
      }
      catch {
        logger.warn('components.json missing and automatic init failed. Run "vue-blocks-registry init" manually if needed.')
      }

      // Step 9: Install authFull, tenantFeat and layouts if requested (or implied by --all)
      if (options.authFull) {
        logger.break()
        logger.info('Installing layouts and feature bundles...\n')
        try {
          const packageManager = detectPackageManager(projectPath)
          // Ensure shared layouts
          await executeDlx(
            packageManager,
            'vue-blocks-registry',
            ['add', '--yes', '--overwrite', 'layouts'],
            { cwd: projectPath, stdio: 'inherit' }
          )
          // Install authFull with routes and guards
          await executeDlx(
            packageManager,
            'vue-blocks-registry',
            ['add', '--yes', '--overwrite', '--routes', '--guards', 'authFull'],
            { cwd: projectPath, stdio: 'inherit' }
          )
          // Install tenantFeat with routes and guards (requires authFull)
          await executeDlx(
            packageManager,
            'vue-blocks-registry',
            ['add', '--yes', '--overwrite', '--routes', '--guards', 'tenantFeat'],
            { cwd: projectPath, stdio: 'inherit' }
          )
          // Optionally install dashboard/user/settings/logs bundles with routes
          await executeDlx(
            packageManager,
            'vue-blocks-registry',
            ['add', '--yes', '--overwrite', '--routes', 'dashboardFull'],
            { cwd: projectPath, stdio: 'inherit' }
          )
          await executeDlx(
            packageManager,
            'vue-blocks-registry',
            ['add', '--yes', '--overwrite', '--routes', 'userFull'],
            { cwd: projectPath, stdio: 'inherit' }
          )
          await executeDlx(
            packageManager,
            'vue-blocks-registry',
            ['add', '--yes', '--overwrite', '--routes', 'settingsFull'],
            { cwd: projectPath, stdio: 'inherit' }
          )
          await executeDlx(
            packageManager,
            'vue-blocks-registry',
            ['add', '--yes', '--overwrite', '--routes', 'logsFull'],
            { cwd: projectPath, stdio: 'inherit' }
          )
        }
        catch {
          const packageManager = detectPackageManager(projectPath)
          const dlxCmd = packageManager.name === 'npm' ? 'npx' : `${packageManager.name} dlx`
          logger.warn(`Installing layouts/authFull/tenantFeat/dashboardFull/userFull/settingsFull/logsFull failed. Try manually: ${dlxCmd} vue-blocks-registry add layouts && ${dlxCmd} vue-blocks-registry add --routes --guards authFull && ${dlxCmd} vue-blocks-registry add --routes --guards tenantFeat && ${dlxCmd} vue-blocks-registry add --routes dashboardFull userFull settingsFull logsFull`)
        }

        // Inject i18n module imports after installing modules with translations
        if (options.all) {
          try {
            const { injectI18nModules } = await import('../helpers/i18n-injector.js')
            await injectI18nModules({
              projectRoot: projectPath,
              modules: ['auth', 'user', 'settings', 'logs-management'],
            })
            logger.success('Injected i18n module imports into src/i18n/index.ts')
          }
          catch (error) {
            logger.warn('Failed to inject i18n module imports. You may need to add them manually.')
            console.error(error)
          }
        }
      }

      // Step 10: Run linter to format the modified files (only if not disabled)
      if (!options.dontLint) {
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

      if (!options.authFull) {
        logger.info('\nInstall authentication module:')
        logger.info('  pnpm dlx vue-blocks-registry add authFull')
      }
    }
    catch (error) {
      logger.error('Error:', error instanceof Error ? error.message : 'Unknown error')
      process.exit(1)
    }
  })
