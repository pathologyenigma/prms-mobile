import { useAppState } from '@react-native-community/hooks'
import { addSeconds, differenceInSeconds } from 'date-fns'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useCountdown(seconds = 60) {
  const timer = useRef<number | null>(null)
  const [target, setTarget] = useState<Date>()
  const [count, setCount] = useState<number>(0)
  const appState = useAppState()

  useEffect(() => {
    if (appState === 'active' && target) {
      timer.current = setTimeout(() => {
        setCount(differenceInSeconds(target, new Date()))
      }, 1000)
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
        timer.current = null
      }
    }
  }, [count, target, appState])

  const stop = useCallback(() => {
    setTarget(undefined)
  }, [])

  const start = useCallback(() => {
    setTarget(addSeconds(new Date(), seconds + 1))
  }, [seconds])

  useEffect(() => {
    if (count === 0) {
      stop()
    }
  }, [count, stop])

  return { countdown: count, startCountdown: start }
}
