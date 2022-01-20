import React, { useEffect } from 'react'
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
import { StackScreenProps } from '@react-navigation/stack'
import RadioGroup from '../../components/RadioGroup'
import RadioLabel from '../../components/RadioLabel'
import { HrParamList } from '../typings'
import useProfile from './useProfile'
import LoadingAndError from '../../components/LoadingAndError'
import useEditProfile from './useEditProfile'
import RootLoading from '../../../utils/rootLoading'
interface HrProfileItemProps {
  title: string
  detail: string
  onPress?: () => void
}

const HrProfileItem = ({ title, detail, onPress }: HrProfileItemProps) => {
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

export default function HrProfile({
  navigation,
  route,
}: StackScreenProps<HrParamList, 'HrProfile'>) {
  const { avatar, username, gender, company, title, phoneNumber, email } =
    route.params || {}

  const { profile, loading, error, refetch } = useProfile()
  const editProfile = useEditProfile()

  const handleGenderChange = async (gender: 'male' | 'female') => {
    try {
      await editProfile({ gender: gender === 'male' })
      navigation.setParams({ gender })
    } catch (e) {
      RootLoading.info(e.message)
    }
  }

  useEffect(() => {
    if (profile) {
      navigation.setParams({
        ...profile,
      })
    }
  }, [profile])

  return (
    <View style={styles.container}>
      <NavBar title="个人资料" />
      <LoadingAndError
        loading={loading && !profile}
        error={error}
        refetch={refetch}>
        {profile && (
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}>
            <View style={styles.head}>
              <Text style={styles.detail}>头像</Text>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('AvatarViewer', {
                    avatar: profile.avatar,
                    targetRouteName: 'HrProfile',
                  })
                }>
                <Image
                  style={styles.avatar}
                  source={
                    avatar
                      ? { uri: avatar }
                      : require('../../assets/avatar_default.png')
                  }
                />
              </TouchableWithoutFeedback>
            </View>
            <HrProfileItem
              title="姓名"
              detail={username || '请完善'}
              onPress={() => navigation.navigate('EditHrName', { username })}
            />
            <View style={styles.gender}>
              <Text style={styles.genderTitle}>性别</Text>
              <RadioGroup
                value={gender}
                onValueChecked={v => handleGenderChange(v)}>
                <RadioLabel
                  label="男"
                  value="male"
                  style={[styles.labelButton, styles.genderButton]}
                  checkedStyle={styles.labelButtonChecked}
                />
                <RadioLabel
                  label="女"
                  value="female"
                  style={[
                    { marginLeft: 15 },
                    styles.labelButton,
                    styles.genderButton,
                  ]}
                  checkedStyle={styles.labelButtonChecked}
                />
              </RadioGroup>
            </View>
            <HrProfileItem title="公司" detail={company || ''} />
            <HrProfileItem
              title="职位"
              detail={title || '请完善'}
              onPress={() => navigation.navigate('EditHrTitle', { title })}
            />
            <HrProfileItem
              title="手机号码"
              detail={phoneNumber || '请完善'}
              onPress={() =>
                navigation.navigate('EditHrPhoneNumber', {
                  phoneNumber,
                })
              }
            />
            <HrProfileItem
              title="邮箱"
              detail={email || '请完善'}
              onPress={() => navigation.navigate('EditHrEmail', { email })}
            />
            <GradientButton
              title="保存"
              style={styles.button}
              onPress={() => {
                // 仅仅是安慰
                navigation.goBack()
              }}
            />
          </ScrollView>
        )}
      </LoadingAndError>
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
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
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
