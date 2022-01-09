import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import IconButton from '../../components/IconButton'
import JobMeta from './JobMeta'
import Collaborator from './Collaborator'
import JobIntro from './JobIntro'
import CompanyInfo from './CompanyInfo'
import Audit from './Audit'
import GhostButton from '../../components/GhostButton'
import GradientButton from '../../components/GradientButton'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import AlertModal from '../../components/AlertModal'
import NavBar from '../../components/NavBar'
import { JobParamList } from '../typings'
import useJobDetail from './useJobDetail'
import LoadingAndError from '../../components/LoadingAndError'
import useHideJob from './useHideJob'
import RootLoading from '../../../utils/rootLoading'

export default function JobDetail({
  navigation,
  route,
}: StackScreenProps<JobParamList, 'JobDetail'>) {
  const [stopHireModalVisible, setStopHireModalvisible] = useState(false)
  const { jobId } = route.params

  const { detail, loading, error, refetch } = useJobDetail(jobId)
  const hideJob = useHideJob(jobId)

  console.log(detail, error)

  return (
    <View style={styles.container}>
      <NavBar
        style={{ backgroundColor: '#F8F8F8' }}
        title=""
        headerRight={() => (
          <IconButton
            icon={require('./images/share.png')}
            style={styles.shareIcon}
          />
        )}
      />
      <LoadingAndError
        style={{ backgroundColor: '#F8F8F8' }}
        loading={loading}
        error={error}
        retry={refetch}>
        {detail && (
          <>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.content}>
              <JobMeta job={detail.job} />
              <JobIntro job={detail.job} />
              <CompanyInfo company={detail.company} />
            </ScrollView>
            <View style={styles.buttons}>
              <GhostButton
                style={styles.ghost}
                title="编辑职位"
                onPress={() =>
                  navigation.navigate('PostJob', {
                    ...detail.jobInput,
                  })
                }
              />
              <GradientButton
                style={styles.gradient}
                title="停止招聘"
                onPress={() => setStopHireModalvisible(true)}
              />
            </View>
          </>
        )}
      </LoadingAndError>

      <AlertModal
        visible={stopHireModalVisible}
        title="温馨提示"
        msg="停止招聘后，职位信息将不会在求职端展示"
        onNegativePress={() => setStopHireModalvisible(false)}
        onPositivePress={async () => {
          setStopHireModalvisible(false)
          try {
            RootLoading.loading('请稍后...')
            await hideJob()
            RootLoading.info('操作成功！')
          } catch (e) {
            RootLoading.info(e.message)
          }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#F8F8F8',
  },
  shareIcon: {
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 11,
    paddingTop: 5,
    paddingBottom: isIphoneX() ? getBottomSpace() + 5 : 5,
  },
  ghost: {
    flex: 1,
  },
  gradient: {
    width: 190,
    marginLeft: 14,
  },
})
