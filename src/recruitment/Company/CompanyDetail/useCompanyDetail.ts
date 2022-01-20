import { gql, useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { ImageRequireSource } from 'react-native'
import { LatLng } from '../../../bridge/MapView'
import {
  EnterpriseFinancing,
  EnterpriseNature,
  EnterpriseSize,
} from '../../typings'
import { stringForEnterpriseSize } from '../../utils/JobHelper'

interface EntInfo {
  enterprise_name: string
  enterprise_profile: string
  enterprise_size: EnterpriseSize
  enterprise_logo: string | null
  enterprise_welfare: string[] | null
  enterprise_financing: EnterpriseFinancing
  enterprise_loc_detail: string[]
  enterprise_coordinates: number[]
  business_nature: EnterpriseNature
  industry_involved: string[]
  tags: string[] | null
  extra_attribute: string | null
  rest_rule: string | null
  overtime_work_degree: string | null
  homepage: string | null
  established_time: string | null
  tel: string | null
  work_time: string | null
  createdAt: string
  job_counter: number | null
  abbreviation: string
}

interface CompanyDetailData {
  UserGetEnterpriseDetail_EntInfo: EntInfo
}

interface Worktime {
  icon: ImageRequireSource
  label: string
}

interface Welfare {
  icon: ImageRequireSource
  label: string
}

interface Address {
  desc: string
  latlng: LatLng
}

interface CompanyDetailItem {
  name: string
  meta: string
  logo: string
  profile: string
  walfares: string[]
  worktimes: Worktime[]
  address: Address
}

export default function useCompanyDetail() {
  const { data, loading, error, refetch } = useQuery<CompanyDetailData>(query)

  console.log('data', data)

  const detail = useMemo(() => {
    if (!data) {
      return undefined
    }
    const {
      enterprise_name,
      enterprise_logo,
      enterprise_profile,
      enterprise_size,
      enterprise_financing,
      industry_involved,
      enterprise_welfare,
    } = data.UserGetEnterpriseDetail_EntInfo

    return {
      name: enterprise_name,
      meta: `${enterprise_financing}·${stringForEnterpriseSize(
        enterprise_size,
      )}·${industry_involved[industry_involved.length - 1]}`,
      logo: enterprise_logo || '',
      walfares: enterprise_welfare || [],
      profile: enterprise_profile,
    }
  }, [data])

  return { loading, error, refetch }
}

const query = gql`
  query CompanyDetail {
    UserGetEnterpriseDetail_EntInfo {
      enterprise_name
      enterprise_profile
      enterprise_size
      enterprise_logo
      enterprise_welfare
      enterprise_financing
      enterprise_loc_detail
      enterprise_coordinates
      business_nature
      industry_involved
      tags
      extra_attribute
      rest_rule
      overtime_work_degree
      homepage
      established_time
      tel
      work_time
      createdAt
      job_counter
      abbreviation
    }
  }
`
