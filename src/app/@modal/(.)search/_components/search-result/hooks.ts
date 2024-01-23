import { useEffect, useState } from 'react'

import { SearchResultProperties } from '@/app/@modal/(.)search/_components/search-result/types'
import BookResponse from '@/core/book/dto/responses/book.response'
import { searchBooks } from '@/core/book/infrastructure/actions/search-books'

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
