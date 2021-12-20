import 'react-native-gesture-handler'
import React, { Component, ComponentType } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'

import splash from '../bridge/splash'
import Home from './Home'
import companyScreens from './Company'
import hrScreens from './Hr'
import interviewScreens from './Interview'
import jobScreens from './Job'
import jobFairScreens from './JobFair'
import talentScreens from './Talent'
import settingScreens from './Settings'

const screens: Record<string, ComponentType<any>> = {
  ...companyScreens,
  ...hrScreens,
  ...interviewScreens,
  ...jobScreens,
  ...jobFairScreens,
  ...talentScreens,
  ...settingScreens,
}

const Stack = createStackNavigator()

class App extends Component {
  componentDidMount() {
    splash.hide()
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions} initialRouteName="Home">
          <Stack.Screen key="Home" name="Home" component={Home} />
          {Object.keys(screens).map(k => (
            <Stack.Screen key={k} name={k} component={screens[k]} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const screenOptions: StackNavigationOptions = {
  headerShown: false,
}

export default App
