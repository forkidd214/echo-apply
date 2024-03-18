'use client'

import { useReducer } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type PublishButtonProps = {}

export default function PublishButton({}: PublishButtonProps) {
  const [isPublished, togglePublish] = useReducer(
    (value: boolean) => !value,
    false,
  )

  return (
    <Button
      variant={'destructive'}
      className={cn(
        !isPublished &&
          'bg-accent-foreground text-accent hover:bg-accent-foreground/90',
      )}
      onClick={togglePublish}
    >
      {isPublished ? 'Unpublish' : 'Publish'}
    </Button>
  )
}
