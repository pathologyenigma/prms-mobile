import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/ChangePhone.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import { Text, View, Image, StatusBar, TextInput } from 'react-native'
import { versionCode } from '../../../utils/config'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import GradientButton from '../../components/GradientButton'
import LinearGradient from 'react-native-linear-gradient'
import { gradienRightGreenColor, greenColor } from '../../../utils/constant'
import { ScrollView } from 'react-native-gesture-handler'

type IProps = GenProps<'ChangePhone'> & {

}

interface IState {
  currentPhone: any,
  phone: string,
  content: string,
  countTime: number,
  verifyCode: string
}

export default class ChangePhone extends Component<IProps, IState> {
  private getCodeTimeout: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      content: '',
      phone: '',
      currentPhone: undefined,
      verifyCode: '',
      countTime: 60
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    setTimeout(() => {
      RootLoading.hide()
      this.setState({
        currentPhone: '134****3345'
      })
    }, 500);
  }

  countTimeFunc(currentTime: number) {
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

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title="更换手机号"
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  renderTitle() {
    const { currentPhone } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.content}>
        <Text style={styles.bindPhoneText}>当前绑定手机号</Text>
        <Text style={styles.bindPhoneValue}>{currentPhone}</Text>
      </View>
    )
  }

  renderInput() {
    const { phone } = this.state
    return (
      <View style={styles.inputContainer}>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.accountLoginInput}
          placeholder="请输入手机号"
          value={phone}
          onChangeText={(value) => {
            this.setState({ phone: value })
          }}
        />
      </View>
    )
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

  renderBtn() {
    const { content } = this.state
    const { navigation } = this.props
    return (
      <NextTouchableOpacity
        style={styles.submitBtn}
        onPress={() => {
          if (!content) {
            RootLoading.info('请填入手机号和验证码')
          } else {
            RootLoading.success()
            navigation.goBack()
          }
        }}
      >
        <Text style={styles.selectText}>
          确定修改手机号码
        </Text>
      </NextTouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        <ScrollView>
          {this.renderTitle()}
          {this.renderInput()}
          {this.renderVerifyCode()}
          {this.renderBtn()}
        </ScrollView>
      </View>
    )
  }
}