import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, StatusBar, SectionList, RefreshControl } from 'react-native'
import styles from './styles/IncomeDetail.style'
import { GenProps } from '../../../utils/StackProps'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextPressable from '../../components/NextPressable'
import { Tabs } from '@ant-design/react-native'
import NavBar, { EButtonType } from '../../components/NavBar'
import SearchTextinput from '../../components/SearchTextinput'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'
import JobCell from '../../components/JobCell'
import SystemHelper from '../../../utils/system'
import CompanyJobCell from '../publicView/CompanyJobCell'
import CompanyCell from '../find/CompanyCell'
import LinearGradient from 'react-native-linear-gradient'
import ListEmptyComponent from '../../components/ListEmptyComponent'
import DatePickerModal from '../../components/DatePickerModal'

type IProps = GenProps<'IncomeDetail'> & {

}

interface IState {
  incomeDataSource: any,
  companyDataSource: any,
  searchValue: string,
  selectTabs: number
  incomeRefreshState: boolean,
  companyRefreshState: any,
  datePickVisible: boolean,
  localDateOfBirth: string,
}

export default class IncomeDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      incomeRefreshState: true,
      companyRefreshState: RefreshState.HeaderRefreshing,
      searchValue: '',
      incomeDataSource: [],
      companyDataSource: [],
      selectTabs: 0,
      datePickVisible: false,
      localDateOfBirth: '',
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadJobListData() {

  }

  loadData() {
    setTimeout(() => {
      this.setState({
        incomeRefreshState: false,
        companyRefreshState: RefreshState.Idle,
        incomeDataSource: [{
          id: 1,
          month: '2019年05月',
          data: [{
            id: 1,
            date: '05-24 21:10',
            name: '课程分销',
            money: 5.90,
          },
          {
            id: 2,
            date: '05-23 20:10',
            name: '顾问订单',
            money: 100.90,
          },
          {
            id: 3,
            date: '05-20 11:10',
            name: '课程分销',
            money: 5.90,
          },]
        }, {
          id: 2,
          month: '2019年04月',
          data: [{
            id: 1,
            date: '04-24 21:10',
            name: '课程分销',
            money: 5.90,
          }]
        }, {
          id: 3,
          month: '2019年01月',
          data: [{
            id: 1,
            date: '01-14 21:10',
            name: '邀请好友',
            money: 5.90,
          }]
        }],
        companyDataSource:
        {
          all: 80.00,
          data: [{
            id: 1,
            date: '2021-6-20  20:35',
            status: '提现中',
            money: '20.00'
          }, {
            id: 2,
            date: '2021-6-18  11:35',
            status: '已提现',
            money: '30.00'
          }, {
            id: 3,
            date: '2021-6-15  22:35',
            status: '已提现',
            money: '5.00'
          }]
        }
      })
    }, 1000);
  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <View style={styles.bar}>
        <NextPressable
          style={styles.left}
          activeOpacity={0.9}
          onPress={() => {

          }}
        >
          <Image
            style={styles.backIcon}
            resizeMode="contain"
            source={require('../../../assets/requestJobs/navbar-back.png')}
          />
        </NextPressable>
      </View>
    )
  }

  renderSectionHeader(section: any) {
    const {
      id,
      title,
      company,
      welfare,
      industry,
      years,
      tag,
      score,
      onlineJobs,
      location,
      financing,
      staffAmount,
      feature,
      isOfficial,
      isBestEmployer,
    } = section
    const item = {
      id,
      title,
      company,
      welfare,
      industry,
      years,
      tag,
      score,
      onlineJobs,
      location,
      financing,
      staffAmount,
      feature,
      isOfficial,
      isBestEmployer,
    }
    return (
      <CompanyCell
        cellStyle={{
          marginTop: 0,
          borderRadius: 0,
          borderBottomWidth: 5,
          borderBottomColor: '#F7F7F7',
        }}
        cellItem={item}
      />
    )
  }

  renderTabBar(tabProps: any) {
    const tabs = [{
      title: '收益明细',
    }, {
      title: '提现记录',
    }]
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    const { navigation } = this.props
    return (
      <View style={styles.bar}>
        <NextPressable
          style={styles.left}
          activeOpacity={0.9}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image
            style={styles.backIcon}
            resizeMode="contain"
            source={require('../../../assets/requestJobs/navbar-back.png')}
          />
        </NextPressable>
        <View style={styles.tabLeft}>
          {
            tabs.map((e, i) => {
              return (
                <NextPressable
                  style={styles.tabsBtn}
                  key={i.toString()}
                  onPress={() => {
                    this.setState({ selectTabs: i })
                  }}
                >
                  <>
                    <Text style={[styles.tabsTitle, tabProps.activeTab === i && styles.selectedTitle]}>
                      {e.title}
                    </Text>
                    {tabProps.activeTab === i && (
                      <LinearGradient
                        start={start}
                        end={end}
                        colors={['#79D398', '#82E2AC']}
                        style={styles.linearView}
                      />
                    )}
                  </>
                </NextPressable>
              )
            })
          }
        </View>
        <NextPressable
          style={styles.riliBtn}
          onPress={() => {
            this.setState({ datePickVisible: true })
          }}
        >
          <Image
            style={styles.riliBtnIcon}
            source={require('../../../assets/requestJobs/calendar.png')}
          />
        </NextPressable>
      </View>
    )
  }

  handleJobListRefresh() {
    // 接入接口时此处需要做分页处理
    this.setState({
      jobRefreshState: RefreshState.HeaderRefreshing,
    }, () => {
      this.loadData()
    })
  }

  handleJobEndReached() {
    // 接入接口时此处需要做分页处理
    this.setState({
      companyRefreshState: RefreshState.HeaderRefreshing,
    }, () => {
      this.loadData()
    })
  }

  renderItemSeparatorComponent() {
    return (
      <View style={{
        marginLeft: 21,
        width: SystemHelper.width - 42,
        height: 10,
        backgroundColor: '#F0F0F0',
      }} />
    )
  }

  renderIncomeMonth(section: any) {
    console.log('section: ', section)
    return (
      <View style={styles.incomeMonthHeader}>
        <Text style={styles.incomeMonthHeaderText}>{section.month}</Text>
      </View>
    )
  }

  renderIncomeCell(item: any) {
    return (
      <View style={styles.incomeCell}>
        <Image
          style={styles.hongbaoIcon}
          source={require('../../../assets/requestJobs/hongbao.png')}
        />
        <View style={styles.cellValue}>
          <Text style={styles.cellName}>{item.name}</Text>
          <Text style={styles.cellDate}>{item.date}</Text>
        </View>
        <Text style={styles.cellMoney}>{item.money}</Text>
      </View>
    )
  }

  renderIncomeList() {
    const {
      incomeRefreshState,
      incomeDataSource,
    } = this.state
    return (
      <SectionList
        style={styles.listView}
        sections={incomeDataSource}
        ListEmptyComponent={
          incomeRefreshState ? (
            <ListEmptyComponent
              emptyText="暂无收益"
              emptyImage={require('../../../assets/requestJobs/no-collection.png')}
            />
          ) : null
        }
        onRefresh={() => this.loadData()}
        renderSectionHeader={({ section }) => this.renderIncomeMonth(section)}
        renderItem={({ item }: any) => this.renderIncomeCell(item)}
        keyExtractor={item => item.id.toString()}
      />
    )
  }

  renderJobCell(item: any) {
    return (
      <View style={styles.withdrawCell}>
        <View style={styles.withdrawCellHeader}>
          <Text style={styles.withdrawCellTitle}>提现</Text>
          <Text style={styles.withdrawCellMoney}>{`+ ¥${item.money}`}</Text>
        </View>
        <View style={styles.withdrawCellItem}>
          <Image
            source={require('../../../assets/requestJobs/time-gray.png')}
            style={styles.withdrawCellIcon}
          />
          <Text style={styles.withdrawCellDate}>申请时间</Text>
          <Text style={styles.withdrawCellDateValue}>{item.date}</Text>
        </View>
        <View style={styles.withdrawCellItem}>
          <Image
            source={require('../../../assets/requestJobs/time-gray.png')}
            style={styles.withdrawCellIcon}
          />
          <Text style={styles.withdrawCellDate}>申请状态</Text>
          <Text style={[styles.withdrawCellDateValue,
          item.status === '提现中' && { color: '#FA8E4F' }
          ]}>{item.status}</Text>
        </View>
      </View>
    )
  }

  renderCompanyCell(item: any) {
    return (
      <CompanyJobCell
        cellItem={item}
      />
    )
  }

  renderHeaderView() {
    const { companyDataSource } = this.state
    return (
      <Text style={styles.withdrawHeader}>
        {`已提现金额（元）   ${companyDataSource.all ? companyDataSource.all : '0.00'}`}
      </Text>
    )
  }

  renderWithdrawList() {
    const {
      companyRefreshState,
      companyDataSource,
    } = this.state
    console.log('companyDataSource: ', companyDataSource)
    console.log('companyDataSource.data: ', companyDataSource.data)
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleJobListRefresh()}
        refreshState={companyRefreshState}
        automaticallyAdjustContentInsets={false}
        data={companyDataSource.data}
        renderItem={({ item }: any) => this.renderJobCell(item)}
        ListHeaderComponent={this.renderHeaderView()}
        ListEmptyComponent={
          companyRefreshState !== RefreshState.HeaderRefreshing ? (
            <ListEmptyComponent
              emptyText="暂无提现"
              emptyImage={require('../../../assets/requestJobs/no-collection.png')}
            />
          ) : null
        }
        onFooterRefresh={() => this.handleJobEndReached}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => this.renderItemSeparatorComponent()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
      />
    )
  }

  render() {
    const { selectTabs, datePickVisible, localDateOfBirth } = this.state
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        <View style={{ flex: 1 }} >
          <Tabs
            styles={{
              topTabBarSplitLine: {
                borderBottomWidth: 0,
              },
            }}
            tabs={[{ title: '收益明细' }, { title: '提现记录' }]}
            page={selectTabs}
            swipeable={false}
            usePaged={false}
            renderTabBar={(tabProps) => this.renderTabBar(tabProps)}
            onChange={(tab, index) => {
              this.setState({ selectTabs: index })
            }}
          >
            {this.renderIncomeList()}
            {this.renderWithdrawList()}
          </Tabs>
        </View>
        <DatePickerModal
          visible={datePickVisible}
          currentDate={localDateOfBirth}
          leftPress={() => {
            this.setState({ datePickVisible: false })
          }}
          rightPress={(newDate) => {
            const newYears = newDate.getFullYear()
            const newMonth = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1
            this.setState({
              localDateOfBirth: `${newYears}-${newMonth}-01T00:00:00.000Z`,
              datePickVisible: false,
            })
          }}
        />
      </View>
    )
  }
}