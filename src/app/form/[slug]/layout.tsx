import BackButton from '@/components/back-button'
import FormNav from '@/components/form-nav'
import FormTitleInput from '@/components/form-title-input'
import OptionButton from '@/components/option-button'
import PublishButton from '@/components/publish-button'
import { cn } from '@/lib/utils'

type FormLayoutProps = {
  children: React.ReactNode
}

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <div className={cn('flex-grow max-h-full flex flex-col px-2')}>
      <header
        className={cn(
          'flex justify-between items-center gap-2 relative mb-10 border-b border-b-secondary min-h-[4rem]',
          'lg:mb-0 lg:min-h-[3rem]'
        )}
      >
        <div className="flex gap-2 order-1">
          <BackButton />
          <FormTitleInput />
        </div>
        <div className="flex gap-2 order-3">
          <PublishButton />
          <OptionButton />
        </div>
        <div
          className={cn('order-2', [
            'absolute w-full bottom-0 translate-y-full',
            ['lg:relative', 'lg:w-[revert]', 'lg:translate-y-[revert]'],
          ])}
        >
          <FormNav />
        </div>
      </header>
      <main className="flex-grow overflow-hidden">{children}</main>
    </div>
  )
}
