import { BlockInputText } from '../block-input'
import BlockWrapper from './block-wrapper'

type BlockType =
  | 'WELCOM'
  | 'END'
  | 'SHORT_TEXT'
  | 'LONG_TEXT'
  | 'YES_OR_NO'
  | 'MULTIPLE_CHOICE'
  | 'CONTACT_INFO'
  | 'DATE'

type BlockTextProps = {
  type: BlockType
}

export default function Block({ type }: BlockTextProps) {
  const blockInputFields =
    type === 'SHORT_TEXT' ? (
      <BlockInputText />
    ) : (
      `Block type ${type} is under construction`
    )

  return <BlockWrapper>{blockInputFields}</BlockWrapper>
}
