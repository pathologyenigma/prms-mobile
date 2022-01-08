import { gql, useQuery } from '@apollo/client'
import { useMemo } from 'react'

export interface Province {
  id: string
  name: string
}

interface ProvinceData {
  province_id: string
  name: string
}

export function useProvinces() {
  const { loading, data } = useQuery<{ StaticGetProvinces: ProvinceData[] }>(
    query,
    { fetchPolicy: 'cache-first' },
  )

  const provinces = useMemo(
    () =>
      data?.StaticGetProvinces.map(
        ({ name, province_id }) => ({ name, id: province_id } as Province),
      ),
    [data],
  )

  return { loading, provinces }
}

const query = gql`
  query StaticGetProvinces {
    StaticGetProvinces {
      province_id
      name
    }
  }
`
