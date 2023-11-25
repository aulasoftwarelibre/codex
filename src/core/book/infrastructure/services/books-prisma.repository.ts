import { Book as PrismaBook, PrismaClient } from '@prisma/client'

import { BookAuthor } from '@/core/book/domain/model/author.value-object'
import Book from '@/core/book/domain/model/book.entity'
import BookId from '@/core/book/domain/model/id.value-object'
import BookImage from '@/core/book/domain/model/image.value-object'
import { BookTitle } from '@/core/book/domain/model/title.value-object'
import Books from '@/core/book/domain/services/books.repository'

export default class BooksPrisma implements Books {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Book[]> {
    const books = await this.prisma.book.findMany()

    return books.map((book) => this.mapFromPrismaBook(book))
  }

  async findById(id: BookId): Promise<Book | undefined> {
    const book = await this.prisma.book.findUnique({
      where: {
        id: id.value,
      },
    })

    if (!book) {
      return undefined
    }

    return this.mapFromPrismaBook(book)
  }

  private mapFromPrismaBook(book: PrismaBook): Book {
    return new Book(
      new BookId(book.id),
      new BookTitle(book.title),
      book.authors.map((author) => new BookAuthor(author)),
      new BookImage(book.image),
    )
  }

  async save(book: Book): Promise<void> {
    const { authors, id, image, title } = book

    await this.prisma.book.upsert({
      create: {
        authors,
        id,
        image,
        title,
      },
      update: {
        authors,
        image,
        title,
      },
      where: {
        id,
      },
    })
  }
}
