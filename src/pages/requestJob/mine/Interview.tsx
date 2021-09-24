import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/Interview.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import GradientButton from '../../components/GradientButton'
import ListEmptyComponent from '../../components/ListEmptyComponent'
import { format } from 'date-fns'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { BoxShadow } from 'react-native-shadow'
import SystemHelper from '../../../utils/system'

type IProps = GenProps<'Interview'> & {

}

interface IState {
  refreshState: RefreshState.HeaderRefreshing,
  dataSource: any
}

export default class Interview extends Component<IProps, IState> {
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
        title="面试日程"
        left={{
          style: { width: 17, height: 17, },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          style: { color: '#333333', fontSize: 15 },
          type: EButtonType.TEXT,
          value: "全部",
          act: () => {
            navigation.push('InterviewAll')
          }
        }}
      />
    )
  }

  handleRefresh() {

  }

  handleEndReached() {

  }

  renderDashLine() {
    const dashArray = ['', '', '', '', '', '', '', '', '', '', '', '', '',]
    return (
      <View style={styles.dashView}>
        {dashArray.map((item, index) => {
          return (
            <View
              key={index.toString()}
              style={styles.dashItem}
            />
          )
        })}
      </View>
    )
  }

  renderItem(item: any) {
    const { navigation } = this.props
    const { dataSource } = this.state
    const shadowOpt = {
      width: SystemHelper.width - 138,
      height: 93,
      color: "#aaa",
      border: 2,
      radius: 9,
      opacity: 0.4,
      x: 0,
      y: 5,
    }
    return (
      <NextTouchableOpacity
        style={styles.cellStyle}
        onPress={() => {
          navigation.push('InterviewDetail')
        }}
      >
        <View style={styles.timeView}>
          <Text style={styles.timeDate}>{format(new Date(item.time), 'MM月dd日')}</Text>
          <Text style={styles.timeHour}>{format(new Date(item.time), 'HH:mm')}</Text>
          <View style={styles.grayCircle} />
          <View style={styles.grayLine}>
            {item.id !== dataSource[dataSource.length - 1].id && this.renderDashLine()}
          </View>
        </View>
        <View style={styles.interviewInfoView}>
          <BoxShadow setting={shadowOpt}>
            <View style={styles.shadowView}>
              <View style={styles.companyInfo}>
                <Text style={styles.cellCompany}>{item.company}</Text>
                <Text style={styles.cellType}>{item.type}</Text>
              </View>
              <View style={styles.jobInfo}>
                <Text style={styles.cellJobInfo}>{`${item.job}  |  ${item.salary}`}</Text>
                <Text style={styles.cellStatus}>{item.status}</Text>
              </View>
              <View style={styles.interviewerInfo}>
                <Text style={styles.interviewer}>{item.interviewer}</Text>
                <NextTouchableOpacity>
                  <Image
                    style={styles.messageIcon}
                    source={require('../../../assets/requestJobs/message-blue.png')} />
                </NextTouchableOpacity>
              </View>
            </View>
          </BoxShadow>
        </View>
      </NextTouchableOpacity >
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