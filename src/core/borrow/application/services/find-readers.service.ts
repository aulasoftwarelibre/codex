export interface FindBorrowsService {
  withReader(bookId: string): Promise<BorrowWithReaderResponse | null>
}

export interface BorrowWithReaderResponse {
  id: string
  reader: {
    email: string
  }
}
