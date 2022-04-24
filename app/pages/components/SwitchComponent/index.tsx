import React, { PureComponent } from 'react'
import { Switch, StyleProp, TextStyle, StyleSheet } from 'react-native'
import NextTouchableOpacity from '../NextTouchableOpacity'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#57DE9E',
    width: 43,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
  },
})

type TProps = {
  containerStyle?: StyleProp<TextStyle>,
  closeStyle?: StyleProp<TextStyle>,
  value: boolean,
  switchPress: () => void
}

export default class SwitchComponent extends PureComponent<TProps> {
  render() {
    const {
      value, containerStyle, closeStyle, switchPress,
    } = this.props
    return (
      <NextTouchableOpacity
        onPress={() => {
          if (switchPress) {
            switchPress()
          }
        }}
        style={[
          styles.container,
          containerStyle,
          !value && { backgroundColor: '#E9E9EB', },
          closeStyle,

        ]}
      >
        <Switch
          style={{
            width: 43,
            height: 22,
          }}
          thumbColor="#ffffff"
          trackColor={
            {
              'false': 'transparent',
              'true': 'transparent'
            }
          }
          value={value}
          disabled={true}
        />
      </NextTouchableOpacity>
    )
  }
}
