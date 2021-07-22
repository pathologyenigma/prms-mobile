import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, StatusBar } from 'react-native'
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

type IProps = GenProps<'LoginScreen'> & {
  email: string,
  password: string,
  number: string,
  reset_reducer: () => void,
  update_kv: (key: string, value: string | number) => void,
  loginMobile: any
}

interface IState {
  loginType: number,
  passwordShow: boolean,
  showRegisterTips: boolean,
  showPrivacyTips: boolean,
  phone: string
  password: string
}

class LoginScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      loginType: 2, // 0 : 一键登录 1: 账号密码登录 2: 验证码登录
      passwordShow: false, // 是否隐藏密码(以*进行展示)
      showRegisterTips: false,
      showPrivacyTips: false,
      phone: '',
      password: ''
    }
  }

  componentWillUnmount() {
    const { reset_reducer } = this.props
    reset_reducer()
  }

  requestLogin() {
    const { phone } = this.state
    if (!phone) {
      RootLoading.fail('请先输入手机号码')
      return
    }
    // TODO 哪些场景会弹出 用户协议和隐私政策 的提示 modal
    this.setState({ showPrivacyTips: true })
  }

  renderOneClickLogin() {
    const { dispatch, update_kv } = this.props
    const { phone } = this.state
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
            value: phone,
            placeholder: '请输入您的手机号码',
            onChangeText: (value) => {
              this.setState({ phone: value })
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
    const { passwordShow, phone, password } = this.state
    const { navigation } = this.props
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
            value={phone}
            onChangeText={(value) => {
              this.setState({ phone: value })
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
          style={[styles.loginBtn, { marginTop: 108 }]}
          onPress={() => {
            // RootLoading.info('登录')
            navigation.push('ChooseRole')
          }}
        >
          <Text style={styles.loginText}>登录</Text>
        </NextTouchableOpacity>
        <View style={styles.forgetView}>
          <NextTouchableOpacity
            style={styles.passwordLogin}
            onPress={() => {
              this.setState({ loginType: 2 })
              RootLoading.info('验证码登录/注册')
            }}
          >
            <Text style={styles.passwordLoginText}>验证码登录/注册</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.passwordLogin}
            onPress={() => {
              RootLoading.info('忘记密码')
              navigation.push('ForgetPassword')
            }}
          >
            <Text style={styles.passwordLoginText}>忘记密码</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderVerifyCodeLogin() {
    return (
      <View>
        <View style={styles.verifyCodeLoginView}>
          <Text style={styles.accountLoginTitle}>手机号登录/注册</Text>
          <LoginInputComponent
            cellStyle={[styles.oneClickLoginStyle, { marginTop: 31 }]}
            title="+86"
            inputProps={{
              placeholder: '请输入您的手机号码',
              onChangeText: (value) => {
                this.setState({ phone: value })
              },
            }}
          />
          <NextTouchableOpacity
            style={[styles.loginBtn, { marginTop: 44 }]}
            onPress={() => {
              RootLoading.info('下一步')
              this.requestLogin()
            }}
          >
            <Text style={styles.loginText}>下一步</Text>
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
      </View>
    )
  }

  renderPrivicy() {
    const { loginType } = this.state
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
              RootLoading.info('用户协议,敬请期待')
            }}
          >
            <Text style={styles.privacyDetail}>《用户协议》</Text>
          </NextTouchableOpacity>
          <Text style={styles.privacyText}>
            及
          </Text>
          <NextTouchableOpacity
            onPress={() => {
              RootLoading.info('隐私政策,敬请期待')
            }}
          >
            <Text style={styles.privacyDetail}>《隐私政策》</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderRegisterTipView() {
    const { phone } = this.state
    return (
      <View style={styles.registerTipView}>
        <Text style={styles.registerTipTitle}>
          {`新手机号注册提醒手机号[${phone}]未注册，点击注册，将为您注册账号并进入趁早找。`}
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

            }}
          />
        </View>
      </View>
    )
  }

  renderPrivacyView() {
    return (
      <View style={styles.privacyModal}>
        <Text style={styles.privacyModalTitle}>
          请阅读并同意以下内容
        </Text>
        <View style={styles.privacyModalTitleView}>
          <NextTouchableOpacity
            onPress={() => {
              this.setState({ showPrivacyTips: false }, () => {
                RootLoading.info('用户协议,敬请期待')
              })
            }}
          >
            <Text style={[styles.privacyDetail, { fontWeight: 'bold' }]}>《用户协议》</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            onPress={() => {
              this.setState({ showPrivacyTips: false }, () => {
                RootLoading.info('隐私政策,敬请期待')
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
                this.setState({ showRegisterTips: true })
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
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)