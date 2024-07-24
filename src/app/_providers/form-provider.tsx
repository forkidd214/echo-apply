'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import { useForm, FormProvider as FormProviderImp } from 'react-hook-form'

const DevTool = dynamic(
  () => import('@hookform/devtools').then((mod) => mod.DevTool),
  { ssr: false },
)

type FormProviderProps = {
  children: React.ReactNode
}

export default function FormProvider({ children }: FormProviderProps) {
  const methods = useForm({ shouldUnregister: true })

  return (
    <FormProviderImp {...methods}>
      {/* pass all methods into the context */}
      {children}
      <DevTool control={methods.control} />
    </FormProviderImp>
  )
}
