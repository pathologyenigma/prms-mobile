import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'

import GradientButton from '../../components/GradientButton'
import { isIphoneX } from 'react-native-iphone-x-helper'
import NavBar from '../../components/NavBar'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import RadioGroup from '../../components/RadioGroup'
import RadioLabel from '../../components/RadioLabel'
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
  const navigation = useNavigation<StackNavigationProp<any>>()
  return (
    <View style={styles.container}>
      <NavBar title="个人资料" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <View style={styles.head}>
          <Text style={styles.detail}>头像</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('AvatarViewer')}>
            <Image source={require('../../assets/avatar_default.png')} />
          </TouchableWithoutFeedback>
        </View>
        <Item title="姓名" detail="李小冉" onPress={() => {}} />
        <View style={styles.gender}>
          <Text style={styles.genderTitle}>性别</Text>
          <RadioGroup value={true}>
            <RadioLabel
              label="男"
              value={true}
              style={[styles.labelButton, styles.genderButton]}
              checkedStyle={styles.labelButtonChecked}
            />
            <RadioLabel
              label="女"
              style={[
                { marginLeft: 15 },
                styles.labelButton,
                styles.genderButton,
              ]}
              checkedStyle={styles.labelButtonChecked}
            />
          </RadioGroup>
        </View>
        <Item title="公司" detail="猎德科技有限公司" />
        <Item title="职位" detail="人事主管" onPress={() => {}} />
        <Item title="手机号码" detail="1348004433" onPress={() => {}} />
        <Item title="邮箱" detail="Lixiaoran@163.com" onPress={() => {}} />

        <GradientButton title="保存" style={styles.button} />
      </ScrollView>
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
