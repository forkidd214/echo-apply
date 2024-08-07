import { useParams } from 'next/navigation'
import AddBlockButton from '@/components/add-block-button'
import Block from '@/components/block'
import BlockCard from '@/components/block-card'
import useBlockNavigator from '@/components/block/use-block-navigator'
import { MobileView } from '@/components/responsive'
import { useBlockDelete, useBlockList } from '@/lib/use-block'
import { FormProvider } from '@/lib/form-context'

export default function FormCreateMobilePage() {
  // get form ID from slug
  const { slug } = useParams()
  const formId = typeof slug === 'string' ? slug : slug[0]

  // block hooks
  const { data: blocks } = useBlockList(formId)
  const { mutate: deleteBlock } = useBlockDelete()
  const { updateActiveBlockId } = useBlockNavigator()

  return (
    <MobileView>
      <div className="relative h-full bg-muted">
        <div className="h-full min-h-0 space-y-4 overflow-y-auto p-2">
          <FormProvider>
            <p>Content</p>
            {blocks?.map(({ id }) => {
              return (
                <div key={id}>
                  <BlockCard
                    onOpen={() => updateActiveBlockId(id)}
                    onDelete={() => deleteBlock(id)}
                    renderBlock={({ status }) => (
                      <Block id={id} status={status} />
                    )}
                  />
                </div>
              )
            })}
            <p>End</p>
          </FormProvider>
        </div>
        <div className="absolute bottom-4 right-4">
          <AddBlockButton />
        </div>
      </div>
    </MobileView>
  )
}
