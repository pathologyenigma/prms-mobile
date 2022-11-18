import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  BackHandler,
  Platform,
  TextInput,
  DeviceEventEmitter,
  StatusBar,
  Keyboard,
} from 'react-native'
import styles from './styles/Login.style'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import LoginInputComponent from './LoginInputComponent'
import NextPressable from '../components/NextPressable'
import AlertContentModal from '../components/AlertContentModal'
import WhiteContentModal from '../components/WhiteContentModal'
import GradientButton from '../components/GradientButton'
import SystemHelper from '../../utils/system'
import { CommonActions } from '@react-navigation/native'
import { numberRegex } from '../../utils/regex'
import HTAuthManager from '~/common/auth/common/model/HTAuthManager'

type IProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

interface IState {
  loginType: number
  passwordShow: boolean
  showRegisterTips: boolean
  showPrivacyTips: boolean
}

class LoginScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      account: HTAuthManager?.keyValueList?.lastLoginAccount ?? '',
      password: HTAuthManager?.keyValueList?.lastLoginPassword ?? '',


      loginType: 1, // 0 : 一键登录 1: 账号密码登录 2: 验证码登录
      passwordShow: false, // 是否隐藏密码(以*进行展示)
      showRegisterTips: false,
      showPrivacyTips: false,
    }
  }

  requestLogin() {
    if (!this.state.account) {
      Toast.show('请先输入账户名')
      return
    }
    // TODO 哪些场景会弹出 用户协议和隐私政策 的提示 modal
    Keyboard.dismiss()
    this.setState({ showPrivacyTips: true })
  }

  renderOneClickLogin() {
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
            value: this.state.account,
            placeholder: '请输入您的手机号码',
            onChangeText: value => {
              this.setState({ account: value })
            },
          }}
        />
        <NextPressable
          style={styles.loginBtn}
          onPress={() => {
            Toast.show('一键登录')
          }}>
          <Text style={styles.loginText}>一键登录</Text>
        </NextPressable>
        <NextPressable
          style={styles.passwordLogin}
          onPress={() => {
            this.setState({ loginType: 1 })
            Toast.show('账号密码登录')
          }}>
          <Text style={styles.passwordLoginText}>账号密码登录</Text>
        </NextPressable>
      </View>
    )
  }

  renderPasswordLogin() {
    const { navigation } = this.props
    const {
      passwordShow,
      account,
      password,
    } = this.state
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
            placeholder="请输入手机号"
            value={account}
            onChangeText={value => {
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
            onChangeText={value => {
              this.setState({ password: value })
            }}
          />
          <NextPressable
            style={styles.passwordHideBtn}
            onPress={() => {
              this.setState({ passwordShow: !passwordShow })
            }}>
            <Image
              style={styles.passwordHideImg}
              resizeMode="center"
              source={
                passwordShow
                  ? require('../../assets/loginPages/eye-open.png')
                  : require('../../assets/loginPages/eye-close.png')
              }
            />
          </NextPressable>
        </View>
        <NextPressable
          style={[
            styles.loginBtn,
            { marginTop: 108 },
            (!account || !password) && { opacity: 0.8 },
          ]}
          disabled={!account || !password}
          onPress={() => {
            // ActionToast.show('登录成功')
            // navigation.push('ChooseRole')
            // return
            HTAPI.UserLogIn({
            	info: {
            		account: account, 
            		password: password,
            		deviceId: 'deviceId',
            	}
            }).then(response => {
            	HTAuthManager.updateKeyValueList({
            		userToken: response.token,
            		lastLoginAccount: account,
            		lastLoginPassword: password,
            	})
            	Toast.show('登录成功')
                navigation.push('ChooseRole')
            })
          }}>
          <Text style={styles.loginText}>登录</Text>
        </NextPressable>
        <View style={styles.forgetView}>
          <NextPressable
            style={styles.passwordLogin}
            onPress={() => {
              this.setState({
                loginType: 2,
              })
            }}>
            <Text style={styles.passwordLoginText}>验证码登录/注册</Text>
          </NextPressable>
          <NextPressable
            style={styles.passwordLogin}
            onPress={() => {
              if (numberRegex.test(account)) {
              	HTAPI.UserNumberCheck({ num: account }).then(response => {
              		if (response) {
                      Toast.show('未注册的手机号码')
                      return
                    }
                    navigation.push('InputVerifyCode', {
                    	phone: account,
                    	operation: 'UserResetPassword',
                    })
              	})
              } else {
                Toast.show('请输入正确的手机号以接收验证码!')
              }
            }}>
            <Text style={styles.passwordLoginText}>忘记密码</Text>
          </NextPressable>
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
              onChangeText: value => {
              	this.setState({ account: value })
              },
            }}
          />
          <NextPressable
            style={[styles.loginBtn, { marginTop: 44 }]}
            onPress={() => {
              if (numberRegex.test(account)) {
                this.requestLogin()
              } else {
                Toast.show('请输入正确的手机号以接收验证码!')
              }
            }}>
            <Text style={styles.loginText}>下一步</Text>
          </NextPressable>
          <NextPressable
            style={styles.passwordLogin}
            onPress={() => {
              this.setState({ loginType: 1 })
              // Toast.show('账号密码登录')
            }}>
            <Text style={styles.passwordLoginText}>账号密码登录</Text>
          </NextPressable>
        </View>
      </View>
    )
  }

  renderPrivicy() {
    const { loginType } = this.state
    const { navigation } = this.props
    return (
      // v1版本适配
      <View>
        {/* {loginType === 2 ? (
          <View style={styles.thirdLoginView}>
            <Text style={styles.thirdLoginTitle}>第三方登录</Text>
            <View style={styles.thirdLoginBtn}>
              <NextPressable
                onPress={() => {
                  global.TODO_TOAST()
                }}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../assets/wx_logo.png')}
                />
              </NextPressable>
              <NextPressable
                onPress={() => {
                  global.TODO_TOAST()
                }}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={require('../../assets/apple_logo.png')}
                />
              </NextPressable>
            </View>
          </View>
        ) : null} */}
        <View style={styles.privacyView}>
          <Text style={styles.privacyText}>
            {loginType === 2 ? '阅读' : '进入即代表您已同意'}
          </Text>
          <NextPressable
            onPress={() => {
              navigation.push('AgreementPrivacy', { pageType: 1 })
            }}>
            <Text style={styles.privacyDetail}>《用户协议》</Text>
          </NextPressable>
          <Text style={styles.privacyText}>及</Text>
          <NextPressable
            onPress={() => {
              navigation.push('AgreementPrivacy', { pageType: 2 })
            }}>
            <Text style={styles.privacyDetail}>《隐私政策》</Text>
          </NextPressable>
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
          <NextPressable
            style={styles.registerTipLeftBtn}
            onPress={() => {
              this.setState({ showRegisterTips: false })
            }}>
            <Text style={styles.accountTitle}>换账号登录</Text>
          </NextPressable>
          <GradientButton
            containerStyle={styles.registerTipRightBtn}
            text="注册"
            onPress={() => {
              this.setState({ showRegisterTips: false }, () => {
                const { navigation } = this.props
                navigation.push('InputVerifyCode', {
                  phone: account,
                  operation: 'UserRegister',
                })
              })
            }}
          />
        </View>
      </View>
    )
  }

  renderPrivacyView() {
    const { navigation } = this.props
    const { account } = this.state
    return (
      <View style={styles.privacyModal}>
        <Text style={styles.privacyModalTitle}>请阅读并同意以下内容</Text>
        <View style={styles.privacyModalTitleView}>
          <NextPressable
            onPress={() => {
              this.setState({ showPrivacyTips: false }, () => {
                navigation.push('AgreementPrivacy', { pageType: 1 })
              })
            }}>
            <Text style={[styles.privacyDetail, { fontWeight: 'bold' }]}>
              《用户协议》
            </Text>
          </NextPressable>
          <NextPressable
            onPress={() => {
              this.setState({ showPrivacyTips: false }, () => {
                navigation.push('AgreementPrivacy', { pageType: 2 })
              })
            }}>
            <Text style={[styles.privacyDetail, { fontWeight: 'bold' }]}>
              《隐私政策》
            </Text>
          </NextPressable>
        </View>
        <View
          style={[
            styles.registerTipBtnView,
            {
              marginTop: 26,
            },
          ]}>
          <NextPressable
            style={[styles.registerTipLeftBtn, { width: 110 }]}
            onPress={() => {
              this.setState({ showPrivacyTips: false })
            }}>
            <Text style={styles.accountTitle}>返回</Text>
          </NextPressable>
          <GradientButton
            containerStyle={styles.agreeBtn}
            text="同意并继续"
            onPress={() => {
              this.setState({ showPrivacyTips: false }, () => {
              	HTAPI.UserNumberCheck({ num: account }).then(response => {
              		if (response) {
                      // 该手机号是否可用(是否已经注册过)- true : 未注册过
                      this.setState({ showRegisterTips: true })
                    } else {
                      navigation.push('InputVerifyCode', {
                        phone: account,
                        operation: 'UserLogIn',
                      })
                    }
              	})
              })
            }}
          />
        </View>
      </View>
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
          style={styles.scrollview}>
          {loginType === 0
            ? this.renderOneClickLogin()
            : loginType === 1
              ? this.renderPasswordLogin()
              : this.renderVerifyCodeLogin()}
        </ScrollView>
        {this.renderPrivicy()}
        <WhiteContentModal visible={showRegisterTips}>
          {this.renderRegisterTipView()}
        </WhiteContentModal>
        <WhiteContentModal
          visible={showPrivacyTips}
          modalStyle={{
            height: 185 + global.HOME_BAR_HEIGHT,
            width: SystemHelper.width,
            bottom: 0
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
            alignItems: 'baseline',
          }}>
          {this.renderPrivacyView()}
        </WhiteContentModal>
      </View>
    )
  }
}

export default LoginScreen
