import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import NavBar from '../../components/NavBar'
import GhostButton from '../../components/GhostButton'
import LeaveCompanyModal from './LeaveCompanyModal'
import { useState } from 'react'

export default function ChangeCompany() {
  const [leaveModalVisible, setLeaveModalVisible] = useState(false)

  const renderCompanyItem = () => {
    return (
      <View style={styles.item}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            深圳市智慧网络科技有限公司深圳市智慧网络科技有限公司
          </Text>
          <Text style={styles.audit}>认证已通过</Text>
        </View>
        <Text style={styles.lastTime}>最近登录 2021-12-01 22:24:37</Text>
        <View style={styles.actions}>
          <GhostButton
            style={styles.ghostButton}
            textStyle={styles.ghostButtonText}
            title="离开公司"
            onPress={() => setLeaveModalVisible(true)}
          />
          <GhostButton
            style={[
              styles.ghostButton,
              styles.current,
              styles.ghostButtonDisabled,
            ]}
            textStyle={[styles.ghostButtonText, styles.ghostButtonTextDisabled]}
            disabled
            title="当前登录"
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <NavBar title="切换公司" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        {renderCompanyItem()}
        <Text style={styles.hotline}>
          客服热线：
          <Text style={styles.hotlineButton} suppressHighlighting>
            400-885-9898
          </Text>
        </Text>
      </ScrollView>
      <LeaveCompanyModal
        visible={leaveModalVisible}
        onDismiss={() => setLeaveModalVisible(false)}
      />
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
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: '#DEDEDE',
    shadowOpacity: 0.6,
    marginHorizontal: 18,
    marginTop: 18,
    elevation: 8,
  },
  nameRow: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 13,
    alignItems: 'center',
  },
  name: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  audit: {
    color: '#57DE9E',
    fontSize: 11,
    paddingHorizontal: 3,
    lineHeight: 16,
    backgroundColor: '#57DE9E16',
    borderRadius: 2,
    overflow: 'hidden',
    marginLeft: 16,
  },
  lastTime: {
    color: '#888888',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 8,
    marginHorizontal: 15,
  },
  actions: {
    marginHorizontal: 15,
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ghostButton: {
    height: 27,
    borderRadius: 13,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#57DE9E',
    backgroundColor: '#FFFFFF',
  },
  ghostButtonText: {
    color: '#57DE9E',
    fontSize: 14,
    fontWeight: 'normal',
  },
  ghostButtonDisabled: {
    borderColor: '#ECECEC',
  },
  ghostButtonTextDisabled: {
    color: '#E2E2E2',
  },
  current: {
    marginLeft: 16,
  },
  hotline: {
    marginHorizontal: 18,
    alignSelf: 'flex-end',
    marginTop: 9,
    color: '#AAAAAA',
    fontSize: 11,
  },
  hotlineButton: {
    color: '#57DE9E',
  },
})
