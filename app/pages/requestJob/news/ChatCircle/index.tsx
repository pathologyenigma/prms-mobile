import React, { Component } from 'react'
import { Text, View, Image, ImageSourcePropType, DeviceEventEmitter } from 'react-native'
import styles from './styles'
import { GenProps } from '../../../../utils/StackProps'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import NextPressable from '../../../components/NextPressable'
import LinearGradient from 'react-native-linear-gradient'
import ChatCircleCell from '../ChatCircleCell'

type TProps = GenProps<'News'>

interface IState {
  refreshState: RefreshState,
  dataSource: [],
  searchStr: string
  selectType: number, // 0: 全部, 1: 招呼 2: 沟通中
}

export default class ChatCircle extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    this.state = {
      refreshState: RefreshState.HeaderRefreshing,
      selectType: 0,
      dataSource: [{
        id: 1,
        name: '李小冉',
        gender: 0,
        company: '瑞思科技有限公司产品经理',
        experienceYears: '3年',
        message: '今天和XXX公司的刘总一起吃饭，谈论当下形势,产品如何打造一套属于自己的商业体系，才能在众多竞品中脱颖而出~',
        topic: '#公司业务#如何拓展人脉#',
        comment: 16,
        dianzan: 52
      }, {
        id: 2,
        name: '李大',
        gender: 1,
        company: '瑞思科技有限公司产品经理',
        experienceYears: '3年',
        message: '今天和XXX公司的刘总一起吃饭，谈论当下形势,产品如何打造一套属于自己的商业体系，才能在众多竞品中脱颖而出~',
        topic: '#公司业务#如何拓展人脉#',
        comment: 19,
        dianzan: 520
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
    // Hud.show()
    setTimeout(() => {
      Hud.hidden()
      this.setState({ refreshState: RefreshState.Idle })
    }, 1000);
  }

  renderItem(item: any) {
    return (
      <ChatCircleCell
        cellItem={item}
        onPress={() => {
          Toast.show('click company')
        }}
      />
    )
  }

  renderHeaderView() {
    const { selectType } = this.state
    return (
      <View style={styles.tabs}>
        <NextPressable
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
          <Text style={[styles.selectTypeText, selectType === 0 && { fontWeight: 'bold' }]}>全新</Text>
        </NextPressable>
        <NextPressable
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
          <Text style={[styles.selectTypeText, selectType === 1 && { fontWeight: 'bold' }]}>最新</Text>
        </NextPressable>
        <NextPressable
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
          <Text style={[styles.selectTypeText, selectType === 2 && { fontWeight: 'bold' }]}>热门</Text>
        </NextPressable>
      </View>
    )
  }

  renderMessageTips() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    if (!this.props.showNotificationTips) {
      return
    }
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

  renderFindCircle() {
    return (
      <View style={styles.findCircleTopic}>
        <View style={styles.findCircleTopicLeft}>
          <Image
            style={styles.findCircleImage}
            source={require('../../../../assets/requestJobs/fire-circle.png')}
          />
          <Text style={styles.findCircleText}>发现圈子</Text>
        </View>
        <Text style={styles.findCircleDetail}>#什么工作最好#</Text>
      </View>
    )
  }

  render() {
    const { refreshState, dataSource, } = this.state
    return (
      <View style={styles.container} >
        {this.renderMessageTips()}
        {this.renderFindCircle()}
        {this.renderHeaderView()}
        <RefreshListView
          style={styles.listView}
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