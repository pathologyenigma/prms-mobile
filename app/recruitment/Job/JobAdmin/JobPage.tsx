import React, { useCallback, useState } from 'react'
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native'
import { JobItem, useJobList } from './useJobList'
import { JobParamList } from '../typings'
import Empty from '../../components/Empty'
import JobAdminItem from './JobAdminItem'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import LoadingAndError from '../../components/LoadingAndError'
import { JobStatus } from '../../typings'
import {
  stringForEducation,
  stringForExperience,
  stringForFullTime,
} from '../../utils/JobHelper'

interface PageProps {
  status: JobStatus
  isActive: boolean
}

export default function JobPage({ status, isActive }: PageProps) {
  
  const [itemList, setItemList] = useState()

  const navigation = useNavigation<StackNavigationProp<JobParamList>>()

  useFocusEffect(
    useCallback(() => {
      if (isActive) {
      	HTAPI.UserGetJobListByEntId({ status, pageSize: 20 }).then(response => {
      		let itemList = response.data.map((job) => {
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
			      	...job,
			        title,
			        tags,
			        labels,
			        salary,
			        status,
			        jobId,
			      }
      		})
      		setItemList(itemList)
      	})
      }
    }, [status, isActive]),
  )

  console.log('---------JobPage----------')

  const renderItem: ListRenderItem<JobItem> = ({ item, index }) => {
    return (
      <JobAdminItem
        {...item}
        onPress={() => navigation.navigate('JobDetail', { jobId: item.id, status: status })}
      />
    )
  }

  return (
    <LoadingAndError
      loading={false}
      style={StyleSheet.absoluteFillObject}
      collapsable={false}>
      {itemList && (
        <FlatList
          style={styles.container}
          contentContainerStyle={styles.content}
          keyExtractor={(job: JobItem, index: number) => String(job.job_id)}
          data={itemList}
          renderItem={renderItem}
          ListEmptyComponent={Empty}
        />
      )}
    </LoadingAndError>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
})
