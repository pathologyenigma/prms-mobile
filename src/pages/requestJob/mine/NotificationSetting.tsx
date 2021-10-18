import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/NotificationSetting.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import { Text, View, StatusBar } from 'react-native'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { ActivityIndicator } from '@ant-design/react-native'
import SwitchComponent from '../../components/SwitchComponent'

type IProps = GenProps<'NotificationSetting'> & {

}

interface IState {
  receiveMessage: any
  receiveRecommend: any
  wechatNotification: any
  alipayNotification: any
}

export default class NotificationSetting extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      receiveMessage: undefined,
      receiveRecommend: undefined,
      wechatNotification: undefined,
      alipayNotification: undefined,
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    RootLoading.loading()
    setTimeout(() => {
      RootLoading.hide()
      this.setState({
        receiveMessage: true,
        receiveRecommend: true,
        wechatNotification: false,
        alipayNotification: true,
      })
    }, 1000);
  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 1,
          elevation: 0,
        }}
        title="消息通知"
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

  renderCell(title: string, detail: any, onpress: () => void) {
    return (
      <View style={styles.cellView}>
        <Text style={styles.cellName}>{title}</Text>
        {detail === undefined ? (
          <ActivityIndicator
            size="small"
            color="#888888"
          />
        ) : (
          <SwitchComponent
            value={detail}
            switchPress={() => {
              if (onpress) {
                onpress()
              }
            }}
          />
        )}
      </View>
    )
  }

  renderContent() {
    const { receiveMessage, receiveRecommend, wechatNotification, alipayNotification } = this.state
    return (
      <View style={styles.content}>
        <View style={styles.cellView}>
          <Text style={styles.cellName}>接收消息</Text>
          {receiveMessage === undefined ? (
            <ActivityIndicator
              size="small"
              color="#888888"
            />
          ) : (
            <NextTouchableOpacity
              style={[styles.receiveMessageBtn, receiveMessage && { backgroundColor: 'red', }]}
              onPress={() => {
                this.setState({ receiveMessage: !receiveMessage })
              }}
            >
              <Text style={styles.receiveMessageText}>
                {receiveMessage ? '去关闭' : '去打开'}
              </Text>
            </NextTouchableOpacity>
          )}
        </View>
        {this.renderCell('接收推荐', receiveRecommend, () => {
          RootLoading.loading()
          setTimeout(() => {
            RootLoading.hide()
            this.setState({ receiveRecommend: !receiveRecommend })
          }, (1000));
        })}
        {this.renderCell('微信通知', wechatNotification, () => {
          RootLoading.loading()
          setTimeout(() => {
            RootLoading.hide()
            this.setState({ wechatNotification: !wechatNotification })
          }, (1000));
        })}
        {this.renderCell('支付宝通知', alipayNotification, () => {
          RootLoading.loading()
          setTimeout(() => {
            RootLoading.hide()
            this.setState({ alipayNotification: !alipayNotification })
          }, (1000));
        })}
      </View>
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
        {this.renderContent()}
      </View>
    )
  }
}