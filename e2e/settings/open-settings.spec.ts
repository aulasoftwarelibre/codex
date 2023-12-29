import { expect, test } from '@playwright/test'

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
