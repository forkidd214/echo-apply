import { Button } from '@/components/ui/button'
import React from 'react'

type BlockButtonProps = {
  children?: React.ReactNode
}

export default function BlockButton({ children, ...props }: BlockButtonProps) {
  return (
    <Button asChild {...props}>
      <span>{children}</span>
    </Button>
  )
}
