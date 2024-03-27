import { useTheme as useNextTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useTheme() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useNextTheme()

  useEffect(() => {
    setMounted(true)
  }, [setMounted])

  return { mounted, setTheme, theme }
}
