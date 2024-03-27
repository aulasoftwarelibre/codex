'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import {
  BookCardActionLoanButton,
  BookCardActionReturnButton,
} from '@/app/books/components/book-card-action-button'
import { showToast } from '@/components/form/toast'
import { BookResponse } from '@/core/book/dto/responses/book.response'
import { loanAction } from '@/core/loan/infrastructure/actions/loan-actions'
import { UserResponse } from '@/core/user/dto/responses/user.response'
import { FormResponse } from '@/lib/zod/form-response'

interface BookCardFormProperties {
  book: BookResponse
  me?: UserResponse
}

function useController(properties: BookCardFormProperties) {
  const { book, me } = properties

  const isLoaned = !!book.loan
  const isMember = !!me && me.roles.includes('ROLE_MEMBER')
  const isOwned = isLoaned && isMember && book.loan.user.id === me.id
  const isActive = isMember && (!isLoaned || isOwned)

  const currentAction = useFormState(
    loanAction,
    FormResponse.initialState({ action: 'loan', bookId: book.id }),
  )

  return { currentAction, isActive, isOwned, ...properties }
}

export function BookCardForm(properties: BookCardFormProperties) {
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
        <input
          type="hidden"
          name="action"
          value={isOwned ? 'return' : 'loan'}
        />
        {isOwned ? (
          <BookCardActionReturnButton />
        ) : (
          <BookCardActionLoanButton />
        )}
      </form>
    </>
  )
}
