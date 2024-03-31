// Component from
// https://flowbite.com/docs/components/toast/

import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MouseEventHandler } from 'react'
import toast from 'react-hot-toast'

interface ToastProperties {
  message: string
  onCloseHandler: MouseEventHandler<HTMLButtonElement>
}

export function showToast(message: string) {
  toast((t) => (
    <Toast message={message} onCloseHandler={() => toast.dismiss(t.id)} />
  ))
}

export function Toast(properties: ToastProperties) {
  const { message, onCloseHandler } = properties

  return (
    <>
      <div
        id="toast-success"
        className="mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
        role="alert"
      >
        <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <CheckCircleIcon height={20} width={20} />
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ms-3  font-normal">{message}</div>
        <button
          type="button"
          className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          onClick={onCloseHandler}
        >
          <span className="sr-only">Close</span>
          <XMarkIcon width={14} height={14} aria-hidden="true" />
        </button>
      </div>
    </>
  )
}
