'use client'

import { useRef, useEffect, useCallback } from 'react'

const useRefCallback = <T extends any[]>(
  value: ((...args: T) => void) | undefined,
  deps?: React.DependencyList,
): ((...args: T) => void) => {
  const ref = useRef(value)

  useEffect(
    () => {
      ref.current = value
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ?? [value],
  )

  const result = useCallback((...args: T) => {
    ref.current?.(...args)
  }, [])

  return result
}

export default useRefCallback
