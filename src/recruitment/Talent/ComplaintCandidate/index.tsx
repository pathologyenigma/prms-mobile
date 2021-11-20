import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import TextInputWithCounter from '../../components/TextInputWithCounter'
import GradientButton from '../../components/GradientButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePickView from '../../components/ImagePickerView'
import RadioWithLabel from './RadioWithLabel'

export const ComplaintCandidateOptions: StackNavigationOptions = {
  title: '举报',
}

const types = [
  '虚假简历',
  '违法诈骗简历',
  '人身攻击/污言秽语',
  '广告简历',
  '其他原因',
]

export default function ComplaintCandidate() {
  const [images, setImages] = useState<Array<string>>([])

  const [selectedIndex, setSelectedIndex] = useState(0)

  const renderType = (type: string, index: number) => {
    return (
      <RadioWithLabel
        style={styles.type}
        key={type}
        title={type}
        checked={selectedIndex === index}
        onPress={() => setSelectedIndex(index)}
      />
    )
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.content}
      automaticallyAdjustContentInsets={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode={'on-drag'}
      enableResetScrollToCoords={false}>
      <View style={styles.row}>
        <Text style={styles.hint}>请选择举报类型</Text>
        <Text style={styles.required}>必填</Text>
      </View>
      <View style={styles.types}>{types.map(renderType)}</View>
      <Text style={styles.title}>原因描述</Text>
      <TextInputWithCounter
        style={styles.inputWithCounter}
        inputStyle={styles.input}
        countStyle={styles.count}
        placeholder="补充更详细的说明，可帮助工作人员更快定位问题，快速处理"
        placeholderTextColor="#AAAAAA"
        maxLength={200}
        autoFocus={false}
      />
      <Text style={styles.title}>证据截图（最多3张）</Text>
      <View style={styles.gallery}>
        <ImagePickView values={images} onValuesChange={setImages} limit={3} />
      </View>
      <GradientButton style={styles.button} title="提交" />
      <Text style={styles.tips}>
        点击“提交”即表示您愿意遵守
        <Text suppressHighlighting style={styles.link} onPress={() => {}}>
          《用户协议》
        </Text>
        和
        <Text suppressHighlighting style={styles.link} onPress={() => {}}>
          《个人信息保护政策》
        </Text>
        {`并同意 1、您同意并授权平台对您提交的举报材料及相关信息记录进行核实。
2、您知悉并理解投诉行为的严肃性，如涉嫌虚假投诉/举报应承担相应的法律后果。`}
      </Text>
    </KeyboardAwareScrollView>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
  },
  hint: {
    color: '#666666',
    fontSize: 15,
  },
  required: {
    color: '#FF8589',
    fontSize: 11,
    borderWidth: 1,
    borderColor: '#FF8589',
    borderRadius: 4,
    paddingHorizontal: 6,
    marginLeft: 6,
  },
  types: {
    marginVertical: 10,
  },
  type: {
    height: 36,
  },
  inputWithCounter: {
    height: 90,
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    padding: 8,
    color: '#333333',
    fontSize: 12,
    backgroundColor: '#F7F7F7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  count: {
    fontSize: 12,
    color: '#888888',
  },
  button: {
    marginTop: 40,
    height: 55,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  tips: {
    marginVertical: 16,
    marginHorizontal: 10,
    fontSize: 10,
    color: '#666666',
    lineHeight: 14,
  },
  link: {
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
