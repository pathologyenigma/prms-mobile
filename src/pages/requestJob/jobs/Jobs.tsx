import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  DeviceEventEmitter,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RootLoading from '../../../utils/rootLoading'
import GradientButton from '../../components/GradientButton'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import styles from './styles/Jobs.style'
import LinearGradient from 'react-native-linear-gradient'
import {
  gradienViewRightGreenColor,
  greenColor,
  Log_Out,
  Receive_Message,
} from '../../../utils/constant'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { Carousel } from '@ant-design/react-native'
import NavBar, { EButtonType } from '../../components/NavBar'
import JobCell from '../../components/JobCell'
import { GenProps } from '../../../navigator/requestJob/stack'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import * as actions from '../../../action/loginAction'
import * as jobActions from '../../../action/jobsAction'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'
import { CommonActions } from '@react-navigation/native'
import JobCellData from '../../components/JobCellData'
import { IStoreState } from '../../../reducer'
import { urlToHttpOptions } from 'http'
import SystemHelper from '../../../utils/system'
import {
  requestNotifications,
  checkNotifications
} from 'react-native-permissions'

type IProps = GenProps<'Jobs'> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

type IState = {
  videoSource: []
  listDataSource: any
  refreshState: RefreshState.HeaderRefreshing
  selectCondition: number
  selectJobsArray: any
  selectJobIndex: number
  page: number
}

