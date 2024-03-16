import { ComponentProps } from 'react'

import {
  BlockCounter,
  BlockTitle,
  BlockDescription,
  BlockButton,
  BlockStatus,
} from '@/components/block-common'
import { useBlock, useBlockRead } from '@/lib/use-block'

type BlockWrapperProps = {
  id: string
  status: BlockStatus
  children?: React.ReactNode
}

export default function BlockWrapper({
  id,
  status,
  children,
}: BlockWrapperProps) {
  const { updateBlock } = useBlock()
  const { data: block } = useBlockRead(id)

  const handleSubmit = (patch: Partial<typeof block>) =>
    updateBlock({ id: block.id, ...patch })

  return (
    <div className="flex h-full w-full flex-col px-10">
      <section className="relative my-auto">
        <CounterWrapper>
          <BlockCounter value={block.index} />
        </CounterWrapper>
        <div className="space-y-8 ">
          <HeaderWrapper>
            <BlockTitle
              value={block.title}
              onSubmit={handleSubmit}
              status={status}
            />
            <BlockDescription
              value={block.description}
              onSubmit={handleSubmit}
              status={status}
            />
          </HeaderWrapper>
          <InputWrapper>{children}</InputWrapper>
          <ButtonWrapper>
            <BlockButton>OK</BlockButton>
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
