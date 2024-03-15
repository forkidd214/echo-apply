import {
  QueryFunctionContext,
  useQueryClient,
  useQuery,
  useSuspenseQuery,
  useMutation,
} from '@tanstack/react-query'
import dbSample from '@/data/db-sample.json'
import { get, list, patch, post, remove } from './json-server'

/* ========== keys factory ========== */
const blockKeys = {
  all: ['blocks'] as const,
  lists: () => [...blockKeys.all, 'list'] as const,
  list: (state: 'all') => [...blockKeys.lists(), { state }] as const,
  details: () => [...blockKeys.all, 'detail'] as const,
  detail: (id: string) => [...blockKeys.details(), id] as const,
}

/* ========== apis ========== */
const BLOCK_ENDPOINT = blockKeys.all[0]
type BlockType = (typeof dbSample)[typeof BLOCK_ENDPOINT][0]

const listBlocks = async () => list<BlockType>(BLOCK_ENDPOINT)

const readBlock = async ({
  queryKey, // only accept keys that come from the factory
}: QueryFunctionContext<ReturnType<(typeof blockKeys)['detail']>>) => {
  const [, , id] = queryKey // ["blocks", "detail", id]
  return get<BlockType>(BLOCK_ENDPOINT, id) // query key dependencies safe
}

const createBlock = async (block: BlockType) =>
  post<BlockType>(BLOCK_ENDPOINT, block)

const updateBlock = async (block: Partial<BlockType> & { id: string }) =>
  patch<BlockType>(BLOCK_ENDPOINT, block)

const deleteBlock = async (id: string) => remove<BlockType>(BLOCK_ENDPOINT, id)

/* ========== helpers ========== */
// select: transformData

/* ========== hooks ========== */
function useBlockList() {
  return useSuspenseQuery({
    queryKey: blockKeys.list('all'),
    queryFn: listBlocks,
    // refetchOnMount: 'always',
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

function useBlockRead(id: string) {
  const queryClient = useQueryClient()
  return useSuspenseQuery({
    queryKey: blockKeys.detail(id),
    queryFn: readBlock,
    // refetchOnMount: 'always',
    initialData: () =>
      queryClient
        .getQueryData<
          Awaited<ReturnType<typeof listBlocks>>
        >(blockKeys.list('all'))
        ?.find((b) => b.id === id),
  })
}

function useBlockUpdate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateBlock,
    onSettled: (_, __, variales) => {
      queryClient.invalidateQueries({ queryKey: blockKeys.detail(variales.id) })
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

function useBlock() {
  const { data: blocks } = useBlockList()
  const { mutate: createBlock } = useBlockCreate()
  const { mutate: updateBlock } = useBlockUpdate()
  const { mutate: deleteBlock } = useBlockDelete()

  return { blocks, createBlock, updateBlock, deleteBlock }
}

export {
  useBlock,
  useBlockList,
  useBlockCreate,
  useBlockRead,
  useBlockUpdate,
  useBlockDelete,
}
