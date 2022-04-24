import React from 'react'
import { StyleSheet, View } from 'react-native'
import Pending from './Pending'
import Approved from './Approved'
import Rejected from './Rejected'
import NavBar from '../../components/NavBar'

export default function CompanyAuditResult() {
  return (
    <View style={styles.container}>
      <NavBar title="企业认证" />
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
