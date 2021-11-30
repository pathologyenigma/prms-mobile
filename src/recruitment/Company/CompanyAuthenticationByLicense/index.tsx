import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import IconButton from '../../components/IconButton'

export const CompanyAuthenticationByLicenseOptions: StackNavigationOptions = {
  title: '证照原件认证',
  headerRight: () => (
    <IconButton
      icon={require('../images/more.png')}
      style={{ marginRight: 11 }}
    />
  ),
}

export default function CompanyAuthenticationByLicense() {
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
