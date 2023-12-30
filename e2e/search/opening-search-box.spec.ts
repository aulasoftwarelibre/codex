import { expect, test } from '../tests/fixtures'

test.describe('Opening search book', () => {
  test('Open search box with input search', async ({ page }) => {
    // Arrange
    await page.goto('/')
    // Act
    await page.getByPlaceholder('Búsqueda rápida...').click()
    await page.waitForSelector('[role=dialog]')
    // Assert
    await expect(page.getByPlaceholder('Buscar actividad')).toBeVisible()
    await expect(page).toHaveURL('/search')
  })

  test('Open search box with keyboard', async ({ page }) => {
    // Arrange
    await page.goto('/')
    // Act
    await page.keyboard.press('Control+k')
    await page.waitForSelector('[role=dialog]')
    // Assert
    await expect(page.getByPlaceholder('Buscar actividad')).toBeVisible()
    await expect(page).toHaveURL('/search')
  })
})
