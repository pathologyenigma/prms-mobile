import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/MyWallet.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import GradientButton from '../../components/GradientButton'
import ListEmptyComponent from '../../components/ListEmptyComponent'
import { differenceInHours, format, formatDistance } from 'date-fns'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import SystemHelper from '../../../utils/system'
import { calculateTime } from '../../../utils/utils'

type IProps = GenProps<'MyWallet'> & {

}

interface IState {

}

export default class MyWallet extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

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
        title=""
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
          value: '交易记录',
          style: styles.recordBtn,
          act: () => {
            navigation.push('JinbiTradeRecord')
          }
        }}
      />
    )
  }

  renderContent() {
    const { navigation } = this.props
    return (
      <View style={styles.content}>
        <ImageBackground
          source={require('../../../assets/requestJobs/wallet-yue.png')}
          style={styles.itemBg}
        >
          <Text style={styles.itemTitle}>余额（元）</Text>
          <Text style={styles.itemValue}>99.90</Text>
          <NextTouchableOpacity
            style={styles.itemBtn}
            onPress={() => {
              navigation.push('BalanceWithdrawal')
            }}
          >
            {/* <ImageBackground
              style={styles.itemBtnBg}
              resizeMode="contain"
              source={require('../../../assets/requestJobs/wallet-btn.png')}
            > */}
            <Image
              source={require('../../../assets/requestJobs/wallet-tixian-btn.png')}
              style={styles.tixianBtn}
            />
            <Text style={styles.itemBtnText}>提现</Text>
            {/* </ImageBackground> */}
          </NextTouchableOpacity>
        </ImageBackground>
        <ImageBackground
          source={require('../../../assets/requestJobs/wallet-jinbi.png')}
          style={styles.itemBg}
        >
          <Text style={styles.itemTitle}>金币（个）</Text>
          <View style={styles.qiandaoView}>
            <Text style={styles.qiandaoTips}>签到领金币</Text>
          </View>
          <Text style={styles.itemValue}>10</Text>
          <NextTouchableOpacity
            style={styles.itemBtn}
            onPress={() => {
              navigation.push('JinbiRecharge')
            }}
          >
            {/* <ImageBackground
              style={styles.itemBtnBg}
              resizeMode="contain"
              source={require('../../../assets/requestJobs/wallet-btn.png')}
            > */}
            <Image
              source={require('../../../assets/requestJobs/wallet-jinbi-btn.png')}
              style={styles.tixianBtn}
            />
            <Text style={styles.itemBtnText}>充值</Text>
            {/* </ImageBackground> */}
          </NextTouchableOpacity>
        </ImageBackground>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderContent()}
      </View>
    )
  }
}