import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { EditJobInput } from '../PostJob/useEditJob'
import { JobParamList } from '../typings'

type JobInput = JobParamList['PostJob']

export function useOpenJob() {
  const [fn] = useMutation<{ HREditJob: null }>(mutation)

  const openJob = useCallback(
    async (input: JobInput) => {
      const {
        jobId,
        jobName,
        jobDescription,
        jobNature = 'Full',
        jobCategory = [],
        experience,
        education = 'RegularCollege',
        salary,
        tags,
        headcount = 1,
        workingAddress,
        coordinates,
      } = input

      const info: Partial<EditJobInput> = {
        id: jobId,
        jobTitle: jobName,
        workingAddress,
        experience,
        salary,
        education,
        description: jobDescription,
        requiredNum: headcount,
        isFullTime: jobNature,
        tags: tags || [],
        coordinates,
        publishNow: true,
        category: jobCategory,
      }

      await fn({ variables: { info: info } })
    },
    [fn],
  )

  return openJob
}

const mutation = gql`
  mutation HREditJob($info: JobEdit!) {
    HREditJob(info: $info)
  }
`
