import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import GradientButton from '../../components/GradientButton'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import FavoriteButton from './FavoriteButton'
import ReportButton from './ReportButton'
import Section from './Section'
import Profile from './Profile'
import LabelWithIcon from './LabelWithIcon'
import IntelligentGreetingModal from './IntelligentGreetingModal'
import SetGreetingModal from './SetGreetingModal'

export const TalentDetailOptions: StackNavigationOptions = {
  title: '',
  headerRight: () => (
    <View style={styles.headerButtons}>
      <FavoriteButton checked={true} />
      <ReportButton />
    </View>
  ),
}

export default function TalentDetail() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Profile />
        <Section
          style={{ marginTop: 6 }}
          title="离职-随时到岗"
          renderSubtitle={() => (
            <View style={styles.info}>
              <LabelWithIcon
                icon={require('./images/working.png')}
                title="5年经验"
              />
              <LabelWithIcon icon={require('./images/edu.png')} title="本科" />
              <LabelWithIcon icon={require('./images/age.png')} title="25岁" />
            </View>
          )}
          detail={`1、具备XXXXX能力，拥有XXXXXXX方面的经验，曾经在某某项目中担任XXXXX角色，配合XXXXX完成XXXX项目的落地。
2、熟悉掌握XXXXX工具，能独立完成XXXXXXX
3、具备XXXXX能力，拥有XXXXXXX方面的经验，曾经在某某项目中担任XXXXX角色，配合XXXXX完成XXXX项目的落地
4、熟悉掌握XXXXX工具，能独立完成XXXXXXX`}
        />
        <Text style={styles.title}>求职期望</Text>
        <Section
          title="APP设计师，深圳"
          subtitle="行业不限"
          renderPeriod={() => <Text style={styles.desired}>15K-20K</Text>}
        />
        <Text style={styles.title}>工作经验</Text>
        <Section
          title="广东智慧网络有限公司"
          subtitle="UI设计师  技术部"
          period="2017.03～至今"
          detail={`内容：1、负责线上APP的改版功能，更新迭代；2、根据产品及产品需求，独立完成项目设计(此处文案需要全部展开）`}
        />
        <Section
          title="广东智慧网络有限公司"
          subtitle="UI设计师  技术部"
          period="2017.03～至今"
          detail={`内容：1、负责线上APP的改版功能，更新迭代；2、根据产品及产品需求，独立完成项目设计，建立产品的界面设计规`}
        />
        <Text style={styles.title}>项目经验</Text>
        <Section
          title="广东智慧网络公司官网"
          subtitle="网页设计师"
          period="2017.03～2018.01"
          detail={`内容：1、负责线上APP的改版功能，更新迭代；2、根据产品及产品需求，独立完成项目设计，建立产品的界面设计规`}
        />
        <Text style={styles.title}>教育经历</Text>
        <Section
          title="广东白云学院"
          subtitle="本科·视觉传达"
          period="2013.03～2017.01"
          detail={`内容：1、在校担任宣传部社长；获得XXXX荣誉称号`}
        />
      </ScrollView>
      <GradientButton style={styles.button} title="立即沟通" />
      <IntelligentGreetingModal visible={false} />
      <SetGreetingModal visible={true} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  button: {
    marginBottom: isIphoneX() ? getBottomSpace() + 5 : 5,
    marginHorizontal: 22,
    marginVertical: 4,
  },
  info: {
    flexDirection: 'row',
    marginLeft: 11,
    marginTop: 14,
    marginBottom: 8,
  },
  desired: {
    color: '#57DE9E',
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    marginLeft: 11,
    marginTop: 16,
    marginBottom: 8,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
})
