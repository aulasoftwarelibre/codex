import { ADMIN_AUTH_FILE } from '../tests/constants'
import { expect, test } from '../tests/fixtures'

test.use({ storageState: ADMIN_AUTH_FILE })

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
    await expect(page.getByLabel('Título')).toContainText('A new title')
  })

  test('Edit the authors of a book', async ({ bookPage, page }) => {
    // Arrange
    await bookPage.goto(index)
    // Act
    await bookPage.editAuthors(['John Doe'])
    await bookPage.submit()
    // Assert
    await expect(page.getByLabel('Autores')).toContainText('John Doe')
  })
})
