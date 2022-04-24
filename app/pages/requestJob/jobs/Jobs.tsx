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
import GradientButton from '../../components/GradientButton'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import styles from './styles/Jobs.style'
import LinearGradient from 'react-native-linear-gradient'
import {
  gradienViewRightGreenColor,
  greenColor,
} from '../../../utils/constant'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { Carousel } from '@ant-design/react-native'
import NavBar, { EButtonType } from '../../components/NavBar'
import JobCell from '../../components/JobCell'
import { GenProps } from '../../../navigator/requestJob/stack'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { CommonActions } from '@react-navigation/native'
import JobCellData from '../../components/JobCellData'
import { urlToHttpOptions } from 'http'
import SystemHelper from '../../../utils/system'
import {
  requestNotifications,
  checkNotifications
} from 'react-native-permissions'

import HTBannerView from '~/common/view/HTBannerView'
import HTPageControl from '~/common/view/HTPageControl'

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
    // Hud.show()
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
        // 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';
        if (status !== 'granted') {
          // 已经被拒绝或不可达,尝试再次申请
          requestNotifications(['alert', 'sound'])
            .then(({ status: nextStatus, settings: nextSetting }) => {
              // …
            })
            .catch((error) => {
              
            })
        }
      })
      .catch((error) => {

      })
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', () => { })
  }

  loadJobExpections() {
    // 加载个人职位类型
    HTAPI.CandidateGetAllJobExpectations().then(response => {
    	this.setState({
          selectJobsArray: response
        }, () => {
          this.loadJobList()
        })
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
    const filter = {
      'category': selectJobsArray[selectJobIndex].job_category,
      page,
      pageSize: 10,
    }
    HTAPI.CandidateGetJobList({ filter }).then(response => {
    	const originData = page === 0 ? [] : listDataSource
    	this.setState({
			listDataSource: originData.concat(
				response.data,
			),
			refreshState: response.data.length === 10 ? 0 : 3,
        })
    })
  }

  subscribeMessage() {
    // 订阅相关
    // this.props.subscriptionMessage((error, result) => {
    //   if (
    //     !error &&
    //     result &&
    //     result.data &&
    //     result.data.newMessage
    //     // && result.data.newMessage.to.toString() === this.props.userInfo.userInfo.id.toString()
    //   ) {
    //     Toast.show(`收到新消息 :${result.data.newMessage.messageContent}`)
    //     DeviceEventEmitter.emit(Receive_Message, result.data)
    //   } else {
    //     console.log('subscription断开了')
    //     Toast.show('subscription断开了')
    //   }
    // })
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
  	const imageList = [
		'https://img.freepik.com/free-vector/hand-drawn-hello-spring-illustration_1188-459.jpg?t=st=1648118348~exp=1648118948~hmac=27414c7963326a2b1f6f25cda2fb2ef682f8b4550ce2bc4c191e45768c8e564b&w=1060',
		'https://img.freepik.com/free-vector/watercolor-spring-illustration_23-2149283727.jpg?t=st=1648118477~exp=1648119077~hmac=df19f1bdb4a150e8882d7485ec39f8c5271faa484355ea9fc5aaca872d27f83d&w=1060',
		'https://img.freepik.com/free-vector/flat-spring-illustration_23-2149281781.jpg?w=1060',
		'https://img.freepik.com/free-vector/watercolor-spring-illustration_23-2149283722.jpg?t=st=1648118348~exp=1648118948~hmac=33f10f97f893419876cac5bd3090cd8f0ccd843f015f423b59309e2ac405aaae&w=1060',
		'https://img.freepik.com/free-vector/hand-drawn-spring-illustration_23-2149285248.jpg?w=1060',
	].sort(() => Math.random() - 0.5)
	let itemList = new Array(3).fill(0)
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
          {
          	itemList.map((item, index) => {
          		return (
          			<NextTouchableOpacity key={index} style={styles.videoBtn}>
          				<CacheImage style={[StyleSheet.absoluteFill]} source={{ uri: imageList[index] }} />
						{this.renderVideoTag()}
						<LinearGradient 
							style={styles.videoTextContainer} 
							colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
						>
							<Text style={styles.videoText}>在招职场系列直播</Text>
						</LinearGradient>
					</NextTouchableOpacity>
          		)
          	})
          }
        </View>
      </View>
    )
  }

  renderItem(item: any, index: any) {
    const { navigation } = this.props
    return (
      <JobCellData
        key={item.job_id.toString()}
        index={index}
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
          <NextTouchableOpacity style={styles.conditionRightBtn} onPress={() => {
          	const { navigation } = this.props
            navigation.push('JobSelectCity', {
              // mode: 1,
              selectJobCityCallback: (e: any) => {
                console.log('eeeee: ', e)
                // this.setState({ selectJobCity: e })
              }
            })
          }}>
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
  	let bannerList = [
		{ image: 'https://img.freepik.com/free-vector/gradient-japanese-temple-with-sun_52683-44985.jpg?t=st=1648102330~exp=1648102930~hmac=a63b99b0930beb9813f38e062a6ad7e70a377ae547dda332c9ed771812206619&w=1800' },
		{ image: 'https://img.freepik.com/free-vector/hand-drawn-hug-day-background_52683-77750.jpg?w=1800&t=st=1648102109~exp=1648102709~hmac=851da9bdcc229ad1e5a5c216a31ac97d3ba38a9fdd92ba18356b86b0cfb77b09' },
		{ image: 'https://img.freepik.com/free-vector/gradient-japanese-temple-with-lake_52683-45004.jpg?t=st=1648102330~exp=1648102930~hmac=9e7b86d93d01fff984818d8e932ab843faca17d6d0158d504c9bb6a6ced38045&w=1800' },
		{ image: 'https://img.freepik.com/free-vector/japanese-temple-surrounded-by-nature_52683-46009.jpg?t=st=1648102330~exp=1648102930~hmac=4b2082ba63fee60a0f29215e03b268bd4cc1ad1b65043fd67b064a3c36ca7a14&w=1800' },
		{ image: 'https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg?t=st=1648102330~exp=1648102930~hmac=d8dc59cddb1ab798f9e60aaa2c7a8c2880c7ba9a463d1e6cba2d6e3455a2701f&w=1800' },
		{ image: 'https://img.freepik.com/free-vector/spring-landscape-scene_52683-56303.jpg?w=1800' }
	].sort(() => Math.random() - 0.5)
    return (
		<View style={styles.bannerContainer}>
			<HTBannerView
				style={styles.bannerContent}
				data={bannerList}
				keyExtractor={(item, index) => {
					let key = `-${bannerList[index].image}`
					return key
				}}
				didChange={(selectedIndex) => {
					this.pageControl.setState({
						selectedIndex: selectedIndex
					})
				}}
				renderItem={({ item, index }) => {
					return (
						<View style={styles.bannerItemContainer}>
							<CacheImage style={styles.bannerItemImage} source={{ uri: item.image }} />
						</View>
					)
				}}
			/>
			<HTPageControl
				ref={ref => this.pageControl = ref}
				data={bannerList}
			/>
		</View>
    )
  }

  renderHeader = () => {
    // v1版本适配
    return (
      <View style={styles.listHeaderView}>
        {this.renderCondition()}
        {this.renderAd()}
        {this.renderVideo()}
        {/* {this.renderVideo()} */}
      </View>
    )
  }

  renderList() {
    const { refreshState, listDataSource } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleRefresh()}
        refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={listDataSource}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item, index }: any) => this.renderItem(item, index)}
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

export default Jobs
