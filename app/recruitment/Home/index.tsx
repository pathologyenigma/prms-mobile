import React from 'react'
import { Image, ImageRequireSource } from 'react-native'

import Talent from '../Talent/TalentList'
import Me from '../Hr/Me'
import News from '~/pages/requestJob/news/News'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tabs = createBottomTabNavigator()

function Home() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: '#79D398',
        inactiveTintColor: '#888888',
        activeBackgroundColor: '#FFFFFF',
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Image
              source={
                focused
                  ? icons[route.name].selected
                  : icons[route.name].unselected
              }
              resizeMode="center"
              resizeMethod="resize"
              style={{ width: size, height: size }}
            />
          )
        },
      })}>
      <Tabs.Screen
        key={'Talent'}
        name={'Talent'}
        component={Talent}
        options={{
          title: '找人才',
        }}
      />
      <Tabs.Screen
        key={'News'}
        name={'News'}
        component={News}
        options={{
          title: '消息',
        }}
      />
      <Tabs.Screen
        key={'Me'}
        name={'Me'}
        component={Me}
        options={{
          title: '我的',
        }}
      />
    </Tabs.Navigator>
  )
}

const icons: {
  [key: string]: {
    selected: ImageRequireSource
    unselected: ImageRequireSource
  }
} = {
  Talent: {
    selected: require('./images/rencai-selected.png'),
    unselected: require('./images/rencai.png'),
  },
  News: {
    selected: require('./images/xiaoxi-selected.png'),
    unselected: require('./images/xiaoxi.png'),
  },
  Me: {
    selected: require('./images/wode-selected.png'),
    unselected: require('./images/wode.png'),
  },
}

export default Home
