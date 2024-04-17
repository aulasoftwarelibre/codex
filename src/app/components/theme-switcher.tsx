'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { Switch } from '@nextui-org/switch'

import { useTheme } from '@/lib/hooks/use-theme'

export function ThemeSwitcher() {
  const { mounted, setTheme, theme } = useTheme()

  if (!mounted) return

  return (
    <Switch
      color="secondary"
      data-testid="theme-switcher"
      defaultSelected={theme === 'light'}
      endContent={<MoonIcon />}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      size="md"
      startContent={<SunIcon />}
    />
  )
}
