'use client'

import { Controller, useFormContext } from 'react-hook-form'

import {
  BlockMessage,
  BlockStatus,
  BlockTextEditor,
} from '@/components/block-common'
import React from 'react'

type BlockVariantShortTextProps = {
  id: string
  status: BlockStatus
}

export default function BlockVariantShortText({
  id,
  status,
}: BlockVariantShortTextProps) {
  const isEditing = status === 'EDIT'
  const { control } = useFormContext()

  const renderShortText = (props?: any) => (
    <BlockTextEditor
      variant={'answer'}
      placeholder="Type your answer here..."
      hasNoLineBreak={true}
      disabled={status === 'EDIT'}
      value={''}
      {...props}
    />
  )

  // render text editor only in editing
  if (isEditing) {
    return renderShortText()
  }

  // otherwise, render form control
  return (
    <Controller
      name={id}
      defaultValue={''}
      control={control}
      render={({ field, fieldState }) => (
        <>
          {renderShortText(field)}
          {fieldState.error && (
            <BlockMessage>{fieldState.error.message}</BlockMessage>
          )}
        </>
      )}
    />
  )
}
