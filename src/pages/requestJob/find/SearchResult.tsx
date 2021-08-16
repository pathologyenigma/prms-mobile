import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, StatusBar, SectionList } from 'react-native'
import styles from './styles/SearchResult.style'
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

type IProps = GenProps<'SearchResult'> & {

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

export default class SearchResult extends Component<IProps, IState> {
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
            feature: '硬件智能, IT服务'
          }, {
            id: 2,
            company: '贝壳找房（深圳）科技有限公司',
            welfare: '',
            industry: '计算机软件',
            years: '成立34年',
            tag: '火热招聘',
            score: 4,
            onlineJobs: '在招职位545',
            location: '深圳·龙岗',
            financing: '上市公司',
            staffAmount: '2000人以上',
            feature: '居住服务'
          }, {
            id: 3,
            company: '金蝶',
            welfare: '',
            industry: '计算机软件',
            years: '成立34年',
            tag: '火热招聘',
            score: 3,
            onlineJobs: '在招职位545',
            location: '深圳·龙岗',
            financing: '不需要融资',
            staffAmount: '2000人以上',
            feature: '硬件智能, IT服务'
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
    if (section.title === '搜索历史') {
      return (
        <View style={styles.searchHeader}>
          <Text style={styles.searchHeaderTitle}>{section.title}</Text>
          <NextTouchableOpacity
            style={styles.deleteHistory}
            onPress={() => {

            }}
          >
            <Image
              source={require('../../../assets/requestJobs/delete-icon.png')}
              style={styles.deleteHistoryIcon}
            />
          </NextTouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.searchHeader}>
        <Text style={styles.searchHeaderTitle}>{section.title}</Text>
      </View>
    )
  }

  renderItem(item: any) {
    const { selectItem, dataSource } = this.state
    return (
      <NextTouchableOpacity
        style={[styles.tagBtn,
          // selectItem && selectItem.id === item.id && { backgroundColor: '#E2FFF0', }
        ]}
        onPress={() => {
          this.setState({ searchValue: item.label })
        }}
      >
        <Text
          numberOfLines={1}
          style={[styles.tagText,
            // selectItem && selectItem.id === item.id && { backgroundColor: '#E2FFF0', } && { color: greenColor, fontWeight: 'bold' }
          ]}>
          {item.label}
        </Text>
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
                filterMode: selectTabs + 1,
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
        width: SystemHelper.width,
        height: 5,
        backgroundColor: '#F7F7F7',
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
        // ItemSeparatorComponent={() => this.renderItemSeparatorComponent()}
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

  renderCompanyList() {
    const {
      companyRefreshState,
      companyDataSource,
    } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleCompanyListRefresh()}
        refreshState={companyRefreshState}
        automaticallyAdjustContentInsets={false}
        data={companyDataSource}
        renderItem={({ item }: any) => this.renderCompanyCell(item)}
        onFooterRefresh={() => this.handleEndCompanyReached}
        keyExtractor={item => item.id.toString()}
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