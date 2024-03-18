import BlockInputText from '@/components/block-input-text'
import BlockInputMultipleChoice from '@/components/block-input-multiple-choice'
import { useBlockRead } from '@/lib/use-block'
import { BlockStatus } from '@/components/block-common'

import BlockWrapper from './block-wrapper'

type BlockProps = {
  id: string
  status: BlockStatus
  onNext?: () => void
}

export default function Block({ id, status, onNext }: BlockProps) {
  const { data: block } = useBlockRead(id)

  let blockInputFields

  switch (block.type) {
    case 'SHORT_TEXT':
      blockInputFields = <BlockInputText status={status} />
      break

    case 'MULTIPLE_CHOICE':
      blockInputFields = <BlockInputMultipleChoice id={id} status={status} />
      break

    default:
      blockInputFields = `Block type ${block.type} is under construction`
      break
  }

  return (
    <BlockWrapper id={id} status={status} onNext={onNext}>
      {blockInputFields}
    </BlockWrapper>
  )
}
