import { expect, test } from '../tests/fixtures'

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
    // Assert
    await expect(page).toHaveURL(/books\/[\dA-Z]{26}$/)
    await expect(
      page.getByRole('heading', { name: 'A new book' }),
    ).toBeVisible()
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
    // Assert
    await expect(page).toHaveURL(/books\/[\dA-Z]{26}$/)
    await expect(page.getByText('Jenny Doe, John Doe')).toBeVisible()
  })
})
