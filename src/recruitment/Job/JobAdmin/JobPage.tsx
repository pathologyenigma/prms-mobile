import React, { useCallback, useState } from 'react'
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native'
import { JobItem, useJobList } from './useJobList'
import { JobStatus } from '../typing'
import Empty from './Empty'
import JobAdminItem from './JobAdminItem'
import { useFocusEffect } from '@react-navigation/native'

interface PageProps {
  status: JobStatus
  isActive: boolean
}

export default function JobPage({ status, isActive }: PageProps) {
  const { getJobList, items, loading } = useJobList()

  useFocusEffect(
    useCallback(() => {
      if (isActive) {
        getJobList(status)
      }
    }, [status, isActive]),
  )

  console.log('---------JobPage----------')

  const renderItem: ListRenderItem<JobItem> = ({ item, index }) => {
    return <JobAdminItem {...item} />
  }

  return (
    <View style={StyleSheet.absoluteFillObject} collapsable={false}>
      {items && (
        <FlatList
          contentContainerStyle={styles.content}
          keyExtractor={(job: JobItem, index: number) => String(job.jobId)}
          data={items}
          renderItem={renderItem}
          ListEmptyComponent={Empty}
        />
      )}
    </View>
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
