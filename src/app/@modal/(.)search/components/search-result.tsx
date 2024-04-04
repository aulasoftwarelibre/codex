'use client'

import { Listbox, ListboxItem } from '@nextui-org/react'
import { AddNoteBulkIcon } from '@nextui-org/shared-icons'
import { useEffect, useState } from 'react'

import { BookResponse } from '@/core/book/dto/responses/book.response'
import { searchBooks } from '@/core/book/infrastructure/actions/search-books'

export interface SearchResultProperties {
  onSelectedBook: (book: BookResponse) => void
  query?: string
}

export function useController(properties: SearchResultProperties) {
  const { query = '' } = properties

  const [searchResult, setSearchResult] = useState<BookResponse[] | undefined>()

  useEffect(() => {
    const controller = new AbortController()

    searchBooks({ terms: query.split(' ') })
      .then((result) => setSearchResult(result))
      .catch(() => {})

    return () => {
      controller.abort()
    }
  }, [query])

  return { searchResult, ...properties }
}

export function SearchResult(properties: SearchResultProperties) {
  const { onSelectedBook, searchResult } = useController(properties)

  if (!searchResult || searchResult.length === 0) {
    return null
  }

  return (
    <div>
      <Listbox aria-label="Found books" items={searchResult}>
        {(book) => (
          <ListboxItem
            description={book.authors.join(', ')}
            key={book.id}
            onClick={() => onSelectedBook(book)}
            startContent={<AddNoteBulkIcon />}
          >
            {book.title.slice(0, 100)}
          </ListboxItem>
        )}
      </Listbox>
    </div>
  )
}
