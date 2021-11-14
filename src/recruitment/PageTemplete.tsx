import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'

export const EditJobNameOptions: StackNavigationOptions = {
  title: '职位名称',
}

export default function EditJobName() {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
})
