import { BlockVariantMultipleChoice } from '@/components/block-variant-multiple-choice'
import { BlockVariantShortText } from '@/components/block-variant-short-text'
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

  if (!block) return null

  let variant

  switch (block.type) {
    case 'SHORT_TEXT':
      variant = <BlockVariantShortText status={status} />
      break

    case 'MULTIPLE_CHOICE':
      variant = <BlockVariantMultipleChoice id={id} status={status} />
      break

    default:
      variant = `Block type ${block.type} is under construction`
      break
  }

  return (
    <BlockWrapper id={id} status={status} onNext={onNext}>
      {variant}
    </BlockWrapper>
  )
}
