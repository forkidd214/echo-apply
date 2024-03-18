import { cn } from '@/lib/utils'

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
