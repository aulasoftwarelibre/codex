import { test as setup } from '@playwright/test'
import fs from 'fs'

import LoginPage from './tests/pages/login.page'

export const USER_AUTH_FILE = 'playwright/.auth/user.json'

setup('authenticate as user', async ({ page, request }) => {
  if (fs.existsSync(USER_AUTH_FILE)) {
    // Reuse existing authentication state if any.
    return
  }

  const loginPage = new LoginPage(page)
  await loginPage.goto()
  const loggedPage = await loginPage.login('noreply@uco.es')
  await loggedPage.context().storageState({ path: USER_AUTH_FILE })
  await loggedPage.close()
  await page.close()

  // Purge WebMail
  await request.delete('http://localhost:8025/api/v1/messages')
})
