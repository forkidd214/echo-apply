import BlockInputText from '@/components/block-input-text'
import BlockInputMultipleChoice from '@/components/block-input-multiple-choice'

import BlockWrapper from './block-wrapper'
import { useBlockRead } from '@/lib/use-block'

type BlockProps = {
  id: string
}

export default function Block({ id }: BlockProps) {
  const { data: block } = useBlockRead(id)

  let blockInputFields

  switch (block.type) {
    case 'SHORT_TEXT':
      blockInputFields = <BlockInputText />
      break

    case 'MULTIPLE_CHOICE':
      blockInputFields = <BlockInputMultipleChoice />
      break

    default:
      blockInputFields = `Block type ${block.type} is under construction`
      break
  }

  return <BlockWrapper id={id}>{blockInputFields}</BlockWrapper>
}
