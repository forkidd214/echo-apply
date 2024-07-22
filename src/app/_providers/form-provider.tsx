'use client'

import React from 'react'
import { useForm, FormProvider as FormProviderImp } from 'react-hook-form'

type FormProviderProps = {
  children: React.ReactNode
}

export default function FormProvider({ children }: FormProviderProps) {
  const methods = useForm()

  return (
    <FormProviderImp {...methods}>
      {/* pass all methods into the context */}
      {children}
    </FormProviderImp>
  )
}
