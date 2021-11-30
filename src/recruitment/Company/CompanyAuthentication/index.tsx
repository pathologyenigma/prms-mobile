import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native'
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import IconButton from '../../components/IconButton'
import GradientButton from '../../components/GradientButton'
import TextButton from '../../components/TextButton'
import { useNavigation } from '@react-navigation/native'
import CompanyAddressModal from '../CompanyAddressModal'
import CompanyCategoryModal from '../CompanyCategoryModal'
import { useState } from 'react'
import Hotline from '../Hotline'
import PrimaryButton from '../../components/PrimaryButton'

export const CompanyAuthenticationOptions: StackNavigationOptions = {
  title: '公司认证',
  headerRight: () => (
    <IconButton
      icon={require('../images/more.png')}
      style={{ marginRight: 11 }}
    />
  ),
}

export default function CompanyAuthentication() {
  const navigation = useNavigation<StackNavigationProp<any>>()

  const [addressModalVisible, setAddressModalVisible] = useState(false)
  const [categoryModalVisible, setCategoryModalVisible] = useState(false)

  return (
    <KeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      keyboardShouldPersistTaps="never"
      keyboardDismissMode={'on-drag'}
      enableResetScrollToCoords={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}>
      <View style={styles.hintContainer}>
        <Text style={styles.hint}>
          你所提供的信息将得到绝对保护，仅限审核使用
        </Text>
      </View>
      <TitleAndDetail
        title="公司全称"
        placeholder="请输入公司全称"
        onPress={() => navigation.navigate('CompanyFullName')}
        renderHint={() => (
          <>
            <Image
              style={styles.titleHintIcon}
              source={require('./warning.png')}
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
  )
}

interface TitleAndDetailProps {
  title: string
  placeholder?: string
  value?: string
  onPress?: () => void
  renderHint?: () => JSX.Element
  renderDetail?: () => JSX.Element
}

function TitleAndDetail({
  title,
  placeholder,
  value,
  onPress,
  renderHint,
  renderDetail,
}: TitleAndDetailProps) {
  const hasValue = !!value

  const _renderDetail = () => {
    if (renderDetail) {
      return renderDetail()
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.detailRow}>
          <Text style={hasValue ? styles.detail : styles.placeholder}>
            {hasValue ? value : placeholder}
          </Text>
          <Image
            style={styles.indicator}
            source={require('../../assets/indicator.png')}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.titleAndDetail}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        {renderHint && renderHint()}
      </View>
      {_renderDetail()}
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
  hintContainer: {
    height: 50,
    marginLeft: 11,
    width: 300,
    justifyContent: 'center',
  },
  hint: {
    color: '#888888',
    fontSize: 13,
    lineHeight: 17,
  },
  titleAndDetail: {
    height: 80,
    paddingHorizontal: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ECECEC',
    justifyContent: 'flex-end',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#666666',
    fontSize: 13,
  },
  placeholder: {
    color: '#CCCCCC',
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    marginTop: 2,
  },
  detail: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    right: 0,
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
