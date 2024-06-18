'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

import BlockCard from '@/components/block-card'
import Block from '@/components/block'
import AddBlockButton from '@/components/add-block-button'
import {
  useBlockList,
  useBlockCreate,
  useBlockUpdate,
  useBlockDelete,
} from '@/lib/use-block'
import useBlockNavigator from '@/components/block/use-block-navigator'

export default function Page() {
  const { slug } = useParams()
  const formId = typeof slug === 'string' ? slug : slug[0]

  const { data: blocks } = useBlockList(formId)
  const { mutate: createBlock } = useBlockCreate()
  const { mutate: updateBlock } = useBlockUpdate()
  const { mutate: deleteBlock } = useBlockDelete()

  const { openBlock } = useBlockNavigator()

  const handleBlockAdd = (newBlock: Parameters<typeof createBlock>[0]) => {
    createBlock({ ...newBlock, form_id: formId })
  }

  /**
   * inject block index into server
   */
  useEffect(() => {
    blocks?.forEach((b, i) => updateBlock({ id: b.id, index: i + 1 }))
  }, [blocks, updateBlock])

  return (
    <div className="relative h-full bg-muted">
      <div className="h-full min-h-0 space-y-4 overflow-y-auto p-2">
        <p>Content</p>
        {blocks?.map(({ id }) => {
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
        <AddBlockButton onAdd={handleBlockAdd} />
      </div>
    </div>
  )
}
