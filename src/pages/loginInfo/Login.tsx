import React, { Component } from 'react'
import { Text, View, Image, ScrollView, BackHandler, Platform, TextInput, DeviceEventEmitter, StatusBar } from 'react-native'
import styles from './styles/Login.style'
import { GenProps } from '../../navigator/router/stack'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import * as actions from '../../action/loginAction'
import { IStoreState } from '../../reducer'
import LoginInputComponent from './LoginInputComponent'
import NextTouchableOpacity from '../components/NextTouchableOpacity'
import RootLoading from '../../utils/rootLoading'
import AlertContentModal from '../components/AlertContentModal'
import WhiteContentModal from '../components/WhiteContentModal'
import GradientButton from '../components/GradientButton'
import SystemHelper from '../../utils/system'
import { CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { Login_type } from '../../utils/constant'
import {
  Query
} from "@apollo/client/react/components"
import {
  gql
} from "@apollo/client"
import { numberRegex } from '../../utils/regex'

type IProps = GenProps<'LoginScreen'> & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

interface IState {
  loginType: number,
  passwordShow: boolean,
  showRegisterTips: boolean,
  showPrivacyTips: boolean,
  account: string
  password: string
}

class LoginScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      loginType: 1, // 0 : 一键登录 1: 账号密码登录 2: 验证码登录
      passwordShow: false, // 是否隐藏密码(以*进行展示)
      showRegisterTips: false,
      showPrivacyTips: false,
      account: '13951848647',
      password: 'ccb123123'
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    // 安卓返回按钮弹出退出确认框
    const { navigation } = this.props
    if (navigation.getState().index === 0) {
      return true
    }
    return false
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    const { reset_reducer } = this.props
    reset_reducer()
  }

  requestLogin() {
    const { account } = this.state
    if (!account) {
      RootLoading.fail('请先输入账户名')
      return
    }
    // TODO 哪些场景会弹出 用户协议和隐私政策 的提示 modal
    this.setState({ showPrivacyTips: true })
  }

  renderOneClickLogin() {
    const { account } = this.state
    return (
      <View style={styles.oneClickLoginView}>
        <Image
          style={styles.logoImg}
          source={require('../../assets/czzlogo.png')}
        />
        <Text style={styles.logoText}>为您提供优质的人力资源服务</Text>
        <LoginInputComponent
          cellStyle={styles.oneClickLoginStyle}
          title="+86"
          inputProps={{
            value: account,
            placeholder: '请输入您的手机号码',
            onChangeText: (value) => {
              this.setState({ account: value })
            },
          }}
        />
        <NextTouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            RootLoading.info('一键登录')
          }}
        >
          <Text style={styles.loginText}>一键登录</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.passwordLogin}
          onPress={() => {
            this.setState({ loginType: 1 })
            RootLoading.info('账号密码登录')
          }}
        >
          <Text style={styles.passwordLoginText}>账号密码登录</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderPasswordLogin() {
    const { passwordShow, account, password } = this.state
    const { navigation, loginMobile } = this.props
    return (
      <View>
        <Text style={styles.accountLoginTitle}>密码登录</Text>
        <View style={styles.accountLoginConatiner}>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.accountLoginInput}
            placeholder="请输入手机号或邮箱"
            value={account}
            onChangeText={(value) => {
              this.setState({ account: value })
            }}
          />
        </View>
        <View style={styles.accountPasswordConatiner}>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={!passwordShow}
            keyboardType="ascii-capable"
            style={styles.accountPasswordInput}
            placeholder="请输入密码"
            value={password}
            onChangeText={(value) => {
              this.setState({ password: value })
            }}
          />
          <NextTouchableOpacity
            style={styles.passwordHideBtn}
            onPress={() => {
              this.setState({ passwordShow: !passwordShow })
            }}
          >
            <Image
              style={styles.passwordHideImg}
              source={require('../../assets/password_hide.png')}
            />
          </NextTouchableOpacity>
        </View>
        <NextTouchableOpacity
          style={[styles.loginBtn, { marginTop: 108 }, (!account || !password) && { opacity: 0.8 }]}
          disabled={!account || !password}
          onPress={() => {
            // RootLoading.info('登录')
            RootLoading.loading()
            loginMobile(account, password, (error, result) => {
              console.log('111111111: ', error)
              console.log('111111112: ', result)
              // TODO:登录接口报错,临时采取登录成功方案
              RootLoading.hide()
              RootLoading.success('登录成功')
              navigation.push('ChooseRole')
              if (!error && result) {
                RootLoading.success('登录成功')
                navigation.push('ChooseRole')
              } else if (error.toString() === 'Error: user not found') {
                RootLoading.fail('该账号未注册,请先注册')
              } else {
                RootLoading.fail(error.toString())
              }
            })
          }}
        >
          <Text style={styles.loginText}>登录</Text>
        </NextTouchableOpacity>
        <View style={styles.forgetView}>
          <NextTouchableOpacity
            style={styles.passwordLogin}
            onPress={() => {
              this.setState({
                loginType: 2,
              })
            }}
          >
            <Text style={styles.passwordLoginText}>验证码登录/注册</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.passwordLogin}
            onPress={() => {
              // navigation.push('ForgetPassword')
              if (numberRegex.test(account)) {
                navigation.push('InputVerifyCode', { phone: account })
              } else {
                RootLoading.info('请输入正确的手机号以接收验证码!')
              }
            }}
          >
            <Text style={styles.passwordLoginText}>忘记密码</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderVerifyCodeLogin() {
    const { account } = this.state
    return (
      <View>
        <View style={styles.verifyCodeLoginView}>
          <Text style={styles.accountLoginTitle}>手机号登录/注册</Text>
          <LoginInputComponent
            cellStyle={[styles.oneClickLoginStyle, { marginTop: 31 }]}
            title="+86"
            inputProps={{
              value: account,
              placeholder: '请输入您的手机号码',
              onChangeText: (value) => {
                this.setState({ account: value })
              },
            }}
          />
          <NextTouchableOpacity
            style={[styles.loginBtn, { marginTop: 44 }]}
            onPress={() => {
              if (numberRegex.test(account)) {
                this.requestLogin()
              } else {
                RootLoading.info('请输入正确的手机号以接收验证码!')
              }
            }}
          >
            <Text style={styles.loginText}>下一步</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.passwordLogin}
            onPress={() => {
              this.setState({ loginType: 1 })
              // RootLoading.info('账号密码登录')
            }}
          >
            <Text style={styles.passwordLoginText}>账号密码登录</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderPrivicy() {
    const { loginType } = this.state
    const { navigation } = this.props
    return (
      <View>
        {loginType === 2 ? (
          <View style={styles.thirdLoginView}>
            <Text style={styles.thirdLoginTitle}>第三方登录</Text>
            <View style={styles.thirdLoginBtn}>

              <NextTouchableOpacity
                onPress={() => {
                  RootLoading.info('微信登录,敬请期待')
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../assets/wx_logo.png')}
                />
              </NextTouchableOpacity>
              <NextTouchableOpacity
                onPress={() => {
                  RootLoading.info('苹果登录,敬请期待')
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../assets/apple_logo.png')}
                />
              </NextTouchableOpacity>
            </View>
          </View>
        ) : null}
        <View style={styles.privacyView}>
          <Text style={styles.privacyText}>
            {loginType === 2 ? '阅读' : '进入即代表您已同意'}
          </Text>
          <NextTouchableOpacity
            onPress={() => {
              navigation.push('AgreementPrivacy', { pageType: 1 })
            }}
          >
            <Text style={styles.privacyDetail}>《用户协议》</Text>
          </NextTouchableOpacity>
          <Text style={styles.privacyText}>
            及
          </Text>
          <NextTouchableOpacity
            onPress={() => {
              navigation.push('AgreementPrivacy', { pageType: 2 })
            }}
          >
            <Text style={styles.privacyDetail}>《隐私政策》</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderRegisterTipView() {
    const { account } = this.state
    return (
      <View style={styles.registerTipView}>
        <Text style={styles.registerTipTitle}>
          {`新手机号注册提醒手机号[${account}]未注册，点击注册，将为您注册账号并进入趁早找。`}
        </Text>
        <View style={styles.registerTipBtnView}>
          <NextTouchableOpacity
            style={styles.registerTipLeftBtn}
            onPress={() => {
              this.setState({ showRegisterTips: false })
            }}
          >
            <Text style={styles.accountTitle}>换账号登录</Text>
          </NextTouchableOpacity>
          <GradientButton
            containerStyle={styles.registerTipRightBtn}
            text="注册"
            onPress={() => {
              const { navigation } = this.props
              navigation.push('InputVerifyCode', { phone: account })
              //   AsyncStorage.setItem(Login_type, '1', (error) => {
              //     console.log('1111111111: ', error)
              //     if (!error) {
              //       const { navigation } = this.props
              //       navigation.dispatch(
              //         CommonActions.reset({
              //           index: 1,
              //           routes: [
              //             { name: 'Dummy' },
              //           ],
              //         })
              //       )

              //     } else {
              //       RootLoading.fail('请重试或联系客服')
              //     }
              //   })
            }}
          />
        </View>
      </View>
    )
  }

  renderPrivacyView() {
    const { account } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.privacyModal}>
        <Text style={styles.privacyModalTitle}>
          请阅读并同意以下内容
        </Text>
        <View style={styles.privacyModalTitleView}>
          <NextTouchableOpacity
            onPress={() => {
              this.setState({ showPrivacyTips: false }, () => {
                navigation.push('AgreementPrivacy', { pageType: 1 })
              })
            }}
          >
            <Text style={[styles.privacyDetail, { fontWeight: 'bold' }]}>《用户协议》</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            onPress={() => {
              this.setState({ showPrivacyTips: false }, () => {
                navigation.push('AgreementPrivacy', { pageType: 2 })
              })
            }}
          >
            <Text style={[styles.privacyDetail, { fontWeight: 'bold' }]}>《隐私政策》</Text>
          </NextTouchableOpacity>
        </View>
        <View style={[styles.registerTipBtnView, {
          marginTop: 26
        }]}>
          <NextTouchableOpacity
            style={[styles.registerTipLeftBtn, { width: 110 }]}
            onPress={() => {
              this.setState({ showPrivacyTips: false })
            }}
          >
            <Text style={styles.accountTitle}>返回</Text>
          </NextTouchableOpacity>
          <GradientButton
            containerStyle={styles.agreeBtn}
            text="同意并继续"
            onPress={() => {
              this.setState({ showPrivacyTips: false }, () => {
                RootLoading.loading()
                const { userNumberCheck } = this.props
                userNumberCheck(account, (error, result) => {
                  console.log('sssssssssssSS: ', error, result)
                  RootLoading.hide()
                  if (!error && result) {
                    if (result.UserNumberCheck) {
                      // 该手机号是否可用(是否已经注册过)-已经注册过
                      navigation.push('InputVerifyCode', { phone: account })
                    } else {
                      this.setState({ showRegisterTips: true })
                    }
                  } else {
                    RootLoading.fail(error)
                  }
                })
              })
            }}
          />
        </View>
      </View >
    )
  }

  render() {
    const { loginType, showRegisterTips, showPrivacyTips } = this.state
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.scrollview}
        >
          {
            loginType === 0 ? (
              this.renderOneClickLogin()
            ) : (
              loginType === 1 ? (
                this.renderPasswordLogin()
              ) : (
                this.renderVerifyCodeLogin()
              )
            )
          }
        </ScrollView>
        {this.renderPrivicy()}
        <WhiteContentModal
          visible={showRegisterTips}
        >
          {this.renderRegisterTipView()}
        </WhiteContentModal>
        <WhiteContentModal
          visible={showPrivacyTips}
          modalStyle={{
            height: 185,
            width: SystemHelper.width,
            bottom: SystemHelper.safeBottom,
          }}
          contextStyle={{
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            height: '100%',
            marginHorizontal: 0,
            overflow: 'hidden',
            width: SystemHelper.width,
          }}
          contextChildrenStyle={{
            alignItems: 'baseline'
          }}
        >
          {this.renderPrivacyView()}
        </WhiteContentModal>
      </View >
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    email: state.loginInfo.email,
    phone: state.loginInfo.phone,
    password: state.loginInfo.password,
    verifyCode: state.loginInfo.verifyCode,
    loginType: state.loginInfo.loginType,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({
    reset_reducer: actions.reset_reducer,
    update_kv: actions.update_kv,
    loginMobile: actions.loginMobile,
    userNumberCheck: actions.userNumberCheck
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)