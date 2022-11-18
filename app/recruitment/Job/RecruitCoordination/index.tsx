import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'

import CoordinationItem, { CoordinationItemProps } from './CoordinationItem'
import NavBar from '../../components/NavBar'

const coordinators: CoordinationItemProps[] = [
  {
    name: '林女士',
    title: '人事招聘专员',
    status: '已分享',
  },
  {
    name: '姜莉莉',
    title: '产品经理',
    status: '未分享',
  },
  {
    name: '贺文静',
    title: '社区经理',
    status: '未分享',
  },
]

export default function RecruitCoordination() {
  return (
    <View style={styles.container}>
      <NavBar title="职位协作" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <View style={styles.jobMeta}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>项目经理</Text>
            <Text style={styles.salary}>15K-30K</Text>
          </View>
          <View style={styles.conditionRow}>
            <Text style={styles.condition}>全职</Text>
            <Text style={styles.condition}>招2人</Text>
            <Text style={styles.condition}>5-10年</Text>
            <Text style={styles.condition}>5-10年</Text>
          </View>
          <View style={styles.addressRow}>
            <Image style={styles.addressIcon} source={require('./dizhi.png')} />
            <Text style={styles.address}>深圳·南山区·大学城</Text>
          </View>
        </View>
        <View style={styles.hrRow}>
          <Image
            style={styles.hrAvatar}
            source={global.AVATAR_IMAGE()}
          />
          <Text style={styles.hrMeta}>彭女士·UI设计师</Text>
        </View>
        <View>
          <Text style={styles.coordinatorsTitle}>协作同事</Text>
          {coordinators.map((c, index) => (
            <CoordinationItem key={index} {...c} />
          ))}
        </View>
      </ScrollView>
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
  jobMeta: {
    marginHorizontal: 11,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
  },
  title: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  salary: {
    color: '#57DE9E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  conditionRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  condition: {
    color: '#666666',
    fontSize: 13,
    marginRight: 22,
  },
  addressRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIcon: {
    marginRight: 8,
  },
  address: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 13,
  },
  hrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 11,
    marginTop: 16,
  },
  hrAvatar: {
    width: 35,
    height: 35,
  },
  hrMeta: {
    marginLeft: 12,
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  coordinatorsTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 11,
    marginBottom: 20,
    marginTop: 30,
  },
})
