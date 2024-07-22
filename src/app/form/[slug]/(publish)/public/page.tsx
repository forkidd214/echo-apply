'use client'

import { useParams } from 'next/navigation'

import Block from '@/components/block'
import BlockCarousel from '@/components/block-carousel'
import { useBlockList } from '@/lib/use-block'
import { useFormRead } from '@/lib/use-form'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'

export default function Page() {
  const { slug } = useParams()
  const formId = typeof slug === 'string' ? slug : slug[0]
  const { data: form, isFetched, isLoading } = useFormRead(formId)
  const { data: blocks } = useBlockList(formId)

  const { handleSubmit } = useFormContext()

  if (isFetched && !form) {
    return <div>No access</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative h-screen">
      <BlockCarousel
        blocks={blocks ?? []}
        renderBlock={(id: string, { scrollNext }) => (
          <Block id={id} status={'PUBLISH'} onNext={scrollNext} />
        )}
      />
      {/* //! To be deleted, testing only */}
      <Button
        variant={'destructive'}
        type="submit"
        className="absolute bottom-4 left-0 right-0 mx-auto w-fit"
      >
        Testing submit
      </Button>
    </form>
  )
}
