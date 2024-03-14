'use client'

import BlockCard from '@/components/block-card'
import Block from '@/components/block'
import AddBlockButton from '@/components/add-block-button'
import { useBlock } from '@/lib/use-block'

export default function Page() {
  const { blocks, createBlock, deleteBlock } = useBlock()

  return (
    <div className="relative h-full bg-muted">
      <div className="h-full min-h-0 space-y-4 overflow-y-auto p-2">
        <p>Content</p>
        {blocks.map(({ id, type }, index) => (
          <div key={id}>
            <BlockCard
              id={id}
              onDelete={deleteBlock}
              renderBlock={() => <Block type={type as any} />}
            />
          </div>
        ))}
        <p>End</p>
      </div>
      <div className="absolute bottom-4 right-4">
        <AddBlockButton onAdd={createBlock} />
      </div>
    </div>
  )
}
