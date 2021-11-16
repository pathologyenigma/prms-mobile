import React from 'react'
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GradientButton from '../../components/GradientButton'
import AdmissionPicker from './AdmissionPicker'
import DropdownButton from './DropdownButton'
import HeadcountItem from './HeadcountItem'
import JobInfoItem from './JobInfoItem'
import JobNatureModal from './JobNatureModal'
import JobAdmissionModal from './JobAdmissionModal'
import RechargeModal from '../RechargeModal'
import JobLabelModal from './JobLabelModal'
import Vip from './Vip'

export const PostJobOptions: StackNavigationOptions = {
  title: '发布职位',
}

function PostJob() {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />
      <JobInfoItem
        title="职位名称"
        placeholder="请填写您要招聘的职位"
        renderIndicator={() => <DropdownButton title="全职" />}
      />
      <JobInfoItem title="职位描述" placeholder="请填写职位描述" />
      <View style={styles.admission}>
        <AdmissionPicker title="经验要求" detail="经验不限" />
        <View style={styles.verticalDiviver} />
        <AdmissionPicker title="学历要求" detail="学历不限" />
        <View style={styles.verticalDiviver} />
        <AdmissionPicker title="薪资要求" />
        <View style={styles.diviver} />
      </View>
      <JobInfoItem
        title="上班地址"
        placeholder="请填写上班地址"
        content="深圳市南山区创智云城（建设中）创智云城A218楼 302"
      />
      <JobInfoItem title="职位福利（选填）" placeholder="如“年底双薪”" />
      <JobInfoItem
        title="选择增值服务"
        placeholder="求职者将在求职首页顶部看到您的招聘职位"
        renderTitleBadge={() => <Vip />}
      />
      <HeadcountItem />
      <GradientButton title="立即发布" style={styles.postButton} />
      <JobNatureModal visible={false} />
      <JobAdmissionModal visible={false} />
      <JobLabelModal visible={true} />
      <RechargeModal visible={false} />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 60,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
  },
  admission: {
    height: 88,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: 9,
  },
  diviver: {
    backgroundColor: '#ECECEC',
    height: 0.5,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  verticalDiviver: {
    backgroundColor: '#ECECEC',
    width: 1,
    height: 19,
    marginBottom: -2,
  },
  postButton: {
    marginTop: 68,
    marginHorizontal: 24,
  },
})

export default PostJob
