'use client'

import { useEffect, useState } from 'react'
import BlockTextEditor from './block-text-editor'

type BlockDescriptionProps = {
  value?: string
  onSubmit?: (arg0: { description: string }) => void
}

export default function BlockDescription({
  value = '',
  onSubmit,
}: BlockDescriptionProps) {
  const [description, setDescription] = useState(value)

  /**
   * The value serves as both the initial value
   * and the server state that needs to be synchronized.
   */
  useEffect(() => {
    setDescription(value)
  }, [value])

  return (
    <BlockTextEditor
      value={description}
      setValue={setDescription}
      variant={'description'}
      placeholder="Description (optional)"
      onBlur={() =>
        value !== description && onSubmit && onSubmit({ description })
      }
    />
  )
}
