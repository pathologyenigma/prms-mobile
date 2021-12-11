import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Switch } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import NavBar from '../components/NavBar'
import RadioButton from '../components/RadioButton'
import TextButton from '../components/TextButton'
import RadioGroup from '../components/RadioGroup'

export const GreetingSettingOptions: StackNavigationOptions = {
  title: '页面模版',
  headerShown: false,
}

const greetings: Array<GreetingItemProps> = [
  {
    title: 'Hi，看了您的过往简历，感觉您比较符合我们的职位要求，方便聊一聊吗？',
    id: 1,
  },
  {
    title: '你好，刚看了您的简历，请问何时方便我们电话或者视频沟通一下吗？',
    id: 2,
  },
  {
    title: '您好，想与您沟通一下我们在招的这个职位，现在方便吗？',
    id: 3,
  },
]

export default function GreetingSetting() {
  const [checkedGreetingValue, setCheckedGreetingValue] = useState(1)

  return (
    <View style={styles.container}>
      <NavBar title="招呼语设置" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerAction}>
            <Text style={styles.headerTitle}>招呼语设置</Text>
            <Switch style={styles.switch} />
          </View>
          <Text style={styles.headerDetail}>
            将根据求职者的偏好生成个性化招呼语，让Ta更愿意回复您～
          </Text>
          <View style={styles.divider}></View>
        </View>
        <RadioGroup
          value={checkedGreetingValue}
          onValueChecked={v => setCheckedGreetingValue(v)}>
          {greetings.map(item => (
            <GreetingItem key={item.id} {...item} />
          ))}
        </RadioGroup>
      </ScrollView>
    </View>
  )
}

interface GreetingItemProps {
  title: string
  id: number
}

function GreetingItem({ title, id }: GreetingItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{title}</Text>
      <View style={styles.actions}>
        <RadioButton style={styles.radio} label="设为默认" value={id} />
        <TextButton
          style={styles.edit}
          textStyle={styles.editText}
          title="编辑"
        />
      </View>
      <View style={styles.divider}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {},
  headerTitle: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    marginLeft: 11,
  },
  headerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  switch: {
    marginRight: 11,
  },
  headerDetail: {
    color: '#888888',
    fontSize: 13,
    marginBottom: 12,
    marginTop: 6,
    marginHorizontal: 11,
  },
  item: {},
  itemTitle: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    marginLeft: 11,
    marginRight: 20,
    paddingVertical: 17,
  },
  actions: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: '#ECECEC',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  divider: {
    height: 5,
    width: '100%',
    backgroundColor: '#F6F6F6',
  },
  edit: {
    marginRight: 11,
  },
  editText: {
    color: '#57DE9E',
    fontSize: 13,
    fontWeight: 'bold',
  },
  radio: {
    marginLeft: 11,
  },
})
