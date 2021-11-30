import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import IconButton from '../../components/IconButton'
import Colleagues from '../Colleagues'
import Hotline from '../Hotline'
import { isIphoneX } from 'react-native-iphone-x-helper'
import MaskedInput from './MaskedInput'
import { useState } from 'react'
import PrimaryButton from '../../components/PrimaryButton'

export const CompanyAuthenticationByColleagueWithSmsInputOptions: StackNavigationOptions =
  {
    title: '同事协助认证',
    headerRight: () => (
      <IconButton
        icon={require('../images/more.png')}
        style={{ marginRight: 11 }}
      />
    ),
  }

export default function CompanyAuthenticationByColleagueWithSmsInput() {
  const [sms, setSms] = useState('')

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <View style={styles.smsContainer}>
        <Text style={styles.smsTitle}>输入短信验证码</Text>
        <Text style={styles.smsDetail}>
          已向您的同事（手机尾数2233）发送验证码，验证码今日有效，请尽快联系同事索要验证码
        </Text>
        <MaskedInput
          style={styles.maskedInput}
          value={sms}
          onValueChange={setSms}
        />
        <PrimaryButton style={styles.button} title="提交验证" />
      </View>
      <Colleagues style={styles.colleagues} />
      <Hotline style={styles.hotline} />
    </ScrollView>
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
  smsContainer: {
    paddingHorizontal: 11,
    marginTop: 16,
  },
  smsTitle: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  smsDetail: {
    marginTop: 9,
    color: '#333333',
    fontSize: 12,
    lineHeight: 16,
    marginRight: 19,
  },
  maskedInput: {
    marginHorizontal: 14,
    marginTop: 14,
  },
  button: {
    height: 55,
    marginTop: 45,
    marginHorizontal: 10,
  },
  colleagues: {
    marginTop: 30,
  },
  hotline: {
    position: 'absolute',
    left: 21,
    bottom: isIphoneX() ? 87 : 53,
  },
})
