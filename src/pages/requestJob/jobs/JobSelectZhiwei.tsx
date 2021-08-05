import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/JobSelectZhiwei.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
import SearchTextinput from '../../components/SearchTextinput'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { greenColor } from '../../../utils/constant'

type IProps = GenProps<'JobSelectZhiwei'> & {

}

interface IState {
  searchValue: string,
  refreshState: RefreshState,
  dataSource: [],
  showJobDetailType: boolean,
  selectItem: any
  selectItemSecond: any
  selectItemThird: any
}

export default class JobSelectZhiwei extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      searchValue: '',
      dataSource: [],
      refreshState: RefreshState.HeaderRefreshing,
      showJobDetailType: false,
      selectItem: [],
      selectItemSecond: [],
      selectItemThird: [],
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    setTimeout(() => {
      this.setState({
        refreshState: RefreshState.Idle,
        dataSource: [
          {
            id: 0,
            title: '销售/商务拓展',
            sublist: [
              {
                id: 0,
                title: '产品经理',
                sublist: [
                  { id: 0, title: '产品经理', },
                  { id: 1, title: '产品主管', },
                  { id: 2, title: '产品助理', },
                  { id: 3, title: '产品总监', },
                  { id: 4, title: '策划产品经理', },
                  { id: 5, title: '移动产品经理', },
                  { id: 6, title: '网页产品经理', },
                  { id: 7, title: '智能软件产品经理', },
                ]
              },
              {
                id: 1,
                title: '项目管理',
                sublist: [
                  { id: 0, title: '项目管理', },
                  { id: 1, title: '项目管理主管', },
                  { id: 2, title: '项目管理助理', },
                ]
              },
              {
                id: 2,
                title: '高级管理',
                sublist: [
                  { id: 0, title: '高级管理', },
                  { id: 1, title: '高级管理主管', },
                  { id: 2, title: '高级管理助理', },
                ]
              },
            ]
          },
          {
            id: 1,
            title: '人事/行政/财务/法务',
            sublist: [
              {
                id: 0,
                title: '产品经理',
                sublist: [
                  { id: 0, title: '产品经理', },
                  { id: 1, title: '产品主管', },
                  { id: 2, title: '产品助理', },
                  { id: 3, title: '产品总监', },
                  { id: 4, title: '策划产品经理', },
                  { id: 5, title: '移动产品经理', },
                  { id: 6, title: '网页产品经理', },
                  { id: 7, title: '智能软件产品经理', },
                ]
              },
              {
                id: 1,
                title: '项目管理',
                sublist: [
                  { id: 0, title: '项目管理', },
                  { id: 1, title: '项目管理主管', },
                  { id: 2, title: '项目管理助理', },
                ]
              },
              {
                id: 2,
                title: '高级管理',
                sublist: [
                  { id: 0, title: '高级管理', },
                  { id: 1, title: '高级管理主管', },
                  { id: 2, title: '高级管理助理', },
                ]
              },
            ]
          },
          {
            id: 2,
            title: '互联网/通行及硬件',
            sublist: [
              {
                id: 0,
                title: '产品经理',
                sublist: [
                  { id: 0, title: '产品经理', },
                  { id: 1, title: '产品主管', },
                  { id: 2, title: '产品助理', },
                  { id: 3, title: '产品总监', },
                  { id: 4, title: '策划产品经理', },
                  { id: 5, title: '移动产品经理', },
                  { id: 6, title: '网页产品经理', },
                  { id: 7, title: '智能软件产品经理', },
                  { id: 8, title: '产品助理', },
                  { id: 9, title: '产品总监', },
                  { id: 10, title: '策划产品经理', },
                  { id: 11, title: '移动产品经理', },
                  { id: 12, title: '网页产品经理', },
                  { id: 13, title: '智能软件产品经理', },
                  { id: 14, title: '智能软件产品经理', },
                  { id: 15, title: '产品助理', },
                  { id: 16, title: '产品总监', },
                  { id: 17, title: '策划产品经理', },
                  { id: 18, title: '移动产品经理', },
                  { id: 19, title: '网页产品经理', },
                  { id: 20, title: '智能软件产品经理', },
                ]
              },
              {
                id: 1,
                title: '项目管理',
                sublist: [
                  { id: 0, title: '项目管理', },
                  { id: 1, title: '项目管理主管', },
                  { id: 2, title: '项目管理助理', },
                ]
              },
              {
                id: 2,
                title: '高级管理',
                sublist: [
                  { id: 0, title: '高级管理', },
                  { id: 1, title: '高级管理主管', },
                  { id: 2, title: '高级管理助理', },
                ]
              },
            ]
          },
        ]
      })
    }, 500);
  }

  renderNavBar() {
    const { navigation, route: { params: { selectJobTypeCallback } } } = this.props
    const { selectItemThird } = this.state
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title="职位类别"
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.TEXT,
          value: '保存',
          style: styles.saveBtn,
          act: () => {
            if (!selectItemThird || !selectItemThird.title) {
              RootLoading.info('请选择职位')
            } else if (selectJobTypeCallback) {
              selectJobTypeCallback(selectItemThird)
              navigation.goBack()
            }
          }
        }}
      />
    )
  }

  renderSearch() {
    return (
      <SearchTextinput
        cellStyle={{ marginTop: 16 }}
        inputProps={{
          placeholder: '搜索职位名称',
        }
        }
        onChangeText={(value: string) => {
          this.setState({ searchValue: value })
        }}
      />
    )
  }

  handleRefresh() {

  }

  renderItem(item: any) {
    const { selectItem } = this.state
    console.log('item: ', item)
    return (
      <NextTouchableOpacity
        style={[styles.cellView, selectItem.id === item.id && {
          borderLeftColor: greenColor
        }]}
        onPress={() => {
          this.setState({
            showJobDetailType: true,
            selectItem: item,
            selectItemSecond: item.sublist.length > 0 ? item.sublist[0] : []
          })
        }}
      >
        <Text style={[styles.cellText, selectItem.id === item.id && { color: greenColor }]}>{item.title}</Text>
      </NextTouchableOpacity>
    )
  }

  renderDetailView() {
    const { selectItem, selectItemSecond, selectItemThird } = this.state
    console.log('selectItem: ', selectItem)
    return (
      <View
        style={styles.detailView}
      >
        <NextTouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            this.setState({
              showJobDetailType: false,
            })
          }}
        />
        <ScrollView style={styles.detailSecondView}>
          {selectItem.sublist.map((e: any, index: number) => {
            return (
              <NextTouchableOpacity
                style={[styles.detailSecondBtn,
                selectItemSecond.id === e.id && {
                  borderLeftColor: greenColor
                }
                ]}
                key={index.toString()}
                onPress={() => {
                  this.setState({
                    selectItemSecond: e,
                  })
                }}
              >
                <Text style={[styles.detailSecondText, selectItemSecond.id === e.id && { color: greenColor }]}>{e.title}</Text>
              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
        <ScrollView style={styles.detailThirdView}>
          {selectItemSecond.sublist.map((e: any, index: number) => {
            return (
              <NextTouchableOpacity
                style={styles.detailThirdBtn}
                key={index.toString()}
                onPress={() => {
                  this.setState({
                    selectItemThird: e,
                  })
                }}
              >
                <Text style={styles.detailSecondText}>{e.title}</Text>
                {selectItemThird.id === e.id ? (
                  <Image
                    style={styles.selectTag}
                    source={require('../../../assets/requestJobs/green-check.png')}
                  />
                ) : null}
              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  render() {
    const { showJobDetailType, dataSource, refreshState } = this.state
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.scrollview}
        >
          {this.renderSearch()}
          <RefreshListView
            style={styles.listView}
            // ListHeaderComponent={this.renderHeaderView()}
            onHeaderRefresh={() => this.handleRefresh()}
            refreshState={refreshState}
            automaticallyAdjustContentInsets={false}
            data={dataSource}
            renderItem={({ item }: any) => this.renderItem(item)}
            // onFooterRefresh={() => this.handleEndReached}
            keyExtractor={item => item.id.toString()}
            footerRefreshingText="加载更多"
            footerNoMoreDataText="没有更多了"
          />
        </ScrollView>
        {showJobDetailType ? this.renderDetailView() : null}
      </View>
    )
  }
}