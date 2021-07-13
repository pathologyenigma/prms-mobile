import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack'
import React, { Component } from 'react'
import RouterStacks from './stack'

const Stack = createStackNavigator()

export default class Router extends Component {
  render() {
    const { stacks } = RouterStacks
    return (
      <NavigationContainer>
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
              // horizontal: SystemHelper.width,
            },
          }}>
          {
            Object.keys(stacks).map(stack =>
              stack === 'LoginScreen'
                ?
                (
                  <Stack.Screen
                    options={{
                      ...TransitionPresets.ModalSlideFromBottomIOS,
                    }}
                    key={stack}
                    name={stack}
                    component={stacks[stack]}
                  />
                )
                : (
                  <Stack.Screen
                    key={stack}
                    name={stack}
                    component={stacks[stack]}
                  />
                ))
          }
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
