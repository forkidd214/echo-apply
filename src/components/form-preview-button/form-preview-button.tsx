import { Play } from 'lucide-react'

import { useParams } from 'next/navigation'
import { useBlockList } from '@/lib/use-block'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import BlockCanvas from '@/components/block-canvas'
import Block from '@/components/block'
import BlockCarousel from '@/components/block-carousel'

type FormPreviewButtonProps = {
  isMobile?: boolean
}

export default function FormPreviewButton({
  isMobile = true,
}: FormPreviewButtonProps) {
  const { slug } = useParams()
  const formId = typeof slug === 'string' ? slug : slug[0]
  const { data: blocks } = useBlockList(formId)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="hover:bg-accent-foreground/10"
        >
          <Play />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="h-screen w-screen max-w-none"
        onCloseAutoFocus={(evt) => evt.preventDefault()}
      >
        <BlockCanvas isMobile={isMobile}>
          <BlockCarousel
            blocks={blocks ?? []}
            renderBlock={(id: string, { scrollNext }) => (
              <Block id={id} status={'PREVIEW'} onNext={scrollNext} />
            )}
          />
        </BlockCanvas>
      </DialogContent>
    </Dialog>
  )
}
