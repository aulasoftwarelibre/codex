import { expect, test } from 'next/experimental/testmode/playwright'

import { USER_AUTH_FILE } from '../auth.setup'

test.describe('open settings page', () => {
  test.use({ storageState: USER_AUTH_FILE })

  test('open from main menu', async ({ page }) => {
    // Arrange
    await page.goto('/')
    // Act
    await page.getByRole('button', { name: 'avatar' }).click()
    await page.getByText('noreply@uco.es').click()

    // Assert
    await expect(page).toHaveURL('/settings/profile')
    await expect(page.locator('body')).toHaveText(/Ajustes de usuario/)
  })
})
