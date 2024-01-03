import { Page } from '@playwright/test'
import { ulid } from 'ulid'

import prisma from '../helpers/prisma'

class BookPage {
  constructor(private readonly page: Page) {}

  async goto(id?: string) {
    if (!id) {
      await this.page.goto('/books/new')
      return
    }

    await this.page.goto(`/books/${id}/edit`)
  }

  async addBook(title: string, authors: string[], image: string) {
    const { id } = await prisma.book.create({
      data: {
        authors,
        id: ulid(),
        image,
        title,
      },
    })

    return id
  }

  async fillForm(title: string, authors: string[], image: string) {
    await this.editTitle(title)
    await this.editAuthors(authors)
    await this.editImage(image)
  }

  async editImage(image: string) {
    await this.page.getByPlaceholder('Imagen').fill(image)
  }

  async editAuthors(authors: string[]) {
    await this.page.getByPlaceholder('Autores').fill(authors.join(', '))
  }

  async editTitle(title: string) {
    await this.page.getByPlaceholder('Título').fill(title)
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Enviar' }).click()
  }

  async remove(id: string) {
    await prisma.book.deleteMany({ where: { id } })
  }

  async removeAll(ids?: string[]) {
    if (!ids) {
      await prisma.book.deleteMany({})
      return
    }

    await prisma.book.deleteMany({ where: { id: { in: ids } } })
  }
}

export default BookPage
