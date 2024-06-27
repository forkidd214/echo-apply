import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return <div>User not found</div>

  return <AccountForm user={user} />
}
