import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/JobSelectZhiwei.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
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
  	HTAPI.request('/preludeDatas/job_category.json').then(response => {
  		let dataSource = Object.keys(response).map((key, index) => {
  			let childList = response[key]
  			return {
  				id: index,
  				title: key,
  				sublist: Object.keys(childList).map((key, index) => {
  					return {
  						id: index,
  						title: key,
  						sublist: childList[key].map((key, index) => ({
  							id: index,
  							title: key
  						}))
  					}
  				})
  			}
  		})
  		this.setState({
	        refreshState: RefreshState.Idle,
	        dataSource: dataSource
    	})
  	})
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
              Toast.show('请选择职位')
            } else if (selectJobTypeCallback) {
              console.log(this.state)
              selectJobTypeCallback(selectItemThird.valueList)
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
      	hitSlop={{top: 20, bottom: 20}}
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
              	hitSlop={{top: 20, bottom: 20}}
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
              	hitSlop={{top: 20, bottom: 20}}
                style={styles.detailThirdBtn}
                key={index.toString()}
                onPress={() => {
                  this.setState({
                    selectItemThird: { ...e, valueList: [this.state.selectItem.title, this.state.selectItemSecond.title, e.title] },
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