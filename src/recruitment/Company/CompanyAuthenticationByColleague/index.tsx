import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import IconButton from '../../components/IconButton'
import Wizard from './Wizard'
import Colleagues from '../Colleagues'
import Hotline from '../Hotline'
import { isIphoneX } from 'react-native-iphone-x-helper'

export const CompanyAuthenticationByColleagueOptions: StackNavigationOptions = {
  title: '同事协助认证',
  headerRight: () => (
    <IconButton
      icon={require('../images/more.png')}
      style={{ marginRight: 11 }}
    />
  ),
}

export default function CompanyAuthenticationByColleague() {
  const renderCompany = () => {
    return (
      <View style={styles.companyContainer}>
        <Text style={styles.title}>确认加入企业</Text>
        <TouchableWithoutFeedback>
          <View style={styles.companyNameRow}>
            <Text style={styles.companyName}>深圳智慧网络有限公司</Text>
            <Text style={styles.switch}>更换企业</Text>
            <Image
              style={styles.indicator}
              source={require('../../assets/indicator.png')}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Wizard />
      {renderCompany()}
      <Colleagues style={styles.colleagues} />
      <Hotline style={styles.hotline} />
    </ScrollView>
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
  companyContainer: {
    height: 80,
    paddingHorizontal: 11,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  },
  title: {
    color: '#333333',
    fontSize: 13,
  },
  companyName: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  companyNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    marginTop: 2,
  },
  switch: {
    color: '#57D693',
    fontSize: 11,
  },
  indicator: {
    marginLeft: 12,
  },
  colleagues: {
    marginTop: 30,
  },
  hotline: {
    position: 'absolute',
    left: 21,
    bottom: isIphoneX() ? 87 : 53,
  },
})
