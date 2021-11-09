import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
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
import { Login_type } from '../../utils/constant'

type IProps = GenProps<'ChooseRole'> & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

interface IState {

}

class ChooseRole extends Component<IProps, IState> {
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

  renderFindJob() {
    const { chooseRole } = this.props
    return (
      <NextTouchableOpacity style={styles.cellView}
        onPress={() => {
          console.log('sssssssssss')
          RootLoading.loading()
          chooseRole('user', (error, result) => {
            RootLoading.hide()
            if (!error && result) {
              console.log('ssssssssss: ', error, result)
              const { navigation } = this.props
              console.log('this.props: ', this.props)
              console.log('this.props.navigation: ', navigation)
              // 此处将状态全局存储起来后,再回到导航首页进行判断身份跳转
              AsyncStorage.setItem(Login_type, '1', (error) => {
                console.log('1111111111: ', error)
                if (!error) {
                  const { navigation } = this.props
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: 'Dummy' },
                      ],
                    })
                  )

                } else {
                  RootLoading.fail('请重试或联系客服')
                }
              })
            }
          })
        }}
      >
        <Image
          style={styles.typeLogo}
          source={require('../../assets/requestJobs/role-person.png')}
        />
        <Text style={styles.requestJobTitle}>
          个人
        </Text>
      </NextTouchableOpacity>
    )
  }

  renderFindPerson(title: string) {
    let icon = require('../../assets/requestJobs/role-person.png')
    if (title === '招聘') {
      icon = require('../../assets/requestJobs/role-hr.png')
    } else if (title === '学习') {
      icon = require('../../assets/requestJobs/role-xuexi.png')
    } else if (title === '创业') {
      icon = require('../../assets/requestJobs/role-chuangye.png')
    } else if (title === '投资') {
      icon = require('../../assets/requestJobs/role-touzi.png')
    } else if (title === '顾问') {
      icon = require('../../assets/requestJobs/role-guwen.png')
    }
    return (
      <NextTouchableOpacity style={styles.grayCellView}
        onPress={() => {
          RootLoading.info(`我要${title},敬请期待`)
        }}
      >
        <Image
          style={styles.hrLogo}
          source={icon}
          resizeMode="center"
        />
        <Text style={styles.requestPersonTitle}>
          {title}
        </Text>
      </NextTouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.scrollview}
        >
          <Text style={styles.chooseTitle}>请选择身份并继续</Text>
          <View style={styles.roleView}>
            {this.renderFindJob()}
            {this.renderFindPerson('招聘')}
            {this.renderFindPerson('学习')}
            {this.renderFindPerson('创业')}
            {this.renderFindPerson('投资')}
            {this.renderFindPerson('顾问')}
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
  return bindActionCreators({
    reset_reducer: actions.reset_reducer,
    update_kv: actions.update_kv,
    loginMobile: actions.loginMobile,
    chooseRole: actions.chooseRole
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseRole)