import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/SetPassword.style'
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

type IProps = GenProps<'SetPassword'> & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

interface IState {
  phone: string
  password: string
  confirmPassword: string
}

class SetPassword extends Component<IProps, IState> {
  private getCodeTimeout: any
  private firstInputRef: any
  private secondInputRef: any
  private thirdInputRef: any
  private fourInputRef: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      phone: '',
      password: '',
      confirmPassword: '',
    }
  }

  requestFinish() {
    const { phone, confirmPassword, password } = this.state
    if (!phone && !password) {
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

  renderInput() {
    const { confirmPassword, password } = this.state
    console.log('phone: ', this.props.phone)
    return (
      <View>
        <View style={styles.accountLoginConatiner}>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.accountLoginInput}
            placeholder="请输入密码"
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => {
              this.setState({ password: value })
            }}
          />
        </View>
        <View style={styles.accountLoginConatiner}>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.accountLoginInput}
            placeholder="请再次输入确认密码"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(value) => {
              this.setState({ confirmPassword: value })
            }}
          />
        </View>
        <View style={styles.zhuyiView}>
          <Image
            source={require('../../assets/requestJobs/password-zhuyi.png')}
            style={styles.zhuyiIcon}
          />
          <Text style={styles.zhuyiText}>密码须由6～20字母数字组合</Text>
        </View>
      </View>
    )
  }

  renderFinish() {
    const { confirmPassword, password } = this.state
    return (
      <NextTouchableOpacity
        style={[styles.finishBtn, (!confirmPassword || !password) && { opacity: 0.6 }]}
        disabled={!confirmPassword || !password}
        onPress={() => {
          if (confirmPassword !== password) {
            RootLoading.info('密码不一致,请重新输入')
          } else {
            RootLoading.loading()
            this.props.resetPassword(this.props.phone, password, confirmPassword, (error, result) => {
              if (!error) {
                RootLoading.success()
                // 密码重置/设置操作,将用户信息存储下来即可选择角色
                // TODO:此处需要将用户角色信息存储下来
                const { navigation } = this.props
                navigation.push('ChooseRole')
              }
            })
          }
        }}
      >
        <Text
          style={styles.finishBtnText}
        >
          提交确认
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
          <Text style={styles.pageTitle}>设置密码</Text>
          {this.renderInput()}
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
    resetPassword: actions.resetPassword,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SetPassword)