import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TextButton from '../../components/TextButton'
import CheckLabelGroup from '../../components/CheckLabelGroup'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AlertModalWithTextInput from '../../components/AlertModalWithTextInput'
import NavBar from '../../components/NavBar'
import { StackScreenProps } from '@react-navigation/stack'
import { JobParamList } from '../typings'

const defaultLabels = [
  {
    title: '五险一金',
    checked: false,
  },
  {
    title: '年底双薪',
    checked: false,
  },
  {
    title: '绩效奖金',
    checked: false,
  },
  {
    title: '年终分红',
    checked: false,
  },
  {
    title: '股票期权',
    checked: false,
  },
  {
    title: '加班补助',
    checked: false,
  },
  {
    title: '全勤奖',
    checked: false,
  },
  {
    title: '员工旅行',
    checked: false,
  },
  {
    title: '节日福利',
    checked: false,
  },
  {
    title: '交通补助',
    checked: false,
  },
  {
    title: '餐补',
    checked: false,
  },
  {
    title: '房补',
    checked: false,
  },
  {
    title: '通讯补助',
    checked: false,
  },
  {
    title: '带薪年假',
    checked: false,
  },
  {
    title: '弹性工作',
    checked: false,
  },
  {
    title: '免费班车',
    checked: false,
  },
  {
    title: '定期体检',
    checked: false,
  },
  {
    title: '无试用期',
    checked: false,
  },
]

const limit = 8

export default function EditJobWelfare({
  navigation,
  route,
}: StackScreenProps<JobParamList, 'EditJobWelfare'>) {
  const { initialTags = [] } = route.params || {}

  console.log('----------render EditJobWelfare---------------------')

  const [labels, setLabels] = useState(() => {
    const labels = defaultLabels.map(v => {
      if (initialTags.includes(v.title)) {
        return { ...v, checked: true }
      }
      return { ...v }
    })
    const titles = labels.map(v => v.title)
    const customTags = initialTags.filter(t => !titles.includes(t))
    const customLabels = customTags.map(t => ({ title: t, checked: true }))
    return [...labels, ...customLabels]
  })

  const [modalVisible, setModalVisible] = useState(false)

  const handleAddLabel = useCallback(() => {
    setModalVisible(true)
  }, [])

  const handleSubmitNewLabel = useCallback((value: string) => {
    if (value === '') {
      return
    }
    setLabels(values => {
      const count = values.filter(l => l.checked).length
      const checked = count < limit
      return [...values, { title: value, checked: checked }]
    })
  }, [])

  return (
    <View style={styles.container}>
      <NavBar
        title="职位福利"
        headerRight={() => (
          <TextButton
            title="保存"
            onPress={() =>
              navigation.navigate('PostJob', {
                tags: labels.filter(v => v.checked).map(v => v.title),
              })
            }
          />
        )}
      />
      <View style={styles.content}>
        <Text style={styles.slogan}>提升职位吸引力，招聘更快捷</Text>
        <Text style={styles.count}>{`已选${
          labels.filter(l => l.checked).length
        }/${limit}个标签`}</Text>
        <CheckLabelGroup
          style={styles.group}
          labels={labels}
          onValuesChange={setLabels}
          limit={limit}
        />
        <Text style={styles.custom}>自定义标签</Text>
        <TouchableOpacity onPress={handleAddLabel} activeOpacity={0.7}>
          <Text suppressHighlighting style={styles.add}>
            + 自定义标签，最多8个字哦～
          </Text>
        </TouchableOpacity>
        <AlertModalWithTextInput
          visible={modalVisible}
          placeholder="自定义标签，最多8个字哦～"
          inputMaxLength={8}
          onDismiss={() => setModalVisible(false)}
          onSubmitValue={handleSubmitNewLabel}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 11,
    alignItems: 'flex-start',
  },
  slogan: {
    fontSize: 20,
    color: '#333333',
    fontWeight: '500',
    marginTop: 24,
  },
  count: {
    color: '#666666',
    fontSize: 12,
    marginTop: 6,
  },
  group: {
    marginTop: 26,
  },
  custom: {
    marginTop: 10,
    fontSize: 15,
    color: '#333333',
    marginBottom: 15,
  },
  add: {
    borderColor: '#CCCCCC',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 35,
    lineHeight: 35,
    overflow: 'hidden',
    paddingHorizontal: 12,
    color: '#888888',
    fontSize: 15,
  },
})
