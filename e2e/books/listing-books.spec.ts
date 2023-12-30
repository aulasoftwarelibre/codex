import { expect, test } from '../tests/fixtures'

test.describe('Listing books', () => {
  const index: string[] = []

  test.beforeEach('Create fixtures', async ({ bookPage }) => {
    index.push(
      await bookPage.addBook(
        'A listed book',
        ['Jenny Doe'],
        'http://localhost:3000/images/book.jpeg',
      ),
      await bookPage.addBook(
        'A listed book',
        ['Jenny Doe'],
        'http://localhost:3000/images/book.jpeg',
      ),
    )
  })

  test.afterEach('Delete fixtures', async ({ bookPage }) => {
    await bookPage.removeAll(index)
  })

  test('Show a list of books', async ({ page }) => {
    // Arrange
    // Act
    await page.goto('/')
    // Assert
    expect(await page.getByRole('gridcell').count()).toEqual(2)
  })
})
