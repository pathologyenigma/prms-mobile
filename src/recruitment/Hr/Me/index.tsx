import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import IconButton from '../../components/IconButton'
import Avatar from './Avatar'
import Tab from './Tab'
import Cell from './Cell'

export const MeOptions: StackNavigationOptions = {
  title: '',
  header: () => null,
}

export default function Me() {
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Image
          style={styles.bg}
          source={require('./images/bg.png')}
          resizeMode="cover"
        />
        <View style={styles.head}>
          <IconButton
            style={styles.scan}
            icon={require('./images/scan.png')}
            onPress={() => console.log('扫描二维码')}
          />
          {renderProfile()}
          {renderBar()}
          <View style={styles.corner}></View>
        </View>
      </View>
    )
  }

  const renderProfile = () => {
    return (
      <TouchableWithoutFeedback onPress={() => console.log('hr 个人信息')}>
        <View style={styles.profile}>
          <Avatar />
          <View
            style={{
              justifyContent: 'center',
              marginLeft: 14,
            }}>
            <Text style={styles.name}>李小冉</Text>
            <Text style={styles.company}>猎德科技有限公司</Text>
            <Text style={styles.job}>人事主管</Text>
          </View>
          <Image
            style={styles.indicator}
            source={require('./images/indicator.png')}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const renderBar = () => {
    return (
      <View style={styles.bar}>
        <Tab count={156} category="沟通过" />
        <View style={styles.hdivider} />
        <Tab count={3} category="待面试" />
        <View style={styles.hdivider} />
        <Tab count={8} category="新简历" />
        <View style={styles.hdivider} />
        <Tab
          count={20}
          category="在线职位"
          onPress={() => console.log('职位管理')}
        />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {renderHeader()}
      <View style={styles.cells}>
        <Cell icon={require('./images/woshou.png')} title="线下招聘会" />
        <Cell icon={require('./images/company.png')} title="我的公司" />
        <Cell icon={require('./images/invite.png')} title="邀请同事" />
        <Cell
          icon={require('./images/switch.png')}
          title="切换身份"
          onPress={() => console.log('切换身份')}
        />
        <Cell icon={require('./images/feekback.png')} title="帮助与反馈" />
        <Cell icon={require('./images/about.png')} title="关于我们" />
        <Cell icon={require('./images/settings.png')} title="设置" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    aspectRatio: 375 / 280,
  },
  bg: {
    position: 'absolute',
    width: '110%',
    left: -8,
    top: -8,
    bottom: -8,
  },
  head: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scan: {
    position: 'absolute',
    top: 55,
    right: 11,
  },
  profile: {
    marginTop: 86,
    flexDirection: 'row',
    marginHorizontal: 11,
    alignItems: 'center',
  },
  name: {
    color: '#FDFDFD',
    fontSize: 21,
    fontWeight: 'bold',
  },
  company: {
    color: '#FDFDFD',
    fontSize: 16,
  },
  job: {
    color: '#FDFDFD',
    fontSize: 14,
  },
  indicator: {
    position: 'absolute',
    right: 0,
  },
  bar: {
    marginTop: 34,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hdivider: {
    width: 1,
    height: 22,
    backgroundColor: '#FFFFFF',
  },
  corner: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: 27,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cells: {},
})
