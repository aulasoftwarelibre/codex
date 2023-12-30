import { expect, test } from '../tests/fixtures'

test.describe('Loaning books', () => {
  let index: string

  test.beforeEach('Create fixtures', async ({ bookPage }) => {
    index = await bookPage.addBook(
      'A example book',
      ['Jenny Doe'],
      'http://localhost:3000/images/book.jpeg',
    )
  })

  test.afterEach('Delete fixtures', async ({ bookPage }) => {
    await bookPage.remove(index)
  })

  test('Loan a book', async ({ catalogPage, page }) => {
    // Arrange
    await catalogPage.goto()
    // Act
    await catalogPage.loan('A example book')
    // Assert
    await expect(
      page.getByRole('gridcell', { name: 'A example book' }),
    ).toHaveClass(/border-t-zinc-600/)
  })

  test('Return a book', async ({ catalogPage, page }) => {
    // Arrange
    await catalogPage.goto()
    await catalogPage.loan('A example book')
    // Act
    await catalogPage.return('A example book')
    // Assert
    await expect(
      page.getByRole('gridcell', { name: 'A example book' }),
    ).toHaveClass(/border-t-green-600/)
  })
})
