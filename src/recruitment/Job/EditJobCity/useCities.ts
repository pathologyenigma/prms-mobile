import { gql, useLazyQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'

export interface City {
  name: string
  id: string
  provinceId: string
}

interface CityData {
  city_id: string
  name: string
}

export function useCities() {
  const [fetch, { loading, data, variables }] = useLazyQuery<
    { StaticGetCities: CityData[] },
    { proviceId: string }
  >(query, { fetchPolicy: 'cache-first' })

  const cities = useMemo(
    () =>
      data?.StaticGetCities.map(
        ({ name, city_id }) =>
          ({ id: city_id, name, provinceId: variables?.proviceId } as City),
      ),
    [data],
  )

  const getCities = useCallback(
    (proviceId: string) => {
      fetch({ variables: { proviceId } })
    },
    [fetch],
  )

  return { getCities, cities, loading }
}

const query = gql`
  query StaticGetCities($proviceId: String!) {
    StaticGetCities(provinceId: $proviceId) {
      city_id
      name
    }
  }
`
