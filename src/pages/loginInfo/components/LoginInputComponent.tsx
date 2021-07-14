import React, { PureComponent } from 'react'
import { View, Text, TextInput, StyleProp, ViewStyle, TextStyle, StyleSheet, Image } from 'react-native'
import { TextInputProps } from '@ant-design/react-native/lib/textarea-item'

const styles = StyleSheet.create({
  container: {
    height: 35,
    marginHorizontal: 21,
    flexDirection: 'row',
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  downImg: {
    width: 15,
    height: 8,
    marginLeft: 8,
    marginRight: 18
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
    flex: 1
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

export default class LoginInputComponent extends PureComponent<TProps> {
  render() {
    const {
      title, defaultValue = '', cellStyle, onBlur, onFocus,
      titleStyle, inputStyle, inputProps, warning
    } = this.props
    return (
      <View style={[styles.container, cellStyle]}>
        <Text style={[styles.textTitle, titleStyle]}>
          {title}
        </Text>
        <Image
          style={styles.downImg}
          source={require('../../../assets/gray_down.png')}
        />
        <TextInput
          defaultValue={defaultValue}
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="number-pad"
          style={[styles.input, inputStyle]}
          clearButtonMode="while-editing"
          onBlur={onBlur}
          onFocus={onFocus}
          {...inputProps}
        />
      </View>
    )
  }
}
