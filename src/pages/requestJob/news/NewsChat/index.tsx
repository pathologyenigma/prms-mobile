import React, { Component } from 'react'
import { Text, View, Image, ImageSourcePropType, DeviceEventEmitter } from 'react-native'
import styles from './styles'
import { GenProps } from '../../../../navigator/requestJob/stack'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import RootLoading from '../../../../utils/rootLoading'
import Localization from '../../../../localization'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
import MessageCell from '../MessageCell'
import LinearGradient from 'react-native-linear-gradient'
import SearchTextinput from '../../../components/SearchTextinput'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import JobCell from '../../../components/JobCell'
import { Tabs } from '@ant-design/react-native'
import ListEmptyComponent from '../../../components/ListEmptyComponent'

type TProps = GenProps<'News'>

interface IState {
  refreshState: RefreshState,
  newsRefresh: boolean,
  refreshing: boolean,
  dataSource: [],
  searchStr: string
  selectType: number, // 0: 全部, 1: 招呼 2: 沟通中
  seeMeRefreshState: RefreshState,
  seeMeDataSource: any,
  notificationRefreshState: RefreshState,
  notificationDataSource: any,
}

export default class NewsChat extends Component<TProps, IState> {
  private openKey: any = undefined
  constructor(props: TProps) {
    super(props)
    this.state = {
      refreshState: RefreshState.HeaderRefreshing,
      seeMeRefreshState: RefreshState.HeaderRefreshing,
      notificationRefreshState: RefreshState.HeaderRefreshing,
      refreshing: true,
      newsRefresh: true,
      selectType: 0,
      searchStr: '',
      dataSource: [{
        id: 1,
        name: '李女士',
        company: '深圳市猎优管理咨询有限公司',
        time: '19:20',
        message: '您好，我们公司正在招聘这个职位，有兴趣来么？',
      }],
      seeMeDataSource: [{
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
      notificationDataSource: [
        {
          id: 1,
          type: 'official',
          name: '官方通知',
          company: '官方',
          time: '00:00',
          message: '任何转账、汇款、入股等，均涉嫌诈骗，请谨慎！',
          image: require('../../../../assets/requestJobs/notification-offical.png')
        },
        {
          id: 2,
          type: 'learn',
          name: '学习通知',
          time: '00:00',
          message: '您报名的《50天产品速成培训班》马上就要开…',
          image: require('../../../../assets/requestJobs/notification-xuexi.png')
        }, {
          id: 3,
          type: 'consume',
          name: '消费通知',
          time: '00:00',
          message: '您于2021年4月21号用账户余额5元充值5个金币',
          image: require('../../../../assets/requestJobs/notification-xiaofei.png')
        },
        {
          id: 4,
          type: 'jobs',
          name: '最新职位',
          time: '00:00',
          message: '47位Boss发布最新职位',
          image: require('../../../../assets/requestJobs/notification-zhiwei.png')
        }
      ]
    }
  }


  componentDidMount() {
    this.handleRefresh()
  }

  handleRefresh() {
    this.setState({
      refreshState: RefreshState.HeaderRefreshing,
      notificationRefreshState: RefreshState.HeaderRefreshing,
      refreshing: true,
      newsRefresh: false
    }, () => {
      this.loadData()
    })
  }

  handleEndReached() {

  }

  loadData() {
    // RootLoading.loading()
    setTimeout(() => {
      // RootLoading.hide()
      this.setState({
        refreshState: RefreshState.Idle,
        notificationRefreshState: RefreshState.Idle,
        refreshing: false,
      })
    }, 1000);
  }

  renderHiddenItem(item, rowMap) {
    return (
      <View style={{
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#f5f5f6',
      }}>
        <NextTouchableOpacity
          style={{
            zIndex: 200,
            height: 73,
            top: 0,
            bottom: 0,
            width: 75,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            backgroundColor: '#F93C33',
          }}
          onPress={() => {
            if (this.openKey) {
              rowMap[this.openKey].closeRow()
            }

          }}
        >
          <Text>置顶</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={{
            zIndex: 200,
            height: 73,
            top: 0,
            bottom: 0,
            width: 75,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            backgroundColor: '#F93C33',
          }}
          onPress={() => {
            if (this.openKey) {
              rowMap[this.openKey].closeRow()
            }

          }}
        >
          <Text>删除</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderSeeMeItem(item: any) {
    const { navigation } = this.props
    return (
      <JobCell
        cellStyle={{
          marginTop: 0,
          borderRadius: 0,
          marginBottom: 5
        }}
        key={item.id.toString()}
        cellItem={item}
        onPress={() => {
          navigation.push('JobDetail')
        }}
      />
    )
  }

  handleSeeMeListRefresh() {
    // 接入接口时此处需要做分页处理
    this.setState({
      seeMeRefreshState: RefreshState.HeaderRefreshing,
    }, () => {
      this.loadData()
    })
  }

  handleSeeMeEndReached() {
    // 接入接口时此处需要做分页处理
    this.setState({
      seeMeRefreshState: RefreshState.HeaderRefreshing,
    }, () => {
      this.loadData()
    })
  }

  renderSeeMeList() {
    const {
      seeMeRefreshState,
      seeMeDataSource,
    } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleSeeMeListRefresh()}
        refreshState={seeMeRefreshState}
        automaticallyAdjustContentInsets={false}
        data={seeMeDataSource}
        renderItem={({ item }: any) => this.renderSeeMeItem(item)}
        onFooterRefresh={() => this.handleSeeMeEndReached}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          seeMeRefreshState !== RefreshState.HeaderRefreshing ? (
            <ListEmptyComponent
              emptyText="暂无相关信息"
              emptyImage={require('../../../../assets/requestJobs/find-search-empty.png')}
            />
          ) : null
        }
        // ItemSeparatorComponent={() => this.renderItemSeparatorComponent()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
      />
    )
  }

  handlenotificationListRefresh() {
    this.setState({
      notificationRefreshState: RefreshState.HeaderRefreshing
    }, () => {
      this.loadData()
    })
  }

  rendernotificationItem(item: any) {
    return (
      <MessageCell
        key={item.id.toString()}
        cellItem={item}
        onPress={() => {
          const { navigation } = this.props
          if (item.type !== 'jobs') {
            navigation.push('NewsDetailList', {
              notificationType: item.type
            })
          } else {
            navigation.push('NotificationNewJob')
          }
        }}
      />
    )
  }

  renderNotificationList() {
    const {
      notificationRefreshState,
      notificationDataSource,
    } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handlenotificationListRefresh()}
        refreshState={notificationRefreshState}
        automaticallyAdjustContentInsets={false}
        data={notificationDataSource}
        renderItem={({ item }: any) => this.rendernotificationItem(item)}
        onFooterRefresh={() => this.handleSeeMeEndReached}
        keyExtractor={item => item.id.toString()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
      />
    )
  }

