import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

type BackButtonProps = {}

export default function BackButton({}: BackButtonProps) {
  return (
    <Button variant="ghost" size="icon">
      <ChevronLeft className="h-4 w-4" />
    </Button>
  )
}
