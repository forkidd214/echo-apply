'use client'

import { useEffect, useState } from 'react'
import BlockTextEditor from './block-text-editor'
import { BlockStatus } from './types'

type BlockTitleProps = {
  value?: string
  placeholder?: string
  onSubmit?: (arg0: { title: string }) => void
  status: BlockStatus
}

export default function BlockTitle({
  value = '',
  placeholder = 'Your question here',
  onSubmit,
  status,
}: BlockTitleProps) {
  const [title, setTitle] = useState(value)
  const isEditing = status === 'EDIT'

  /**
   * The value serves as both the initial value
   * and the server state that needs to be synchronized.
   */
  useEffect(() => {
    setTitle(value)
  }, [value])

  return (
    <BlockTextEditor
      value={title}
      setValue={setTitle}
      variant={'title'}
      placeholder={isEditing ? placeholder : ''}
      onBlur={() => value !== title && onSubmit && onSubmit({ title })}
      disabled={!isEditing}
    />
  )
}
