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

export const PageTempleteOptions: StackNavigationOptions = {
  title: '页面模版',
}

export default function PageTemplete() {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
})
