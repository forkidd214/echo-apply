import * as React from 'react'
import { Smartphone, Laptop } from 'lucide-react'

import AddBlockButton from '@/components/add-block-button'
import Block from '@/components/block'
import { BlockThumnailPane } from '@/components/block-thumnail'
import useBlockNavigator from '@/components/block/use-block-navigator'
import { DesktopView } from '@/components/responsive'
import { Button } from '@/components/ui/button'
import BlockCanvas from '@/components/block-canvas'
import FormPreviewButton from '@/components/form-preview-button'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

export default function FormCreateDesktopPage() {
  // block selector for the canvas
  const { currentBlockId } = useBlockNavigator()
  const [isMobileCanvas, setIsMobileCanvas] = React.useState(true)

  return (
    <DesktopView className="h-full">
      <div className="grid h-full grid-cols-[256px_1fr] grid-rows-[48px_1fr] gap-2 p-2 pt-0">
        {/* toolbar on top */}
        <section className="col-span-2 flex items-center gap-1 rounded-lg rounded-t-none bg-secondary p-4 pl-2 text-muted-foreground">
          <TooltipProvider delayDuration={100}>
            <ToolbarItem tooltip="Add blcok">
              <AddBlockButton variant="desktop" />
            </ToolbarItem>
            <ToolbarItem
              tooltip={isMobileCanvas ? 'Desktop view' : 'Mobile view'}
            >
              <Button
                variant={'ghost'}
                size={'icon'}
                className="hover:bg-accent-foreground/10"
                onClick={() => setIsMobileCanvas((val) => !val)}
              >
                {isMobileCanvas ? <Laptop /> : <Smartphone />}
              </Button>
            </ToolbarItem>
            <ToolbarItem tooltip="Preview">
              <FormPreviewButton isMobile={isMobileCanvas} />
            </ToolbarItem>
          </TooltipProvider>
        </section>

        {/* sidebar on left */}
        <section className="flex max-h-full flex-col gap-4 overflow-y-auto rounded-lg bg-secondary p-4">
          <BlockThumnailPane />
        </section>

        {/* canvas on center */}
        <BlockCanvas isMobile={isMobileCanvas}>
          {currentBlockId && <Block id={currentBlockId} status={'EDIT'} />}
        </BlockCanvas>
      </div>
    </DesktopView>
  )
}

const ToolbarItem = ({
  children,
  tooltip,
}: {
  children: React.ReactNode
  tooltip: string
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>{children}</span>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}
