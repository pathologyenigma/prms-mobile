import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RootLoading from '../../../utils/rootLoading'
import GradientButton from '../../components/GradientButton'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import styles from './styles/Jobs.style'
import LinearGradient from 'react-native-linear-gradient'
import { gradienRightGreenColor, greenColor } from '../../../utils/constant'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'

export default class Jobs extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      viderSource: [],
      listDataSource: [],
      refreshState: RefreshState.HeaderRefreshing,
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    // 获取视频和列表数据
  }

  renderNavBar() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <LinearGradient
        start={start}
        end={end}
        colors={[greenColor, gradienRightGreenColor]}
        style={styles.naviBar}
      >
        {/* <Text style={[styles.text, textStyle]}>
          {text}
        </Text> */}
        <View style={styles.statusBarStyle} />
        {/* <GradientButton
          containerStyle={styles.statusBarStyle}
        /> */}
        <View style={styles.naviBarContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={'barScrollView'}
            style={styles.naviBarScrollview}
          >
            <Text style={styles.naviBarText}>
              项目经理
            </Text>
            <Text style={styles.naviBarText}>
              UE设计师
            </Text>
            <Text style={styles.naviBarText}>
              APP设计师
            </Text>
          </ScrollView>
          <Image
            style={styles.naviBarIcon}
            source={require('../../../assets/requestJobs/add.png')}
          />
          <Image
            style={[styles.naviBarIcon, { marginLeft: 13 }]}
            source={require('../../../assets/requestJobs/search.png')}
          />
        </View>
      </LinearGradient>
    )
  }

  handleRefresh() {

  }

  handleEndReached() {

  }

  renderVideo() {
    return null
  }

  renderItem() {
    return (
      <View>
        <Text>职位列表</Text>
      </View>
    )
  }

  renderList() {
    const { refreshState, listDataSource } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleRefresh()}
        refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={listDataSource}
        renderItem={({ item }: any) => this.renderItem(item, listDs)}
        onFooterRefresh={() => this.handleEndReached}
        keyExtractor={(item: any) => item.id.toString()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
      />
    )
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          translucent={true}
          barStyle="light-content"
          animated />
        {this.renderNavBar()}
        {this.renderList()}
        <ScrollView>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
