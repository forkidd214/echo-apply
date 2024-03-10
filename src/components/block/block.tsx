import type { BlockType } from '@/components/block-common'
import BlockInputText from '@/components/block-input-text'
import BlockInputMultipleChoice from '@/components/block-input-multiple-choice'

import BlockWrapper from './block-wrapper'

type BlockTextProps = {
  type: BlockType
}

export default function Block({ type }: BlockTextProps) {
  const blockInputFields =
    type === 'SHORT_TEXT' ? (
      <BlockInputText />
    ) : type === 'MULTIPLE_CHOICE' ? (
      <BlockInputMultipleChoice />
    ) : (
      `Block type ${type} is under construction`
    )

  return <BlockWrapper>{blockInputFields}</BlockWrapper>
}
