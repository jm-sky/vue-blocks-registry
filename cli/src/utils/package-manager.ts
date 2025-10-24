import { existsSync } from 'fs'
import { join } from 'path'

export type PackageManager = 'npm' | 'pnpm' | 'yarn'

export interface PackageManagerInfo {
  name: PackageManager
  command: string
  addCommand: string[]
  installCommand: string[]
}

/**
 * Detects the package manager used in the project
 * Checks for lock files in order of preference: pnpm-lock.yaml, yarn.lock, package-lock.json
 */
export function detectPackageManager(cwd: string): PackageManagerInfo {
  // Check for pnpm
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) {
    return {
      name: 'pnpm',
      command: 'pnpm',
      addCommand: ['add'],
      installCommand: ['install']
    }
  }

  // Check for yarn
  if (existsSync(join(cwd, 'yarn.lock'))) {
    return {
      name: 'yarn',
      command: 'yarn',
      addCommand: ['add'],
      installCommand: ['install']
    }
  }

  // Check for npm (package-lock.json)
  if (existsSync(join(cwd, 'package-lock.json'))) {
    return {
      name: 'npm',
      command: 'npm',
      addCommand: ['install'],
      installCommand: ['install']
    }
  }

  // Default to npm if no lock file is found
  return {
    name: 'npm',
    command: 'npm',
    addCommand: ['install'],
    installCommand: ['install']
  }
}

/**
 * Gets the appropriate add command for installing dependencies
 */
export function getAddCommand(packageManager: PackageManagerInfo, dependencies: string[], isDev = false): string[] {
  const baseCommand = [packageManager.command, ...packageManager.addCommand]

  if (isDev) {
    // Add dev flag based on package manager
    if (packageManager.name === 'npm') {
      baseCommand.push('--save-dev')
    }
    else {
      // pnpm and yarn use -D
      baseCommand.push('-D')
    }
  }

  return [...baseCommand, ...dependencies]
}
