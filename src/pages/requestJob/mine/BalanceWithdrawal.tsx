import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/BalanceWithdrawal.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import GradientButton from '../../components/GradientButton'
import ListEmptyComponent from '../../components/ListEmptyComponent'
import { differenceInHours, format, formatDistance } from 'date-fns'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import SystemHelper from '../../../utils/system'
import { calculateTime } from '../../../utils/utils'
import LinearGradient from 'react-native-linear-gradient'
import AlertContentModal from '../../components/AlertContentModal'

type IProps = GenProps<'BalanceWithdrawal'> & {

}

interface IState {
  balance: string
  alipayPhone: string
  verificationCodeVisible: boolean
  verificationCode: string
  countTime: number
  bindAlipayPhone: string
  bindAlipayAccount: string
}

export default class BalanceWithdrawal extends Component<IProps, IState> {
  private getCodeTimeout: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      balance: '',
      alipayPhone: '',
      verificationCodeVisible: false,
      verificationCode: '',
      countTime: 60,
      bindAlipayPhone: '134****3377',
      bindAlipayAccount: '彭**'
    }
  }

  componentDidMount() {

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
          borderBottomWidth: 1,
          borderBottomColor: '#ECECEC',
          elevation: 0,
        }}
        title="余额提现"
        left={{
          style: { width: 17, height: 17, },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.TEXT,
          value: '收益明细',
          style: styles.recordBtn,
          act: () => {
            RootLoading.info('收益明细')
          }
        }}
      />
    )
  }

  renderContent() {
    const { balance, alipayPhone, bindAlipayPhone, bindAlipayAccount } = this.state
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View style={styles.content}>
        <View style={styles.balanceView}>
          <Text style={styles.balanceUnit}>
            ¥
          </Text>
          <Text style={styles.balanceValue}>
            99.90
          </Text>
        </View>
        <Text style={styles.withdrawText}>可提现金额</Text>
        <Text style={styles.withdrawTitle}>提现金额</Text>
        <View style={styles.balanceInputView}>
          <Text style={styles.balanceTitle}>
            ¥
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="number-pad"
            style={styles.balanceInput}
            placeholder="最低可提现1元"
            value={balance}
            onChangeText={(value) => {
              this.setState({ balance: value })
            }}
          />
          <NextTouchableOpacity
            onPress={() => {

            }}
          >
            <Text style={styles.balanceAllText}>全部</Text>
          </NextTouchableOpacity>
        </View>
        {bindAlipayPhone ? (
          <View style={styles.bindView}>
            <Text style={styles.bindViewValue}>{`到账支付宝   ${bindAlipayPhone}`}</Text>
            <Text style={styles.bindViewValue}>{`真实姓名   ${bindAlipayAccount}`}</Text>
          </View>
        ) : (
          <View style={styles.balanceInputView}>
            <Text style={styles.bindAlipay}>
              绑定支付宝
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              returnKeyType="done"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="number-pad"
              style={styles.balanceInput}
              placeholder="请输入手机号"
              value={alipayPhone}
              onChangeText={(value) => {
                this.setState({ alipayPhone: value })
              }}
            />
            <LinearGradient
              start={start}
              end={end}
              colors={['#FF5D37', '#FF8260']}
              style={styles.linear}
            >
              <Text style={[styles.text]}>
                绑定
              </Text>
            </LinearGradient>
          </View>
        )
        }
      </View >
    )
  }

  renderSubmitBtn() {
    return (
      <GradientButton
        text="提交申请"
        containerStyle={styles.countTimeBtn}
        textStyle={styles.countTimeBtnTitle}
        onPress={() => {
          RootLoading.loading()
          this.countTimeFunc(60)
          setTimeout(() => {
            RootLoading.hide()
            this.setState({ verificationCodeVisible: true })
          }, 1000);
        }}
      />
    )
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

  renderModal() {
    const { verificationCodeVisible, verificationCode, countTime } = this.state
    const { navigation } = this.props
    return (
      <AlertContentModal
        visible={verificationCodeVisible}
        title="请输入验证码"
        detail="已发送验证码至+86 134****3377"
        bottomStyle={{ marginTop: 37 }}
        leftBtn={{
          title: '取消',
          act: () => this.setState({
            verificationCodeVisible: false,
          }),
        }}
        rightBtn={{
          title: '确定',
          act: () => {
            if (!verificationCode) {
              RootLoading.info('请输入验证码')
            } else {
              this.setState({ verificationCodeVisible: false }, () => {
                navigation.push('WithdrawalResult')
              })
            }
          },
        }}
        extraView={
          <View style={styles.codeInputView}>
            <Image
              style={styles.codeIcon}
              source={require('../../../assets/requestJobs/yanzhengma.png')}
            />
            <TextInput
              underlineColorAndroid="transparent"
              returnKeyType="done"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="number-pad"
              style={styles.verificationCode}
              placeholder="输入短信验证码"
              value={verificationCode}
              onChangeText={(value) => {
                this.setState({ verificationCode: value })
              }}
            />
            <NextTouchableOpacity>
              {countTime === 60 ? (
                <GradientButton
                  text="重新发送"
                  containerStyle={styles.sendTimeBtn}
                  textStyle={styles.sendTimeBtnTitle}
                  onPress={() => {
                    this.countTimeFunc(60)
                  }}
                />
              ) : (
                <Text style={styles.countTimeBtnText}>
                  {`${countTime}S后重新发送`}
                </Text>
              )}
            </NextTouchableOpacity>
          </View>
        }
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderContent()}
        {this.renderSubmitBtn()}
        {this.renderModal()}
      </View>
    )
  }
}