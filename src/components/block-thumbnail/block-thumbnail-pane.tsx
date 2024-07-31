import * as React from 'react'

import { useParams } from 'next/navigation'
import Sortable from '@/components/sortable'
import { useBlockList, useBlockUpdateMany } from '@/lib/use-block'
import BlockThumbnailCard from './block-thumbnail-card'

export default function BlockThumbnailPane() {
  // get form ID from slug
  const { slug } = useParams()
  const formId = typeof slug === 'string' ? slug : slug[0]

  // block data hooks
  const { data: blocks, isSuccess } = useBlockList(formId)
  const { mutate: updateBlockMany } = useBlockUpdateMany()

  // block states for block thumbnail DnD re-order
  const [blockOrder, setBlockOrder] = React.useState(blocks ?? [])
  const [isOrderChange, setIsOrderChange] = React.useState(false)

  // handle DnD event
  const handleItemOrderChange = (newItems: typeof blockOrder) => {
    setBlockOrder(newItems)
    setIsOrderChange(true)
  }

  // update block order state every time block data is refreshed
  React.useEffect(() => {
    if (isSuccess) {
      setBlockOrder(blocks)
    }
  }, [blocks, isSuccess])

  // update block index upon re-order
  React.useEffect(() => {
    if (!isOrderChange) return

    // update block index
    const newBlocks = blockOrder!
      .map((b, i) =>
        b.index !== i + 1
          ? {
              ...b,
              index: i + 1,
            }
          : null,
      )
      .filter((val) => !!val) as typeof blocks

    // update block db
    updateBlockMany(newBlocks!)

    setIsOrderChange(false)
  }, [blockOrder, isOrderChange, updateBlockMany])

  return (
    <Sortable
      items={blockOrder}
      onItemOrderChange={handleItemOrderChange}
      renderItem={(block) => <BlockThumbnailCard block={block} />}
      renderActiveOverlay={(block) => (
        <BlockThumbnailCard
          block={block}
          className={`shadow-[0_16px_16px_rgba(0,0,0,0.25)]`}
        />
      )}
    />
  )
}
