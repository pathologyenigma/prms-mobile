import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/JobExpectDetail.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import * as actions from '../../../action/loginAction'
import { IStoreState } from '../../../reducer'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import RootLoading from '../../../utils/rootLoading'
import AlertContentModal from '../../components/AlertContentModal'
import WhiteContentModal from '../../components/WhiteContentModal'
import GradientButton from '../../components/GradientButton'
import SystemHelper from '../../../utils/system'
import NavBar, { EButtonType } from '../../components/NavBar'

type IProps = GenProps<'JobExpectDetail'> & {
  email: string,
  password: string,
  number: string,
}

interface IState {
  email: string
  phone: string
  password: string
  verifyCode: string
  countTime: number
}

class JobExpectDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {

    }
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
        title="求职意向"
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.TEXT,
          value: '保存',
          style: styles.saveBtn,
          act: () => {
            RootLoading.info('保存成功')
          }
        }}
      />
    )
  }

  renderQiWangGangWei() {
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('JobSelectZhiwei')
          }}
        >
          <Text style={styles.cellText}>
            求职期望
          </Text>
          <Image
            style={styles.nextImage}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </NextTouchableOpacity>
        <Text style={styles.cellViewDetail}>如: 销售经理</Text>
      </View>
    )
  }

  renderQiWangHangYe() {
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {

          }}
        >
          <Text style={styles.cellText}>
            期望行业
          </Text>
          <Image
            style={styles.nextImage}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </NextTouchableOpacity>
        <Text style={styles.cellViewDetail}>如: 互联网</Text>
      </View>
    )
  }

  renderQiWangCity() {
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {

          }}
        >
          <Text style={styles.cellText}>
            期望城市
          </Text>
          <Image
            style={styles.nextImage}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </NextTouchableOpacity>
        <Text style={styles.cellViewDetail}>如: 北京</Text>
      </View>
    )
  }

  renderQiWangSalary() {
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {

          }}
        >
          <Text style={styles.cellText}>
            期望薪资
          </Text>
          <Image
            style={styles.nextImage}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </NextTouchableOpacity>
        <Text style={styles.cellViewDetail}>如:  15K-20K</Text>
      </View>
    )
  }

  renderGongZuoXingZhi() {
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {

          }}
        >
          <Text style={styles.cellText}>
             工作性质
          </Text>
          <Image
            style={styles.nextImage}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </NextTouchableOpacity>
        <Text style={styles.cellViewDetail}>全职、兼职、实习</Text>
      </View>
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
          {this.renderQiWangGangWei()}
          {this.renderQiWangHangYe()}
          {this.renderQiWangCity()}
          {this.renderQiWangSalary()}
          {this.renderGongZuoXingZhi()}
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

export default connect(mapStateToProps, mapDispatchToProps)(JobExpectDetail)