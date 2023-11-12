'use client'

import Image, { ImageProps } from 'next/image'

import { useController } from '@/components/ThemeSwitcher/hooks'

type ThemeImageProps = Omit<ImageProps, 'src'> & {
  srcDark: string
  srcLight: string
}

export default function ThemeImage(props: ThemeImageProps) {
  const { mounted, theme } = useController()
  const { alt, srcDark, srcLight, ...rest } = props

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
