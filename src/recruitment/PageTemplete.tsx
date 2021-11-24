import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'

export const PageTempleteOptions: StackNavigationOptions = {
  title: '页面模版',
}

export default function PageTemplete() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}></ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
})
