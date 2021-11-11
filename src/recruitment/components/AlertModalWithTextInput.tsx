import { useKeyboard, useLayout } from '@react-native-community/hooks'
import React, { useEffect, useState } from 'react'
import {
  Modal,
  TextInput,
  View,
  Text,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native'
import GradientButton from './GradientButton'

interface AlertModalWithTextInputProps {
  visible: boolean
  modalContentStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  placeholder?: string
  inputMaxLength?: number
  onSubmitValue?: (value: string) => void
}

export default function AlertModalWithTextInput({
  visible,
  placeholder,
  inputMaxLength,
  modalContentStyle,
  inputStyle,
  onSubmitValue,
}: AlertModalWithTextInputProps) {
  const { onLayout, y, height } = useLayout()
  const { keyboardHeight, keyboardShown } = useKeyboard()

  const [marginBottom, setMarginBottom] = useState(0)

  useEffect(() => {
    const windowHeight = Dimensions.get('window').height
    console.log('windowHeight', windowHeight)
    if (keyboardShown) {
      const covered = y + height + 16 - (windowHeight - keyboardHeight)
      console.log(y, height, windowHeight, keyboardHeight, covered)
      if (covered > 0 && marginBottom == 0) {
        setMarginBottom(covered)
      }
    } else {
      setMarginBottom(0)
    }
  }, [keyboardHeight, keyboardShown, y, height, marginBottom])

  const [value, setValue] = useState('')

  const handleSubmit = () => {
    onSubmitValue && onSubmitValue(value)
    setValue('')
  }

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      presentationStyle="overFullScreen"
      animationType="fade">
      <View style={styles.modal}>
        <View
          style={[styles.content, modalContentStyle, { marginBottom }]}
          onLayout={onLayout}>
          <Text style={styles.title}>添加标签</Text>
          <TextInput
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor="#888888"
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={inputMaxLength}
            value={value}
            onChangeText={setValue}
          />
          <GradientButton
            onPress={handleSubmit}
            style={styles.button}
            title="确定"
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000088',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: 280,
    alignItems: 'center',
  },
  title: {
    color: '#333333',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 16,
  },
  input: {
    borderRadius: 5,
    borderColor: '#CCCCCC',
    borderWidth: 0.5,
    padding: 0,
    paddingHorizontal: 24,
    fontSize: 15,
    color: '#333333',
    lineHeight: 23,
    height: 46,
    width: '100%',
  },
  button: {
    marginTop: 18,
    width: 184,
    height: 45,
    borderRadius: 6,
  },
})
