import { useEffect, useState } from 'react'

export function useAsync<T>(callback: (...args: any) => Promise<T>, initialValue?: T) {
  const [state, set] = useState(initialValue)

  useEffect(() => {
    let live = true
    ;(async () => {
      try {
        const state = await callback()
        if (live) {
          set(state)
        }
      } catch (e) {
        // ignore
      }
    })()
    return () => {
      live = false
    }
  }, [callback])

  return state
}
