import React, { useState, useMemo, useEffect } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import BottomModal from '../../../components/BottomModal'
import GradientButton from '../../../components/GradientButton'
import Picker from '../../../components/Picker'
import { stringForEducation, stringForExperience } from '../../JobHelper'
import { Education } from '../../typings'
import Tab from './Tab'

interface JobAdmissionModalProps {
  tabIndex: number
  onSwitchTab: (index: number) => void
  experience?: number
  education?: Education
  salary?: number[]
  visible?: boolean
  onDismiss?: () => void
  onJobAdmissionSelected?: (
    experience: number,
    education: Education,
    salary: number[],
  ) => void
}

function range(min: number, max: number, suffix: string) {
  return Array(max - min + 1)
    .fill(1)
    .map((_, index) => `${index + min}${suffix}`)
}

function nrange(min: number, max: number, step = 1000) {
  return Array(max - min + 1)
    .fill(1)
    .map((_, index) => (index + min) * step)
}

const experienceLabels = [
  '不限',
  '1 年以下',
  '1-3 年',
  '3-5 年',
  '5-10 年',
  '10 年以上',
]
const experienceValues = [-1, 0, 1, 3, 5, 10]

const educationLabels = ['不限', '大专', '本科', '研究生', '博士']
const educationValues: Education[] = [
  'High',
  'JuniorCollege',
  'RegularCollege',
  'Postgraduate',
  'Doctor',
]

const minSalaryLabels = range(1, 490, 'k')
const minSalaryValues = nrange(1, 490)
const maxSalaryLabels = range(2, 500, 'k')
const maxSalaryValues = nrange(2, 500)
const yearEndSalaryLabels = ['不设置', ...range(13, 24, '薪')]
const yearEndSalaryValues = nrange(12, 24, 1)

export default function JobAdmissionModal({
  tabIndex,
  onSwitchTab,
  experience,
  education,
  salary,
  visible,
  onDismiss,
  onJobAdmissionSelected,
}: JobAdmissionModalProps) {
  // 工作经验
  const [selectedExperience, setSelectedExperience] = useState(-1)
  useEffect(() => {
    if (experience !== undefined) {
      setSelectedExperience(experience)
    }
  }, [experience])
  const [isExperienceSelected, setExperienceSelected] = useState(false)

  // 最低学历
  const [selectedEducation, setSelectedEducation] =
    useState<Education>('RegularCollege')
  useEffect(() => {
    if (education) {
      setSelectedEducation(education)
    }
  }, [education])
  const [isEducationSelected, setEducationSelected] = useState(false)

  // 最低薪资
  const [selectedMinSalary, setSelectedMinSalary] = useState(15 * 1000)
  useEffect(() => {
    if (salary !== undefined) {
      setSelectedMinSalary(salary[0])
    }
  }, [salary])

  // 最高薪资
  const [selectedMaxSalary, setSelectedMaxSalary] = useState(30 * 1000)
  useEffect(() => {
    if (salary !== undefined) {
      setSelectedMaxSalary(salary[1])
    }
  }, [salary])

  // 年底双薪
  const [selectedYearEndSalary, setSelectedYearEndSalary] = useState(12)
  useEffect(() => {
    if (salary !== undefined && salary.length >= 3) {
      setSelectedYearEndSalary(salary[2])
    }
  }, [salary])
  const [isSalarySelected, setSalarySelected] = useState(false)

  const completed =
    [isExperienceSelected, isEducationSelected, isSalarySelected]
      .filter((_, index) => index !== tabIndex)
      .filter(value => value).length === 2

  return (
    <BottomModal
      contentStyle={styles.modal}
      visible={visible}
      onDismiss={onDismiss}
      onRequestClose={onDismiss}>
      <View style={styles.tabs}>
        <Tab
          title="工作经验"
          checked={tabIndex === 0}
          onPress={() => onSwitchTab(0)}
        />
        <Tab
          title="最低学历"
          checked={tabIndex === 1}
          onPress={() => onSwitchTab(1)}
        />
        <Tab
          title="薪资范围"
          checked={tabIndex === 2}
          onPress={() => onSwitchTab(2)}
        />
      </View>
      <View style={styles.pannels}>
        {tabIndex === 0 && (
          <View style={styles.pannel}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              values={experienceLabels}
              selectedValue={stringForExperience(selectedExperience)}
              onValueChange={(_, index) =>
                setSelectedExperience(experienceValues[index])
              }
            />
          </View>
        )}
        {tabIndex === 1 && (
          <View style={styles.pannel}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              values={educationLabels}
              selectedValue={stringForEducation(selectedEducation)}
              onValueChange={(_, index) =>
                setSelectedEducation(educationValues[index])
              }
            />
          </View>
        )}
        {tabIndex === 2 && (
          <View style={[styles.pannel, styles.row]}>
            <Picker
              roundRectType="left"
              style={[
                styles.picker,
                { marginRight: Platform.OS === 'ios' ? -9 : 0 },
              ]}
              itemStyle={styles.pickerItem}
              values={minSalaryLabels}
              selectedValue={`${selectedMinSalary / 1000}k`}
              onValueChange={(_, index) =>
                setSelectedMinSalary(minSalaryValues[index])
              }
            />
            <Picker
              roundRectType="none"
              style={[
                styles.picker,
                { marginHorizontal: 0, borderRadius: 0, padding: 0 },
              ]}
              itemStyle={styles.pickerItem}
              values={maxSalaryLabels}
              selectedValue={`${selectedMaxSalary / 1000}k`}
              onValueChange={(_, index) =>
                setSelectedMaxSalary(maxSalaryValues[index])
              }
            />
            <Picker
              roundRectType="right"
              style={[
                styles.picker,
                { marginLeft: Platform.OS === 'ios' ? -9 : 0 },
              ]}
              itemStyle={styles.pickerItem}
              values={yearEndSalaryLabels}
              selectedValue={
                yearEndSalaryLabels[
                  yearEndSalaryValues.indexOf(selectedYearEndSalary)
                ]
              }
              onValueChange={(_, index) =>
                setSelectedYearEndSalary(yearEndSalaryValues[index])
              }
            />
          </View>
        )}
        <GradientButton
          style={styles.button}
          title={completed ? '完成' : '下一步'}
          onPress={() => {
            ;[setExperienceSelected, setEducationSelected, setSalarySelected][
              tabIndex
            ](true)

            if (completed) {
              onJobAdmissionSelected &&
                onJobAdmissionSelected(selectedExperience, selectedEducation, [
                  selectedMinSalary,
                  selectedMaxSalary,
                  selectedYearEndSalary,
                ])
              onDismiss && onDismiss()
            } else {
              if (tabIndex !== 0 && !isExperienceSelected) {
                onSwitchTab(0)
              } else if (tabIndex !== 1 && !isEducationSelected) {
                onSwitchTab(1)
              } else if (tabIndex !== 2 && !isSalarySelected) {
                onSwitchTab(2)
              }
            }
          }}
        />
      </View>
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  modal: {
    height: 264 + getBottomSpace(),
  },
  tabs: {
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  pannels: {
    flex: 1,
    paddingBottom: isIphoneX() ? getBottomSpace() : 0,
  },
  pannel: {
    flex: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
    marginHorizontal: Platform.OS === 'ios' ? 12 : 22,
  },
  pickerItem: {
    lineHeight: 48,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    marginHorizontal: 22,
    marginTop: 8,
    marginBottom: 8,
  },
})
