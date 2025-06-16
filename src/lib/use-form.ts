import {
  QueryFunctionContext,
  useQueryClient,
  /**
   * opt out of data fetching on server for now
   * due to nextjs failling feeding cookies to supabase on server
   * fetching authenticaed data on server is somewhat annoying
   * See https://github.com/TanStack/query/issues/6116#issuecomment-1904051005 for details
   */
  useQuery,
  // useSuspenseQuery as useQuery,
  useMutation,
} from '@tanstack/react-query'

import type { Database } from '@/utils/supabase/database.types'
import { createClient } from '@/utils/supabase/client'

type FormsDataType = Database['public']['Tables']['forms']
type FormWithRelations = FormsDataType['Row'] & {
  blocks?: Array<Database['public']['Tables']['blocks']['Row']>
  responses?: Array<
    Database['public']['Tables']['responses']['Row'] & {
      response_answers?: Array<
        Database['public']['Tables']['response_answers']['Row']
      >
    }
  >
}

type FormQueryOptions = {
  withBlocks?: boolean
  withResponses?: boolean
  withResponseAnswers?: boolean
}

const supabase = createClient()

/* ========== keys factory ========== */
const formKeys = {
  all: ['forms'] as const,
  lists: () => [...formKeys.all, 'list'] as const,
  list: (filters: { state?: 'all'; userId?: string } & FormQueryOptions) =>
    [...formKeys.lists(), filters] as const,
  details: () => [...formKeys.all, 'detail'] as const,
  detail: (id: string, options?: FormQueryOptions) =>
    [...formKeys.details(), id, options] as const,
}

/* ========== apis ========== */
const listForms = async (
  userId: string,
  options?: FormQueryOptions,
): Promise<FormWithRelations[]> => {
  let selectQuery = '*'

  if (options?.withBlocks) {
    selectQuery += ', blocks (*)'
  }

  if (options?.withResponses) {
    selectQuery += ', responses (*)'
  }

  if (options?.withResponseAnswers) {
    selectQuery += ', responses (*, response_answers (*))'
  }

  const { data, error } = await supabase
    .from('forms')
    .select(selectQuery)
    .eq('user_id', userId)
    .throwOnError()

  if (error) throw error
  return (data ?? []) as unknown as FormWithRelations[]
}

const readForm = async ({
  queryKey,
}: QueryFunctionContext<
  ReturnType<(typeof formKeys)['detail']>
>): Promise<FormWithRelations | null> => {
  const [, , id, options] = queryKey // ["forms", "detail", id, options]

  let selectQuery = '*'

  if (options?.withBlocks) {
    selectQuery += ', blocks (*)'
  }

  if (options?.withResponses) {
    selectQuery += ', responses (*)'
  }

  if (options?.withResponseAnswers) {
    selectQuery += ', responses (*, response_answers (*))'
  }

  const { data, error } = await supabase
    .from('forms')
    .select(selectQuery)
    .eq('id', id)
    .single()
    .throwOnError()

  if (error) throw error
  return data as unknown as FormWithRelations | null
}

const createForm = async (form: Partial<FormsDataType['Insert']>) =>
  (
    await supabase
      .from('forms')
      .insert([{ ...form } as any]) // form.user_id will be auto-filled by postgres triggers
      .select()
      .single()
      .throwOnError()
  ).data

const updateForm = async (form: FormsDataType['Update'] & { id: string }) => {
  const { id, ...rest } = form
  return (
    await supabase
      .from('forms')
      .update(rest)
      .eq('id', id)
      .select()
      .single()
      .throwOnError()
  ).data
}

const deleteForm = async (id: string) =>
  await supabase.from('forms').delete().eq('id', id)

/* ========== helpers ========== */
const transformForms = (forms: FormWithRelations[]) =>
  forms.map((form) => {
    const completion = 0 // TODO: calc submitted/started
    return { ...form, completion }
  })

/* ========== hooks ========== */
function useFormList(userId: string, options?: FormQueryOptions) {
  return useQuery({
    queryKey: formKeys.list({ state: 'all', userId, ...options }),
    queryFn: () => listForms(userId, options),
    select: transformForms,
  })
}

function useFormRead(id: string, options?: FormQueryOptions) {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: formKeys.detail(id, options),
    queryFn: readForm,
    retry: 1,
    initialData: () =>
      queryClient
        .getQueryData<
          FormWithRelations[]
        >(formKeys.list({ state: 'all', ...options }))
        ?.find((f) => f.id === id),
  })
}

function useFormCreate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createForm,
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: formKeys.lists() })
    },
  })
}

function useFormUpdate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateForm,
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: formKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: formKeys.lists() })
    },
  })
}

function useFormDelete() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteForm,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: formKeys.lists() })
    },
  })
}

export { useFormList, useFormCreate, useFormRead, useFormUpdate, useFormDelete }
