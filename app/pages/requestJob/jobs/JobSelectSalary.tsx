import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/JobSelectSalary.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import NavBar, { EButtonType } from '../../components/NavBar'
import SearchTextinput from '../../components/SearchTextinput'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'

type IProps = GenProps<'JobSelectSalary'> & {

}

interface IState {
  dataSource: [],
  selectItem: any,

}

export default class JobSelectSalary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      dataSource: [
        { id: 0, label: '不限' },
        { id: 1, label: '5k以下' },
        { id: 2, label: '5-8k' },
        { id: 3, label: '8-10k' },
        { id: 4, label: '10-15k' },
        { id: 5, label: '15-20k' },
        { id: 6, label: '20-25k' },
        { id: 7, label: '25-30k' },
        { id: 8, label: '30k以上' },
      ],
      refreshState: RefreshState.HeaderRefreshing,
      selectItem: undefined,
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {

  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title="期望薪资"
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  renderTitle() {
    return (
      <Text style={styles.title}>
        期望薪资
      </Text>
    )
  }

  renderItem(item: any) {
    const { selectItem, dataSource } = this.state
    return (
      <NextTouchableOpacity
        style={[styles.jobSalaryBtn,
        selectItem && selectItem.id === item.id && { backgroundColor: '#E2FFF0', }
        ]}
        onPress={() => {
          this.setState({ selectItem: item })
        }}
      >
        <Text style={[styles.jobSalaryText,
        selectItem && selectItem.id === item.id && { backgroundColor: '#E2FFF0', } && { color: greenColor, fontWeight: 'bold' }]}>
          {item.label}
        </Text>
      </NextTouchableOpacity>
    )
  }

  renderDetailView() {
    const { selectItem, dataSource } = this.state
    if (!dataSource || dataSource.length === 0) {
      return null
    }
    return (
      <RefreshListView
        style={styles.listView}
        automaticallyAdjustContentInsets={false}
        data={dataSource}
        numColumns={3}
        renderItem={({ item }: any) => this.renderItem(item)}
        keyExtractor={item => item.id.toString()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
      />
    )
  }

  renderFooterBtn() {
    const { selectItem } = this.state
    const { navigation, route: { params: { selectJobSalaryCallback } } } = this.props
    return (
      <View style={styles.footerView}>
        <NextTouchableOpacity
          style={styles.resetBtn}
          onPress={() => {
            this.setState({ selectItem: undefined })
          }}
        >
          <Text style={styles.resetText}>重置</Text>
        </NextTouchableOpacity>
        <GradientButton
          disabled={!selectItem}
          containerStyle={styles.confirmBtn}
          linearStyle={styles.linearStyle}
          text="确定"
          onPress={() => {
            if (selectJobSalaryCallback) {
              selectJobSalaryCallback(selectItem)
              navigation.goBack()
            }
          }}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {this.renderNavBar()}
          {this.renderTitle()}
          {this.renderDetailView()}
        </View>
        {this.renderFooterBtn()}
      </View>
    )
  }
}