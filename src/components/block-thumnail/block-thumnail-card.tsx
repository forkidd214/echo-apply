import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { useBlockDelete, useBlockRead } from '@/lib/use-block'
import useBlockNavigator from '@/components/block/use-block-navigator'
import { cn } from '@/utils/cn'
import OptionButton from '../option-button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

type BlockThumnailCardProps = {
  block: NonNullable<ReturnType<typeof useBlockRead>['data']>
  className?: string
}

export default React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & BlockThumnailCardProps
>(function BlockThumnailCard({ block, className }, ref) {
  const { currentBlockId, updateActiveBlockId } = useBlockNavigator()
  const { mutate: deleteBlock } = useBlockDelete()

  const isCurrent = currentBlockId === block.id

  return (
    <Card
      ref={ref}
      className={cn('group', isCurrent && 'ring', className)}
      onClick={() => updateActiveBlockId(block.id)}
    >
      <CardContent className="flex items-center justify-between gap-2 p-2 pl-4">
        <CardDescription className="truncate">
          {`${block.index}. ${block.title ?? ''}`}
        </CardDescription>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <OptionButton
              as={'span'}
              variant={'ghost'}
              className="h-9 w-9 flex-shrink-0 rotate-90 opacity-0 group-hover:opacity-100"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right">
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onSelect={() => deleteBlock(block.id)}
              onClick={(evt) => evt.stopPropagation()}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
})
