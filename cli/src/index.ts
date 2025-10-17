#!/usr/bin/env node
import { Command } from 'commander'
import packageJson from '../../package.json'

const program = new Command()

program
  .name('vue-blocks-registry')
  .description('CLI tool for installing Vue components, features, and bundles from vue-blocks-registry')
  .version(packageJson.version)

// Commands will be added here
// program.addCommand(addCommand)
// program.addCommand(initCommand)
// program.addCommand(listCommand)

program.parse()
