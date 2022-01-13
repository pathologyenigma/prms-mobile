import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'

export default function useHideJob(jobId: number) {
  const [fn, { data, loading, error }] = useMutation<{ HRHideJob: null }>(
    mutation,
    {
      variables: {
        jobId: jobId,
      },
    },
  )

  const hideJob = useCallback(async () => {
    await fn()
  }, [fn])

  return hideJob
}

const mutation = gql`
  mutation HRHideJob($jobId: Int!) {
    HRHideJob(jobId: $jobId)
  }
`
