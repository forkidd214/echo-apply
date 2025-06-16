'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ZodError, z } from 'zod'
import { createClient } from '@/utils/supabase/server'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters'),
})

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const validatedData = await loginSchema
    .parseAsync(data)
    .catch((error: ZodError) => {
      redirect(`/login?error=${encodeURIComponent(error.errors[0].message)}`)
    })

  const { error } = await supabase.auth.signInWithPassword(validatedData)

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/')
  redirect('/workspace')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const validatedData = await loginSchema
    .parseAsync(data)
    .catch((error: ZodError) => {
      redirect(`/login?error=${encodeURIComponent(error.errors[0].message)}`)
    })

  const { error } = await supabase.auth.signUp(validatedData)

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/')
  redirect('/login/success')
}
