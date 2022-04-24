import React, { PureComponent } from 'react'
import { View, Image, TextInput, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import { TextInputProps } from '@ant-design/react-native/lib/textarea-item'

const styles = StyleSheet.create({
  container: {
    height: 35,
    marginHorizontal: 11,
    flexDirection: 'row',
    backgroundColor: '#eee',
    alignItems: 'center',
    paddingHorizontal: 25,
    borderRadius: 18
  },
  textTitle: {
    color: '#323338',
    fontSize: 13,
    height: 16,
    lineHeight: 16,
  },
  input: {
  	flex: 1,
  	height: '100%',
    fontSize: 15,
    color: '#888888',
    marginLeft: 14
  },
  searchIcon: {
    // width: 15,
    // height: 15
  },
})

type TProps = {
  defaultValue?: string,
  cellStyle?: StyleProp<TextStyle>,
  inputStyle?: any,
  inputProps?: TextInputProps,
  warning?: boolean,
  onChangeText: (value: string) => void,
}

export default class SearchTextinput extends PureComponent<TProps> {
  render() {
    const {
      defaultValue = '', cellStyle, onChangeText, inputStyle, inputProps,
    } = this.props
    return (
      <View style={[styles.container, cellStyle]}>
        <Image
          style={styles.searchIcon}
          source={require('../../../assets/requestJobs/search-input.png')}
        />
        <TextInput
          defaultValue={defaultValue}
          underlineColorAndroid="transparent"
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          style={[styles.input, inputStyle]}
          clearButtonMode="while-editing"
          onChangeText={(value: string) => {
            onChangeText(value)
          }}
          {...inputProps}
        />
      </View>
    )
  }
}
