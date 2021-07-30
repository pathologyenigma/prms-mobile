import React, { Component } from 'react'
import { Text, View, Image, ImageSourcePropType, DeviceEventEmitter } from 'react-native'
import styles from './styles'
import { GenProps } from '../../../../navigator/requestJob/stack'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import RootLoading from '../../../../utils/rootLoading'
import Localization from '../../../../localization'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
import CompanyCell from '../CompanyCell'
import JobfairCell from '../JobfairCell'

type TProps = GenProps<'Find'>

interface IState {
  refreshState: RefreshState,
  dataSource: [],
  selectType: number, // 0: 全部, 1: 已预约 2: 已结束
}

export default class Jobfair extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    this.state = {
      refreshState: RefreshState.HeaderRefreshing,
      selectType: 0,
      dataSource: [{
        id: 1,
        name: '小鹅通专场招聘会',
        organizers: '深圳小鹅通技术有限公司',
        contractor: '深圳南荔工坊创意文化有限公司',
        time: '2021-6-18',
        location: '深圳市南山区科技园中区麻雀岭工工业区M-10栋1号厂房东北角101F',
        type: '1', // 1 线下招聘 ; 2 线上招聘
        process: '正在招聘',
      }, {
        id: 2,
        name: '小鹅通直播专场招聘会',
        tag: '趁早找认证导师',
        summary: '丸子首席面试官现场答疑',
        type: '2', // 1 线下招聘 ; 2 线上招聘
        isOnline: '2',// 1 正在直播 / 2 未在直播
        process: '已预约',
        liveTime: '距离直播开始还有1小时30分',
      }, {
        id: 3,
        name: '小鹅通直播专场招聘会',
        tag: '趁早找认证导师',
        summary: '蔓姐  正在现场答疑',
        type: '2', // 1 线下招聘 ; 2 线上招聘
        isOnline: '1',// 1 正在直播 / 2 未在直播
        onlineAmount: 280,
        process: '正在招聘',
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

  renderItem(item: any) {
    return (
      <JobfairCell
        cellItem={item}
        onPress={() => {
          RootLoading.info('click company')
        }}
      />
    )
  }

  renderHeaderView() {
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
          <Text style={[styles.selectTypeText, selectType === 0 && { fontWeight: 'bold' }]}>全部</Text>
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
          <Text style={[styles.selectTypeText, selectType === 1 && { fontWeight: 'bold' }]}>已预约</Text>
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
          <Text style={[styles.selectTypeText, selectType === 2 && { fontWeight: 'bold' }]}>已结束</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  render() {
    const { refreshState, dataSource, } = this.state
    return (
      <View style={styles.container} >
        {this.renderHeaderView()}
        <RefreshListView
          style={styles.listView}
          // ListHeaderComponent={this.renderHeaderView()}
          contentContainerStyle={styles.contentStyle}
          onHeaderRefresh={() => this.handleRefresh()}
          refreshState={refreshState}
          automaticallyAdjustContentInsets={false}
          data={dataSource}
          renderItem={({ item }: any) => this.renderItem(item)}
          onFooterRefresh={() => this.handleEndReached}
          keyExtractor={item => item.id.toString()}
          footerRefreshingText="加载更多"
          footerNoMoreDataText="没有更多了"
        />
      </View >
    )
  }
}