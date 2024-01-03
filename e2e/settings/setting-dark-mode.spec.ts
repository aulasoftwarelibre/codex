import { expect, test } from '@playwright/test'

import { USER_AUTH_FILE } from '../tests/constants'

test.use({ storageState: USER_AUTH_FILE })

test('switch from dark mode to light mode', async ({ page }) => {
  // Arrange
  await page.goto('/')
  const htmlElement = page.locator('html')

  // Act
  await page.getByTestId('theme-switcher').click()

  // Assert
  await expect(htmlElement).toHaveClass('light')
})
