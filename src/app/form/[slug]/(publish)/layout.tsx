import { cn } from '@/utils/cn'

type FormLayoutProps = {
  children: React.ReactNode
}

export default function PublishLayout({ children }: FormLayoutProps) {
  return (
    <div className={cn('absolute inset-0')}>
      <main className="h-screen">{children}</main>
    </div>
  )
}
