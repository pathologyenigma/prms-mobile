import React from 'react'
import { useState } from 'react'
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native'
import FilterButton from '../../components/FilterButton'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import RadioLabelGroup from '../../components/RadioLabelGroup'
import TalentListEmpty from './TalentListEmpty'
import NavBar from './NavBar'
import NoMoreFooter from './NoMoreFooter'
import TalentListItem from './TalentListItem'
import UpgradeFeature from './UpgradeFeature'
import { useSimpleOnlineJobs } from './useSimpleOnlineJobs'
import { StackScreenProps } from '@react-navigation/stack'
import { TalentParamList } from '../typings'

export default function TalentList({
  navigation,
}: StackScreenProps<TalentParamList, 'TalentList'>) {
  let jobItems = useSimpleOnlineJobs()
  const [sortIndex, setSortIndex] = useState(0)

  const data = ['a', 'b']

  const renderItem: ListRenderItem<string> = ({ index, item }) => {
    return <TalentListItem key={index} />
  }

  if (jobItems && jobItems.length > 0) {
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar barStyle={'light-content'} />
        <NavBar
          jobs={jobItems || []}
          onJobItemChecked={(jobId: number) => {
            console.log('onJobItemChecked', jobId)
          }}
          onPlusPress={() => navigation.navigate('JobAdmin')}
          onSearchPress={() => navigation.navigate('CandidateSearch')}
        />
        <View style={styles.filterbar}>
          <RadioLabelGroup
            style={styles.labelGroup}
            labelStyle={styles.labelStyle}
            labelInactiveStyle={styles.labelInactiveStyle}
            labelSpace={20}
            labels={['推荐', '最新']}
            checkedIndex={sortIndex}
            onValueChange={(_, index) => setSortIndex(index)}
          />
          <FilterButton
            text={'筛选'}
            style={styles.filterButton}
            onPress={() => navigation.navigate('CandidateFilter')}
          />
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item}
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
    backgroundColor: '#FFFFFF',
  },
  filterButton: {
    marginRight: 11,
  },
  filterbar: {
    height: 40,
    flexDirection: 'row',
  },
  labelGroup: {
    flex: 1,
    paddingHorizontal: 10.5,
  },
  labelStyle: {
    color: '#7DDBA3',
    fontSize: 13,
    fontWeight: '500',
    // ios 垂直居中
    lineHeight: 40,
  },
  labelInactiveStyle: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 40,
  },
})
