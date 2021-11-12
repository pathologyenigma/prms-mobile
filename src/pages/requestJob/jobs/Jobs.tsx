import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RootLoading from '../../../utils/rootLoading'
import GradientButton from '../../components/GradientButton'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import styles from './styles/Jobs.style'
import LinearGradient from 'react-native-linear-gradient'
import { gradienViewRightGreenColor, greenColor } from '../../../utils/constant'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { Carousel } from '@ant-design/react-native'
import NavBar, { EButtonType } from '../../components/NavBar'
import JobCell from '../../components/JobCell'
import { GenProps } from '../../../navigator/requestJob/stack'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import * as actions from '../../../action/loginAction'
import {
  Query
} from "@apollo/client/react/components"
import {
  gql
} from "@apollo/client"
import { getENTEditEnterpriseBasicInfo } from '../../../action/loginAction'
import AsyncStorage from '@react-native-community/async-storage'

type IProps = GenProps<'Jobs'> & ReturnType<typeof mapDispatchToProps>

type IState = {
  videoSource: [],
  listDataSource: [],
  refreshState: RefreshState.HeaderRefreshing,
  selectCondition: number
}

class Jobs extends Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    console.log('111111112props: ', props)
    this.state = {
      videoSource: [],
      listDataSource: [{
        id: 1,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '李女士·产品线HRBP'
      }, {
        id: 2,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '陈先生·技术总监'
      }, {
        id: 3,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '陈先生·技术总监'
      }],
      refreshState: RefreshState.Idle,
      selectCondition: 1, // 1:推荐; 2: 最新; 3:附近
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    // 获取视频和列表数据
    // AsyncStorage.getAllKeys((error, result) => {
    //   console.log('AsyncStorage: ', error, result)
    // })
    // 测试订阅
    console.log('111111111: loadData ')
    this.props.subscriptionMessage((error, result) => {
      console.log('subscriptionMessage: ', error, result)
      RootLoading.info(`收到新消息 :${result.data.newMessage.messageContent}`)
    })
  }

  renderNavBar() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    const { navigation } = this.props
    return (
      <LinearGradient
        start={start}
        end={end}
        colors={[greenColor, gradienViewRightGreenColor]}
        style={styles.naviBar}
      >
        {/* <Text style={[styles.text, textStyle]}>
          {text}
        </Text> */}
        <View style={styles.statusBarStyle} />
        {/* <GradientButton
          containerStyle={styles.statusBarStyle}
        /> */}
        <View style={styles.naviBarContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={'barScrollView'}
            style={styles.naviBarScrollview}
          >
            <NextTouchableOpacity
              onPress={() => {
                // 测试携带 token 情况
                const info = {
                  enterpriseName: "String",
                  abbreviation: "String",
                  enterpriseLocation: ["String"],
                  enterprisecCoordinate: [1],
                  enterpriseNature: "String",
                  enterpriseIndustry: ["String"],
                  enterpriseFinancing: "String",
                  enterpriseSize: "String",
                  enterpriseProfile: "String",
                  logo: "String",
                  establishedDate: "String",
                  homepage: "String",
                  tel: "String",
                }
                getENTEditEnterpriseBasicInfo(info, (error, result) => {

                })
              }}
            >
              <Text style={[styles.naviBarText, {
                fontSize: 20,
                fontWeight: '400'
              }]}>
                项目经理
              </Text>
            </NextTouchableOpacity>
            <Text style={styles.naviBarText}>
              UE设计师
            </Text>
            <Text style={styles.naviBarText}>
              APP设计师
            </Text>
          </ScrollView>
          <NextTouchableOpacity
            style={{ marginLeft: 40, marginRight: 10 }}
            onPress={() => {
              navigation.push('JobExpectations')
            }}
          >
            <Image
              style={styles.naviBarIcon}
              source={require('../../../assets/requestJobs/add.png')}
            />
          </NextTouchableOpacity>
          <NextTouchableOpacity
            onPress={() => {
              navigation.push('JobSearch')
            }}
          >
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

  }

  handleEndReached() {

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
          style={styles.videoTagView}
        >
          <Image
            style={styles.videoTable}
            source={require('../../../assets/requestJobs/video-table.png')}
          />
          <Text style={styles.videoTagTitle}>
            直播
          </Text>
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
          >
            {this.renderVideoTag()}
            <Text style={styles.videoText}>在招职场系列直播</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.videoBtn}
          >
            {this.renderVideoTag()}
            <Text style={styles.videoText}>在招职场系列直播</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.videoBtn}
          >
            {this.renderVideoTag()}
            <Text style={styles.videoText}>在招职场系列直播</Text>
          </NextTouchableOpacity>
        </View>
      </View >
    )
  }

  renderItem(item: any) {
    const { navigation } = this.props
    return (
      <JobCell
        key={item.id.toString()}
        cellItem={item}
        onPress={() => {
          navigation.push('JobDetail')
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
          <NextTouchableOpacity
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
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.conditionLeftBtn}
            onPress={() => {
              this.setState({ selectCondition: 2 })
            }}
          >
            <Text
              style={[styles.conditionLeftText, selectCondition === 2 && {
                color: greenColor, fontWeight: '500'
              }]}
            >最新</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.conditionLeftBtn}
            onPress={() => {
              this.setState({ selectCondition: 3 })
            }}
          >
            <Text
              style={[styles.conditionLeftText, selectCondition === 3 && {
                color: greenColor, fontWeight: '500'
              }]}
            >附近</Text>
          </NextTouchableOpacity>
        </View>
        <View style={styles.conditionRightView}>
          <NextTouchableOpacity style={styles.conditionRightBtn}>
            <Text style={styles.conditionRightText}>
              地点
            </Text>
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
                filterResultCallback: ((result) => {
                  console.log('111111111: ', result)
                })
              })
            }}
          >
            <Text style={styles.conditionRightText}>
              筛选
            </Text>
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
        styles={{ pagination: styles.pageController }}
      >
        <NextTouchableOpacity
          style={styles.adBtn}
        >
          <Text style={styles.adText}>这是广告 1</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.adBtn}
        >
          <Text style={styles.adText}>这是广告 2</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.adBtn}
        >
          <Text style={styles.adText}>这是广告 3</Text>
        </NextTouchableOpacity>
      </Carousel>
    )
  }

  renderHeader = () => {
    return (
      <View style={styles.listHeaderView}>
        {this.renderCondition()}
        {this.renderAd()}
        {this.renderVideo()}
      </View>
    )
  }

  renderList() {
    const { refreshState, listDataSource } = this.state
    return (
      //   <Query
      //     query={gql`
      //   {
      //     rates(currency: "USD") {
      //       currency
      //       rate
      //     }
      //   }
      // `}
      //   >
      //     {
      //       ({ loading, error, data }) => {
      //         console.log('222222222: ', loading, error, data)
      //         if (loading) return <Text>Loading...</Text>;
      //         if (error) return <Text>Error :(</Text>;

      //         return data.rates.map(({ currency, rate }) => (
      //           <View key={currency}>
      //             <Text>{currency}: {rate}</Text>
      //           </View>
      //         ));
      //       }
      //     }
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleRefresh()}
        refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={listDataSource}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }: any) => this.renderItem(item)}
        onFooterRefresh={() => this.handleEndReached}
        keyExtractor={(item: any) => item.id.toString()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
      />
      // </Query>
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({
    reset_reducer: actions.reset_reducer,
    update_kv: actions.update_kv,
    loginMobile: actions.loginMobile,
    userNumberCheck: actions.userNumberCheck,
    subscriptionMessage: actions.subscriptionMessage,
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Jobs)