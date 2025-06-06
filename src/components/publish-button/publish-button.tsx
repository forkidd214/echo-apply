'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { useFormRead, useFormUpdate } from '@/lib/use-form'
import { Loader2 } from 'lucide-react'
import { useFormIdParams } from '@/utils/helpers'

type PublishButtonProps = {}

export default function PublishButton({}: PublishButtonProps) {
  const formId = useFormIdParams()
  const { data: form, isLoading } = useFormRead(formId)
  const { mutate: updateForm } = useFormUpdate()

  const isPublish = form?.status === 'PUBLISH' ? true : false
  const togglePublish = () => {
    updateForm({ id: formId, status: isPublish ? 'EDIT' : 'PUBLISH' })
  }

  return (
    <Button
      variant={'destructive'}
      className={cn(
        !isPublish &&
          'bg-accent-foreground text-accent hover:bg-accent-foreground/90',
        isLoading && 'opacity-10',
      )}
      onClick={togglePublish}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : isPublish ? (
        'Unpublish'
      ) : (
        'Publish'
      )}
    </Button>
  )
}
