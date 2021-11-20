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
  TouchableWithoutFeedback,
} from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import BottomModal from '../../../components/BottomModal'
import GradientButton from '../../../components/GradientButton'

interface SetGreetingModalProps {
  visible: boolean
}

const greetings = [
  '智能化招呼语\n根据求职者的求职偏好，生成智能招呼语，自动打招呼',
  'HI, 看了您的过往经历感觉您比较符合我们公司的职位要求，方便聊一聊吗？',
  '您好，刚看了您的简历，请问何时方便我们可以电话或者视频沟通一下吗？',
  'HI, 看了您的过往经历感觉您比较符合我们公司的职位要求，方便聊一聊吗？',
  '您好，刚看了您的简历，请问何时方便我们可以电话或者视频沟通一下吗？',
  'HI, 看了您的过往经历感觉您比较符合我们公司的职位要求，方便聊一聊吗？',
  '您好，刚看了您的简历，请问何时方便我们可以电话或者视频沟通一下吗？',
]

export default function SetGreetingModal({ visible }: SetGreetingModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const renderGreeting = (greeting: string, index: number) => {
    const checked = selectedIndex === index
    return (
      <View key={index} style={styles.card}>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log('----------------')
            setSelectedIndex(index)
          }}>
          <View style={styles.row}>
            <Image
              style={styles.checkbox}
              source={
                checked
                  ? require('./xuanzhong.png')
                  : require('./weixuanzhong.png')
              }
            />
            <Text style={styles.greeting}>{greeting}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  return (
    <BottomModal visible={visible} contentStyle={styles.content}>
      <Text style={styles.title}>设置招呼语</Text>
      <Text style={styles.description}>
        在主动与候选人聊天时，系统将默认发送招呼语，您可在聊天设置中进行修改。
      </Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: 16,
          flexGrow: 1,
        }}>
        {greetings.map(renderGreeting)}
      </ScrollView>
      <GradientButton style={styles.button} title="确定" />
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  content: {
    maxHeight: 475,
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
    marginHorizontal: 22,
    marginTop: 8,
  },
  scrollView: {
    marginTop: 16,
  },
  card: {
    marginHorizontal: 22,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: '#bbbbbb',
    shadowRadius: 8,
    shadowOpacity: 0.3,
    elevation: 3,
  },
  row: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 12,
  },
  greeting: {
    flexShrink: 1,
    color: '#666666',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: 'bold',
  },
  button: {
    marginHorizontal: 22,
    marginTop: 4,
    marginBottom: isIphoneX() ? 38 : 4,
  },
})
