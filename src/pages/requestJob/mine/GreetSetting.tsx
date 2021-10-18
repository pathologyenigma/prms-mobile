import React, { Component } from 'react'
import { Text, View, Image, } from 'react-native'
import styles from './styles/GreetSetting.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import SwitchComponent from '../../components/SwitchComponent'

type IProps = GenProps<'GreetSetting'> & {

}

interface IState {
  refreshState: RefreshState.HeaderRefreshing,
  dataSource: any
  autoGreat: boolean
}

export default class GreetSetting extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      refreshState: RefreshState.HeaderRefreshing,
      dataSource: undefined,
      autoGreat: false
    }
  }

  componentDidMount() {
    RootLoading.loading()
    this.loadData()
  }

  loadData() {
    const localDataSource = [{
      id: 1,
      title: '你好，我已有4年工作经验，现任职位UI，对贵司该职位很感兴趣，希望能与你进一步沟通。',
      isDefault: true
    }, {
      id: 2,
      title: '你好，对贵司该职位很感兴趣，这是我的简历，期待你的回复。',
      isDefault: false
    }, {
      id: 3,
      title: '你好，对贵司该职位很感兴趣，这是我的简历，期待你的回复。1',
      isDefault: false
    }, {
      id: 4,
      title: '你好，对贵司该职位很感兴趣，这是我的简历，期待你的回复。2',
      isDefault: false
    }, {
      id: 5,
      title: '你好，对贵司该职位很感兴趣，这是我的简历，期待你的回复。3',
      isDefault: false
    }, {
      id: 6,
      title: '你好，对贵司该职位很感兴趣，这是我的简历，期待你的回复。4',
      isDefault: false
    }, {
      id: 7,
      title: '你好，对贵司该职位很感兴趣，这是我的简历，期待你的回复。5',
      isDefault: false
    }, {
      id: 8,
      title: '你好，对贵司该职位很感兴趣，这是我的简历，期待你的回复。6',
      isDefault: false
    }, {
      id: 9,
      title: '你好，对贵司该职位很感兴趣，这是我的简历，期待你的回复。7',
      isDefault: false
    }, {
      id: 10,
      title: '你好，对贵司该职位很感兴趣，这是我的简历，期待你的回复。8',
      isDefault: false
    }, {
      id: 11,
      title: '你好，对贵司该职位很感兴趣，这是我的简历，期待你的回复。9',
      isDefault: false
    },]
    setTimeout(() => {
      RootLoading.hide()
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
          borderBottomWidth: 1,
          borderBottomColor: '#F3F3F3',
          elevation: 0,
        }}
        title="招呼语设置"
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
    const { autoGreat } = this.state
    return (
      <NextTouchableOpacity
        style={styles.headerView}
        onPress={() => {
          const { navigation } = this.props
          // navigation.push('GreetSettingSubmit')
        }}
      >
        <Text style={styles.headerTitle}>
          自动打招呼
        </Text>
        <SwitchComponent
          value={autoGreat}
          switchPress={() => {
            this.setState({ autoGreat: !autoGreat })
          }}
        />
      </NextTouchableOpacity>
    )
  }

  handleRefresh() {

  }

  handleEndReached() {

  }

  renderItem(item: any) {
    const { navigation } = this.props
    return (
      <NextTouchableOpacity
        key={item.id.toString()}
        style={styles.cellStyle}
        onPress={() => {
          // const { navigation } = this.props
          // navigation.push('GreetSettingAnswer', {
          //   feedbackItem: item
          // })
        }}
      >
        <Text style={styles.cellTitle}>{item.title}</Text>
        <View style={styles.line} />
        <View style={{ flexDirection: 'row' }}>
          <NextTouchableOpacity style={{
            flexDirection: 'row',
            flex: 1
          }}
            onPress={() => {
              if (!item.isDefault) {
                RootLoading.info('发起网络请求并刷新数据')
              }
            }}
          >
            <Image
              style={styles.nextImage}
              source={
                item.isDefault
                  ? require('../../../assets/requestJobs/jinbi-paytype.png')
                  : require('../../../assets/requestJobs/jinbi-paytype-gray.png')
              }
            />
            <Text style={[styles.setDefaultText, item.isDefault && { color: '#57DE9E' }]}>设为默认</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={{
              width: 60,
              alignItems: 'flex-end',
            }}
            onPress={() => {
              navigation.push('GreetEdit', {
                greetItem: item
              })
            }}
          >
            <Text style={styles.editText}>编辑</Text>
          </NextTouchableOpacity>
        </View>
      </NextTouchableOpacity>
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
        onFooterRefresh={() => this.handleEndReached}
        keyExtractor={(item: any) => item.id.toString()}
        footerRefreshingText=""
        footerNoMoreDataText="没有更多了"
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
        {this.renderHeader()}
        {this.renderList()}
      </View>
    )
  }
}