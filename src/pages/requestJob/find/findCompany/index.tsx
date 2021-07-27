import React, { Component } from 'react'
import { Text, View, Image, ImageSourcePropType, DeviceEventEmitter } from 'react-native'
import styles from './styles'
import { GenProps } from '../../../../navigator/requestJob/stack'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import RootLoading from '../../../../utils/rootLoading'
import Localization from '../../../../localization'
import { Carousel } from '@ant-design/react-native'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
import CompanyCell from '../CompanyCell'

type TProps = GenProps<'Find'>

interface IState {
  refreshState: RefreshState,
  dataSource: [],
}

export default class FindCompany extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    this.state = {
      refreshState: RefreshState.HeaderRefreshing,
      dataSource: [{
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
      }],
    }
  }


  componentDidMount() {
    this.handleRefresh()
  }

  handleRefresh() {
    this.setState({
      refreshState: RefreshState.HeaderRefreshing,
    }, () => {
      this.loadData()
    })
  }

  handleEndReached() {

  }

  loadData() {
    RootLoading.loading()
    setTimeout(() => {
      RootLoading.hide()
      this.setState({ refreshState: RefreshState.Idle })
    }, 1000);
  }

  renderItem(item: any) {
    return (
      <CompanyCell
        cellItem={item}
        onPress={() => {
          RootLoading.info('click company')
        }}
      />
    )
  }

  renderHeaderView() {
    return (
      <Carousel
        autoplay
        autoplayInterval={3000}
        infinite={true}
        dotStyle={styles.dots}
        dotActiveStyle={styles.activeDots}
        style={styles.carousel}
        styles={{ pagination: styles.pageController }}
      >
        <NextTouchableOpacity
          style={styles.adBtn}
        >
          <Text style={styles.adText}>这是广告 1</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.adBtn}
        >
          <Text style={styles.adText}>这是广告 2</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.adBtn}
        >
          <Text style={styles.adText}>这是广告 3</Text>
        </NextTouchableOpacity>
      </Carousel>
    )
  }

  render() {
    const { refreshState, dataSource, } = this.state
    return (
      <View style={styles.container} >
        <RefreshListView
          style={styles.listView}
          ListHeaderComponent={this.renderHeaderView()}
          contentContainerStyle={styles.contentStyle}
          onHeaderRefresh={() => this.handleRefresh()}
          refreshState={refreshState}
          automaticallyAdjustContentInsets={false}
          data={dataSource}
          renderItem={({ item }: any) => this.renderItem(item)}
          onFooterRefresh={() => this.handleEndReached}
          keyExtractor={item => item.id.toString()}
          footerRefreshingText="加载更多"
          footerNoMoreDataText="没有更多了"
        />
      </View >
    )
  }
}