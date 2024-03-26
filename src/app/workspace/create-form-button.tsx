'use client'

import { Button } from '@/components/ui/button'
import { useFormCreate } from '@/lib/use-form'

export default function CreateFormButton() {
  const { mutate: createForm } = useFormCreate()

  return (
    <Button
      className="bg-accent-foreground text-accent hover:bg-accent-foreground/90"
      onClick={() => createForm({ name: 'My new form' })}
    >
      Create new form
    </Button>
  )
}
