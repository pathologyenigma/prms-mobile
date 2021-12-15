import React from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'

import Home from './Home'
import companyScreens from './Company'
import hrScreens from './Hr'
import interviewScreens from './Interview'
import jobScreens from './Job'
import jobFairScreens from './JobFair'
import talentScreens from './Talent'
import settingScreens from './Settings'

const screens: Record<string, () => JSX.Element> = {
  ...companyScreens,
  ...hrScreens,
  ...interviewScreens,
  ...jobScreens,
  ...jobFairScreens,
  ...talentScreens,
  ...settingScreens,
}

const Stack = createStackNavigator()

export function Route() {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <Stack.Screen key="Home" name="Home" component={Home} />
      {Object.keys(screens).map(k => (
        <Stack.Screen key={k} name={k} component={screens[k]} />
      ))}
    </Stack.Navigator>
  )
}

const screenOptions: StackNavigationOptions = {
  headerShown: false,
}
