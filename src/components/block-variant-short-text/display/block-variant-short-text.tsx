'use client'

import { useState } from 'react'

import { BlockStatus, BlockTextEditor } from '@/components/block-common'

type BlockVariantShortTextProps = {
  status: BlockStatus
}

export default function BlockVariantShortText({
  status,
}: BlockVariantShortTextProps) {
  const [value, setValue] = useState('')

  return (
    <BlockTextEditor
      value={value}
      setValue={setValue}
      variant={'answer'}
      placeholder="Type your answer here..."
      disabled={status === 'EDIT'}
      hasNoLineBreak={true}
    />
  )
}
