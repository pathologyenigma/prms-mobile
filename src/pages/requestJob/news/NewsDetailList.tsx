import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RootLoading from '../../../utils/rootLoading'
import GradientButton from '../../components/GradientButton'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import styles from './styles/NewsDetailList.style'
import LinearGradient from 'react-native-linear-gradient'
import { gradienViewRightGreenColor, greenColor } from '../../../utils/constant'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { Carousel } from '@ant-design/react-native'
import NavBar, { EButtonType } from '../../components/NavBar'
import JobCell from '../../components/JobCell'
import { GenProps } from '../../../navigator/requestJob/stack'

type IProps = GenProps<'NewsDetailList'> & {

}

type IState = {
  videoSource: [],
  listDataSource: any,
  refreshState: RefreshState.HeaderRefreshing,
  selectCondition: number
  notificationType: string
  navBarTitle: string
}

export default class NewsDetailList extends Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    const { route: { params } } = props
    console.log('props: ', props, params)
    let navBarTitle = ''
    switch (params.notificationType) {
      case 'official':
        navBarTitle = '官方通知'
        break;
      case 'learn':
        navBarTitle = '学习通知'
        break;
      case 'consume':
        navBarTitle = '消费通知'
        break;
      case 'jobs':
        navBarTitle = '最新职位'
        break;
      default:
        break;
    }
    this.state = {
      videoSource: [],
      notificationType: params.notificationType,
      navBarTitle,
      listDataSource: [],
      refreshState: RefreshState.Idle,
      selectCondition: 1, // 1:推荐; 2: 最新; 3:附近
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    // 根据不同的通知获取不同的消息,此处模拟
    const { navBarTitle } = this.state
    let listDataSource: any = []
    if (navBarTitle === '官方通知') {
      listDataSource = [{
        id: 1,
        type: 'official',
        message: '【系统公告】因苹果系统旧版本下架 现全面使用1.0（151）版，桌面显示为绿色图标。苹果用户如遇开播异常 卸载旧版本 重装软件即可。苹果安装步骤：www.chen zao zhao.com   提示安装第一步TestFight  下载完毕之后直接返回苹果浏览器安装第二步。特别提醒：苹果手机6S及以下(低于IOS13.0系统无法安装 需升级手机系统。下载过程务必连接WIFI网络）。如遇下载难题请咨询客服微信：1297297。给您带来不便深感歉意，望互相转告！',
        time: '8-3 15:38'
      }, {
        id: 2,
        type: 'link',
        title: '最后一天！只需¥8.8立享简历优化模版',
        image: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
        time: '12:38'
      }]
    }
    if (navBarTitle === '学习通知') {
      listDataSource = [{
        id: 1,
        type: 'learn',
        title: '【预约课程开始通知】',
        description: 'Elaine同学，现在学习课程可领金币啦！你预约的课程马上就要开始了，记得准时参加哦。',
        courseName: '进大厂、拿高薪的作品集都长什么样？',
        courseTime: '2021年09月10日 14:30',
        courseteacher: 'BIGD第一美-zhan',
        courseContact: 'asp1236',
        time: '8-3 15:38'
      }]
    }
    if (navBarTitle === '消费通知') {
      listDataSource = [{
        id: 1,
        type: 'consume',
        shopIcon: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
        shopName: '讯科培训机构',
        money: '99.90',
        payType: '支付宝支付',
        time: '8-3 15:38'
      }]
    }
    this.setState({
      listDataSource,
    })
  }

  renderNavBar() {
    const { navBarTitle } = this.state
    const { navigation } = this.props
    return (
      <NavBar
        barStyle={{ elevation: 0, borderBottomWidth: 0, }}
        statusBarTheme="dark-content"
        title={navBarTitle}
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/black_back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  handleRefresh() {

  }

  handleEndReached() {

  }

  renderTime(time: string) {
    return (
      <Text style={styles.cellTime}>{time || ''}</Text>
    )
  }

  renderOfficialMessageItem(item: any) {
    const {
      id,
      type,
      message,
      time,
    } = item
    return (
      <View
        key={id.toString()}
        style={styles.officialMessageItem}
      >
        <Image
          source={require('../../../assets/requestJobs/notification-offical.png')}
          style={styles.officialMessageItemIcon}
        />
        <Text style={styles.officiaMessagelItemText}>
          {message}
        </Text>
      </View>
    )
  }

  renderOfficialLinkItem(item: any) {
    return (
      <View style={styles.officialLinkItem}>
        <Text style={styles.officialLinkItemTitle}>
          {item.title}
        </Text>
        <Image
          source={{ uri: item.image }}
          style={styles.officialLinkItemImage}
        />
        <Text style={styles.officialLinkItemMore}>
          点击查看全文
        </Text>
      </View>
    )
  }

  renderLearnItem(item: any) {
    return (
      <View style={styles.learnItem}>
        <Text style={styles.learnItemTitle}>
          {item.title}
        </Text>
        <Text style={styles.learnItemDescription}>
          {item.description}
        </Text>
        <Text style={styles.learnItemCourseName}>
          {`课程名称:   `}
          <Text style={styles.learnItemCourseNameValue}>
            {item.courseName}
          </Text>
        </Text>
        <Text style={styles.learnItemCourseName}>
          {`上课时间:   `}
          <Text style={styles.learnItemCourseNameValue}>
            {item.courseTime}
          </Text>
        </Text>
        <Text style={styles.learnItemCourseName}>
          {`授课老师:   `}
          <Text style={styles.learnItemCourseNameValue}>
            {item.courseteacher}
          </Text>
        </Text>
        <Text style={styles.learnItemCourseName}>
          {`联系方式:   `}
          <Text style={styles.learnItemCourseNameValue}>
            {item.courseContact}
          </Text>
        </Text>
        <Text style={styles.learnItemCourseMore}>点击查看课程</Text>
      </View>
    )
  }

  renderConsumeItem(item: any) {
    return (
      <View style={styles.consumeItem}>
        <View style={styles.consumeItemHeader}>
          <Image
            source={{ uri: item.shopIcon }}
            style={styles.consumeItemImage}
          />
          <Text style={styles.consumeItemTitle}>
            {item.shopName}
          </Text>
        </View>
        <Text style={styles.consumeItemAmoutTitle}>
          付款金额
        </Text>
        <Text style={styles.consumeCourseName}>
          <Text style={styles.consumeCourseNameValue}>
            {`¥ `}
          </Text>
          {item.money}
        </Text>
        <Text style={styles.learnItemCourseName}>
          {`支付方式:   `}
          <Text style={styles.learnItemCourseNameValue}>
            {item.payType}
          </Text>
        </Text>
        <Text style={styles.learnItemCourseMore}>查看账单详情</Text>
      </View>
    )
  }

  renderItem(item: any) {
    if (item.type === 'official') {
      return (
        <View>
          {this.renderTime(item.time)}
          {this.renderOfficialMessageItem(item)}
        </View>
      )
    }
    if (item.type === 'link') {
      return (
        <View>
          {this.renderTime(item.time)}
          {this.renderOfficialLinkItem(item)}
        </View>
      )
    }
    if (item.type === 'learn') {
      return (
        <View>
          {this.renderTime(item.time)}
          {this.renderLearnItem(item)}
        </View>
      )
    }
    if (item.type === 'consume') {
      return (
        <View>
          {this.renderTime(item.time)}
          {this.renderConsumeItem(item)}
        </View>
      )
    }
    const { navigation } = this.props
    return null
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

  renderList() {
    const { refreshState, listDataSource } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleRefresh()}
        refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={listDataSource}
        renderItem={({ item }: any) => this.renderItem(item)}
        onFooterRefresh={() => this.handleEndReached}
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
