import React, { PureComponent } from 'react'
import { Switch, StyleProp, TextStyle, StyleSheet } from 'react-native'
import NextPressable from '../NextPressable'

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#57DE9E',
    // width: 43,
    // height: 22,
    // borderRadius: 11,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingLeft: 4,
    // paddingRight: 15,
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
      <NextPressable
        onPress={() => {
          if (switchPress) {
            switchPress()
          }
        }}
        style={[
          styles.container,
          containerStyle,
          // !value && { backgroundColor: '#E9E9EB', },
          closeStyle,

        ]}
      >
        <Switch
          style={{
            // width: 100,
            // height: 22,
            transform: [
            	{ scale: Platform.select({
            		ios: 1,
            		android: 1.3,
            	}) }
            ]
          }}
          thumbColor="#ffffff"
          trackColor={
            {
              'false': '#E9E9EB',
              'true': '#57DE9E'
            }
          }
          value={value}
          disabled={true}
        />
      </NextPressable>
    )
  }
}
