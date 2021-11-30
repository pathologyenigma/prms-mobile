import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GradientButton from '../../components/GradientButton'
import TextButton from '../../components/TextButton'
import { TextInputProps } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import IconButton from '../../components/IconButton'
import PrimaryButton from '../../components/PrimaryButton'

export const HrAuthenticationOptions: StackNavigationOptions = {
  title: '实名认证',
  headerRight: () => (
    <IconButton
      icon={require('../images/more.png')}
      style={{ marginRight: 11 }}
    />
  ),
}

export default function HrAuthentication() {
  return (
    <KeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode={'on-drag'}
      enableResetScrollToCoords={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}>
      <View style={styles.hintContainer}>
        <Text style={styles.hint}>
          你的信息仅用于认证，趁早找不会保留你的任何信息请填写你的真实姓名
        </Text>
      </View>
      <LabelAndInput label="真实姓名" placeholder="请输入您的姓名" />
      <LabelAndInput label="身份证号" placeholder="请输入您的身份证号" />
      <PrimaryButton style={styles.next} title="下一步" />
      <TextButton
        style={styles.illustrate}
        textStyle={styles.illustrateText}
        title="《实名认证规则说明》"
      />
    </KeyboardAwareScrollView>
  )
}

interface LabelAndInputProps {
  label: string
  placeholder: string
  value?: string
  onValueChange?: (text: string) => void
  keyboardType?: TextInputProps['keyboardType']
}

function LabelAndInput({
  label,
  placeholder,
  value,
  onValueChange,
  keyboardType = 'default',
}: LabelAndInputProps) {
  return (
    <View style={styles.labelAndInput}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888888"
        textAlignVertical="center"
        textAlign="right"
        value={value}
        onChangeText={onValueChange}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
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
  hintContainer: {
    height: 50,
    marginLeft: 11,
    width: 300,
    justifyContent: 'center',
  },
  hint: {
    color: '#888888',
    fontSize: 13,
    lineHeight: 17,
  },
  labelAndInput: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 11,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    color: '#333333',
    lineHeight: 36,
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    padding: 0,
    margin: 0,
    marginLeft: 16,
    height: 36,
    flex: 1,
    color: '#666666',
    fontSize: 15,
  },
  next: {
    marginTop: 138,
    marginHorizontal: 21,
    height: 55,
  },
  illustrate: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: isIphoneX() ? 46 : 12,
  },
  illustrateText: {
    color: '#57DE9E',
    fontSize: 11,
    fontWeight: 'bold',
  },
})
