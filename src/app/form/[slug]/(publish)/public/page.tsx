'use client'

import Block from '@/components/block'
import BlockCarousel from '@/components/block-carousel'
import { useBlock } from '@/lib/use-block'

export default function Page() {
  const { blocks } = useBlock()

  return (
    <BlockCarousel
      blocks={blocks}
      renderBlock={(id: string, { scrollNext }) => (
        <Block id={id} status={'PUBLISH'} onNext={scrollNext} />
      )}
    />
  )
}
