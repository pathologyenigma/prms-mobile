import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList, StatusBar, RefreshControl } from 'react-native'
import styles from './styles/JobDetail.style'
import { GenProps } from '../../../utils/StackProps'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextPressable from '../../components/NextPressable'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'
import { Tabs } from '@ant-design/react-native'
import JobCell from '../../components/JobCell'
import SystemHelper from '../../../utils/system'
import InterviewerFooter from '../../components/InterviewerFooter'
import ShareModal from '../../components/ShareModal'
import { reformFullTime, reformCompanySize, reformSalary } from '../../../utils/utils'
import { stringForEducation } from '~/recruitment/utils/JobHelper'
import { stringForEnterpriseNature } from '~/recruitment/utils/JobHelper'
import HTAuthManager from '~/common/auth/common/model/HTAuthManager'
import HTMapImageView from '~/common/view/HTMapImageView'

type IProps = GenProps<'JobDetail'> & ReturnType<typeof mapDispatchToProps>

interface IState {
  dataSource: any,
  showMoreDetail: boolean,
  selectLikesTabs: number,
  shareVisible: boolean,
  jobid: number,
  refreshing: boolean
}



class JobDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params: { jobid } } } = props
    this.state = {
      jobid,
      dataSource: undefined,
      showMoreDetail: false,
      selectLikesTabs: 0,
      shareVisible: false,
      refreshing: true
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const { jobid } = this.state
    HTAPI.UserGetJob({
    	jobid
    }).then(response => {
    	this.setState({
          refreshing: false,
          dataSource: response
        })
    })
  }

  _chatDidTouch = () => {
  	HTAPI.CandidateGetHRIdByWorkerId({
  		id: this?.state?.dataSource?.hr?.id
  	}).then(hrUserId => {
		let jobId = this?.state?.jobid
		HTAPI.UserSendMessage({
			info: {
				messageType: 'Other',
				messageContent: JSON.stringify({ type: 'job', 'value': jobId, info: { title: this?.state?.dataSource?.job?.title } }),
				to: hrUserId,
				jobId: jobId
			}
		}).then(() => {
			this.props.navigation.push('MessagePage', {
				targetItem: {
					pos: this.state.dataSource.hr.pos,
					name: this.state.dataSource.hr.name,
					id: hrUserId,
					ent: this.state.dataSource.company.name
				}
			})
		})
  	})
  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <View style={styles.navBar}>
        <NextPressable
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image
            style={styles.backImage}
            source={require('../../../assets/requestJobs/navbar-back.png')}
          />
        </NextPressable>
        <View
          style={styles.rightView}
        >
          <NextPressable
            style={styles.rightItem}
            onPress={() => {
              global.TODO_TOAST()
            }}
          >
            <Image resizeMode="center" style={styles.shoucang} source={require('../../../assets/requestJobs/shoucang.png')} />
          </NextPressable>
          <NextPressable
            style={styles.rightItem}
            onPress={() => {
              // Toast.show('??????')
              // navigation.push('ReportComplaints')
              global.TODO_TOAST()
            }}
          >
            <Image resizeMode="center" style={styles.jubao} source={require('../../../assets/requestJobs/jubao.png')} />
          </NextPressable>
          {/* <NextPressable
          // v1????????????
            style={styles.rightItem}
            onPress={() => {
              this.setState({ shareVisible: true })
            }}
          >
            <Image resizeMode="center" style={styles.fenxiang} source={require('../../../assets/requestJobs/job-fenxiang.png')} />
          </NextPressable> */}
        </View>
      </View>
    )
  }

  renderHeader() {
    const {
      dataSource: {
        job: {
          id,
          title,
          category,
          detail,
          address_coordinate,
          address_description,
          salaryExpected,
          experience,
          education,
          required_num,
          full_time_job,
          tags,
        } } } = this.state
    return (
      <View
        style={styles.headerView}
      >
        <View style={styles.headerTitleView}>
          <Text style={styles.headerTitle}>
            {title}
          </Text>
          <Text style={styles.headerSalary}>
            {reformSalary(salaryExpected)}
          </Text>
        </View>
        <View style={styles.headerCompanyView}>
          <Text style={styles.headerCompany}>
            {reformFullTime(full_time_job)}
          </Text>
          <Text style={styles.headerCompany}>
            {`???${required_num}???`}
          </Text>
          <Text style={styles.headerCompany}>
            {`${experience}????????????`}
          </Text>
          <Text style={styles.headerCompany}>
          	{`${stringForEducation(education, true)}`}
          </Text>
        </View>
        <View style={styles.headerJobView}>
          <Image
            style={styles.location}
            source={require('../../../assets/requestJobs/location-icon.png')}
            resizeMode="center"
          />
          <Text style={styles.locationText}>
            {address_description.slice(3).join('??')}
          </Text>
        </View>
      </View>
    )
  }

  renderInterviewer() {
    const { dataSource: {
      company: {
        name: companyName
      },
      hr: {
        id, name, pos, last_log_out_time = '',
        logo,
      } } } = this.state
    return (
      <NextPressable
        style={styles.interviewerView}
        onPress={() => {
          const { navigation } = this.props
          navigation.push('HrPersonalInfo', { hrId: id, })
        }}
      >
        <CacheImage style={styles.interviewerIcon} source={global.AVATAR_IMAGE(logo)} />
        <View style={styles.interviewerInfo}>
          <View style={styles.interviewerTitleView}>
            <Text style={styles.interviewerTitle}>
              {`${name} ?? ${pos}`}
            </Text>
            {last_log_out_time &&
              <>
                <View style={styles.dot} />
                <Text style={styles.interviewerOnline}>
                  {last_log_out_time}
                </Text>
              </>
            }
          </View>
          <Text style={styles.interviewerCompany}>{companyName}</Text>
        </View>
        <Image
          style={styles.nextBtn}
          source={require('../../../assets/requestJobs/next-gray.png')}
        />
      </NextPressable>
    )
  }

  renderJobInfo() {
    const { dataSource, showMoreDetail } = this.state
    const {
      dataSource: {
        job: {
          id,
          title,
          category,
          detail,
          address_coordinate,
          address_description,
          salaryExpected,
          experience,
          education,
          required_num,
          full_time_job,
          tags,
        } } } = this.state
    return (
      <View style={[styles.headerView, { minHeight: 100 }]}>
        <Text style={styles.jobInfoTitle}>????????????</Text>
        <View style={styles.jobInfoTagView}>
          {tags.map((item: any, index: number) => {
            return (
              <Text key={index.toString()} style={styles.jobInfoTagItem}>
                {item}
              </Text>
            )
          })}
        </View>
        <Text style={styles.jobInfoDetail}>
          {showMoreDetail ? detail : detail.substring(0, 199)}
          {detail.length > 200 && !showMoreDetail && (
            <NextPressable
              onPress={() => {
                this.setState({ showMoreDetail: true })
              }}
            >
              <Text style={styles.showMoreText}> ...????????????</Text>
            </NextPressable>
          )}
        </Text>
        {/* <Text style={styles.jobInfoDetail}>????????????</Text>
        <Text style={styles.jobContent}>{dataSource.jobContent}</Text>
        <Text style={styles.jobInfoDetail}>????????????</Text>
        <Text style={styles.jobContent}>{dataSource.jobRequire}</Text> */}
        {/* {showMoreDetail ? (
          <View style={{ marginTop: 22 }}>
            <Text style={styles.addScoreText}>?????????</Text>
            <Text style={styles.jobContent}>{dataSource.jobAddPoints}</Text>
          </View>
        ) : (
          <NextPressable
            style={styles.addScoreBtn}
            onPress={() => {
              this.setState({ showMoreDetail: true })
            }}
          >
            <Text style={styles.addScoreText}>?????????</Text>
            <Text style={styles.showMoreDetailText}>...????????????</Text>
          </NextPressable>
        )} */}
      </View>
    )
  }

  renderCompanyInfo() {
    const { dataSource: {
      company: {
        id,
        name,
        address_coordinates,
        address_description,
        industry_involved = '',
        enterprise_size,
        business_nature,
        enterprise_logo = '',
      }
    } } = this.state
    return (
      <View
        style={styles.headerView}
      >
        <Text style={styles.jobInfoTitle}>????????????</Text>
        <NextPressable
          onPress={() => {
            const { navigation } = this.props
            navigation.push('CompanyDetail', { id: id })
          }}
          style={styles.companyInfo}>
          <CacheImage style={styles.companyIcon} source={global.AVATAR_IMAGE(enterprise_logo, require('~/recruitment/Job/JobDetail/CompanyInfo/company_default.png'))} />
          <View style={styles.companyTitle}>
            <Text style={styles.companyName}>{name}</Text>
            <Image style={styles.jobRenzheng}
              source={require('../../../assets/requestJobs/job-renzheng.png')}
            />
          </View>
          <Image
            style={styles.nextBtn}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </NextPressable>
        <View style={styles.companyTag}>
          <Text style={styles.companyTagItem}>
            {stringForEnterpriseNature(business_nature)}
          </Text>
          <Text style={styles.companyTagItem}>
            {reformCompanySize(enterprise_size) || ''}
          </Text>
          <Text style={styles.companyTagItem}>
            {industry_involved || ''}
          </Text>
        </View>
        <View style={styles.mapWrapper}>
          <HTMapImageView style={styles.map} coordinate={address_coordinates} />
        </View>
      </View>
    )
  }

  renderTabBar() {
    return (
      <Text>????????????</Text>
    )
  }

  renderLikeList(dataSource: any) {
    if (!dataSource) {
      return null
    }
    if (dataSource.length === 0) {
      return (
        <Text>?????????????????????</Text>
      )
    }
    const { navigation } = this.props
    return (
      <View style={[styles.listView]}>
        {dataSource.map((item: any, index: number) => {
          return (
            <JobCell
              cellStyle={styles.cellStyle}
              key={index.toString()}
              cellItem={item}
              onPress={() => {
                navigation.push('JobDetail')
              }}
            />
          )
        })}
      </View>
    )
  }

  renderGuessJobs() {
    const { selectLikesTabs, dataSource } = this.state
    if (!dataSource) {
      return null
    }
    if (dataSource.length === 0
      || !dataSource.recommendList
      || dataSource.recommendList.length === 0
    ) {
      return (
        <View style={styles.headerView}>
          {this.renderTabBar()}
          <Text>?????????????????????</Text>
        </View>
      )
    }
    const listData = dataSource.recommendList
    let showList: any = [[], [], []]
    for (let i = 0; i < listData.length; i++) {
      if (i < 4) {
        showList[0].push(listData[i])
      } else if (i < 8) {
        showList[1].push(listData[i])
      } else {
        showList[2].push(listData[i])
      }
    }
    return (
      <View style={[styles.headerView, {
        paddingHorizontal: 0,
        minHeight: listData.length > 4
          ? 640
          : (listData.length * 125 + 110),
      }]}>
        <Tabs
          styles={{
            topTabBarSplitLine: {
              borderBottomWidth: 0,
            },
          }}
          tabs={[{ title: 'list1' }, { title: 'list2' }, { title: 'list3' }]}
          page={selectLikesTabs}
          swipeable={true}
          usePaged={false}
          renderTabBar={(tabProps) => this.renderTabBar()}
          onChange={(tab, index) => {
            this.setState({ selectLikesTabs: index })
          }}
        >
          {showList.map((item: any, index: number) => {
            return (
              this.renderLikeList(item)
            )
          })}
        </Tabs>
        <View style={styles.dotContainer}>
          <View style={[styles.dotView, selectLikesTabs === 0 && styles.selectDot]} />
          <View style={[styles.dotView, selectLikesTabs === 1 && styles.selectDot]} />
          <View style={[styles.dotView, selectLikesTabs === 2 && styles.selectDot]} />
        </View>
      </View >
    )
  }

  rendeJobrTips() {
    const tips = '?????????????????????:???????????????????????????????????????????????????????????????????????????????????????\n1??????????????????????????????????????????;\n2??????????????????????????????????????????????????????????????????????????????(????????????????????????????????????????????????????????????) ;\n3????????????????????????????????????;\n4???????????????????????????????????????:\n5?????????????????????????????????;\n6??????????????????????????????????????????;'
    return (
      <ImageBackground
        style={styles.tipsView}
        source={require('../../../assets/requestJobs/job-tip-bg.png')}
      >
        <Image
          style={styles.zhuyiIcon}
          source={require('../../../assets/requestJobs/zhuyi.png')}
        />
        <Text style={styles.zhuyiText}>
          {tips}
        </Text>
      </ImageBackground>
    )
  }

  renderInterviewerFooter() {
    const { dataSource: {
      hr: {
        id, name, pos, last_log_out_time = '',
        logo,
      } } } = this.state
    return (
      <InterviewerFooter
        name={name}
        job={pos}
        logo={logo}
        clickChat={() => {
          // Toast.show('?????????')
          this._chatDidTouch()
        }}
        clickDelivery={() => {
        	// global.TODO_TOAST()
        	HTAPI.CandidateSendResume({
        		'jobId': this.state.dataSource.job.id,
						'hrId': this.state.dataSource.hr.id,
						'compId': this.state.dataSource.company.id
        	}).then(response => {
        		Toast.show('????????????')
        	})    
        }}
      />
    )
  }

  render() {
    const { refreshing, dataSource, shareVisible } = this.state
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 20 }}
          onRefresh={() => this.loadData()}
        >
          {dataSource ? (
            <View style={{ flex: 1, }}>
              {this.renderHeader()}
              {this.renderInterviewer()}
              {this.renderJobInfo()}
              {this.renderCompanyInfo()}
              {/* {this.renderGuessJobs()} */}
              {this.rendeJobrTips()}
            </View>
          ) : null}
        </ScrollView>
        {dataSource && (
          this.renderInterviewerFooter()
        )}
        <ShareModal
          visible={shareVisible}
          cancelOnpress={() => {
            this.setState({ shareVisible: false })
          }}
        />
      </View >
    )
  }
}

export default JobDetail