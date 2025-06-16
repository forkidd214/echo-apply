import BackButton from '@/components/back-button'
import FormNav from '@/components/form-nav'
import FormTitleInput from '@/components/form-title-input'
import PublishButton from '@/components/publish-button'
import CopyLinkButton from '@/components/copy-link-button'
import { cn } from '@/utils/cn'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

type FormLayoutProps = {
  children: React.ReactNode
}

export default async function FormLayout({ children }: FormLayoutProps) {
  const supabase = createClient()
  const { data: user } = await supabase.from('users').select('*').single()

  if (!user) return redirect('/login')

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
          <CopyLinkButton />
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
      <main className="-mx-2 flex min-h-0 flex-grow flex-col">{children}</main>
    </div>
  )
}
