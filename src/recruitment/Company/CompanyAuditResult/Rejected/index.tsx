import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import PrimaryButton from '../../../components/PrimaryButton'
import Hotline from '../../Hotline'

interface RejectedProps {
  reason: string
  onReapply?: () => void
}

export default function Rejected({ reason, onReapply }: RejectedProps) {
  return (
    <View style={styles.container}>
      <Image source={require('./rejected.png')} />
      <Text style={styles.title}>认证审核失败</Text>
      <Text style={styles.detail}>{reason}</Text>
      <View style={styles.bottom}>
        <PrimaryButton title="重新申请" />
        <Hotline style={styles.hotline} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height / 6.0,
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 21,
  },
  detail: {
    color: '#888888',
    fontSize: 13,
    marginTop: 13,
  },
  bottom: {
    position: 'absolute',
    left: 21,
    right: 21,
    bottom: Dimensions.get('window').height / 5.0,
  },
  hotline: {
    marginTop: 16,
    marginHorizontal: 0,
  },
})
