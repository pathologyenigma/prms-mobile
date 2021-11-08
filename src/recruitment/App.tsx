import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { StatusBar, Image } from 'react-native'

import Home from './Home'
import PostJob, { PostJobOptions } from './Job/PostJob'
import BackImage from './components/BackImage'

const Stack = createStackNavigator()

const screenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#FFFFFF',
  },
  headerTitleStyle: {
    color: '#333333',
    fontWeight: '500',
    fontSize: 18,
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerBackImage: () => <BackImage />,
  headerPressColorAndroid: '#00000000',
}

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar translucent backgroundColor="transparent" animated />
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            key="PostJob"
            name="PostJob"
            component={PostJob}
            options={PostJobOptions}
          />
          <Stack.Screen
            key="Home"
            name="Home"
            component={Home}
            options={{
              header: () => null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const screens: {
  [key: string]: () => JSX.Element
} = {
  Home,
  PostJob,
}

export default App
