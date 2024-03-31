import { BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/24/solid'
import { ReactNode } from 'react'

import { SubmitButton } from '@/components/form/submit-button'

interface BookCardActionButtonProperties {
  'aria-label': string
  children: ReactNode
  position: 'left' | 'right'
}

export function BookCardActionButton({
  'aria-label': ariaLabel,
  children,
  position,
}: BookCardActionButtonProperties) {
  const baseClasses =
    'opacity-0 group-hover:opacity-100 transition group-hover:duration-300 group-hover:-translate-y-2 text-center w-14 h-14 hover:scale-105 bg-gradient-to-tr from-pink-500 to-yellow-500 shadow-2xl absolute bottom-4 z-10'

  const positionClass = position === 'left' ? 'left-5' : 'right-5'

  return (
    <SubmitButton
      aria-label={ariaLabel}
      isIconOnly
      className={`${baseClasses} ${positionClass}`}
      radius="full"
      variant="flat"
    >
      {children}
    </SubmitButton>
  )
}

export function BookCardActionLoanButton() {
  return (
    <>
      <BookCardActionButton aria-label="Loan book" position={'right'}>
        <BookmarkIcon className="m-auto h-8 w-8 fill-white" />
      </BookCardActionButton>
    </>
  )
}

export function BookCardActionReturnButton() {
  return (
    <>
      <BookCardActionButton aria-label="Return book" position={'left'}>
        <BookmarkSlashIcon className="m-auto h-8 w-8 fill-white" />
      </BookCardActionButton>
    </>
  )
}
