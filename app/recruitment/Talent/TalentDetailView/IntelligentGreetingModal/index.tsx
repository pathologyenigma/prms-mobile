import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import BottomModal from '../../../components/BottomModal'
import GradientButton from '../../../components/GradientButton'
import TextButton from '../../../components/TextButton'

interface IntelligentGreetingModalProps {
  visible: boolean
}

export default function IntelligentGreetingModal({
  visible,
}: IntelligentGreetingModalProps) {
  return (
    <BottomModal visible={visible} contentStyle={styles.content}>
      <Text style={styles.title}>设置智能招呼语</Text>
      <Text style={styles.description}>
        根据求职者的求职偏好，生成智能招呼语，自动打招呼
      </Text>
      <View style={styles.card}>
        <Text style={styles.greeting}>
          您好，看了您的工作经历，很适合我司【UI设计师】的职位，我们为员工提供创业公司，绩效奖金，方便沟通一下吗？
        </Text>
      </View>
      <View style={styles.row}>
        <TextButton
          style={styles.textButton}
          textStyle={{ color: '#888888', fontSize: 13, fontWeight: 'bold' }}
          title="选择其他招呼语"
        />
        <GradientButton style={styles.gradientButton} title="立即使用" />
      </View>
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  content: {
    minHeight: isIphoneX() ? 280 : 246,
  },
  title: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginLeft: 22,
  },
  description: {
    color: '#888888',
    fontSize: 12,
    marginLeft: 22,
    marginTop: 8,
  },
  card: {
    height: 90,
    marginHorizontal: 22,
    padding: 16,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: '#bbbbbb',
    shadowRadius: 8,
    shadowOpacity: 0.3,
    elevation: 3,
  },
  greeting: {
    color: '#666666',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textButton: {
    marginLeft: 22,
  },
  gradientButton: {
    flex: 1,
    marginLeft: 40,
    marginRight: 22,
  },
})
