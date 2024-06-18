'use client'

import { useParams } from 'next/navigation'

import Block from '@/components/block'
import BlockCarousel from '@/components/block-carousel'
import { useBlockList } from '@/lib/use-block'

export default function Page() {
  const { slug } = useParams()
  const formId = typeof slug === 'string' ? slug : slug[0]
  const { data: blocks } = useBlockList(formId)

  return (
    <BlockCarousel
      blocks={blocks ?? []}
      renderBlock={(id: string, { scrollNext }) => (
        <Block id={id} status={'PUBLISH'} onNext={scrollNext} />
      )}
    />
  )
}
