import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import CheckLabel from '../../components/CheckLabel'
import GradientButton from '../../components/GradientButton'
import { isIphoneX } from 'react-native-iphone-x-helper'

export const HrProfileOptions: StackNavigationOptions = {
  title: '个人资料',
}

interface ItemProps {
  title: string
  detail: string
  onPress?: () => void
}

const Item = ({ title, detail, onPress }: ItemProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          <Text style={styles.detail}>{detail}</Text>
          {!!onPress && (
            <Image source={require('../../assets/indicator.png')} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function HrProfile() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.head}>
        <Text style={styles.detail}>头像</Text>
        <Image source={require('../../assets/avatar_default.png')} />
      </View>
      <Item title="名称显示" detail="李小冉" />
      <Item title="名称显示" detail="李小冉" onPress={() => {}} />
      <View style={styles.gender}>
        <Text style={styles.genderTitle}>性别</Text>
        <CheckLabel
          title="男"
          checked={false}
          style={[styles.labelButton, styles.genderButton]}
        />
        <CheckLabel
          title="女"
          checked={true}
          style={[
            { marginLeft: 15 },
            styles.labelButton,
            styles.genderButton,
            styles.labelButtonChecked,
          ]}
        />
      </View>
      <Item title="所在公司" detail="猎德科技有限公司" />
      <Item title="当前职位" detail="人事主管" onPress={() => {}} />
      <Item title="手机号码" detail="1348004433" onPress={() => {}} />
      <Item title="公司邮箱" detail="Lixiaoran@163.com" onPress={() => {}} />
      <View style={styles.capacityContainer}>
        <Text style={styles.title}>选择身份</Text>
        <View style={styles.capacity}>
          <CheckLabel
            title="主管/员工"
            checked={false}
            style={[styles.labelButton, styles.capacityButton]}
          />
          <CheckLabel
            title="HR/HRBP"
            checked={true}
            style={[
              { marginLeft: 11 },
              styles.labelButton,
              styles.capacityButton,
              styles.labelButtonChecked,
            ]}
          />
          <CheckLabel
            title="暂时保密"
            checked={false}
            style={[
              { marginLeft: 11 },
              styles.labelButton,
              styles.capacityButton,
            ]}
          />
        </View>
      </View>
      <GradientButton title="保存" style={styles.button} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: isIphoneX() ? 40 : 6,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    justifyContent: 'space-between',
    marginHorizontal: 11,
  },
  avatar: {
    width: 65,
    height: 65,
  },
  item: {
    height: 80,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 11,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    marginTop: 12,
    color: '#666666',
    fontSize: 13,
  },
  detail: {
    color: '#333333',
    fontSize: 15,
    flexGrow: 1,
  },
  gender: {
    flexDirection: 'row',
    height: 80,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 11,
    alignItems: 'center',
  },
  genderTitle: {
    color: '#666666',
    fontSize: 13,
    flexGrow: 1,
  },
  genderButton: {
    width: 56,
    fontSize: 13,
    height: 27,
    lineHeight: 27,
  },
  labelButton: {
    fontSize: 15,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    color: '#333333',
    borderColor: '#BEBEBE',
    backgroundColor: '#FFFFFF',
  },
  labelButtonChecked: {
    color: '#7AD398',
    borderColor: '#7AD398',
    backgroundColor: '#E9FFF0',
  },
  capacityContainer: {
    paddingHorizontal: 11,
  },
  capacity: {
    marginTop: 18,
    flexDirection: 'row',
  },
  capacityButton: {
    flex: 1,
    height: 39,
    lineHeight: 39,
  },
  button: {
    marginHorizontal: 22,
    marginTop: 52,
  },
})
