'use client'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

export default function CreateFormButton() {
  const supabase = createClient()

  async function createForm({ name }: { name: string | null }) {
    try {
      const { error } = await supabase.from('forms').insert({
        name,
      })

      if (error) throw error
      console.log('createForm')
    } catch (error) {
      console.log('Error createForm!')
    } finally {
      console.log('complete createForm')
    }
  }

  return (
    <Button
      className="bg-accent-foreground text-accent hover:bg-accent-foreground/90"
      onClick={() => createForm({ name: 'My new form' })}
    >
      Create new form
    </Button>
  )
}
