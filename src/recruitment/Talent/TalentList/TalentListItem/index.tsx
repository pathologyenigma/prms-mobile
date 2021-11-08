import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

export default function TalentListItem() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.row, styles.nameRow]}>
          <Text style={styles.name}>胡女士</Text>
          <View style={styles.activeState} />
          <Text style={styles.activeTime}>1小时前在线</Text>
        </View>
        <View style={[styles.row, styles.experienceRow]}>
          <Text style={styles.experience}>工作2年</Text>
          <View style={styles.experienceDivider} />
          <Text style={styles.experience}>大专</Text>
          <View style={styles.experienceDivider} />
          <Text style={styles.experience}>7千-1万</Text>
        </View>
        <Text style={styles.expected}>期望：产品助理</Text>
        <View style={[styles.row, styles.jobRow]}>
          <Image style={styles.jobIcon} source={require('./zhiwei.png')} />
          <Text style={styles.jobName}>大疆创新･科技行政总务･1年</Text>
        </View>
        <Text style={styles.advantage} ellipsizeMode="tail" numberOfLines={2}>
          本人性格沉稳谨慎且有耐心，具有良好的沟通能力、
          适应能力及学习摸索能力，对工作有较强的上进心哈哈哈哈
        </Text>
      </View>
      <Image style={styles.avatar} source={require('./avatar.png')} />
      <Image style={styles.gender} source={require('./nv.png')} />
      <View style={styles.divider}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 185,
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    paddingLeft: 11,
  },
  name: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 22,
  },
  nameRow: {
    marginTop: 12,
  },
  activeState: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7BD69C',
    marginLeft: 13,
  },
  activeTime: {
    color: '#AAAAAA',
    fontSize: 10,
    marginLeft: 5.5,
  },
  experienceRow: {
    marginTop: 9,
    alignItems: 'center',
  },
  experience: {
    color: '#333333',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  experienceDivider: {
    backgroundColor: '#888888',
    width: 0.5,
    height: 9,
    marginHorizontal: 8,
  },
  expected: {
    backgroundColor: '#F3F3F3',
    height: 19,
    lineHeight: 19,
    borderRadius: 2,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    color: '#666666',
    paddingHorizontal: 8,
    marginTop: 10,
  },
  jobRow: {
    marginTop: 10,
  },
  jobName: {
    fontSize: 15,
    lineHeight: 21,
    color: '#333333',
    marginLeft: 11.5,
    fontWeight: '500',
  },
  jobIcon: {},
  advantage: {
    marginTop: 9,
    color: '#888888',
    fontSize: 14,
    lineHeight: 18,
    marginRight: 44,
  },
  avatar: {
    width: 48,
    height: 48,
    position: 'absolute',
    top: 21.5,
    right: 12.5,
  },
  gender: {
    width: 13,
    height: 13,
    position: 'absolute',
    top: 56.5,
    right: 11,
  },
  divider: {
    height: 5,
    backgroundColor: '#F3F3F3',
  },
})
