import { useLayout } from '@react-native-community/hooks'
import React, { useState } from 'react'
import { useRef } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'

interface MaskedInputProps {
  value: string
  onValueChange: (value: string) => void
  style?: StyleProp<ViewStyle>
}

export default function MaskedInput({
  value,
  onValueChange,
  style,
}: MaskedInputProps) {
  const inputRef = useRef<TextInput>(null)
  const { onLayout, width } = useLayout()
  const length = 6
  const w = (width - 55 + 0.5) / length
  const array = []

  for (let index = 0; index < length; index++) {
    if (value.length > index) {
      array.push(value.substr(index, 1))
    } else {
      array.push('')
    }
  }

  return (
    <View style={[styles.container, { height: w }, style]} onLayout={onLayout}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        autoFocus={false}
        keyboardType="numeric"
        maxLength={length}
        value={value}
        clearButtonMode="never"
        collapsable={false}
        onChangeText={onValueChange}
      />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <View style={[styles.maskedContainer, StyleSheet.absoluteFillObject]}>
          {array.map((value: string, index: number) => (
            <View
              style={[styles.maskedView, { width: w, height: w }]}
              key={index}>
              <Text style={styles.maskedText}>{value}</Text>
            </View>
          ))}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    padding: 0,
    margin: 0,
    width: '50%',
  },
  maskedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  maskedView: {
    borderRadius: 8,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskedText: {
    color: '#333333',
    fontSize: 17,
    fontWeight: 'bold',
  },
})
