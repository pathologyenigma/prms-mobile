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

type IProps = GenProps<'ChooseRole'> & {

}

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
    return (
      <NextTouchableOpacity style={styles.cellView}
        onPress={() => {
          // RootLoading.info('我要求职')
          const { navigation } = this.props
          console.log('this.props: ', this.props)
          console.log('this.props.navigation: ', navigation)
          // 此处将状态全局存储起来后,再回到导航首页进行判断身份跳转
          navigation.navigate('Dummy')
          // navigation.navigate('RenderRequestJobTabs')
        }}
      >
        <Image
          style={styles.typeLogo}
          source={require('../../assets/wx_logo.png')}
        />
        <Text style={styles.requestJobTitle}>
          我要求职
        </Text>
      </NextTouchableOpacity>
    )
  }

  renderFindPerson() {
    return (
      <NextTouchableOpacity style={styles.grayCellView}
        onPress={() => {
          RootLoading.info('我要招人')
        }}
      >
        <Image
          style={styles.typeLogo}
          source={require('../../assets/wx_logo.png')}
        />
        <Text style={styles.requestPersonTitle}>
          我要招人
        </Text>
      </NextTouchableOpacity>
    )
  }

  renderInvestment() {
    return (
      <NextTouchableOpacity style={styles.grayCellView}
        onPress={() => {
          RootLoading.info('我要创业或投资')
        }}
      >
        <Image
          style={styles.typeLogo}
          source={require('../../assets/wx_logo.png')}
        />
        <Text style={styles.requestPersonTitle}>
          我要创业或投资
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
          {this.renderFindJob()}
          {this.renderFindPerson()}
          {this.renderInvestment()}
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
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseRole)