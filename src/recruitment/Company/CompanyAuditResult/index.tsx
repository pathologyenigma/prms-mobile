import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import Pending from './Pending'
import Approved from './Approved'
import Rejected from './Rejected'

export const CompanyAuditResultOptions: StackNavigationOptions = {
  title: '企业认证',
}

export default function CompanyAuditResult() {
  return (
    <View style={styles.container}>
      <Rejected reason="请填写正确的公司信息" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
})
