import { StarIcon as BaseStarIcon } from '@heroicons/react/20/solid'
import { cn } from '@nextui-org/theme'
import React from 'react'

interface StarIconProperties {
  isActive?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function StarIcon({
  isActive = false,
  size = 'md',
}: StarIconProperties) {
  const sizeClasses = {
    lg: 'h-6 w-6',
    md: 'h-5 w-5',
    sm: 'h-4 w-4',
  }

  return (
    <>
      <BaseStarIcon
        className={cn(
          sizeClasses[size],
          isActive ? 'fill-amber-300' : 'fill-default-400',
        )}
      />
    </>
  )
}
