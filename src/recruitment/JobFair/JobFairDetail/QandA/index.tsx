import React from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import IconLabelButton from '../../../components/IconLabelButton'

const qas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

export default function QandA() {
  const renderListItem = () => {
    return (
      <View style={styles.item}>
        <View style={styles.quizzer}>
          <Image
            style={styles.avatar}
            source={require('../../../assets/avatar_default.png')}
          />
          <View style={styles.quizzerMeta}>
            <Text style={styles.name}>莫纯婷</Text>
            <Text style={styles.cityAndTitle}>深圳·UI设计师</Text>
          </View>
        </View>
        <Text style={styles.question}>
          之前在其他的互联网大厂工作，但是是专科学历可以应聘吗？
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
        <View style={styles.actionbar}>
          <Text style={styles.time}>2021年12月24日</Text>
          <IconLabelButton
            labelStyle={styles.replyButton}
            icon={require('./wolaihuida.png')}
            label="写回答"
          />
        </View>
      </View>
    )
  }

  return (
    <FlatList
      nestedScrollEnabled
      alwaysBounceVertical={false}
      keyExtractor={item => item}
      data={qas}
      renderItem={renderListItem}
      style={styles.container}
      contentContainerStyle={styles.content}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexShrink: 1,
  },
  content: {
    flexShrink: 1,
    backgroundColor: '#FFFFFF',
  },
  item: {
    borderTopColor: '#F0F0F0',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  quizzer: {
    marginTop: 20,
    flexDirection: 'row',
    marginHorizontal: 11,
  },
  avatar: {
    width: 44,
    height: 44,
  },
  quizzerMeta: {
    marginLeft: 14,
    height: 44,
    justifyContent: 'space-between',
  },
  name: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 2,
  },
  cityAndTitle: {
    color: '#888888',
    fontSize: 13,
    marginBottom: 2,
  },
  question: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: 'bold',
    marginHorizontal: 11,
    marginVertical: 16,
  },
  actionbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 11,
    marginBottom: 25,
  },
  time: {
    color: '#AAAAAA',
    fontSize: 12,
  },
  replyButton: {
    color: '#57DE9E',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reply: {
    marginTop: -8,
    borderRadius: 7,
    backgroundColor: '#F8F8F8',
    marginHorizontal: 11,
    marginBottom: 12,
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
