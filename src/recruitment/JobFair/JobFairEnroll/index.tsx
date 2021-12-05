import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import NavBar from '../../components/NavBar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GradientButton from '../../components/GradientButton'
import { isIphoneX } from 'react-native-iphone-x-helper'
import Step from '../../components/Step'

export const JobFairEnrollOptions: StackNavigationOptions = {
  title: '页面模版',
  headerShown: false,
}

export default function JobFairEnroll() {
  const [count, setCount] = useState(1)

  return (
    <View style={styles.container}>
      <NavBar title="线下招聘会报名" />
      <KeyboardAwareScrollView
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="never"
        keyboardDismissMode={'on-drag'}
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.content}>
        <View style={styles.item}>
          <Text style={styles.title}>公司名称</Text>
          <Text style={styles.required}>{'  '}*</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="请输入公司名称"
            placeholderTextColor="#AAAAAA"
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>同行人数</Text>
          <Text style={styles.required}>{'  '}*</Text>
          <Step style={styles.step} value={count} onValueChange={setCount} />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>报名成员</Text>
          <Text style={styles.required}>{'  '}*</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="请填写报名成员"
            placeholderTextColor="#AAAAAA"
            multiline
            textAlignVertical="top"
          />
        </View>
        <GradientButton style={styles.button} title="提交报名" />
      </KeyboardAwareScrollView>
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
  },
  item: {
    flexDirection: 'row',
    marginHorizontal: 11,
    alignItems: 'center',
    height: 50,
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  required: {
    fontSize: 15,
    color: '#FF5555',
    fontWeight: 'bold',
    marginBottom: -4,
  },
  inputContainer: {
    marginHorizontal: 11,
    marginBottom: 18,
  },
  input: {
    margin: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderColor: '#EEEEEE',
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
    lineHeight: 20,
  },
  multiline: {
    height: 160,
    paddingTop: 16,
    paddingBottom: 16,
  },
  step: {
    position: 'absolute',
    right: 0,
  },
  button: {
    position: 'absolute',
    bottom: isIphoneX() ? 37 : 10,
    left: 21,
    right: 21,
  },
})
