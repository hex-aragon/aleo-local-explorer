import { useCallback, useState } from 'react'

export function useLocalStorage(key: string, defaultValue: string) {
  const [value, setValue] = useState<string>(() => {
    try {
      return window.localStorage.getItem(key) ?? defaultValue
    } catch {
      return defaultValue
    }
  })

  const update = useCallback(
    (next: string) => {
      setValue(next)
      try {
        window.localStorage.setItem(key, next)
      } catch {
        // ignore storage failures (private mode, quota, etc.)
      }
    },
    [key],
  )

  return [value, update] as const
}
