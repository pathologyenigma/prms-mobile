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
import useSmsVerifyCode from './useSmsVerifyCode'
import useEditPhoneNumber from './useEditPhoneNumber'

function isValidPhoneNumber(phoneNumber: string) {
  return phoneNumber.length === 11
}

export default function EditHrPhoneNumber({
  navigation,
  route,
}: StackScreenProps<HrParamList, 'EditHrPhoneNumber'>) {
  const { phoneNumber } = route.params
  const [phoneNumberInput, setPhoneNumberInput] = useState(phoneNumber || '')
  const phoneNumberValid = isValidPhoneNumber(phoneNumberInput)

  const { requestSmsVerifyCode, loading, error } = useSmsVerifyCode()
  const [verifyCode, setVerifyCode] = useState('')
  const { countdown, startCountdown } = useCountdown(30)

  useEffect(() => {
    if (error) {
      RootLoading.info(error.message)
    }
  }, [error])

  const codeButtonDisabled = !phoneNumberValid || loading || countdown !== 0
  const confirmButtonDisabled = !phoneNumberValid || !verifyCode

  const editPhoneNumber = useEditPhoneNumber(phoneNumberInput, verifyCode)

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
            value={phoneNumberInput}
            onChangeText={setPhoneNumberInput}
            placeholder="请输入手机号码"
            placeholderTextColor="#BBBBBB"
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCompleteType="tel"
            maxLength={11}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>验证码</Text>
          <TextInput
            style={styles.input}
            value={verifyCode}
            onChangeText={setVerifyCode}
            placeholder="请输入验证码"
            placeholderTextColor="#BBBBBB"
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCompleteType="off"
          />
          <TextButton
            title={countdown > 0 ? `重新获取${countdown}s` : '获取验证码'}
            style={styles.captchaButton}
            textStyle={[
              styles.captchaText,
              codeButtonDisabled ? styles.captchaTextDisabled : undefined,
            ]}
            disabled={codeButtonDisabled}
            onPress={() => {
              startCountdown()
              requestSmsVerifyCode(phoneNumberInput)
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
              await editPhoneNumber()
              RootLoading.info('手机号码修改成功!')
              navigation.navigate('HrProfile', {
                phoneNumber: phoneNumberInput,
              })
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
