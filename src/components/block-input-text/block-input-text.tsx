'use client'

import { useState } from 'react'

import { BlockTextEditor } from '@/components/block-common'

type BlockInputTextProps = {
  disabled?: boolean
}

export default function BlockInputText({
  disabled = true,
}: BlockInputTextProps) {
  const [value, setValue] = useState('')

  return (
    <BlockTextEditor
      value={value}
      setValue={setValue}
      variant={'answer'}
      placeholder="Type your answer here..."
      disabled={disabled}
    />
  )
}
