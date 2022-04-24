import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Platform,
  TextInput,
} from 'react-native'
import styles from './styles/ChooseRole.style'
import { GenProps } from '../../navigator/router/stack'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import LoginInputComponent from './LoginInputComponent'
import NextTouchableOpacity from '../components/NextTouchableOpacity'
import AlertContentModal from '../components/AlertContentModal'
import WhiteContentModal from '../components/WhiteContentModal'
import GradientButton from '../components/GradientButton'
import SystemHelper from '../../utils/system'
import NavBar, { EButtonType } from '../components/NavBar'
import { CommonActions } from '@react-navigation/native'
import HTAuthManager from '~/common/auth/common/model/HTAuthManager'

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
      loginIdentity: HTAuthManager.keyValueList.userRole,
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
    HTAPI.UserChooseOrSwitchIdentity({
    	targetIdentity,
    	role
    }).then(response => {
    	HTAuthManager.updateKeyValueList({ 
    		userToken: response,
    		userRole: targetIdentity
    	})
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
            Toast.show(`我要${title},敬请期待`)
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

export default ChooseRole
