import { MoreHorizontal } from 'lucide-react'

import { Button, ButtonProps } from '@/components/ui/button'

interface OptionButtonProps extends ButtonProps {}

export default function OptionButton({ ...props }: OptionButtonProps) {
  return (
    <Button size="icon" variant="secondary" {...props}>
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  )
}
