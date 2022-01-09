import React, { useEffect } from 'react'
import { FlatList, ListRenderItem, StyleSheet } from 'react-native'
import LoadingAndError from '../../components/LoadingAndError'
import NoMoreFooter from './NoMoreFooter'
import TalentListItem from './TalentListItem'
import UpgradeFeature from './UpgradeFeature'
import { CandidateItem, useSearchCandidates } from './useSearchCandidates'

interface TalentPageProps {
  jobName?: string
  sortByUpdatedTime: boolean
}

export default function TalentPage({
  jobName,
  sortByUpdatedTime,
}: TalentPageProps) {
  const { searchCandidates, candidates, loading } = useSearchCandidates()

  useEffect(() => {
    if (jobName) {
      searchCandidates({
        expectation: jobName,
        sortByUpdatedTime,
      })
    }
  }, [sortByUpdatedTime, jobName])

  const renderItem: ListRenderItem<CandidateItem> = ({ item }) => {
    return <TalentListItem {...item} />
  }

  return (
    <LoadingAndError
      loading={loading}
      style={StyleSheet.absoluteFillObject}
      collapsable={false}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={candidates}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={UpgradeFeature}
        ListFooterComponent={NoMoreFooter}
      />
    </LoadingAndError>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  filterButton: {
    marginRight: 11,
  },
  filterbar: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
  },
  labelGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  checkedLabelStyle: {
    color: '#7DDBA3',
    fontSize: 13,
    fontWeight: 'bold',
    // ios 垂直居中
    lineHeight: 40,
  },
  labelStyle: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 40,
    paddingHorizontal: 11,
  },
})
