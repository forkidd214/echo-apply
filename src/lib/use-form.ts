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

import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

/* ========== keys factory ========== */
const formKeys = {
  all: ['forms'] as const,
  lists: () => [...formKeys.all, 'list'] as const,
  list: (state: 'all') => [...formKeys.lists(), { state }] as const,
  details: () => [...formKeys.all, 'detail'] as const,
  detail: (id: string) => [...formKeys.details(), id] as const,
}

/* ========== apis ========== */
const listForms = async () =>
  (await supabase.from('forms').select().throwOnError()).data ?? []

const readForm = async ({
  queryKey, // only accept keys that come from the factory
}: QueryFunctionContext<ReturnType<(typeof formKeys)['detail']>>) => {
  const [, , id] = queryKey // ["forms", "detail", id]

  return (
    await supabase
      .from('forms')
      .select(`*, blocks (form_id)`)
      .eq('id', id) // query key dependencies safe
      .single()
      .throwOnError()
  ).data
}

const createForm = async (form: { name: string }) =>
  (await supabase.from('forms').insert([form]).select().single().throwOnError())
    .data

const updateForm = async (form: { id: string; name: string }) => {
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
const transformForms = (forms: Awaited<ReturnType<typeof listForms>>) =>
  forms.map((form) => ({ ...form, responses: 0, completion: 0 })) // calcultae responses and completion

/* ========== hooks ========== */
function useFormList() {
  return useQuery({
    queryKey: formKeys.list('all'),
    queryFn: listForms,
    select: transformForms,
  })
}

function useFormRead(id: string) {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: formKeys.detail(id),
    queryFn: readForm,
    initialData: () =>
      queryClient
        .getQueryData<
          Awaited<ReturnType<typeof listForms>>
        >(formKeys.list('all'))
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
    onSettled: (_, __, variales) => {
      queryClient.invalidateQueries({ queryKey: formKeys.detail(variales.id) })
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
