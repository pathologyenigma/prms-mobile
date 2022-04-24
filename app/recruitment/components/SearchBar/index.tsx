import React from 'react'
import { useState } from 'react'
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  ViewStyle,
  StyleProp,
  TextInputProps,
} from 'react-native'
import IconButton from '../IconButton'

interface SearchBarProps {
  style?: StyleProp<ViewStyle>
  placeholder?: TextInputProps['placeholder']
  onChangeText?: TextInputProps['onChangeText']
}

export default function SearchBar({
  style,
  onChangeText,
  placeholder,
}: SearchBarProps) {
  const [value, setValue] = useState('')

  const handleCleanPress = () => {
    onChangeText && onChangeText('')
    setValue('')
  }

  const handleTextChange = (text: string) => {
    onChangeText && onChangeText(text)
    setValue(text)
  }

  return (
    <View style={[styles.container, style]}>
      <Image
        style={styles.icon}
        source={require('./search.png')}
        resizeMode="center"
      />
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#888888"
        onChangeText={handleTextChange}
        autoFocus={false}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {!!value && (
        <IconButton
          onPress={handleCleanPress}
          style={styles.close}
          icon={require('./close.png')}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 33,
    borderRadius: 16.5,
    flex: 1,
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 0,
    margin: 0,
    color: '#333333',
    fontSize: 13,
  },
  icon: {
    width: 44,
    height: 20,
  },
  close: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
