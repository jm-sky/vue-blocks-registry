import fs from 'fs-extra'
import path from 'path'

export interface Config {
  $schema?: string
  style: string
  typescript: boolean
  tailwind: {
    config: string
    css: string
    baseColor: string
    cssVariables: boolean
    prefix: string
  }
  iconLibrary: string
  aliases: {
    components: string
    utils: string
    ui: string
    lib: string
    composables: string
  }
  registries?: Record<string, string>
}

export const DEFAULT_CONFIG: Config = {
  $schema: 'https://shadcn-vue.com/schema.json',
  style: 'new-york',
  typescript: true,
  tailwind: {
    config: '',
    css: 'src/css/style.css',
    baseColor: 'neutral',
    cssVariables: true,
    prefix: '',
  },
  iconLibrary: 'lucide',
  aliases: {
    components: '@/components',
    utils: '@/lib/utils',
    ui: '@/components/ui',
    lib: '@/lib',
    composables: '@/composables',
  },
  registries: {},
}

export async function getConfig(cwd: string): Promise<Config | null> {
  const configPath = path.join(cwd, 'components.json')

  if (!await fs.pathExists(configPath)) {
    return null
  }

  const config = await fs.readJson(configPath)
  return config as Config
}

export async function saveConfig(cwd: string, config: Config): Promise<void> {
  const configPath = path.join(cwd, 'components.json')
  await fs.writeJson(configPath, config, { spaces: 2 })
}
