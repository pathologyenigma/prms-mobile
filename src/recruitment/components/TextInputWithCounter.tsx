import React, { useCallback, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native'

interface TextInputWithCounterProps {
  placeholder: TextInputProps['placeholder']
  placeholderTextColor?: TextInputProps['placeholderTextColor']
  maxLength?: TextInputProps['maxLength']
  inputStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  value?: string
  onChangeText?: TextInputProps['onChangeText']
  autoFocus?: TextInputProps['autoFocus']
}

export default function TextInputWithCounter({
  placeholder,
  placeholderTextColor = '#CCCCCC',
  maxLength = 1000,
  inputStyle,
  style,
  value,
  onChangeText,
  autoFocus = true,
}: TextInputWithCounterProps) {
  const [count, setCount] = useState(0)
  const handleChangeText = useCallback(
    (text: string) => {
      setCount(text.length)
      onChangeText && onChangeText(text)
    },
    [onChangeText],
  )

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.input, inputStyle]}
        multiline={true}
        maxLength={maxLength}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        textAlignVertical="top"
        autoFocus={autoFocus}
        autoCorrect={false}
        autoCapitalize="none"
        scrollEnabled={true}
        value={value}
        onChangeText={handleChangeText}
      />
      <View style={styles.row}>
        <Text style={styles.count}>{count}</Text>
        <Text style={styles.limit}>{`/${maxLength}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  input: {
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
