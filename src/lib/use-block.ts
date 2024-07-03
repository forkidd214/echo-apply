import {
  QueryFunctionContext,
  useQueryClient,
  useQuery,
  // useSuspenseQuery,
  useMutation,
  QueryKey,
  Updater,
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
        .select()
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
    await supabase.from('blocks').select().eq('id', id).single().throwOnError()
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

const updateBlockMany = async (
  blocks: Awaited<ReturnType<typeof listBlocksByFormId>>,
) => {
  return (
    (await supabase.from('blocks').upsert(blocks).select().throwOnError())
      .data ?? []
  )
}

const deleteBlock = async (id: string) =>
  await supabase.from('blocks').delete().eq('id', id).throwOnError()

/* ========== helpers ========== */
const sortBlocks = (blocks: Awaited<ReturnType<typeof listBlocksByFormId>>) =>
  [...blocks].sort((b1, b2) => {
    if (b1.index === null) return -1
    if (b2.index === null) return 1
    return b1.index - b2.index
  }) // sort by index

/* ========== hooks ========== */
function useBlockList(formId: string) {
  return useQuery({
    queryKey: blockKeys.list({ formId }),
    queryFn: listBlocksByFormId,
    select: sortBlocks,
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: blockKeys.all,
      })
    },
    onMutate: async (newBlock) => {
      const queryKey = blockKeys.detail(newBlock.id)

      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey })

      // Snapshot the previous value
      const previousValue = queryClient.getQueryData(queryKey)

      // Optimistically update to the new value
      queryClient.setQueryData<BlocksDataType['Update']>(
        queryKey,
        (oldBlock) => ({ ...oldBlock, ...newBlock }),
      )

      // Return a context object with the snapshotted value
      return { previousValue }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newBlock, context) => {
      queryClient.setQueryData(
        blockKeys.detail(newBlock.id),
        context?.previousValue,
      )
    },
  })
}

function useBlockUpdateMany() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateBlockMany,
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: blockKeys.lists() })
      variables.forEach(({ id }) =>
        queryClient.invalidateQueries({
          queryKey: blockKeys.detail(id),
        }),
      )
    },
    onMutate: async (newBlocks) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: blockKeys.lists() })

      // Snapshot the previous value
      const previousLists = queryClient.getQueriesData({
        queryKey: blockKeys.lists(),
      })

      // Optimistically update to the new value
      queryClient.setQueriesData<BlocksDataType['Row'][]>(
        { queryKey: blockKeys.lists() },
        (oldBlocks) =>
          oldBlocks?.map((oldBlock) => {
            const newBlock = newBlocks.find((b) => b.id === oldBlock.id)
            return !!newBlock ? { ...oldBlock, ...newBlock } : oldBlock
          }),
      )

      // Return a context object with the snapshotted value
      return { previousLists }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newBlock, context) => {
      queryClient.setQueriesData(
        { queryKey: blockKeys.lists() },
        context?.previousLists,
      )
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
  useBlockUpdateMany,
  useBlockDelete,
  useBlockTypes,
}
