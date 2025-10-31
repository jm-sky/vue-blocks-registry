import fs from 'fs-extra'
import path from 'path'

/**
 * Adds Tailwind CSS plugin to vite.config.ts
 */
export async function addTailwindToViteConfig(projectPath: string): Promise<void> {
  const viteConfigPath = path.join(projectPath, 'vite.config.ts')
  let viteConfig = await fs.readFile(viteConfigPath, 'utf-8')

  if (!viteConfig.includes('@tailwindcss/vite')) {
    // Add tailwindcss import
    viteConfig = viteConfig.replace(
      /import vue from '@vitejs\/plugin-vue'/,
      'import vue from \'@vitejs/plugin-vue\'\nimport tailwindcss from \'@tailwindcss/vite\''
    )

    // Add to plugins array
    viteConfig = viteConfig.replace(
      /plugins:\s*\[/,
      'plugins: [\n    tailwindcss(),'
    )

    await fs.writeFile(viteConfigPath, viteConfig, 'utf-8')
  }
}

/**
 * Adds server proxy configuration to vite.config.ts
 */
export async function addProxyToViteConfig(projectPath: string): Promise<void> {
  const viteConfigPath = path.join(projectPath, 'vite.config.ts')
  let viteConfig = await fs.readFile(viteConfigPath, 'utf-8')

  if (!viteConfig.includes('server:')) {
    // Find the closing of defineConfig and add server config before it
    viteConfig = viteConfig.replace(
      /(\s+)(}\s*\)\s*)$/m,
      ',\n  server: {\n    proxy: {\n      \'/api\': {\n        target: process.env.VITE_API_PROXY_URL ?? \'http://localhost:8000\',\n        changeOrigin: true,\n      },\n    },\n  },$1$2'
    )

    await fs.writeFile(viteConfigPath, viteConfig, 'utf-8')
  }
}
