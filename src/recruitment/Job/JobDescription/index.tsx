import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import IconButton from '../../components/IconButton'
import JobMeta from './JobMeta'
import Collaborator from './Collaborator'
import JobIntro from './JobIntro'
import CompanyInfo from './CompanyInfo'
import Audit from './Audit'
import GhostButton from '../../components/GhostButton'
import GradientButton from '../../components/GradientButton'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import { useNavigation } from '@react-navigation/native'
import AlertModal from '../../components/AlertModal'
import { useState } from 'react'
import NavBar from '../../components/NavBar'

export default function JobDescription() {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const [stopHireModalVisible, setStopHireModalvisible] = useState(false)

  return (
    <View style={styles.container}>
      <NavBar
        style={{ backgroundColor: '#F8F8F8' }}
        title=""
        headerRight={() => (
          <IconButton
            icon={require('./images/share.png')}
            style={styles.shareIcon}
          />
        )}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <Audit status="已拒绝" />
        <JobMeta />
        <Collaborator />
        <JobIntro />
        <CompanyInfo />
      </ScrollView>
      <View style={styles.buttons}>
        <GhostButton
          style={styles.ghost}
          title="编辑职位"
          onPress={() => navigation.navigate('PostJob')}
        />
        <GradientButton
          style={styles.gradient}
          title="停止招聘"
          onPress={() => setStopHireModalvisible(true)}
        />
      </View>
      <AlertModal
        visible={stopHireModalVisible}
        title="温馨提示"
        msg="停止招聘后，职位信息将不会在求职端展示"
        onNegativePress={() => setStopHireModalvisible(false)}
        onPositivePress={() => setStopHireModalvisible(false)}
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
    backgroundColor: '#F8F8F8',
  },
  shareIcon: {
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 11,
    paddingTop: 5,
    paddingBottom: isIphoneX() ? getBottomSpace() + 5 : 5,
  },
  ghost: {
    flex: 1,
  },
  gradient: {
    width: 190,
    marginLeft: 14,
  },
})
