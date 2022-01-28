import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextButton from '../../components/TextButton'
import GradientButton from '../../components/GradientButton'
import NavBar from '../../components/NavBar'
import { StackScreenProps } from '@react-navigation/stack'
import { HrParamList } from '../typings'
import useEmailVerifyCode from './useEmailVerifyCode'
import useEditEmail from './useEditEmail'
import RootLoading from '../../../utils/rootLoading'
import { useCountdown } from '../../hooks/useCountdown'

function isValidEmail(email: string) {
  const regx = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  return regx.test(email)
}

export default function EditHrEmail({
  navigation,
  route,
}: StackScreenProps<HrParamList, 'EditHrEmail'>) {
  const { email } = route.params
  const [emailInput, setEmailInput] = useState(email || '')
  const emailValid = isValidEmail(emailInput)

  const { requestEmailVerifyCode, loading, error } = useEmailVerifyCode()
  const { countdown, startCountdown } = useCountdown(30)

  useEffect(() => {
    if (error) {
      RootLoading.info(error.message)
    }
  }, [error])

  const codeButtonDisabled = !emailValid || loading || countdown !== 0

  const [code, setCode] = useState('')
  const confirmButtonDisabled = !emailValid || !code
  const editEmail = useEditEmail()

  return (
    <View style={styles.container}>
      <NavBar title="公司邮箱" />
      <KeyboardAwareScrollView
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={'on-drag'}
        enableResetScrollToCoords={false}
        style={styles.container}
        contentContainerStyle={styles.content}>
        <View style={styles.item}>
          <Text style={styles.title}>
            公司邮箱<Text style={styles.required}> *</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={emailInput}
            onChangeText={setEmailInput}
            placeholder="请输入公司邮箱"
            placeholderTextColor="#BBBBBB"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
          />
          {!emailValid && (
            <Text style={styles.error}>提示：您输入的邮箱地址有误</Text>
          )}
          <Text style={styles.hint}>{`1、不建议使用个人邮箱
2、验证公司邮箱可提供公司招聘的安全级别`}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>邮箱验证码</Text>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder="请输入验证码"
            placeholderTextColor="#BBBBBB"
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCompleteType="off"
          />
          <TextButton
            title={countdown > 0 ? `重新获取${countdown}s` : '获取验证码'}
            style={styles.captchaButton}
            disabled={codeButtonDisabled}
            textStyle={[
              styles.captchaText,
              codeButtonDisabled ? styles.captchaTextDisabled : undefined,
            ]}
            onPress={() => {
              startCountdown()
              requestEmailVerifyCode(emailInput)
            }}
          />
        </View>
        <GradientButton
          title="确认"
          style={styles.button}
          disabled={confirmButtonDisabled}
          onPress={async () => {
            try {
              RootLoading.loading('请稍后...')
              await editEmail(emailInput, code)
              RootLoading.info('邮箱修改成功!')
              navigation.navigate('HrProfile', { email: emailInput })
            } catch (e) {
              RootLoading.info(e.message)
            }
          }}
        />
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
