import { ChevronLeft } from 'lucide-react'
import Link, { LinkProps } from 'next/link'

import { Button } from '@/components/ui/button'

type BackButtonProps = {
  href: LinkProps['href']
}

export default function BackButton({ href }: BackButtonProps) {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href={href}>
        <ChevronLeft className="h-4 w-4" />
      </Link>
    </Button>
  )
}
