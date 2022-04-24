import React, { Component } from 'react'
import { Text, View, Image, } from 'react-native'
import styles from './styles/BanCompany.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
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
      dataSource: undefined
    }
  }

  componentDidMount() {
    Hud.show()
    this.loadData()
  }

  loadData() {
    const localDataSource = [{
      id: 1,
      company: '深圳智慧网络有限公司',
    }]
    setTimeout(() => {
      Hud.hidden()
      this.setState({
        dataSource: localDataSource,
        refreshState: 3
      })
    }, 300);
  }

  renderNavBar() {
    const { navigation } = this.props
    const { dataSource } = this.state
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title={(dataSource && dataSource.length === 0) ? '屏蔽企业' : ''}
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

  renderHeader() {
    return (
      <View style={styles.headerView}>
        <Text style={styles.headerTitle}>
          屏蔽公司
        </Text>
        <Text style={styles.headerTips}>
          添加屏蔽公司后，你和这些公司的招聘者都不会被相互推荐，你的查看行为也不会告知对方
        </Text>
        <NextTouchableOpacity
          style={styles.headerSearchView}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('BanCompanySearch')
          }}
        >
          <Image
            style={styles.searchIcon}
            source={require('../../../assets/requestJobs/search-input.png')}
          />
          <Text style={styles.headerSearchText}>
            搜索关键词、企业名称
          </Text>
        </NextTouchableOpacity>
        <Text style={styles.headerBanTips}>
          已屏蔽1家公司
        </Text>
      </View>
    )
  }

  handleRefresh() {

  }

  handleEndReached() {

  }

  renderItem(item: any) {
    return (
      <View
        style={styles.cellStyle}
      >
        <Text style={styles.cellCompany}>{item.company}</Text>
        <NextTouchableOpacity
          style={styles.cancelBanBtn}
        >
          <Text style={styles.cancelBanText}>解除</Text>
        </NextTouchableOpacity>
      </View >
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
            style={styles.addBtn}
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
        footerRefreshingText=""
        footerNoMoreDataText=""
      />
    )
  }

  render() {
    const { dataSource } = this.state
    if (!dataSource) {
      return <View style={{ backgroundColor: '#fff', }} />
    }
    return (
      <View style={[styles.container, dataSource && dataSource.length === 0 && { backgroundColor: '#fff', }]}>
        {this.renderNavBar()}
        {dataSource.length > 0 && (
          this.renderHeader()
        )}
        {this.renderList()}
      </View>
    )
  }
}