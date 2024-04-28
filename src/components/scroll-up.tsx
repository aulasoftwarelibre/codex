'use client'

import { useEffect } from 'react'

export function ScrollUp() {
  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), [])

  return null
}
