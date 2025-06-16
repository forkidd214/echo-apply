'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export default function AccountForm({ user }: { user: User }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error, status } = await supabase
        .from('users')
        .select(`full_name`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
      }
    } catch (error) {
      setError('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({ fullname }: { fullname: string | null }) {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      const { error } = await supabase
        .from('users')
        .update({
          full_name: fullname,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()

      if (error) throw error
      setSuccess('Profile updated successfully!')
    } catch (error) {
      setError('Error updating profile!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <form className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            value={user.email}
            disabled
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            )}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter your full name"
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            )}
          />
        </div>

        {error && (
          <div className="bg-destructive/15 rounded-md p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/15 rounded-md p-3 text-sm text-green-500">
            {success}
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <Button
            onClick={() => updateProfile({ fullname })}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Loading...' : 'Update Profile'}
          </Button>
        </div>
      </form>
      <form action="/auth/logout" method="post">
        <Button type="submit" variant="secondary" className="w-full">
          Log out
        </Button>
      </form>
    </div>
  )
}
