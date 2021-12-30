import React, { useState } from 'react'
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native'
import { JobItem, useJobList } from './useJobList'
import { JobStatus } from '../typing'
import Empty from './Empty'
import JobAdminItem from './JobAdminItem'
import { useEffect } from 'react'

interface PageProps {
  status: JobStatus
}

export default function JobPage({ status }: PageProps) {
  const { items, loading } = useJobList(status)

  const renderItem: ListRenderItem<JobItem> = ({ item, index }) => {
    return <JobAdminItem {...item} />
  }

  return (
    <View style={StyleSheet.absoluteFillObject} collapsable={false}>
      {items && (
        <FlatList
          contentContainerStyle={styles.content}
          keyExtractor={(job: JobItem, index: number) => job.jobId}
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
