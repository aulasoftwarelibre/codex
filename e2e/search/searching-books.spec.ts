import { expect, test } from '../tests/fixtures'

test.describe('Searching books', () => {
  const index: string[] = []

  test.beforeEach('Create fixtures', async ({ bookPage }) => {
    index.push(
      await bookPage.addBook(
        'A listed book',
        ['Jenny Doe'],
        'http://localhost:3000/images/book.jpeg',
      ),
      await bookPage.addBook(
        'A example book',
        ['Jenny Doe'],
        'http://localhost:3000/images/book.jpeg',
      ),
    )
  })

  test.afterEach('Delete fixtures', async ({ bookPage }) => {
    await bookPage.removeAll(index)
  })

  test('Search a book', async ({ page }) => {
    // Arrange
    await page.goto('/')
    await page.getByPlaceholder('Búsqueda rápida...').click()
    // Act
    await page.getByPlaceholder('Buscar libro').click()
    await page.getByPlaceholder('Buscar libro').pressSequentially('example')
    // Assert
    await expect(page.getByLabel('Found books').first()).toBeVisible()
    await expect(page).toHaveURL('/search?query=example')
  })

  test('Show search page', async ({ page }) => {
    // Arrange
    // Act
    await page.goto('/search?query=example')
    // Assert
    await expect(
      page.getByRole('heading', {
        name: '1 resultado para la búsqueda:',
      }),
    ).toBeVisible()
  })
})
