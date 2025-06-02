'use client'

import React from 'react'
import {
  useForm,
  useFormContext,
  FormProvider as FormProviderImp,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import dynamic from 'next/dynamic'
const DevTool = dynamic(
  () => import('@hookform/devtools').then((mod) => mod.DevTool),
  { ssr: false },
)

import { useParams } from 'next/navigation'
import { useBlockList } from '@/lib/use-block'
import { makeBlockSchema as makeShortTextSchema } from '@/components/block-variant-short-text'
import { makeBlockSchema as makeMultipleChoiceSchema } from '@/components/block-variant-multiple-choice'

/**
 * Map of block types to their corresponding schema generation functions.
 * Each function takes the attributes of a block and returns a Zod schema.
 */
const schemaFactoriesByType: {
  [blockType: string]: (attributes: any) => z.ZodSchema | z.ZodVoid
} = {
  SHORT_TEXT: makeShortTextSchema,
  MULTIPLE_CHOICE: makeMultipleChoiceSchema,
}

/**
 * Map of block types to their corresponding default values.
 */
const defaultValuesByType: { [blockType: string]: any } = {
  SHORT_TEXT: '',
  MULTIPLE_CHOICE: [],
}

/**
 * Custom hook to generate a Zod schema for a form based on the block data.
 *
 * @returns A Zod object schema representing the form structure.
 */
const useFormSchema = () => {
  const { slug } = useParams()
  const formId = typeof slug === 'string' ? slug : slug[0]
  const { data } = useBlockList(formId)
  const blocks = data ?? []

  let defaultValues = {}
  let schema = {}
  // Iterate through each block to build the schema and default values
  for (const { id, type, attributes } of blocks) {
    schema = { ...schema, [id]: schemaFactoriesByType[type](attributes) }
    defaultValues = { ...defaultValues, [id]: defaultValuesByType[type] }
  }

  const formSchema = z.object({ ...schema })

  return { formSchema, defaultValues }
}

/**
 * form provider
 */
type FormProviderProps = {
  children: React.ReactNode
}

function FormProvider({ children }: FormProviderProps) {
  const { formSchema, defaultValues } = useFormSchema()

  const methods = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  return (
    <FormProviderImp {...methods}>
      {/* pass all methods into the context */}
      {children}
      <DevTool control={methods.control} />
    </FormProviderImp>
  )
}

export { FormProvider, useFormContext }
