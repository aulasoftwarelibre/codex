'use client'

import Image, { ImageProps } from 'next/image'

import { useTheme } from '@/lib/hooks/use-theme'

type ThemeImageProperties = Omit<ImageProps, 'src'> & {
  srcDark: string
  srcLight: string
}

export function ThemeImage(properties: ThemeImageProperties) {
  const { mounted, theme } = useTheme()
  const { alt, srcDark, srcLight, ...rest } = properties

  if (!mounted)
    return (
      <>
        <Image
          alt={alt}
          {...rest}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />
      </>
    )

  if (theme === 'light') {
    return (
      <>
        <Image alt={alt} {...rest} src={srcLight} />
      </>
    )
  }

  return (
    <>
      <Image alt={alt} {...rest} src={srcDark} />
    </>
  )
}
