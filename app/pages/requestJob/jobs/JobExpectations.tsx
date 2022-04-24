import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/JobExpectations.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import AlertContentModal from '../../components/AlertContentModal'
import WhiteContentModal from '../../components/WhiteContentModal'
import GradientButton from '../../components/GradientButton'
import SystemHelper from '../../../utils/system'
import NavBar, { EButtonType } from '../../components/NavBar'
import JobStatusModal from './JobStatusModal'
import HTShadowView from '~/common/view/HTShadowView'
import { reformComFinancing, reformCompanySize, reformEducation, reformSalary, reformFullTime } from '~/utils/utils'
import { stringForFullTime } from '~/recruitment/utils/JobHelper.ts'

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
      itemList: [],
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

  componentDidMount() {
  	HTAPI.CandidateGetAllJobExpectations().then(response => {
  		this.setState({
			itemList: response
		})
  	}).catch(e => {
  		console.log(e)
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

  renderItem = (item, index) => {
  	return (
      <HTShadowView key={index} style={styles.jobView}>
        <Text style={styles.jobTitle}>{item.job_category[item.job_category.length - 1]}</Text>
        <View style={styles.jobInfoView}>
          <Text style={styles.jobInfo}>{`${reformSalary(item.min_salary_expectation)}-${reformSalary(item.max_salary_expectation)}`}</Text>
          <Text style={styles.jobInfo}>{item.aimed_city}</Text>
          <Text style={styles.jobInfo}>{stringForFullTime(item.full_time_job)}</Text>
        </View>
        <View style={styles.jobPlatformView}>
          {
          	item.industry_involved.map((item, index) => {
          		return <Text key={index} style={styles.jobPlatform}>{item}</Text>
          	})
          }
        </View>
        <NextTouchableOpacity style={styles.editBtn}
          onPress={() => {
            // Toast.show('进入编辑页面')
            const { navigation } = this.props
            navigation.push('JobExpectDetail', { item: item })
          }}
        >
          <Image
            style={styles.editImage}
            source={require('../../../assets/requestJobs/edit.png')}
          />
        </NextTouchableOpacity>
      </HTShadowView>
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
      <HTShadowView style={styles.jobStatusShadowView}>
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
      </HTShadowView>
    )
  }

  renderFinish() {
    return (
      <NextTouchableOpacity
        style={styles.finishBtn}
        onPress={() => this.props.navigation.push('JobExpectDetail')}
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
          contentContainerStyle={{ paddingBottom: HOME_BAR_HEIGHT + 50 }}
        >
          {this.renderTitleView()}
          {this.state.itemList.map((item, index) => {
          	return this.renderItem(item, index)
          })}
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

export default JobExpectations