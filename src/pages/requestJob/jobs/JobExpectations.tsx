import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/JobExpectations.style'
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

type IProps = GenProps<'JobExpectations'> & {
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

class JobExpectations extends Component<IProps, IState> {
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

  renderTitleView() {
    return (
      <View style={styles.titleView}>
        <View style={styles.titleTextView}>
          <Text style={styles.titleText}>
            求职期望
          </Text>
          <Text style={styles.titleProgress}>(1/3)</Text>
        </View>
        <Text style={styles.titleViewDetail}>依据求职期望为您推荐岗位</Text>
      </View>
    )
  }

  renderJobView() {
    return (
      <View style={styles.jobView}>
        <Text style={styles.jobTitle}>项目经理</Text>
        <View style={styles.jobInfoView}>
          <Text style={styles.jobInfo}>15K-30K</Text>
          <Text style={styles.jobInfo}>深圳-福田区</Text>
          <Text style={styles.jobInfo}>全职</Text>
        </View>
        <View style={styles.jobPlatformView}>
          <Text style={styles.jobPlatform}>互联网</Text>
          <Text style={styles.jobPlatform}>在线教育</Text>
          <Text style={styles.jobPlatform}>新媒体</Text>
        </View>
        <NextTouchableOpacity style={styles.editBtn}
          onPress={() => {
            RootLoading.info('进入编辑页面')
          }}
        >
          <Image
            style={styles.editImage}
            source={require('../../../assets/requestJobs/edit.png')}
          />
        </NextTouchableOpacity>
      </View>
    )
  }

  renderJobStatus() {
    return (
      <View style={styles.jobStatus}>
        <Text style={styles.jobStatusTitle}>
          求职状态
        </Text>
        <View style={styles.jobStatusNext}>
          <Text style={styles.jobStatusNextStatus}>正在找工作</Text>
          <Image
            style={styles.nextImage}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </View>
      </View>
    )
  }

  renderFinish() {
    return (
      <NextTouchableOpacity
        style={styles.finishBtn}
      >
        <Text
          style={styles.finishBtnText}
        >
          添加求职意向
        </Text>
      </NextTouchableOpacity>
    )
  }

  render() {
    const { phone } = this.state
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.scrollview}
        >
          {this.renderTitleView()}
          {this.renderJobView()}
          {this.renderJobStatus()}
          {this.renderFinish()}
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

export default connect(mapStateToProps, mapDispatchToProps)(JobExpectations)