import { MouseEventHandler } from 'react'

import { Button } from '@/components/ui/button'

type AddChoiceButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function AddChoceButton({ onClick }: AddChoiceButtonProps) {
  return (
    <Button
      variant={'link'}
      className="underline hover:opacity-70"
      onClick={onClick}
    >
      Add choice
    </Button>
  )
}
