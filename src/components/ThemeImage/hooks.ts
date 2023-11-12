import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useController() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [setMounted])
  return { mounted, setTheme, theme }
}
