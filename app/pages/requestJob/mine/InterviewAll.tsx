import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/InterviewAll.style'
import { GenProps } from '../../../utils/StackProps'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import GradientButton from '../../components/GradientButton'
import ListEmptyComponent from '../../components/ListEmptyComponent'
import { format } from 'date-fns'
import NextPressable from '../../components/NextPressable'
import { reformSalary } from '../../../utils/utils'

type IProps = GenProps<'InterviewAll'> & {

}

interface IState {
  refreshState: RefreshState.HeaderRefreshing,
  dataSource: any
}

export default class InterviewAll extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      refreshState: RefreshState.HeaderRefreshing,
      dataSource: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const localDataSource = [{
      id: 1,
      time: '2021-09-20T17:30:10.000Z',
      company: '智慧网络有限公司',
      type: '线下面试',
      job: '视觉设计师',
      salary: '10K-15K',
      interviewer: '王先生·HR',
      status: '已面试',
    }, {
      id: 2,
      time: '2021-09-20T17:30:10.000Z',
      company: '智慧网络有限公司',
      type: '线下面试',
      job: '视觉设计师',
      salary: '10K-15K',
      interviewer: '王先生·HR',
      status: '已面试',
    }, {
      id: 3,
      time: '2021-09-20T17:30:10.000Z',
      company: '智慧网络有限公司',
      type: '线下面试',
      job: '视觉设计师',
      salary: '10K-15K',
      interviewer: '王先生·HR',
      status: '已面试',
    }, {
      id: 4,
      time: '2021-09-20T17:30:10.000Z',
      company: '智慧网络有限公司',
      type: '线下面试',
      job: '视觉设计师',
      salary: '10K-15K',
      interviewer: '王先生·HR',
      status: '已面试',
    }, {
      id: 5,
      time: '2021-09-20T17:30:10.000Z',
      company: '智慧网络有限公司',
      type: '线下面试',
      job: '视觉设计师',
      salary: '10K-15K',
      interviewer: '王先生·HR',
      status: '已面试',
    }, {
      id: 6,
      time: '2021-09-20T17:30:10.000Z',
      company: '智慧网络有限公司',
      type: '线下面试',
      job: '视觉设计师',
      salary: '10K-15K',
      interviewer: '王先生·HR',
      status: '已面试',
    }, {
      id: 7,
      time: '2021-09-20T17:30:10.000Z',
      company: '智慧网络有限公司',
      type: '线下面试',
      job: '视觉设计师',
      salary: '10K-15K',
      interviewer: '王先生·HR',
      status: '已面试',
    }, {
      id: 8,
      time: '2021-09-20T17:30:10.000Z',
      company: '智慧网络有限公司',
      type: '线下面试',
      job: '视觉设计师',
      salary: '10K-15K',
      interviewer: '王先生·HR',
      status: '已面试',
    }, {
      id: 9,
      time: '2021-09-20T17:30:10.000Z',
      company: '智慧网络有限公司',
      type: '线下面试',
      job: '视觉设计师',
      salary: '10K-15K',
      interviewer: '王先生·HR',
      status: '已面试',
    }, {
      id: 10,
      time: '2021-09-20T17:30:10.000Z',
      company: '智慧网络有限公司',
      type: '线下面试',
      job: '视觉设计师',
      salary: '10K-15K',
      interviewer: '王先生·HR',
      status: '已面试',
    }, {
      id: 11,
      time: '2021-09-20T17:30:10.000Z',
      company: '智慧网络有限公司',
      type: '线下面试',
      job: '视觉设计师',
      salary: '10K-15K',
      interviewer: '王先生·HR',
      status: '已面试',
    }]
    setTimeout(() => {
      this.setState({
        dataSource: localDataSource,
        refreshState: 3
      })
    }, 300);
  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title="全部面试"
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
    const { dataSource } = this.state
    return (
      <View style={styles.cellStyle}>
        <Text style={styles.timeDate}>{format(new Date(item.time), 'MM月dd日')}</Text>
        <View style={styles.interviewInfoView}>
          <CacheImage
            style={styles.companyIcon}
            source={global.AVATAR_IMAGE()}
          />
          <View style={styles.companyInfo}>
            <View style={styles.cellCompanyDetail}>
              <Text style={styles.cellCompany}>{item.company}</Text>
              <Text style={styles.cellStatus}>{item.status}</Text>
            </View>
            <View style={styles.cellCompanyDetail}>
              <Text style={styles.cellJobInfo}>{`${item.job}  |  ${reformSalary(item.salary)}`}</Text>
              <Text style={styles.timeHour}>{format(new Date(item.time), 'HH:mm')}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderList() {
    const { dataSource, refreshState } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleRefresh()}
        refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={dataSource}
        renderItem={({ item }: any) => this.renderItem(item)}
        ListEmptyComponent={
          refreshState !== RefreshState.HeaderRefreshing && (
            <ListEmptyComponent
              emptyText="今日暂无面试安排"
              emptyImage={require('../../../assets/requestJobs/no-interview.png')}
            />
          )
        }
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