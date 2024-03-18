import { useState, useEffect, useCallback, ReactNode } from 'react'

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
}

export default function BlockCarousel({
  blocks,
  renderBlock,
}: BlockCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [progress, setProgress] = useState(0)

  const onScroll = useCallback((api: CarouselApi) => {
    const percent = Math.max(0, Math.min(1, api?.scrollProgress() ?? 0))
    setProgress(percent * 100)
  }, [])

  useEffect(() => {
    if (!api) return

    onScroll(api)
    api.on('reInit', onScroll)
    api.on('scroll', onScroll)
  }, [api, onScroll])

  return (
    <Carousel
      opts={{
        watchDrag: true, // set to false if disable drag and wheel
      }}
      orientation="vertical"
      className="h-screen w-full"
      setApi={setApi}
    >
      <Progress
        value={progress}
        className="absolute top-0 w-full rounded-none"
      />
      <CarouselContent className="h-screen">
        {blocks.map((block) => (
          <CarouselItem key={block.id}>
            {renderBlock(block.id, {
              scrollNext: api?.scrollNext,
            })}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant="default"
        className="bottom-4 left-4 top-[revert] translate-x-[revert] rounded rounded-t-none"
      />
      <CarouselNext
        variant="default"
        className="insect-0 bottom-4 left-12 translate-x-[1px] rounded rounded-b-none"
      />
    </Carousel>
  )
}
