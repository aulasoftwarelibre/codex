import React from 'react'

import AuthModal from '@/components/AuthModal/AuthModal'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AuthModal>{children}</AuthModal>
    </>
  )
}
