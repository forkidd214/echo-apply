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
import { BlockType } from '@/components/block-common'

type AddBlockButtonProps = {
  onAdd?: Function
}

export default function AddBlockButton({ onAdd }: AddBlockButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={'icon'}
          className="bg-accent-foreground text-accent hover:bg-accent-foreground/90"
        >
          <Plus strokeWidth={3} className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Question types</DialogTitle>
        </DialogHeader>

        <ul className="space-y-2">
          {BLOCK_TYPES.map((blockType) => (
            <li key={blockType}>
              <DialogClose asChild>
                <Button
                  variant={'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => onAdd && onAdd(blockType)}
                >
                  <FileQuestion />
                  {blockType}
                </Button>
              </DialogClose>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

const BLOCK_TYPES: BlockType[] = [
  'WELCOME',
  'END',
  'SHORT_TEXT',
  'LONG_TEXT',
  'YES_OR_NO',
  'MULTIPLE_CHOICE',
  'CONTACT_INFO',
  'DATE',
]
