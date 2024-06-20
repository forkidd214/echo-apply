import { FileQuestion, Plus } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useBlockTypes } from '@/lib/use-block'
import { cn } from '@/utils/cn'

type AddBlockButtonProps = {
  variant?: 'mobile' | 'desktop'
  onAdd?: Function
}

export default function AddBlockButton({
  onAdd,
  variant = 'mobile',
}: AddBlockButtonProps) {
  const { data: blockTypes } = useBlockTypes()
  const isMobile = variant === 'mobile'

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={'icon'}
          variant={isMobile ? 'default' : 'ghost'}
          className={cn(
            isMobile
              ? 'bg-accent-foreground text-accent hover:bg-accent-foreground/90'
              : 'hover:bg-accent-foreground/10',
          )}
        >
          <Plus strokeWidth={3} className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Question types</DialogTitle>
        </DialogHeader>

        <ul className="space-y-2">
          {blockTypes?.map((bt) => (
            <li key={bt.id}>
              <DialogClose asChild>
                <Button
                  variant={'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => onAdd && onAdd({ block_type_id: bt.id })}
                >
                  <FileQuestion />
                  {bt.name}
                </Button>
              </DialogClose>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

/* const BLOCK_TYPES = [
  'WELCOME',
  'END',
  'SHORT_TEXT',
  'LONG_TEXT',
  'YES_OR_NO',
  'MULTIPLE_CHOICE',
  'CONTACT_INFO',
  'DATE',
] */
