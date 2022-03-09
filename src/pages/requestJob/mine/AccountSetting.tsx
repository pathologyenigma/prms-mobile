import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/AccountSetting.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import { Text, View, Image, StatusBar } from 'react-native'
import { versionCode } from '../../../utils/config'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { ActivityIndicator } from '@ant-design/react-native'
import AlertContentModal from '../../components/AlertContentModal'
import { CommonActions } from '@react-navigation/native'

type IProps = GenProps<'AccountSetting'> & {}

interface IState {
  phone: string | undefined
  isVerified: boolean | undefined
  bindedEmail: string | undefined
  isBindWechat: boolean | undefined
  cancelBindWechatVisible: boolean
}

export default class AccountSetting extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      phone: undefined,
      isVerified: undefined,
      bindedEmail: undefined,
      isBindWechat: undefined,
      cancelBindWechatVisible: false,
    }
  }

  componentDidMount() {
    RootLoading.loading()
    this.loadData()
  }

  loadData() {
    setTimeout(() => {
      RootLoading.hide()
      this.setState({
        phone: '13951840000',
        isVerified: false,
        bindedEmail: '780178977@qq.com',
        isBindWechat: true,
      })
    }, 1000)
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
        title="账户与安全"
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
      <NextTouchableOpacity
        style={styles.cellView}
        onPress={() => {
          if (onpress) {
            onpress()
          }
        }}>
        <Text style={styles.cellName}>{title}</Text>
        {detail !== undefined && <Text style={styles.cellValue}>{detail}</Text>}
        <Image
          style={styles.nextIcon}
          source={require('../../../assets/requestJobs/next-gray.png')}
        />
      </NextTouchableOpacity>
    )
  }

  renderContent() {
    const { phone, isVerified, bindedEmail, isBindWechat } = this.state
    const { navigation } = this.props
    let verifiedShow = ''
    let bindedEmailShow = ''
    let isBindWechatShow = ''
    if (isVerified !== undefined) {
      verifiedShow = isVerified ? '已实名' : '未实名'
    }
    if (bindedEmail !== undefined) {
      bindedEmailShow = bindedEmail ? '已绑定' : '未绑定'
    }
    if (isBindWechat !== undefined) {
      isBindWechatShow = isBindWechat ? '已绑定' : '未绑定'
    }
    return (
      <View style={styles.content}>
        {this.renderCell('更换手机号', phone, () => {
          navigation.push('ChangePhone')
        })}
        {this.renderCell('实名认证', verifiedShow, () => {
          navigation.push('VerifySetting', {
            name: '',
            idNumber: '',
          })
        })}
        {this.renderCell('修改密码', '', () => {
          navigation.push('ChangePassword')
        })}
        {this.renderCell('邮箱绑定', bindedEmailShow, () => {
          navigation.push('EmailBinding', { email: bindedEmail || '' })
        })}
        {/* {this.renderCell('微信绑定', '', () => {
          RootLoading.info('暂未开放')
          // if (isBindWechat) {
          //   this.setState({ cancelBindWechatVisible: true })
          // } else {
          //   RootLoading.info('前往微信绑定')
          // }
        })} */}
      </View>
    )
  }

  render() {
    const { cancelBindWechatVisible } = this.state
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
        <AlertContentModal
          visible={cancelBindWechatVisible}
          title="友情提示"
          detail="解除微信绑定后，将无法继续使用它快速登录趁早找，确定要解除吗？"
          leftBtn={{
            title: '取消',
            act: () =>
              this.setState({
                cancelBindWechatVisible: false,
              }),
          }}
          rightBtn={{
            title: '确定',
            act: () => {
              this.setState(
                {
                  cancelBindWechatVisible: false,
                },
                () => {
                  this.setState({ isBindWechat: false })
                  RootLoading.info('解除绑定')
                },
              )
            },
          }}
        />
      </View>
    )
  }
}
