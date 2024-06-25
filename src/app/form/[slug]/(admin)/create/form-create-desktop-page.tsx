import * as React from 'react'

import AddBlockButton from '@/components/add-block-button'
import Block from '@/components/block'
import { BlockThumnailPane } from '@/components/block-thumnail'
import useBlockNavigator from '@/components/block/use-block-navigator'
import { DesktopView } from '@/components/responsive'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export default function FormCreateDesktopPage() {
  // block selector for the canvas
  const { currentBlockId } = useBlockNavigator()

  return (
    <DesktopView className="h-full">
      <div className="grid h-full grid-cols-[256px_1fr] grid-rows-[48px_1fr] gap-2 p-2">
        {/* toolbar on top */}
        <section className="col-span-2 flex items-center gap-1 rounded-lg bg-secondary p-4 pl-2">
          <AddBlockButton variant="desktop" />
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

        {/* sidebar on left */}
        <section className="flex max-h-full flex-col gap-4 overflow-y-auto rounded-lg bg-secondary p-4">
          <BlockThumnailPane />
        </section>

        {/* canvas on center */}
        <section
          className={cn(
            'grid p-6',
            true
              ? 'items-stretch justify-center [&>div]:aspect-[9/19.5]'
              : 'items-center justify-stretch  [&>div]:aspect-[16/9]',
          )}
        >
          <div className="border shadow-[0px_0px_6px_-1px_rgb(0,0,0,0.1),0_0px_4px_-2px_rgb(0,0,0,0.1)]">
            {currentBlockId && <Block id={currentBlockId} status={'EDIT'} />}
          </div>
        </section>
      </div>
    </DesktopView>
  )
}
