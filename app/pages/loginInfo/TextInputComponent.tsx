import React, { PureComponent } from 'react'
import { View, Text, TextInput, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import { TextInputProps } from '@ant-design/react-native/lib/textarea-item'

const styles = StyleSheet.create({
  container: {
    height: 58,
    marginHorizontal: 30,
    marginTop: 30,
    flexDirection: 'row',
    flex: 1,
  },
  textTitle: {
    color: '#323338',
    fontSize: 13,
    height: 16,
    lineHeight: 16,
  },
  input: {
    padding: 0,
    height: 20,
    lineHeight: 20,
    fontSize: 16,
    color: '#333333',
    marginTop: 15,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#F5F6FA',
    borderRadius: 12,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
})

type TProps = {
  title?: string,
  defaultValue?: string,
  cellStyle?: StyleProp<TextStyle>,
  titleStyle?: StyleProp<ViewStyle>,
  inputStyle?: StyleProp<ViewStyle>,
  inputProps?: TextInputProps,
  warning?: boolean,
  onBlur?: () => void,
  onFocus?: () => void
}

export default class TextInputComponent extends PureComponent<TProps> {
  render() {
    const {
      title, defaultValue = '', cellStyle, onBlur, onFocus,
      titleStyle, inputStyle, inputProps, warning
    } = this.props
    return (
      <View style={[styles.container, cellStyle]}>
        <View style={{ flex: 1, }}>
          <Text style={[styles.textTitle, titleStyle]}>
            {title}
          </Text>
          <TextInput
            defaultValue={defaultValue}
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            style={[styles.input, inputStyle]}
            clearButtonMode="while-editing"
            onBlur={onBlur}
            onFocus={onFocus}
            {...inputProps}
          />
        </View>
        <View style={[styles.line, warning && { backgroundColor: '#FF4B4B' }]} />
      </View>
    )
  }
}
