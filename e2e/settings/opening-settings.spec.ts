import { expect, test } from '../tests/fixtures'

test.describe('open settings page', () => {
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
