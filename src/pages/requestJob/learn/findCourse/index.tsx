import React, { Component } from 'react'
import { Text, View, Image, ImageSourcePropType, DeviceEventEmitter } from 'react-native'
import styles from './styles'
import { GenProps } from '../../../../navigator/requestJob/stack'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import RootLoading from '../../../../utils/rootLoading'
import Localization from '../../../../localization'
import { Carousel } from '@ant-design/react-native'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
import CourseCell from '../CourseCell'
import LinearGradient from 'react-native-linear-gradient'

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
    RootLoading.loading()
    setTimeout(() => {
      RootLoading.hide()
      this.setState({ refreshState: RefreshState.Idle })
    }, 1000);
  }

  renderItem(item: any, index: number) {
    console.log('111111111: ', item, index)
    return (
      <CourseCell
        cellItem={item}
        index={index}
        onPress={() => {
          RootLoading.info('click company')
        }}
      />
    )
  }

  renderHeaderView() {
    return (
      <View>
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
        {this.renderCourseType()}
        {this.renderTabBar()}
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