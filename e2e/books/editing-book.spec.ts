import { expect, test } from '../tests/fixtures'

test.describe('Editing a book', () => {
  let index: string

  test.beforeEach('Create fixtures', async ({ bookPage }) => {
    index = await bookPage.addBook(
      'A old book',
      ['Jenny Doe'],
      'http://localhost:3000/images/book.jpeg',
    )
  })

  test.afterEach('Delete fixtures', async ({ bookPage }) => {
    await bookPage.remove(index)
  })

  test('Edit the title of a book', async ({ bookPage, page }) => {
    // Arrange
    await bookPage.goto(index)
    // Act
    await bookPage.editTitle('A new title')
    await bookPage.submit()
    // Assert
    await expect(
      page.getByRole('heading', { name: 'A new title' }),
    ).toBeVisible()
  })

  test('Edit the authors of a book', async ({ bookPage, page }) => {
    // Arrange
    await bookPage.goto(index)
    // Act
    await bookPage.editAuthors(['John Doe'])
    await bookPage.submit()
    // Assert
    await expect(page.getByText('John Doe')).toBeVisible()
  })
})
