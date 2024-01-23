'use client'

import { Input } from '@nextui-org/input'
import { Modal, ModalBody, ModalContent } from '@nextui-org/modal'
import { Kbd } from '@nextui-org/react'
import { SearchIcon } from '@nextui-org/shared-icons'
import { Suspense } from 'react'

import { useController } from '@/app/@modal/(.)search/_components/search-modal/hooks'
import SearchResult from '@/app/@modal/(.)search/_components/search-result/search-result'

export default function SearchModal() {
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