class Jobs extends Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    console.log('111111112props: ', props)
    this.state = {
      videoSource: [],
      listDataSource: [],
      refreshState: RefreshState.Idle,
      selectCondition: 2, // 1:推荐; 2: 最新; 3:附近
      selectJobsArray: [],
      selectJobIndex: 0,
      page: 0,
    }
  }

  componentDidMount() {
    this.getNotificationPermission()
    RootLoading.loading()
    this.loadUserBasicInfo()
    // 注意:当前服务端不支持 subscription 和 其他接口同时调用,暂时修改为延迟获取
    setTimeout(() => {
      this.subscribeMessage()
    }, 5000)
    this.loadJobExpections()
    StatusBar.setBarStyle('light-content', true)
    this.props.navigation.addListener('focus', () => {
      StatusBar.setBarStyle('light-content', true)
    })
  }

  getNotificationPermission() {
    checkNotifications()
      .then(({ status, settings }) => {
        // …
        console.log('checkNotifications: ', status, settings)
        // 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';
        if (status !== 'granted') {
          // 已经被拒绝或不可达,尝试再次申请
          requestNotifications(['alert', 'sound'])
            .then(({ status: nextStatus, settings: nextSetting }) => {
              // …
              console.log('requestNotifications: ', nextStatus, nextSetting)
            })
            .catch((error) => {
              console.log('request-error: ', error)
            })
        }
      })
      .catch((error) => {

      })
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', () => { })
  }

  loadUserBasicInfo() {
    this.props.getUserGetBasicInfo()
  }

  loadJobExpections() {
    // 加载个人职位类型
    this.props.getCandidateGetAllJobExpectations((error, result) => {
      console.log('getCandidateGetAllJobExpectations1: ', error, result)
      if (!error && result && result.CandidateGetAllJobExpectations) {
        this.setState({
          selectJobsArray: result.CandidateGetAllJobExpectations
        }, () => {
          this.loadJobList()
        })
      } else {
        RootLoading.fail('职位加载失败,请重试')
      }
    })
  }

  loadJobList() {
    // 根据个人类型加载列表
    const { selectJobsArray, selectJobIndex, listDataSource, page } = this.state
    if (!selectJobsArray) {
      // 没有筛选条件，直接展示空列表
      this.setState({
        listDataSource: [],
        refreshState: 3,
      })
      return
    }
    console.log(
      'selectJobsArray[selectJobIndex]: ',
      selectJobsArray[selectJobIndex], selectJobIndex
    )
    const filter = {
      page,
      pageSize: 10,
    }
    console.log('filter:', filter)
    this.props.getCandidateGetJobList(filter, (error, result) => {
      console.log('CandidateGetJobList: ', filter, error, result)
      RootLoading.hide()
      if (
        !error &&
        result &&
        result.CandidateGetJobList &&
        result.CandidateGetJobList.data
      ) {
        const originData = page === 0 ? [] : listDataSource
        this.setState({
          listDataSource: originData.concat(
            result.CandidateGetJobList.data,
          ),
          refreshState: result.CandidateGetJobList.data.length === 10 ? 0 : 3,
        })
      } else {
        this.setState({
          refreshState: 0,
        })
        RootLoading.fail('职位加载失败,请重试')
      }
    })
  }

  subscribeMessage() {
    // 订阅相关
    this.props.subscriptionMessage((error, result) => {
      if (
        !error &&
        result &&
        result.data &&
        result.data.newMessage
        // && result.data.newMessage.to.toString() === this.props.userInfo.userInfo.id.toString()
      ) {
        RootLoading.info(`收到新消息 :${result.data.newMessage.messageContent}`)
        DeviceEventEmitter.emit(Receive_Message, result.data)
      } else {
        console.log('subscription断开了')
        RootLoading.fail('subscription断开了')
      }
    })
  }

  renderNavBar() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    const { navigation } = this.props
    const { selectJobsArray, selectJobIndex } = this.state
    return (
      <LinearGradient
        start={start}
        end={end}
        colors={[greenColor, gradienViewRightGreenColor]}
        style={styles.naviBar}>
        {/* <Text style={[styles.text, textStyle]}>
          {text}
        </Text> */}
        {/* <View style={styles.statusBarStyle} /> */}
        {/* <GradientButton
          containerStyle={styles.statusBarStyle}
        /> */}
        <View style={styles.naviBarContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={'barScrollView'}
            style={styles.naviBarScrollview}>
            {selectJobsArray &&
              selectJobsArray.length > 0 &&
              selectJobsArray.map((item: any, index: number) => {
                return (
                  <NextTouchableOpacity
                    key={index.toString()}
                    onPress={() => {
                      this.setState(
                        {
                          selectJobIndex: index,
                        },
                        () => {
                          this.handleRefresh()
                        },
                      )
                    }}>
                    <Text
                      style={[
                        styles.naviBarText,
                        selectJobIndex === index && {
                          fontSize: 20,
                          fontWeight: '400',
                        },
                      ]}>
                      {item.job_category[item.job_category.length - 1]}
                    </Text>
                  </NextTouchableOpacity>
                )
              })}
          </ScrollView>
          <NextTouchableOpacity
            style={{ marginLeft: 40, marginRight: 10 }}
            onPress={() => {
              navigation.push('JobExpectations')
            }}>
            <Image
              style={styles.naviBarIcon}
              source={require('../../../assets/requestJobs/add.png')}
            />
          </NextTouchableOpacity>
          <NextTouchableOpacity
            onPress={() => {
              navigation.push('JobSearch')
            }}>
            <Image
              style={styles.naviBarIcon}
              source={require('../../../assets/requestJobs/search.png')}
            />
          </NextTouchableOpacity>
        </View>
      </LinearGradient>
    )
  }

  handleRefresh() {
    this.setState(
      {
        page: 0,
        refreshState: 1,
      },
      () => {
        this.loadJobList()
      },
    )
  }

  handleEndReached() {
    this.setState(
      {
        page: this.state.page + 1,
        refreshState: 2,
      },
      () => {
        this.loadJobList()
      },
    )
  }

  renderVideoTag() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View style={styles.videoTagContainer}>
        <LinearGradient
          start={start}
          end={end}
          colors={['#FF5A00', '#FF8C05']}
          style={styles.videoTagView}>
          <Image
            style={styles.videoTable}
            source={require('../../../assets/requestJobs/video-table.png')}
          />
          <Text style={styles.videoTagTitle}>直播</Text>
        </LinearGradient>
        <Text style={styles.videoAccount}>280人</Text>
      </View>
    )
  }

  renderVideo() {
    return (
      <View style={styles.videoView}>
        <View style={styles.videoHeaderView}>
          <Text style={styles.videoTitle}>视频招聘</Text>
          <Text style={styles.videoDetail}>查看更多</Text>
          <Image
            style={styles.videoRightImg}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </View>
        <View style={styles.videoTopView}>
          <NextTouchableOpacity
            style={styles.videoBtn}
            onPress={() => {
              const { navigation } = this.props
              navigation.push('JobSelectCity', {
                selectJobCityCallback: (e: any) => {
                  console.log('eeeee: ', e)
                  RootLoading.info(e.title || e)
                },
              })
            }}>
            {this.renderVideoTag()}
            <Text style={styles.videoText}>在招职场系列直播</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity style={styles.videoBtn}>
            {this.renderVideoTag()}
            <Text style={styles.videoText}>在招职场系列直播</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity style={styles.videoBtn}>
            {this.renderVideoTag()}
            <Text style={styles.videoText}>在招职场系列直播</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderItem(item: any) {
    const { navigation } = this.props
    console.log('item: ', item)
    return (
      <JobCellData
        key={item.job_id.toString()}
        cellItem={item}
        onPress={() => {
          navigation.push('JobDetail', { jobid: item.job_id })
        }}
      />
    )
  }

  renderCondition() {
    const { selectCondition } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.conditionView}>
        <View style={styles.conditionLeftView}>
          {/* <NextTouchableOpacity
            style={styles.conditionLeftBtn}
            onPress={() => {
              this.setState({ selectCondition: 1 })
            }}
          >
            <Text
              style={[styles.conditionLeftText, selectCondition === 1 && {
                color: greenColor, fontWeight: '500'
              }]}
            >推荐</Text>
          </NextTouchableOpacity> */}
          <NextTouchableOpacity
            style={styles.conditionLeftBtn}
            onPress={() => {
              this.setState({ selectCondition: 2 })
            }}>
            <Text
              style={[
                styles.conditionLeftText,
                selectCondition === 2 && {
                  color: greenColor,
                  fontWeight: '500',
                },
              ]}>
              最新
            </Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.conditionLeftBtn}
            onPress={() => {
              this.setState({ selectCondition: 3 })
            }}>
            <Text
              style={[
                styles.conditionLeftText,
                selectCondition === 3 && {
                  color: greenColor,
                  fontWeight: '500',
                },
              ]}>
              附近
            </Text>
          </NextTouchableOpacity>
        </View>
        <View style={styles.conditionRightView}>
          <NextTouchableOpacity style={styles.conditionRightBtn}>
            <Text style={styles.conditionRightText}>地点</Text>
            <Image
              style={styles.rightBottomImg}
              source={require('../../../assets/requestJobs/right-bootom-triangle.png')}
            />
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={[styles.conditionRightBtn, { marginLeft: 9 }]}
            onPress={() => {
              const { navigation } = this.props
              navigation.push('FilterView', {
                filterMode: 0,
                filterResultCallback: result => {
                  console.log('111111111: ', result)
                },
              })
            }}>
            <Text style={styles.conditionRightText}>筛选</Text>
            <Image
              style={styles.rightBottomImg}
              source={require('../../../assets/requestJobs/right-bootom-triangle.png')}
            />
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderAd() {
    return (
      <Carousel
        autoplay
        autoplayInterval={3000}
        infinite={true}
        dotStyle={styles.dots}
        dotActiveStyle={styles.activeDots}
        style={styles.carousel}
        styles={{ pagination: styles.pageController }}>
        <NextTouchableOpacity style={styles.adBtn}>
          <Text style={styles.adText}>这是广告 1</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity style={styles.adBtn}>
          <Text style={styles.adText}>这是广告 2</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity style={styles.adBtn}>
          <Text style={styles.adText}>这是广告 3</Text>
        </NextTouchableOpacity>
      </Carousel>
    )
  }

  renderHeader = () => {
    // v1版本适配
    return (
      <View style={styles.listHeaderView}>
        {this.renderCondition()}
        {this.renderAd()}
        {/* {this.renderVideo()} */}
      </View>
    )
  }

  renderList() {
    const { refreshState, listDataSource } = this.state
    console.log('listDataSource: ', listDataSource)
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleRefresh()}
        refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={listDataSource}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }: any) => this.renderItem(item)}
        onFooterRefresh={() => this.handleEndReached()}
        keyExtractor={(item: any) => item.id.toString()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'light-content'}
        />
        {this.renderNavBar()}
        {this.renderList()}
      </View>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    userInfo: state.userInfo,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(
    {
      reset_reducer: actions.reset_reducer,
      update_kv: actions.update_kv,
      loginMobile: actions.loginMobile,
      userNumberCheck: actions.userNumberCheck,
      subscriptionMessage: actions.subscriptionMessage,
      getCandidateGetAllJobExpectations:
        jobActions.getCandidateGetAllJobExpectations,
      getCandidateGetJobList: jobActions.getCandidateGetJobList,
      getUserGetBasicInfo: actions.getUserGetBasicInfo,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs)
