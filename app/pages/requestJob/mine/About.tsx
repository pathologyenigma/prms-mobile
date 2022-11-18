import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/About.style'
import { GenProps } from '../../../utils/StackProps'
import { Text, View, Image, StatusBar } from 'react-native'
import NextPressable from '../../components/NextPressable'
import DeviceInfo from 'react-native-device-info'
import HTUpdateManager from '~/common/update/HTUpdateManager'

type IProps = GenProps<'About'> & {

}

interface IState {
  latestVersion: any
}

export default class About extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      latestVersion: undefined
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.setState({
    	latestVersion: `${DeviceInfo.getVersion()}_${DeviceInfo.getBuildNumber()}_${HTUpdateManager.APPLICATION_VERSION}`
  	})
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
        title="关于趁早找"
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
      <NextPressable
        style={styles.cellView}
        onPress={() => {
          if (onpress) {
            onpress()
          }
        }}
      >
        <Text style={styles.cellName}>{title}</Text>
        <Image
          style={styles.nextIcon}
          source={require('../../../assets/requestJobs/next-gray.png')}
        />
      </NextPressable>
    )
  }

  renderLogo() {
    return (
      <View style={styles.topView}>
        <Image
          style={styles.logoIcon}
          source={require('../../../assets/logo-icon.png')}
        />
        <Text style={styles.currentCode}>{`当前版本 ${this.state.latestVersion}`}</Text>
      </View>
    )
  }

  renderContent() {
    const { latestVersion } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.content}>
        <NextPressable
          style={styles.cellView}
          onPress={() => {
            global.TODO_TOAST()
          }}
        >
          <Text style={styles.cellName}>版本更新</Text>
          <Text style={styles.cellValue}>{'无新版'}</Text>
        </NextPressable>
        {this.renderCell('给我们评分', () => {
          global.TODO_TOAST()
        })}
        {this.renderCell('趁早找用户协议', () => {
          navigation.push('AgreementPrivacy', { pageType: 1 })
        })}
        {this.renderCell('趁早找隐私条款', () => {
          navigation.push('AgreementPrivacy', { pageType: 2 })
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
        {this.renderLogo()}
        {this.renderContent()}
      </View>
    )
  }
}