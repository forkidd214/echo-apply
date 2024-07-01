'use client'

import { useParams } from 'next/navigation'

import Block from '@/components/block'
import BlockCarousel from '@/components/block-carousel'
import { useBlockList } from '@/lib/use-block'
import { useFormRead } from '@/lib/use-form'

export default function Page() {
  const { slug } = useParams()
  const formId = typeof slug === 'string' ? slug : slug[0]
  const { data: form, isFetched, isLoading } = useFormRead(formId)
  const { data: blocks } = useBlockList(formId)

  if (isFetched && !form) {
    return <div>No access</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <BlockCarousel
      blocks={blocks ?? []}
      renderBlock={(id: string, { scrollNext }) => (
        <Block id={id} status={'PUBLISH'} onNext={scrollNext} />
      )}
    />
  )
}
