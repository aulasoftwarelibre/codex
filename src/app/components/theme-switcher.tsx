'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { Switch } from '@nextui-org/react'

import { useTheme } from '@/lib/hooks/use-theme'

export function ThemeSwitcher() {
  const { mounted, setTheme, theme } = useTheme()

  if (!mounted) return

  return (
    <Switch
      defaultSelected={theme === 'light'}
      size="md"
      color="secondary"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      data-testid="theme-switcher"
    />
  )
}
