'use client'

import { notFound } from 'next/navigation'
import Block from '@/components/block'
import BlockCarousel from '@/components/block-carousel'
import { useFormRead } from '@/lib/use-form'
import { FormProvider, useFormContext } from '@/lib/form-context'
import { useResponseCreate } from '@/lib/use-response'
import FormEnd from '@/components/form-end'
import { useFormIdParams } from '@/utils/helpers'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { useBlockList } from '@/lib/use-block'

export default function Page() {
  return (
    <div className="absolute inset-0">
      <main className="h-screen">
        <FormProvider>
          <Form />
        </FormProvider>
      </main>
    </div>
  )
}

function Form() {
  const formId = useFormIdParams()
  const { data: formData, isFetched, isLoading } = useFormRead(formId)
  const { data: blocks } = useBlockList(formId)

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useFormContext()

  const { mutate: createResponse } = useResponseCreate()

  const onSubmit = (data: { [blockId: string]: string | string[] }) => {
    createResponse({
      p_form_id: formId,
      p_answers: Object.entries(data).map(([blockId, value]) => ({
        block_id: blockId,
        value,
      })),
    })
  }

  if (isFetched && !formData) {
    notFound()
  }

  if (isLoading) return null

  return (
    <Dialog open={isSubmitted}>
      <form
        onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
        className="relative h-screen"
      >
        <BlockCarousel
          blocks={blocks ?? []}
          renderBlock={(id: string, { scrollNext }) => (
            <Block id={id} status={'PUBLISH'} onNext={scrollNext} />
          )}
          renderFormEnd={() => (
            <FormEnd
              id={formId}
              status={'PUBLISH'}
              disabled={isSubmitting || isSubmitted}
            />
          )}
        />
      </form>
      <DialogContent className="flex h-screen w-screen max-w-none items-center justify-center [&>[data-close=true]]:hidden">
        <h1 className="text-2xl">Thank you</h1>
      </DialogContent>
    </Dialog>
  )
}
