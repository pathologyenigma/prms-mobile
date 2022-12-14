import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/InputVerifyCode.style'
import { GenProps } from '../../utils/StackProps'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import LoginInputComponent from './LoginInputComponent'
import NextPressable from '../components/NextPressable'
import AlertContentModal from '../components/AlertContentModal'
import WhiteContentModal from '../components/WhiteContentModal'
import GradientButton from '../components/GradientButton'
import SystemHelper from '../../utils/system'
import NavBar, { EButtonType } from '../components/NavBar'
import { TOperationType } from '../../utils/types/PropsType'
import HTAuthManager from '~/common/auth/common/model/HTAuthManager'

type IProps = GenProps<'InputVerifyCode'> & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

interface IState {
  email: string
  phone: string
  password: string
  firstCode: string
  secondCode: string,
  thirdCode: string,
  fourCode: string,
  fiveCode: string,
  sixCode: string,
  countTime: number
  focusIndex: number
  operation: TOperationType
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
      operation: (params && params.operation) || 'UserRegister',
      password: '',
      firstCode: 't',
      secondCode: 'e',
      thirdCode: 's',
      fourCode: 't',
      fiveCode: 'e',
      sixCode: 'd',
      countTime: 60,
      focusIndex: 0
    }
  }

  componentDidMount() {
    // 暂时注释,以免浪费验证码
    // this.sendSms()
  }

  sendSms() {
    Hud.show('正在发送验证码')
    HTAPI.StaticSendSms({
    	phoneNumber: this.state.phone
    }, { showLoading: true }).then(response => {
    	ActionToast.show('发送成功')
        this.countTimeFunc(60)
    })
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
    const { firstCode, countTime, focusIndex, secondCode, thirdCode, fourCode, fiveCode, sixCode } = this.state
    console.log('focusIndex: ', focusIndex)
    console.log('secondInput: ', this.refs.secondInput)
    return (
      <View style={styles.renderVerifyCodeConatiner}>
        <View style={styles.inputView}>
          <TextInput
            ref={(e) => { this.firstInputRef = e }}
            underlineColorAndroid="transparent"
            keyboardType="number-pad"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.accountLoginInput}
            placeholder=""
            maxLength={1}
            value={firstCode}
            onChangeText={(value) => {
              console.log('value: ', value)
              if (value !== '') {
                if (this.secondInputRef) { this.secondInputRef.focus() }
              }
              this.setState({
                firstCode: value,
              })
            }}
          />
          <TextInput
            ref={(e) => { this.secondInputRef = e }}
            underlineColorAndroid="transparent"
            keyboardType="number-pad"
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
            keyboardType="number-pad"
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
            keyboardType="number-pad"
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
                if (this.fiveInputRef) { this.fiveInputRef.focus() }
              }
              this.setState({
                fourCode: value,
              })
            }}
          />
          <TextInput
            ref={(e) => this.fiveInputRef = e}
            underlineColorAndroid="transparent"
            keyboardType="number-pad"
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
                if (this.sixInputRef) { this.sixInputRef.focus() }
              }
              this.setState({
                fiveCode: value,
              })
            }}
          />
          <TextInput
            ref={(e) => this.sixInputRef = e}
            underlineColorAndroid="transparent"
            keyboardType="number-pad"
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
          <NextPressable
            style={styles.countTimeBtn}
            onPress={() => {
              this.sendSms()
            }}
          >
            <Text style={styles.sendBtnText}>
              重新发送
            </Text>
          </NextPressable>
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

  checkNextFunction(verifyCode: string) {
    const { operation, phone } = this.state
    console.log('111111!: ', operation, verifyCode)
    const { navigation } = this.props
    let paramList = {
    	phoneNumber: phone,
        verifyCode: verifyCode,
        operation: operation,
    }
    HTAPI.UserVerifyCodeConsume({ info: paramList }).then(response => {
	  // 校验通过
	  if (operation === 'UserLogIn') {
	    // 登录操作,将用户信息存储下来即可选择角色
	    // TODO:此处需要将用户角色信息存储下来
	    HTAPI.UserLogIn({
        	info: {
        		account: phone, 
        	}
        }).then(response => {
        	HTAuthManager.updateKeyValueList({
        		userToken: response.token,
        		lastLoginAccount: phone,
        	})
        	Toast.show('登录成功')
            navigation.push('ChooseRole')
        })
	    // navigation.push('ChooseRole')
	  } else {
	    // 注册操作、忘记密码操作,进入到密码设置页面
	    // this.props.checkUserVerifyCodeConsume()
	    navigation.push('SetPassword', { phone, operation })
	  }
    })
  }

  renderFinish() {
    const {
      firstCode,
      secondCode,
      thirdCode,
      fourCode,
      fiveCode,
      sixCode
    } = this.state
    const verifyCode = `${firstCode}${secondCode}${thirdCode}${fourCode}${fiveCode}${sixCode}`
    return (
      <NextPressable
        style={[styles.finishBtn, verifyCode.length !== 6 && { opacity: 0.6 }]}
        disabled={verifyCode.length !== 6}
        onPress={() => {
          this.checkNextFunction(verifyCode)
        }}
      >
        <Text
          style={styles.finishBtnText}
        >
          确定
        </Text>
      </NextPressable>
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

export default InputVerifyCode