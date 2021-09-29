import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/BanCompany.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import GradientButton from '../../components/GradientButton'
import ListEmptyComponent from '../../components/ListEmptyComponent'
import { differenceInHours, format, formatDistance } from 'date-fns'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import SystemHelper from '../../../utils/system'
import { calculateTime } from '../../../utils/utils'
import LinearGradient from 'react-native-linear-gradient'

type IProps = GenProps<'BanCompany'> & {

}

interface IState {
  refreshState: RefreshState.HeaderRefreshing,
  dataSource: any
}

export default class BanCompany extends Component<IProps, IState> {
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
      name: '廖女士·人事经理',
      company: '智慧网络有限公司',
      activeTime: '2021-09-22T17:30:10.000Z',
    }, {
      id: 2,
      name: '廖先生·人事经理',
      company: '智慧网络有限公司',
      activeTime: '2021-09-24T17:30:10.000Z',
    }, {
      id: 3,
      name: '廖女士·人事经理',
      company: '智慧网络有限公司',
      activeTime: '2021-09-24T17:42:10.000Z',
    }, {
      id: 4,
      name: '廖女士·人事经理',
      company: '智慧网络有限公司',
      activeTime: '2021-09-24T18:42:10.000Z',
    }]
    setTimeout(() => {
      this.setState({
        // dataSource: localDataSource,
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
        title="屏蔽企业"
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
    const status = calculateTime(item.activeTime)
    return (
      <NextTouchableOpacity
        style={styles.cellStyle}
        onPress={() => {

        }}
      >
        <Image
          source={require('../../../assets/requestJobs/icon-example.png')}
          style={styles.cellIcon}
        />
        <View style={styles.cellInfo}>
          <View style={styles.statusView}>
            <Text style={styles.cellName}>{item.name}</Text>
            <View style={[styles.dotIcon, status === '刚刚活跃' && { backgroundColor: '#7DDBA3', }]} />
            <Text style={[styles.cellStatus, status === '刚刚活跃' && { color: '#7DDBA3', }]}>{status}</Text>
          </View>
          <Text style={styles.cellCompany}>{item.company}</Text>
        </View>
        <Image
          style={styles.nextIcon}
          source={require('../../../assets/requestJobs/next-gray.png')}
        />
      </NextTouchableOpacity >
    )
  }

  renderEmpty() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View style={styles.emptyView}>
        <Image
          source={require('../../../assets/requestJobs/no-ban-company.png')}
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyText}>暂无屏蔽企业</Text>
        <Text style={styles.emptyDetail}>可通过关键词和企业名称屏蔽企业，被屏蔽企业将无法在平台上查看你的简历</Text>
        <LinearGradient
          start={start}
          end={end}
          colors={['#57DE9E', '#81E3AE']}
          style={styles.linear}
        >
          <NextTouchableOpacity
            onPress={() => {
              const { navigation } = this.props
              navigation.push('BanCompanySearch')
            }}
          >
            <Text style={styles.text}>
              添加
            </Text>
          </NextTouchableOpacity>
        </LinearGradient>
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
            this.renderEmpty()
          )
        }
        onFooterRefresh={() => this.handleEndReached}
        keyExtractor={(item: any) => item.id.toString()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText={dataSource.length === 0 ? '' : '没有更多了'}
      />
    )
  }

  render() {
    const { dataSource } = this.state
    return (
      <View style={[styles.container, dataSource && dataSource.length === 0 && { backgroundColor: '#fff', }]}>
        {this.renderNavBar()}
        {this.renderList()}
      </View>
    )
  }
}