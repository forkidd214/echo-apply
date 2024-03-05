import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type PublishButtonProps = {
  published?: boolean
}

export default function PublishButton({
  published = false,
}: PublishButtonProps) {
  return (
    <Button
      className={cn(
        !published &&
          'bg-accent-foreground text-accent hover:bg-accent-foreground/90',
      )}
    >
      Publish
    </Button>
  )
}
