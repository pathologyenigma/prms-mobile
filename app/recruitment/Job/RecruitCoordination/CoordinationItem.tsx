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
import GradientButton from '../../components/GradientButton'
import TextButton from '../../components/TextButton'

export interface CoordinationItemProps {
  avatar?: string
  name: string
  title: string
  status: '未分享' | '已分享'
  onShare?: () => void
}

export default function CoordinationItem({
  name,
  title,
  status,
  onShare,
}: CoordinationItemProps) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={global.AVATAR_IMAGE()}
      />
      <View style={styles.meta}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <GradientButton
        colors={['#00E298', '#58E6AA']}
        style={styles.button}
        linearGradientStyle={styles.buttonGradientStyle}
        titleStyle={styles.buttonTextStyle}
        title={status === '已分享' ? '已分享' : '分享'}
        disabled={status === '已分享'}
        onPress={onShare}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 11,
  },
  avatar: {
    width: 45,
    height: 45,
  },
  meta: {
    marginLeft: 15,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  button: {
    height: 26,
    width: 55,
  },
  buttonGradientStyle: {
    borderRadius: 13,
  },
  buttonTextStyle: {
    fontSize: 13,
  },
})
