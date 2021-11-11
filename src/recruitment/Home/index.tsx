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
  [key: string]: {
    selected: ImageRequireSource
    unselected: ImageRequireSource
  }
} = {
  Talent: {
    selected: require('./rencai-selected.png'),
    unselected: require('./rencai.png'),
  },
  Msg: {
    selected: require('./xiaoxi-selected.png'),
    unselected: require('./xiaoxi.png'),
  },
  Me: {
    selected: require('./wode-selected.png'),
    unselected: require('./wode.png'),
  },
}

export default Home
