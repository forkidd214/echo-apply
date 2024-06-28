import BackButton from '@/components/back-button'
import FormNav from '@/components/form-nav'
import FormTitleInput from '@/components/form-title-input'
import OptionButton from '@/components/option-button'
import PublishButton from '@/components/publish-button'
import { cn } from '@/utils/cn'

type FormLayoutProps = {
  children: React.ReactNode
}

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <div className={cn('flex max-h-full flex-grow flex-col px-2')}>
      <header
        className={cn(
          'relative mb-9 flex min-h-[4rem] items-center justify-between gap-2 border-b border-b-border',
          'lg:mb-0 lg:min-h-[3rem]',
        )}
      >
        <div className="flex gap-2">
          <BackButton href="/workspace" />
          <FormTitleInput />
        </div>
        <div className="flex gap-2">
          <PublishButton />
          <OptionButton />
        </div>
        <div
          className={cn(
            'absolute bottom-0 w-full translate-y-full',
            'lg:left-1/2 lg:w-[revert] lg:-translate-x-1/2 lg:translate-y-[revert]',
          )}
        >
          <FormNav />
        </div>
      </header>
      <main className="-mx-2 flex-grow overflow-hidden">{children}</main>
    </div>
  )
}
