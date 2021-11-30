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

interface ColleaguesProps {
  style?: StyleProp<ViewStyle>
}

const data = [
  {
    name: '林晓敏',
    title: '人事招聘专员',
  },
  {
    name: '姜莉莉',
    title: '产品经理',
  },
  {
    name: '贺文静',
    title: '社区经理',
  },
]

export default function Colleagues({ style }: ColleaguesProps) {
  const renderColleague = (
    { name, title }: { name: string; title: string },
    index: number,
  ) => {
    return (
      <View style={styles.item} key={index}>
        <Image
          style={styles.avatar}
          source={require('../../assets/avatar_default.png')}
        />
        <View style={styles.meta}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.jobTitle}>{title}</Text>
        </View>
        <GradientButton
          title="发送"
          colors={['#57DE9E', '#81E3AE']}
          style={styles.button}
          linearGradientStyle={styles.buttonGradientStyle}
          titleStyle={styles.buttonTextStyle}
          disabled
        />
      </View>
    )
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>
        给同事发送验证码<Text style={styles.counter}>（今日可发送3次）</Text>
      </Text>
      <View style={styles.colleagues}>{data.map(renderColleague)}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 11,
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  counter: {
    color: '#AAAAAA',
    fontSize: 12,
    fontWeight: 'normal',
  },
  colleagues: {
    marginTop: 20,
  },
  item: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
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
  jobTitle: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
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
