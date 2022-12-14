import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import NavBar from '../components/NavBar'
import PrimaryButton from '../components/PrimaryButton'
import HTAuthManager from '~/common/auth/common/model/HTAuthManager'

export default class SettingMain extends Component {

	render() {
		const { navigation } = this.props
		return (
	    <View style={styles.container}>
	      <NavBar title="设置" />
	      <ScrollView
	        style={styles.container}
	        contentContainerStyle={styles.content}>
	        <SettingItem
	          title="接收消息推送"
	          renderDetail={() => <Switch style={styles.switch} value={true} />}
	        />
	        <SettingItem
	          title="支付提醒"
	          renderDetail={() => <Switch style={styles.switch} />}
	        />
	        <SettingItem
	          title="定位权限"
	          renderDetail={() => <Switch style={styles.switch} />}
	        />
	        <SettingItem
	          title="招呼语设置"
	          onPress={() => navigation.navigate('GreetingSetting')}
	        />
	        <SettingItem
	          title="清除缓存"
	          renderDetail={() => <Text style={styles.detailText}>12.76M</Text>}
	          onPress={() => console.log('设置')}
	        />
	        <PrimaryButton
	          style={styles.logout}
	          title="退出登录"
	          onPress={() => {
	          	global.Alert.open({
	          		title: '确定要退出登录吗',
	          		itemList: [
	          			{ title: '确认', onPress: () => {
	          				global.Alert.close()
	          				HTAuthManager.clearLoginInfo()
	          			} },
	          			{ title: '取消' }
	          		]
	          	})
	          }}
	        />
	      </ScrollView>
	    </View>
	  )
	}

}

interface SettingItemProps {
  title: string
  onPress?: () => void
  renderDetail?: () => JSX.Element
}

function SettingItem({ title, onPress, renderDetail }: SettingItemProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.settingItem}>
        <Text style={styles.title}>{title}</Text>
        {renderDetail?.()}
        {onPress && (
          <Image
            style={styles.indicator}
            source={require('../assets/indicator.png')}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
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
  settingItem: {
    borderBottomColor: '#ECECEC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  indicator: {
    marginLeft: 18,
  },
  detailText: {
    color: '#888888',
    fontSize: 13,
  },
  switch: {},
  logout: {
    marginTop: 106,
    marginHorizontal: 21,
  },
})
