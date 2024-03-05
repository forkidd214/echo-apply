import { HTMLAttributes } from 'react'
import {
  BlockCounter,
  BlockTitle,
  BlockDescription,
  BlockButton,
} from '@/components/block-common'

type BlockWrapperProps = {
  children?: React.ReactNode
}

export default function BlockWrapper({ children }: BlockWrapperProps) {
  return (
    <div className="flex h-full w-full flex-col px-10">
      <section className="relative my-auto">
        <CounterWrapper>
          <BlockCounter value={1} />
        </CounterWrapper>
        <div className="space-y-8 ">
          <HeaderWrapper>
            <BlockTitle />
            <BlockDescription />
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

const CounterWrapper = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className="absolute -left-7 top-0.5" {...props} />
)

const HeaderWrapper = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className="space-y-2" {...props} />
)

const InputWrapper = (props: HTMLAttributes<HTMLDivElement>) => (
  <div {...props} />
)

const ButtonWrapper = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className="" {...props} />
)
