import React, { Component } from 'react'
import { SafeAreaView, StatusBar, ImageBackground, Image, ScrollView, View, Text, RefreshControl } from 'react-native'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import styles from './styles/HrPersonalInfo.style'
import RootLoading from '../../../utils/rootLoading'
import { GenProps } from '../../../navigator/requestJob/stack'
import CompanyJobCell from './CompanyJobCell'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import ShareModal from '../../components/ShareModal'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import * as jobActions from '../../../action/jobsAction'

type IProps = GenProps<'HrPersonalInfo'> & ReturnType<typeof mapDispatchToProps>

type IState = {
  shareVisible: boolean,
  hrId: number,
  hrInfo: any
  refreshing: boolean
  matchJobsList: any
  moreJobsLis: any
  moreListPage: number
  jobRefreshState: any
}

class HrPersonalInfo extends Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    console.log('props: ', props)
    const { route: { params: { hrId } } } = props
    this.state = {
      hrId,
      hrInfo: undefined,
      moreJobsLis: [],
      matchJobsList: [],
      shareVisible: false,
      refreshing: true,
      moreListPage: 0,
      jobRefreshState: 0
    }
  }

  componentDidMount() {
    this.loadData()
  }

  getHrInfo() {
    const { hrId } = this.state
    const { getHrBasicInfo } = this.props
    getHrBasicInfo(hrId, (error, result) => {
      if (!error && result) {
        this.setState({
          refreshing: false,
          hrInfo: result.CandidateGetHRDetail_HRInfo
        })
      } else {
        this.setState({ refreshing: false })
        RootLoading.fail('加载失败,请下拉刷新重试')
      }
    })
  }

  getMatchList() {
    const { hrId } = this.state
    const { getHrMatchJobList } = this.props
    getHrMatchJobList(hrId, (error, result) => {
      if (!error && result) {
        this.setState({
          refreshing: false,
          matchJobsList: result.CandidateGetHRDetail_RecommendationsList.data
        })
      } else {
        this.setState({ refreshing: false })
        RootLoading.fail('加载失败,请下拉刷新重试')
      }
    })
  }

  loadMoreList() {
    const { hrId, moreListPage, moreJobsLis = [] } = this.state
    const { getHrMoreJobList } = this.props
    getHrMoreJobList(hrId, moreListPage, (error, result) => {
      if (!error && result) {
        this.setState({
          refreshing: false,
          moreJobsLis: moreJobsLis.concat(result.CandidateGetHRDetail_JobListPageView.data),
          jobRefreshState: result.CandidateGetHRDetail_JobListPageView.data.length === 10 ? 0 : 3
        })
      } else {
        this.setState({ refreshing: false, jobRefreshState: 4 })
        RootLoading.fail('加载失败,请下拉刷新重试')
      }
    })
  }

  loadData() {
    this.getHrInfo()
    this.getMatchList()
    this.loadMoreList()
  }

  renderIconView() {
    const { hrInfo } = this.state
    if (!hrInfo) {
      return
    }
    const {
      name,
      pos,
      last_log_out_time,
      company_belonged,
      logo } = hrInfo
    return (
      <View style={styles.iconView}>
        <NextTouchableOpacity
          style={styles.avatar}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('UserInfo')
          }}
        >
          <Image
            style={styles.hrIcon}
            source={require('../../../assets/requestJobs/icon-example.png')}
          />
          <Image
            style={styles.gender}
            source={require('../../../assets/requestJobs/women-icon.png')}
          />
        </NextTouchableOpacity>
        <View style={styles.nameView}>
          <View style={styles.hrNameView}>
            <Text style={styles.nameTitle}>
              {name}
            </Text>
            <Image
              source={require('../../../assets/requestJobs/hr-renzheng.png')}
              style={styles.hrRenzheng}
            />
            <NextTouchableOpacity
              style={styles.hrFocusBtn}
            >
              <Text style={styles.hrFocusText}>+关注</Text>
            </NextTouchableOpacity>
          </View>
          <Text style={styles.detailInfo}>
            {`${pos}${last_log_out_time ? `·${last_log_out_time}` : ''}`}
          </Text>
          <Text style={styles.companyInfo}>
            {`认证公司：${company_belonged}`}
          </Text>
        </View>
      </View>
    )
  }

  renderTopBar() {
    const { navigation } = this.props
    return (
      <View style={styles.navBar}>
        <NextTouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image
            style={styles.backImage}
            source={require('../../../assets/requestJobs/white-back.png')}
          />
        </NextTouchableOpacity>
        <View
          style={styles.rightView}
        >
          <NextTouchableOpacity
            style={styles.rightItem}
            onPress={() => {
              navigation.push('ReportComplaints')
            }}
          >
            <Image resizeMode="center" style={styles.jubao} source={require('../../../assets/requestJobs/jubao-white.png')} />
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.rightItem}
            onPress={() => {
              this.setState({ shareVisible: true })
            }}
          >
            <Image resizeMode="center" style={styles.fenxiang} source={require('../../../assets/requestJobs/fenxiang-white.png')} />
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderNavBar() {
    return (
      <ImageBackground
        style={styles.topImage}
        resizeMode="cover"
        source={require('../../../assets/requestJobs/me-beijing.png')}
      >
        {this.renderTopBar()}
        {this.renderIconView()}
      </ImageBackground>
    )
  }

  renderMatchView() {
    const { matchJobsList } = this.state
    console.log('matchJobsList: ', matchJobsList)
    if (!matchJobsList) {
      return null
    }
    console.log('matchJobsList:1 ', matchJobsList)
    return (
      <View style={styles.matchJobView}>
        <Text style={styles.matchTitle}>
          匹配职位
        </Text>
        <ImageBackground
          style={styles.hrMessageBg}
          source={require('../../../assets/requestJobs/hr-message-bg.png')}
        >
          <Image resizeMode="center" style={styles.hrMessageIcon} source={require('../../../assets/requestJobs/icon-example.png')} />
          <Text style={styles.hrMessageText}>
            我有一个职位适合你，快来聊聊吧～
          </Text>
        </ImageBackground>
        <View style={styles.matchJobTitleView}>
          <Text style={styles.matchJobTitleText}>
            和您匹配
          </Text>
        </View>
        {matchJobsList.map((item: any, index: number) => {
          return (
            <CompanyJobCell
              key={index.toString()}
              cellStyle={styles.matchJobCell}
              cellItem={item}
              onDeliveryPress={() => {
                RootLoading.info('投递')
              }}
              onPress={() => {

              }}
            />
          )
        })}
      </View>
    )
  }

  renderJobCell(item: any, index: number) {
    console.log('index: ', index)
    return (
      <>
        {index === 0 && (
          < Text style={styles.moreJobTitle}> 更多职位</Text >
        )}
        <CompanyJobCell
          cellStyle={styles.moreJobCell}
          onDeliveryStyle={{ bottom: 20, }}
          cellItem={item}
          onDeliveryPress={() => {
            RootLoading.info('投递')
          }}
          onPress={() => {

          }}
        />
      </>
    )
  }

  handleEndReached() {
    this.setState({
      moreListPage: this.state.moreListPage + 1,
      jobRefreshState: 2
    }, () => {
      this.loadMoreList()
    })
  }

  onRefresh() {
    console.log('onRefresh')
    this.setState({
      matchJobsList: [],
      moreJobsLis: [],
      refreshing: true,
      jobRefreshState: 1
    }, () => {
      this.loadData()
    })
  }

  renderList() {
    const { moreJobsLis, jobRefreshState } = this.state
    if (!moreJobsLis) {
      return null
    }
    return (
      <View style={styles.moreJobView}>
        <RefreshListView
          showsVerticalScrollIndicator={false}
          style={styles.listView}
          ListHeaderComponent={this.renderMatchView()}
          onHeaderRefresh={() => this.onRefresh()}
          refreshState={jobRefreshState}
          automaticallyAdjustContentInsets={false}
          data={moreJobsLis}
          renderItem={({ item, index }: any,) => this.renderJobCell(item, index)}
          onFooterRefresh={() => this.handleEndReached()}
          keyExtractor={({ id }: any) => id.toString()}
          // ItemSeparatorComponent={() => this.renderItemSeparatorComponent()}
          footerRefreshingText="加载更多"
          footerNoMoreDataText="没有更多了"
        />
      </View>
    )
  }

  render() {
    const { shareVisible, refreshing } = this.state
    console.log('shareVisible: ', shareVisible)
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          barStyle={'light-content'}
          animated />
        <View
          style={styles.scrollview}
        // contentContainerStyle={styles.contentContainerStyle}
        // refreshControl={(
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={() => this.onRefresh()
        //     }
        //   />
        // )}
        >
          {this.renderNavBar()}
          {this.renderList()}
        </View>
        <ShareModal
          visible={shareVisible}
          cancelOnpress={() => {
            this.setState({ shareVisible: false })
          }}
        />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({
    getHrBasicInfo: jobActions.getHrBasicInfo,
    getHrMatchJobList: jobActions.getHrMatchJobList,
    getHrMoreJobList: jobActions.getHrMoreJobList
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(HrPersonalInfo)