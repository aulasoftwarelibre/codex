// import { expect, test } from '@playwright/test'
import { expect, test } from 'next/experimental/testmode/playwright'

test('switch from dark mode to light mode', async ({ page }) => {
  // Arrange
  await page.goto('/')
  const htmlElement = page.locator('html')

  // Act
  await page.getByTestId('theme-switcher').click()

  // Assert
  await expect(htmlElement).toHaveClass('light')
})
