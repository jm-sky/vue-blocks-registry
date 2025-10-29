import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'

/**
 * Removes default Vue CLI/create-vue boilerplate files
 */
export async function cleanupDefaultVueFiles(cwd: string): Promise<void> {
  const spinner = ora('Cleaning up default Vue files...').start()

  try {
    const filesToRemove = [
      'src/views',
      'src/stores/counter.ts',
      'src/assets/base.css',
      'src/assets/main.css',
      'src/components/HelloWorld.vue',
      'src/components/TheWelcome.vue',
      'src/components/WelcomeItem.vue',
      'src/components/icons',
    ]

    for (const file of filesToRemove) {
      const filePath = path.join(cwd, file)
      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath)
      }
    }

    spinner.succeed('Default Vue files cleaned up')
  }
  catch {
    spinner.warn('Some default files could not be removed')
  }
}
