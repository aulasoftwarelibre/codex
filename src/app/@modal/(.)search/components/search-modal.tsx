'use client'

import { Input } from '@nextui-org/input'
import { Modal, ModalBody, ModalContent } from '@nextui-org/modal'
import { Kbd, useDisclosure } from '@nextui-org/react'
import { SearchIcon } from '@nextui-org/shared-icons'
import {
  usePathname,
  useSearchParams,
} from 'next/dist/client/components/navigation'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { SearchResult } from '@/app/@modal/(.)search/components/search-result'
import { BookResponse } from '@/core/book/dto/responses/book.response'

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

export function SearchModal() {
  const {
    handleSearch,
    modal: { onClose, onOpenChange, onSelectedBook },
    query,
  } = useController()

  return (
    <div>
      <Modal
        isOpen={true}
        onOpenChange={onOpenChange}
        placement="top"
        hideCloseButton
        size="3xl"
        onClose={onClose}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody className="w-full p-0">
                <Input
                  autoFocus
                  startContent={<SearchIcon />}
                  endContent={<Kbd keys={'escape'}></Kbd>}
                  placeholder="Buscar actividad"
                  defaultValue={query}
                  onValueChange={handleSearch}
                />
                <Suspense fallback={<>Loading...</>}>
                  <SearchResult query={query} onSelectedBook={onSelectedBook} />
                </Suspense>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
