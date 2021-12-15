import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import TextInputWithCounter from '../../components/TextInputWithCounter'
import GradientButton from '../../components/GradientButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePickView from '../../components/ImagePickerView'
import NavBar from '../../components/NavBar'

export default function RechargeFeekback() {
  const [images, setImages] = useState<Array<string>>([])

  return (
    <View style={{ flex: 1 }}>
      <NavBar title="问题反馈" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={'on-drag'}
        enableResetScrollToCoords={false}>
        <Text style={styles.title}>金币相关：充值遇到问题，余额异常</Text>
        <TextInputWithCounter
          style={styles.inputWithCounter}
          inputStyle={styles.input1}
          placeholder="补充更详细的说明，可帮助工作人员更快定位问题，快速处理"
          placeholderTextColor="#AAAAAA"
          maxLength={300}
          autoFocus={false}
        />
        <Text style={styles.title}>联系方式</Text>
        <TextInput
          style={styles.input2}
          placeholder="请输入手机号码"
          placeholderTextColor="#AAAAAA"
          keyboardType="phone-pad"
          autoFocus={false}
        />
        <Text style={styles.title}>证据截图（最多3张）</Text>
        <View style={styles.gallery}>
          <ImagePickView values={images} onValuesChange={setImages} limit={3} />
        </View>
        <GradientButton style={styles.button} title="提交" />
        <Text style={styles.tip}>
          温馨提示：充值金币未到账必须提供
          <Text suppressHighlighting style={styles.tipLink}>
            充值账单截图
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 11,
  },
  title: {
    color: '#333333',
    fontSize: 17,
    marginTop: 20,
    fontWeight: 'bold',
  },
  inputWithCounter: {
    height: 100,
    marginTop: 16,
  },
  input1: {
    padding: 8,
    color: '#333333',
    fontSize: 12,
    backgroundColor: '#F7F7F7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  input2: {
    marginTop: 16,
    padding: 8,
    color: '#333333',
    fontSize: 14,
    backgroundColor: '#F7F7F7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  button: {
    marginTop: 40,
    height: 55,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  tip: {
    marginVertical: 16,
    marginHorizontal: 10,
    fontSize: 10,
    color: '#666666',
    lineHeight: 14,
  },
  tipLink: {
    color: '#57DE9E',
  },
  imageButton: {
    height: 100,
    width: 100,
  },
  gallery: {
    marginTop: 16,
  },
})
