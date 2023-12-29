import { expect, test } from '@playwright/test'

test.describe('update user settings', () => {
  test('update name', async ({ page }) => {
    // Arrange
    await page.goto('/settings/profile')
    // Act
    await page.getByPlaceholder('Nombre').fill('John Doe')
    await page.getByRole('button', { name: 'Enviar' }).click()
    await page.reload()

    // Assert
    await expect(page).toHaveURL('/settings/profile')
    await expect(page.getByPlaceholder('Nombre')).toHaveValue('John Doe')
  })
})
