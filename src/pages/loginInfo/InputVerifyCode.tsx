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

type IProps = GenProps<'InputVerifyCode'> & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

interface IState {
  email: string
  phone: string
  password: string
  verifyCode: string
  secondCode: string,
  thirdCode: string,
  fourCode: string,
  fiveCode: string,
  sixCode: string,
  countTime: number
  focusIndex: number

}

class InputVerifyCode extends Component<IProps, IState> {
  private getCodeTimeout: any
  private firstInputRef: any
  private secondInputRef: any
  private thirdInputRef: any
  private fourInputRef: any
  private fiveInputRef: any
  private sixInputRef: any
  constructor(props: IProps) {
    super(props)
    const { route: { params } } = props
    this.state = {
      email: '',
      phone: (params && params.phone) || '',
      password: '',
      verifyCode: '',
      secondCode: '',
      thirdCode: '',
      fourCode: '',
      fiveCode: '',
      sixCode: '',
      countTime: 60,
      focusIndex: 0
    }
  }

  componentDidMount() {
    // 暂时注释,以免浪费验证码
    // RootLoading.loading('正在发送验证码')
    // this.props.sendSMS(this.state.phone, (error, reuslt) => {
    //   console.log('error, reuslt: ', error, reuslt)
    //   if (!error && reuslt) {
    //     RootLoading.success('发送成功')
    //     this.countTimeFunc(60)
    //   } else {
    //     RootLoading.fail('发送失败,请重试')
    //   }
    // })
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
    const { verifyCode, countTime, focusIndex, secondCode, thirdCode, fourCode, fiveCode, sixCode } = this.state
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
          <TextInput
            ref={(e) => this.fiveInputRef = e}
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.accountLoginInput}
            placeholder=""
            maxLength={1}
            value={fiveCode}
            onChangeText={(value) => {
              if (value === '') {
                if (this.fourInputRef) { this.fourInputRef.focus() }
              } else {
                if (this.fiveInputRef) { this.fiveInputRef.blur() }
              }
              this.setState({
                fiveCode: value,
              })
            }}
          />
          <TextInput
            ref={(e) => this.sixInputRef = e}
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.accountLoginInput}
            placeholder=""
            maxLength={1}
            value={sixCode}
            onChangeText={(value) => {
              if (value === '') {
                if (this.fiveInputRef) { this.fiveInputRef.focus() }
              } else {
                if (this.sixInputRef) { this.sixInputRef.blur() }
              }
              this.setState({
                sixCode: value,
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
    const username = ''
    const email = ''
    const password = ''
    const confirmPassword = ''
    const phoneNumber = ''
    const verifyCode = ''
    return (
      <NextTouchableOpacity
        style={styles.finishBtn}
        onPress={() => {
          const { navigation } = this.props
          navigation.push('SetPassword')
          this.props.registerAccount(
            username,
            email,
            password,
            confirmPassword,
            phoneNumber,
            verifyCode,
            (error, result) => {
              console.log('进行注册操作')
              // 此处和接口字段相差较多!!!
            }
          )
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
          <Text style={styles.pageDetail}>{`已向您的手机${phone}发送验证码`}</Text>
          {this.renderVerifyCode()}
          {this.renderFinish()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
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
    sendSMS: actions.sendSMS,
    registerAccount: actions.registerAccount
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InputVerifyCode)