import { readFile } from 'fs/promises'
import { join } from 'path'
import type { RegistryItem } from '../types/registry.js'

export const REGISTRY_URL = 'https://raw.githubusercontent.com/jm-sky/vue-blocks-registry/main'

/**
 * Fetches a registry item from local filesystem or remote URL.
 * When VUE_BLOCKS_LOCAL_REGISTRY is set, reads from local filesystem.
 * This is useful for testing unreleased components.
 */
export async function fetchRegistryItem(name: string): Promise<RegistryItem | null> {
  try {
    const localRegistryPath = process.env.VUE_BLOCKS_LOCAL_REGISTRY

    if (localRegistryPath) {
      // Use local filesystem
      const filePath = join(localRegistryPath, 'public/r/styles/default', `${name}.json`)
      const content = await readFile(filePath, 'utf-8')
      return JSON.parse(content) as RegistryItem
    }

    // Use remote URL
    const url = `${REGISTRY_URL}/public/r/styles/default/${name}.json`
    const response = await fetch(url)

    if (!response.ok) {
      return null
    }

    return await response.json() as RegistryItem
  }
  catch {
    return null
  }
}

/**
 * Fetches the registry index from local filesystem or remote URL.
 * When VUE_BLOCKS_LOCAL_REGISTRY is set, reads from local filesystem.
 */
export async function fetchRegistry(): Promise<{ items: RegistryItem[] } | null> {
  try {
    const localRegistryPath = process.env.VUE_BLOCKS_LOCAL_REGISTRY

    if (localRegistryPath) {
      // Use local filesystem
      const filePath = join(localRegistryPath, 'registry.json')
      const content = await readFile(filePath, 'utf-8')
      return JSON.parse(content)
    }

    // Use remote URL
    const url = `${REGISTRY_URL}/registry.json`
    const response = await fetch(url)

    if (!response.ok) {
      return null
    }

    return await response.json()
  }
  catch {
    return null
  }
}

/**
 * Fetches file content from registry (local filesystem or remote URL).
 * When VUE_BLOCKS_LOCAL_REGISTRY is set, reads from local filesystem.
 */
export async function fetchFileContent(path: string): Promise<string | null> {
  try {
    const localRegistryPath = process.env.VUE_BLOCKS_LOCAL_REGISTRY

    if (localRegistryPath) {
      // Use local filesystem
      const filePath = join(localRegistryPath, 'registry', path)
      return await readFile(filePath, 'utf-8')
    }

    // Use remote URL
    const url = `${REGISTRY_URL}/registry/${path}`
    const response = await fetch(url)

    if (!response.ok) {
      return null
    }

    return await response.text()
  }
  catch {
    return null
  }
}
