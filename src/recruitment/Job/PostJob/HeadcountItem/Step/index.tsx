import React from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import IconButton from '../../../../components/IconButton'

interface StepProps {
  value?: number
  onValueChange: (value: number) => void
}

export default function Step({ value = 1, onValueChange }: StepProps) {
  function handleMinus() {
    if (value - 1 > 0) {
      onValueChange(value - 1)
    }
  }

  function handlePlugs() {
    onValueChange(value + 1)
  }

  function handleChangeText(text: string) {
    const v = parseInt(text, 10)
    if (v > 0 && v != value) {
      onValueChange(v)
    }
  }

  return (
    <View style={styles.container}>
      <IconButton
        onPress={handleMinus}
        hitSlop={{ top: 12, left: 12, right: 0, bottom: 12 }}
        style={styles.button}
        icon={require('./minus.png')}
      />
      <TextInput
        style={styles.input}
        textAlign="center"
        keyboardType="numeric"
        autoFocus={false}
        value={value + ''}
        onChangeText={handleChangeText}
      />
      <IconButton
        onPress={handlePlugs}
        hitSlop={{ top: 12, left: 0, right: 12, bottom: 12 }}
        style={styles.button}
        icon={require('./plugs.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CACACA',
    borderRadius: 2,
  },
  button: {
    width: 26,
    height: 26,
  },
  input: {
    height: 26,
    width: 29,
    padding: 0,
    borderColor: '#CACACA',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
})
