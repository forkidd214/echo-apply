'use client'

import { useState } from 'react'
import BlockTextEditor from './block-text-editor'

type BlockTitleProps = {
  value?: string
}

export default function BlockTitle({ value = '' }: BlockTitleProps) {
  const [title, setTitle] = useState(value)

  return (
    <BlockTextEditor
      value={title}
      setValue={setTitle}
      variant={'title'}
      placeholder="Your question here"
    />
  )
}
