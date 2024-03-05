'use client'

import { useState } from 'react'
import BlockTextEditor from './block-text-editor'

type BlockDescriptionProps = {
  value?: string
}

export default function BlockDescription({
  value = '',
}: BlockDescriptionProps) {
  const [description, setDescription] = useState(value)

  return (
    <BlockTextEditor
      value={description}
      setValue={setDescription}
      variant={'description'}
      placeholder="Description (optional)"
    />
  )
}
