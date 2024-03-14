import { Trash, X } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { useBlockRead } from '@/lib/use-block'

type BlockCardProps = {
  id?: string
  onDelete?: Function
  renderBlock?: Function
}

export default function BlockCard({
  id,
  onDelete,
  renderBlock,
}: BlockCardProps) {
  // const { data: block } = useBlockRead({ id })

  return (
    <Card>
      <CardContent className="flex bg-card p-6">
        <Drawer>
          <DrawerTrigger
            asChild // otherwhise illegal <button><button/></button>
            className={cn(
              '-m-6 flex-1 p-6 text-left hover:cursor-pointer',
              'relative after:absolute after:inset-0 after:bg-transparent',
            )}
          >
            <div>{renderBlock && renderBlock()}</div>
          </DrawerTrigger>
          <DrawerContent className="h-5/6">
            <div className="relative h-full">
              <DrawerClose asChild className="absolute right-10 top-4">
                <Button variant="secondary" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>

              {renderBlock && renderBlock()}
            </div>
          </DrawerContent>
        </Drawer>
      </CardContent>

      <CardFooter className="flex justify-end bg-muted px-2 py-1">
        <Button
          variant="ghost"
          className="hover:bg-destructive hover:text-destructive-foreground [&>svg]:hover:opacity-100"
          onClick={() => onDelete && onDelete(id)}
        >
          <Trash className="mr-2 h-4 w-4 fill-current opacity-70" />
          <span>Delete</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
