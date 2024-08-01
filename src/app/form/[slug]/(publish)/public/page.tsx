'use client'

import { useParams } from 'next/navigation'
import Block from '@/components/block'
import BlockCarousel from '@/components/block-carousel'
import { useBlockList } from '@/lib/use-block'
import { useFormRead } from '@/lib/use-form'
import { Button } from '@/components/ui/button'
import { FormProvider, useFormContext } from '@/lib/form-context'

export default function Page() {
  const { slug } = useParams()
  const formId = typeof slug === 'string' ? slug : slug[0]
  const { data: formData, isFetched, isLoading } = useFormRead(formId)
  const { data: blocks } = useBlockList(formId)

  if (isFetched && !formData) {
    return <div>No access</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <FormProvider>
      <Form>
        <BlockCarousel
          blocks={blocks ?? []}
          renderBlock={(id: string, { scrollNext }) => (
            <Block id={id} status={'PUBLISH'} onNext={scrollNext} />
          )}
        />
      </Form>
    </FormProvider>
  )
}

function Form({ children }: { children: React.ReactNode }) {
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
      className="relative h-screen"
    >
      {children}
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
