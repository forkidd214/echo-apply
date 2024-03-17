'use client'

import BlockCard from '@/components/block-card'
import Block from '@/components/block'
import AddBlockButton from '@/components/add-block-button'
import { useBlock } from '@/lib/use-block'
import { useEffect } from 'react'
import useBlockNavigator from '@/components/block/use-block-navigator'

export default function Page() {
  const { blocks, createBlock, updateBlock, deleteBlock } = useBlock()
  const {openBlock} = useBlockNavigator()

  /**
   * inject block index into server
   */
  useEffect(() => {
    blocks.forEach((b, i) => updateBlock({ id: b.id, index: i + 1 }))
  }, [blocks, updateBlock])

  return (
    <div className="relative h-full bg-muted">
      <div className="h-full min-h-0 space-y-4 overflow-y-auto p-2">
        <p>Content</p>
        {blocks.map(({ id }) => {
          return (
            <div key={id}>
              <BlockCard
                onOpen={() => openBlock(id)}
                onDelete={() => deleteBlock(id)}
                renderBlock={({ status }) => <Block id={id} status={status} />}
              />
            </div>
          )
        })}
        <p>End</p>
      </div>
      <div className="absolute bottom-4 right-4">
        <AddBlockButton onAdd={createBlock} />
      </div>
    </div>
  )
}
