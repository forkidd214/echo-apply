import { useState, useEffect, useCallback, ReactNode, useRef } from 'react'

import { type CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Progress } from '@/components/ui/progress'

type BlockCarouselProps = {
  blocks: any[]
  renderBlock: (
    id: string,
    opts: {
      scrollNext?: () => void
    },
  ) => ReactNode
  renderFormEnd?: () => ReactNode
}

export default function BlockCarousel({
  blocks,
  renderBlock,
  renderFormEnd,
}: BlockCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!api) return

    const handleSelect = (api: NonNullable<CarouselApi>) => {
      const percent =
        api.selectedScrollSnap() / (api.scrollSnapList().length - 1)
      setProgress(percent * 100)
    }

    api.on('select', handleSelect)
  }, [api])

  return (
    <Carousel
      opts={{
        watchDrag: (_, evt: any) => {
          if (
            !evt.target.isContentEditable &&
            evt.target.tagName === ('DIV' || 'SECTION')
          ) {
            return true
          } else {
            return false
          }
        }, // set to false if disable drag and wheel
      }}
      orientation="vertical"
      className="h-full w-full"
      setApi={setApi}
    >
      <Progress
        value={progress}
        className="absolute top-0 w-full rounded-none"
      />
      <CarouselContent className="h-full">
        {blocks.map((block) => (
          <CarouselItem key={block.id}>
            {renderBlock(block.id, {
              scrollNext: api?.scrollNext,
            })}
          </CarouselItem>
        ))}
        {renderFormEnd && <CarouselItem>{renderFormEnd()}</CarouselItem>}
      </CarouselContent>
      <CarouselPrevious
        type="button"
        variant="default"
        className="bottom-4 left-4 top-[revert] translate-x-[revert] rounded rounded-t-none"
      />
      <CarouselNext
        type="button"
        variant="default"
        className="insect-0 bottom-4 left-12 translate-x-[1px] rounded rounded-b-none"
      />
    </Carousel>
  )
}
