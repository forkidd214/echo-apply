import { ReactNode } from 'react'
import { Trash, X } from 'lucide-react'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { BlockStatus } from '@/components/block-common'
import { cn } from '@/utils/cn'

type BlockCardProps = {
  onOpen?: Function
  onDelete?: Function
  renderBlock: ({ status }: { status: BlockStatus }) => ReactNode
  children?: ReactNode
}

export default function BlockCard({
  onOpen,
  onDelete,
  renderBlock,
}: BlockCardProps) {
  return (
    <Card>
      <CardContent className="flex p-6">
        <Drawer onOpenChange={(isOpen) => isOpen && onOpen && onOpen()}>
          <DrawerTrigger
            asChild // otherwhise illegal <button><button/></button>
            className={cn(
              '-m-6 flex-1 p-6 text-left hover:cursor-pointer',
              'relative after:absolute after:inset-0 after:bg-transparent',
            )}
          >
            <div>{renderBlock && renderBlock({ status: 'PREVIEW' })}</div>
          </DrawerTrigger>
          <DrawerContent className="h-5/6">
            <div className="relative h-full">
              <DrawerClose asChild className="absolute right-10 top-4">
                <Button variant="secondary" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>

              {renderBlock && renderBlock({ status: 'EDIT' })}
            </div>
          </DrawerContent>
        </Drawer>
      </CardContent>

      <CardFooter className="flex justify-end rounded-b-lg bg-muted px-2 py-1">
        <Button
          variant="ghost"
          className="hover:bg-destructive hover:text-destructive-foreground [&>svg]:hover:opacity-100"
          onClick={() => onDelete && onDelete()}
        >
          <Trash className="mr-2 h-4 w-4 fill-current opacity-70" />
          <span>Delete</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
