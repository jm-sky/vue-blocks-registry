import { favicons } from 'favicons'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const src = path.join(__dirname, '../public/logo.svg')
const dest = path.join(__dirname, '../public')

const configuration = {
  path: '/',
  appName: 'Vue Blocks Registry',
  appShortName: 'VueBlocks',
  appDescription: 'A modular registry system for Vue 3 projects',
  background: '#ffffff',
  theme_color: '#103d8d',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    favicons: true,
    windows: false,
    yandex: false,
  },
}

async function generateFavicons() {
  try {
    console.log('Generating favicons from logo.svg...')
    const response = await favicons(src, configuration)

    // Filter to keep only essential icons
    const essentialIcons = response.images.filter((img) => {
      const name = img.name
      // Keep only essential sizes
      return (
        name === 'favicon.ico' ||
        name === 'favicon-16x16.png' ||
        name === 'favicon-32x32.png' ||
        name === 'android-chrome-192x192.png' ||
        name === 'android-chrome-512x512.png' ||
        name === 'apple-touch-icon.png' ||
        name === 'apple-touch-icon-180x180.png'
      )
    })

    // Write only essential image files
    await Promise.all(
      essentialIcons.map((img) =>
        fs.writeFile(path.join(dest, img.name), img.contents),
      ),
    )
    console.log(`✓ Generated ${essentialIcons.length} essential icon files (filtered from ${response.images.length} total)`)

    // Write config files (manifest, browserconfig)
    await Promise.all(
      response.files.map((file) =>
        fs.writeFile(path.join(dest, file.name), file.contents),
      ),
    )
    console.log(`✓ Generated ${response.files.length} config files`)

    // Write HTML meta tags to a temporary file for reference
    await fs.writeFile(
      path.join(dest, 'favicon-html.txt'),
      response.html.join('\n'),
    )
    console.log('✓ Generated HTML meta tags (saved to favicon-html.txt)')

    console.log('\n✅ Favicons generated successfully!')
    console.log(
      '\n📝 Next steps:\n1. Review favicon-html.txt for HTML meta tags\n2. Update index.html with the new meta tags',
    )
  } catch (error) {
    console.error('❌ Error generating favicons:', error)
    process.exit(1)
  }
}

generateFavicons()
