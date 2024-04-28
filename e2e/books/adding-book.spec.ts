import { ADMIN_AUTH_FILE } from '../tests/constants'
import { expect, test } from '../tests/fixtures'

test.use({ storageState: ADMIN_AUTH_FILE })

test.describe('Adding a book', () => {
  test('Add a new book with an author', async ({ bookPage, page }) => {
    // Arrange
    await bookPage.goto()
    // Act
    await bookPage.fillForm(
      'A new book',
      ['Jenny Doe'],
      'http://localhost:3000/images/book.jpeg',
    )
    await bookPage.submit()
    // Assert
    await expect(page).toHaveURL(/books\/[\dA-Z]{26}/)
    await expect(page.getByLabel('Título')).toContainText('A new book')
  })

  test('Add a book with several authors', async ({ bookPage, page }) => {
    // Arrange
    await bookPage.goto()
    // Act
    await bookPage.fillForm(
      'A new book',
      ['Jenny Doe', 'John Doe'],
      'http://localhost:3000/images/book.jpeg',
    )
    await bookPage.submit()
    // Assert
    await expect(page).toHaveURL(/books\/[\dA-Z]{26}/)
    await expect(page.getByLabel('Autores')).toContainText(
      'Jenny Doe, John Doe',
    )
  })
})
