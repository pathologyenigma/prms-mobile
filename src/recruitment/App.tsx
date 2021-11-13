import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { StatusBar, Image } from 'react-native'
import BackImage from './components/BackImage'

import Home from './Home'
import PostJob, { PostJobOptions } from './Job/PostJob'
import EditJobName, { EditJobNameOptions } from './Job/EditJboName'
import PostJobSuccess, { PostJobSuccessOptions } from './Job/PostJobSuccess'
import JobPostRule, { JobPostRuleOptions } from './Job/JobPostRule'
import EditJobDescription, {
  EditJobDescriptionOptions,
} from './Job/EditJobDescription'
import EditJobAddress, { EditJobAddressOptions } from './Job/EditJobAddress'
import SearchJobAddress, {
  SearchJobAddressOptions,
} from './Job/SearchJobAddress'
import EditJobWelfare, { EditJobWelfareOptions } from './Job/EditJobWelfare'
import RechargeExplain, { RechargeExplainOptions } from './Job/RechargeExplain'
import RechargeFeekback, {
  RechargeFeekbackOptions,
} from './Job/RechargeFeekback'

const Stack = createStackNavigator()

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
            key="RechargeFeekback"
            name="RechargeFeekback"
            component={RechargeFeekback}
            options={RechargeFeekbackOptions}
          />
          <Stack.Screen
            key="EditJobWelfare"
            name="EditJobWelfare"
            component={EditJobWelfare}
            options={EditJobWelfareOptions}
          />
          <Stack.Screen
            key="RechargeExplain"
            name="RechargeExplain"
            component={RechargeExplain}
            options={RechargeExplainOptions}
          />
          <Stack.Screen
            key="Home"
            name="Home"
            component={Home}
            options={{
              header: () => null,
            }}
          />

          <Stack.Screen
            key="EditJobAddress"
            name="EditJobAddress"
            component={EditJobAddress}
            options={EditJobAddressOptions}
          />
          <Stack.Screen
            key="SearchJobAddress"
            name="SearchJobAddress"
            component={SearchJobAddress}
            options={SearchJobAddressOptions}
          />

          <Stack.Screen
            key="EditJobDescription"
            name="EditJobDescription"
            component={EditJobDescription}
            options={EditJobDescriptionOptions}
          />
          <Stack.Screen
            key="JobPostRule"
            name="JobPostRule"
            component={JobPostRule}
            options={JobPostRuleOptions}
          />
          <Stack.Screen
            key="PostJobSuccess"
            name="PostJobSuccess"
            component={PostJobSuccess}
            options={PostJobSuccessOptions}
          />
          <Stack.Screen
            key="EditJobName"
            name="EditJobName"
            component={EditJobName}
            options={EditJobNameOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

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

const screens: {
  [key: string]: () => JSX.Element
} = {
  Home,
  PostJob,
}

export default App
