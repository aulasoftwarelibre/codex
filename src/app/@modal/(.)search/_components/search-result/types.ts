import BookResponse from '@/core/book/dto/responses/book.response'

export interface SearchResultProperties {
  onSelectedBook: (book: BookResponse) => void
  query?: string
}
