import React, { Component } from 'react'
import { Text, View, Image, ImageSourcePropType, DeviceEventEmitter } from 'react-native'
import styles from './styles'
import { GenProps } from '../../../../navigator/requestJob/stack'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { Carousel } from '@ant-design/react-native'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
import CourseCell from '../CourseCell'
import LinearGradient from 'react-native-linear-gradient'
import HTBannerView from '~/common/view/HTBannerView'
import HTPageControl from '~/common/view/HTPageControl'

type TProps = GenProps<'Learn'>

interface IState {
  refreshState: RefreshState,
  dataSource: [],
  selectCourseType: number, // 0: 课程列表 1: 我的课程
}

export default class FindCourse extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    this.state = {
      refreshState: RefreshState.HeaderRefreshing,
      selectCourseType: 0,
      dataSource: [{
        id: 1,
        name: '实战教学到思维质变《最强大脑》教练吴帝徳主讲',
        platform: '图图在线教育',
        price: '99.99',
        tag: '脑力训练营',
        watchedAmount: 556,
      }, {
        id: 2,
        name: '掌握读书的正确方法深度阅读带您体验阅读乐趣',
        platform: '乐此不疲课堂',
        price: '66.66',
        tag: '阅读技法',
        watchedAmount: 837,
      }, {
        id: 3,
        name: '春归万物苏，学习正当时初中春季系统班正式开课',
        platform: '萝卜刷题',
        price: '0',
        tag: '提高班',
        watchedAmount: 1000,
      }],
    }
  }


  componentDidMount() {
    this.handleRefresh()
  }

  handleRefresh() {
    this.setState({
      refreshState: RefreshState.HeaderRefreshing,
    }, () => {
      this.loadData()
    })
  }

  handleEndReached() {

  }

  loadData() {
    // Hud.show()
    setTimeout(() => {
      // Hud.hidden()
      this.setState({ refreshState: RefreshState.Idle })
    }, 1000);
  }

  renderItem(item: any, index: number) {
    return (
      <CourseCell
        cellItem={item}
        index={index}
        onPress={() => {
          Toast.show('click company')
        }}
      />
    )
  }

  renderHeaderView() {
    let bannerList = [
		{ image: 'https://img.freepik.com/free-vector/gradient-japanese-temple-with-sun_52683-44985.jpg?t=st=1648102330~exp=1648102930~hmac=a63b99b0930beb9813f38e062a6ad7e70a377ae547dda332c9ed771812206619&w=1800' },
		{ image: 'https://img.freepik.com/free-vector/hand-drawn-hug-day-background_52683-77750.jpg?w=1800&t=st=1648102109~exp=1648102709~hmac=851da9bdcc229ad1e5a5c216a31ac97d3ba38a9fdd92ba18356b86b0cfb77b09' },
		{ image: 'https://img.freepik.com/free-vector/gradient-japanese-temple-with-lake_52683-45004.jpg?t=st=1648102330~exp=1648102930~hmac=9e7b86d93d01fff984818d8e932ab843faca17d6d0158d504c9bb6a6ced38045&w=1800' },
		{ image: 'https://img.freepik.com/free-vector/japanese-temple-surrounded-by-nature_52683-46009.jpg?t=st=1648102330~exp=1648102930~hmac=4b2082ba63fee60a0f29215e03b268bd4cc1ad1b65043fd67b064a3c36ca7a14&w=1800' },
		{ image: 'https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg?t=st=1648102330~exp=1648102930~hmac=d8dc59cddb1ab798f9e60aaa2c7a8c2880c7ba9a463d1e6cba2d6e3455a2701f&w=1800' },
		{ image: 'https://img.freepik.com/free-vector/spring-landscape-scene_52683-56303.jpg?w=1800' }
	].sort(() => Math.random() - 0.5)
	return (
		<View>
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
			{
				this.renderCourseType()
			}
			{
				this.renderTabBar()
			}
		</View>
    )
  }

  renderCourseType() {
    const typeArray = [{
      name: '软件入门',
      image: require('../../../../assets/requestJobs/rjrm.png')
    }, {
      name: '职业路径',
      image: require('../../../../assets/requestJobs/zylj.png')
    }, {
      name: '趁早网课',
      image: require('../../../../assets/requestJobs/czwk.png')
    }, {
      name: '精选专辑',
      image: require('../../../../assets/requestJobs/jxzj.png')
    }]
    return (
      <View style={styles.courseType}>
        {typeArray.map((e, i) => {
          return (
            <NextTouchableOpacity
              key={e.name}
            >
              <Image
                source={e.image}
                style={styles.courseTypeImage}
              />
              <Text style={styles.courseTypeText}>{e.name}</Text>
            </NextTouchableOpacity>
          )
        })}
      </View>
    )
  }

  renderTabBar() {
    const { selectCourseType } = this.state
    const tabs = [{
      title: '课程列表',
    }, {
      title: '我的课程',
    }]
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View style={styles.tabsView}>
        <View style={styles.tabLeft}>
          {
            tabs.map((e, i) => {
              return (
                <NextTouchableOpacity
                  style={styles.tabsBtn}
                  key={i.toString()}
                  onPress={() => {
                    this.setState({ selectCourseType: i })
                  }}
                >
                  <>
                    <Text style={[styles.tabsTitle, selectCourseType === i && styles.selectedTitle]}>
                      {e.title}
                    </Text>
                    {selectCourseType === i && (
                      <LinearGradient
                        start={start}
                        end={end}
                        colors={['#54D693', '#5AE5A8']}
                        style={styles.tabsLine}
                      />
                    )}
                  </>
                </NextTouchableOpacity>
              )
            })
          }
        </View>
      </View>
    )
  }

  render() {
    const { refreshState, dataSource, } = this.state
    return (
      <View style={styles.container} >
        <RefreshListView
          style={styles.listView}
          ListHeaderComponent={this.renderHeaderView()}
          contentContainerStyle={styles.contentStyle}
          onHeaderRefresh={() => this.handleRefresh()}
          refreshState={refreshState}
          automaticallyAdjustContentInsets={false}
          data={dataSource}
          renderItem={({ item, index }: any) => this.renderItem(item, index)}
          onFooterRefresh={() => this.handleEndReached}
          keyExtractor={item => item.id.toString()}
          footerRefreshingText="加载更多"
          footerNoMoreDataText="没有更多了"
        />
      </View >
    )
  }
}