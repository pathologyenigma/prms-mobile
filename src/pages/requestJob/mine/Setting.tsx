import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/Setting.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import { Text, View, Image, StatusBar, DeviceEventEmitter } from 'react-native'
import { versionCode } from '../../../utils/config'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { ActivityIndicator } from '@ant-design/react-native'
import AlertContentModal from '../../components/AlertContentModal'
import { CommonActions } from '@react-navigation/native'
import * as CacheManager from 'react-native-http-cache'
import AsyncStorage from '@react-native-community/async-storage'
import { Log_Out } from '../../../utils/constant'

type IProps = GenProps<'Setting'> & {}

interface IState {
  cacheSize: string
  cacheVisible: boolean
  logoutVisible: boolean
}

export default class Setting extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      cacheSize: '',
      cacheVisible: false,
      logoutVisible: false,
    }
  }

  componentDidMount() {
    this.loadData()
  }

  //清除缓存
  clearCache() {
    CacheManager.clearCache()
      .then((error: any) => {
        console.log('2222222222222: ', error)
        if (!error) {
          this.setState({ cacheSize: '0.00 M' })
          RootLoading.success('清除成功')
        } else {
          RootLoading.fail(error.message || error.toString())
        }
      })
      .catch((error: any) => {
        RootLoading.fail(error.message || error.toString())
      })
  }

  loadData() {
    CacheManager.getCacheSize().then(
      (value: any) => {
        const size = (value / 1024 / 1024).toFixed(2)
        this.setState({ cacheSize: `${size} M` })
      },
      (error: any) => {
        RootLoading.fail('获取缓存失败,请重试')
        this.setState({ cacheSize: '--' })
      },
    )
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
        title="设置"
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

  renderCell(title: string, onpress: () => void) {
    return (
      <NextTouchableOpacity
        style={styles.cellView}
        onPress={() => {
          if (onpress) {
            onpress()
          }
        }}>
        <Text style={styles.cellName}>{title}</Text>
        <Image
          style={styles.nextIcon}
          source={require('../../../assets/requestJobs/next-gray.png')}
        />
      </NextTouchableOpacity>
    )
  }

  renderContent() {
    const { cacheSize } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.content}>
        {this.renderCell('账号与安全', () => {
          navigation.push('AccountSetting')
        })}
        {this.renderCell('消息通知', () => {
          navigation.push('NotificationSetting')
        })}
        {this.renderCell('招呼语设置', () => {
          navigation.push('GreetSetting')
        })}
        {this.renderCell('权限设置', () => {
          navigation.push('AuthoritySetting')
        })}
        <NextTouchableOpacity
          style={styles.cellView}
          onPress={() => {
            if (!cacheSize) {
              RootLoading.info('请稍候,正在计算缓存')
            } else {
              this.setState({ cacheVisible: true })
            }
          }}>
          <Text style={styles.cellName}>清除缓存</Text>
          {cacheSize ? (
            <Text style={styles.cellValue}>{cacheSize}</Text>
          ) : (
            <ActivityIndicator size="small" color="#888888" />
          )}
          <Image
            style={styles.nextIcon}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </NextTouchableOpacity>
      </View>
    )
  }

  logout() {
    AsyncStorage.clear(() => {
      DeviceEventEmitter.emit(Log_Out)
    })
  }

  renderBtn() {
    return (
      <NextTouchableOpacity
        style={styles.logoOutBtn}
        onPress={() => {
          this.setState({ logoutVisible: true })
        }}>
        <Text style={styles.logoOutText}>退出登录</Text>
      </NextTouchableOpacity>
    )
  }

  render() {
    const { cacheSize, cacheVisible, logoutVisible } = this.state
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
        {this.renderBtn()}
        <AlertContentModal
          visible={cacheVisible}
          title=""
          detail={`缓存大小为${cacheSize}，确定要清除吗？`}
          leftBtn={{
            title: '取消',
            act: () =>
              this.setState({
                cacheVisible: false,
              }),
          }}
          rightBtn={{
            title: '确定',
            act: () => {
              this.setState(
                {
                  cacheVisible: false,
                },
                () => {
                  this.clearCache()
                },
              )
            },
          }}
        />
        <AlertContentModal
          visible={logoutVisible}
          title="友情提示"
          detail="确定退出登录吗?"
          leftBtn={{
            title: '取消',
            act: () =>
              this.setState({
                logoutVisible: false,
              }),
          }}
          rightBtn={{
            title: '确定',
            act: () => {
              this.setState(
                {
                  logoutVisible: false,
                },
                () => {
                  this.logout()
                },
              )
            },
          }}
        />
      </View>
    )
  }
}
