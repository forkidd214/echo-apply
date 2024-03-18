import { Button, ButtonProps } from '@/components/ui/button'
import React from 'react'
import { BlockStatus } from './types'

interface BlockButtonProps extends ButtonProps {
  status: BlockStatus
  children?: React.ReactNode
}

export default function BlockButton({
  status,
  children,
  ...props
}: BlockButtonProps) {
  return (
    <Button asChild={status === 'EDIT'} {...props}>
      <span>{children}</span>
    </Button>
  )
}
