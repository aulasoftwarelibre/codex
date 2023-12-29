import { expect, test } from '@playwright/test'

test('/', async ({ page }) => {
  // Arrange
  // Act
  await page.goto('/')

  // Assert
  await expect(page.locator('body')).toHaveText(/Codex/)
})
