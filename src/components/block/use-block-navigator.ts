import { useSearchParamsManager } from '@/lib/utils'

export default function useBlockNavigator() {
  const { getSearchParams, updateSearchParams } = useSearchParamsManager()

  return {
    currentBlockId: getSearchParams('block'),
    openBlock: (id: string) => updateSearchParams('block', id),
  }
}
