import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/Login.style'
import { GenProps } from '../router/stack'
import { connect } from 'react-redux'
import TextInputComponent from './components/TextInputComponent'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import * as actions from '../../action/loginAction'
import { IStoreState } from '../../reducer'

type IProps = GenProps<'LoginScreen'> & {
  email: string,
  password: string,
  number: string,
  reset_reducer: () => void,
  update_kv: (key: string, value: string) => void,
  loginMobile: any
}

interface IState {
  selectTabs: number,
  emailWarning: boolean,
  selectAreaCode: string,
  switchModalVisible: boolean,
  betaCode: string,
  betaMode: boolean,
}

class LoginScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      selectTabs: 0,
      emailWarning: false,
      selectAreaCode: '+86',
      switchModalVisible: false,
      betaCode: '',
      betaMode: false,
    }
  }

  componentWillUnmount() {
    const { reset_reducer } = this.props
    reset_reducer()
  }

  render() {
    return (
      <View style={styles.container}>
        登录页面
      </View >
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    email: state.loginInfo.email,
    password: state.loginInfo.password,
    number: state.loginInfo.number,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({
    reset_reducer: actions.reset_reducer,
    update_kv: actions.update_kv,
    loginMobile: actions.loginMobile,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)