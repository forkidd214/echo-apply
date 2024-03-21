import { useSearchParamsManager } from '@/utils/helpers'

export default function useBlockNavigator() {
  const { getSearchParams, updateSearchParams } = useSearchParamsManager()

  return {
    currentBlockId: getSearchParams('block'),
    openBlock: (id: string) => updateSearchParams('block', id),
  }
}
