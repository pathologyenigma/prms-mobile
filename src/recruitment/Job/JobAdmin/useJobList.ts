import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { Education, FullTime, JobStatus } from '../typings'
import {
  stringForEducation,
  stringForExperience,
  stringForFullTime,
} from '../../utils/JobHelper'
import { useCallback, useMemo } from 'react'

interface JobData {
  __typename: 'JobDataBriefly'
  id: number
  job_id: number
  title: string
  address_description: string[]
  min_salary: number
  max_salary: number
  min_experience: number
  min_education: Education
  full_time_job: FullTime
  emergency: boolean
  createdAt: string
  status: JobStatus
}

interface Tag {
  text: string
  color: string
}

export interface JobItem {
  jobId: number
  title: string
  tags: Tag[]
  labels: string[]
  salary: string
  status: JobStatus
}

export function useJobList() {
  const [fetch, { data, loading, error }] = useLazyQuery<{
    UserGetJobListByEntId: { count: number; data: JobData[] }
  }>(UserGetJobListByEntId, { fetchPolicy: 'cache-and-network' })

  const getJobList = useCallback(
    (status: JobStatus) => {
      fetch({
        variables: {
          status,
          pageSize: 20,
        },
      })
    },
    [fetch],
  )

  const items = useMemo(() => {
    return data?.UserGetJobListByEntId.data.map(job => {
      const title = job.title
      const tags: Tag[] = []
      const { emergency, full_time_job } = job
      if (emergency) {
        tags.push({
          text: '急聘',
          color: '#EB3B2B',
        })
      }

      tags.push({
        text: stringForFullTime(full_time_job),
        color: '#6CD6B3',
      })

      const labels: string[] = []
      const { min_experience, min_education, address_description } = job
      labels.push(stringForExperience(min_experience))
      labels.push(stringForEducation(min_education))
      labels.push(`${address_description[4]}·${address_description[5]}`)

      const { min_salary, max_salary } = job
      const salary = min_salary / 1000 + 'K-' + max_salary / 1000 + 'K'
      const status = job.status
      const jobId = job.job_id

      return {
        title,
        tags,
        labels,
        salary,
        status,
        jobId,
      } as JobItem
    })
  }, [data])

  return { getJobList, items, loading }
}

const UserGetJobListByEntId = gql`
  query UserGetJobListByEntId($status: JobStatus, $pageSize: Int) {
    UserGetJobListByEntId(status: $status, pageSize: $pageSize) {
      count
      data {
        __typename
        ... on JobDataBriefly {
          id
          job_id
          title
          address_description
          min_salary
          max_salary
          min_experience
          min_education
          full_time_job
          emergency
          createdAt
          status
        }
      }
    }
  }
`
