import React, { useCallback, useState } from 'react'
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native'
import { JobItem, useJobList } from './useJobList'
import { JobParamList } from '../typings'
import Empty from './Empty'
import JobAdminItem from './JobAdminItem'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import LoadingAndError from '../../components/LoadingAndError'
import { JobStatus } from '../../typings'

interface PageProps {
  status: JobStatus
  isActive: boolean
}

export default function JobPage({ status, isActive }: PageProps) {
  const { getJobList, items, loading } = useJobList()

  const navigation = useNavigation<StackNavigationProp<JobParamList>>()

  useFocusEffect(
    useCallback(() => {
      if (isActive) {
        getJobList(status)
      }
    }, [status, isActive]),
  )

  console.log('---------JobPage----------')

  const renderItem: ListRenderItem<JobItem> = ({ item, index }) => {
    return (
      <JobAdminItem
        {...item}
        onPress={() => navigation.navigate('JobDetail', { jobId: item.jobId })}
      />
    )
  }

  return (
    <LoadingAndError
      loading={loading && items === undefined}
      style={StyleSheet.absoluteFillObject}
      collapsable={false}>
      {items && (
        <FlatList
          style={styles.container}
          contentContainerStyle={styles.content}
          keyExtractor={(job: JobItem, index: number) => String(job.jobId)}
          data={items}
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
