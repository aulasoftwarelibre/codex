import { ADMIN_AUTH_FILE } from '../tests/constants'
import { expect, test } from '../tests/fixtures'

test.describe.configure({ mode: 'parallel' })
test.use({ storageState: ADMIN_AUTH_FILE })

test.describe('Book validation', () => {
  test.describe('Title validation', () => {
    test('Trying to add a book without a title', async ({ bookPage, page }) => {
      // Arrange
      await bookPage.goto()
      // Act
      await bookPage.fillForm(
        '',
        ['Jenny Doe'],
        'http://localhost:3000/images/book.jpeg',
      )
      await bookPage.submit()
      // Assert
      await expect(page).toHaveURL('/books/new')
      await expect(
        page.locator('[placeholder=Título][required]:invalid'),
      ).toBeVisible()
    })

    test('Trying to add a book with a short title', async ({
      bookPage,
      page,
    }) => {
      // Arrange
      await bookPage.goto()
      // Act
      await bookPage.fillForm(
        'A',
        ['Jenny Doe'],
        'http://localhost:3000/images/book.jpeg',
      )
      await bookPage.submit()
      // Assert
      await expect(page).toHaveURL('/books/new')
      await expect(page.getByText('Introduzca un título válido.')).toBeVisible()
    })
  })

  test.describe('Author validation', () => {
    test('Trying to add a book without any author', async ({
      bookPage,
      page,
    }) => {
      // Arrange
      await bookPage.goto()
      // Act
      await bookPage.fillForm(
        'A new book',
        [],
        'http://localhost:3000/images/book.jpeg',
      )
      await bookPage.submit()
      // Assert
      await expect(page).toHaveURL('/books/new')
      await expect(
        page.locator('[placeholder=Autores][required]:invalid'),
      ).toBeVisible()
    })

    test('Trying to add a book with a short author name', async ({
      bookPage,
      page,
    }) => {
      // Arrange
      await bookPage.goto()
      // Act
      await bookPage.fillForm(
        'A new book',
        ['A'],
        'http://localhost:3000/images/book.jpeg',
      )
      await bookPage.submit()
      // Assert
      await expect(page).toHaveURL('/books/new')
      await expect(
        page.getByText('Introduzca un nombre de autor válido.'),
      ).toBeVisible()
    })
  })

  test.describe('Image validation', () => {
    test('Trying to add a book without any image', async ({
      bookPage,
      page,
    }) => {
      // Arrange
      await bookPage.goto()
      // Act
      await bookPage.fillForm('A new book', ['Jenny Doe'], '')
      await bookPage.submit()
      // Assert
      await expect(page).toHaveURL('/books/new')
      await expect(
        page.locator('[placeholder=Imagen][required]:invalid'),
      ).toBeVisible()
    })

    test('Trying to add a book with a invalid image url', async ({
      bookPage,
      page,
    }) => {
      // Arrange
      await bookPage.goto()
      // Act
      await bookPage.fillForm('A new book', ['Jenny Doe'], 'book.jpeg')
      await bookPage.submit()
      // Assert
      await expect(page).toHaveURL('/books/new')
      await expect(
        page.getByText('Se debe indicar una URL válida.'),
      ).toBeVisible()
    })
  })
})
