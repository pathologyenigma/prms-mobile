import { useCallback, useEffect, useState } from 'react'
import { get } from '../../utils/http'

let cache:
  | {
      [key in string]: string[]
    }
  | undefined = undefined

export function useIndustryCategory() {
  const [loading, setLoading] = useState(true)
  const [primaryCategories, setPrimaryCategories] = useState<string[]>()

  useEffect(() => {
    if (cache) {
      setPrimaryCategories(Object.keys(cache))
      setLoading(false)
    } else {
      get('https://be.chenzaozhao.com/preludeDatas/industry_category.json')
        .then(res => {
          cache = res
          console.log(
            'https://be.chenzaozhao.com/preludeDatas/industry_category.json',
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
    return cache![primaryCategory]
  }, [])

  console.log('------------useIndustryCategory---------------')

  return { loading, primaryCategories, secondaryCategories }
}
