import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'

export default function Wizard() {
  return (
    <View style={styles.container}>
      <View style={styles.imageRow}>
        <Image style={styles.step} source={require('./1.png')} />
        <Image style={styles.dash} source={require('./dash.png')} />
        <Image style={styles.step} source={require('./2.png')} />
        <Image style={styles.dash} source={require('./dash.png')} />
        <Image style={styles.step} source={require('./3.png')} />
      </View>
      <View style={styles.textRow}>
        <Text style={styles.text}>确认加入企业</Text>
        <Text style={styles.text}>向同事发送短信验证码</Text>
        <Text style={styles.text}>索要并填写验证码</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 95,
    justifyContent: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 53,
  },
  step: {
    width: 27,
    height: 27,
  },
  dash: {
    marginHorizontal: 9,
    height: 1,
    flex: 1,
  },
  textRow: {
    flexDirection: 'row',
    marginHorizontal: 28,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  text: {
    width: 75,
    color: '#888888',
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
  },
})
