import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { Education, FullTime } from '../../typings'

export interface EditJobInput {
  id: number
  jobTitle: string
  workingAddress: string[]
  coordinates: [number, number]
  experience: number
  salary: number[]
  education: Education
  description: string
  requiredNum: number
  isFullTime: FullTime
  tags: string[]
  onLineTimes?: string[]
  publishNow: boolean
  category: string[]
}

export function useEditJob() {
  const [fn] = useMutation<{ HREditJob: null }>(mutation)

  const editJob = useCallback(
    async (input: Partial<EditJobInput>) => {
      const {
        jobTitle,
        category,
        experience,
        education,
        salary,
        description,
        workingAddress,
        coordinates,
        requiredNum,
      } = input

      if (!jobTitle) {
        throw new Error('请填写职位名称')
      }

      if (!category || category.length === 0) {
        throw new Error('请选择职位类别')
      }

      if (experience === undefined) {
        throw new Error('请选择工作经验')
      }

      if (!education) {
        throw new Error('请选择最低学历')
      }

      if (!salary || salary.length < 2) {
        throw new Error('请选择薪资范围')
      }

      if (!description) {
        throw new Error('请填写职位描述')
      }

      if (!workingAddress || workingAddress.length < 8) {
        throw new Error('请填写工作地址')
      }

      if (!coordinates || coordinates.length < 2) {
        throw new Error('请重新填写工作地址')
      }

      if (requiredNum === undefined || requiredNum < 1) {
        throw new Error('请填写招聘人数')
      }

      await fn({ variables: { info: input } })
    },
    [fn],
  )

  return editJob
}

const mutation = gql`
  mutation HREditJob($info: JobEdit!) {
    HREditJob(info: $info)
  }
`
