import React, { Component } from 'react'
import { SafeAreaView, StatusBar, ImageBackground, Image, ScrollView, View, Text, RefreshControl } from 'react-native'
import NextPressable from '../../components/NextPressable'
import styles from './styles/HrPersonalInfo.style'
import { GenProps } from '../../../utils/StackProps'
import CompanyJobCell from './CompanyJobCell'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import ShareModal from '../../components/ShareModal'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import HTShadowView from '~/common/view/HTShadowView'

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
    HTAPI.CandidateGetHRDetail_HRInfo({
    	hrId
    }).then(response => {
    	this.setState({
          refreshing: false,
          hrInfo: response
        })
    })
  }

  getMatchList() {
    const { hrId } = this.state
    HTAPI.CandidateGetHRDetail_RecommendationsList({
    	hrId
    }).then(response => {
    	this.setState({
          refreshing: false,
          matchJobsList: response.data
        })
    })
  }

  loadMoreList() {
    const { hrId, moreListPage, moreJobsLis = [] } = this.state
    HTAPI.CandidateGetHRDetail_JobListPageView({
    	hrId,
		page: moreListPage,
		pageSize: 10
    }).then(response => {
    	this.setState({
          refreshing: false,
          moreJobsLis: moreJobsLis.concat(response.data),
          jobRefreshState: response.data.length === 10 ? 0 : 3
        })
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
        <NextPressable
          style={styles.avatar}
          onPress={() => {
            // const { navigation } = this.props
            // navigation.push('UserInfo')
          }}
        >
          <CacheImage
            style={styles.hrIcon}
            source={global.AVATAR_IMAGE(logo)}
          />
          {/*<Image
            style={styles.gender}
            source={require('../../../assets/requestJobs/women-icon.png')}
          />*/}
        </NextPressable>
        <View style={styles.nameView}>
          <View style={styles.hrNameView}>
            <Text style={styles.nameTitle}>
              {name}
            </Text>
            <Image
              source={require('../../../assets/requestJobs/hr-renzheng.png')}
              style={styles.hrRenzheng}
            />
            {/* <NextPressable
              style={styles.hrFocusBtn}
            >
              <Text style={styles.hrFocusText}>+关注</Text>
            </NextPressable> */}
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
        <NextPressable
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image
            style={styles.backImage}
            source={require('../../../assets/requestJobs/white-back.png')}
          />
        </NextPressable>
        {/* <View
        // v1版本适配
          style={styles.rightView}
        >
          <NextPressable
            style={styles.rightItem}
            onPress={() => {
              navigation.push('ReportComplaints')
            }}
          >
            <Image resizeMode="center" style={styles.jubao} source={require('../../../assets/requestJobs/jubao-white.png')} />
          </NextPressable>
          <NextPressable
            style={styles.rightItem}
            onPress={() => {
              this.setState({ shareVisible: true })
            }}
          >
            <Image resizeMode="center" style={styles.fenxiang} source={require('../../../assets/requestJobs/fenxiang-white.png')} />
          </NextPressable>
        </View> */}
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
      <HTShadowView style={styles.matchJobView}>
        <Text style={styles.matchTitle}>
          匹配职位
        </Text>
        <ImageBackground
          style={styles.hrMessageBg}
          source={require('../../../assets/requestJobs/hr-message-bg.png')}
        >
          <CacheImage style={styles.hrMessageIcon} source={global.AVATAR_IMAGE(this?.state?.hrInfo?.logo)} />
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
              	this.props.navigation.push('JobDetail', { jobid: item.id })
              }}
              onPress={() => {

              }}
            />
          )
        })}
      </HTShadowView>
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
            this.props.navigation.push('JobDetail', { jobid: item.id })
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
        // onRefresh={() => this.onRefresh()}}
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

export default HrPersonalInfo