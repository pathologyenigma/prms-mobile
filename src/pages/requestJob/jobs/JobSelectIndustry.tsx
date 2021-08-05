import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/JobSelectIndustry.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
import SearchTextinput from '../../components/SearchTextinput'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { greenColor } from '../../../utils/constant'

type IProps = GenProps<'JobSelectIndustry'> & {

}

interface IState {
  searchValue: string,
  refreshState: RefreshState,
  dataSource: [],
  showJobDetailType: boolean,
  selectItem: any
  selectItemSecond: any
  selectIndustry: any
}

export default class JobSelectIndustry extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      searchValue: '',
      dataSource: [],
      refreshState: RefreshState.HeaderRefreshing,
      showJobDetailType: false,
      selectItem: [],
      selectItemSecond: undefined,
      selectIndustry: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const dataSource = [
      {
        id: 0,
        title: '互联网/IT/电子/通信',
        sublist: [
          {
            id: 0,
            title: '电子商务',
          },
          {
            id: 1,
            title: '在线教育',
          },
          {
            id: 2,
            title: '人工智能',
          },
        ]
      },
      {
        id: 1,
        title: '房地产/建筑',
        sublist: [
          {
            id: 0,
            title: '电子商务',
          },
          {
            id: 1,
            title: '在线教育',
          },
          {
            id: 2,
            title: '人工智能',
          },
        ]
      },
      {
        id: 2,
        title: '教育培训/医疗',
        sublist: [
          {
            id: 0,
            title: '电子商务',
          },
          {
            id: 1,
            title: '在线教育',
          },
          {
            id: 2,
            title: '人工智能',
          },
        ]
      },
    ]
    setTimeout(() => {
      this.setState({
        refreshState: RefreshState.Idle,
        selectItem: dataSource[0],
        selectItemSecond: dataSource[0].sublist,
      })
    }, 500);
  }

  renderNavBar() {
    const { navigation, route: { params: { selectJobIndustryCallback } } } = this.props
    const { selectItemSecond } = this.state
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
            if (!selectItemSecond || !selectItemSecond.title) {
              RootLoading.info('请选择职位')
            } else if (selectJobIndustryCallback) {
              selectJobIndustryCallback(selectItemSecond)
              navigation.goBack()
            }
          }
        }}
      />
    )
  }
  // close-green
  renderSearch() {
    const { selectIndustry } = this.state
    return (
      <View>
        <SearchTextinput
          cellStyle={{ marginTop: 16 }}
          inputProps={{
            placeholder: '搜索行业类别',
          }
          }
          onChangeText={(value: string) => {
            this.setState({ searchValue: value })
          }}
        />
        <Text style={styles.selectedText}>已选</Text>
        <ScrollView style={styles.selectIndustryView}>
          {selectIndustry.map((e: any, index: number) => {
            <NextTouchableOpacity
              key={index.toString()}
              style={styles.selectIndustryBtn}
            >
              <Text style={styles.selectIndustryText}>{e.title}</Text>
              <Image
                style={styles.deleteImage}
                source={require('../../../assets/requestJobs/close-green.png')}
              />
            </NextTouchableOpacity>
          })}
        </ScrollView>
      </View>
    )
  }

  handleRefresh() {

  }

  renderDetailView() {
    const { selectItem, selectItemSecond } = this.state
    if (!selectItem || selectItem.length === 0) {
      return null
    }
    console.log('selectItem: ', selectItem)
    console.log('selectItemSecond: ', selectItemSecond)
    return (
      <View
        style={styles.detailView}
      >
        <ScrollView style={styles.detailSecondView}>
          {selectItem.sublist.map((e: any, index: number) => {
            return (
              <NextTouchableOpacity
                style={[styles.detailSecondBtn,
                selectItem.id === e.id && {
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
                <Text style={[styles.detailSecondText, selectItem.id === e.id && { color: greenColor }]}>{e.title}</Text>
              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
        <ScrollView style={styles.detailThirdView}>
          {selectItemSecond.map((e: any, index: number) => {
            return (
              <NextTouchableOpacity
                style={styles.detailThirdBtn}
                key={index.toString()}
                onPress={() => {

                }}
              >
                <Text style={styles.detailSecondText}>{e.title}</Text>
                {selectItemSecond.id === e.id ? (
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
        {this.renderSearch()}
        {this.renderDetailView()}
      </View>
    )
  }
}