import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, StatusBar, SectionList } from 'react-native'
import styles from './styles/FindSearchResult.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import RootLoading from '../../../utils/rootLoading'
import { Tabs } from '@ant-design/react-native'
import NavBar, { EButtonType } from '../../components/NavBar'
import SearchTextinput from '../../components/SearchTextinput'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'
import JobCell from '../../components/JobCell'
import CompanyCell from './CompanyCell'
import SystemHelper from '../../../utils/system'
import FindJobfairCell from '../publicView/FindJobfairCell'
import CompanyJobCell from '../publicView/CompanyJobCell'
import FindZhaopinMeetCell from '../publicView/FindZhaopinMeetCell'
import ListEmptyComponent from '../../components/ListEmptyComponent'

type IProps = GenProps<'FindSearchResult'> & {

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

export default class FindSearchResult extends Component<IProps, IState> {
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
          interviewer: '深圳青年共创美好春季专场招聘会',
          time: '2021.01.20-2021.03.31'
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
          interviewer: '深圳青年共创美好秋季专场招聘会',
          time: '2021.09.20-2021.09.31'
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
          interviewer: '深圳青年共创美好冬季专场招聘会',
          time: '2021.11.20-2021.12.31'
        }],
        companyDataSource: [
          {
            id: 1,
            name: '深圳青年共创美好秋季专场招聘会',
            isHot: true,
            status: '正在热招',
            tags: '电子商务,医疗健康,数据服务,区块链',
            companyAmount: 49,
            jobAmount: 545,
            publishTime: '2021.09.20 8:00-2021.09.31 18:30',
            location: '深圳市南山区科技园中区麻雀岭工工业区M-10栋1号厂房东北角101F',
          }, {
            id: 2,
            name: '深圳青年共创美好秋季专场招聘会',
            isHot: true,
            status: '即将开始',
            tags: '电子商务,医疗健康,数据服务,区块链',
            companyAmount: 49,
            jobAmount: 515,
            publishTime: '2021.08.20 8:00-2021.08.31 18:30',
            location: '深圳市南山区科技园中区麻雀岭工工业区M-10栋1号厂房东北角103F',
          }, {
            id: 3,
            name: '深圳青年共创美好秋季专场招聘会',
            status: '未开始',
            tags: '电子商务,医疗健康,数据服务,区块链',
            companyAmount: 149,
            jobAmount: 515,
            publishTime: '2021.09.20 8:00-2021.09.31 18:30',
            location: '深圳市南山区科技园中区麻雀岭工工业区M-10栋1号厂房东北角109F',
          }
        ]

      })
    }, 1000);
  }

  renderNavBar() {
    const { navigation } = this.props
    const { selectCity, searchValue } = this.state
    return (
      <View style={styles.navBar}>
        <NextTouchableOpacity
          style={styles.locationBtn}
        >
          <Image
            style={styles.locationIcon}
            source={require('../../../assets/requestJobs/navbar-back.png')}
          />
        </NextTouchableOpacity>
        <SearchTextinput
          cellStyle={{ flex: 1, height: 33 }}
          inputProps={{
            value: searchValue,
            placeholder: '搜索职位/公司/商区',
          }}
          onChangeText={(value: string) => {
            this.setState({ searchValue: value })
          }}
        />
        {/* <NextTouchableOpacity
          style={styles.cancelBtn}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Text style={styles.cancelText}>取消</Text>
        </NextTouchableOpacity> */}
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
      title: '招聘会',
    }]
    const { selectTabs } = this.state
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
                  </>
                </NextTouchableOpacity>
              )
            })
          }
        </View>
        <View style={styles.conditionRightView}>
          <NextTouchableOpacity style={styles.conditionRightBtn}>
            <Text style={styles.conditionRightText}>
              地点
            </Text>
            <Image
              style={styles.rightBottomImg}
              source={require('../../../assets/requestJobs/right-bootom-triangle.png')}
            />
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={[styles.conditionRightBtn, { marginLeft: 9 }]}
            onPress={() => {
              const { navigation } = this.props
              navigation.push('FilterView', {
                filterMode: 4,
                filterResultCallback: ((result) => {
                  console.log('111111111: ', result)
                })
              })
            }}
          >
            <Text style={styles.conditionRightText}>
              筛选
            </Text>
            <Image
              style={styles.rightBottomImg}
              source={require('../../../assets/requestJobs/right-bootom-triangle.png')}
            />
          </NextTouchableOpacity>
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
        onFooterRefresh={() => this.handleJobEndReached}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          jobRefreshState !== RefreshState.HeaderRefreshing ? (
            <ListEmptyComponent
              emptyText="暂无搜索到相关信息"
              emptyImage={require('../../../assets/requestJobs/find-search-empty.png')}
            />
          ) : null
        }
        // ItemSeparatorComponent={() => this.renderItemSeparatorComponent()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
      />
    )
  }

  renderJobCell(item: any) {
    return (
      <FindJobfairCell
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

  renderZhaopinMeetCell(item: any) {
    return (
      <FindZhaopinMeetCell
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
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleJobListRefresh()}
        refreshState={companyRefreshState}
        automaticallyAdjustContentInsets={false}
        data={companyDataSource}
        renderItem={({ item }: any) => this.renderZhaopinMeetCell(item)}
        onFooterRefresh={() => this.handleJobEndReached}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          companyRefreshState !== RefreshState.HeaderRefreshing ? (
            <ListEmptyComponent
              emptyText="暂无搜索到相关信息"
              emptyImage={require('../../../assets/requestJobs/find-search-empty.png')}
            />
          ) : null
        }
        // ItemSeparatorComponent={() => this.renderItemSeparatorComponent()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
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
            tabs={[{ title: '职位' }, { title: '招聘会' }]}
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