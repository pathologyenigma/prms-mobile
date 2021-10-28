import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/InputVerifyCode.style'
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

type IProps = GenProps<'InputVerifyCode'> & {
  email: string,
  password: string,
  number: string,
}

interface IState {
  email: string
  phone: string
  password: string
  verifyCode: string
  secondCode: string,
  thirdCode: string,
  fourCode: string,
  countTime: number
  focusIndex: number
}

class InputVerifyCode extends Component<IProps, IState> {
  private getCodeTimeout: any
  private firstInputRef: any
  private secondInputRef: any
  private thirdInputRef: any
  private fourInputRef: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      email: '',
      phone: '',
      password: '',
      verifyCode: '',
      secondCode: '',
      thirdCode: '',
      fourCode: '',
      countTime: 60,
      focusIndex: 0
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
    const { verifyCode, countTime, focusIndex, secondCode, thirdCode, fourCode } = this.state
    console.log('focusIndex: ', focusIndex)
    console.log('secondInput: ', this.refs.secondInput)
    return (
      <View style={styles.renderVerifyCodeConatiner}>
        <View style={styles.inputView}>
          <TextInput
            ref={(e) => { this.firstInputRef = e }}
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.accountLoginInput}
            placeholder=""
            maxLength={1}
            value={verifyCode}
            onChangeText={(value) => {
              console.log('value: ', value)
              if (value !== '') {
                if (this.secondInputRef) { this.secondInputRef.focus() }
              }
              this.setState({
                verifyCode: value,
              })
            }}
          />
          <TextInput
            ref={(e) => { this.secondInputRef = e }}
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.accountLoginInput}
            placeholder=""
            maxLength={1}
            value={secondCode}
            onChangeText={(value) => {
              if (value === '') {
                if (this.firstInputRef) { this.firstInputRef.focus() }
              } else {
                if (this.thirdInputRef) { this.thirdInputRef.focus() }
              }
              this.setState({
                secondCode: value,
              })
            }}
          />
          <TextInput
            ref={(e) => this.thirdInputRef = e}
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.accountLoginInput}
            placeholder=""
            maxLength={1}
            value={thirdCode}
            onChangeText={(value) => {
              if (value === '') {
                if (this.secondInputRef) { this.secondInputRef.focus() }
              } else {
                if (this.fourInputRef) { this.fourInputRef.focus() }
              }
              this.setState({
                thirdCode: value,
              })
            }}
          />
          <TextInput
            ref={(e) => this.fourInputRef = e}
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.accountLoginInput}
            placeholder=""
            maxLength={1}
            value={fourCode}
            onChangeText={(value) => {
              if (value === '') {
                if (this.thirdInputRef) { this.thirdInputRef.focus() }
              } else {
                if (this.fourInputRef) { this.fourInputRef.blur() }
              }
              this.setState({
                fourCode: value,
              })
            }}
          />
        </View>
        {countTime === 60 ? (
          <NextTouchableOpacity
            style={styles.countTimeBtn}
            onPress={() => {
              this.countTimeFunc(60)
            }}
          >
            <Text style={styles.sendBtnText}>
              重新发送
            </Text>
          </NextTouchableOpacity>
          // <GradientButton
          //   text="获取验证码"
          //   containerStyle={styles.countTimeBtn}
          //   textStyle={styles.countTimeBtnTitle}
          //   onPress={() => {
          //     this.countTimeFunc(60)
          //   }}
          // />
        ) : (
          <Text style={styles.countTimeBtnText}>
            {`获取验证码${countTime}s`}
          </Text>
        )}
      </View>
    )
  }

  renderFinish() {
    return (
      <NextTouchableOpacity
        style={styles.finishBtn}
        onPress={() => {
          const { navigation } = this.props
          navigation.push('SetPassword')
        }}
      >
        <Text
          style={styles.finishBtnText}
        >
          确定
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
          <Text style={styles.pageTitle}>输入短信验证码</Text>
          <Text style={styles.pageDetail}>已向您的手机13430022233发送验证码</Text>
          {this.renderVerifyCode()}
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

export default connect(mapStateToProps, mapDispatchToProps)(InputVerifyCode)