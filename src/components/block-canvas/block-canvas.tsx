import { cn } from '@/utils/cn'

type BlockCanvasProps = {
  isMobile?: boolean
  children: React.ReactNode
}

export default function BlockCanvas({
  isMobile = true,
  children,
}: BlockCanvasProps) {
  return (
    <div className={cn('flex h-full w-full items-center justify-center p-6 ')}>
      <div
        className={cn(
          'border shadow-[0px_0px_6px_-1px_rgb(0,0,0,0.1),0_0px_4px_-2px_rgb(0,0,0,0.1)]',
          isMobile
            ? 'aspect-[2/3] h-full max-h-[600px]'
            : 'aspect-[16/9] w-full max-w-[1024px]',
        )}
      >
        {children}
      </div>
    </div>
  )
}
