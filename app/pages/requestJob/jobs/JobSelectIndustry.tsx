import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/JobSelectIndustry.style'
import { GenProps } from '../../../utils/StackProps'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextPressable from '../../components/NextPressable'
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
  selectedIndustry: any
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
      selectedIndustry: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
  	HTAPI.request('/preludeDatas/industry_category.json').then(response => {
  		let dataSource = Object.keys(response).map((key, index) => {
  			return { id: index, title: key, sublist: response[key].map((item, index) => ({ id: index, title: item })) }
  		})
  		this.setState({ 
  			refreshState: RefreshState.Idle,
	        dataSource,
	        selectItem: dataSource[0],
	        selectItemSecond: dataSource[0].sublist,
  		})
  	})
  }

  renderNavBar() {
    const { navigation, route: { params: { selectJobIndustryCallback } } } = this.props
    const { selectedIndustry } = this.state
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
            if (!selectedIndustry || selectedIndustry.length === 0) {
              Toast.show('请选择职位')
            } else if (selectJobIndustryCallback) {
              console.log(this.state)
              selectJobIndustryCallback(selectedIndustry.map(item => item.valueList))
              navigation.goBack()
            }
          }
        }}
      />
    )
  }

  renderSearch() {
    const { selectedIndustry = [] } = this.state
    console.log('selectedIndustry: ', selectedIndustry)
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
        <Text style={styles.selectedText}>{`已选（${selectedIndustry.length}/3）`}</Text>
        <ScrollView
          style={styles.selectIndustryView}
          horizontal={true}
        >
          {selectedIndustry.map((e: any, index: number) => {
            return (
              <NextPressable
                key={index.toString()}
                style={styles.selectIndustryBtn}
                onPress={() => {
                  const nextSelectedIndustry: any = []
                  selectedIndustry.forEach((item: any) => {
                    item.title !== e.title && nextSelectedIndustry.push(item)
                  })
                  this.setState({ selectedIndustry: nextSelectedIndustry })
                }}
              >
                <Text style={styles.selectIndustryText}>{e.title}</Text>
                <Image
                  style={styles.deleteImage}
                  source={require('../../../assets/requestJobs/close-green.png')}
                />
              </NextPressable>
            )
          })}
        </ScrollView>
      </View >
    )
  }

  handleRefresh() {

  }

  renderDetailView() {
    const { selectItem, selectItemSecond, dataSource, selectedIndustry } = this.state
    if (!selectItem || selectItem.length === 0) {
      return null
    }
    return (
      <View
        style={styles.detailView}
      >
        <ScrollView style={styles.detailSecondView}>
          {dataSource.map((e: any, index: number) => {
            return (
              <NextPressable
              	hitSlop={{top: 20, bottom: 20}}
                style={[styles.detailSecondBtn,
                selectItem.id === e.id && {
                  borderLeftColor: greenColor,
                }
                ]}
                key={index.toString()}
                onPress={() => {
                  this.setState({
                    selectItem: e,
                    selectItemSecond: e.sublist,
                  })
                }}
              >
                <Text style={[styles.detailSecondText, selectItem.id === e.id && { color: greenColor, fontWeight: 'bold' }]}>{e.title}</Text>
              </NextPressable>
            )
          })}
        </ScrollView>
        <ScrollView style={styles.detailThirdView}>
          {selectItemSecond.map((e: any, index: number) => {
            const isSelected = selectedIndustry.filter((item: any) => item.title === e.title).length > 0
            return (
              <NextPressable
              	hitSlop={{top: 20, bottom: 20}}
                style={styles.detailThirdBtn}
                key={index.toString()}
                onPress={() => {
                  if (!isSelected) {
                    if (selectedIndustry.length > 2) {
                      Toast.show('您最多可选 3 个行业类别')
                    } else {
                      selectedIndustry.push({ ...e, valueList: [this.state.selectItem.title, e.title] })
                      this.setState({ selectedIndustry })
                    }
                  }
                }}
              >
                <Text style={
                  [styles.detailSecondText, isSelected && { color: greenColor, fontWeight: 'bold' }]
                }>{e.title}</Text>
                {isSelected ? (
                  <Image
                    style={styles.selectTag}
                    source={require('../../../assets/requestJobs/green-check.png')}
                  />
                ) : null}
              </NextPressable>
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