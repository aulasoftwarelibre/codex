'use client'

import { Listbox, ListboxItem } from '@nextui-org/react'
import { AddNoteBulkIcon } from '@nextui-org/shared-icons'

import { useController } from '@/components/search-result/hooks'
import { SearchResultProperties } from '@/components/search-result/types'

export default function SearchResult(properties: SearchResultProperties) {
  const { onSelectedBook, searchResult } = useController(properties)

  if (!searchResult || searchResult.length === 0) {
    return null
  }

  return (
    <div>
      <Listbox aria-label="Found activities" items={searchResult}>
        {(book) => (
          <ListboxItem
            description={book.authors.join(', ')}
            key={book.id}
            startContent={<AddNoteBulkIcon />}
            onClick={() => onSelectedBook(book)}
          >
            {book.title.slice(0, 100)}
          </ListboxItem>
        )}
      </Listbox>
    </div>
  )
}
