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
import { useBlockCreate, useBlockList, useBlockTypes } from '@/lib/use-block'
import { cn } from '@/utils/cn'
import { useParams } from 'next/navigation'

type AddBlockButtonProps = {
  variant?: 'mobile' | 'desktop'
  onAdd?: Function
}

export default function AddBlockButton({
  onAdd,
  variant = 'mobile',
}: AddBlockButtonProps) {
  // get form ID from slug
  const { slug } = useParams()
  const formId = typeof slug === 'string' ? slug : slug[0]

  // block hooks
  const { data: blocks } = useBlockList(formId)
  const { mutate: createBlock } = useBlockCreate()
  const { data: blockTypes } = useBlockTypes()

  const isMobile = variant === 'mobile'

  const handleBlockAdd = (blockTypeId: string) => {
    const newBlock = {
      form_id: formId,
      block_type_id: blockTypeId,
      index: 1 + (blocks?.length ?? 0),
    }

    createBlock(newBlock)

    onAdd && onAdd(newBlock)
  }

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
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent onCloseAutoFocus={(evt) => evt.preventDefault()}>
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
                  onClick={() => handleBlockAdd(bt.id)}
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
