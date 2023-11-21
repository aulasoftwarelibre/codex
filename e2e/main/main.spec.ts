// import { expect, test } from '@playwright/test'
import { expect, test } from 'next/experimental/testmode/playwright'

test('/', async ({ page }) => {
  // Arrange
  // Act
  await page.goto('/')

  // Assert
  await expect(page.locator('body')).toHaveText(/Codex/)
})
