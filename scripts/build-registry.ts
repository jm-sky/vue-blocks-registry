#!/usr/bin/env tsx

/**
 * Build Registry Script
 *
 * This script reads registry.json and generates individual JSON files
 * for each component in public/r/styles/default/ directory.
 *
 * Usage: pnpm run build:registry
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ROOT_DIR = join(__dirname, '..')
const REGISTRY_PATH = join(ROOT_DIR, 'registry.json')
const OUTPUT_DIR = join(ROOT_DIR, 'public/r/styles/default')

interface RegistryItem {
  name: string
  type: string
  title: string
  description: string
  categories: string[]
  files: Array<{
    path: string
    type: string
  }>
  dependencies: string[]
  registryDependencies: string[]
}

interface Registry {
  $schema: string
  name: string
  version: string
  description: string
  homepage: string
  items: RegistryItem[]
}

function main() {
  console.log('📦 Building registry files...\n')

  // Read registry.json
  const registryContent = readFileSync(REGISTRY_PATH, 'utf-8')
  const registry: Registry = JSON.parse(registryContent)

  console.log(`Found ${registry.items.length} items in registry.json`)

  // Ensure output directory exists
  mkdirSync(OUTPUT_DIR, { recursive: true })

  // Generate individual JSON files for each item
  let successCount = 0
  let errorCount = 0

  for (const item of registry.items) {
    try {
      const itemJson = {
        $schema: '../../../../registry-item-schema.json',
        name: item.name,
        type: item.type,
        title: item.title,
        description: item.description,
        categories: item.categories,
        files: item.files,
        dependencies: item.dependencies,
        registryDependencies: item.registryDependencies
      }

      const outputPath = join(OUTPUT_DIR, `${item.name}.json`)
      writeFileSync(outputPath, JSON.stringify(itemJson, null, 2) + '\n')

      console.log(`✅ Generated: ${item.name}.json`)
      successCount++
    } catch (error) {
      console.error(`❌ Failed to generate ${item.name}.json:`, error)
      errorCount++
    }
  }

  console.log(`\n✨ Done! Generated ${successCount} files`)
  if (errorCount > 0) {
    console.error(`⚠️  ${errorCount} files failed`)
    process.exit(1)
  }
}

main()
