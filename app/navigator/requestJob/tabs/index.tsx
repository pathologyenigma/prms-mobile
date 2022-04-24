import React, { Component } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import Jobs from '../../../pages/requestJob/jobs/Jobs'
// import Find from '~/pages/requestJob/find/Find'
import HTCompanyPage from '~/pages/requestJob/company/common/page/HTCompanyPage'
import Learn from '../../../pages/requestJob/learn/Learn'
import News from '../../../pages/requestJob/news/News'
import Mine from '../../../pages/requestJob/mine/Mine'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { greenColor } from '../../../utils/constant'

const Tab = createBottomTabNavigator()

interface ITabs {
  homeBadge: number | boolean
}

export default class Tabs extends Component<ITabs> {
  render() {
    // const { homeBadge } = this.props
    return (
      <Tab.Navigator
        initialRouteName="Jobs"
        tabBarOptions={{
          activeTintColor: greenColor,
        }}
        shifting
        barStyle={{
          backgroundColor: 'transparent',
        }}
        labeled={false}
        screenOptions={{

        }}
      >
        <Tab.Screen
          name="职位"
          component={Jobs}
          options={{
            tabBarBadge: undefined,
            tabBarIcon: ({ color, focused }) => (
              <Image resizeMode="contain" style={{ width: 20 }} source={focused ? require('../../../assets/requestJobs/zhiwei-selected.png') : require('../../../assets/requestJobs/zhiwei.png')} />
            ),
          }}
        />
        <Tab.Screen
          name="创业"
          component={HTCompanyPage}
          options={{
            tabBarBadge: undefined,
            tabBarIcon: ({ color, focused }) => (
              <Image resizeMode="contain" style={{ width: 20 }} source={focused ? require('../../../assets/requestJobs/faxian-selected.png') : require('../../../assets/requestJobs/faxian.png')} />
            ),
          }}
        />
        <Tab.Screen
          name="学习"
          component={Learn}
          options={{
            tabBarBadge: undefined,
            tabBarIcon: ({ color, focused }) => (
              <Image resizeMode="contain" style={{ width: 20 }} source={focused ? require('../../../assets/requestJobs/xuexi-selected.png') : require('../../../assets/requestJobs/xuexi.png')} />
            ),
          }}
        />
        <Tab.Screen
          name="消息"
          component={News}
          options={{
            tabBarBadge: null,
            tabBarIcon: ({ color, focused }) => (
              <Image resizeMode="contain" style={{ width: 20 }} source={focused ? require('../../../assets/requestJobs/xiaoxi-selected.png') : require('../../../assets/requestJobs/xiaoxi.png')} />
            ),
          }}
        />
        <Tab.Screen
          name="我的"
          component={Mine}
          options={{
            tabBarBadge: undefined,
            tabBarIcon: ({ color, focused }) => (
              <Image resizeMode="contain" style={{ width: 20 }} source={focused ? require('../../../assets/requestJobs/wode-selected.png') : require('../../../assets/requestJobs/wode.png')} />
            ),
          }}
        />
      </Tab.Navigator>
    )
  }
}
