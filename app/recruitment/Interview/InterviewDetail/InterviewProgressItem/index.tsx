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

export interface InterviewProgressItemProps {
  isFirst?: boolean
  isLast?: boolean
  status: '已面试' | '已邀请面试' | '成功接收到简历'
  datetime: string
}

export default function InterviewProgressItem({
  isFirst,
  isLast,
  status,
  datetime,
}: InterviewProgressItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Image
          source={isFirst ? undefined : require('../../../assets/dashed.png')}
          style={styles.stepLineUper}
          resizeMode="cover"
        />
        <Image
          source={isLast ? undefined : require('../../../assets/dashed.png')}
          style={styles.stepLineLower}
          resizeMode="cover"
        />
        <Image
          style={styles.stepIndicator}
          resizeMode="center"
          source={isFirst ? require('./active.png') : require('./inactive.png')}
        />
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.status}>{status}</Text>
        <Text style={styles.datetime}>{datetime}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 49,
    flexDirection: 'row',
  },
  progressContainer: {
    marginTop: 12,
  },
  status: {
    color: '#333333',
    fontSize: 11,
    fontWeight: 'bold',
  },
  datetime: {
    color: '#888888',
    fontSize: 10,
    marginTop: 2,
  },
  stepContainer: {
    width: 38,
    alignItems: 'center',
    overflow: 'hidden',
  },
  stepIndicator: {
    position: 'absolute',
    top: 10,
    width: 19,
    height: 19,
  },
  stepLineUper: {
    width: 1,
    height: 16,
    overflow: 'hidden',
  },
  stepLineLower: {
    width: 1,
    flex: 1,
    overflow: 'hidden',
  },
})
