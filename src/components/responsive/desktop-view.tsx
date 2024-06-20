import { cn } from '@/utils/cn'

type DesktopViewProps = {
  className?: string
  children: React.ReactNode
}

export default function DesktopView({ className, children }: DesktopViewProps) {
  return <div className={cn('hidden lg:block', className)}>{children}</div>
}
