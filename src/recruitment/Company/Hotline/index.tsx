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
import TextButton from '../../components/TextButton'

interface HotlineProps {
  style?: StyleProp<ViewStyle>
}

export default function Hotline({ style }: HotlineProps) {
  return (
    <View style={[styles.helpRow, style]}>
      <Image style={styles.helpIcon} source={require('./kefu.png')} />
      <Text style={styles.helpHint}>认证遇到问题？</Text>
      <TextButton
        style={styles.helpButton}
        textStyle={styles.helpButtonText}
        title="拨打客服热线"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  helpRow: {
    flexDirection: 'row',
    marginHorizontal: 21,
    alignItems: 'center',
  },
  helpIcon: {},
  helpHint: {
    marginLeft: 8,
    color: '#888888',
    fontSize: 12,
  },
  helpButton: {
    marginLeft: 22,
  },
  helpButtonText: {
    color: '#57D693',
    fontSize: 12,
    fontWeight: 'bold',
  },
})
