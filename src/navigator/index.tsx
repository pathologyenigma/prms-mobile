import React from 'react'
import {
  Image, NativeModules, View, AsyncStorage, InteractionManager,
} from 'react-native'
import { createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
import * as http from '../utils/http'
import requestJobsJobs from './requestJob/jobs'
import requestJobsFind from './requestJob/find'
import requestJobsLearn from './requestJob/learn'
import requestJobsNews from './requestJob/news'
import requestJobsMine from './requestJob/mine'
import { greenColor } from '../utils/constant'
import SystemHelper from '../utils/system'

const SplashScreen = NativeModules.SplashManager

function getTabbarTitle(routeName: string) {
  if (routeName === 'requestJobsJobs') {
    return '职位'
  }
  if (routeName === 'requestJobsFind') {
    return '发现'
  }
  if (routeName === 'requestJobsLearn') {
    return '学习'
  }
  if (routeName === 'requestJobsNews') {
    return '消息'
  }
  if (routeName === 'requestJobsMine') {
    return '我的'
  }
  return 'Test'
}

const requestJobTabs = createBottomTabNavigator({
  requestJobsJobs,
  requestJobsFind,
  requestJobsLearn,
  requestJobsNews,
  requestJobsMine
}, {
  navigationOptions: ({ navigation }: any) => {
    const { routeName } = navigation.state
    console.log('routeName1: ', routeName)
    let tabBarVisible = true
    if (navigation.state.index > 0) {
      tabBarVisible = false
    }
    return {
      tabBarVisible,
      tabBarLabel: getTabbarTitle(routeName),
      tabBarIcon: ({ focused }: any) => {
        let iconName
        if (routeName === 'Jobs') {
          iconName = focused ? require('../assets/requestJobs/zhiwei-selected.png') : require('../assets/requestJobs/zhiwei.png')
        } else if (routeName === 'Find') {
          iconName = focused ? require('../assets/requestJobs/faxian-selected.png') : require('../assets/requestJobs/faxian.png')
        } else if (routeName === 'Learn') {
          iconName = focused ? require('../assets/requestJobs/xuexi-selected.png') : require('../assets/requestJobs/xuexi.png')
        } else if (routeName === 'News') {
          iconName = focused ? require('../assets/requestJobs/xiaoxi-selected.png') : require('../assets/requestJobs/xiaoxi.png')
        } else if (routeName === 'Mine') {
          iconName = focused ? require('../assets/requestJobs/wode-selected.png') : require('../assets/requestJobs/wode.png')
        }
        return <Image resizeMode="contain" style={{ width: 25, height: 25 }} source={iconName} />
      },
      tabBarOnPress: (tab: any) => {
        const tabKey = tab.navigation.state.key
        tab.navigation.navigate(tabKey)
      },
    }
  },
  tabBarOptions: {
    showIcon: true,
    activeTintColor: greenColor,
    inactiveTintColor: '#888888',
    allowFontScaling: false,
  },
})

const styles = {
  navbar: {
    backgroundColor: '#3574FA',
    height: SystemHelper.safeTop
  },
  headerTitle: {
    fontSize: 18,
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  balance: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 5,
  },
  type: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  scan: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
}

class Dummy extends React.Component {
  constructor(props: any) {
    super(props)
    console.log('props: ', props)
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const { navigation } = this.props
    console.log('判断是否有登录: ', navigation)
    // TODO: 判断是否登录
    // todo: 判断需要跳转到的模块
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('requestJobTabs')
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F5F5F6' }}>
        <View style={styles.navbar} />
      </View>
    )
  }
}

export default createSwitchNavigator(
  {
    Dummy,
    requestJobTabs,
  },
  {
    initialRouteName: 'Dummy',
  },
)
