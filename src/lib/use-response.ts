import {
  QueryFunctionContext,
  useQueryClient,
  useQuery,
  useMutation,
} from '@tanstack/react-query'

import type { Database, Json } from '@/utils/supabase/database.types'
import { createClient } from '@/utils/supabase/client'

type ResponsesDataType = Database['public']['Tables']['responses']
type ResponseAnswersDataType = Database['public']['Tables']['response_answers']
type FnInsertResponseWithAnswersType =
  Database['public']['Functions']['insert_response_with_answers']

const supabase = createClient()

/* ========== keys factory ========== */
const responseKeys = {
  all: ['responses'] as const,
  lists: () => [...responseKeys.all, 'list'] as const,
  list: (filters: { formId: string }) =>
    [...responseKeys.lists(), { ...filters }] as const,
  details: () => [...responseKeys.all, 'detail'] as const,
  detail: (id: string) => [...responseKeys.details(), id] as const,
}

/* ========== apis ========== */
const JOIN_RESPONSES_WITH_ANSWERS = `
    *,
    response_answers (*,
                      blocks (*)
                      )
  `

const listResponsesWithAnswersByFormId = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof responseKeys)['list']>>) => {
  const [, , { formId }] = queryKey // ["responses", "list", { formId: 'xxxx' }]

  return (
    (
      await supabase
        .from('responses')
        .select(JOIN_RESPONSES_WITH_ANSWERS)
        .eq('form_id', formId)
        .throwOnError()
    ).data ?? []
  )
}

const readResponse = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof responseKeys)['detail']>>) => {
  const [, , id] = queryKey
  return (
    await supabase
      .from('responses')
      .select(JOIN_RESPONSES_WITH_ANSWERS)
      .eq('id', id)
      .single()
      .throwOnError()
  ).data
}

const createResponse = async (formData: {
  p_form_id: string
  p_answers: {
    block_id: string
    value: Json
  }[] // check for the actual rpc function on supabase for details
}) => {
  return await supabase.rpc('insert_response_with_answers', formData)
}

const deleteResponse = async (id: string) => {
  await supabase
    .from('response_answers')
    .delete()
    .eq('response_id', id)
    .throwOnError()
  return await supabase.from('responses').delete().eq('id', id).throwOnError()
}

/* ========== helpers ========== */
//

/* ========== hooks ========== */
function useResponseList(formId: string) {
  return useQuery({
    queryKey: responseKeys.list({ formId }),
    queryFn: listResponsesWithAnswersByFormId,
    refetchOnMount: 'always', // client side supabase doesn't have cookies for authenticated data fetching. See https://github.com/TanStack/query/issues/6116#issuecomment-1904051005 for details
  })
}

function useResponseRead(id: string) {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: responseKeys.detail(id),
    queryFn: readResponse,
    initialData: () =>
      queryClient
        .getQueryData<
          Awaited<ReturnType<typeof listResponsesWithAnswersByFormId>>
        >(responseKeys.lists())
        ?.find((r) => r.id === id),
  })
}

function useResponseCreate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createResponse,
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: responseKeys.lists() })
    },
  })
}

function useResponseDelete() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteResponse,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: responseKeys.lists() })
    },
  })
}

export {
  useResponseList,
  useResponseRead,
  useResponseCreate,
  useResponseDelete,
}
