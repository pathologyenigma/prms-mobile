import React from 'react'
import { Image, ImageRequireSource } from 'react-native'

import Talent from '../Talent'
import Msg from '../Msg'
import Me from '../Me'

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
              source={icons[route.name]}
              resizeMode="center"
              resizeMethod="resize"
              style={{ tintColor: color, width: size, height: size }}
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
        key={'Msg'}
        name={'Msg'}
        component={Msg}
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

const tabs: {
  [key: string]: () => JSX.Element
} = {
  Talent,
  Msg,
  Me,
}

const icons: {
  [key: string]: ImageRequireSource
} = {
  Talent: require('./rencai.png'),
  Msg: require('./xiaoxi.png'),
  Me: require('./wode.png'),
}

export default Home
