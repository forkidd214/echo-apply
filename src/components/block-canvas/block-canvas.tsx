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
    <div
      className={cn(
        'grid p-6',
        isMobile
          ? 'items-stretch justify-center [&>div]:aspect-[9/19.5]'
          : 'items-center justify-stretch  [&>div]:aspect-[16/9]',
      )}
    >
      <div className="border shadow-[0px_0px_6px_-1px_rgb(0,0,0,0.1),0_0px_4px_-2px_rgb(0,0,0,0.1)]">
        {children}
      </div>
    </div>
  )
}
