'use client'

import { Divider } from '@nextui-org/divider'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import { InputForm } from '@/components/form/input-form'
import { SubmitButton } from '@/components/form/submit-button'
import { showToast } from '@/components/form/toast'
import { importBook } from '@/core/book/infrastructure/actions/import-book'
import { FormResponse } from '@/lib/zod/form-response'

interface BookImportFormProperties {}

export function BookImportForm({}: BookImportFormProperties) {
  const formData = {
    asin: '',
    id: '',
  }

  const [state, action] = useFormState(
    importBook,
    FormResponse.initialState(formData),
  )

  useEffect(() => {
    if (state?.success) {
      showToast(state.message)
      redirect(`/books/${state.data.id}`)
    }
  }, [state])

  return (
    <>
      <form action={action} className="flex flex-col gap-4">
        <input name="id" type="hidden" value={state.data.id} />
        <InputForm
          defaultValue={state.data.asin}
          isRequired
          label="ASIN"
          name="asin"
          state={state}
        />
        <Divider className="col-span-1 md:col-span-2" />
        <div className="flex flex-row-reverse">
          <SubmitButton />
        </div>
      </form>
    </>
  )
}
