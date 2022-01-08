import { useCallback, useEffect, useState } from 'react'
import { get } from '../../utils/http'

let cache:
  | {
      [key in string]: {
        [key in string]: string[]
      }
    }
  | undefined = undefined

export function useJobCategory() {
  const [loading, setLoading] = useState(true)
  const [primaryCategories, setPrimaryCategories] = useState<string[]>()

  useEffect(() => {
    if (cache) {
      setPrimaryCategories(Object.keys(cache))
      setLoading(false)
    } else {
      get('https://be.chenzaozhao.com/preludeDatas/job_category.json')
        .then(res => {
          cache = res
          console.log(
            'https://be.chenzaozhao.com/preludeDatas/job_category.json',
            res,
          )
          setPrimaryCategories(Object.keys(res))
          setLoading(false)
        })
        .catch(e => {
          setLoading(false)
        })
    }
  }, [])

  const secondaryCategories = useCallback((primaryCategory: string) => {
    return Object.keys(cache![primaryCategory])
  }, [])

  const finalCategories = useCallback(
    (primaryCategory: string, secondaryCategory: string) => {
      return cache![primaryCategory][secondaryCategory]
    },
    [],
  )

  console.log('------------useJobCategory---------------')

  return { loading, primaryCategories, secondaryCategories, finalCategories }
}
