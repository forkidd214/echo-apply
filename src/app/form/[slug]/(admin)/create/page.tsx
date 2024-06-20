'use client'

import { useParams } from 'next/navigation'

import BlockCard from '@/components/block-card'
import Block from '@/components/block'
import AddBlockButton from '@/components/add-block-button'
import useBlockNavigator from '@/components/block/use-block-navigator'
import { DesktopView, MobileView } from '@/components/responsive'
import { Button } from '@/components/ui/button'
import {
  BlockThumnailCard,
  BlockThumnailPane,
} from '@/components/block-thumnail'
import {
  useBlockList,
  useBlockCreate,
  useBlockUpdate,
  useBlockDelete,
} from '@/lib/use-block'
import { cn } from '@/utils/cn'

export default function Page() {
  const { slug } = useParams()
  const formId = typeof slug === 'string' ? slug : slug[0]

  const { data: blocks } = useBlockList(formId)
  const { mutate: createBlock } = useBlockCreate()
  const { mutate: updateBlock } = useBlockUpdate()
  const { mutate: deleteBlock } = useBlockDelete()

  const { updateActiveBlockId } = useBlockNavigator()

  const handleBlockAdd = (newBlock: Parameters<typeof createBlock>[0]) => {
    createBlock({
      ...newBlock,
      form_id: formId,
      index: 1 + (blocks?.length ?? 0),
    })
  }

  return (
    <>
      <MobileView className="h-full">
        <div className="relative h-full bg-muted">
          <div className="h-full min-h-0 space-y-4 overflow-y-auto p-2">
            <p>Content</p>
            {blocks?.map(({ id }) => {
              return (
                <div key={id}>
                  <BlockCard
                    onOpen={() => updateActiveBlockId(id)}
                    onDelete={() => deleteBlock(id)}
                    renderBlock={({ status }) => (
                      <Block id={id} status={status} />
                    )}
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
      </MobileView>
      <DesktopView className="h-full">
        <div className="grid h-full grid-cols-[256px_1fr] grid-rows-[48px_1fr] gap-2 p-2">
          <section className="col-span-2 flex items-center gap-1 rounded-lg bg-secondary p-4 pl-2">
            <AddBlockButton variant="desktop" onAdd={handleBlockAdd} />
            <Button
              variant={'ghost'}
              size={'icon'}
              className="hover:bg-accent-foreground/10"
            >
              🛠️
            </Button>
            <Button
              variant={'ghost'}
              size={'icon'}
              className="hover:bg-accent-foreground/10"
            >
              ▶️
            </Button>
          </section>

          <section className="flex max-h-full flex-col gap-4 overflow-auto rounded-lg bg-secondary p-4">
            <BlockThumnailPane>
              {blocks?.map((block) => {
                return <BlockThumnailCard key={block.id} id={block.id} />
              })}
            </BlockThumnailPane>
          </section>

          <section
            className={cn(
              'grid p-6',
              true
                ? 'items-stretch justify-center [&>div]:aspect-[9/19.5]'
                : 'items-center justify-stretch  [&>div]:aspect-[16/9]',
            )}
          >
            <div className="border shadow-[0px_0px_6px_-1px_rgb(0,0,0,0.1),0_0px_4px_-2px_rgb(0,0,0,0.1)]">
              {!!blocks && blocks.length > 0 ? (
                <Block id={blocks[0].id} status={'EDIT'} />
              ) : null}
            </div>
          </section>
        </div>
      </DesktopView>
    </>
  )
}
