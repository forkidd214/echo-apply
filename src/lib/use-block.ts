import {
  QueryFunctionContext,
  useQueryClient,
  useQuery,
  // useSuspenseQuery,
  useMutation,
} from '@tanstack/react-query'

import type { Database } from '@/utils/supabase/database.types'
import { createClient } from '@/utils/supabase/client'

type BlocksDataType = Database['public']['Tables']['blocks']

const supabase = createClient()

/* ========== keys factory ========== */
const blockKeys = {
  all: ['blocks'] as const,
  lists: () => [...blockKeys.all, 'list'] as const,
  list: (filters: { formId: string }) =>
    [...blockKeys.lists(), { ...filters }] as const,
  details: () => [...blockKeys.all, 'detail'] as const,
  detail: (id: string) => [...blockKeys.details(), id] as const,
}

/* ========== apis ========== */
const listBlocksByFormId = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof blockKeys)['list']>>) => {
  const [, , { formId }] = queryKey // ["blocks", "list", { formId: 'xxxx' }]
  return (
    (
      await supabase
        .from('blocks')
        .select(`*, ...block_types(type:name)`)
        .eq('form_id', formId)
        .throwOnError()
    ).data ?? []
  )
}

const readBlock = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof blockKeys)['detail']>>) => {
  const [, , id] = queryKey
  return (
    await supabase
      .from('blocks')
      .select(`*, ...block_types(type:name)`)
      .eq('id', id)
      .single()
      .throwOnError()
  ).data
}

const createBlock = async (block: BlocksDataType['Insert']) => {
  return (
    await supabase
      .from('blocks')
      .insert([
        {
          ...block,
        },
      ])
      .select()
      .single()
      .throwOnError()
  ).data
}

const updateBlock = async (
  block: BlocksDataType['Update'] & { id: string },
) => {
  return (
    await supabase
      .from('blocks')
      .update({
        ...block,
      })
      .eq('id', block.id)
      .select()
      .single()
      .throwOnError()
  ).data
}

const deleteBlock = async (id: string) =>
  await supabase.from('blocks').delete().eq('id', id).throwOnError()

/* ========== helpers ========== */

/* ========== hooks ========== */
function useBlockList(formId: string) {
  return useQuery({
    queryKey: blockKeys.list({ formId }),
    queryFn: listBlocksByFormId,
    refetchOnMount: 'always', // client side supabase doesn't have cookies for authenticated data fetching. See https://github.com/TanStack/query/issues/6116#issuecomment-1904051005 for details
  })
}

function useBlockRead(id: string) {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: blockKeys.detail(id),
    queryFn: readBlock,
    initialData: () =>
      queryClient
        .getQueryData<
          Awaited<ReturnType<typeof listBlocksByFormId>>
        >(blockKeys.lists())
        ?.find((b) => b.id === id),
  })
}

function useBlockCreate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createBlock,
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: blockKeys.lists() })
    },
  })
}
function useBlockUpdate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateBlock,
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: blockKeys.detail(variables.id),
      })
    },
  })
}

function useBlockDelete() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteBlock,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: blockKeys.lists() })
    },
  })
}

/* ========== block_types ========== */
function useBlockTypes() {
  return useQuery({
    queryKey: ['block_types'],
    queryFn: async () =>
      (await supabase.from('block_types').select().throwOnError()).data,
    refetchOnMount: false,
  })
}

export {
  useBlockList,
  useBlockCreate,
  useBlockRead,
  useBlockUpdate,
  useBlockDelete,
  useBlockTypes,
}
