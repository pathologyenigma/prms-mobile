import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/MyFocus.style'
import { GenProps } from '../../../utils/StackProps'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import GradientButton from '../../components/GradientButton'
import ListEmptyComponent from '../../components/ListEmptyComponent'
import { differenceInHours, format, formatDistance } from 'date-fns'
import NextPressable from '../../components/NextPressable'
import SystemHelper from '../../../utils/system'
import { calculateTime } from '../../../utils/utils'

type IProps = GenProps<'MyFocus'> & {

}

interface IState {
  refreshState: RefreshState.HeaderRefreshing,
  dataSource: any
}

export default class MyFocus extends Component<IProps, IState> {
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
        title="我的关注"
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
      <NextPressable
        style={styles.cellStyle}
        onPress={() => {

        }}
      >
        <CacheImage
          source={global.AVATAR_IMAGE()}
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
      </NextPressable >
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
              emptyText="暂无关注其他成员"
              emptyImage={require('../../../assets/requestJobs/no-focus.png')}
            />
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