import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  DeviceEventEmitter,
  FlatList,
  Pressable
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import GradientButton from '../../components/GradientButton'
import NextPressable from '../../components/NextPressable'
import styles from './styles/Jobs.style'
import LinearGradient from 'react-native-linear-gradient'
import {
  gradienViewRightGreenColor,
  greenColor,
} from '../../../utils/constant'
import { Carousel } from '@ant-design/react-native'
import NavBar, { EButtonType } from '../../components/NavBar'
import JobCell from '../../components/JobCell'
import { GenProps } from '../../../utils/StackProps'
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
import { HTPageHeaderView } from 'react-native-selected-page'
import HTRefreshManager from '~/common/refresh/HTRefreshManager'
import geolocation from '~/common/location/geolocation'
import HTPermissionManager from '~/common/permission/HTPermissionManager'

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
    this.refreshManager = new HTRefreshManager()
    this.state = {
      videoSource: [],
      listDataSource: [],
      selectCondition: 2, // 1:推荐; 2: 最新; 3:附近
      selectJobsArray: [],
      selectJobIndex: 0,
      filterConfig: {},
      address: null,
    }
  }

  componentDidAppear({ isSecondAppear }) {
    StatusBar.setBarStyle('light-content', true)
    if (isSecondAppear) {
  	  this.loadJobExpections()
  	}
  }

  componentDidMount() {
    this.getNotificationPermission()
    // Hud.show()
    // 注意:当前服务端不支持 subscription 和 其他接口同时调用,暂时修改为延迟获取
    
    StatusBar.setBarStyle('light-content', true)
    this.loadJobExpections()
    this._requestLocation(response => {
    	this.setState({ address: response })
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

  loadJobExpections() {
    // 加载个人职位类型
    HTAPI.CandidateGetAllJobExpectations(null, { showLoading: true }).then((response = []) => {
    	const reloadResponse = [{ job_category: ['全部', '全部', '全部'] }, ...response]
    	this.setState({
          selectJobsArray: reloadResponse,
          selectJobIndex: reloadResponse?.length <= this.state.selectJobIndex ? 0 : this.state.selectJobIndex,
        }, () => {
          this._onRefresh(true, true)
        })
    })
  }

  _onRefresh = (isHeaderRefresh = true, showLoading = false) => {
    if (this.refreshManager.cantHandlerRefresh(isHeaderRefresh)) {
    	return
    }
    const { selectJobsArray, selectJobIndex } = this.state
    if ((selectJobsArray?.length ?? 0) <= 0) {
      // 没有筛选条件，直接展示空列表
      this.setState({
        listDataSource: [],
      })
      return
    }
    const jobCategory = selectJobsArray[selectJobIndex].job_category
    HTAPI.CandidateGetJobList({ filter: {
      'category': jobCategory?.[0] == '全部' ? undefined : jobCategory,
      ...this.state.filterConfig,
      page: this.refreshManager.reloadPageIndex(isHeaderRefresh),
      pageSize: this.refreshManager.pageCount,
    }}, { showLoading }).then(response => {
    	this.state.listDataSource = this.refreshManager.reloadItemList(response.data, this.state.listDataSource, isHeaderRefresh)
    }).finally(() => this.setState(this.state))
  }

  _requestLocation = (complete) => {
  	HTPermissionManager.request([
  		HTPermissionManager.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
			HTPermissionManager.PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
			HTPermissionManager.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  	], (response) => {
  		Hud.show()
  		geolocation.getLocation().then(response => {
  			complete(response)
    	}).catch(e => {
    		Toast.show('定位失败: ' + e)
    	}).finally(() => {
    		Hud.hidden()
    	})
  	})
  }

  _nearDidTouch = () => {
  	this._requestLocation(response => {
  		let latitude = response?.latitude
			let longitude = response.longitude
			if (latitude && longitude) {
				this.state.filterConfig.sortWithDistance = [longitude, latitude]
				this.setState({ selectCondition: 3 }, () => {
    			this._onRefresh(true, true)
    		})
			}
  	})
  }

  _addressDidTouch = () => {
  	const { navigation } = this.props
    navigation.push('JobSelectCity', {
      mode: 1,
      province: this?.state?.address?.province,
      city: this?.state?.address?.city,
      selectJobCityCallback: (e: any) => {
        console.log('eeeee: ', e[1].name)
        this.setState({ address: { city: e[1].name } })
        // this.setState({ selectJobCity: e })
      }
    })
  }

  renderNavBar() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    const { navigation } = this.props
    const { selectJobsArray, selectJobIndex } = this.state
    let padding = 10
	if ((selectJobsArray?.length ?? 0) > 0) {
		let item = selectJobsArray[0]
		let title = item.job_category[item.job_category.length - 1]
		padding += title.length * 3
	}
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
          <HTPageHeaderView
			style={{ flex: 1, height: 44 }}
			data={selectJobsArray}
			titleFromItem={item => item.job_category[item.job_category.length - 1]}
			initScrollIndex={selectJobIndex}
			itemContainerStyle={{ paddingHorizontal: padding }}
			itemTitleStyle={{ fontSize: 16, fontWeight: '500' }}
			itemTitleNormalStyle={{ color: 'rgba(255, 255, 255, 0.75)' }}
			itemTitleSelectedStyle= {{ color: 'white', fontSize: 19 }}
			onSelectedPageIndex={(pageIndex) => {
				if (pageIndex == this.state.selectJobIndex) {
					return
				}
				this.state.selectJobIndex = pageIndex
				this._onRefresh(true, true)
			}}
			cursorStyle={{ width: null, transform: [{ scaleX: 0.4 }], height: 2, backgroundColor: 'translucent' }}
		  />
          <NextPressable
            style={{ marginLeft: 40, marginRight: 10 }}
            onPress={() => {
              navigation.push('JobExpectations')
            }}>
            <Image
              style={styles.naviBarIcon}
              source={require('../../../assets/requestJobs/add.png')}
            />
          </NextPressable>
          <NextPressable
            onPress={() => {
              navigation.push('JobSearch')
            }}>
            <Image
              style={styles.naviBarIcon}
              source={require('../../../assets/requestJobs/search.png')}
            />
          </NextPressable>
        </View>
      </LinearGradient>
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
        <Pressable style={styles.videoHeaderView} onPress={global.TODO_TOAST}>
          <Text style={styles.videoTitle}>视频招聘</Text>
          <Text style={styles.videoDetail}>查看更多</Text>
          <Image
            style={styles.videoRightImg}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </Pressable>
        <View style={styles.videoTopView}>
          {
          	itemList.map((item, index) => {
          		return (
          			<NextPressable key={index} style={styles.videoBtn} onPress={global.TODO_TOAST}>
          				<CacheImage style={[StyleSheet.absoluteFill]} source={{ uri: imageList[index] }} />
						{this.renderVideoTag()}
						<LinearGradient 
							style={styles.videoTextContainer} 
							colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
						>
							<Text style={styles.videoText}>在招职场系列直播</Text>
						</LinearGradient>
					</NextPressable>
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
          {/* <NextPressable
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
          </NextPressable> */}
          <NextPressable
            style={styles.conditionLeftBtn}
            onPress={() => {
              this.state.filterConfig.sortWithDistance = null
              this.setState({ selectCondition: 2 }, () => {
              	this._onRefresh(true, true)
              })
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
          </NextPressable>
          <NextPressable
            style={styles.conditionLeftBtn}
            onPress={() => {
            	this._nearDidTouch()
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
          </NextPressable>
        </View>
        <View style={styles.conditionRightView}>
          <NextPressable style={styles.conditionRightBtn} onPress={() => {
          	this._addressDidTouch()
          }}>
            <Text style={styles.conditionRightText}>{this?.state?.address?.city ?? '地点'}</Text>
            <Image
              style={styles.rightBottomImg}
              source={require('../../../assets/requestJobs/right-bootom-triangle.png')}
            />
          </NextPressable>
          <NextPressable
            style={[styles.conditionRightBtn, { marginLeft: 9 }]}
            onPress={() => {
              const { navigation } = this.props
              navigation.push('FilterView', {
                filterMode: 0,
                filterResultCallback: result => {
                  this.setState({ filterConfig: { ...this.state.filterConfig, ...result } }, () => this._onRefresh(true, true))
                },
              })
            }}>
            <Text style={styles.conditionRightText}>筛选</Text>
            <Image
              style={styles.rightBottomImg}
              source={require('../../../assets/requestJobs/right-bootom-triangle.png')}
            />
          </NextPressable>
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
						<Pressable style={styles.bannerItemContainer} onPress={global.TODO_TOAST}>
							<CacheImage style={styles.bannerItemImage} source={{ uri: item.image }} />
						</Pressable>
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
      </View>
    )
  }

  renderList() {
    const { refreshState, listDataSource } = this.state
    return (
      <FlatList
        style={styles.listView}
        onRefresh={() => this._onRefresh(true)}
        onEndReached={() => this._onRefresh(false)}
        automaticallyAdjustContentInsets={false}
        data={listDataSource}
        refreshManager={this.refreshManager}
        {...BIND_EMPTY_VIEW()}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item, index }: any) => this.renderItem(item, index)}
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
