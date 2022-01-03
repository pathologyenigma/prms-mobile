import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useCallback, useEffect, useMemo } from 'react'
import RootLoading from '../../../utils/rootLoading'
import { Education, FullTime, JobParamList } from '../typing'

export interface PostJobInput {
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

export function usePostJob() {
  const [fn, { data, loading, error }] =
    useMutation<{ HRPostJob: null }>(mutation)

  const navigation = useNavigation<StackNavigationProp<JobParamList>>()

  useEffect(() => {
    if (error) {
      console.warn('----usePostJob----', error)
    }
  }, [error])

  useEffect(() => {
    if (loading) {
      RootLoading.loading('发布中...')
    }
    return () => {
      RootLoading.hide()
    }
  }, [loading])

  const postJob = useCallback(
    async (input: Partial<PostJobInput>) => {
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
        RootLoading.info('请填写职位名称')
        return
      }

      if (!category || category.length === 0) {
        RootLoading.info('请选择职位类别')
        return
      }

      if (experience === undefined) {
        RootLoading.info('请选择工作经验')
        return
      }

      if (!education) {
        RootLoading.info('请选择最低学历')
        return
      }

      if (!salary || salary.length < 2) {
        RootLoading.info('请选择薪资范围')
        return
      }

      if (!description) {
        RootLoading.info('请填写职位描述')
        return
      }

      if (!workingAddress || workingAddress.length < 8) {
        RootLoading.info('请填写工作地址')
        return
      }

      if (!coordinates || coordinates.length < 2) {
        RootLoading.info('请重新填写工作地址')
        return
      }

      if (requiredNum === undefined || requiredNum < 1) {
        RootLoading.info('请填写招聘人数')
        return
      }

      await fn({ variables: { info: input } })
      navigation.goBack()
    },
    [fn],
  )

  console.log('usePostJob', data)

  return postJob
}

const mutation = gql`
  mutation HRPostJob($info: JobPost!) {
    HRPostJob(info: $info)
  }
`
