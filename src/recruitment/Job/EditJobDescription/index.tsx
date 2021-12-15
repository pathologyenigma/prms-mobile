import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
  Insets,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import TextButton from '../../components/TextButton'
import { useNavigation } from '@react-navigation/core'
import { TextInput } from 'react-native-gesture-handler'
import { useKeyboard } from '@react-native-community/hooks'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import NavBar from '../../components/NavBar'

const placeholder = `请输入岗位职责、任职要求等描述，至少10个字，建 议使用以下格式逐条列出： 
1、…… 
2、……  

任职要求 
1、…… 
2、……`

const offset = isIphoneX() ? getBottomSpace() : 10

export default function EditJobDescription() {
  const navigation = useNavigation<StackNavigationProp<any>>()

  const [bottomHeight, setBottomHeight] = useState(offset)
  const { keyboardShown, keyboardHeight } = useKeyboard()
  useEffect(() => {
    if (Platform.OS === 'ios') {
      setBottomHeight(keyboardShown ? keyboardHeight + 10 : offset)
    }
  }, [keyboardShown, keyboardHeight])

  return (
    <View style={styles.container}>
      <NavBar
        title="职位描述"
        headerRight={() => <TextButton title="保存" />}
      />
      <View style={styles.box}>
        <Text style={styles.note}>
          请勿输入公司邮箱、联系电话、薪资面议及外链，请不要包含性 歧视语，
          <Text
            style={styles.rule}
            suppressHighlighting={true}
            onPress={() => navigation.navigate('JobPostRule')}>
            职位发布规范
          </Text>
        </Text>
      </View>

      <TextInput
        style={styles.input}
        multiline={true}
        maxLength={1000}
        placeholder={placeholder}
        placeholderTextColor="#CCCCCC"
        textAlignVertical="top"
        autoFocus={true}
        scrollEnabled={true}
      />

      <View style={[styles.row, { bottom: bottomHeight }]}>
        <Text style={styles.count}>0</Text>
        <Text style={styles.limit}>/1000</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  box: {
    padding: 9,
    backgroundColor: '#F7F7F7',
    borderRadius: 4,
    marginHorizontal: 11,
  },
  note: {
    color: '#888888',
    fontSize: 12,
    lineHeight: 17,
  },
  rule: {
    color: '#54D693',
  },
  input: {
    margin: 14,
    padding: 0,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 16,
  },
  count: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 19,
  },
  limit: {
    color: '#CCCCCC',
    fontSize: 15,
    lineHeight: 19,
  },
})
