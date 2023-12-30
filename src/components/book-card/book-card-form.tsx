'use client'

import { BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import SubmitButton from '@/components/submit-button/submit-button'
import { showToast } from '@/components/toast/toast'
import BookResponse from '@/core/book/dto/responses/book.response'
import { loanBook } from '@/core/loan/infrastructure/actions/loan-book'
import { returnBook } from '@/core/loan/infrastructure/actions/return-book'
import UserResponse from '@/core/user/dto/responses/user.response'
import FormResponse from '@/lib/zod/form-response'

interface BookCardFormProperties {
  book: BookResponse
  me?: UserResponse
}

function useController(properties: BookCardFormProperties) {
  const { book, me } = properties

  const isLoaned = !!book.loan
  const isLogged = !!me
  const isOwned = isLoaned && isLogged && book.loan.user.id === me.id
  const isActive = isLogged && (!isLoaned || isOwned)

  const currentAction = useFormState(
    isOwned ? returnBook : loanBook,
    FormResponse.initialState({ bookId: book.id }),
  )

  return { currentAction, isActive, isOwned, ...properties }
}

export default function BookCardForm(properties: BookCardFormProperties) {
  const {
    currentAction: [state, action],
    isActive,
    isOwned,
  } = useController(properties)

  useEffect(() => {
    if (state?.success) {
      showToast(state.message)
    }
  }, [state])

  if (!isActive) {
    return null
  }

  return (
    <>
      <form action={action}>
        <input type="hidden" name="bookId" value={state.data.bookId} />
        {isOwned ? <ReturnButton /> : <LoanButton />}
      </form>
    </>
  )
}

function LoanButton() {
  return (
    <>
      <SubmitButton
        aria-label="Loan book"
        isIconOnly
        className="opacity-0 group-hover:opacity-100 transition group-hover:duration-300 group-hover:-translate-y-2 text-center w-14 h-14 hover:scale-105 bg-gradient-to-tr from-pink-500 to-yellow-500 shadow-2xl absolute bottom-4 right-5 z-10"
        radius="full"
        variant="flat"
      >
        <BookmarkIcon className="h-8 w-8 m-auto fill-white" />
      </SubmitButton>
    </>
  )
}

function ReturnButton() {
  return (
    <>
      <SubmitButton
        aria-label="Return book"
        isIconOnly
        className="opacity-0 group-hover:opacity-100 transition group-hover:duration-300 group-hover:-translate-y-2 text-center w-14 h-14 hover:scale-105 bg-gradient-to-tr from-pink-500 to-yellow-500 shadow-2xl absolute bottom-4 left-5 z-10"
        radius="full"
        variant="flat"
      >
        <BookmarkSlashIcon className="h-8 w-8 m-auto fill-white" />
      </SubmitButton>
    </>
  )
}
