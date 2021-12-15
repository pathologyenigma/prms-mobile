import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ViewStyle,
  StyleProp,
} from 'react-native'
import InterviewProgressItem, {
  InterviewProgressItemProps,
} from './InterviewProgressItem'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import NavBar from '../../components/NavBar'

interface LabelAndDetailProps {
  label: string
  detail: string
  style?: StyleProp<ViewStyle>
}

function LabelAndDetail({ label, detail, style }: LabelAndDetailProps) {
  return (
    <View style={[styles.labelAndDetailContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.detail}>{detail}</Text>
    </View>
  )
}

const interviewProgressData: InterviewProgressItemProps[] = [
  {
    status: '已面试',
    datetime: '2021/08/20  20:20',
    isFirst: true,
  },
  {
    status: '已邀请面试',
    datetime: '2021/08/16  10:20',
  },
  {
    status: '成功接收到简历',
    datetime: '2021/08/11  18:20',
    isLast: true,
  },
]

export default function InterviewDetail() {
  const renderInterviewProgressItem = (
    item: InterviewProgressItemProps,
    index: number,
  ) => {
    return <InterviewProgressItem {...item} key={index} />
  }

  return (
    <View style={styles.container}>
      <NavBar title="面试详情" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.avatarRow}>
            <Image
              style={styles.avatar}
              source={require('../../assets/avatar_default.png')}
            />
            <View style={styles.nameColumn}>
              <Text style={styles.name}>谭先生</Text>
              <Text style={styles.title}>UI设计师</Text>
            </View>
          </View>
          <LabelAndDetail label="时间" detail="2021-07-15  17:30" />
          <LabelAndDetail label="职位" detail="UI设计师，11K-16K·13月" />
          <LabelAndDetail label="联系人" detail="拉面，13458888888" />
          <LabelAndDetail label="面试形式" detail="线下面试" />
          <LabelAndDetail
            label="地址"
            detail="深圳市南山区创智云城（建设中）创智云城A2栋8楼"
          />
          <View style={styles.mapContainer}></View>
          <LabelAndDetail
            label="备注信息"
            detail="带上简历和手机端作品展示，准备绿码和口罩。"
            style={{ marginBottom: 32 }}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.interviewProgressTitle}>面试进度</Text>
          <View style={styles.interviewProgressContainer}>
            {interviewProgressData.map(renderInterviewProgressItem)}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  content: {
    flexGrow: 1,
    paddingBottom: isIphoneX() ? getBottomSpace() + 16 : 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 11,
    marginTop: 13,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  nameColumn: {
    marginLeft: 16,
  },
  name: {
    color: '#333333',
    fontSize: 17,
    fontWeight: 'bold',
  },
  title: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  labelAndDetailContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    marginHorizontal: 16,
  },
  label: {
    color: '#888888',
    fontSize: 12,
    width: 66,
  },
  detail: {
    flex: 1,
    lineHeight: 16,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
  },
  mapContainer: {
    height: 80,
    backgroundColor: '#FF0000',
    borderRadius: 11,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: 4,
  },
  interviewProgressTitle: {
    color: '#333333',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 18,
    marginLeft: 16,
  },
  interviewProgressContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
})
