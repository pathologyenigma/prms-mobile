import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import TalentListEmpty from './TalentListEmpty'
import NavBar from './NavBar'
import { useSimpleOnlineJobs } from './useSimpleOnlineJobs'
import { StackScreenProps } from '@react-navigation/stack'
import { TalentParamList } from '../typings'
import LoadingAndError from '../../components/LoadingAndError'
import { headerHeight } from '../../theme'
import TalentPager from './TalentPager'

export default function TalentList({
  navigation,
}: StackScreenProps<TalentParamList, 'TalentList'>) {
  let { jobs: jobItems, loading } = useSimpleOnlineJobs()

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

  if ((loading && !jobItems) || (jobItems && jobItems.length === 0)) {
    return (
      <LoadingAndError
        loadingStyle={{ paddingTop: headerHeight() + 40 }}
        loading={loading}
        error={''}>
        <FocusAwareStatusBar barStyle={'dark-content'} />
        <TalentListEmpty
          onPublishPress={() => navigation.navigate('PostJob')}
        />
      </LoadingAndError>
    )
  }

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
      <TalentPager navigation={navigation} jobName={jobName} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
