'use client'

import { useEffect, useState } from 'react'
import BlockTextEditor from './block-text-editor'
import { BlockStatus } from './types'

type BlockDescriptionProps = {
  value?: string
  onSubmit?: (arg0: { description: string }) => void
  status: BlockStatus
}

export default function BlockDescription({
  value = '',
  onSubmit,
  status,
}: BlockDescriptionProps) {
  const [description, setDescription] = useState(value)
  const isEditing = status === 'EDIT'
  const isShowing = isEditing || value !== ''

  /**
   * The value serves as both the initial value
   * and the server state that needs to be synchronized.
   */
  useEffect(() => {
    setDescription(value)
  }, [value])

  return (
    isShowing && (
      <BlockTextEditor
        value={description}
        setValue={setDescription}
        variant={'description'}
        placeholder={'Description (optional)'}
        onBlur={() =>
          value !== description && onSubmit && onSubmit({ description })
        }
        disabled={!isEditing}
      />
    )
  )
}
