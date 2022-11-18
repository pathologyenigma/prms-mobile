import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/AuthoritySetting.style'
import { GenProps } from '../../../utils/StackProps'
import { Text, View, Image, StatusBar } from 'react-native'
import NextPressable from '../../components/NextPressable'
import { ActivityIndicator } from '@ant-design/react-native'
import { CommonActions } from '@react-navigation/native'
import {
  check,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
  request,
  requestMultiple,
} from 'react-native-permissions'
import SystemHelper from '../../../utils/system'

type IProps = GenProps<'AuthoritySetting'> & {}

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
    if (SystemHelper.iOS) {
      this.loadIosData()
    } else {
      this.loadAndroidData()
    }
  }

  loadAndroidData() {
    checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ])
      .then((result: any) => {
        console.log('222222: ', result)
        console.log(
          '2222223: ',
          result['android.permission.ACCESS_COARSE_LOCATION'],
        )
        this.setState({
          locationAuthority:
            result[
              'android.permission.ACCESS_COARSE_LOCATION'
            ].toLocaleLowerCase() === 'granted',
          photoAuthority:
            result['android.permission.CAMERA'].toLocaleLowerCase() ===
            'granted',
          libraryAuthority:
            result[
              'android.permission.READ_EXTERNAL_STORAGE'
            ].toLocaleLowerCase() === 'granted' &&
            result[
              'android.permission.WRITE_EXTERNAL_STORAGE'
            ].toLocaleLowerCase() === 'granted',
          MicrophoneAuthority:
            result['android.permission.RECORD_AUDIO'].toLocaleLowerCase() ===
            'granted',
        })
      })
      .catch(error => {
        console.log('error: ', error)
      })
  }

  loadIosData() {
    checkMultiple([
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
      PERMISSIONS.IOS.MICROPHONE,
    ])
      .then((result: any) => {
        console.log('222222: ', result)
        console.log(
          '2222223: ',
          result['android.permission.ACCESS_COARSE_LOCATION'],
        )
        this.setState({
          locationAuthority:
            result[
              'ios.permission.LOCATION_WHEN_IN_USE'
            ].toLocaleLowerCase() === 'granted',
          photoAuthority:
            result['ios.permission.CAMERA'].toLocaleLowerCase() ===
            'granted',
          libraryAuthority:
            result[
              'ios.permission.PHOTO_LIBRARY'
            ].toLocaleLowerCase() === 'granted',
          MicrophoneAuthority:
            result['ios.permission.MICROPHONE'].toLocaleLowerCase() ===
            'granted',
        })
      })
      .catch(error => {
        console.log('error: ', error)
      })
  }

  requestPermission(permission: any) {
    request(permission)
      .then((result: any) => {
        console.log('result: ', result)
        this.loadData()
      })
      .catch(error => {
        Toast.show(`申请失败,请重试: ${error.message}`)
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
      <NextPressable
        style={styles.cellView}
        onPress={() => {
          if (onpress) {
            onpress()
          }
        }}>
        <Text style={styles.cellName}>{title}</Text>
        {detail !== undefined && (
          <Text
            style={[
              styles.cellValue,
              detail === false && { color: '#FA8E4F' },
            ]}>
            {detail ? '已开启' : '已关闭'}
          </Text>
        )}
        <Image
          style={styles.nextIcon}
          source={require('../../../assets/requestJobs/next-gray.png')}
        />
      </NextPressable>
    )
  }

  renderContent() {
    const {
      locationAuthority,
      photoAuthority,
      libraryAuthority,
      MicrophoneAuthority,
    } = this.state
    return (
      <View style={styles.content}>
        {this.renderCell('访问位置信息', locationAuthority, () => {
          this.requestPermission(SystemHelper.iOS ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
        })}
        {this.renderCell('使用相机功能', photoAuthority, () => {
          this.requestPermission(SystemHelper.iOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
        })}
        {this.renderCell('使用相册功能', libraryAuthority, () => {
          SystemHelper.iOS
            ? this.requestPermission(PERMISSIONS.IOS.PHOTO_LIBRARY)
            : (requestMultiple([
              PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
              PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            ])
              .then((result: any) => {
                console.log('result111: ', result)
                if (
                  result[
                    'android.permission.READ_EXTERNAL_STORAGE'
                  ].toLocaleLowerCase() === 'unavailable' ||
                  result[
                    'android.permission.READ_EXTERNAL_STORAGE'
                  ].toLocaleLowerCase() === 'blocked' ||
                  result[
                    'android.permission.WRITE_EXTERNAL_STORAGE'
                  ].toLocaleLowerCase() === 'unavailable' ||
                  result[
                    'android.permission.WRITE_EXTERNAL_STORAGE'
                  ].toLocaleLowerCase() === 'blocked'
                ) {
                  Toast.show('获取权限失败,请手动前往系统设置中开启', 2)
                } else {
                  this.loadData()
                }
              })
              .catch(error => {
                Toast.show(`申请失败,请重试: ${error.message}`)
              })
            )
        })}
        {this.renderCell('使用麦克风功能', MicrophoneAuthority, () => {
          this.requestPermission(SystemHelper.iOS ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO)
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
