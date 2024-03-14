import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import {
  listBlocks,
  readBlock,
  createBlock,
  updateBlock,
  deleteBlock,
} from './json-server'

function useBlock() {
  const { data: blocks } = useBlockList()
  const { mutate: createBlock } = useBlockCreate()
  const { mutate: deleteBlock } = useBlockDelete()

  return { blocks, createBlock, deleteBlock }
}

function useBlockList() {
  return useSuspenseQuery({
    queryKey: ['blocks'],
    queryFn: listBlocks,
  })
}

function useBlockCreate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createBlock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocks'] })
    },
  })
}

function useBlockRead(id: string) {
  return useSuspenseQuery({
    queryKey: ['block', id],
    queryFn: () => readBlock(id),
  })
}

function useBlockUpdate() {
  return useMutation({
    mutationFn: updateBlock,
  })
}

function useBlockDelete() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteBlock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocks'] })
    },
  })
}

export {
  useBlock,
  useBlockList,
  useBlockCreate,
  useBlockRead,
  useBlockUpdate,
  useBlockDelete,
}
