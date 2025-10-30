import { execa } from 'execa'
import { existsSync } from 'fs'
import { join } from 'path'
import type { Options as ExecaOptions } from 'execa'

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

  // Default to pnpm if no lock file is found
  return {
    name: 'pnpm',
    command: 'pnpm',
    addCommand: ['add'],
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

/**
 * Executes a package using dlx (or npx for npm)
 * This handles the difference between package managers:
 * - pnpm uses 'pnpm dlx'
 * - yarn uses 'yarn dlx'
 * - npm uses 'npx'
 *
 * When VUE_BLOCKS_LOCAL_CLI is set, it uses the local CLI instead of dlx.
 * This is useful for testing unreleased features.
 */
export async function executeDlx(
  packageManager: PackageManagerInfo,
  packageName: string,
  args: string[] = [],
  options?: ExecaOptions
) {
  // Check if we should use local CLI for testing
  const localCliPath = process.env.VUE_BLOCKS_LOCAL_CLI

  if (localCliPath && packageName === 'vue-blocks-registry') {
    // Use local CLI instead of dlx
    return execa('node', [localCliPath, ...args], options)
  }

  if (packageManager.name === 'npm') {
    // npm uses npx instead of npm dlx
    return execa('npx', [packageName, ...args], options)
  }

  // pnpm and yarn use dlx
  return execa(packageManager.command, ['dlx', packageName, ...args], options)
}
