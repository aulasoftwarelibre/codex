import { test as setup } from '@playwright/test'
import fs from 'fs'

import { ADMIN_AUTH_FILE, USER_AUTH_FILE } from './tests/constants'
import LoginPage from './tests/pages/login.page'
import SettingsPage from './tests/pages/settings.page'

setup('authenticate as user', async ({ page, request }) => {
  if (fs.existsSync(USER_AUTH_FILE)) {
    // Reuse existing authentication state if any.
    return
  }

  const settingsPage = new SettingsPage(page)
  await settingsPage.restore()

  const loginPage = new LoginPage(page)
  await loginPage.goto()
  const loggedPage = await loginPage.login('noreply@uco.es')
  await loggedPage.context().storageState({ path: USER_AUTH_FILE })
  await loggedPage.close()
  await page.close()

  // Purge WebMail
  await request.delete('http://localhost:8025/api/v1/mailbox/noreply')
})

setup('authenticate as admin', async ({ page, request }) => {
  if (fs.existsSync(ADMIN_AUTH_FILE)) {
    // Reuse existing authentication state if any.
    return
  }

  const settingsPage = new SettingsPage(page)
  await settingsPage.restore()

  const loginPage = new LoginPage(page)
  await loginPage.goto()
  const loggedPage = await loginPage.login('admin@uco.es')
  await loggedPage.context().storageState({ path: ADMIN_AUTH_FILE })
  await loggedPage.close()
  await page.close()

  // Purge WebMail
  await request.delete('http://localhost:8025/api/v1/mailbox/admin')
})
