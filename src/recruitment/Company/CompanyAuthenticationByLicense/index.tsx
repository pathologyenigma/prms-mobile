import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import IconButton from '../../components/IconButton'
import Hotline from '../Hotline'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import TitleAndDetail from '../TitleAndDetail'
import { useNavigation } from '@react-navigation/native'
import PrimaryButton from '../../components/PrimaryButton'
import Hint from '../CompanyAuthentication/Hint'
import ImagePicker from '../../components/ImagePicker'
import ActionSheet from '../../components/ActionSheet'
import AlertModal from '../../components/AlertModal'
import NavBar from '../../components/NavBar'

export default function CompanyAuthenticationByLicense() {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const [actionSheetVisible, setActionSheetVisible] = useState(false)
  const [logoutModalVisible, setLogoutModalVisible] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          hitSlop={{ left: 8, right: 8, top: 20, bottom: 20 }}
          onPress={() => setActionSheetVisible(true)}
          icon={require('../images/more.png')}
          style={{ marginRight: 11 }}
        />
      ),
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <NavBar
        title="证照原件认证"
        headerRight={() => <IconButton icon={require('../images/more.png')} />}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <Hint />
        <TitleAndDetail
          title="公司全称"
          value="深圳智慧网络有限公司"
          renderHint={() => (
            <>
              <Image
                style={styles.titleAccessoryIcon}
                source={require('../images/warning.png')}
              />
              <Text style={styles.titleAccessoryText}>
                必须与公司营业执照的名称一致
              </Text>
            </>
          )}
        />
        <View style={styles.imageSection}>
          <Text style={styles.imageSectionTitle}>请上传「营业执照」照片</Text>
          <View style={styles.imageUpload}>
            <ImagePicker placeholder={require('./license.png')} />
          </View>
          <Text style={styles.spec}>
            1、上传营业执照名称需要与
            <Text style={styles.specImportant}>所填公司全称一致</Text>
          </Text>
          <Text style={styles.spec}>
            2、<Text style={styles.specImportant}>不允许上传截屏</Text>
            ，复印版需
            <Text style={styles.specImportant}>加盖公章</Text>
          </Text>
          <Text style={styles.spec}>
            3、请上传有效期在<Text style={styles.specImportant}>15天以内</Text>
            的营业执照
          </Text>
        </View>
        <PrimaryButton style={styles.primaryButton} title="提交认证" />
        <Hotline style={styles.hotline} />
        <ActionSheet
          visible={actionSheetVisible}
          onDismiss={() => setActionSheetVisible(false)}
          actions={[
            { title: '切换身份' },
            { title: '退出登录', onPress: () => setLogoutModalVisible(true) },
          ]}
        />
        <AlertModal
          visible={logoutModalVisible}
          title="是否退出登录"
          onNegativePress={() => setLogoutModalVisible(false)}
          onPositivePress={() => setLogoutModalVisible(false)}
        />
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
  },
  titleAccessoryText: {
    color: '#AAAAAA',
    fontSize: 11,
    marginLeft: 6,
  },
  titleAccessoryIcon: {
    marginLeft: 9,
  },
  hotline: {
    position: 'absolute',
    left: 21,
    bottom: getBottomSpace() + 53,
  },
  imageSection: {
    marginTop: 18,
  },
  imageSectionTitle: {
    marginHorizontal: 11,
  },
  imageUpload: {
    flex: 1,
    marginHorizontal: 18,
    marginBottom: 18,
    marginTop: 18,
    width: Dimensions.get('window').width - 2 * 18,
    aspectRatio: 339.0 / 210.0,
  },
  spec: {
    marginHorizontal: 20,
    color: '#888888',
    fontSize: 11,
    lineHeight: 16,
  },
  specImportant: {
    color: '#57D693',
    fontWeight: 'bold',
  },
  primaryButton: {
    marginHorizontal: 21,
    marginTop: 40,
  },
})
