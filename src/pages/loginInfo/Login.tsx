import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/Login.style'
import { GenProps } from '../router/stack'
import { connect } from 'react-redux'
import TextInputComponent from './components/TextInputComponent'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import * as actions from '../../action/loginAction'
import { IStoreState } from '../../reducer'
import LoginInputComponent from './components/LoginInputComponent'
import NextTouchableOpacity from './components/NextTouchableOpacity'
import RootLoading from '../../utils/rootLoading'

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
}

class LoginScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      loginType: 0, // 0 : 一键登录 1: 账号密码登录 2: 验证码登录
    }
  }

  componentWillUnmount() {
    const { reset_reducer } = this.props
    reset_reducer()
  }

  renderOneClickLogin() {
    const { dispatch, update_kv } = this.props
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
            placeholder: "请输入您的手机号码",
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
            update_kv('loginType', 1)
            RootLoading.info('账号密码登录')
          }}
        >
          <Text style={styles.passwordLoginText}>账号密码登录</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderPasswordLogin() {
    const { update_kv } = this.props
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
          />
        </View>
        <View style={styles.accountPasswordConatiner}>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.accountPasswordInput}
            placeholder="请输入密码"
          />
          <NextTouchableOpacity
            style={styles.passwordHideBtn}
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
            RootLoading.info('登录')
          }}
        >
          <Text style={styles.loginText}>登录</Text>
        </NextTouchableOpacity>
        <View style={styles.forgetView}>
          <NextTouchableOpacity
            style={styles.passwordLogin}
            onPress={() => {
              update_kv('loginType', 2)
              RootLoading.info('验证码登录/注册')
            }}
          >
            <Text style={styles.passwordLoginText}>验证码登录/注册</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.passwordLogin}
            onPress={() => {
              RootLoading.info('忘记密码')
            }}
          >
            <Text style={styles.passwordLoginText}>忘记密码</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderVerifyCodeLogin() {
    const { update_kv } = this.props
    return (
      <View>
        <Text style={styles.accountLoginTitle}>手机号登录/注册</Text>
        <LoginInputComponent
          cellStyle={[styles.oneClickLoginStyle, { marginTop: 31 }]}
          title="+86"
          inputProps={{
            placeholder: "请输入您的手机号码",
          }}
        />
        <NextTouchableOpacity
          style={[styles.loginBtn, { marginTop: 44 }]}
          onPress={() => {
            RootLoading.info('下一步')
          }}
        >
          <Text style={styles.loginText}>下一步</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.passwordLogin}
          onPress={() => {
            update_kv('loginType', 1)
            RootLoading.info('账号密码登录')
          }}
        >
          <Text style={styles.passwordLoginText}>账号密码登录</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderPrivicy() {
    return (
      <View style={styles.privacyView}>
        <Text style={styles.privacyText}>
          进入即代表您已同意
        </Text>
        <NextTouchableOpacity
          onPress={() => {
            RootLoading.info('用户协议')
          }}
        >
          <Text style={styles.privacyDetail}>《用户协议》</Text>
        </NextTouchableOpacity>
        <Text style={styles.privacyText}>
          及
        </Text>
        <NextTouchableOpacity
          onPress={() => {
            RootLoading.info('隐私政策')
          }}
        >
          <Text style={styles.privacyDetail}>《隐私政策》</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  render() {
    const { loginType } = this.props
    return (
      <View style={styles.container}>
        <ScrollView
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