import React, { Component } from 'react'
import { Text, View, Image, ImageSourcePropType, DeviceEventEmitter } from 'react-native'
import styles from './styles'
import { GenProps } from '../../../../navigator/requestJob/stack'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import RootLoading from '../../../../utils/rootLoading'
import Localization from '../../../../localization'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
import MessageCell from '../MessageCell'
import LinearGradient from 'react-native-linear-gradient'
import SearchTextinput from '../../../components/SearchTextinput'

type TProps = GenProps<'News'>

interface IState {
  refreshState: RefreshState,
  dataSource: [],
  searchStr: string
  selectType: number, // 0: 全部, 1: 招呼 2: 沟通中
}

export default class NewsChat extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    this.state = {
      refreshState: RefreshState.HeaderRefreshing,
      selectType: 0,
      searchStr: '',
      dataSource: [{
        id: 1,
        name: '官方通知',
        company: '官方',
        time: '00:00',
        message: '任何转账、汇款、入股等，均涉嫌诈骗，请谨慎！',
      }, {
        id: 2,
        name: '李女士',
        company: '深圳市猎优管理咨询有限公司',
        time: '19:20',
        message: '您好，我们公司正在招聘这个职位，有兴趣来么？',
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
      <MessageCell
        cellItem={item}
        onPress={() => {
          RootLoading.info('click company')
        }}
      />
    )
  }

  renderHeaderView() {
    const { selectType } = this.state
    return (
      <View style={styles.tabs}>
        <NextTouchableOpacity
          style={styles.selectTypeBtn}
          onPress={() => {
            if (selectType !== 0) {
              this.setState({ selectType: 0 }, () => {
                // 刷新数据
                this.handleRefresh()
              })
            }
          }}
        >
          <Text style={[styles.selectTypeText, selectType === 0 && { fontWeight: 'bold' }]}>全部</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.selectTypeBtn}
          onPress={() => {
            if (selectType !== 1) {
              this.setState({ selectType: 1 }, () => {
                // 刷新数据
                this.handleRefresh()
              })
            }
          }}
        >
          <Text style={[styles.selectTypeText, selectType === 1 && { fontWeight: 'bold' }]}>招呼</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.selectTypeBtn}
          onPress={() => {
            if (selectType !== 2) {
              this.setState({ selectType: 2 }, () => {
                // 刷新数据
                this.handleRefresh()
              })
            }
          }}
        >
          <Text style={[styles.selectTypeText, selectType === 2 && { fontWeight: 'bold' }]}>沟通中</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderMessageTips() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View style={styles.tongzhiTips}>
        <View style={styles.leftView}>
          <Image
            style={styles.closeImg}
            source={require('../../../../assets/requestJobs/guanbi.png')}
          />
          <Text style={styles.openNoficationTips}>
            害怕错过重要联系人的消息？开启通知
          </Text>
        </View>
        <LinearGradient
          start={start}
          end={end}
          colors={['#FF8A05', '#FFB55F']}
          style={styles.linear}
        >
          <Text style={styles.openText}>
            开启
          </Text>
        </LinearGradient>
      </View>
    )
  }

  renderSearch() {
    return (
      <SearchTextinput
        cellStyle={{ marginTop: 8 }}
        inputProps={{
          placeholder: '通过姓名或公司搜索联系人',
        }
        }
        onChangeText={(value: string) => {
          this.setState({ searchStr: value })
        }}
      />
    )
  }

  render() {
    const { refreshState, dataSource, } = this.state
    return (
      <View style={styles.container} >
        {this.renderMessageTips()}
        {this.renderSearch()}
        {this.renderHeaderView()}
        <RefreshListView
          style={styles.listView}
          // ListHeaderComponent={this.renderHeaderView()}
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