  renderItem(item: any, rowMap: any, dataSource: any) {
    return (
      <SwipeRow
        key={item.item.id.toString()}
        rightOpenValue={-150}
        recalculateHiddenLayout
        closeOnRowPress
        disableRightSwipe
      >
        <View style={{
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          backgroundColor: '#f5f5f6',
        }}>
          <NextTouchableOpacity
            style={styles.setTop}
            onPress={() => {
              if (this.openKey) {
                rowMap[this.openKey].closeRow()
              }
              RootLoading.info('消息置顶')
            }}
          >
            <Text style={styles.hideBtnText}>置顶</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={[styles.setTop, {
              backgroundColor: '#FF7777',
            }]}
            onPress={() => {
              if (this.openKey) {
                rowMap[this.openKey].closeRow()
              }
              RootLoading.info('消息删除')
            }}
          >
            <Text style={styles.hideBtnText}>删除</Text>
          </NextTouchableOpacity>
        </View>
        <MessageCell
          cellItem={item.item}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('MessagePage')
          }}
        />
      </SwipeRow >
    )
  }

  renderHeaderView(tabProps: any) {
    const { selectType } = this.state
    return (
      <View style={styles.tabs}>
        <NextTouchableOpacity
          style={styles.selectTypeBtn}
          onPress={() => {
            if (selectType !== 0) {
              this.setState({ selectType: 0 }, () => {
                // 刷新数据
                this.handleRefresh()
              })
            }
          }}
        >
          <Text style={[styles.selectTypeText, tabProps.activeTab === 0 && { fontWeight: 'bold' }]}>消息</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.selectTypeBtn}
          onPress={() => {
            if (selectType !== 1) {
              this.setState({ selectType: 1 }, () => {
                // 刷新数据
                this.handleRefresh()
              })
            }
          }}
        >
          <Text style={[styles.selectTypeText, tabProps.activeTab === 1 && { fontWeight: 'bold' }]}>通知</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.selectTypeBtn}
          onPress={() => {
            if (selectType !== 2) {
              this.setState({ selectType: 2 }, () => {
                // 刷新数据
                this.handleRefresh()
              })
            }
          }}
        >
          <Text style={[styles.selectTypeText, tabProps.activeTab === 2 && { fontWeight: 'bold' }]}>谁看了我</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.allReadBtn}
          onPress={() => {

          }}
        >
          <Image
            style={styles.allReadIcon}
            source={require('../../../../assets/requestJobs/all-read.png')}
          />
          <Text style={styles.allReadText}>全部已读</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderMessageTips() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View style={styles.tongzhiTips}>
        <View style={styles.leftView}>
          <Image
            style={styles.closeImg}
            source={require('../../../../assets/requestJobs/guanbi.png')}
          />
          <Text style={styles.openNoficationTips}>
            害怕错过重要联系人的消息？开启通知
          </Text>
        </View>
        <LinearGradient
          start={start}
          end={end}
          colors={['#FF8A05', '#FFB55F']}
          style={styles.linear}
        >
          <Text style={styles.openText}>
            开启
          </Text>
        </LinearGradient>
      </View>
    )
  }

  renderSearch() {
    const { selectType } = this.state
    if (selectType === 0) {
      return (
        <NextTouchableOpacity
          onPress={() => {
            const { navigation } = this.props
            navigation.push('NewsSearch')
          }}
        >
          <SearchTextinput
            cellStyle={{ marginTop: 8 }}
            inputProps={{
              editable: false,
              placeholder: '通过姓名或公司搜索联系人',
            }}
            onChangeText={(value: string) => {
              this.setState({ searchStr: value })
            }}
          />
        </NextTouchableOpacity>
      )
    }
    return null
  }

  renderEmptyListImage() {
    return (
      <Text>
        没有更多了
      </Text>
    )
  }

  renderNewsList() {
    const { newsRefresh, dataSource } = this.state
    return (
      <SwipeListView
        contentContainerStyle={styles.contentStyle}
        useFlatList
        keyExtractor={item => item.id.toString()}
        refreshing={newsRefresh}
        onRefresh={() => this.handleRefresh()}
        initialNumToRender={10}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        style={styles.listView}
        onRowClose={() => { this.openKey = undefined }}
        onRowOpen={(e) => { this.openKey = e }}
        automaticallyAdjustContentInsets={false}
        data={dataSource}
        // renderHiddenItem={(item, rowMap) => {
        //   this.renderHiddenItem(item, rowMap)
        // }}
        // listViewRef={(e) => { this.flatList = e }}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator
        previewOpenValue={0.3}
        ListEmptyComponent={() => this.renderEmptyListImage()}
        renderItem={(item, rowMap) => this.renderItem(item, rowMap, dataSource)}
      // ItemSeparatorComponent={() => this.renderSeparatorLine()}
      />
    )
  }

  render() {
    const { refreshState, dataSource, refreshing, selectType } = this.state
    return (
      <View style={styles.container} >
        {this.renderMessageTips()}
        {this.renderSearch()}
        <View style={{ flex: 1 }} >
          <Tabs
            styles={{
              topTabBarSplitLine: {
                borderBottomWidth: 0,
              },
            }}
            tabs={[{ title: '消息' }, { title: '通知' }, { title: '谁看了我' }]}
            page={selectType}
            swipeable={false}
            usePaged={false}
            renderTabBar={(tabProps) => this.renderHeaderView(tabProps)}
            onChange={(tab, index) => {
              this.setState({ selectType: index })
            }}
          >
            {this.renderNewsList()}
            {this.renderNotificationList()}
            {this.renderSeeMeList()}
          </Tabs>
        </View>
      </View >
    )
  }
}