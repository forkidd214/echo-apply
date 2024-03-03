import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'

type OptionButtonProps = {}

export default function OptionButton({}: OptionButtonProps) {
  return (
    <Button size="icon" variant="secondary">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  )
}
