import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, StatusBar, SectionList } from 'react-native'
import styles from './styles/AllMessages.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
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

type IProps = GenProps<'AllMessages'> & {

}

interface IState {
  interactionDataSource: any,
  trendsDataSource: any,
  selectTabs: number
  interactionRefreshState: any,
  trendsRefreshState: any,
}

export default class AllMessages extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      interactionRefreshState: RefreshState.HeaderRefreshing,
      trendsRefreshState: RefreshState.HeaderRefreshing,
      interactionDataSource: [],
      trendsDataSource: [],
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
        interactionRefreshState: RefreshState.Idle,
        trendsRefreshState: RefreshState.Idle,
        interactionDataSource: [{
          id: 1,
          name: '二维码',
          type: 'dianzan',
          detail: '等6人赞了你的圈子',
          messageImage: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
          time: '4-27',
          icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
          others: [
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
          ]
        }, {
          id: 2,
          detail: '赞了你的圈子',
          icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
          name: 'rose',
          type: 'dianzan',
          messageImage: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
          time: '4-12'
        }, {
          id: 3,
          icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
          name: '小九月',
          type: 'comment',
          messageImage: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
          comment: '我也曾经去过这里，风景特别美，希望以后有机会再去一次,再去感受下这里的又没风景,阳光明媚',
          detail: '评论了你的圈子',
          time: '4-11',
        }, {
          id: 4,
          icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
          name: '小九月',
          company: '智慧网络有限公司',
          role: 'HR',
          type: 'comment',
          messageImage: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
          comment: '公司很好，很有发展前进，员工关系特别和谐，公司会定期组织团建,真的是个好公司呢,厉害厉害ya 真的是 非常棒呢',
          detail: '回复了你的公司提问',
          time: '3-19',
        }, {
          id: 5,
          icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
          name: '崔璐璐',
          type: 'dianzan',
          messageImage: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
          detail: '赞了你的公司问答评论',
          time: '3-10',
        },],
        trendsDataSource: [
          {
            id: 1,
            icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
            content: '你关注的李晓伟【智慧网络公司】发布了一个新的职位招聘，快去看看吧～',
            company: '智慧网络有限公司',
            time: '5-10',
          },
          {
            id: 2,
            icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
            content: '你关注的程晓明正在开播，快去他直播间看看发布的招聘岗位吧～',
            company: '小鹏汽车',
            time: '4-10',
          },
          {
            id: 3,
            icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110611%2F9120-11061111444015.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637858791&t=e56aee8e2b937698092aab8b36200e41',
            content: '你关注的谢孟林在圈子发布了一条动态，快去围观吧～',
            organization: '小鹅通',
            time: '3-10',
          },
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
          borderBottomWidth: 1,
          elevation: 0,
          borderBottomColor: '#F0F0F0',
        }}
        title='全部消息'
        left={{
          style: { width: 17, height: 17 },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
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
      interactionRefreshState: RefreshState.HeaderRefreshing,
    }, () => {
      this.loadData()
    })
  }

  handleJobEndReached() {
    // 接入接口时此处需要做分页处理
    this.setState({
      trendsRefreshState: RefreshState.HeaderRefreshing,
    }, () => {
      this.loadData()
    })
  }

  interactionList() {
    const {
      interactionRefreshState,
      interactionDataSource,
    } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleJobListRefresh()}
        refreshState={interactionRefreshState}
        automaticallyAdjustContentInsets={false}
        data={interactionDataSource}
        renderItem={({ item }: any) => this.interactionCell(item)}
        ListEmptyComponent={
          interactionRefreshState !== RefreshState.HeaderRefreshing ? (
            <ListEmptyComponent
              emptyText="暂无互动"
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

  interactionCell(item: any) {
    const {
      id, name, type, messageImage, time, icon, others, comment, detail, company, role
    } = item
    return (
      <View style={styles.interactionCell}>
        <View style={styles.interactionCellIconView}>
          <Image
            style={styles.interactionCellIcon}
            source={{ uri: icon }}
          />
          <Image
            style={styles.interactionCellTag}
            source={type === 'dianzan'
              ? require('../../../assets/requestJobs/message-dianzan.png')
              : require('../../../assets/requestJobs/message-comment.png')
            }
          />
        </View>
        <View style={styles.interactionCellValue}>
          <Text style={styles.interactionCellName}>{name}
            {company && role && <Text style={styles.interactionCellRole}>{`   (${company}·${role})`}</Text>}
          </Text>
          <Text numberOfLines={2} style={styles.interactionCellComment}>{comment || detail}</Text>
          {others && (
            <View style={styles.interactionCellCommentOthers}>
              {others.map((e: any, index: number) => {
                return (
                  <Image
                    style={styles.interactionCellCommentOthersIcon}
                    source={{ uri: e }}
                  />
                )
              })}
            </View>
          )}
          {type === 'comment'}
          <Text style={styles.interactionCellDetail}>{type === 'comment' ? `${detail}   ${time}` : time}</Text>
        </View>
        {messageImage && (
          <Image
            style={styles.interactionCellCommentCellImage}
            source={{ uri: messageImage }}
          />
        )}
      </View>
    )
  }

  handleCompanyListRefresh() {
    // 接入接口时此处需要做分页处理
    this.setState({
      interactionRefreshState: RefreshState.HeaderRefreshing,
    }, () => {
      this.loadData()
    })
  }

  handleEndCompanyReached() {
    // 接入接口时此处需要做分页处理
    this.setState({
      trendsRefreshState: RefreshState.HeaderRefreshing,
    }, () => {
      this.loadData()
    })
  }

  renderTrendsCell(item: any) {
    const {
      id,
      icon,
      content,
      company,
      organization,
      time,
    } = item
    return (
      <View key={id.toString()} style={styles.trendCell}>
        <Image
          source={{ uri: icon }}
          style={styles.trendCellIcon}
        />
        <View style={styles.trendCellValue}>
          <Text style={styles.trendCellContent}>
            {content}
          </Text>
          <Text style={styles.trendCellContentTime}>
            {time}
          </Text>
        </View>
      </View>
    )
  }

  renderTrendsList() {
    const {
      trendsRefreshState,
      trendsDataSource,
    } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleJobListRefresh()}
        refreshState={trendsRefreshState}
        automaticallyAdjustContentInsets={false}
        data={trendsDataSource}
        renderItem={({ item }: any) => this.renderTrendsCell(item)}
        ListEmptyComponent={
          trendsRefreshState !== RefreshState.HeaderRefreshing ? (
            <ListEmptyComponent
              emptyText="暂无动态"
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
            tabs={[{ title: '互动' }, { title: '动态' }]}
            page={selectTabs}
            swipeable={false}
            usePaged={false}
            renderTabBar={(tabProps) => this.renderTabBar(tabProps)}
            onChange={(tab, index) => {
              this.setState({ selectTabs: index })
            }}
          >
            {this.interactionList()}
            {this.renderTrendsList()}
          </Tabs>
        </View>
      </View>
    )
  }
}