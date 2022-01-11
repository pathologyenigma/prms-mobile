import { gql, useQuery } from '@apollo/client'
import { format, isThisYear, isToday } from 'date-fns'
import { useMemo } from 'react'
import { ResumeJobStatus } from '../../typings'
import { stirngForSalary, stringForJobStatus } from '../../utils/JobHelper'

interface ContractData {
  id: number
  job_category_expectation: string[]
  job: {
    id: number
    title: string
  }
  job_status: ResumeJobStatus
  name: string
  logo: string
  gender: boolean | null
  age: number | null
  exp: number | null
  last_log_out_time: string | null
  last_msg_time: string
  city_expectation: string
  salary_expectations: number[]
}

interface ContractListResult {
  UserGetContractList: ContractData[]
}

export interface ContractItem {
  id: number
  job: string
  time: string
  name: string
  age: string
  experience: string
  education: string
  status: string
  avatar: string
  gender: 'male' | 'female'
  expectation: {
    jobCategory: string
    city: string
    salary: string
  }
}

function formatTime(time: string) {
  const date = new Date(time)
  if (isToday(date)) {
    return `今天 ${format(date, 'HH:mm')}`
  }

  if (isThisYear(date)) {
    return format(date, 'M月d日 HH:mm')
  }

  return format(date, 'yyyy年M月d日 HH:mm')
}

export default function useContractList() {
  const { data, loading, error, refetch } = useQuery<ContractListResult>(query)

  const items = useMemo<ContractItem[] | undefined>(() => {
    if (!data) {
      return undefined
    }

    return data.UserGetContractList.map(data => {
      const {
        id,
        job,
        last_msg_time,
        name,
        age,
        exp,
        job_status,
        logo,
        gender,
        job_category_expectation,
        city_expectation,
        salary_expectations,
      } = data

      return {
        id,
        job: job.title,
        time: formatTime(last_msg_time),
        name: name,
        age: `${age} 岁`,
        experience: `工作 ${exp} 年`,
        education: '本科',
        status: stringForJobStatus(job_status),
        avatar: logo,
        gender: gender ? 'male' : 'female',
        expectation: {
          jobCategory:
            job_category_expectation[job_category_expectation.length - 1],
          city: city_expectation,
          salary: stirngForSalary(salary_expectations),
        },
      }
    })
  }, [data])

  return { items, loading, error, refetch }
}

const query = gql`
  query UserGetContractList {
    UserGetContractList {
      ... on Talent {
        id
        job_category_expectation
        job
        job_status
        name
        logo
        gender
        age
        exp
        last_log_out_time
        last_msg_time
        salary_expectations
        city_expectation
      }
    }
  }
`
