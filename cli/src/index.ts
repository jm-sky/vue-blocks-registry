#!/usr/bin/env node
import { Command } from 'commander'
import packageJson from '../../package.json'
import { add } from './commands/add'
import { init } from './commands/init'
import { list } from './commands/list'

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
