'use client'

import { PencilIcon } from '@heroicons/react/20/solid'
import { Button } from '@nextui-org/button'
import { CardFooter } from '@nextui-org/card'
import { Modal, ModalContent } from '@nextui-org/modal'
import { useDisclosure } from '@nextui-org/use-disclosure'

import { BookReviewForm } from '@/app/books/[id]/(view)/reviews/components/book-review-form'

interface BookReviewStatsFooterProperties {
  bookId: string
}

export function BookReviewStatsFooter({
  bookId,
}: BookReviewStatsFooterProperties) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <CardFooter className="flex w-full flex-col items-start gap-4">
        <Button
          fullWidth
          onClick={onOpen}
          radius="full"
          startContent={<PencilIcon className="h-4 w-4" />}
          variant="bordered"
        >
          Escribir una reseña
        </Button>
        <p className="px-2 text-small text-default-500">
          Comparte tu opinión sobre este libro.
        </p>
      </CardFooter>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="xl"
      >
        <ModalContent>
          {(onClose) => <BookReviewForm bookId={bookId} onClose={onClose} />}
        </ModalContent>
      </Modal>
    </>
  )
}
