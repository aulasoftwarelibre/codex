import { Button } from '@nextui-org/button'
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import { InputForm } from '@/components/form/input-form'
import { ScoreInputForm } from '@/components/form/score-input-form'
import { SubmitButton } from '@/components/form/submit-button'
import { TextareaForm } from '@/components/form/textarea-form'
import { showToast } from '@/components/form/toast'
import { createReview } from '@/core/review/infrastructure/actions/create-review'
import { FormResponse } from '@/lib/zod/form-response'

interface BookReviewFormProperties {
  bookId: string
  onClose: () => void
}

export function BookReviewForm({ bookId, onClose }: BookReviewFormProperties) {
  const formData = {
    bookId,
    description: '',
    id: '',
    score: '5',
    title: '',
  }

  const [state, action] = useFormState(
    createReview,
    FormResponse.initialState(formData),
  )

  useEffect(() => {
    if (state?.success) {
      showToast(state.message)
    }
  }, [state])

  useEffect(() => {
    if (state?.success) {
      onClose()
    }
  }, [state, onClose])

  return (
    <>
      <form action={action}>
        <input name="bookId" type="hidden" value={state.data.bookId} />
        <ModalHeader className="flex flex-col px-6 py-4 pt-8">
          <h1 className="text-large font-semibold">Escribe una reseña</h1>
          <p className="text-small font-normal text-default-400">
            Comparte tu opinión sobre este libro.
          </p>
        </ModalHeader>
        <ModalBody className="gap-6">
          <input name="id" type="hidden" value={state.data.id} />
          <ScoreInputForm defaultValue={'5'} label="Valoración" name="score" />
          <InputForm
            defaultValue={state.data.title}
            isRequired
            label="Título"
            name="title"
            state={state}
          />
          <TextareaForm
            defaultValue={state.data.description}
            isRequired
            label="Descripción"
            name="description"
            state={state}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onClose} radius="none" variant="flat">
            Cancelar
          </Button>
          <SubmitButton />
        </ModalFooter>
      </form>
    </>
  )
}
