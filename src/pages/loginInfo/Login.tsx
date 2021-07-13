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

type IProps = GenProps<'LoginScreen'> & {
  email: string,
  password: string,
  number: string,
  reset_reducer: () => void,
  update_kv: (key: string, value: string) => void,
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
    return (
      <View>
        <Image
          source={require('../../assets/czzlogo.png')}
        />
        <LoginInputComponent
          title="请输入手机号码"
        />
      </View>
    )
  }

  renderPasswordLogin() {
    return (
      <View>
        <TextInputComponent
          title={Localization.get('email')}
          cellStyle={[{ marginTop: 20, marginHorizontal: 30 }, emailWarning && { borderBottomColor: '#FF4B4B' }]}
          warning={emailWarning}
          inputProps={{
            value: email,
            placeholder: Localization.get('email'),
            keyboardType: Platform.OS === 'ios' ? 'ascii-capable' : 'email-address',
            onChangeText: (value) => {
              update_kv('email', value)
            },
          }}
        />
      </View>
    )
  }

  renderVerifyCodeLogin() {
    return (
      <View>

      </View>
    )
  }

  renderPrivicy() {
    return (
      <Text>
        进入即代表您已同意《用户协议》及《隐私政策》
      </Text>
    )
  }

  render() {
    const { loginType } = this.props
    if (loginType === 0) {
      return this.renderOneClickLogin()
    }
    return (
      <View style={styles.container}>
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