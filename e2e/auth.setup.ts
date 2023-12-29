import { test as setup } from '@playwright/test'

export const USER_AUTH_FILE = 'playwright/.auth/user.json'

setup('authenticate as user', async ({ page, request }) => {
  // Insert email
  await page.goto('/signin')
  await page.getByPlaceholder('Introduce tu email').fill('noreply@uco.es')
  await page.getByRole('button', { name: 'Continuar con el email' }).click()

  // Open WebMail
  await page.getByRole('button', { name: 'Abrir UCOWebMail' }).click()
  const webMailPage = await page.waitForEvent('popup')
  await webMailPage.getByText('aulasoftwarelibre@uco.es').first().click()

  // Open login link
  await webMailPage
    .frameLocator('#preview-html')
    .getByRole('link', { name: 'Sign in' })
    .click()

  // Store credentials
  const loggedPage = await webMailPage.waitForEvent('popup')
  await loggedPage.context().storageState({ path: USER_AUTH_FILE })
  await loggedPage.close()
  await page.close()

  // Purge WebMail
  await request.delete('http://localhost:8025/api/v1/messages')
})
