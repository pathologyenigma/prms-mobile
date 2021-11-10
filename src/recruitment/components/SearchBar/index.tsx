import React from 'react'
import {
  View,
  Text,
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
  value?: string
  placeholder?: TextInputProps['placeholder']
  onChangeText?: TextInputProps['onChangeText']
  onClear?: () => void
}

export default function SearchBar({
  style,
  value,
  onChangeText,
  placeholder,
}: SearchBarProps) {
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
        onChangeText={onChangeText}
        autoFocus={false}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <IconButton
        onPress={() => {
          onChangeText && onChangeText('')
        }}
        style={styles.close}
        icon={require('./close.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 33,
    borderRadius: 16.5,
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
  close: {},
})
