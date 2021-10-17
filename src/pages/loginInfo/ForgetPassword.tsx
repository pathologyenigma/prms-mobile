import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/ForgetPassword.style'
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
import NavBar, { EButtonType } from '../components/NavBar'

type IProps = GenProps<'ForgetPassword'> & {
  email: string,
  password: string,
  number: string,
}

interface IState {
  email: string
  phone: string
  password: string
  verifyCode: string
  countTime: number
}

class ForgetPassword extends Component<IProps, IState> {
  private getCodeTimeout: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      email: '',
      phone: '',
      password: '',
      verifyCode: '',
      countTime: 60
    }
  }

  requestFinish() {
    const { phone, email, password } = this.state
    if (!phone && !email) {
      RootLoading.fail('请输入手机号码或邮箱')
      return
    }

  }

  componentWillUnmount() {
    if (this.getCodeTimeout) {
      clearTimeout(this.getCodeTimeout)
    }
  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        left={{
          type: EButtonType.IMAGE,
          value: require('../../assets/black_back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  renderPhone() {
    const { phone } = this.state
    return (
      <View style={styles.accountLoginContainer}>
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
    )
  }

  countTimeFunc(currentTime: number) {
    console.log('nowTime: ', new Date())
    console.log('currentTime: ', currentTime)
    this.getCodeTimeout = setTimeout(() => {
      if (currentTime > 0) {
        this.setState({ countTime: currentTime - 1 }, () => {
          this.countTimeFunc(currentTime - 1)
        })
      } else {
        this.setState({ countTime: 60 })
      }
    }, 1000);
  }

  renderVerifyCode() {
    const { verifyCode, countTime } = this.state
    return (
      <View style={styles.renderVerifyCodeConatiner}>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          style={[styles.accountLoginInput, { flex: 1 }]}
          placeholder="输入验证码"
          value={verifyCode}
          onChangeText={(value) => {
            this.setState({ verifyCode: value })
          }}
        />
        {countTime === 60 ? (
          <GradientButton
            text="获取验证码"
            containerStyle={styles.countTimeBtn}
            textStyle={styles.countTimeBtnTitle}
            onPress={() => {
              this.countTimeFunc(60)
            }}
          />
        ) : (
          <Text style={styles.countTimeBtnText}>
            {`获取验证码${countTime}s`}
          </Text>
        )}
      </View>
    )
  }

  renderPassword() {
    const { password } = this.state
    return (
      <View style={styles.accountLoginConatiner}>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          style={styles.accountLoginInput}
          placeholder="密码（6～20字母数字组合）"
          value={password}
          onChangeText={(value) => {
            this.setState({ password: value })
          }}
        />
      </View>
    )
  }

  renderFinish() {
    return (
      <NextTouchableOpacity
        style={styles.finishBtn}
      >
        <Text
          style={styles.finishBtnText}
        >
          完成
        </Text>
      </NextTouchableOpacity>
    )
  }

  render() {
    const { phone } = this.state
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.scrollview}
        >
          <Text style={styles.findPassword}>找回密码</Text>
          {this.renderPhone()}
          {this.renderVerifyCode()}
          {this.renderPassword()}
          {this.renderFinish()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    email: state.loginInfo.email,
    phone: state.loginInfo.phone,
    password: state.loginInfo.password,
    verifyCode: state.loginInfo.verifyCode,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({
    reset_reducer: actions.reset_reducer,
    update_kv: actions.update_kv,
    loginMobile: actions.loginMobile,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)