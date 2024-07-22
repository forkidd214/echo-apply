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
  const { control } = useFormContext()

  return (
    <Controller
      name={id}
      defaultValue={''}
      control={control}
      shouldUnregister
      render={({ field, fieldState }) => (
        <>
          <BlockTextEditor
            variant={'answer'}
            placeholder="Type your answer here..."
            hasNoLineBreak={true}
            disabled={status === 'EDIT'}
            {...field}
          />
          {fieldState.error && (
            <BlockMessage>{fieldState.error.message}</BlockMessage>
          )}
        </>
      )}
    />
  )
}
