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
 * npm package name with optional scope and optional version/tag suffix.
 * Rejects leading dashes (flag injection) and shell metacharacters.
 */
const NPM_DEPENDENCY_RE
  = /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*(?:@[^@\s]+)?$/i

/**
 * Validate registry-provided dependency strings before passing them to a package manager.
 */
export function assertSafeNpmDependencies(dependencies: string[]): string[] {
  for (const dep of dependencies) {
    if (!dep || dep.startsWith('-') || !NPM_DEPENDENCY_RE.test(dep)) {
      throw new Error(`Invalid npm package name: ${dep}`)
    }
  }
  return dependencies
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
 * Gets argv (without the binary) for installing dependencies.
 */
export function getAddArgs(packageManager: PackageManagerInfo, dependencies: string[], isDev = false): string[] {
  const safeDeps = assertSafeNpmDependencies(dependencies)
  const args = [...packageManager.addCommand]

  if (isDev) {
    if (packageManager.name === 'npm') {
      args.push('--save-dev')
    }
    else {
      args.push('-D')
    }
  }

  return [...args, ...safeDeps]
}

/**
 * Gets the full command array [binary, ...args] for installing dependencies.
 * Prefer {@link runAddCommand} / {@link getAddArgs} at call sites so the binary
 * is never taken from user-controlled input.
 */
export function getAddCommand(packageManager: PackageManagerInfo, dependencies: string[], isDev = false): string[] {
  return [packageManager.command, ...getAddArgs(packageManager, dependencies, isDev)]
}

/**
 * Install dependencies with a fixed package-manager binary and validated package names.
 */
export async function runAddCommand(
  packageManager: PackageManagerInfo,
  dependencies: string[],
  options?: ExecaOptions,
  isDev = false,
) {
  return execa(packageManager.command, getAddArgs(packageManager, dependencies, isDev), options)
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

  assertSafeNpmDependencies([packageName])

  if (packageManager.name === 'npm') {
    // npm uses npx instead of npm dlx
    return execa('npx', [packageName, ...args], options)
  }

  // pnpm and yarn use dlx
  return execa(packageManager.command, ['dlx', packageName, ...args], options)
}
