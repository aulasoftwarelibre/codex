import { useDisclosure } from '@nextui-org/react'
import {
  usePathname,
  useSearchParams,
} from 'next/dist/client/components/navigation'
import { useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import BookResponse from '@/core/book/dto/responses/book.response'

export function useController() {
  const { onOpen, onOpenChange } = useDisclosure()
  const router = useRouter()
  const pathname = usePathname()
  const searchParameters = useSearchParams()

  const handleSearch = useDebouncedCallback((term: string) => {
    const parameters = new URLSearchParams(searchParameters)

    if (term) {
      parameters.set('query', term)
    } else {
      parameters.delete('query')
    }

    router.replace(`${pathname}?${parameters.toString()}`)
  }, 200)

  const onClose = () => {
    router.back()
  }

  const onSelectedBook = (book: BookResponse) => {
    router.back()
    setTimeout(() => router.push(`/books/${book.id}`), 100)
  }

  return {
    handleSearch,
    modal: { onClose, onOpen, onOpenChange, onSelectedBook },
    query: searchParameters.get('query')?.toString(),
  }
}
