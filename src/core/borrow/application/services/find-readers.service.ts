export interface FindBorrowsService {
  withReader(bookId: string): Promise<BorrowWithReaderResponse | undefined>
}

export interface BorrowWithReaderResponse {
  id: string
  reader: {
    email: string
  }
}
