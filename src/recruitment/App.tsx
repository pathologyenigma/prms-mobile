import 'react-native-gesture-handler'
import React, { Component } from 'react'

import Home from './Home'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {Object.keys(screens).map(key => (
            <Stack.Screen
              key={key}
              name={key}
              component={screens[key]}
              options={{
                header: () => null,
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const screens: {
  [key: string]: () => JSX.Element
} = {
  Home,
}

export default App
