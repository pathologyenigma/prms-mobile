import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import React, { Component } from 'react'
import RouterStacks from './stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SystemHelper from '../../utils/system'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
export default class Router extends Component {
  render() {
    const { stacks } = RouterStacks
    return (
      <Stack.Navigator
        screenOptions={{
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          header: () => null,
          headerShown: false,
          cardShadowEnabled: false,
          gestureEnabled: false,
          headerStyle: {
            height: 0,
            backgroundColor: 'transparent'
          },
          gestureResponseDistance: {
            horizontal: SystemHelper.width,
          },
        }}
      >
        {
          Object.keys(stacks).map(stack => (
            <Stack.Screen
              key={stack}
              name={stack}
              component={stacks[stack]}
            />
          ))
        }
      </Stack.Navigator>
    )
  }
}