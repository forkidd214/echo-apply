import { cn } from '@/utils/cn'

type MobileViewProps = {
  className?: string
  children: React.ReactNode
}

export default function MobileView({ className, children }: MobileViewProps) {
  return <div className={cn('block lg:hidden', className)}>{children}</div>
}
