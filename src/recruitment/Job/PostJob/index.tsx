import React, { useState, useEffect } from 'react'
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import GradientButton from '../../components/GradientButton'
import AdmissionPicker from './AdmissionPicker'
import DropdownButton from './DropdownButton'
import HeadcountItem from './HeadcountItem'
import JobInfoItem from './JobInfoItem'
import JobNatureModal from './JobNatureModal'
import JobAdmissionModal from './JobAdmissionModal'
import NavBar from '../../components/NavBar'
import { StackScreenProps } from '@react-navigation/stack'
import { Education, JobParamList } from '../typing'
import {
  stirngForSalary,
  stringForEducation,
  stringForExperience,
  stringForFullTime,
} from '../JobHelper'
import { usePostJob } from './usePostJob'
import RootLoading from '../../../utils/rootLoading'

function computeDisplayAddress(workingAddress?: string[]) {
  if (!workingAddress) {
    return undefined
  }

  if (workingAddress.length >= 8) {
    return `${workingAddress[6]}${workingAddress[7]}`
  }

  if (workingAddress.length >= 7) {
    return workingAddress[6]
  }

  return ''
}

type Props = StackScreenProps<JobParamList, 'PostJob'>

function PostJob({ navigation, route }: Props) {
  const {
    jobName,
    jobDescription,
    jobNature = 'Full',
    jobCategory = [],
    experience,
    education = 'RegularCollege',
    salary,
    tags,
    headcount = 1,
    workingAddress,
    coordinates,
  } = route.params || {}

  console.log(route.params)

  const postJob = usePostJob()

  const [jobNatureModalVisible, setJobNatureModalVisible] = useState(false)
  const [jobAdmissionIndex, setJobAdmissionIndex] = useState(0)
  const [jobAdmissionModalVisible, setJobAdmissionModalVisible] =
    useState(false)

  return (
    <View style={{ flex: 1 }}>
      <NavBar title="发布职位" />
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle="dark-content" />
        <JobInfoItem
          title="职位名称"
          placeholder="请填写职位名称，如：产品经理"
          content={jobName}
          renderIndicator={() => (
            <DropdownButton
              title={stringForFullTime(jobNature)}
              onPress={() => setJobNatureModalVisible(true)}
            />
          )}
          onPress={() =>
            navigation.navigate('EditJobName', {
              initialName: jobName,
            })
          }
        />
        <JobNatureModal
          visible={jobNatureModalVisible}
          initialValue={jobNature}
          onValueSelected={value => navigation.setParams({ jobNature: value })}
          onDismiss={() => setJobNatureModalVisible(false)}
        />
        <JobInfoItem
          title="职位类型"
          placeholder="请选择"
          content={jobCategory.join(' | ')}
          onPress={() => navigation.navigate('EditJobCategory')}
        />
        <View style={styles.admission}>
          <AdmissionPicker
            title="工作经验"
            detail={
              experience !== undefined
                ? stringForExperience(experience)
                : undefined
            }
            onPress={() => {
              setJobAdmissionIndex(0)
              setJobAdmissionModalVisible(true)
            }}
          />
          <View style={styles.verticalDiviver} />
          <AdmissionPicker
            title="最低学历"
            detail={stringForEducation(education)}
            onPress={() => {
              setJobAdmissionIndex(1)
              setJobAdmissionModalVisible(true)
            }}
          />
          <View style={styles.verticalDiviver} />
          <AdmissionPicker
            title="薪资范围"
            detail={salary !== undefined ? stirngForSalary(salary) : undefined}
            onPress={() => {
              setJobAdmissionIndex(2)
              setJobAdmissionModalVisible(true)
            }}
          />
          <View style={styles.diviver} />
        </View>
        <JobAdmissionModal
          tabIndex={jobAdmissionIndex}
          onSwitchTab={setJobAdmissionIndex}
          experience={experience}
          education={education}
          salary={salary}
          visible={jobAdmissionModalVisible}
          onDismiss={() => setJobAdmissionModalVisible(false)}
          onJobAdmissionSelected={(
            experience: number,
            education: Education,
            salary: number[],
          ) =>
            navigation.setParams({
              experience,
              education,
              salary,
            })
          }
        />
        <JobInfoItem
          title="职位描述"
          placeholder="请详细描述岗位职责及任职要求"
          content={jobDescription}
          onPress={() =>
            navigation.navigate('EditJobDescription', {
              initialDescription: jobDescription,
            })
          }
        />
        <JobInfoItem
          title="工作地址"
          placeholder="请填写"
          content={computeDisplayAddress(workingAddress)}
          onPress={() =>
            navigation.navigate('EditJobAddress', {
              coordinates,
              workingAddress,
            })
          }
        />
        <JobInfoItem
          title="职位福利（选填）"
          placeholder="如：年底双薪"
          content={tags && tags.length > 0 ? tags.join('+') : undefined}
          onPress={() =>
            navigation.navigate('EditJobWelfare', { initialTags: tags })
          }
        />
        <HeadcountItem
          value={headcount}
          onValueChange={value => navigation.setParams({ headcount: value })}
        />
        <GradientButton
          title="立即发布"
          style={styles.postButton}
          onPress={() => {
            postJob({
              jobTitle: jobName,
              workingAddress,
              experience,
              salary,
              education,
              description: jobDescription,
              requiredNum: headcount,
              isFullTime: jobNature,
              tags: tags || [],
              coordinates,
              publishNow: true,
              category: jobCategory,
            })
          }}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 60,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
  },
  admission: {
    height: 88,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: 9,
  },
  diviver: {
    backgroundColor: '#ECECEC',
    height: 0.5,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  verticalDiviver: {
    backgroundColor: '#ECECEC',
    width: 1,
    height: 19,
    marginBottom: -2,
  },
  postButton: {
    marginTop: 68,
    marginHorizontal: 24,
  },
})

export default PostJob
