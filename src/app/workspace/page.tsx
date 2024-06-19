import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import FormTable from './form-table'
import CreateFormButton from './create-form-button'
import FormCards from './form-cards'

export default async function Page() {
  const supabase = createClient()

  const { data: user } = await supabase.from('users').select('*').single()

  if (!user) return redirect('/login')

  return (
    <div className="flex flex-grow flex-col px-2">
      <header
        className={
          'flex min-h-[4rem] items-center justify-between gap-2 border-b border-b-border'
        }
      >
        <h1>My workspace</h1>
        <div className="space-x-2">
          <CreateFormButton />
          <Button asChild variant={'link'}>
            <Link href={'/account'}>{user?.full_name ?? 'EMPTY NAME'}</Link>
          </Button>
        </div>
      </header>
      <main className="-mx-2 flex-grow bg-muted py-4">
        <div className="container">
          <div className="hidden lg:block">
            <FormTable />
          </div>
          <div className="block lg:hidden">
            <FormCards />
          </div>
        </div>
      </main>
    </div>
  )
}
