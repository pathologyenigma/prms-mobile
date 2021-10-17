import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/APageDemo.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import { Text, View, Image, StatusBar } from 'react-native'
import { versionCode } from '../../../utils/config'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import GradientButton from '../../components/GradientButton'
import LinearGradient from 'react-native-linear-gradient'
import { gradienRightGreenColor, greenColor } from '../../../utils/constant'
import { ScrollView } from 'react-native-gesture-handler'

type IProps = GenProps<'APageDemo'> & {

}

interface IState {
  latestVersion: any,
  content: string
}

export default class APageDemo extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      content: '',
      latestVersion: undefined
    }
  }

  componentDidMount() {
    RootLoading.loading('正在检查更新...')
    this.loadData()
  }

  loadData() {
    setTimeout(() => {
      RootLoading.hide()
      this.setState({
        latestVersion: versionCode
      })
    }, 500);
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



  renderCell(title: string, onpress: () => void) {
    return (
      <NextTouchableOpacity
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
      </NextTouchableOpacity>
    )
  }

  renderLogo() {
    return (
      <View style={styles.topView}>
        <Image
          style={styles.logoIcon}
          source={require('../../../assets/logo-icon.png')}
        />
        <Text style={styles.currentCode}>{`当前版本 ${versionCode}`}</Text>
      </View>
    )
  }

  renderContent() {
    const { latestVersion } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.content}>
        <NextTouchableOpacity
          style={styles.cellView}
          onPress={() => {
            RootLoading.info('即将跳往应用商店')
          }}
        >
          <Text style={styles.cellName}>版本更新</Text>
          <Text style={styles.cellValue}>{latestVersion === versionCode ? '无新版' : latestVersion}</Text>
        </NextTouchableOpacity>
        {this.renderCell('给我们评分', () => {
          RootLoading.info('前往应用商店')
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

  renderBtn() {
    const { content } = this.state
    const { navigation } = this.props
    return (
      <NextTouchableOpacity
        style={styles.submitBtn}
        onPress={() => {
          if (!content) {
            RootLoading.info('请先输入内容')
          } else {
            RootLoading.success()
            navigation.goBack()
          }
        }}
      >
        <Text style={styles.selectText}>
          按钮事件
        </Text>
      </NextTouchableOpacity>
    )
  }

  renderGradientButton() {
    return (
      <GradientButton
        text="获取"
        containerStyle={styles.countTimeBtn}
        textStyle={styles.countTimeBtnTitle}
        onPress={() => {

        }}
      />
    )
  }

  renderLinerView() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <LinearGradient
        start={start}
        end={end}
        colors={[greenColor, gradienRightGreenColor]}
        style={styles.linearView}
      >
        <Text style={styles.linerText}>
          按钮
        </Text>
      </LinearGradient>
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
          {this.renderLogo()}
          {this.renderContent()}
          {this.renderBtn()}
          {this.renderGradientButton()}
          {this.renderLinerView()}
        </ScrollView>
      </View>
    )
  }
}