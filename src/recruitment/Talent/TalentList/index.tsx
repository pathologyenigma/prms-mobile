import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native'
import FilterButton from '../../components/FilterButton'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import TalentListEmpty from './TalentListEmpty'
import NavBar from './NavBar'
import NoMoreFooter from './NoMoreFooter'
import TalentListItem from './TalentListItem'
import UpgradeFeature from './UpgradeFeature'
import { useSimpleOnlineJobs } from './useSimpleOnlineJobs'
import { StackScreenProps } from '@react-navigation/stack'
import { TalentParamList } from '../typing'
import RadioGroup from '../../components/RadioGroup'
import RadioLabel from '../../components/RadioLabel'
import { CandidateItem, useSearchCandidates } from './useSearchCandidates'

interface SortItem {
  label: string
  value: boolean
}

const sorts: SortItem[] = [
  {
    label: '推荐',
    value: false,
  },
  {
    label: '最新',
    value: true,
  },
]

export default function TalentList({
  navigation,
}: StackScreenProps<TalentParamList, 'TalentList'>) {
  let jobItems = useSimpleOnlineJobs()
  const [sortByUpdatedTime, setSortByUpdatedTime] = useState(false)
  const [checkedJobId, setCheckedJobId] = useState<number>()

  useEffect(() => {
    if (jobItems && jobItems.length > 0) {
      const index = jobItems.findIndex(item => item.jobId === checkedJobId)
      if (index === -1) {
        setCheckedJobId(jobItems[0].jobId)
      }
    }
  }, [jobItems, checkedJobId])

  const jobName = jobItems?.find(job => job.jobId === checkedJobId)?.title

  const { searchCandidates, candidates } = useSearchCandidates()

  console.log(candidates)

  useEffect(() => {
    if (jobName) {
      searchCandidates({
        expectation: jobName,
        page: 1,
      })
    }
  }, [sortByUpdatedTime, jobName])

  const renderItem: ListRenderItem<CandidateItem> = ({ item }) => {
    return <TalentListItem {...item} />
  }

  if (jobItems && jobItems.length > 0) {
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar barStyle={'light-content'} />
        <NavBar
          jobs={jobItems || []}
          checkedJobId={checkedJobId}
          onJobItemChecked={setCheckedJobId}
          onPlusPress={() => navigation.navigate('JobAdmin')}
          onSearchPress={() => navigation.navigate('CandidateSearch')}
        />
        <View style={styles.filterbar}>
          <RadioGroup
            value={sortByUpdatedTime}
            onValueChecked={value => setSortByUpdatedTime(value)}>
            <View style={styles.labelGroup}>
              {sorts.map(({ label, value }) => (
                <RadioLabel
                  key={label}
                  label={label}
                  value={value}
                  style={styles.labelStyle}
                  checkedStyle={styles.checkedLabelStyle}
                />
              ))}
            </View>
          </RadioGroup>
          <FilterButton
            text={'筛选'}
            style={styles.filterButton}
            onPress={() => navigation.navigate('CandidateFilter')}
          />
        </View>
        <FlatList
          style={styles.container}
          contentContainerStyle={styles.content}
          data={candidates}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          ListHeaderComponent={UpgradeFeature}
          ListFooterComponent={NoMoreFooter}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TalentListEmpty onPublishPress={() => navigation.navigate('PostJob')} />
    </View>
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
