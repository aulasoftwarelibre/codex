'use client'

import {
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
  useRadio,
} from '@nextui-org/radio'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useState } from 'react'

import { StarIcon } from '@/components/image/star-icon'

interface ScoreInputFormProperties extends RadioGroupProps {}

const STARS = ['1', '2', '3', '4', '5']
const DEFAULT_SCORE = '5'

export function ScoreInputForm(properties: ScoreInputFormProperties) {
  const { defaultValue } = properties
  const [selected, setSelected] = useState(defaultValue || DEFAULT_SCORE)

  return (
    <>
      <RadioGroup
        onValueChange={setSelected}
        orientation="horizontal"
        value={selected}
        {...properties}
      >
        {STARS.slice(0, +selected).map((score) => (
          <StarRadio key={score} value={score}>
            <StarIcon isActive />
          </StarRadio>
        ))}
        {STARS.slice(+selected).map((score) => (
          <StarRadio key={score} value={score}>
            <StarIcon />
          </StarRadio>
        ))}
      </RadioGroup>
    </>
  )
}

function StarRadio(properties: RadioProps) {
  const { children, ...rest } = properties
  const { Component } = useRadio(rest)

  return (
    <Component>
      <VisuallyHidden>
        <Radio {...rest} />
      </VisuallyHidden>
      {children}
    </Component>
  )
}
