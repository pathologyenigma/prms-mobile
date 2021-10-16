import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/AuthoritySetting.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import { Text, View, Image, StatusBar, AsyncStorage } from 'react-native'
import { versionCode } from '../../../utils/config'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { ActivityIndicator } from '@ant-design/react-native'
import { CommonActions } from '@react-navigation/native';
import { check, checkMultiple, PERMISSIONS, RESULTS, request, requestMultiple } from 'react-native-permissions'

type IProps = GenProps<'AuthoritySetting'> & {

}

interface IState {
  locationAuthority: any
  photoAuthority: any
  libraryAuthority: any
  MicrophoneAuthority: any
}

export default class AuthoritySetting extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      locationAuthority: undefined,
      photoAuthority: undefined,
      libraryAuthority: undefined,
      MicrophoneAuthority: undefined,
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.RECORD_AUDIO
    ]).then((result: any) => {
      console.log('222222: ', result)
      console.log('2222223: ', result['android.permission.ACCESS_COARSE_LOCATION'])
      this.setState({
        locationAuthority: result['android.permission.ACCESS_COARSE_LOCATION'].toLocaleLowerCase() === 'granted',
        photoAuthority: result['android.permission.CAMERA'].toLocaleLowerCase() === 'granted',
        libraryAuthority:
          result['android.permission.READ_EXTERNAL_STORAGE'].toLocaleLowerCase() === 'granted'
          && result['android.permission.WRITE_EXTERNAL_STORAGE'].toLocaleLowerCase() === 'granted',
        MicrophoneAuthority: result['android.permission.RECORD_AUDIO'].toLocaleLowerCase() === 'granted',
      })
    }).catch((error) => {
      console.log('error: ', error)
    })
  }

  requestPermission(permission: any) {
    request(permission)
      .then((result: any) => {
        console.log('result: ', result)
        this.loadData()
      })
      .catch((error) => {
        RootLoading.fail(`申请失败,请重试: ${error.message}`)
      })
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
        title="权限设置"
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



  renderCell(title: string, detail: string, onpress: () => void) {
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
        {detail !== undefined && (
          <Text style={[styles.cellValue, detail === false && { color: '#FA8E4F' }]}>{detail ? '已开启' : '已关闭'}</Text>
        )}
        <Image
          style={styles.nextIcon}
          source={require('../../../assets/requestJobs/next-gray.png')}
        />
      </NextTouchableOpacity>
    )
  }

  renderContent() {
    const { locationAuthority, photoAuthority, libraryAuthority, MicrophoneAuthority } = this.state
    return (
      <View style={styles.content}>
        {this.renderCell('访问位置信息', locationAuthority, () => {
          this.requestPermission(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
        })}
        {this.renderCell('使用相机功能', photoAuthority, () => {
          this.requestPermission(PERMISSIONS.ANDROID.CAMERA)
        })}
        {this.renderCell('使用相册功能', libraryAuthority, () => {
          requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE])
            .then((result: any) => {
              console.log('result111: ', result)
              if (
                result['android.permission.READ_EXTERNAL_STORAGE'].toLocaleLowerCase() === 'unavailable'
                || result['android.permission.READ_EXTERNAL_STORAGE'].toLocaleLowerCase() === 'blocked'
                || result['android.permission.WRITE_EXTERNAL_STORAGE'].toLocaleLowerCase() === 'unavailable'
                || result['android.permission.WRITE_EXTERNAL_STORAGE'].toLocaleLowerCase() === 'blocked'
              ) {
                RootLoading.fail('获取权限失败,请手动前往系统设置中开启', 2)
              } else {
                this.loadData()
              }
            })
            .catch((error) => {
              RootLoading.fail(`申请失败,请重试: ${error.message}`)
            })
        })}
        {this.renderCell('使用麦克风功能', MicrophoneAuthority, () => {
          this.requestPermission(PERMISSIONS.ANDROID.RECORD_AUDIO)
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