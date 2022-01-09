import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import LabelAndDetail from './LabelAndDetail'
import RangeSlider from './RangeSlider'
import SecondaryButton from '../../components/SecondaryButton'
import GradientButton from '../../components/GradientButton'
import { isIphoneX } from 'react-native-iphone-x-helper'
import JobSalaryModal from './JobSalaryModal'
import NavBar from '../../components/NavBar'
import { TalentParamList } from '../typings'
import CancelableTagGroup from './CancelableTagGroup'
import RadioGroup from '../../components/RadioGroup'
import GridView from '../../components/GridView'
import RadioLabel from '../../components/RadioLabel'
import {
  educationLabels,
  educationValues,
  experienceLabels,
  experienceValues,
  stirngForSalary,
  jobStatusLabels,
  jobStatusValues,
} from '../../utils/JobHelper'
import CheckGroup from '../../components/CheckGroup'
import CheckLabel from '../../components/CheckLabel'

function getAgeRangeDesc(low?: number, high?: number) {
  if (low === undefined || high === undefined) {
    return '不限'
  }

  if (high >= 40 && low <= 16) {
    return '不限'
  }
  if (high >= 40) {
    return low + '岁以上'
  }
  return low + '-' + high + '岁'
}

const genderLabels = ['不限', '男', '女']
const genderValues = [undefined, true, false]

