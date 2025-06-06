import { ComponentProps } from 'react'

import {
  BlockCounter,
  BlockTitle,
  BlockDescription,
  BlockButton,
  BlockStatus,
} from '@/components/block-common'
import { useBlockUpdate, useBlockRead } from '@/lib/use-block'
import { useKeyPress } from '@/utils/helpers'

type BlockWrapperProps = {
  id: string
  status: BlockStatus
  children?: React.ReactNode
  onNext?: () => void
}

export default function BlockWrapper({
  id,
  status,
  children,
  onNext,
}: BlockWrapperProps) {
  const { mutate: updateBlock } = useBlockUpdate()
  const { data: block } = useBlockRead(id)
  useKeyPress(['Enter'], onNext ?? (() => {}))

  if (!block) return null

  const handleSubmit = (patch: Partial<typeof block>) =>
    updateBlock({ id: block.id, ...patch })

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col px-10">
      <section className="relative my-auto">
        <CounterWrapper>
          <BlockCounter value={block.index ?? -1} />
        </CounterWrapper>
        <div className="space-y-8">
          <HeaderWrapper>
            <BlockTitle
              value={block.title ?? ''}
              onSubmit={handleSubmit}
              status={status}
            />
            <BlockDescription
              value={block.description ?? ''}
              onSubmit={handleSubmit}
              status={status}
            />
          </HeaderWrapper>
          <InputWrapper>{children}</InputWrapper>
          <ButtonWrapper>
            <BlockButton status={status} onClick={onNext}>
              OK
            </BlockButton>
          </ButtonWrapper>
        </div>
      </section>
    </div>
  )
}

const CounterWrapper = (props: ComponentProps<'div'>) => (
  <div className="absolute -left-7 top-0.5" {...props} />
)

const HeaderWrapper = (props: ComponentProps<'div'>) => (
  <div className="space-y-2" {...props} />
)

const InputWrapper = (props: ComponentProps<'div'>) => <div {...props} />

const ButtonWrapper = (props: ComponentProps<'div'>) => (
  <div className="" {...props} />
)
