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
import JobStatusModal from './JobStatusModal'

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
  jobStatusModal: boolean
  currentStatus: string,
  currentTime: string,
  statusArray: any,
  timeArray: any
}

class JobExpectations extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      jobStatusModal: false,
      currentStatus: '',
      currentTime: '',
      statusArray: [
        { label: '离职找工作', value: 'resignFind' },
        { label: '在职找工作', value: 'onlineFind' },
        { label: '在职看机会', value: 'onlineChance' }
      ],
      timeArray: [
        { label: '随时入职', value: ' anytime' },
        { label: '一周内入职', value: 'one_weekend' },
        { label: '两周内入职', value: 'couple_weekend' }
      ]
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
            // RootLoading.info('进入编辑页面')
            const { navigation } = this.props
            navigation.push('JobExpectDetail')
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
    const {
      currentStatus,
      currentTime,
      statusArray,
      timeArray,
    } = this.state
    const showStatus = statusArray.filter((e: any) => e.value === currentStatus)[0]
    const showTime = timeArray.filter((e: any) => e.value === currentTime)[0]
    return (
      <NextTouchableOpacity
        onPress={() => {
          this.setState({ jobStatusModal: true })
        }}
        style={styles.jobStatus}>
        <Text style={styles.jobStatusTitle}>
          求职状态
        </Text>
        <View style={styles.jobStatusNext}>
          <Text style={styles.jobStatusNextStatus}>
            {showStatus ? showStatus.label : '请选择求职状态'}
            {showTime ? `、${showTime.label}` : ''}
          </Text>
          <Image
            style={styles.nextImage}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </View>
      </NextTouchableOpacity>
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
    const { jobStatusModal, currentStatus, currentTime, statusArray, timeArray } = this.state
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
        <JobStatusModal
          visible={jobStatusModal}
          statusArray={statusArray}
          timeArray={timeArray}
          currentStatus={currentStatus}
          currentTime={currentTime}
          leftPress={() => {
            this.setState({ jobStatusModal: false })
          }}
          rightPress={(selectStatus, selectTime) => {
            this.setState({
              currentStatus: selectStatus,
              currentTime: selectTime,
              jobStatusModal: false,
            })
          }}
        />
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