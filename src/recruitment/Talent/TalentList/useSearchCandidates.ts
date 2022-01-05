import { gql, useLazyQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { Education, ResumeJobStatus } from '../../typing'

interface CandidateData {
  id: number
  age: number | null
  name: string
  gender: boolean | null
  education: Education | null
  experience: number | null
  job_expectation: string[]
  aimed_city: string
  salary: number[]
  job_status: ResumeJobStatus
  last_log_out_time: string
  personal_advantage: string
  skills: string[]
}

interface Result {
  ENTSearchCandidates: {
    count: number
    data: CandidateData[]
  }
}

interface Variables {
  expectation?: string
  education?: string
  salary?: number[]
  page?: number
  pageSize?: number
  sortByUpdatedTime?: boolean
}

export interface CandidateItem {
  id: number
  name: string
  online: boolean
  onlineDesc: string
  advantage: string
  education: string
  experience: string
  salary: string
  job: string
  skills: string
  gender: 'male' | 'female'
  avatar: string
}

function educationDesc(education: Education | null) {
  switch (education) {
    case 'Junior':
      return '初中'
    case 'High':
      return '高中'
    case 'JuniorCollege':
      return '大专'
    case 'RegularCollege':
      return '本科'
    case 'Postgraduate':
      return '研究生'
    case 'Doctor':
      return '博士'
    default:
      return '小学及以下'
  }
}

export function useSearchCandidates() {
  const [fetch, { data, loading }] = useLazyQuery<Result, Variables>(query)

  const searchCandidates = useCallback(
    (v: Variables) => {
      fetch({
        variables: v,
      })
    },
    [fetch],
  )

  const candidates = useMemo<CandidateItem[]>(() => {
    const items = data?.ENTSearchCandidates.data.map<CandidateItem>(c => {
      const {
        id,
        name,
        salary,
        personal_advantage,
        education,
        experience,
        job_expectation,
        skills,
        gender,
      } = c
      return {
        id,
        name,
        online: true,
        onlineDesc: '1 小时前在线',
        advantage: personal_advantage || '暂无描述',
        experience: `工作 ${experience || 0} 年`,
        education: educationDesc(education),
        salary: `${salary[0] / 1000}-${salary[1] / 1000}K`,
        job: `期望：${job_expectation.join('/')}`,
        skills: `${skills.join('·')}`,
        gender: gender ? 'male' : 'female',
        avatar: '',
      }
    })
    return items || []
  }, [data])

  return { searchCandidates, candidates, loading }
}

const query = gql`
  query ENTSearchCandidates {
    ENTSearchCandidates {
      count
      data {
        id
        age
        name
        gender
        education
        experience
        job_expectation
        aimed_city
        salary
        job_status
        last_log_out_time
        skills
        personal_advantage
      }
    }
  }
`
