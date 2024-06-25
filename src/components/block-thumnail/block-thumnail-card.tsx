import React from 'react'

import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { useBlockRead } from '@/lib/use-block'
import useBlockNavigator from '@/components/block/use-block-navigator'
import { cn } from '@/utils/cn'

type BlockThumnailCardProps = {
  block: NonNullable<(ReturnType<typeof useBlockRead>)['data']>
  className?: string
}

export default React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & BlockThumnailCardProps
>(function BlockThumnailCard({ block, className }, ref) {
  // const { data: block } = useBlockRead(id)
  const { updateActiveBlockId } = useBlockNavigator()

  // if (!block) return null

  return (
    <Card
      ref={ref}
      className={cn(className)}
      onClick={() => updateActiveBlockId(block.id)}
    >
      <CardHeader>
        <CardDescription>
          <span>{block.index}</span>
          <span> . </span>
          <span>{block.title}</span>
        </CardDescription>
      </CardHeader>
    </Card>
  )
})
