import React, { useState } from 'react'
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
import { JobParamList } from '../typings'
import {
  stirngForSalary,
  stringForEducation,
  stringForExperience,
  stringForFullTime,
} from '../../utils/JobHelper'

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

export default function PostJob({ navigation, route }: Props) {
  const {
    jobId,
    jobName,
    jobDescription,
    jobNature = 'Full',
    jobCategory = [],
    experience,
    education = 'Null',
    salary,
    tags,
    headcount = 1,
    workingAddress,
    coordinates,
  } = route.params || {}
  console.log(route.params)
  
  const editing = jobId !== undefined

  const [jobNatureModalVisible, setJobNatureModalVisible] = useState(false)
  const [jobAdmissionIndex, setJobAdmissionIndex] = useState(0)
  const [jobAdmissionModalVisible, setJobAdmissionModalVisible] =
    useState(false)

  return (
    <View style={{ flex: 1 }}>
      <NavBar title={editing ? '编辑职位' : '发布职位'} />
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
            navigation.push('EditJobName', {
              initialName: jobName,
              callback: (_navigation, jobName) => {
              	navigation.setParams({ jobName })
              }
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
          onPress={() => {
          	navigation.push('JobSelectZhiwei', {
              selectJobTypeCallback: (e: any) => {
              	navigation.setParams({
              		jobCategory: e
              	})
              }
            })
          }}
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
          onJobAdmissionSelected={(experience, education, salary) =>
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
            navigation.push('EditJobDescription', {
              initialDescription: jobDescription,
              callback: (_navigation, valueList) => {
              	navigation.setParams(valueList)
              }
            })
          }
        />
        <JobInfoItem
          title="工作地址"
          placeholder="请填写"
          content={computeDisplayAddress(workingAddress)}
          onPress={() =>
            navigation.push('EditJobAddress', {
              coordinates,
              workingAddress,
              callback: (_navigation, valueList) => {
              	navigation.setParams(valueList)
              }
            })
          }
        />
        <JobInfoItem
          title="职位福利（选填）"
          placeholder="如：年底双薪"
          content={tags && tags.length > 0 ? tags.join('+') : undefined}
          onPress={() =>
            navigation.push('EditJobWelfare', { initialTags: tags, callback: (_navigation, valueList) => {
            	navigation.setParams(valueList)
            } })
          }
        />
        <HeadcountItem
          value={headcount}
          onValueChange={value => navigation.setParams({ headcount: value })}
        />
        <GradientButton
          title={editing ? '保存' : '立即发布'}
          style={styles.postButton}
          onPress={async () => {
          	if (!jobName || !jobCategory || !workingAddress || !experience || !salary || !education || !jobDescription) {
          		return
          	}
            if (editing) {
	        	Hud.show('请稍后...')
	            HTAPI.HREditJob({
	            	info: {
	            		id: jobId,
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
	            	}
	            }).then(response => {
	            	Hud.hidden()
	            	Toast.show('操作成功')
	            	navigation.goBack()
	            })
            } else {
            	Hud.show('请稍后...')
            	HTAPI.HRPostJob({
            		info: {
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
            		}
            	}).then(response => {
            		Hud.hidden()
            		Toast.show('操作成功')
            		navigation.goBack()
            	})
            }
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
