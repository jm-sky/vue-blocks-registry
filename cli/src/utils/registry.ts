import type { RegistryItem } from '../types/registry.js'

export const REGISTRY_URL = 'https://raw.githubusercontent.com/jm-sky/vue-blocks-registry/main'

export async function fetchRegistryItem(name: string): Promise<RegistryItem | null> {
  try {
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

export async function fetchRegistry(): Promise<{ items: RegistryItem[] } | null> {
  try {
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

export async function fetchFileContent(path: string): Promise<string | null> {
  try {
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
