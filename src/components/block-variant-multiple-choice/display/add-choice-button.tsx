import { MouseEventHandler } from 'react'

import { Button } from '@/components/ui/button'

type AddChoiceButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function AddChoiceButton({ onClick }: AddChoiceButtonProps) {
  return (
    <Button
      variant={'link'}
      className="w-fit underline hover:opacity-70"
      onClick={onClick}
    >
      Add choice
    </Button>
  )
}
