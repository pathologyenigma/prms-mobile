import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextButton from '../../components/TextButton'
import GradientButton from '../../components/GradientButton'
import NavBar from '../../components/NavBar'
import { StackScreenProps } from '@react-navigation/stack'
import { HrParamList } from '../typings'
import RootLoading from '../../../utils/rootLoading'
import { useCountdown } from '../../hooks/useCountdown'

export default function EditHrPhoneNumber({
  navigation,
  route,
}: StackScreenProps<HrParamList, 'EditHrPhoneNumber'>) {
  return (
    <View style={styles.container}>
      <NavBar title="手机号码" />
      <KeyboardAwareScrollView
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={'on-drag'}
        enableResetScrollToCoords={false}
        style={styles.container}
        contentContainerStyle={styles.content}>
        <View style={styles.item}>
          <Text style={styles.title}>
            手机号码<Text style={styles.required}> *</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="请输入手机号码"
            placeholderTextColor="#BBBBBB"
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCompleteType="tel"
          />
          {/* {!emailValid && (
            <Text style={styles.error}>提示：您输入的邮箱地址有误</Text>
          )} */}
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>验证码</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入验证码"
            placeholderTextColor="#BBBBBB"
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCompleteType="off"
          />
          <TextButton
            title="获取验证码"
            style={styles.captchaButton}
            textStyle={[styles.captchaText]}
          />
        </View>
        <GradientButton title="确认" style={styles.button} />
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  required: {
    color: '#FF5555',
  },
  item: {
    marginHorizontal: 11,
    marginTop: 30,
  },
  input: {
    marginTop: 8,
    height: 48,
    padding: 0,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333333',
  },
  error: {
    marginTop: 10,
    color: '#FF5A5A',
    fontSize: 10,
  },
  hint: {
    color: '#888888',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 6,
  },
  captchaButton: { position: 'absolute', right: 0, bottom: 11 },
  captchaText: {
    fontSize: 13,
    lineHeight: 26,
    paddingHorizontal: 11,
    color: '#7AD398',
    backgroundColor: '#E9FFF0',
    borderWidth: 1,
    borderColor: '#98DFAF',
    borderRadius: 4,
  },
  captchaTextDisabled: {
    color: '#AAAAAA',
    backgroundColor: '#F2F2F2',
    borderColor: '#AAAAAA',
  },
  button: {
    marginHorizontal: 22,
    marginTop: 114,
  },
})
