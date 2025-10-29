#!/usr/bin/env node
import { Command } from 'commander'
import { readFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { add } from './commands/add.js'
import { init } from './commands/init.js'
import { list } from './commands/list.js'
import { scaffold } from './commands/scaffold.js'
import { setup } from './commands/setup.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageJsonPath = join(__dirname, '../../package.json')
const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'))

const program = new Command()

program
  .name('vue-blocks-registry')
  .description('CLI tool for installing Vue components, features, and bundles from vue-blocks-registry')
  .version(packageJson.version)
  .addHelpText('after', '\nRun \'vue-blocks-registry <command> --help\' for more information on a specific command.')

// Add commands
program.addCommand(setup)
program.addCommand(add)
program.addCommand(init)
program.addCommand(list)
program.addCommand(scaffold)

program.parse()
