import React from 'react'

import AuthModal from '@/components/auth-modal'

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
