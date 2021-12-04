import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'

export const PageTempleteOptions: StackNavigationOptions = {
  title: '页面模版',
  headerShown: false,
}

export default function PageTemplete() {
  return (
    <View style={styles.container}>
      <NavBar title="标题" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}></ScrollView>
    </View>
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
