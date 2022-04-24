import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/Delivery.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import GradientButton from '../../components/GradientButton'
import ListEmptyComponent from '../../components/ListEmptyComponent'
import { format } from 'date-fns'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import JobCell from '../../components/JobCell'

type IProps = GenProps<'Delivery'> & {

}

interface IState {
  refreshState: RefreshState.HeaderRefreshing,
  dataSource: any,
  pageType: number
}

export default class Delivery extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params } } = props
    this.state = {
      pageType: params.pageType || 1,
      refreshState: RefreshState.HeaderRefreshing,
      dataSource: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const listDataSource = [{
      id: 1,
      name: '项目经理',
      company: '深圳市酷魅科技有限公司',
      financing: '融资未公开',
      staffAmount: '1-49人',
      experience: '3-4年',
      education: '大专及以上',
      location: '深圳·宝安区',
      salary: '15K-30K',
      interviewer: '李女士·产品线HRBP',
      isUrgent: true,
      isPartimeJob: true
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
      interviewer: '陈先生·技术总监',
      isHotjob: true,
      isPartimeJob: false
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
      interviewer: '陈先生·技术总监',
      isStop: true
    }, {
      id: 4,
      name: '项目经理',
      company: '深圳市酷魅科技有限公司',
      financing: '融资未公开',
      staffAmount: '1-49人',
      experience: '3-4年',
      education: '大专及以上',
      location: '深圳·宝安区',
      salary: '15K-30K',
      interviewer: '陈先生·技术总监'
    }]
    setTimeout(() => {
      this.setState({
        dataSource: listDataSource,
        refreshState: 3
      })
    }, 300);
  }

  renderNavBar() {
    const { navigation } = this.props
    const { pageType } = this.state
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title={pageType === 1 ? '投递记录' : '浏览足迹'}
        left={{
          style: { width: 17, height: 17, },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
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

  renderItem(item: any) {
    const { navigation } = this.props
    return (
      <JobCell
        cellItem={item}
        cellStyle={styles.cellStyle}
        onPress={() => {
          navigation.push('JobDetail')
        }}
      />
    )
  }

  renderList() {
    const { refreshState, dataSource } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleRefresh()}
        refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={dataSource}
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
        {this.renderNavBar()}
        {this.renderList()}
      </View>
    )
  }
}