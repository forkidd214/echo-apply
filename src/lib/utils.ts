import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useSearchParamsManager() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const getSearchParams = (name: string) => searchParams.get(name)

  const updateSearchParams = (name: string, value: string) =>
    router.push(pathname + '?' + createQueryString(name, value))

  return { getSearchParams, updateSearchParams }
}
