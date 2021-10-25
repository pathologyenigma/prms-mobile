import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, StatusBar, SectionList } from 'react-native'
import styles from './styles/MyCollection.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import RootLoading from '../../../utils/rootLoading'
import { Tabs } from '@ant-design/react-native'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import JobCell from '../../components/JobCell'
import SystemHelper from '../../../utils/system'
import CompanyJobCell from '../publicView/CompanyJobCell'
import CompanyCell from '../find/CompanyCell'
import LinearGradient from 'react-native-linear-gradient'
import ListEmptyComponent from '../../components/ListEmptyComponent'

type IProps = GenProps<'MyCollection'> & {

}

interface IState {
  jobDataSource: any,
  companyDataSource: any,
  searchValue: string,
  selectCity: string,
  selectTabs: number
  jobRefreshState: any,
  companyRefreshState: any,
}

export default class MyCollection extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      jobRefreshState: RefreshState.HeaderRefreshing,
      companyRefreshState: RefreshState.HeaderRefreshing,
      searchValue: '',
      selectCity: '广州',
      jobDataSource: [],
      companyDataSource: [],
      selectTabs: 0
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
        jobRefreshState: RefreshState.Idle,
        companyRefreshState: RefreshState.Idle,
        jobDataSource: [{
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
        companyDataSource: [
          {
            id: 1,
            title: '华为技术有限公司',
            company: '华为技术有限公司',
            welfare: '六险一金',
            industry: '计算机软件',
            years: '成立34年',
            tag: '火热招聘',
            score: 4,
            onlineJobs: '在招职位545',
            location: '深圳·龙岗',
            financing: '不需要融资',
            staffAmount: '2000人以上',
            feature: '硬件智能, IT服务',
            isOfficial: 1,
            isBestEmployer: 1,
            data: [{
              id: 1,
              name: '运营视觉设计师',
              publishTime: '2021-08-03',
              experience: '3-4年',
              education: '大专及以上',
              location: '深圳·宝安区',
              salary: '15K-30K',
            }, {
              id: 2,
              name: '运营视觉设计师',
              publishTime: '2021-08-03',
              experience: '3-4年',
              education: '大专及以上',
              location: '深圳·宝安区',
              salary: '15K-30K',
            }, {
              id: 3,
              name: '运营视觉设计师',
              publishTime: '2021-08-03',
              experience: '3-4年',
              education: '大专及以上',
              location: '深圳·宝安区',
              salary: '15K-30K',
            }]
          }
        ]

      })
    }, 1000);
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
        title='我的收藏'
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

  renderSectionFooter(section: any) {
    return (
      <NextTouchableOpacity
        style={styles.moreJobsBtn}
      >
        <Text style={styles.moreJobsText}>
          查看更多
        </Text>
        <Image
          style={styles.moreJobsImage}
          source={require('../../../assets/requestJobs/next-green.png')}
        />
      </NextTouchableOpacity>
    )
  }

  renderTabBar(tabProps: any) {
    const tabs = [{
      title: '职位',
    }, {
      title: '公司',
    }]
    const { selectTabs } = this.state
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View style={styles.tabsView}>
        <View style={styles.tabLeft}>
          {
            tabs.map((e, i) => {
              return (
                <NextTouchableOpacity
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
                </NextTouchableOpacity>
              )
            })
          }
        </View>
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
        height: 1,
        backgroundColor: '#F0F0F0',
      }} />
    )
  }

  renderJobList() {
    const {
      jobRefreshState,
      jobDataSource,
    } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleJobListRefresh()}
        refreshState={jobRefreshState}
        automaticallyAdjustContentInsets={false}
        data={jobDataSource}
        renderItem={({ item }: any) => this.renderJobCell(item)}
        ListEmptyComponent={
          jobRefreshState !== RefreshState.HeaderRefreshing ? (
            <ListEmptyComponent
              emptyText="暂无收藏"
              emptyImage={require('../../../assets/requestJobs/no-collection.png')}
            />
          ) : null
        }
        onFooterRefresh={() => this.handleJobEndReached}
        keyExtractor={item => item.id.toString()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
      />
    )
  }

  renderJobCell(item: any) {
    return (
      <JobCell
        cellStyle={{
          borderRadius: 0,
          borderBottomWidth: 5,
          borderBottomColor: '#F7F7F7',
          marginTop: 0
        }}
        cellItem={item}
        onPress={() => {
          RootLoading.info('敬请期待')
        }}
      />
    )
  }

  handleCompanyListRefresh() {
    // 接入接口时此处需要做分页处理
    this.setState({
      jobRefreshState: RefreshState.HeaderRefreshing,
    }, () => {
      this.loadData()
    })
  }

  handleEndCompanyReached() {
    // 接入接口时此处需要做分页处理
    this.setState({
      companyRefreshState: RefreshState.HeaderRefreshing,
    }, () => {
      this.loadData()
    })
  }

  renderCompanyCell(item: any) {
    return (
      <CompanyJobCell
        cellItem={item}
      />
    )
  }

  renderCompanyList() {
    const {
      companyRefreshState,
      companyDataSource,
    } = this.state
    return (
      <SectionList
        style={styles.listView}
        sections={companyDataSource}
        ListEmptyComponent={
          companyRefreshState !== RefreshState.HeaderRefreshing ? (
            <ListEmptyComponent
              emptyText="暂无收藏"
              emptyImage={require('../../../assets/requestJobs/no-collection.png')}
            />
          ) : null
        }
        ItemSeparatorComponent={() => this.renderItemSeparatorComponent()}
        renderSectionHeader={({ section }) => this.renderSectionHeader(section)}
        renderSectionFooter={({ section }) => this.renderSectionFooter(section)}
        renderItem={({ item }: any) => this.renderCompanyCell(item)}
        keyExtractor={item => item.id.toString()}
      />
    )
  }

  render() {
    const { selectTabs } = this.state
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        <View style={{ flex: 1 }} >
          <Tabs
            styles={{
              topTabBarSplitLine: {
                borderBottomWidth: 0,
              },
            }}
            tabs={[{ title: '职位' }, { title: '公司' }]}
            page={selectTabs}
            swipeable={false}
            usePaged={false}
            renderTabBar={(tabProps) => this.renderTabBar(tabProps)}
            onChange={(tab, index) => {
              this.setState({ selectTabs: index })
            }}
          >
            {this.renderJobList()}
            {this.renderCompanyList()}
          </Tabs>
        </View>
      </View>
    )
  }
}