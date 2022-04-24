import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TextButton from '../../components/TextButton'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AlertModalWithTextInput from '../../components/AlertModalWithTextInput'
import NavBar from '../../components/NavBar'
import { StackScreenProps } from '@react-navigation/stack'
import { JobParamList } from '../typings'
import CheckGroup from '../../components/CheckGroup'
import GridView from '../../components/GridView'
import CheckLabel from '../../components/CheckLabel'

const limit = 8

export default function EditJobWelfare({
  navigation,
  route,
}: StackScreenProps<JobParamList, 'EditJobWelfare'>) {
  const { initialTags = [] } = route.params || {}
  console.log('----------render EditJobWelfare---------------------')

  const [checkedLabels, setChackedLabels] = useState(initialTags)
  const [labels, setLabels] = useState([])
  useEffect(() => {
  	HTAPI.request('/preludeDatas/welfares.json').then(response => {
  		const labels = initialTags.filter(l => !response.includes(l))
    	setLabels([...response, ...labels])
  	})
  }, [])

  const [modalVisible, setModalVisible] = useState(false)

  const handleAddLabel = useCallback(() => {
    setModalVisible(true)
  }, [])

  const handleSubmitNewLabel = useCallback((value: string) => {
    if (value === '') {
      return
    }
    setLabels(labels => {
      if (labels.includes(value)) {
        return labels
      }
      return [...labels, value]
    })
    setChackedLabels(labels => {
      if (labels.includes(value) || labels.length >= limit) {
        return labels
      }
      return [...labels, value]
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
                tags: checkedLabels,
              })
            }
          />
        )}
      />
      <View style={styles.content}>
        <Text style={styles.slogan}>提升职位吸引力，招聘更快捷</Text>
        <Text
          style={
            styles.count
          }>{`已选${checkedLabels.length}/${limit}个标签`}</Text>
        <CheckGroup
          limit={8}
          values={checkedLabels}
          onValuesChanged={setChackedLabels}>
          <GridView style={styles.group}>
            {labels.map(label => (
              <CheckLabel key={label} label={label} value={label} />
            ))}
          </GridView>
        </CheckGroup>
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
