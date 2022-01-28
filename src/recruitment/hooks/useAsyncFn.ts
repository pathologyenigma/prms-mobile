import { useCallback, useRef, useState } from 'react'
import useMountedState from './useMountedState'

export type PromiseType<P extends Promise<any>> = P extends Promise<infer T>
  ? T
  : never
export type FunctionReturningPromise = (...args: any[]) => Promise<any>

export type AsyncState<T> =
  | {
      loading: boolean
      error?: undefined
      value?: undefined
    }
  | {
      loading: true
      error?: undefined
      value?: T
    }
  | {
      loading: false
      error: Error
      value?: undefined
    }
  | {
      loading: false
      error?: undefined
      value: T
    }

type StateFromFunctionReturningPromise<T extends FunctionReturningPromise> =
  AsyncState<PromiseType<ReturnType<T>>>

export type AsyncFnReturn<
  T extends FunctionReturningPromise = FunctionReturningPromise,
> = [() => void, StateFromFunctionReturningPromise<T>]

export default function useAsyncFn<T extends FunctionReturningPromise>(
  fn: T,
  initialState: StateFromFunctionReturningPromise<T> = { loading: false },
): AsyncFnReturn<T> {
  const lastCallId = useRef(0)
  const isMounted = useMountedState()
  const [state, set] =
    useState<StateFromFunctionReturningPromise<T>>(initialState)

  const callback = useCallback(
    (...args: Parameters<T>): void => {
      const callId = ++lastCallId.current

      if (!state.loading) {
        set(prevState => ({ ...prevState, error: undefined, loading: true }))
      }

      fn(...args).then(
        value => {
          isMounted() &&
            callId === lastCallId.current &&
            set({ value, loading: false })
        },
        error => {
          isMounted() &&
            callId === lastCallId.current &&
            set({ error, loading: false })
        },
      )
    },
    [fn],
  )

  return [callback, state]
}
