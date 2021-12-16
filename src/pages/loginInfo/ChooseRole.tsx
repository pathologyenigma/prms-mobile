import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Platform,
  TextInput,
  DeviceEventEmitter,
} from 'react-native'
import styles from './styles/ChooseRole.style'
import { GenProps } from '../../navigator/router/stack'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import * as actions from '../../action/loginAction'
import { IStoreState } from '../../reducer'
import LoginInputComponent from './LoginInputComponent'
import NextTouchableOpacity from '../components/NextTouchableOpacity'
import RootLoading from '../../utils/rootLoading'
import AlertContentModal from '../components/AlertContentModal'
import WhiteContentModal from '../components/WhiteContentModal'
import GradientButton from '../components/GradientButton'
import SystemHelper from '../../utils/system'
import NavBar, { EButtonType } from '../components/NavBar'
import { CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { Login_Token, Login_Identity } from '../../utils/constant'

type IProps = GenProps<'ChooseRole'> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

interface IState {
  loginIdentity: string
}

class ChooseRole extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      loginIdentity: '',
    }
  }

  componentDidMount() {
    RootLoading.loading()
    AsyncStorage.getItem(Login_Identity, (error, result) => {
      RootLoading.hide()
      if (!error && result) {
        console.log('getAllKeys: ', error, result)
        this.setState({ loginIdentity: result })
      }
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
        left={{
          type: EButtonType.IMAGE,
          value: require('../../assets/black_back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  chooseOrSwitchIdentity(targetIdentity: string, role: string) {
    const { chooseRole } = this.props
    chooseRole(targetIdentity, role, (error, result) => {
      RootLoading.hide()
      if (!error && result) {
        // 此处将状态全局存储起来后,再回到导航首页进行判断身份跳转
        AsyncStorage.multiSet(
          [
            [Login_Identity, targetIdentity],
            [Login_Token, result.UserChooseOrSwitchIdentity],
          ],
          error => {
            if (!error) {
              DeviceEventEmitter.emit(Login_Identity)
            } else {
              RootLoading.fail('请重试或联系客服')
            }
          },
        )
      }
    })
  }

  renderRole(title: string) {
    const { loginIdentity } = this.state
    let viewStyle: any
    let textStyle: any
    let icon = require('../../assets/loginPages/role-person.png')
    if (title === '个人') {
      if (loginIdentity === 'PersonalUser') {
        icon = require('../../assets/loginPages/role-person.png')
        viewStyle = styles.currentCellView
        textStyle = styles.currentTitle
      } else {
        icon = require('../../assets/loginPages/role-person-gray.png')
      }
    } else if (title === '招聘') {
      if (loginIdentity === 'EnterpriseUser') {
        icon = require('../../assets/loginPages/role-zhaopin.png')
        viewStyle = styles.currentCellView
        textStyle = styles.currentTitle
      } else {
        icon = require('../../assets/loginPages/role-zhaopin-gray.png')
      }
    } else if (title === '学习') {
      icon =
        loginIdentity === 'Learn'
          ? require('../../assets/loginPages/role-learn.png')
          : require('../../assets/loginPages/role-learn-gray.png')
    } else if (title === '创业') {
      icon =
        loginIdentity === 'Chuangye'
          ? require('../../assets/loginPages/role-chuangye.png')
          : require('../../assets/loginPages/role-chuangye-gray.png')
    } else if (title === '投资') {
      icon =
        loginIdentity === 'Touzi'
          ? require('../../assets/loginPages/role-touzi.png')
          : require('../../assets/loginPages/role-touzi-gray.png')
    } else if (title === '顾问') {
      icon =
        loginIdentity === 'Guwen'
          ? require('../../assets/loginPages/role-guwen.png')
          : require('../../assets/loginPages/role-guwen-gray.png')
    }
    return (
      <NextTouchableOpacity
        key={title.toString()}
        style={[styles.grayCellView, viewStyle]}
        onPress={() => {
          console.log('titletitletitletitle1: ')
          if (title === '个人') {
            this.chooseOrSwitchIdentity('PersonalUser', 'PersonalUser')
          } else if (title === '招聘') {
            console.log('titletitletitletitle2: ')
            this.chooseOrSwitchIdentity('EnterpriseUser', 'HR')
          } else {
            RootLoading.info(`我要${title},敬请期待`)
          }
        }}>
        <Image style={styles.hrLogo} source={icon} resizeMode="center" />
        <Text style={[styles.requestPersonTitle, textStyle]}>{title}</Text>
      </NextTouchableOpacity>
    )
  }

  render() {
    const roles = ['个人', '招聘', '学习', '创业', '投资', '顾问']
    const { loginIdentity } = this.state
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.scrollview}>
          <Text style={styles.chooseTitle}>请选择身份并继续</Text>
          <View style={styles.roleView}>
            {roles.map((item, index) => {
              return this.renderRole(item)
            })}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    email: state.loginInfo.email,
    phone: state.loginInfo.phone,
    password: state.loginInfo.password,
    verifyCode: state.loginInfo.verifyCode,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(
    {
      reset_reducer: actions.reset_reducer,
      update_kv: actions.update_kv,
      loginMobile: actions.loginMobile,
      chooseRole: actions.chooseRole,
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseRole)
