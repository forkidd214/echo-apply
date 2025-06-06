import {
  BlockTitle,
  BlockDescription,
  BlockButton,
  BlockStatus,
} from '@/components/block-common'
import { useFormRead, useFormUpdate } from '@/lib/use-form'

type FormEndProps = {
  id: string
  status: BlockStatus
  disabled?: boolean
}

export default function FormEnd({ id, status, disabled }: FormEndProps) {
  const { data: formData } = useFormRead(id)
  const { mutate: updateForm } = useFormUpdate()
  const formEndBlock = formData?.form_end_block

  if (!formData) return null

  const handleAttributesChange = (patch: Partial<typeof formEndBlock>) =>
    updateForm({
      id,
      form_end_block: { ...formEndBlock, ...patch },
    })

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col px-10">
      <section className="relative my-auto">
        <div className="space-y-8 text-center">
          <div className="space-y-2">
            <BlockTitle
              value={formEndBlock?.title ?? ''}
              placeholder={'Say bye!'}
              onSubmit={handleAttributesChange}
              status={status}
            />
            <BlockDescription
              value={formEndBlock?.description ?? ''}
              onSubmit={handleAttributesChange}
              status={status}
            />
          </div>
          <div>
            <BlockButton
              status={status}
              type={status === 'PUBLISH' ? 'submit' : 'button'}
              disabled={disabled}
            >
              {formEndBlock?.submitButtonText ?? 'Submit'}
            </BlockButton>
          </div>
        </div>
      </section>
    </div>
  )
}
