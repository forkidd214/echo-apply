import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from 'next/navigation'

export function useSearchParamsManager() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === null) {
        params.delete(name)
      } else {
        params.set(name, value)
      }
      return params.toString()
    },
    [searchParams],
  )

  const getSearchParams = (name: string) => searchParams.get(name)

  const updateSearchParams = (name: string, value: string | null) =>
    router.push(pathname + '?' + createQueryString(name, value))

  return { getSearchParams, updateSearchParams }
}

export function useFormIdParams() {
  // get form ID from slug
  const { slug } = useParams()
  return typeof slug === 'string' ? slug : slug[0]
}

export function useKeyPress(
  keys: string[],
  callback: (event: KeyboardEvent) => void,
  node: HTMLElement | Document | null = null,
) {
  // implement the callback ref pattern
  const callbackRef = useRef(callback)
  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  // handle what happens on key press
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // check if one of the key is part of the ones we want
      if (keys.some((key) => event.key === key)) {
        callbackRef.current(event)
      }
    },
    [keys],
  )

  useEffect(() => {
    // target is either the provided node or the document
    const targetNode = node ?? document
    // attach the event listener
    targetNode &&
      targetNode.addEventListener('keydown', handleKeyPress as EventListener)

    // remove the event listener
    return () =>
      targetNode &&
      targetNode.removeEventListener('keydown', handleKeyPress as EventListener)
  }, [handleKeyPress, node])
}
