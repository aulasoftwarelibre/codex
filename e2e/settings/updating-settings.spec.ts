import { USER_AUTH_FILE } from '../tests/constants'
import { expect, test } from '../tests/fixtures'

test.use({ storageState: USER_AUTH_FILE })

test.describe('update user settings', () => {
  test('update name', async ({ page, settingsPage }) => {
    // Arrange
    await settingsPage.goto()
    // Act
    await settingsPage.editName('John Doe')
    await settingsPage.submit()
    await page.reload()

    // Assert
    await expect(page).toHaveURL('/settings/profile')
    await expect(page.getByPlaceholder('Nombre')).toHaveValue('John Doe')
  })
})
