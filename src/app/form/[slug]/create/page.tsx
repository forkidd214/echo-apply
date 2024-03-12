'use client'

import { useState } from 'react'

import BlockCard from '@/components/block-card'
import Block from '@/components/block'
import AddBlockButton from '@/components/add-block-button'

export default function Page() {
  const [blocks, setBlocks] = useState(BLOCKS)

  const handleBlockAdd = (blockType: string) =>
    setBlocks([
      ...blocks,
      {
        index: blocks.length + 1,
        id: `block-${blocks.length + 1}`,
        type: blockType,
      },
    ])

  const handleBlockDelete = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id))
  }

  return (
    <div className="relative h-full bg-muted">
      <div className="h-full min-h-0 space-y-4 overflow-y-auto p-2">
        <p>Content</p>
        {blocks.map(({ index, id, type }) => (
          <div key={id}>
            <BlockCard
              id={id}
              onDelete={handleBlockDelete}
              renderBlock={() => <Block type={type as any} />}
            />
          </div>
        ))}
        <p>End</p>
        <BlockCard id={'end-block'} renderBlock={() => <Block type="END" />} />
      </div>
      <div className="absolute bottom-4 right-4">
        <AddBlockButton onAdd={handleBlockAdd} />
      </div>
    </div>
  )
}

const BLOCKS = [
  {
    index: 1,
    id: 'block-1',
    type: 'SHORT_TEXT',
  },
  {
    index: 2,
    id: 'block-2',
    type: 'LONG_TEXT',
  },
  {
    index: 3,
    id: 'block-3',
    type: 'YES_OR_NO',
  },
  {
    index: 4,
    id: 'block-4',
    type: 'MULTIPLE_CHOICE',
  },
  {
    index: 5,
    id: 'block-5',
    type: 'CONTACT_INFO',
  },
  {
    index: 6,
    id: 'block-6',
    type: 'DATE',
  },
]
