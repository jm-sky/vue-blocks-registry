#!/usr/bin/env node
import { Command } from 'commander'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { add } from './commands/add.js'
import { init } from './commands/init.js'
import { list } from './commands/list.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageJsonPath = join(__dirname, '../../package.json')
const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'))

const program = new Command()

program
  .name('vue-blocks-registry')
  .description('CLI tool for installing Vue components, features, and bundles from vue-blocks-registry')
  .version(packageJson.version)

// Add commands
program.addCommand(add)
program.addCommand(init)
program.addCommand(list)

program.parse()