export default function CandidateFilter({
  navigation,
  route,
}: StackScreenProps<TalentParamList, 'CandidateFilter'>) {
  const {
    jobCategories,
    education,
    experience,
    age,
    salary,
    industryCategories,
    cities,
    gender,
    resumeJobStatus,
  } = route.params || {}

  const handleValueChange = useCallback((low: number, high: number) => {
    navigation.setParams({ age: [low, high] })
  }, [])

  const [salaryModalVisible, setSalaryModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <NavBar title="筛选" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <LabelAndDetail
            label="职位类别"
            detail={jobCategories && jobCategories.length > 0 ? '' : '不限'}
            onPress={() =>
              navigation.navigate('CandidateFilterJobCategory', {
                categories: jobCategories,
              })
            }
          />
          <CancelableTagGroup
            values={jobCategories?.map(c => c.final)}
            onValuesChange={values =>
              navigation.setParams({
                jobCategories: jobCategories?.filter(c =>
                  values.includes(c.final),
                ),
              })
            }
          />
        </View>
        <View style={styles.section}>
          <SectionHeader title="学历" />
          <RadioGroup
            value={education}
            onValueChecked={e => navigation.setParams({ education: e })}>
            <GridView style={styles.sectionBody} spacing={9}>
              {educationLabels.map((e, index) => (
                <RadioLabel
                  key={e}
                  label={e}
                  value={educationValues[index]}
                  style={styles.label}
                  checkedStyle={styles.checked}
                />
              ))}
            </GridView>
          </RadioGroup>
        </View>
        <View style={styles.section}>
          <SectionHeader title="工作经验" />
          <RadioGroup
            value={experience}
            onValueChecked={e => navigation.setParams({ experience: e })}>
            <GridView style={styles.sectionBody} spacing={9}>
              {experienceLabels.map((e, index) => (
                <RadioLabel
                  key={e}
                  label={e}
                  value={experienceValues[index]}
                  style={styles.label}
                  checkedStyle={styles.checked}
                />
              ))}
            </GridView>
          </RadioGroup>
        </View>
        <View style={styles.section}>
          <SectionHeader title="年龄" />
          <View style={styles.ageRangeSliderContainer}>
            <Text style={styles.age}>
              {getAgeRangeDesc(age?.[0], age?.[1])}
            </Text>
            <RangeSlider
              style={styles.range}
              min={16}
              max={40}
              onValueChanged={handleValueChange}
            />
            <View style={styles.limitRow}>
              <Text style={styles.limit}>16岁</Text>
              <Text style={styles.limit}>40岁以上</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <LabelAndDetail
            label="期望薪资"
            detail={salary ? stirngForSalary(salary) : '不限'}
            onPress={() => setSalaryModalVisible(true)}
          />
        </View>
        <View style={styles.section}>
          <LabelAndDetail
            label="期望行业"
            detail={
              industryCategories && industryCategories.length > 0 ? '' : '不限'
            }
            onPress={() =>
              navigation.navigate('CandidateFilterIndustryCategory', {
                categories: industryCategories,
              })
            }
          />
          <CancelableTagGroup
            values={industryCategories?.map(c => c.secondary)}
            onValuesChange={values =>
              navigation.setParams({
                industryCategories: industryCategories?.filter(c =>
                  values.includes(c.secondary),
                ),
              })
            }
          />
        </View>
        <View style={styles.section}>
          <LabelAndDetail
            label="期望城市"
            detail={cities && cities.length > 0 ? '' : '不限'}
            onPress={() =>
              navigation.navigate('CandidateFilterCity', { cities })
            }
          />
          <CancelableTagGroup
            values={cities}
            onValuesChange={values =>
              navigation.setParams({
                cities: cities?.filter(c => values.includes(c)),
              })
            }
          />
        </View>
        <View style={styles.section}>
          <SectionHeader title="求职状态" desc="/多选" />
          <CheckGroup
            values={resumeJobStatus}
            onValuesChanged={values => {
              navigation.setParams({ resumeJobStatus: values })
            }}>
            <GridView style={styles.sectionBody} spacing={53} numOfRow={2}>
              {jobStatusLabels.map((e, index) => (
                <CheckLabel key={e} label={e} value={jobStatusValues[index]} />
              ))}
            </GridView>
          </CheckGroup>
        </View>
        <View style={styles.section}>
          <SectionHeader title="性别" />
          <RadioGroup
            value={gender}
            onValueChecked={e => navigation.setParams({ gender: e })}>
            <GridView style={styles.sectionBody} spacing={9}>
              {genderLabels.map((e, index) => (
                <RadioLabel
                  key={e}
                  label={e}
                  value={genderValues[index]}
                  style={styles.label}
                  checkedStyle={styles.checked}
                />
              ))}
            </GridView>
          </RadioGroup>
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <SecondaryButton
          style={styles.secondary}
          title="重置"
          onPress={() =>
            navigation.setParams({
              jobCategories: undefined,
              education: undefined,
              experience: undefined,
              age: undefined,
              salary: undefined,
              industryCategories: undefined,
              cities: undefined,
              gender: undefined,
              resumeJobStatus: undefined,
            })
          }
        />
        <GradientButton style={styles.primary} title="确定" />
      </View>
      <JobSalaryModal
        visible={salaryModalVisible}
        onDismiss={() => setSalaryModalVisible(false)}
        salary={salary}
        onPickSalary={salary => navigation.setParams({ salary })}
      />
    </View>
  )
}

interface SectionHeaderProps {
  title: string
  desc?: string
}

function SectionHeader({ title, desc }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 32,
  },
  section: {
    paddingHorizontal: 11,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  sectionBody: {
    marginHorizontal: 10,
    marginTop: 12,
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  desc: {
    color: '#888888',
    fontSize: 12,
    marginLeft: 6,
  },
  ageRangeSliderContainer: {
    alignItems: 'stretch',
    marginTop: 12,
  },
  age: {
    color: '#79D398',
    fontSize: 13,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  range: {
    height: 32,
    flex: 1,
  },
  limitRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  limit: {
    color: '#888888',
    fontSize: 12,
  },
  buttons: {
    height: isIphoneX() ? 84 : 50,
    paddingHorizontal: 21,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: '#79D398',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 8,
  },
  secondary: {
    height: 34,
    width: 105,
  },
  primary: {
    flex: 1,
    height: 34,
    marginLeft: 9,
  },
  label: {
    color: '#666666',
    fontSize: 13,
    backgroundColor: '#F0F0F0',
    height: 34,
    lineHeight: 34,
    textAlign: 'center',
    borderRadius: 4,
    overflow: 'hidden',
  },
  checked: {
    color: '#79D398',
    backgroundColor: '#E7FEF1',
    fontWeight: 'bold',
  },
})
