import { Play } from 'lucide-react'

import { useBlockList } from '@/lib/use-block'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import BlockCanvas from '@/components/block-canvas'
import Block from '@/components/block'
import BlockCarousel from '@/components/block-carousel'
import { FormProvider } from '@/lib/form-context'
import FormEnd from '@/components/form-end'
import { useFormIdParams } from '@/utils/helpers'

type FormPreviewButtonProps = {
  isMobile?: boolean
}

export default function FormPreviewButton({
  isMobile = true,
}: FormPreviewButtonProps) {
  const formId = useFormIdParams()
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
        <FormProvider>
          <BlockCanvas isMobile={isMobile}>
            <BlockCarousel
              blocks={blocks ?? []}
              renderBlock={(id: string, { scrollNext }) => (
                <Block id={id} status={'PREVIEW'} onNext={scrollNext} />
              )}
              renderFormEnd={() => <FormEnd id={formId} status={'PREVIEW'} />}
            />
          </BlockCanvas>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
