import { ComponentPropsWithRef } from 'react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

interface DeleteChoiceButton extends ComponentPropsWithRef<typeof Button> {
  isHidden?: boolean
}

export default function DeleteChoiceButton({
  isHidden = false,
  onClick,
  ...props
}: DeleteChoiceButton) {
  return (
    <Button
      variant={'secondary'}
      className={cn(
        'absolute right-0 top-1/2 z-10 h-6 w-6 -translate-y-1/2 translate-x-1/2 p-0 hover:bg-destructive/90 hover:text-destructive-foreground',
        isHidden && 'hidden',
      )}
      onClick={(evt) => {
        evt.stopPropagation()
        onClick && onClick(evt)
      }}
      {...props}
    >
      <X className="h-4 w-4" />
    </Button>
  )
}
