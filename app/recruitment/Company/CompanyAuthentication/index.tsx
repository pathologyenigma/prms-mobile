import React from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import IconButton from '../../components/IconButton'
import CompanyAddressModal from '../CompanyAddressModal'
import CompanyCategoryModal from '../CompanyCategoryModal'
import { useState } from 'react'
import Hotline from '../Hotline'
import PrimaryButton from '../../components/PrimaryButton'
import TitleAndDetail from '../TitleAndDetail'
import Hint from './Hint'
import NavBar from '../../components/NavBar'

export default function CompanyAuthentication({ navigation }) {

  const [addressModalVisible, setAddressModalVisible] = useState(false)
  const [categoryModalVisible, setCategoryModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <NavBar
        title="公司认证"
        headerRight={() => <IconButton icon={require('../images/more.png')} />}
      />
      <KeyboardAwareScrollView
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="never"
        keyboardDismissMode={'on-drag'}
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.content}>
        <Hint />
        <TitleAndDetail
          title="公司全称"
          placeholder="请输入公司全称"
          onPress={() => navigation.navigate('CompanyFullName')}
          renderHint={() => (
            <>
              <Image
                style={styles.titleHintIcon}
                source={require('../images/warning.png')}
              />
              <Text style={styles.titleHint}>必须与公司营业执照的名称一致</Text>
            </>
          )}
        />
        <TitleAndDetail
          title="公司所在地"
          placeholder="请选择公司所在地"
          onPress={() => setAddressModalVisible(true)}
        />
        <TitleAndDetail
          title="公司类型"
          placeholder="请选择公司类型"
          onPress={() => setCategoryModalVisible(true)}
        />
        <TitleAndDetail
          title="您的职务"
          renderDetail={() => (
            <View style={styles.detailRow}>
              <TextInput
                style={styles.input}
                placeholderTextColor="#CCCCCC"
                placeholder="请填写真实职务可以让求职者更加信任您哦"
                autoCapitalize="none"
              />
            </View>
          )}
        />
        <PrimaryButton
          title="下一步"
          style={styles.next}
          onPress={() => navigation.navigate('CompanyAuthenticationMethod')}
        />
        <Text style={styles.nextHint}>
          根据法规要求，在您注册成为经办人前需应确保您所提交的相关认证材料的真实性、合法性、有效性及来源于公司的授权使用，授权目的包括但不限于注册、使用公司名下的招聘者账号
        </Text>
        <Hotline style={styles.hotline} />
        <CompanyAddressModal
          visible={addressModalVisible}
          onCancel={() => setAddressModalVisible(false)}
        />
        <CompanyCategoryModal
          visible={categoryModalVisible}
          onCancel={() => setCategoryModalVisible(false)}
        />
      </KeyboardAwareScrollView>
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
    paddingBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    marginTop: 2,
  },
  titleHint: {
    color: '#AAAAAA',
    fontSize: 11,
    marginLeft: 6,
  },
  titleHintIcon: {
    marginLeft: 9,
  },
  next: {
    marginTop: 130,
    marginHorizontal: 21,
    height: 55,
  },
  nextHint: {
    marginHorizontal: 21,
    marginTop: 12,
    color: '#888888',
    fontSize: 11,
  },
  hotline: {
    marginTop: 30,
  },
  input: {
    padding: 0,
    margin: 0,
    height: 42,
    flex: 1,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
})
