import { gql, useLazyQuery } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

interface JobData {
  __typename: 'JobDataBriefly'
  id: number
  job_id: number
  title: string
}

export interface JobItem {
  jobId: number
  title: string
}

export function useSimpleOnlineJobs() {
  const [fetch, { data, loading, error }] = useLazyQuery<{
    UserGetJobListByEntId: { count: number; data: JobData[] }
  }>(UserGetJobListByEntId, {
    variables: {
      status: 'InRecruitment',
      pageSize: 20,
    },
    fetchPolicy: 'cache-and-network',
  })

  useFocusEffect(fetch)

  const jobs = data?.UserGetJobListByEntId.data.map(({ job_id, title }) => {
    return {
      jobId: job_id,
      title,
    } as JobItem
  })

  return { jobs, loading, error }
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
        }
      }
    }
  }
`
