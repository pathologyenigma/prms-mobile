import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import LabelAndDetail from './LabelAndDetail'
import CheckLabelGroup from '../../components/CheckLabelGroup'
import RangeSlider from './RangeSlider'
import SecondaryButton from '../../components/SecondaryButton'
import GradientButton from '../../components/GradientButton'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { useNavigation } from '@react-navigation/native'
import JobSalaryModal from './JobSalaryModal'
import CancelableTag from './CancelableTag'
import NavBar from '../../components/NavBar'

export default function CandidateFilter() {
  const [selectedCategories, setSelectedCategories] = useState(['产品经理'])

  const [educations, setEducations] = useState([
    { title: '不限', checked: true },
    { title: '高中', checked: false },
    { title: '大专', checked: false },
    { title: '本科', checked: false },
    { title: '硕士', checked: false },
    { title: '博士', checked: false },
  ])

  const [experiences, setExperiences] = useState([
    { title: '不限', checked: true },
    { title: '在校/应届', checked: false },
    { title: '1 年以下', checked: false },
    { title: '1-3 年', checked: false },
    { title: '3-5 年', checked: false },
    { title: '5-10 年', checked: false },
    { title: '10 年以上', checked: false },
  ])

  const [intentions, setIntentions] = useState([
    { title: '不限', checked: true },
    { title: '离职-正在找工作', checked: false },
    { title: '在职-正在找工作', checked: false },
    { title: '在职-正在找工作', checked: false },
    { title: '在职-暂时不找工作', checked: false },
  ])

  const [genders, setGenders] = useState([
    { title: '不限', checked: true },
    { title: '男', checked: false },
    { title: '女', checked: false },
  ])

  const [ageLow, setAgeLow] = useState(16)
  const [ageHigh, setAgeHigh] = useState(40)
  const handleValueChange = useCallback((low, high) => {
    setAgeLow(low)
    setAgeHigh(high)
  }, [])

  function getAgeCondition(low: number, high: number) {
    if (high >= 40 && low <= 16) {
      return '不限'
    }
    if (high >= 40) {
      return low + '岁以上'
    }
    return low + '-' + high + '岁'
  }

  const [salaryModalVisible, setSalaryModalVisible] = useState(false)

  // 期望行业
  const [selectedTrades, setSelectedTrades] = useState([
    '人工智能',
    '信息安全',
    '计算机硬件',
  ])

  const [selectedCities, setSelectedCities] = useState(['深圳'])

  const navigation = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={styles.container}>
      <NavBar title="筛选" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <LabelAndDetail
            label="职位类别"
            detail="不限"
            onPress={() => navigation.navigate('JobCategory')}
          />
          <CancelableTagGroup
            values={selectedCategories}
            onValuesChange={setSelectedCategories}
          />
        </View>
        <View style={styles.section}>
          <SectionHeader title="学历" desc="/多选" />
          <CheckLabelGroup
            style={styles.sectionBody}
            labels={educations}
            onValuesChange={setEducations}
            limit={5}
            numOfRow={3}
            horizontalSpace={9}
          />
        </View>
        <View style={styles.section}>
          <SectionHeader title="工作经验" />
          <CheckLabelGroup
            style={styles.sectionBody}
            labels={experiences}
            onValuesChange={setExperiences}
            limit={1}
            numOfRow={3}
            horizontalSpace={9}
          />
        </View>
        <View style={styles.section}>
          <SectionHeader title="年龄" />
          <View style={styles.ageRangeSliderContainer}>
            <Text style={styles.age}>{getAgeCondition(ageLow, ageHigh)}</Text>
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
            detail="不限"
            onPress={() => setSalaryModalVisible(true)}
          />
        </View>
        <View style={styles.section}>
          <LabelAndDetail label="期望行业" detail="不限" />
          <CancelableTagGroup
            values={selectedTrades}
            onValuesChange={setSelectedTrades}
          />
        </View>
        <View style={styles.section}>
          <LabelAndDetail label="期望工作地点" detail="不限" />
          <CancelableTagGroup
            values={selectedCities}
            onValuesChange={setSelectedCities}
          />
        </View>
        <View style={styles.section}>
          <SectionHeader title="求职状态" desc="/多选" />
          <CheckLabelGroup
            style={styles.sectionBody}
            labels={intentions}
            onValuesChange={setIntentions}
            limit={5}
            numOfRow={2}
            horizontalSpace={53}
          />
        </View>
        <View style={styles.section}>
          <SectionHeader title="性别" />
          <CheckLabelGroup
            style={styles.sectionBody}
            labels={genders}
            onValuesChange={setGenders}
            limit={1}
            numOfRow={3}
            horizontalSpace={9}
          />
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <SecondaryButton style={styles.secondary} title="重置" />
        <GradientButton style={styles.primary} title="确定" />
      </View>
      <JobSalaryModal
        visible={salaryModalVisible}
        onCancel={() => setSalaryModalVisible(false)}
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

interface CancelableTagGroupProps {
  values: string[]
  onValuesChange: (values: string[]) => void
}

function CancelableTagGroup({
  values,
  onValuesChange,
}: CancelableTagGroupProps) {
  return (
    <View style={styles.tags}>
      {values.map(value => (
        <CancelableTag
          style={styles.tag}
          textStyle={styles.tagText}
          iconStyle={styles.tagIcon}
          tag={value}
          key={value}
          onClose={() => onValuesChange(values.filter(v => v !== value))}
        />
      ))}
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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  tag: {
    marginRight: 9,
    marginBottom: 9,
    height: 30,
    paddingLeft: 12,
    paddingRight: 6,
  },
  tagText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tagIcon: {
    marginLeft: 6,
  },
})
