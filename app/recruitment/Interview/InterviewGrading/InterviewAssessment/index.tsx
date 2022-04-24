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
import IconLabelButton from '../../../components/IconLabelButton'
import Rating from '../../../components/Rating'

interface InterviewAssessmentProps {
  onReply?: () => void
}

const labels = ['面试官人很好', '面试效率高', '环境高大上']

export default function InterviewAssessment({
  onReply,
}: InterviewAssessmentProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require('../../../assets/avatar_default.png')}
        />
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>莫纯婷</Text>
            <Rating style={styles.rating} score={4} />
          </View>
          <Text style={styles.expectedJob}>面试职位：UI设计师</Text>
        </View>
      </View>
      <View style={styles.labels}>
        {labels.map((v, index) => (
          <Text
            style={[styles.label, { marginLeft: index === 0 ? 0 : 9 }]}
            key={v}>
            {v}
          </Text>
        ))}
      </View>
      <Text style={styles.comment}>
        各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。
      </Text>

      <View style={styles.reply}>
        <View style={styles.replier}>
          <Image
            style={styles.smallAvatar}
            source={require('../../../assets/avatar_default.png')}
          />
          <Text style={styles.nameAndTitle}>梁晓梦·招聘经理</Text>
        </View>
        <Text style={styles.answer}>
          回复：谢谢用心评价，为了避免人才流失，我们的面试官肯定要是很专业的，这才是对面试者负责，也是对公司负责。
        </Text>
      </View>

      <View style={styles.actionBar}>
        <Text style={styles.time}>2021年12月24日</Text>
        <IconLabelButton
          style={styles.button}
          labelStyle={styles.buttonText}
          icon={require('./write.png')}
          label="写回答"
          onPress={onReply}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 26,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 11,
    height: 44,
  },
  avatar: {
    width: 44,
    height: 44,
    marginRight: 14,
  },
  name: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {},
  expectedJob: {
    color: '#888888',
    fontSize: 13,
    marginTop: 10,
  },
  labels: {
    marginTop: 18,
    flexDirection: 'row',
    marginHorizontal: 11,
    flexWrap: 'wrap',
  },
  label: {
    borderColor: '#AAAAAA',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    height: 17,
    lineHeight: 17,
    paddingHorizontal: 10,
    color: '#AAAAAA',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 9,
  },
  comment: {
    marginLeft: 11,
    marginRight: 20,
    marginTop: 3,
    color: '#666666',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 19,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 11,
    marginTop: 10,
  },
  time: {
    color: '#AAAAAA',
    fontSize: 10,
  },
  button: {},
  buttonText: {
    color: '#57DE9E',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reply: {
    marginTop: 10,
    borderRadius: 7,
    backgroundColor: '#F8F8F8',
    marginHorizontal: 11,
  },
  replier: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 7,
    marginTop: 7,
  },
  smallAvatar: {
    width: 17,
    height: 17,
  },
  nameAndTitle: {
    marginLeft: 8,
    color: '#333333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  answer: {
    color: '#666666',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
    marginHorizontal: 7,
    marginBottom: 10,
  },
})
